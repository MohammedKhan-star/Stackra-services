import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Contact from "../../models/Contact";
import {
  sendFounderEmail,
  sendAutoReply,
} from "../../lib/mail";

export async function POST(req) {
  try {
    // =========================
    // Read request
    // =========================

    const body = await req.json();

    console.log("📩 Contact request received");

    const {
      name,
      email,
      phone = "",
      company = "",
      service,
      budget = "",
      message,
    } = body;

    // =========================
    // Validate
    // =========================

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in Name, Email, Service and Project Details.",
        },
        { status: 400 }
      );
    }

    // =========================
    // MongoDB
    // =========================

    try {
      await connectDB();

      console.log("✅ MongoDB connection ready");
    } catch (dbError) {
      console.error("❌ DATABASE ERROR:", dbError);

      return NextResponse.json(
        {
          success: false,
          message:
            "Database connection failed. Please try again later.",
        },
        { status: 503 }
      );
    }

    // =========================
    // Request information
    // =========================

    const forwardedFor = req.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent =
      req.headers.get("user-agent") || "";

    // =========================
    // Save lead
    // =========================

    let contact;

    try {
      contact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        company: company.trim(),
        service: service.trim(),
        budget: budget.trim(),
        message: message.trim(),
        ip,
        userAgent,
        status: "New",
      });

      console.log(
        "✅ Contact saved:",
        contact._id.toString()
      );
    } catch (dbError) {
      console.error(
        "❌ CONTACT SAVE ERROR:",
        dbError
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

    // =========================
    // Founder email
    // =========================

    try {
      await sendFounderEmail(contact);

      console.log("✅ Founder notification sent");
    } catch (emailError) {
      console.error(
        "⚠️ Founder email failed:",
        emailError?.message || emailError
      );

      // Do NOT fail the contact submission.
    }

    // =========================
    // Customer auto reply
    // =========================

    try {
      await sendAutoReply({
        name: contact.name,
        email: contact.email,
      });

      console.log("✅ Customer auto-reply processed");
    } catch (emailError) {
      console.error(
        "⚠️ Auto reply failed:",
        emailError?.message || emailError
      );

      // Do NOT fail the contact submission.
    }

    // =========================
    // SUCCESS
    // =========================

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your project inquiry has been received successfully.",
        contactId: contact._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "🔥 CONTACT API FATAL ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to submit your inquiry right now.",
      },
      { status: 500 }
    );
  }
}
