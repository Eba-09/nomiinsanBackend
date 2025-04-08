const Durem = require("../models/durem")
const Error = require("../middleware/error")
const asyncHandler = require("../middleware/asyncHandler")
// buh durem harah

exports.getDurems = asyncHandler(async(req,res,next)=>{
    const durems = await Durem.find()
    res.status(200).json({
        success: true,
        count: durems.length,
        data: durems,
    })
})
exports.getDurem = asyncHandler(async (req, res, next) =>{
    const durem = await Durem.findById(req.params.id)
        if(!durem){
            throw new Error(req.params.id + 'ID tai durem baihgui baina',400)
        }
        res.status(200).json({
            success: true,
            data: durem
        })
})
exports.createDurem = asyncHandler(async (req,res,next)=>{
    const durem = await Durem.create(req.body)
    res.status(200).json({
        success: true,
        data: durem
    })
})
exports.updateDurem = asyncHandler(async(req,res,next)=>{
    const durem = await Durem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    if(!durem){
        throw new Error(req.params.id + 'ID tai durem baihgui baina')
    }
    res.status(200).json({
        success:true,
        data: durem
    })
})

exports.deleteDurem = asyncHandler(async(req,res,next)=>{
    const durem = Durem.findByIdAndDelete(req.params.id)
        if(!durem){
            throw new Error(req.params.id + 'ID tai durem baihgui baina')
        }
        res.status(200).json({
            success: true,
            data: durem
        })
})