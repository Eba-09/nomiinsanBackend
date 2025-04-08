const Zahialga = require("../models/zahialga");
const Error = require("../middleware/error");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user");
const Book = require("../models/book");
exports.getZahialgas = asyncHandler(async(req,res,next)=>{
    const zahialgas = await Zahialga.find().populate("userCode").populate("nomCode")
    res.status(200).json({
        success: true,
        count: zahialgas.length,
        data: zahialgas
    })
});
exports.getZahialga = asyncHandler(async(req,res,next)=>{
    const zahialga = await Zahialga.findById(req.params.id).populate('nomCode')
        if(!zahialga){
            throw new Error(req.params.id + "ID tai zahialga baihgui baina",400)
        }
        res.status(200).json({
            success: true,
            data: zahialga
        })
});
//1user zahialga shiidel 
exports.getUserZahialgud = asyncHandler(async(req,res,next)=>{
    const zahialgas = await Zahialga.find().populate("nomCode");
    res.status(200).json({
        success: true,
        count: zahialgas.length,
        data: zahialgas
    })
});
//tuhain 1 userin zahialguud
exports.getUserZahialga = asyncHandler(async(req,res,next)=>{
    const zahialga = await Zahialga.find({userCode: req.params.userCodeId}).populate("nomCode")
        if(!zahialga){
            throw new Error(req.params.id + 'ID tai hereglegch baihgui baina',400);
        }
        res.status(200).json({
            success: true,
            count: zahialga.length,
            data: zahialga
        })
})
//zahialga uusgeh
exports.createZahialga = asyncHandler(async(req,res,next)=>{
    const {nomCode, userCode} = req.body;
    const user = await User.findById(userCode);
        if(!user){
            return res.status(404).json({
                success: false,
                message: `ID: ${userCode} - ном олдсонгүй`
        })}
        nom = await Book.findById(nomCode)
        if(!nom){
            return res.status(404).json({
                success: false,
                message: `ID: ${nomCode} - ном олдсонгүй`
        })}
        const zahialga = await Zahialga.create({
            nomCode: nom._id,   
            userCode: user._id,  
            ...req.body
        });
    res.status(200).json({
        success: true,
        data: zahialga
    })
})
//zahialga zasah
exports.updateZahialga = asyncHandler(async(req,res,next)=>{
  const zahialga = await Zahialga.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    runValidators: true,
  })
    if(!zahialga){
        throw new Error(req.params.id + 'Id tai zahialga baihgui baina', 400)
    }
    res.status(200).json({
        success: true,
        data: zahialga
    })
})
//1zahialga ustgah 
exports.deleteZahialga = asyncHandler(async(req,res,next)=>{
    const zahialga = await Zahialga.findById(req.params.id)
        if(!zahialga){
            throw new Error(req.params.id + 'ID tai zahialga baihgui baina',400)
        }
        res.status(200).json({
            success: true,
            data: zahialga
        })
})

