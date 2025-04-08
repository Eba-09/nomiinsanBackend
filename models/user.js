const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    Fname: {
        type: String,
        required: [true, 'Хэрэглэгчийн Овогийг оруулна уу'],
    },
    Lname: {
        type: String,
        required: [true, 'Хэрэглэгчийн нэрийг оруулна уу'],
    },
    oyutniCode:{
        type: String,
        required: [true, 'Оюутны кодоо оруулна уу.'],
    },
    email: {
        type: String,
        required: [true, "Хэрэглэгчийн эмэйл хаягийг оруулна уу"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Эмэйл хаяг буруу байна"]
    },
    utas: {
        type: String,
        repuired: [true, 'Хэрэглэгчийн утасны дугаарыг оруулна уу'],
        select: true,
        maxLength: [8, 'Утасны дугаар нь 8 тэмдэгт урттай байх'],
    },
    password: {
        type: String,
        minLength: 4,
        required: [true, "Нууц үгээ оруулна уу"],
    },
    resetPasswordToken: String,
    resetPassowrdExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
// UserSchema.pre("save", async function () {
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })
module.exports = mongoose.model("Users", UserSchema);