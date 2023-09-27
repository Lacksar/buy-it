const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    name: { required: true, type: String },
    email: { required: true, type: String, unique: true },
    password: { required: true, type: String },



}, { timestamps: true })


UserSchema.pre('save', async function (next) {
    try {

        const salt = Number(process.env.SALT);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;

        next();

    } catch (error) {
        next(error);
    }
});


UserSchema.methods.comparePassword = function (candidatePassword, callback) {


    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    }

    );
}






UserSchema.methods.toPublicJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;

    return user;
};


mongoose.models = {}
export default mongoose.model("User", UserSchema);
