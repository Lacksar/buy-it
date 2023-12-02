import Order from "@/models/Order";
import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
const jwt = require('jsonwebtoken');
const handler = async (req, res) => {

    if (req.method == "POST") {

        let user = jwt.decode(req.body.user.value, process.env.SECRET_KEY)
        let foundUser = User.findOne({ _id: user._id })

        if(req.body.price>1){
            res.status(400).json({success:false, msg:"No item in cart"})
        }

        if (foundUser) {
            const order = new Order({
                userId: user._id,
                orderId: Math.random() * Date.now(),
                products: req.body.cart,
                address: req.body.address,
                amount: req.body.subTotal,
                pincode: req.body.pincode
            })

            await order.save()
            res.status(200).json({ success: true, msg: "successfully ordered" })
        }
    } else {
        res.status(400).json({ success: false, "error": "Internal Server Error " })
    }



}

export default connectDb(handler);