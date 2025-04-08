const mongoose = require("mongoose")
const ZahialgaSchema = new mongoose.Schema({
    nomCode:{
        type: mongoose.Schema.ObjectId,
        ref: 'Books', //reference buyu zaagch torol
        required: true,
    },
    userCode:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users', //reference buyu zaagch torol
        required: true,
    },
    tuluw:{
        type: Boolean,
        default: false,
    },
    zahialgaDate: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model("Zahialga", ZahialgaSchema)
