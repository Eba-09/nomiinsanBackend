const Zeel = require("../models/zeel");
const Error = require("../middleware/error");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user");
const Sanch = require("../models/nomiinsanch");
const Zahialga = require("../models/zahialga");
exports.getZeels = asyncHandler(async(req,res,next)=>{
    const zeels = await Zeel.find().populate("userCode").populate("nomCode").populate("sanchCode")
    res.status(200).json({
        success: true,
        count: zeels.length,
        data: zeels
    })
});
exports.getZeel = asyncHandler(async(req,res,next)=>{
    const zeel = await Zeel.findById(req.params.id)
        if(!zeel){
            throw new Error(req.params.id + "ID tai zeel baihgui baina",400)
        }
        res.status(200).json({
            success: true,
            data: zeel
        })
});
//tuhain 1 userin zeeluud
exports.getUserZeels = asyncHandler(async(req,res,next)=>{
    const zeels = await Zeel.find({userCode: req.params.userCodeId}).populate("nomCode").populate("sanchCode")
        if(!zeels){
            throw new Error(req.params.id + 'ID tai hereglegch baihgui baina',400);
        }
        res.status(200).json({
            success: true,
            count: zeels.length,
            data: zeels
        })
});
exports.getSanchZeels = asyncHandler(async(req,res,next)=>{
    const zeels = await Zeel.find({sanchCode: req.params.sanchCodeId})
        if(!zeels){
            throw new Error(req.params.id + 'ID tai hereglegch baihgui baina',400);
        }
        res.status(200).json({
            success: true,
            count: zeels.length,
            data: zeels
        })
});
//zeel uusgeh
exports.createZeel = asyncHandler(async(req,res,next)=>{
    const { nomCode, userCode, sanchCode, butsaahDate } = req.body
        if(!userCode){
            console.log(req.params.userCodeId + 'ID tai user baihgui baina',404);
        }
        if(!sanchCode){
            console.log(req.params.sanchCodeId + 'ID tai sanch baihgui baina',404);
        }
    const zeel = await Zeel.create(req.body)
    res.status(200).json({
        success: true,
        data: zeel
    })
})
//zeel zasah
exports.updateZeel = asyncHandler(async(req,res,next)=>{
    const zeel = await Zeel.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    runValidators: true,
    })
    if(!zeel){
        throw new Error(req.params.id + 'Id tai zeel baihgui baina', 400)
    }
    res.status(200).json({
        success: true,
        data: zeel
    })
})
//1zeel ustgah 
exports.deleteZeel = asyncHandler(async(req,res,next)=>{
    const zeel = await Zeel.findById(req.params.id)
        if(!zeel){
            throw new Error(req.params.id + 'ID tai zeel baihgui baina',400)
        }
        res.status(200).json({
            success: true,
            data: zeel
        })
})



