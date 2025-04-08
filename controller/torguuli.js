const Torguuli = require("../models/torguuli");
const Error = require("../middleware/error");
const asyncHandler = require("../middleware/asyncHandler");
const User = require("../models/user")
const Zeel = require("../models/zeel");
const Sanch = require("../models/nomiinsanch");
exports.getTorguulis = asyncHandler(async(req,res,next)=>{
    const torguuli = await Torguuli.find().populate("t2.users")
    res.status(200).json({
        success: true,
        count: torguuli.length,
        data: torguuli
    })
});
exports.getTorguuli = asyncHandler(async(req,res,next)=>{
    const torguuli = await Torguuli.findById(req.params.id)
        if(!torguuli){
            throw new Error(req.params.id + "ID tai  torguuli baihgui baina",400)
        }
        res.status(200).json({
            success: true,
            data: torguuli
        })
});
//tuhain 1 userin torguuli
exports.getUserTorguulis= asyncHandler(async(req, res, next)=>{
    let torguuli;
    torguuli = await Torguuli.find({userCode: req.params.userCodeId})
    res.status(200).json({
        success: true,
        count: torguuli.length,
        data: torguuli,
    })
})
exports.getSanchTorguulis= asyncHandler(async(req, res, next)=>{
    let torguuli;
    torguuli = await Torguuli.find({sanchCode: req.params.sanchCodeId})
    res.status(200).json({
        success: true,
        count: torguuli.length,
        data: torguuli,
    })
})
//torguuli uusgeh
exports.createTorguuli = asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.params.userCodeId)
    const sanch = await Sanch.findById(req.params.sanchCodeId)
    const zeel = await Zeel.findById(req.params.sanchCodeId)
        if(!user){
            throw new Error(req.params.userCodeId + 'ID tai user baihgui baina',404);
        }
        if(!sanch){
            throw new Error(req.params.userCodeId + 'ID tai sanch baihgui baina',404);
        }
        if(!zeel){
            throw new Error(req.params.userCodeId + 'ID tai zeel baihgui baina',404);
        }
    const torguuli = await Torguuli.create(req.body)
    res.status(200).json({
        success: true,
        data: torguuli
    })
})
//torguuli zasah
exports.updateTorguuli = asyncHandler(async(req,res,next)=>{
  const torguuli = await Torguuli.findByIdAndUpdate(req.params.id, req.body, {
    new: true, 
    runValidators: true,
  })
    if(!torguuli){
        throw new Error(req.params.id + 'Id tai torguuli baihgui baina', 400)
    }
    res.status(200).json({
        success: true,
        data: torguuli
    })
})
//1zahialga ustgah 
exports.deleteTorguuli = asyncHandler(async(req,res,next)=>{
    const torguuli = await Torguuli.findById(req.params.id)
        if(!torguuli){
            throw new Error(req.params.id + 'ID tai torguuli baihgui baina',400)
        }
        res.status(200).json({
            success: true,
            data: torguuli
        })
})

