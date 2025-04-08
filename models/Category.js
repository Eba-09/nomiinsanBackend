const mongoose = require('mongoose')
const CategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Category neriig oruulna uu'],
        unique: true,
        trim: true,
        maxLength: [50, 'Category temdegt 500 aas hetrehgui']
    },
description:{
    type:String,
    required: [true, 'Category tailbariig'],
        trim: true,
        maxLength: [500, 'Category temdegt 500 aas hetrehgui']

},
    averageRating: {
        type: Number,
        min: [1, 'Reiting hamgiin bagadaa 1 baih yostoi'],
        max: [10, 'reiting ni hamgiin ihdee 10baih yostoi']
    },
    averagePrice: Number,
    createAt: {
        type: Date,
        default: Date.now
    }
})
module.exports= mongoose.model('Categories',CategorySchema)