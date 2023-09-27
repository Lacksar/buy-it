
import User from "@/models/User";
import connectDb from "@/middleware/mongoose";


const handler = async (req, res) => {




    if (req.method == "POST") {

        try {
            const { name, email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({ success: false, message: 'Username already exists' });
            }

            const user = new User({ name, email, password });
            await user.save();
            res.status(201).json({ success: true, message: 'User registered successfully' });

        } catch (error) {
            res.status(500).json({ success: false, message: 'Internal server error' });
        }


    }
    else {
        res.status(400).json({ success: false, "error": "Internal Server Error! " })
    }



}

export default connectDb(handler);