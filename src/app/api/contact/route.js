import { NextResponse } from "next/server";

import { connectDB } from "../../lib/mongodb";
import Contact from "../../models/Contact";

import {
  sendFounderEmail,
  sendAutoReply,
} from "../../lib/mail";

// ======================================================
// POST /api/contact
// ======================================================

export async function POST(req) {
  console.log("==========================================");
  console.log("📩 STACKRA CONTACT FORM");
  console.log("POST /api/contact");
  console.log("==========================================");

  try {
    // ====================================================
    // 1. READ REQUEST
    // ====================================================

    let body;

    try {
      body = await req.json();
    } catch (error) {
      console.error(
        "❌ REQUEST JSON ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        {
          status: 400,
        }
      );
    }

    // ====================================================
    // 2. GET FORM VALUES
    // ====================================================

    const {
      name,
      email,
      phone = "",
      company = "",
      service,
      budget = "",
      message,
    } = body || {};

    // ====================================================
    // 3. CLEAN VALUES
    // ====================================================

    const clientName = String(name || "").trim();

    const clientEmail = String(email || "")
      .trim()
      .toLowerCase();

    const clientPhone = String(phone || "").trim();

    const clientCompany = String(
      company || ""
    ).trim();

    const clientService = String(
      service || ""
    ).trim();

    const clientBudget = String(
      budget || ""
    ).trim();

    const clientMessage = String(
      message || ""
    ).trim();

    // ====================================================
    // 4. REQUIRED FIELD VALIDATION
    // ====================================================

    if (
      !clientName ||
      !clientEmail ||
      !clientService ||
      !clientMessage
    ) {
      console.log(
        "⚠️ Required fields are missing"
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in Name, Email, Service and Project Details.",
        },
        {
          status: 400,
        }
      );
    }

    // ====================================================
    // 5. EMAIL VALIDATION
    // ====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(clientEmail)) {
      console.log(
        "⚠️ Invalid client email:",
        clientEmail
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        }
      );
    }

    console.log("👤 Client:", clientName);
    console.log(
      "📧 Client email:",
      clientEmail
    );
    console.log(
      "🛠️ Service:",
      clientService
    );

    // ====================================================
    // 6. CONNECT TO DATABASE
    // ====================================================

    console.log(
      "🔄 Connecting to MongoDB..."
    );

    try {
      await connectDB();

      console.log(
        "✅ MongoDB connected successfully"
      );
    } catch (error) {
      console.error(
        "❌ MONGODB CONNECTION ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Database connection failed. Please try again later.",
        },
        {
          status: 503,
        }
      );
    }

    // ====================================================
    // 7. REQUEST INFORMATION
    // ====================================================

    const forwardedFor =
      req.headers.get("x-forwarded-for");

    const ip =
      forwardedFor
        ?.split(",")[0]
        ?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent =
      req.headers.get("user-agent") || "";

    // ====================================================
    // 8. SAVE INQUIRY
    // ====================================================

    let contact;

    try {
      contact = await Contact.create({
        name: clientName,

        // IMPORTANT:
        // This is the client's actual email.
        email: clientEmail,

        phone: clientPhone,

        company: clientCompany,

        service: clientService,

        budget: clientBudget,

        message: clientMessage,

        ip,

        userAgent,

        status: "New",
      });

      console.log(
        "=========================================="
      );

      console.log(
        "✅ INQUIRY SAVED"
      );

      console.log(
        "Contact ID:",
        contact._id.toString()
      );

      console.log(
        "Client Email:",
        contact.email
      );

      console.log(
        "=========================================="
      );
    } catch (error) {
      console.error(
        "❌ CONTACT DATABASE SAVE ERROR:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to save your inquiry. Please try again.",
        },
        {
          status: 500,
        }
      );
    }

    // ====================================================
    // 9. SEND ADMIN / FOUNDER EMAIL
    // ====================================================

    let founderEmailSent = false;
    let founderEmailError = null;

    try {
      console.log(
        "📨 Sending inquiry to STACKRA admin..."
      );

      const founderResult =
        await sendFounderEmail(contact);

      if (
        founderResult &&
        founderResult.success === true
      ) {
        founderEmailSent = true;

        console.log(
          "✅ ADMIN EMAIL SENT"
        );

        console.log(
          "Admin:",
          process.env.ADMIN_EMAIL
        );
      } else {
        founderEmailError =
          founderResult?.error ||
          "Founder email was not sent.";

        console.error(
          "❌ ADMIN EMAIL NOT SENT:",
          founderEmailError
        );
      }
    } catch (error) {
      founderEmailError =
        error?.message ||
        "Founder email failed.";

      console.error(
        "❌ ADMIN EMAIL ERROR:",
        founderEmailError
      );

      // Do not fail the client's form submission.
    }

    // ====================================================
    // 10. SEND CLIENT CONFIRMATION
    // ====================================================

    let clientConfirmationSent = false;
    let clientConfirmationError = null;

    try {
      console.log(
        "=========================================="
      );

      console.log(
        "📧 SENDING CLIENT CONFIRMATION"
      );

      console.log(
        "CLIENT EMAIL:",
        clientEmail
      );

      console.log(
        "=========================================="
      );

      const confirmationResult =
        await sendAutoReply({
          name: clientName,

          // VERY IMPORTANT:
          // Send confirmation to the exact
          // email entered by the client.
          email: clientEmail,
        });

      if (
        confirmationResult &&
        confirmationResult.success === true
      ) {
        clientConfirmationSent = true;

        console.log(
          "=========================================="
        );

        console.log(
          "✅ CLIENT CONFIRMATION SENT"
        );

        console.log(
          "TO:",
          clientEmail
        );

        console.log(
          "RESEND ID:",
          confirmationResult.id
        );

        console.log(
          "=========================================="
        );
      } else {
        clientConfirmationError =
          confirmationResult?.error ||
          "Client confirmation was not sent.";

        console.error(
          "❌ CLIENT CONFIRMATION NOT SENT:",
          clientConfirmationError
        );
      }
    } catch (error) {
      clientConfirmationError =
        error?.message ||
        "Client confirmation failed.";

      console.error(
        "❌ CLIENT CONFIRMATION ERROR:",
        clientConfirmationError
      );

      // Do not fail the client's form submission.
    }

    // ====================================================
    // 11. FINAL LOG
    // ====================================================

    console.log(
      "=========================================="
    );

    console.log(
      "✅ CONTACT PROCESS COMPLETED"
    );

    console.log(
      "Client:",
      clientName
    );

    console.log(
      "Client Email:",
      clientEmail
    );

    console.log(
      "Founder Email:",
      founderEmailSent
    );

    console.log(
      "Client Confirmation:",
      clientConfirmationSent
    );

    console.log(
      "=========================================="
    );

    // ====================================================
    // 12. RESPONSE TO WEBSITE
    // ====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you! Your project inquiry has been received successfully.",

        contactId:
          contact._id.toString(),

        emailStatus: {
          founder: founderEmailSent,

          clientConfirmation:
            clientConfirmationSent,
        },

        // Useful for debugging
        // Remove these later if you want.
        clientEmail: clientEmail,

        clientConfirmationError:
          clientConfirmationError,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    // ====================================================
    // 13. UNEXPECTED ERROR
    // ====================================================

    console.error(
      "🔥 CONTACT API FATAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit your inquiry right now. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}
