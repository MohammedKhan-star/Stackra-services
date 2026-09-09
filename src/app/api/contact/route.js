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
  console.log("====================================");
  console.log("📩 POST /api/contact");
  console.log("====================================");

  try {
    // ====================================================
    // 1. READ REQUEST
    // ====================================================

    let body;

    try {
      body = await req.json();
    } catch (error) {
      console.error("❌ Invalid JSON:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    console.log("📦 Request received");

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
    // 3. CLEAN DATA
    // ====================================================

    const cleanName = String(name || "").trim();

    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();

    const cleanPhone = String(phone || "").trim();

    const cleanCompany = String(company || "").trim();

    const cleanService = String(service || "").trim();

    const cleanBudget = String(budget || "").trim();

    const cleanMessage = String(message || "").trim();

    // ====================================================
    // 4. REQUIRED FIELD VALIDATION
    // ====================================================

    if (
      !cleanName ||
      !cleanEmail ||
      !cleanService ||
      !cleanMessage
    ) {
      console.log("⚠️ Required fields missing");

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
    // 5. EMAIL VALIDATION
    // ====================================================

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      console.log(
        "⚠️ Invalid client email:",
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
    // 6. CONNECT TO MONGODB
    // ====================================================

    console.log("🔄 Connecting to MongoDB...");

    try {
      await connectDB();

      console.log(
        "✅ MongoDB connected successfully"
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
      forwardedFor?.split(",")[0]?.trim() ||
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
        "✅ Contact saved successfully:",
        contact._id.toString()
      );
    } catch (error) {
      console.error(
        "❌ CONTACT SAVE ERROR:",
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
    // 9. EMAIL STATUS
    // ====================================================

    let founderEmailSent = false;
    let clientAutoReplySent = false;

    // ====================================================
    // 10. SEND FOUNDER / ADMIN EMAIL
    // ====================================================

    try {
      console.log(
        "📨 Sending founder notification to:",
        process.env.ADMIN_EMAIL
      );

      const founderResult =
        await sendFounderEmail(contact);

      founderEmailSent =
        founderResult?.success === true;

      console.log(
        "✅ Founder notification completed"
      );
    } catch (error) {
      console.error(
        "❌ Founder email failed:",
        error?.message || error
      );

      // IMPORTANT:
      // Do NOT fail the customer's form submission.
    }

    // ====================================================
    // 11. SEND CLIENT CONFIRMATION
    // ====================================================

    try {
      console.log(
        "📧 Sending confirmation to CLIENT:",
        cleanEmail
      );

      const autoReplyResult =
        await sendAutoReply({
          name: cleanName,
          email: cleanEmail,
        });

      clientAutoReplySent =
        autoReplyResult?.success === true;

      console.log(
        "✅ Client confirmation completed:",
        cleanEmail
      );
    } catch (error) {
      console.error(
        "❌ Client auto-reply failed:",
        error?.message || error
      );

      // IMPORTANT:
      // Do NOT fail the customer's form submission.
    }

    // ====================================================
    // 12. FINAL SUCCESS RESPONSE
    // ====================================================

    console.log("====================================");
    console.log("✅ CONTACT SUBMISSION COMPLETED");
    console.log(
      "Founder email:",
      founderEmailSent
    );
    console.log(
      "Client confirmation:",
      clientAutoReplySent
    );
    console.log("====================================");

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
            clientAutoReplySent,
        },
      },
      { status: 201 }
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
      { status: 500 }
    );
  }
}
