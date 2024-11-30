const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      service: "gmail",
      port: 465,
      secure: true, // Use false for development
      auth: {
        user: "uveshkhalifa7920@gmail.com", // Your Gmail address
        pass: "sljfoehvtjhwizvs", // Your app password
      },
      tls: {
        rejectUnauthorized: false, // Disable certificate validation (development only)
      },
    });

    await transporter.sendMail({
      from: '"Hello " <uveshkhalifa7920@gmail.com>', // sender address (change as needed)
      to: "uveshkhalifa7920@gmail.com", // list of receivers
      subject: "Reset Password", // Subject line
      text: "change your password", // plain text body
      html: `<h1>Reset Your Password</h1>
             <p>Click on the following link to reset your password:</p>
             <p>The link will expire in 10 minutes.</p>
             <p>If you didn't request a password reset, please ignore this email.</p>`, // html body
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent:", error);
  }
};
