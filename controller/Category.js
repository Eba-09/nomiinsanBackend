const Category = require("../models/Category")
const asyncHandler = require("../middleware/asyncHandler")
const Error = require("../middleware/error")
exports.getCategories = asyncHandler(async(req,res,next)=>{
    try{
        const category = await Category.find()
        res.status(200).json({
            success: true,
            count: category.length,
            data: category
        })
    }
    catch(err){
        next(err)
    }
})
//category ID gaar
exports.getCategory = asyncHandler(async(req,res,next)=>{
    try{
        const category = await Category.findById(req.params.id)
        if(!category){
            throw new Error(req.params.id + 'ID tai category baihgui ',400)
    }
    res.status(200).json({
        success: true,
        data: category,
    })
}
    catch(err){
        next(err)
    }
})
//create Category
exports.createCategory = asyncHandler(async (req, res, next) => {
    try {
        const { name } = req.body;
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Ene category burtgeltei baina'
            });
        }
        const category = await Category.create(req.body);
        res.status(200).json({
            success: true,
            data: category
        });
    } catch (err) {
        next(err);
    }
});

//category zasah
exports.updateCategory = asyncHandler(async(req,res,next)=>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.id,req.body,
            {
                new: true,
                runValidators: true
            })
            if(!category){
                throw new Error(req.params.id + 'ID tai nom baihgui baina',400)
            }
            res.status(200).json({
                success: true,
                data: category
            })
    }
    catch(err){
        next(err)
    }
})
//delete Category
exports.deleteCategory = asyncHandler(async(req,res,next)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id)
        if(!category){
            throw new Error(req.params.id + 'ID tai category baihgui baina.' ,400)
        }
        res.status(200).json({
            success: true,
            data: category
        })
    }
    catch(err){
        next(err)
    }
})