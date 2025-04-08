const mongoose = require('mongoose')
const BookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Номын нэрийг оруулна уу'],
        trim: true,
        maxLength: [250, 'Номын нэрний урт 250 тэмдэгт байх'],
    },
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    authorId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Authors',
        repuired: true,
    },
    isbn: {
        type: Number,
        required: [true, 'Номын isbn оруулна уу.'],         
        
    },
    rating: {
        type: Number,
        min: [1, 'Рэйтинг хамгийн багадаа 1 байх ёстой'], 
        max: [5, 'Рэйтинг хамгийн ихдээ 5 байх ёстой'], 
    },
    price:{
        type: Number,
        required: [true, 'Номын үнийг оруулна уу.'],
        min:[3000, 'Номын үнэ хамгийн багадаа 3000 төгрөг байна.']
    },
    hel: {
        type: String,
        trim: true,
        maxLength:[50, 'Хэлээ хамгийн уртдаа 50 тэмдэгт байна'],
    },
    hevlesenOgnoo: {
        type: Date,
        maxLength:[9, 'Он:сар:өдөр гэсэн форматаар байхыг анхаарна уу.'],
        trim: true,
    },
    too: {
        type: Number,
        required: [true, 'Номны хэдэн ширхэг байгаа тоог оруулна уу.'],
        max: [1, 'Ном дээд талдаа 1 байх.'], 
        max: [20, 'Дээд талдаа 20ш ном байх ёстой.'],
    },
    huudas: {
        type: Number,
        max: [700, 'Ном дээд талдаа 700 хуудастай байх.'], 
    },
    available:['new','old', 'ашиглахгүй'],
    bairshil: {
        type: String,
        required: [true, "Номын байршилыг оруулна уу"],
        trim: true,
        maxLength: [200, 'Номын байршил нь ихдээ 100 тэмдэгт байх'],
    },
    category:{
        type: mongoose.Schema.ObjectId,
        ref: 'Categories', //reference buyu zaagch torol
        required: true
    },
    createUser:{
        type:mongoose.Schema.ObjectId,
        ref: 'nomsanches',
    },
    createAt: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model("Books", BookSchema)