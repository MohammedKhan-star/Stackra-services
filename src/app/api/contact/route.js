import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Contact from "../../models/Contact";
import {
  sendFounderEmail,
  sendAutoReply,
} from "../../lib/mail";

export async function POST(req) {
  console.log("📩 POST /api/contact started");

  try {
    const body = await req.json();

    console.log("📦 Request received");

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
    // VALIDATION
    // =========================

    if (
      !name?.trim() ||
      !email?.trim() ||
      !service?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in Name, Email, Service and Project Details.",
        },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // =========================
    // DATABASE CONNECTION
    // =========================

    console.log("🔄 Connecting to MongoDB...");

    try {
      await connectDB();

      console.log("✅ MongoDB connection successful");
    } catch (error) {
      console.error(
        "❌ MongoDB CONNECTION ERROR:",
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

    // =========================
    // REQUEST INFORMATION
    // =========================

    const forwardedFor =
      req.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent =
      req.headers.get("user-agent") || "";

    // =========================
    // SAVE CONTACT
    // =========================

    let contact;

    try {
      contact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || "",
        company: company?.trim() || "",
        service: service.trim(),
        budget: budget?.trim() || "",
        message: message.trim(),
        ip,
        userAgent,
        status: "New",
      });

      console.log(
        "✅ Contact saved:",
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

    // =========================
    // SEND FOUNDER EMAIL
    // =========================

    try {
      await sendFounderEmail(contact);

      console.log("✅ Founder email sent");
    } catch (error) {
      console.error(
        "⚠️ Founder email failed:",
        error?.message || error
      );

      // Do NOT fail the form.
    }

    // =========================
    // SEND CUSTOMER AUTO REPLY
    // =========================

    try {
      await sendAutoReply({
        name: contact.name,
        email: contact.email,
      });

      console.log("✅ Auto-reply sent");
    } catch (error) {
      console.error(
        "⚠️ Auto-reply failed:",
        error?.message || error
      );

      // Do NOT fail the form.
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
      "🔥 CONTACT API ERROR:",
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
