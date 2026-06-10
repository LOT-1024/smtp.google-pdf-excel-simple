import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(
  email: string,
  pdfPath: string,
  xlsxPath: string,
) {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Generated Report",
    text: "Your report is attached.", // fallback
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2 style="color: #2563eb;">Monthly Report</h2>

        <p>Hello John,</p>

        <p>Your report has been generated successfully.</p>

        <table style="border-collapse: collapse; width: 100%;">
            <tr>
            <td style="padding: 8px; border: 1px solid #ddd;">
                Report Date
            </td>
            <td style="padding: 8px; border: 1px solid #ddd;">
                June 2026
            </td>
            </tr>
        </table>

        <br />

        <a
            href="https://your-company.com"
            style="
            background: #2563eb;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            "
        >
            View Dashboard
        </a>

        <p style="margin-top: 30px;">
            Regards,<br />
            Report System
        </p>
        </div>
    `,
    attachments: [
      {
        filename: "report.pdf",
        path: pdfPath,
      },
      {
        filename: "report.xlsx",
        path: xlsxPath,
      },
    ],
  });
}
