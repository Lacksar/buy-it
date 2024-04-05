//This is login api 


import User from "@/models/User";
import connectDb from "@/middleware/mongoose";


const jwt = require('jsonwebtoken');
const handler = async (req, res) => {

    if (req.method == "POST") {

        const foundUser = await User.findOne({ "email": req.body.email });

        if (!foundUser) {
            return res.status(401).json({ success: false, message: 'Incorrect UserName or Password' })
        }

        const candidatePassword = req.body.password;

        await foundUser.comparePassword(candidatePassword, (err, isMatch) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Incorrect Username or Password' });
            }

            if (isMatch) {
                const sanitizedUser = foundUser.toPublicJSON();
                const token = jwt.sign(sanitizedUser, process.env.SECRET_KEY, { expiresIn: '1d' });
                return res.status(200).json({ success: true, message: 'Login successful', sanitizedUser, token });

            } else {
                return res.status(401).json({ success: false, message: 'Incorrect UserName or password' });
            }
        });




    }
    else {
        res.status(400).json({ success: false, "error": "Internal Server Error " })
    }



}

export default connectDb(handler);