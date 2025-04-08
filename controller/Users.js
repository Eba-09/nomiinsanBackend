const User = require ('../models/user.js')
const MyError = require ('../middleware/error.js')
const asyncHandler = require ('../middleware/asyncHandler.js')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
//buh hereglegcdyg harah
exports.getUser = asyncHandler(async (req,res,next) =>{
    const user = await User.find()
    res.status(200).json({
        success: true,
        count: user.length,
        user: user,
    })
})
// JWT Token үүсгэх функц
const createToken = (id) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables");
    }
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register
exports.userRegister = async (req, res) => {
    const { Fname, Lname, oyutniCode,email, utas, password  } = req.body;
    try {
        // Email бүртгэлтэй эсэхийг шалгах
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ success: false, message: "Хэрэглэгч аль хэдийн бүртгэгдсэн байна" });
        }
        // Имэйлийн формат шалгах
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Хүчинтэй имэйл оруулна уу" });
        }
        // Нууц үгийн урт шалгах
        if (!password || password.length < 6) {
            return res.status(400).json({ success: false, message: "Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой" });
        }
        // Нууц үг хашлах
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Шинэ хэрэглэгч үүсгэх
        const newUser = new User({
            Fname,
            Lname,
            oyutniCode,
            email,
            utas,
            password: hashedPassword,
        });
        const user = await newUser.save();
        const token = createToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        console.error("Алдаа registersanch функцэд:", error);
        res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа" });
    }
};

exports.userLogin = async (req, res) => {
    const { oyutniCode, password } = req.body;
    try {
        // Хэрэв имэйл болон нууц үг хоосон байвал алдаа буцаах
        if ( !oyutniCode || !password) {
            return res.status(400).json({ success: false, message: "Имэйл болон нууц үгээ оруулна уу" });
        }
        const code = oyutniCode.trim().toLowerCase();
        const user = await User.findOne({
        oyutniCode: { $regex: `^${code}$`, $options: "i" }
        });
        const users = await User.findOne({ oyutniCode });
        // Хэрэв нууц үг байхгүй бол алдаа буцаах
        if (!user.password) {
            return res.status(400).json({ success: false, message: "Хэрэглэгчийн нууц үг олдсонгүй" });
        }
        // Нууц үг таарч байгаа эсэхийг шалгах
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Нууц үг буруу байна" });
        }
        // JWT Token үүсгэх
        const token = createToken(user._id);
        res.status(200).json({ success: true, token });
        console.log("amjilttai newterlee")
    } catch (error) {
        console.error("Алдаа userLogin функцэд:", error);
        res.status(500).json({ success: false, message: "Серверийн алдаа гарлаа" });
    }
};
//1 hereglegch haruulah
exports.getOneUser = (req, res) => {
    const user = req.user;
    res.status(200).json({
      message: "User fetched successfully",
      user: user,
    });
  };
exports.getUserdata = asyncHandler(async (req,res,next)=>{
    const user = await User.findById(req.params.id)
    if(!user){
        console.log(req.params.id + 'ID tai hereglegch baihgui baina')
    }
    res.status(200).json({
        success: true,
        user: user,
    })
})
//1 hereglegchin medeelel ustgah
exports.deleteUser = asyncHandler(async (req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        console.log(req.params.id + 'ID tai hereglegch baihgui baina.', 400)
    }
    res.status(200).json({
        success: true,
        user: user,
    })
})
//1 hereglegchin medeelel zasah
exports.updateUser = asyncHandler(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(req.params.id, req.body,{
        new: true, 
        runValidators: true
    })
    if(!user) {
        console.log(req.params.id + 'ID tai hereglegch baihgui', 400)
    }
    res.status(200).json({
        success: true, 
        user: user,
    })
})