
import Product from "@/models/Product";
import connectDb from "@/middleware/mongoose";

const handler = async (req, res) => {

    if (req.method == "POST") {
        for (let i = 0; i < req.body.length; i++) {


            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
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





        }
        res.status(200).send({ "success": "product add sucess" })

    }
    else {
        req.status(400).json({ "error": "Internal Server Error " })
    }



}

export default connectDb(handler);