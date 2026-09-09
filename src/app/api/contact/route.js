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
  console.log("======================================");
  console.log("📩 POST /api/contact STARTED");
  console.log("======================================");

  try {
    // ====================================================
    // 1. READ REQUEST
    // ====================================================

    let body;

    try {
      body = await req.json();
    } catch (error) {
      console.error(
        "❌ Failed to read request JSON:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    // ====================================================
    // 2. GET FORM DATA
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
    // 3. CLEAN FORM DATA
    // ====================================================

    const cleanName =
      String(name || "").trim();

    const cleanEmail =
      String(email || "")
        .trim()
        .toLowerCase();

    const cleanPhone =
      String(phone || "").trim();

    const cleanCompany =
      String(company || "").trim();

    const cleanService =
      String(service || "").trim();

    const cleanBudget =
      String(budget || "").trim();

    const cleanMessage =
      String(message || "").trim();

    // ====================================================
    // 4. REQUIRED FIELDS
    // ====================================================

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanService ||
      !cleanMessage
    ) {
      console.log(
        "⚠️ Required fields missing"
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in Name, Email, Service and Project Details.",
        },
        { status: 400 }
      );
    }

    // ====================================================
    // 5. VALIDATE EMAIL
    // ====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      console.log(
        "⚠️ Invalid email:",
        cleanEmail
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    console.log("👤 Client:", cleanName);
    console.log("📧 Client email:", cleanEmail);
    console.log("🛠️ Service:", cleanService);

    // ====================================================
    // 6. CONNECT DATABASE
    // ====================================================

    console.log(
      "🔄 Connecting to MongoDB..."
    );

    try {
      await connectDB();

      console.log(
        "✅ MongoDB connected"
      );
    } catch (error) {
      console.error(
        "❌ MongoDB connection failed:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Database connection failed. Please try again later.",
        },
        { status: 503 }
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
    // 8. SAVE CONTACT
    // ====================================================

    let contact;

    try {
      contact = await Contact.create({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        company: cleanCompany,
        service: cleanService,
        budget: cleanBudget,
        message: cleanMessage,
        ip,
        userAgent,
        status: "New",
      });

      console.log(
        "✅ Inquiry saved:",
        contact._id.toString()
      );
    } catch (error) {
      console.error(
        "❌ Contact save failed:",
        error
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Unable to save your inquiry. Please try again.",
        },
        { status: 500 }
      );
    }

    // ====================================================
    // 9. SEND FOUNDER EMAIL
    // ====================================================

    let founderEmailSent = false;

    try {
      console.log(
        "📨 Sending inquiry to:",
        process.env.ADMIN_EMAIL
      );

      const result =
        await sendFounderEmail(contact);

      founderEmailSent =
        result?.success === true;

      console.log(
        "✅ Founder notification sent"
      );
    } catch (error) {
      console.error(
        "❌ Founder notification failed:",
        error?.message || error
      );

      // Do NOT fail the contact submission.
    }

    // ====================================================
    // 10. SEND CLIENT CONFIRMATION
    // ====================================================

    let clientConfirmationSent = false;

    try {
      console.log(
        "📧 Sending confirmation to CLIENT:",
        cleanEmail
      );

      const result =
        await sendAutoReply({
          name: cleanName,
          email: cleanEmail,
        });

      clientConfirmationSent =
        result?.success === true;

      console.log(
        "✅ CLIENT CONFIRMATION SENT:",
        cleanEmail
      );
    } catch (error) {
      console.error(
        "❌ CLIENT CONFIRMATION FAILED:",
        error?.message || error
      );

      // Do NOT fail the contact submission.
    }

    // ====================================================
    // 11. SUCCESS
    // ====================================================

    console.log("======================================");
    console.log(
      "✅ CONTACT FORM COMPLETED"
    );
    console.log(
      "Founder email:",
      founderEmailSent
    );
    console.log(
      "Client confirmation:",
      clientConfirmationSent
    );
    console.log("======================================");

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you! Your project inquiry has been received successfully.",

        contactId:
          contact._id.toString(),

        emailStatus: {
          founder:
            founderEmailSent,

          clientConfirmation:
            clientConfirmationSent,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "🔥 CONTACT API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your inquiry right now. Please try again later.",
      },
      { status: 500 }
    );
  }
}
