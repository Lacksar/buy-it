import connectDb from "@/middleware/mongoose";
import Forget from "@/models/Forget";
import User from "@/models/User";
import { v4 as uuidv4 } from "uuid";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const foundUser = await User.findOne({ email: req.body.email });

      if (!foundUser) {
        return res
          .status(401)
          .json({ success: false, message: "No user with this email" });
      }

      // Find the entry in the Forget collection with the given email
      let existingForgetEntry = await Forget.findOne({ email: req.body.email });

      // Generate a new token every time forget password is requested
      let token = generateNewToken();

      if (existingForgetEntry) {
        // Update the existing entry's token in the Forget collection
        await Forget.updateOne(
          { email: req.body.email },
          { $set: { token: token } }
        );
      } else {
        // Create a new entry if the email doesn't exist in the Forget collection
        let forget = new Forget({
          userid: foundUser._id,
          email: req.body.email,
          token: token,
        });

        await forget.save();
      }

      res
        .status(200)
        .json({ success: true, message: "Code sent to your email address" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(500).send("Internal Server Error");
  }
};

// Function to generate a new token

const generateNewToken = () => {
  return uuidv4(); // Generate a unique token using uuid
};

export default connectDb(handler);
//
