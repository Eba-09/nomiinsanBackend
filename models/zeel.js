const mongoose = require('mongoose')
const ZeelSchema = new mongoose.Schema({
    nomCode:{
            type: mongoose.Schema.ObjectId,
            ref: 'Books', //reference buyu zaagch torol
            required: true,
        },
    userCode:{
        type: mongoose.Schema.ObjectId,
        ref: 'Users', //reference buyu zaagch torol
        required: true
    },
    sanchCode:{
        type: mongoose.Schema.ObjectId,
        ref: 'Nomsanches', //reference buyu zaagch torol
        required: true
    },
    nomawsanDate: {
        type: Date,
        default: Date.now
    },
    butsaahDate: {
        type: Date,
        required: [true, 'Буцааж өгөх хугацааг оруулна уу'],
    },
    hugatsaaHetreh:{
        type: Boolean,
        default: false
    },
    ugsun:{
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Zeels', ZeelSchema)
