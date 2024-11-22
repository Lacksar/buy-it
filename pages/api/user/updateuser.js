import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const foundUser = await User.findById(req.body.id);

      if (!foundUser) {
        return res
          .status(401)
          .json({ success: false, message: "Incorrect UserName" });
      }

      // Update user information
      const updatedUser = await User.findByIdAndUpdate(
        req.body.id,
        {
          name: req.body.name,
          address: req.body.address,
          pincode: req.body.pincode,
          phone: req.body.phone,
        },
        { new: true }
      ); // { new: true } returns the modified document

      // Exclude password in the response
      const sanitizedUser = updatedUser.toPublicJSON();

      res.status(200).json({
        success: true,
        message: "Updated Successfully",
        user: sanitizedUser,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({
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
