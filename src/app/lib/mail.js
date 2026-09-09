import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// IMPORTANT:
// This must be an email address on a domain
// verified in your Resend account.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "STACKRA TECHNOLOGIES <stackratechnologies@gmail.com>";

const resend = RESEND_API_KEY
  ? new Resend(RESEND_API_KEY)
  : null;

function escapeHTML(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || "").trim()
  );
}

// ======================================================
// FOUNDER EMAIL
// Goes ONLY to STACKRA admin email
// ======================================================

export async function sendFounderEmail(data) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is missing");
  }

  if (!validateEmail(ADMIN_EMAIL)) {
    throw new Error("ADMIN_EMAIL is invalid");
  }

  if (!validateEmail(data.email)) {
    throw new Error(
      "Client email is invalid: " + data.email
    );
  }

  const { data: result, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // Founder receives the inquiry
      to: [ADMIN_EMAIL],

      // Reply button goes to client
      replyTo: data.email,

      subject: `🚀 New Project Inquiry - ${data.name}`,

      html: `
        <div style="
          font-family: Arial, sans-serif;
          max-width: 700px;
          margin: auto;
          padding: 30px;
          color: #1e293b;
        ">

          <h2 style="color:#4f46e5;">
            🚀 New Project Inquiry
          </h2>

          <p>
            A new project inquiry was submitted through
            the STACKRA TECHNOLOGIES website.
          </p>

          <table
            width="100%"
            cellpadding="12"
            cellspacing="0"
            style="border-collapse:collapse;"
          >

            <tr>
              <td><strong>Name</strong></td>
              <td>${escapeHTML(data.name)}</td>
            </tr>

            <tr>
              <td><strong>Client Email</strong></td>
              <td>${escapeHTML(data.email)}</td>
            </tr>

            <tr>
              <td><strong>Phone</strong></td>
              <td>${escapeHTML(data.phone || "-")}</td>
            </tr>

            <tr>
              <td><strong>Company</strong></td>
              <td>${escapeHTML(data.company || "-")}</td>
            </tr>

            <tr>
              <td><strong>Service</strong></td>
              <td>${escapeHTML(data.service)}</td>
            </tr>

            <tr>
              <td><strong>Budget</strong></td>
              <td>${escapeHTML(data.budget || "-")}</td>
            </tr>

            <tr>
              <td><strong>Project Details</strong></td>
              <td>${escapeHTML(data.message)}</td>
            </tr>

          </table>

          <p style="margin-top:30px;color:#64748b;">
            STACKRA TECHNOLOGIES Contact Form
          </p>

        </div>
      `,
    });

  if (error) {
    console.error(
      "❌ Founder email error:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "✅ Founder email sent:",
    result?.id
  );

  return {
    success: true,
    id: result?.id,
  };
}

// ======================================================
// CLIENT AUTO REPLY
// Goes ONLY to the email entered by the client
// ======================================================

export async function sendAutoReply({
  name,
  email,
}) {
  if (!resend) {
    console.warn(
      "⚠️ Auto reply skipped: RESEND_API_KEY missing"
    );

    return {
      success: false,
      skipped: true,
    };
  }

  const clientEmail = String(
    email || ""
  ).trim().toLowerCase();

  // IMPORTANT
  if (!validateEmail(clientEmail)) {
    console.error(
      "❌ Invalid client email:",
      clientEmail
    );

    return {
      success: false,
      skipped: true,
      error: "Invalid client email",
    };
  }

  console.log(
    "📧 Sending client auto-reply to:",
    clientEmail
  );

  try {
    const { data, error } =
      await resend.emails.send({
        from: FROM_EMAIL,

        // THIS is the client
        to: [clientEmail],

        subject:
          "We've received your project inquiry | STACKRA TECHNOLOGIES",

        html: `
          <div style="
            font-family: Arial, sans-serif;
            max-width: 650px;
            margin: auto;
            padding: 30px;
            color: #334155;
            line-height: 1.7;
          ">

            <h2 style="color:#4f46e5;">
              Hello ${escapeHTML(name)} 👋
            </h2>

            <p>
              Thank you for contacting
              <strong>STACKRA TECHNOLOGIES</strong>.
            </p>

            <p>
              Your project inquiry has been
              successfully received.
            </p>

            <p>
              Our team will review your requirements
              and get back to you as soon as possible.
            </p>

            <div style="
              margin-top:30px;
              padding:20px;
              background:#f8fafc;
              border-radius:12px;
            ">
              <strong>
                STACKRA TECHNOLOGIES
              </strong>

              <br />

              Software • AI • Digital Solutions
            </div>

            <p style="margin-top:30px;">
              Regards,<br />
              <strong>Mohammed Khan</strong><br />
              Founder<br />
              STACKRA TECHNOLOGIES
            </p>

          </div>
        `,
      });

    if (error) {
      console.error(
        "❌ Client auto-reply error:",
        error
      );

      return {
        success: false,
        error: error.message,
      };
    }

    console.log(
      "✅ Client auto-reply sent to:",
      clientEmail,
      data?.id
    );

    return {
      success: true,
      id: data?.id,
      recipient: clientEmail,
    };
  } catch (error) {
    console.error(
      "❌ Client auto-reply failed:",
      error
    );

    return {
      success: false,
      error: error.message,
    };
  }
}
