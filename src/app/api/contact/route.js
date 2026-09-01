import { NextResponse } from "next/server";

import {
  sendFounderEmail,
  sendAutoReply,
} from "../../lib/mail";

import { connectDB } from "../../lib/mongodb";
import Contact from "../../models/Contact";

export async function POST(req) {
  try {
    // ==============================
    // Get Form Data
    // ==============================

    const body = await req.json();

    console.log("Contact Form:", body);

    // ==============================
    // Validate Required Fields
    // ==============================

    const {
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
    } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // ==============================
    // Connect Database
    // ==============================

    await connectDB();

    // ==============================
    // Get Request Information
    // ==============================

    const forwardedFor = req.headers.get(
      "x-forwarded-for"
    );

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent =
      req.headers.get("user-agent") || "";

    // ==============================
    // Save Contact Lead
    // ==============================

    const contact = await Contact.create({
      name,
      email,
      phone,
      company,
      service,
      budget,
      message,
      ip,
      userAgent,
      status: "New",
    });

    console.log(
      "Contact Saved Successfully:",
      contact._id.toString()
    );

    // ==============================
    // Send Founder Email
    // ==============================

    try {
      await sendFounderEmail(contact);

      console.log("Founder Email Sent");
    } catch (emailError) {
      console.error(
        "Founder Email Failed:",
        emailError.message
      );

      // Contact is already saved.
      // We don't want to lose the lead.
    }

    // ==============================
    // Send Customer Auto Reply
    // ==============================

    try {
      await sendAutoReply({
        name: contact.name,
        email: contact.email,
      });

      console.log("Auto Reply Process Completed");
    } catch (autoReplyError) {
      console.error(
        "Auto Reply Failed:",
        autoReplyError.message
      );

      // Don't fail the contact form.
    }

    // ==============================
    // Success Response
    // ==============================

    return NextResponse.json(
      {
        success: true,

        message:
          "Thank you! Your message has been received successfully.",

        contactId: contact._id.toString(),
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong. Please try again later.",
      },
      {
        status: 500,
      }
    );
  }
}
