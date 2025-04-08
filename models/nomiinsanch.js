const mongoose = require('mongoose')
const NomiinsanchSchema = new mongoose.Schema({
      sanchFN: {
        type: String,
        required: [true, 'Овог нэрийг оруулна уу?'],
        trim: true,
        maxLength: [50,'Овог нэрийг заавал бөглөх ёстой'],
    },
      sanchLN: {
        type: String,
        required: [true, 'Өөрийн нэрийг оруулна уу?'],
        trim: true,
        maxLength: [50,'Энэ хэсгийг заавал бөглөсөн байх ёстой'],
      },
      sanchUtas: {
        type: String,
        repuired: [true, 'Номын санч утасны дугаарыг оруулна уу'],
        select: true,
        maxLength: [8, 'Утасны дугаар нь 8 тэмдэгт урттай байх'],
      },
      sanchMail: {
        type: String,
        required: [true, "Номын санч эмэйл хаягийг оруулна уу"],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Эмэйл хаяг буруу байна"]
      },
      sanchPassword: {
        type: String,
        minLength: 6,
        required: [true, "Нууц үгээ оруулна уу"],
        //ene talbariig find() haruulahgui.
    },
    resetPasswordToken: String,
    resetPassowrdExpire: Date,
    createdAt: {
        type: Date,
        default: Date.now
    }
    }
  )
module.exports = mongoose.model("Nomsanches", NomiinsanchSchema)
    
