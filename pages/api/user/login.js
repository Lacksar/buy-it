import { auth } from "@/firebase-admin/firebase"; // Import from Firebase Admin SDK
import User from "@/models/User";
import jwt from "jsonwebtoken";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      // Fetch user from your database (MongoDB)
      const foundUser = await User.findOne({ email });
      if (!foundUser) {
        return res.status(401).json({
          success: false,
          message: "Incorrect username or password",
        });
      }

      // Check if the email is verified on Firebase using the Admin SDK
      const firebaseUser = await auth.getUserByEmail(email);
      if (!firebaseUser.emailVerified) {
        return res.status(403).json({
          success: false,
          message: "Email is not verified. Please verify your email to log in.",
          verified: false, // Return the verification status
        });
      }

      if (!foundUser.verified) {
        foundUser.verified = true;
        await foundUser.save(); // Save the updated user document to the database
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await foundUser.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Incorrect username or password",
        });
      }

      // Generate a JWT token for the user
      const sanitizedUser = foundUser.toPublicJSON();
      const token = jwt.sign(sanitizedUser, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });

      res.status(200).json({
        success: true,
        message: "Login successful",
        user: sanitizedUser,
        token,
        verified: firebaseUser.emailVerified, // Return verification status
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      error: "Invalid request method",
    });
  }
};

export default connectDb(handler);
