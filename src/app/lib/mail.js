
import { Resend } from "resend";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "STACKRA TECHNOLOGIES <hello@stackratechnologies.com>";

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

// ======================================================
// FOUNDER / ADMIN EMAIL
// Sends inquiry ONLY to STACKRA admin
// ======================================================

export async function sendFounderEmail(data) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  if (!ADMIN_EMAIL) {
    throw new Error("ADMIN_EMAIL is missing");
  }

  if (!validateEmail(ADMIN_EMAIL)) {
    throw new Error(`Invalid ADMIN_EMAIL: ${ADMIN_EMAIL}`);
  }

  const clientEmail = String(data.email || "")
    .trim()
    .toLowerCase();

  if (!validateEmail(clientEmail)) {
    throw new Error(
      `Invalid client email: ${clientEmail}`
    );
  }

  console.log("📨 Founder email");
  console.log("From:", FROM_EMAIL);
  console.log("To:", ADMIN_EMAIL);
  console.log("Reply-To:", clientEmail);

  const { data: result, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // STACKRA receives the inquiry
      to: [ADMIN_EMAIL],

      // Clicking Reply sends response to client
      replyTo: clientEmail,

      subject: `New Project Inquiry — ${data.name}`,

      html: `
        <div style="
          margin:0;
          padding:40px 20px;
          background:#f1f5f9;
          font-family:Arial,Helvetica,sans-serif;
        ">

          <div style="
            max-width:700px;
            margin:auto;
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            border:1px solid #e2e8f0;
          ">

            <div style="
              padding:30px;
              background:#0f172a;
              color:#ffffff;
            ">
              <h1 style="
                margin:0;
                font-size:24px;
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

            <div style="padding:30px;">

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
                A potential client has submitted a project
                inquiry through the STACKRA TECHNOLOGIES website.
              </p>

              <table
                width="100%"
                cellpadding="12"
                cellspacing="0"
                style="
                  border-collapse:collapse;
                  margin-top:25px;
                "
              >

                <tr>
                  <td style="
                    width:160px;
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Name
                  </td>

                  <td>
                    ${escapeHTML(data.name)}
                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Email
                  </td>

                  <td>
                    <a href="mailto:${escapeHTML(clientEmail)}">
                      ${escapeHTML(clientEmail)}
                    </a>
                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Phone
                  </td>

                  <td>
                    ${escapeHTML(data.phone || "-")}
                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Company
                  </td>

                  <td>
                    ${escapeHTML(data.company || "-")}
                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Service
                  </td>

                  <td>
                    ${escapeHTML(data.service)}
                  </td>
                </tr>

                <tr>
                  <td style="
                    background:#f8fafc;
                    font-weight:bold;
                  ">
                    Budget
                  </td>

                  <td>
                    ${escapeHTML(data.budget || "-")}
                  </td>
                </tr>

              </table>

              <div style="
                margin-top:25px;
                padding:20px;
                background:#f8fafc;
                border-radius:12px;
              ">

                <strong>Project Details</strong>

                <p style="
                  margin-bottom:0;
                  color:#475569;
                  line-height:1.7;
                ">
                  ${escapeHTML(data.message)}
                </p>

              </div>

              <div style="
                margin-top:30px;
                padding-top:20px;
                border-top:1px solid #e2e8f0;
                color:#64748b;
                font-size:13px;
              ">
                STACKRA TECHNOLOGIES<br />
                Software • AI • Digital Solutions
              </div>

            </div>

          </div>

        </div>
      `,
    });

  if (error) {
    console.error("❌ Founder email failed:", error);
    throw new Error(error.message);
  }

  console.log(
    "✅ Founder email sent successfully:",
    result?.id
  );

  return {
    success: true,
    id: result?.id,
  };
}

// ======================================================
// CLIENT AUTO-REPLY
// Sends ONLY to the email entered by the client
// ======================================================

export async function sendAutoReply({
  name,
  email,
}) {
  if (!resend) {
    throw new Error("RESEND_API_KEY is missing");
  }

  const clientEmail = String(email || "")
    .trim()
    .toLowerCase();

  if (!validateEmail(clientEmail)) {
    throw new Error(
      `Invalid client email: ${clientEmail}`
    );
  }

  console.log("📧 CLIENT AUTO-REPLY");
  console.log("From:", FROM_EMAIL);
  console.log("To:", clientEmail);

  const { data, error } =
    await resend.emails.send({
      from: FROM_EMAIL,

      // VERY IMPORTANT:
      // This is the actual client recipient.
      to: [clientEmail],

      subject:
        "We received your inquiry | STACKRA TECHNOLOGIES",

      html: `
        <div style="
          margin:0;
          padding:40px 20px;
          background:#f1f5f9;
          font-family:Arial,Helvetica,sans-serif;
        ">

          <div style="
            max-width:650px;
            margin:auto;
            background:#ffffff;
            border-radius:16px;
            overflow:hidden;
            border:1px solid #e2e8f0;
          ">

            <div style="
              padding:30px;
              background:#0f172a;
              color:#ffffff;
            ">

              <h1 style="
                margin:0;
                font-size:24px;
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

            <div style="padding:35px;">

              <h2 style="
                margin-top:0;
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
                We have successfully received your
                project inquiry and our team will review
                your requirements.
              </p>

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
                  margin-bottom:0;
                  color:#64748b;
                  line-height:1.7;
                ">
                  A member of our team will review your
                  requirements and contact you regarding
                  the next steps.
                </p>

              </div>

              <p style="
                color:#475569;
                line-height:1.8;
              ">
                We appreciate your interest in
                <strong>STACKRA TECHNOLOGIES</strong>.
              </p>

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

        </div>
      `,
    });

  if (error) {
    console.error(
      "❌ Client auto-reply failed:",
      error
    );

    throw new Error(error.message);
  }

  console.log(
    "✅ Client auto-reply sent successfully:",
    clientEmail,
    data?.id
  );

  return {
    success: true,
    id: data?.id,
    recipient: clientEmail,
  };
}
