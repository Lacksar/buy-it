import { auth } from "@/firebase-admin/firebase"; // Import Firebase Admin SDK
import User from "@/models/User"; // Assuming this is the Mongoose model for User
import connectDb from "@/middleware/mongoose";
import nodemailer from "nodemailer";

const sendVerificationEmail = async (email, verificationLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Replace with your email service
    auth: {
      user: process.env.GMAIL_USER, // Your email address
      pass: process.env.GMAIL_PASSWORD, // Your email password (or app password)
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER, // Sender address
    to: email, // Receiver address
    subject: "Verify your email address", // Email subject
    html: `<p>Click the link below to verify your email:</p><a href="${verificationLink}">${verificationLink}</a>`, // Email body
  };

  await transporter.sendMail(mailOptions);
};

const resendVerification = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email } = req.body;

      // Check if the user exists in the database
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Check if the user's email is already verified in Firebase
      const firebaseUser = await auth.getUserByEmail(email);
      if (firebaseUser.emailVerified) {
        return res.status(400).json({
          success: false,
          message: "Email is already verified",
        });
      }

      // Generate the email verification link
      const verificationLink = await auth.generateEmailVerificationLink(email);

      // Send the verification email
      await sendVerificationEmail(email, verificationLink);

      res.status(200).json({
        success: true,
        message: "Verification email sent successfully",
      });
    } catch (error) {
      console.error("Error resending verification email:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Invalid request method",
    });
  }
};

export default connectDb(resendVerification);
