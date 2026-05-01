import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Email: Notifikasi ke kamu ────────────────────────────────────────────────
function buildNotifyEmail({ name, contact, pkg, price, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Inquiry — Kyuverse</title>
</head>
<body style="margin:0;padding:0;background:#08080b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#08080b;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Header bar -->
    <tr>
      <td style="background:linear-gradient(135deg,#0e0e14 0%,#13101f 100%);border-radius:16px 16px 0 0;border:1px solid rgba(139,92,246,0.2);border-bottom:none;padding:32px 36px 28px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#6b21a8;">Kyuverse Studio</p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">New Project Inquiry</h1>
            </td>
            <td align="right" valign="top">
              <span style="display:inline-block;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.35);color:#a78bfa;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;padding:6px 14px;border-radius:20px;">${pkg}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Accent line -->
    <tr>
      <td style="background:linear-gradient(90deg,#7c3aed,#06b6d4,transparent);height:2px;border-left:1px solid rgba(139,92,246,0.2);border-right:1px solid rgba(139,92,246,0.2);"></td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="background:linear-gradient(180deg,#0e0e14 0%,#0a0a10 100%);border:1px solid rgba(139,92,246,0.2);border-top:none;border-bottom:none;padding:32px 36px;">

        <!-- Client info grid -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td width="48%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 18px;vertical-align:top;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4b5563;">Client</p>
              <p style="margin:0;font-size:16px;font-weight:600;color:#f9fafb;">${name}</p>
            </td>
            <td width="4%"></td>
            <td width="48%" style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:16px 18px;vertical-align:top;">
              <p style="margin:0 0 6px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4b5563;">Contact</p>
              <p style="margin:0;font-size:14px;font-weight:500;color:#22d3ee;word-break:break-all;">${contact}</p>
            </td>
          </tr>
        </table>

        <!-- Price highlight -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="background:linear-gradient(135deg,rgba(139,92,246,0.12) 0%,rgba(6,182,212,0.08) 100%);border:1px solid rgba(139,92,246,0.25);border-radius:12px;padding:20px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#7c3aed;">Package value</p>
                    <p style="margin:0;font-size:24px;font-weight:700;color:#a78bfa;letter-spacing:-0.5px;">${price}</p>
                  </td>
                  <td align="right">
                    <span style="font-size:32px;line-height:1;">💜</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- Message -->
        <p style="margin:0 0 12px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4b5563;">Client's message</p>
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-left:3px solid #7c3aed;border-radius:0 10px 10px 0;padding:18px 20px;">
              <p style="margin:0;font-size:14px;line-height:1.8;color:#d1d5db;white-space:pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#0a0a10;border:1px solid rgba(139,92,246,0.2);border-top:1px solid rgba(255,255,255,0.04);border-radius:0 0 16px 16px;padding:20px 36px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <p style="margin:0;font-size:11px;color:#374151;">Sent via <span style="color:#6b7280;">kyuverse.my.id</span></p>
            </td>
            <td align="right">
              <p style="margin:0;font-size:11px;color:#374151;">Reply directly to this email to respond</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>`;
}

// ── Email: Auto-reply ke client ──────────────────────────────────────────────
function buildAutoReplyEmail({ name, contact, pkg, price, message }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Got your brief — Kyuverse</title>
</head>
<body style="margin:0;padding:0;background:#08080b;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#08080b;padding:40px 16px;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

    <!-- Hero header -->
    <tr>
      <td style="background:linear-gradient(145deg,#0f0c1a 0%,#130f20 50%,#0c1118 100%);border-radius:16px 16px 0 0;border:1px solid rgba(139,92,246,0.2);border-bottom:none;padding:40px 36px 36px;text-align:center;">
        
        <!-- Logo mark -->
        <img
          src="https://kyuverse.my.id/kyuverse.svg"
          alt="Kyuverse"
          width="52"
          height="52"
          style="display:block;margin:0 auto 20px;"
        />

        <p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#6b21a8;">Kyuverse Studio</p>
        <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;line-height:1.2;">Brief received! ✨</h1>
        <p style="margin:0;font-size:15px;color:#9ca3af;line-height:1.6;max-width:400px;margin:0 auto;">Hey <strong style="color:#f3f4f6;">${name}</strong>, your project brief is in safe hands. I'll get back to you within <strong style="color:#22d3ee;">12–24 hours</strong>.</p>
      </td>
    </tr>

    <!-- Gradient separator -->
    <tr>
      <td style="background:linear-gradient(90deg,transparent,#7c3aed,#06b6d4,transparent);height:1px;border-left:1px solid rgba(139,92,246,0.2);border-right:1px solid rgba(139,92,246,0.2);"></td>
    </tr>

    <!-- Summary section -->
    <tr>
      <td style="background:#0a0a10;border:1px solid rgba(139,92,246,0.2);border-top:none;border-bottom:none;padding:32px 36px;">

        <p style="margin:0 0 18px;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#4b5563;">Your submission summary</p>

        <!-- Info rows -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
              <span style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#4b5563;">Name</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
              <span style="font-size:14px;color:#f9fafb;font-weight:500;">${name}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
              <span style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#4b5563;">Contact</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
              <span style="font-size:14px;color:#22d3ee;">${contact}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
              <span style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#4b5563;">Package</span>
            </td>
            <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.04);text-align:right;">
              <span style="display:inline-block;background:rgba(139,92,246,0.15);border:1px solid rgba(139,92,246,0.3);color:#a78bfa;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:4px 14px;border-radius:20px;">${pkg}</span>
            </td>
          </tr>
          <tr>
            <td style="padding:12px 0;">
              <span style="font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#4b5563;">Investment</span>
            </td>
            <td style="padding:12px 0;text-align:right;">
              <span style="font-size:16px;font-weight:700;color:#a78bfa;">${price}</span>
            </td>
          </tr>
        </table>

        <!-- Message recap -->
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
          <tr>
            <td style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:18px 20px;">
              <p style="margin:0 0 10px;font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#4b5563;">Your message</p>
              <p style="margin:0;font-size:13px;line-height:1.8;color:#9ca3af;white-space:pre-wrap;">${message}</p>
            </td>
          </tr>
        </table>

        <!-- CTA -->
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="background:linear-gradient(135deg,rgba(139,92,246,0.1) 0%,rgba(8,145,178,0.08) 100%);border:1px solid rgba(139,92,246,0.2);border-radius:12px;padding:20px 24px;">
              <p style="margin:0 0 14px;font-size:13px;color:#d1d5db;line-height:1.6;">Have questions while you wait? Feel free to reach out directly.</p>
              <a href="https://ig.me/m/kandaputrah" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#0891b2);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:10px 24px;border-radius:8px;text-decoration:none;">DM on Instagram ↗</a>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#080810;border:1px solid rgba(139,92,246,0.2);border-top:1px solid rgba(255,255,255,0.03);border-radius:0 0 16px 16px;padding:20px 36px;text-align:center;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#374151;letter-spacing:1px;">KYUVERSE</p>
        <p style="margin:0;font-size:11px;color:#1f2937;">kyuverse.my.id · Automated confirmation — please do not reply to this email</p>
      </td>
    </tr>

  </table>
  </td></tr>
</table>

</body>
</html>`;
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(request) {
  try {
    const { name, contact, package: pkg, price, message } = await request.json();

    if (!name || !contact || !pkg || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const userEmail = contact.split("/")[0].trim();

    // 1. Notifikasi ke kamu
    const { error: notifyError } = await resend.emails.send({
      from: "Kyuverse Contact <onboarding@resend.dev>",
      to: process.env.RESEND_TO_EMAIL,
      subject: `[Kyuverse] New inquiry — ${pkg} package from ${name}`,
      html: buildNotifyEmail({ name, contact, pkg, price, message }),
    });

    if (notifyError) {
      console.error("Resend notify error:", notifyError);
      return Response.json({ error: "Failed to send email" }, { status: 500 });
    }

    // 2. Auto-reply ke client (non-blocking)
    resend.emails
      .send({
        from: "Kyuverse <onboarding@resend.dev>",
        to: userEmail,
        subject: `Brief received, ${name}! ✨`,
        html: buildAutoReplyEmail({ name, contact, pkg, price, message }),
      })
      .catch((err) => console.warn("Auto-reply failed (non-critical):", err));

    return Response.json({ success: true });
  } catch (err) {
    console.error("Route error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}