import { Resend } from "resend";

// ======================================================
// ENVIRONMENT VARIABLES
// ======================================================

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// This MUST be a sender/domain approved by Resend.
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

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    String(email || "").trim()
  );
}

function cleanEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

// ======================================================
// FOUNDER / ADMIN EMAIL
// Client inquiry → stackratechnologies@gmail.com
// ======================================================

export async function sendFounderEmail(data) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is missing");
  }

  const adminEmail = cleanEmail(ADMIN_EMAIL);
  const clientEmail = cleanEmail(data?.email);

  if (!validateEmail(adminEmail)) {
    throw new Error(`Invalid ADMIN_EMAIL: ${adminEmail}`);
  }

  if (!validateEmail(clientEmail)) {
    throw new Error(`Invalid client email: ${clientEmail}`);
  }

  console.log("====================================");
  console.log("📨 FOUNDER EMAIL");
  console.log("FROM:", FROM_EMAIL);
  console.log("TO:", adminEmail);
  console.log("REPLY TO:", clientEmail);
  console.log("====================================");

  const { data: result, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // Founder/admin receives the inquiry
      to: [adminEmail],

      // Reply button goes directly to client
      replyTo: clientEmail,

      subject: `New Project Inquiry — ${data.name}`,

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    border-radius:16px;
    overflow:hidden;
    border:1px solid #e2e8f0;
  ">

    <!-- HEADER -->
    <div style="
      padding:32px;
      background:#0f172a;
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
        margin:0 0 12px;
        color:#0f172a;
      ">
        New website inquiry received
      </h2>

      <p style="
        color:#64748b;
        line-height:1.7;
      ">
        A potential client has submitted a project
        inquiry through the STACKRA TECHNOLOGIES website.
      </p>

      <!-- CLIENT DETAILS -->
      <div style="
        margin-top:25px;
        border:1px solid #e2e8f0;
        border-radius:12px;
        overflow:hidden;
      ">

        <div style="
          padding:14px 18px;
          background:#f8fafc;
          border-bottom:1px solid #e2e8f0;
        ">
          <strong>Client Information</strong>
        </div>

        <div style="padding:18px;">

          <p>
            <strong>Name:</strong>
            ${escapeHTML(data.name)}
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
            ${escapeHTML(data.phone || "-")}
          </p>

          <p>
            <strong>Company:</strong>
            ${escapeHTML(data.company || "-")}
          </p>

          <p>
            <strong>Service:</strong>
            ${escapeHTML(data.service || "-")}
          </p>

          <p style="margin-bottom:0;">
            <strong>Budget:</strong>
            ${escapeHTML(data.budget || "-")}
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

        <strong style="color:#0f172a;">
          Project Details
        </strong>

        <p style="
          margin:12px 0 0;
          color:#475569;
          line-height:1.8;
        ">
          ${escapeHTML(data.message || "-")}
        </p>

      </div>

      <!-- FOOTER -->
      <div style="
        margin-top:30px;
        padding-top:22px;
        border-top:1px solid #e2e8f0;
        color:#64748b;
        font-size:13px;
        line-height:1.6;
      ">

        STACKRA TECHNOLOGIES<br />
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
      "❌ FOUNDER EMAIL ERROR:",
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
// CLIENT AUTO-REPLY
// Client inquiry → client email
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

  console.log("====================================");
  console.log("📧 CLIENT AUTO-REPLY");
  console.log("FROM:", FROM_EMAIL);
  console.log("TO:", clientEmail);
  console.log("====================================");

  const { data: result, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // ⭐ CLIENT EMAIL
      to: [clientEmail],

      subject:
        "We received your inquiry | STACKRA TECHNOLOGIES",

      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
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
    border-radius:16px;
    overflow:hidden;
    border:1px solid #e2e8f0;
  ">

    <!-- HEADER -->
    <div style="
      padding:32px;
      background:#0f172a;
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
        margin:0 0 18px;
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

      <p style="
        color:#475569;
        line-height:1.8;
      ">
        We have successfully received your project
        inquiry. Our team will review your requirements
        and get back to you as soon as possible.
      </p>

      <!-- NEXT STEP -->
      <div style="
        margin:30px 0;
        padding:22px;
        background:#f8fafc;
        border-left:4px solid #4f46e5;
        border-radius:8px;
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

          Regards,<br />

          <strong style="color:#0f172a;">
            Mohammed Khan
          </strong><br />

          Founder<br />

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
      "❌ CLIENT AUTO-REPLY ERROR:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "✅ Client auto-reply sent:",
    clientEmail,
    result?.id
  );

  return {
    success: true,
    id: result?.id,
    recipient: clientEmail,
  };
}
