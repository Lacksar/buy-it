import User from "@/models/User";
import connectDb from "@/middleware/mongoose";

const validateEmail = (email) => {
    // Basic email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validatePassword = (password) => {
    // Basic password validation (at least 8 characters)
    return password.length >= 6;
};

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const { name, email, password } = req.body;

            // Validate input data
            if (!name || !email || !password) {
                return res.status(400).json({ success: false, message: 'Name, email, and password are required' });
            }

            // Validate email format
            if (!validateEmail(email)) {
                return res.status(405).json({ success: false, message: 'Invalid email format' });
            }
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(409).json({ success: false, message: 'User with this email already exists' });
            }

            // Validate password strength
            if (!validatePassword(password)) {
                return res.status(403).json({ success: false, message: 'Password must be at least 6 characters long' });
            }


            const user = new User({ name, email, password, pincode: 0, phone: 0, address: "" });

            await user.save();

            res.status(201).json({ success: true, message: 'User registered successfully' });
        } catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ success: false, message: 'Internal server error', details: error.message });
        }
    } else {
        res.status(400).json({ success: false, error: "Invalid Request Method" });
    }
};

export default connectDb(handler);
