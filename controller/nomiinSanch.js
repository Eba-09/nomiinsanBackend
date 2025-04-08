const Sanch = require("../models/nomiinsanch")
const Error = require("../middleware/error")
const asyncHandler = require("../middleware/asyncHandler")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
exports.getSanchud = asyncHandler(async(req,res,next)=>{
    const sanchud = await Sanch.find()
    res.status(200).json({
        success: true,
        count: sanchud.length,
        data: sanchud
    })
})
// Register
// JWT Token үүсгэх функц
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
// Register
exports.sanchRegister = async (req, res) => {
    const { sanchFN, sanchLN, sanchUtas, sanchPassword, sanchMail } = req.body;
    try {
        // Email бүртгэлтэй эсэхийг шалгах
        const exists = await Sanch.findOne({ sanchMail });
        if (exists) {
            return res.status(400).json({ success: false, message: "Хэрэглэгч аль хэдийн бүртгэгдсэн байна" });
        }
        // Имэйлийн формат шалгах
        if (!validator.isEmail(sanchMail)) {
            return res.status(400).json({ success: false, message: "Хүчинтэй имэйл оруулна уу" });
        }
        // Нууц үгийн урт шалгах
        if (!sanchPassword || sanchPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" });
        }
        // Нууц үг хашлах
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(sanchPassword, salt);

        // Шинэ хэрэглэгч үүсгэх
        const newUser = new Sanch({
            sanchFN,
            sanchLN,
            sanchUtas,
            sanchMail,
            sanchPassword: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Алдаа registersanch функцэд:", error);
        res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа" });
    }
};

exports.sanchLogin = async (req, res) => {
    const { sanchMail, sanchPassword } = req.body;
    try {
        // Хэрэв имэйл болон нууц үг хоосон байвал алдаа буцаах
        if (!sanchMail || !sanchPassword) {
            return res.status(400).json({ success: false, message: "Имэйл болон нууц үгээ оруулна уу" });
        }
        // Хэрэглэгч хайх
        const user = await Sanch.findOne({ sanchMail });
        if (!user) {
            return res.status(400).json({ success: false, message: "Хэрэглэгч олдсонгүй" });
        }
        const users = await Sanch.findOne({ sanchMail });
        // Хэрэв нууц үг байхгүй бол алдаа буцаах
        if (!user.sanchPassword) {
            return res.status(400).json({ success: false, message: "Хэрэглэгчийн нууц үг олдсонгүй" });
        }
        // Нууц үг таарч байгаа эсэхийг шалгах
        const isMatch = await bcrypt.compare(sanchPassword, user.sanchPassword);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Нууц үг буруу байна" });
        }

        // JWT Token үүсгэх
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
        console.log("amjilttai newterlee");
    } catch (error) {
        console.error("Алдаа loginUser функцэд:", error);
        res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа" });
    }
};
//1sanch haruulah
exports.getSanch = asyncHandler(async(req,res,next)=>{
    const sanch = await Sanch.findById(req.params.id)
    if(!sanch){
        throw new Error(req.params.id + 'ID tai sanch baihgui baina',400)
    }
    res.status(200).json({
        success: true,
        data: sanch,
    })
})
exports.getOneSanch = (req, res) => {
    const user = req.user;
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  };


//sanch ustgah
exports.deleteSanch = asyncHandler(async(req,res,next)=>{
    const sanch = await Sanch.findByIdAndDelete(req.params.id)
        if(!sanch){
            throw new Error(req.params.id + 'Id tai sanch baihgui baina.',400)
        }
        res.status(200).json({
            success: true,
            data: sanch
        })
})

//sanch Update
exports.updateSanch = asyncHandler(async(req,res,next)=>{
    const sanch = await Sanch.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true,
            runValidators: true,
        })
    if(!sanch){
        throw new Error(req.params.id + 'ID tai sanch baihgui baina')
    }
    res.status(200).json({
        success: true,
        data: sanch
    })
})