
import { Resend } from "resend";

// ==============================
// Environment Variables
// ==============================

const RESEND_API_KEY = process.env.RESEND_API_KEY;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "STACKRA TECHNOLOGIES <onboarding@resend.dev>";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// ==============================
// Resend Client
// ==============================

const resend = RESEND_API_KEY
  ? new Resend(RESEND_API_KEY)
  : null;

// ==============================
// HTML Escape Security
// ==============================

function escapeHTML(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// ==============================
// Founder Notification Email
// ==============================

export async function sendFounderEmail(data) {
  if (!ADMIN_EMAIL) {
    throw new Error(
      "ADMIN_EMAIL missing in environment variables"
    );
  }

  if (!resend) {
    throw new Error(
      "RESEND_API_KEY missing in environment variables"
    );
  }

  const { error } = await resend.emails.send({
    from: FROM_EMAIL,

    to: ADMIN_EMAIL,

    replyTo: data.email,

    subject: `🚀 New Project Inquiry - ${data.name}`,

    html: `
      <div
        style="
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: 0 auto;
          padding: 30px;
          color: #1e293b;
        "
      >
        <h2 style="color: #4f46e5;">
          🚀 New Project Inquiry
        </h2>

        <p>
          A new project inquiry has been submitted through the
          STACKRA TECHNOLOGIES website.
        </p>

        <table
          width="100%"
          cellpadding="12"
          cellspacing="0"
          style="
            border-collapse: collapse;
            margin-top: 20px;
          "
        >
          <tr style="background: #f8fafc;">
            <td><strong>Name</strong></td>
            <td>${escapeHTML(data.name)}</td>
          </tr>

          <tr>
            <td><strong>Email</strong></td>
            <td>${escapeHTML(data.email)}</td>
          </tr>

          <tr style="background: #f8fafc;">
            <td><strong>Phone</strong></td>
            <td>${escapeHTML(data.phone || "-")}</td>
          </tr>

          <tr>
            <td><strong>Company</strong></td>
            <td>${escapeHTML(data.company || "-")}</td>
          </tr>

          <tr style="background: #f8fafc;">
            <td><strong>Service</strong></td>
            <td>${escapeHTML(data.service)}</td>
          </tr>

          <tr>
            <td><strong>Budget</strong></td>
            <td>${escapeHTML(data.budget || "-")}</td>
          </tr>

          <tr style="background: #f8fafc;">
            <td><strong>Message</strong></td>
            <td>${escapeHTML(data.message)}</td>
          </tr>
        </table>

        <p style="margin-top: 30px; color: #64748b;">
          Sent from STACKRA TECHNOLOGIES Contact Form
        </p>
      </div>
    `,
  });

  if (error) {
    console.error("Resend Founder Email Error:", error);
    throw new Error(error.message);
  }

  console.log("Founder Email Sent");
}

// ==============================
// Client Auto Reply Email
// ==============================

export async function sendAutoReply({ name, email }) {
  // If email service is not configured,
  // don't crash the contact form.
  if (!resend) {
    console.warn("Auto reply skipped: RESEND_API_KEY missing.");
    return {
      success: false,
      skipped: true,
    };
  }

  if (!email) {
    console.warn("Auto reply skipped: Recipient email missing.");

    return {
      success: false,
      skipped: true,
    };
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,

      to: email,

      subject:
        "We've received your project inquiry | STACKRA TECHNOLOGIES",

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: 0 auto;
            padding: 30px;
            color: #334155;
            line-height: 1.7;
          "
        >
          <h2 style="color: #4f46e5;">
            Hello ${escapeHTML(name)} 👋
          </h2>

          <p>
            Thank you for contacting
            <strong>STACKRA TECHNOLOGIES</strong>.
          </p>

          <p>
            Your project inquiry has been successfully received.
          </p>

          <p>
            Our team will review your requirements and get back
            to you as soon as possible.
          </p>

          <div
            style="
              margin-top: 30px;
              padding: 20px;
              background: #f8fafc;
              border-radius: 12px;
            "
          >
            <strong>STACKRA TECHNOLOGIES</strong>

            <br />

            Software • AI • Digital Solutions
          </div>

          <p style="margin-top: 30px;">
            Regards,
            <br />
            <strong>Mohammed Khan</strong>
            <br />
            Founder
            <br />
            STACKRA TECHNOLOGIES
          </p>
        </div>
      `,
    });

    if (error) {
      console.warn(
        "Auto reply could not be sent:",
        error.message
      );

      // IMPORTANT:
      // Do not throw an error here.
      // The contact was already successfully saved.
      return {
        success: false,
        skipped: false,
        error: error.message,
      };
    }

    console.log("Client Auto Reply Sent");

    return {
      success: true,
    };
  } catch (error) {
    console.warn(
      "Auto reply failed but contact submission continues:",
      error.message
    );

    return {
      success: false,
      error: error.message,
    };
  }
}

