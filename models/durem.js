const mongoose = require('mongoose')
const DuremSchema = new mongoose.Schema({
    torguuli: {
        type: Number,
        required: [true, 'Торгуулийн хэмжээг оруулна уу'],
        trim: true,
        min: [10000,'Торгуулийн хэмжээг тоогоор оруулсан байх'],
    },
    torguuliAngilal: {
        type: String,
        required: [true, 'Торгуулийн ангиллыг оруулна уу'],
        trim: true,
        maxLength: [400,'Ямар дүрэм зөрчиснийг дэлгэрэнгүй бичсэн байх']
    }
})
module.exports = mongoose.model('Durems', DuremSchema)