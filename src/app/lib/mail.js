import { Resend } from "resend";

// ======================================================
// ENVIRONMENT VARIABLES
// ======================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// For testing with Resend.
// For production, replace this with a sender from a
// domain verified in your Resend account.
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "STACKRA TECHNOLOGIES <onboarding@resend.dev>";

const resend = RESEND_API_KEY
  ? new Resend(RESEND_API_KEY)
  : null;

// ======================================================
// HELPERS
// ======================================================

function escapeHTML(text = "") {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function cleanEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    cleanEmail(email)
  );
}

// ======================================================
// FOUNDER EMAIL
// Sends the client's inquiry to STACKRA
// ======================================================

export async function sendFounderEmail(contact) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is missing");
  }

  const adminEmail = cleanEmail(ADMIN_EMAIL);
  const clientEmail = cleanEmail(contact?.email);

  if (!validateEmail(adminEmail)) {
    throw new Error(
      `Invalid ADMIN_EMAIL: ${adminEmail}`
    );
  }

  if (!validateEmail(clientEmail)) {
    throw new Error(
      `Invalid client email: ${clientEmail}`
    );
  }

  console.log("📨 Sending founder email...");
  console.log("FROM:", FROM_EMAIL);
  console.log("TO:", adminEmail);
  console.log("REPLY-TO:", clientEmail);

  const { data, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // YOU RECEIVE THE INQUIRY HERE
      to: [adminEmail],

      // When you click Reply, it replies to the client
      replyTo: clientEmail,

      subject: `New Project Inquiry — ${contact.name}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body style="
  margin:0;
  padding:0;
  background:#f1f5f9;
  font-family:Arial,Helvetica,sans-serif;
">

  <div style="
    max-width:700px;
    margin:40px auto;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:16px;
    overflow:hidden;
  ">

    <!-- HEADER -->

    <div style="
      background:#0f172a;
      padding:30px;
      color:#ffffff;
    ">

      <h1 style="
        margin:0;
        font-size:25px;
      ">
        STACKRA TECHNOLOGIES
      </h1>

      <p style="
        margin:8px 0 0;
        color:#cbd5e1;
        font-size:14px;
      ">
        New Project Inquiry
      </p>

    </div>

    <!-- CONTENT -->

    <div style="padding:32px;">

      <h2 style="
        margin-top:0;
        color:#0f172a;
      ">
        New website inquiry received
      </h2>

      <p style="
        color:#64748b;
        line-height:1.7;
      ">
        A new project inquiry has been submitted
        through the STACKRA TECHNOLOGIES website.
      </p>

      <!-- CLIENT DETAILS -->

      <div style="
        margin-top:25px;
        border:1px solid #e2e8f0;
        border-radius:12px;
        overflow:hidden;
      ">

        <div style="
          padding:15px 18px;
          background:#f8fafc;
          border-bottom:1px solid #e2e8f0;
        ">
          <strong>Client Information</strong>
        </div>

        <div style="padding:18px;">

          <p>
            <strong>Name:</strong>
            ${escapeHTML(contact.name)}
          </p>

          <p>
            <strong>Email:</strong>
            <a
              href="mailto:${escapeHTML(clientEmail)}"
              style="color:#4f46e5;"
            >
              ${escapeHTML(clientEmail)}
            </a>
          </p>

          <p>
            <strong>Phone:</strong>
            ${escapeHTML(contact.phone || "-")}
          </p>

          <p>
            <strong>Company:</strong>
            ${escapeHTML(contact.company || "-")}
          </p>

          <p>
            <strong>Service:</strong>
            ${escapeHTML(contact.service || "-")}
          </p>

          <p style="margin-bottom:0;">
            <strong>Budget:</strong>
            ${escapeHTML(contact.budget || "-")}
          </p>

        </div>

      </div>

      <!-- PROJECT DETAILS -->

      <div style="
        margin-top:25px;
        padding:22px;
        background:#f8fafc;
        border-radius:12px;
      ">

        <strong>
          Project Details
        </strong>

        <p style="
          margin:12px 0 0;
          color:#475569;
          line-height:1.8;
        ">
          ${escapeHTML(contact.message || "-")}
        </p>

      </div>

      <!-- FOOTER -->

      <div style="
        margin-top:30px;
        padding-top:20px;
        border-top:1px solid #e2e8f0;
        color:#64748b;
        font-size:13px;
      ">

        STACKRA TECHNOLOGIES<br>
        Software • AI • Digital Solutions

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

  if (error) {
    console.error(
      "❌ Founder email failed:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "✅ Founder email sent:",
    data?.id
  );

  return {
    success: true,
    id: data?.id,
    recipient: adminEmail,
  };
}

// ======================================================
// CLIENT CONFIRMATION EMAIL
// Sends confirmation ONLY to the client's email
// ======================================================

export async function sendAutoReply({
  name,
  email,
}) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const clientEmail = cleanEmail(email);

  if (!validateEmail(clientEmail)) {
    throw new Error(
      `Invalid client email: ${clientEmail}`
    );
  }

  console.log("📧 Sending CLIENT confirmation...");
  console.log("FROM:", FROM_EMAIL);
  console.log("TO:", clientEmail);

  const { data, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // ================================================
      // IMPORTANT:
      // THIS IS THE CLIENT'S EMAIL
      // ================================================

      to: [clientEmail],

      subject:
        "Your inquiry has been successfully received | STACKRA TECHNOLOGIES",

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  >
</head>

<body style="
  margin:0;
  padding:0;
  background:#f1f5f9;
  font-family:Arial,Helvetica,sans-serif;
">

  <div style="
    max-width:650px;
    margin:40px auto;
    background:#ffffff;
    border:1px solid #e2e8f0;
    border-radius:16px;
    overflow:hidden;
  ">

    <!-- HEADER -->

    <div style="
      background:#0f172a;
      padding:32px;
      color:#ffffff;
    ">

      <h1 style="
        margin:0;
        font-size:25px;
      ">
        STACKRA TECHNOLOGIES
      </h1>

      <p style="
        margin:8px 0 0;
        color:#cbd5e1;
        font-size:14px;
      ">
        Software • AI • Digital Solutions
      </p>

    </div>

    <!-- CONTENT -->

    <div style="padding:35px;">

      <h2 style="
        margin:0 0 20px;
        color:#0f172a;
      ">
        Hello ${escapeHTML(name)} 👋
      </h2>

      <p style="
        color:#475569;
        line-height:1.8;
      ">
        Thank you for contacting
        <strong>STACKRA TECHNOLOGIES</strong>.
      </p>

      <!-- SUCCESS BOX -->

      <div style="
        margin:30px 0;
        padding:22px;
        background:#f0fdf4;
        border:1px solid #bbf7d0;
        border-radius:12px;
      ">

        <div style="
          color:#166534;
          font-size:16px;
          font-weight:bold;
        ">
          ✓ Inquiry Successfully Received
        </div>

        <p style="
          margin:10px 0 0;
          color:#475569;
          line-height:1.7;
        ">
          Your project inquiry has been successfully
          submitted and received by our team.
        </p>

      </div>

      <p style="
        color:#475569;
        line-height:1.8;
      ">
        Our team will review the information you
        provided and get back to you as soon as possible.
      </p>

      <!-- NEXT STEPS -->

      <div style="
        margin:28px 0;
        padding:22px;
        background:#f8fafc;
        border-radius:12px;
      ">

        <strong style="color:#0f172a;">
          What happens next?
        </strong>

        <p style="
          margin:10px 0 0;
          color:#64748b;
          line-height:1.7;
        ">
          Our team will review your requirements
          and contact you regarding the next steps.
        </p>

      </div>

      <p style="
        color:#475569;
        line-height:1.8;
      ">
        We appreciate your interest in
        <strong>STACKRA TECHNOLOGIES</strong>.
      </p>

      <!-- SIGNATURE -->

      <div style="
        margin-top:35px;
        padding-top:25px;
        border-top:1px solid #e2e8f0;
      ">

        <p style="
          margin:0;
          color:#475569;
          line-height:1.7;
        ">

          Regards,<br>

          <strong style="color:#0f172a;">
            Mohammed Khan
          </strong><br>

          Founder<br>

          <strong>
            STACKRA TECHNOLOGIES
          </strong>

        </p>

      </div>

    </div>

  </div>

</body>
</html>
      `,
    });

  if (error) {
    console.error(
      "❌ CLIENT CONFIRMATION FAILED:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "✅ CLIENT CONFIRMATION SENT:",
    clientEmail,
    data?.id
  );

  return {
    success: true,
    id: data?.id,
    recipient: clientEmail,
  };
}
