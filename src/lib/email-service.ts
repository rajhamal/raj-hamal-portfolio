import nodemailer from 'nodemailer';

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendContactEmails({ name, email, subject, message }: ContactEmailParams) {
  const gmailUser = process.env.GMAIL_USER || 'hello.rajhamal@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailPass) {
    console.warn('GMAIL_APP_PASSWORD is not configured in environment. Skipping email sending.');
    return { notificationSent: false, autoReplySent: false, reason: 'GMAIL_APP_PASSWORD missing' };
  }

  // Create Nodemailer Transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rajhamal.com.np';

  // 1. NOTIFICATION EMAIL TO RAJ HAMAL
  const adminMailOptions = {
    from: `"Raj Hamal Portfolio" <${gmailUser}>`,
    to: gmailUser,
    replyTo: email,
    subject: `🔔 [Portfolio Contact] ${subject} - from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; borderRadius: 16px;">
        <h2 style="color: #3b82f6; margin-bottom: 16px;">New Inquiry Received via Website</h2>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 12px; margin-bottom: 16px; border: 1px solid #334155;">
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Sender Name:</strong> ${name}</p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Sender Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Subject:</strong> ${subject}</p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Received At:</strong> ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })} UK Time</p>
        </div>
        <div style="background-color: #020617; padding: 16px; border-radius: 12px; border-left: 4px solid #3b82f6;">
          <h4 style="color: #94a3b8; margin-top: 0;">Message Content:</h4>
          <p style="white-space: pre-wrap; line-height: 1.6; color: #e2e8f0;">${message}</p>
        </div>
        <div style="margin-top: 20px;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="background-color: #2563eb; color: #ffffff; padding: 10px 18px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">
            Reply to ${name}
          </a>
        </div>
      </div>
    `,
  };

  // 2. AUTOMATED GREETING AUTO-REPLY TO VISITOR (WITH CTA)
  const visitorAutoReplyOptions = {
    from: `"Raj Hamal" <${gmailUser}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}! | Raj Hamal`,
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f8fafc; color: #1e293b; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <!-- Header -->
        <div style="background-color: #0f172a; padding: 32px 24px; text-align: center;">
          <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">RAJ HAMAL</h1>
          <p style="color: #60a5fa; font-size: 13px; margin: 4px 0 0 0; font-weight: 600;">Data Analyst | MSc Applied AI & Data Analytics</p>
          <p style="color: #94a3b8; font-size: 11px; margin: 2px 0 0 0;">University of Bradford, UK</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 28px 24px;">
          <h2 style="color: #0f172a; font-size: 18px; font-weight: 700; margin-top: 0;">Hello ${name},</h2>
          
          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            Thank you for contacting me through my portfolio website! I have received your message regarding <strong>"${subject}"</strong> and will get back to you shortly.
          </p>

          <p style="font-size: 14px; line-height: 1.6; color: #334155;">
            I am currently based in Bradford, UK, completing my postgraduate degree in <em>Applied Artificial Intelligence and Data Analytics</em>, while working on analytics projects spanning tourism logistics, marketing performance, and business intelligence.
          </p>

          <!-- Copy of Submitted Message -->
          <div style="background-color: #f1f5f9; padding: 16px; border-radius: 12px; border-left: 4px solid #2563eb; margin: 20px 0;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #64748b; text-transform: uppercase;">Your Submitted Message:</p>
            <p style="margin: 0; font-size: 13px; color: #334155; font-style: italic;">"${message}"</p>
          </div>

          <h3 style="font-size: 15px; font-weight: 700; color: #0f172a; margin-top: 24px;">In the meantime, feel free to explore:</h3>

          <!-- Call to Action Buttons -->
          <div style="margin: 20px 0; display: flex; flex-wrap: wrap; gap: 10px;">
            <a href="${siteUrl}/projects" style="background-color: #2563eb; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 10px; font-size: 13px; font-weight: bold; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
              View Analytics Projects →
            </a>
            <a href="${siteUrl}/resume" style="background-color: #0f172a; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 10px; font-size: 13px; font-weight: bold; display: inline-block; margin-right: 8px; margin-bottom: 8px;">
              Download Resume / CV
            </a>
            <a href="https://linkedin.com/in/rajhamal" style="background-color: #0077b5; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 10px; font-size: 13px; font-weight: bold; display: inline-block; margin-bottom: 8px;">
              Connect on LinkedIn
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 28px 0 20px 0;" />

          <!-- Signature -->
          <p style="font-size: 14px; margin: 0; color: #0f172a; font-weight: bold;">Best regards,</p>
          <p style="font-size: 15px; margin: 2px 0 0 0; color: #2563eb; font-weight: 800;">Raj Kumar Hamal</p>
          <p style="font-size: 12px; margin: 2px 0 0 0; color: #64748b;">MSc Applied AI & Data Analytics • University of Bradford</p>
          <p style="font-size: 12px; margin: 2px 0 0 0; color: #64748b;">Email: <a href="mailto:${gmailUser}" style="color: #2563eb;">${gmailUser}</a> | Web: <a href="${siteUrl}" style="color: #2563eb;">${siteUrl}</a></p>
        </div>
      </div>
    `,
  };

  try {
    // Send notification email to Raj
    await transporter.sendMail(adminMailOptions);
    // Send auto-reply greeting email to Visitor
    await transporter.sendMail(visitorAutoReplyOptions);

    return { notificationSent: true, autoReplySent: true };
  } catch (err) {
    console.error('Error sending contact emails via Nodemailer:', err);
    return { notificationSent: false, autoReplySent: false, error: err };
  }
}
