import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Contact from "../../models/Contact";
import {
  sendFounderEmail,
  sendAutoReply,
} from "../../lib/mail";

export async function POST(req) {
  try {
    const body = await req.json();

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
          message:
            "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Connect MongoDB
    await connectDB();

    const forwardedFor =
      req.headers.get("x-forwarded-for");

    const ip =
      forwardedFor?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "";

    const userAgent =
      req.headers.get("user-agent") || "";

    // Save lead
    const contact = await Contact.create({
      name,
      email,
      phone: phone || "",
      company: company || "",
      service,
      budget: budget || "",
      message,
      ip,
      userAgent,
      status: "New",
    });

    console.log(
      "CONTACT SAVED:",
      contact._id.toString()
    );

    // Email should NEVER make form submission fail
    try {
      await sendFounderEmail(contact);
    } catch (error) {
      console.error(
        "Founder email failed:",
        error
      );
    }

    try {
      await sendAutoReply({
        name: contact.name,
        email: contact.email,
      });
    } catch (error) {
      console.error(
        "Auto reply failed:",
        error
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your project inquiry has been received.",
        contactId: contact._id.toString(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "CONTACT API ERROR:",
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
