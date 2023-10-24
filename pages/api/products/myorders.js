
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
const jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    if (req.method == "POST") {

        const token = req.body.token;
        const user = jwt.decode(token, process.env.SECRET_KEY)
        let foundData = await Order.find({ userId: user._id })

        res.status(200).json({ foundData });
    }
    else {
        res.status(400).json({ "error": "Internal Server Error " })
    }


}

export default connectDb(handler);