
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == "POST") {

        for (let i = 0; i < req.body.length; i++) {

            try {
                let p = new Product({
                    title: req.body[i].title,
                    slug: `${req.body[i].title}-${req.body[i].color}-${req.body[i].size}`,
                    desc: req.body[i].desc,
                    image: req.body[i].image,
                    category: req.body[i].category,
                    size: req.body[i].size,
                    color: req.body[i].color,
                    price: req.body[i].price,
                    availableQuantity: req.body[i].availableQuantity,
                }
                )


                await p.save();
            } catch {
                res.status(400).json({ "success": false, message: "duplicate product found" })
            }




        }
        res.status(200).send({ "success": true, message: "product add sucess" })

    }
    else {
        res.status(400).json({ success: false, "message": "Internal Server Error " })
    }



}

export default connectDb(handler);