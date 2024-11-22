import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const validatePassword = (password) => {
  // Basic password validation (at least 8 characters)
  return password.length >= 6;
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const foundUser = await User.findById(req.body.id);

      if (!foundUser) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect UserName" });
      }

      if (!validatePassword(req.body.password)) {
        return res
          .status(403)
          .json({
            success: false,
            message: "Password must be at least 6 characters long",
          });
      }

      // Update user password
      await User.findByIdAndUpdate(req.body.id, {
        password: req.body.password,
      });

      res
        .status(200)
        .json({ success: true, message: "Password Changed Successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      res
        .status(500)
        .json({
          success: false,
          error: "Internal Server Error",
          details: error.message,
        });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid Request Method" });
  }
};

export default connectDb(handler);

//
