const mongoose = require('mongoose')
const TorguuliSchema = new mongoose.Schema({
    userCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    zeelCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Zeels",
    },
    tailbar: {
        type: String,
        required: [true, "Торгуулийн тайлбарыг оруулна уу"],
        trim: true,
    },
    sanchCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Nomsanch",
    },
    dun: {
        type: Number,
        min: [5000, "Хамгийн багадаа 5000 байна"],
        max: [500000, "Хамгийн ихдээ 500000 байна"],
        required: [true, "Торгуулийн хэмжээг оруул"],
    },
    tulsun: {
        type: Boolean,
        default: false, // Зөв бичиглэл
    },
});

module.exports = mongoose.model("Torguuli", TorguuliSchema);
