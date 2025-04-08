const Author = require("../models/Author");
const Error = require("../middleware/error")
const asyncHandler = require("../middleware/asyncHandler")
//buh zohiogchiig  haruulah
exports.getAuthors = asyncHandler(async(req,res,next)=>{
    const authors = await Author.find()
    res.status(200).json({
        success: true,
        count: authors.length,
        data: authors,
    })
})
//1 zohiogc haruulah
exports.getAuthor = asyncHandler (async(req,res,next)=>{
    const author = await Author.findById(req.params.id)
    res.status(200).json({
        success: true,
        data: author,
    })
})
//zohiogc nemeh
exports.createAuthor = asyncHandler(async (req, res, next) => {
    const { AuthorFname, AuthorLname, AuthorPhone } = req.body;
    if (!AuthorFname || !AuthorLname || !AuthorPhone) {
        return res.status(400).json({ success: false, message: 'Бүх талбаруудыг бөглөнө үү.' });
    }
    const author = await Author.create({
        firstName: AuthorFname,
        lastName: AuthorLname,
        phone: AuthorPhone
    });
    res.status(201).json({
        success: true,
        data: author,
    });
});

//zohiogc hasah 
exports.deleteAuthor = asyncHandler(async(req,res,next)=>{
    const author = await Author.findById(req.params.id)
    if(!author){
        throw new Error(req.params.id+ 'Id tai zohiogch baihgui baina.' ,400)
    }
    res.status(200).json({
        success: true,
        data: author,
    })
})
//zohiogch zasah
exports.updateAuthor = asyncHandler(async(req,res,next)=>{
    const author = await Author.findByIdAndUpdate(req.params.id, req.body,
        {new: true,
            runValidators: true
        })
    if(!author){
        throw new Error(req.params.id+ 'ID tai zohiolc baihgui baina')
    }
        res.status(200).json({
        success: true,
        data: author,
    })
})