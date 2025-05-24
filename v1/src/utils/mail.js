import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: `"GEM KNOW MODEL HSS" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code for GEM KNOW MODEL HSS",
    html: `
      <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2a2a2a, #1a1a1a); padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="color: #ffffff; margin: 0; font-size: 26px; font-weight: 300; letter-spacing: 1px;">GEM KNOW MODEL HSS</h1>
        </div>
        <!-- Body -->
        <div >
          <h2 style="color: #ffffff; font-size: 22px; font-weight: 400; margin-top: 0;">Your One-Time Password</h2>
          <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
            Dear User,
          </p>
          <p style="color: #cccccc; font-size: 16px; line-height: 1.6;">
            Use the following OTP to proceed with your request. This code is valid for <strong>10 minutes</strong>.
          </p>
          <div style="text-align: center; margin: 25px 0;">
            <span style="display: inline-block; background: linear-gradient(135deg, #007bff, #0056b3); color: #ffffff; font-size: 28px; font-weight: 600; padding: 12px 24px; border-radius: 8px; letter-spacing: 3px; box-shadow: 0 2px 8px rgba(0,123,255,0.3);">${otp}</span>
          </div>
          <p style="color: #cccccc; font-size: 14px; line-height: 1.6;">
            If you did not request this OTP, please ignore this email or contact our support team.
          </p>
        </div>
        <!-- Footer -->
        <div style="text-align: center; padding: 20px; color: #999999; font-size: 12px;">
          <p style="margin: 0;">GEM KNOW MODEL HSS © 2025</p>
          <p style="margin: 5px 0;">
            <a href="mailto:support@gemknowmodelhss.com" style="color: #4dabf7; text-decoration: none;">Contact Support</a> | 
            <a href="https://gemknowmodelhss.com" style="color: #4dabf7; text-decoration: none;">Visit Our Website</a>
          </p>
        </div>
        <!-- Light Mode Styles -->
        <style type="text/css">
          @media (prefers-color-scheme: light) {
            div[style*="background-color: #1a1a1a"] {
              background-color: #f4f4f4 !important;
              color: #333333 !important;
            }
            div[style*="background: linear-gradient(135deg, #2a2a2a, #1a1a1a)"] {
              background: linear-gradient(135deg, #ffffff, #e9ecef) !important;
            }
            div[style*="background-color: #2a2a2a"] {
              background-color: #ffffff !important;
            }
            h1[style*="color: #ffffff"], h2[style*="color: #ffffff"] {
              color: #333333 !important;
            }
            p[style*="color: #cccccc"] {
              color: #555555 !important;
            }
            span[style*="color: #ffffff"] {
              color: #ffffff !important;
            }
            a[style*="color: #4dabf7"] {
              color: #007bff !important;
            }
            div[style*="color: #999999"] {
              color: #777777 !important;
            }
          }
        </style>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
