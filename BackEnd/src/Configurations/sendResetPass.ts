import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

// Create a transporter for Nodemailer
const transporter: Transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.Sender_Email,
    pass: process.env.Sender_Pass,
  },
});

// Define the function to send a password reset email
export const sendPasswordResetEmail = async (
  email: string,
  resetLink: string,
): Promise<void> => {
  const mailOptions: SendMailOptions = {
    from: '"FlexiWork" <omdesai2112@gmail.com>',
    to: email,
    subject: "FlexiWork: Password Reset Request",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; padding: 20px; background: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <img src="https://res.cloudinary.com/dgvslio7u/image/upload/v1722411107/tyqao18fdxtj7pefzc3n.png" alt="FlexiWork Logo" style="max-width: 150px;" />
            </div>
            <h1 style="color: #007bff; text-align: center; margin-bottom: 25px;">Password Reset Request</h1>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">You requested a password reset for your FlexiWork account.</p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">Click the link below to reset your password:</p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px; text-align: center;">
              <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #007bff; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </p>
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">If you did not request this, please ignore this email.</p>
            <p style="font-size: 16px; line-height: 1.5; text-align: center; border-top: 1px solid #f4f4f4; padding-top: 20px;">
              Best regards,<br><strong>The FlexiWork Team</strong>
            </p>
            <div style="padding: 20px; text-align: center; border-top: 1px solid #dddddd;">
              <p style="margin: 0; font-size: 12px; color: #aaa;">
                &copy; ${new Date().getFullYear()} FlexiWork. All rights reserved.
              </p>
              <p style="margin: 10px 0; font-size: 12px; color: #aaa;">
                <a href="http://your-frontend-domain/privacy-policy" style="color: #007bff; text-decoration: none;">Privacy Policy</a> | 
                <a href="http://your-frontend-domain/terms-of-service" style="color: #007bff; text-decoration: none;">Terms of Service</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error("Error sending password reset email:", error);
    console.log("Failed to send password reset email");
  }
};
