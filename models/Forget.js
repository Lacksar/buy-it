const mongoose = require("mongoose");

const ForgetSchema = new mongoose.Schema({

    userid: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    token: { type: String, required: true }



}, { timestamps: true })

mongoose.models = {}

export default mongoose.model("Forget", ForgetSchema);