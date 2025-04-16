const Book = require("../models/book")
const Error = require("../middleware/error")
const asyncHandler = require("../middleware/asyncHandler");
const Category = require("../models/Category");
const fs = require('fs');
const path = require('path');
const multer = require('multer');
//buh nom harah
exports.getBooks = asyncHandler(async(req, res, next)=>{
    const books = await Book.find().populate('authorId')
    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
    })
})
//1 categort baiga buh nom
exports.getCategoryBooks= asyncHandler(async(req, res, next)=>{
    let books;
    if(req.params.categoryId === '67f131d44f4702327dac47e8')
        books = await Book.find().populate('authorId').populate('category')
    else
    books = await Book.find({category: req.params.categoryId}).populate('category').populate('authorId');
    res.status(200).json({
        success: true,
        count: books.length,
        data: books,
    })
}) 
//1 zohiolcin bicsen buh nomiig haruulah
exports.getAuthorBooks = asyncHandler(async(req,res,next)=>{
    let books;
        books = await Book.find({authorId: req.params.authorIdId}).populate('authorId')
    res.status(200).json({
        success: true,
        count: books.length,
        data: books
    })
})
//1 nom id gaar 
exports.getBook = asyncHandler(async(req,res,next)=>{
    const book = await Book.findById(req.params.id).populate('authorId')
        if(!book){
            throw new Error(req.params.id + 'ID tai nom baihgui baina',400)
        }
    res.status(200).json({
        success: true,
        data: book
    })
})
//1nom medeelel uusgeh
// 1 номын мэдээлэл үүсгэх
exports.createBook = asyncHandler(async (req, res, next) => {
    const { name, authorId, isbn, rating, price, hel, hewlesenOgnoo, too, huudas, available, bairshil, createUser, category, photo } = req.body;

    // Шаардлагатай талбаруудыг шалгах
    if (!name || !authorId || !isbn || !price || !photo) {
        return res.status(400).send('Зураг болон үндсэн мэдээллүүдийг бүрэн оруулна уу!');
    }

    // Ангилал шалгах
    const catid = await Category.findById(category);
    if (!catid) {
        return res.status(400).send('Зөв ангилал сонгоно уу!');
    }

    // Номын өгөгдлийг бүрдүүлэх
    const bookData = {
        name,
        photo, // Cloudinary URL ашиглана
        authorId,
        isbn,
        rating,
        price,
        hel,
        hewlesenOgnoo,
        too,
        huudas,
        available,
        bairshil,
        category,
        createUser
    };

    // Хадгалах
    try {
        const newBook = new Book(bookData);
        await newBook.save();
        console.log('Ном амжилттай хадгалагдлаа:', bookData);
        return res.status(200).json({ message: 'Ном амжилттай хадгалагдлаа!', data: bookData });
    } catch (error) {
        console.error('Ном хадгалахад алдаа гарлаа:', error);
        return res.status(500).send('Ном хадгалахад алдаа гарлаа');
    }
});

// 1 nom medeelel uurcluh
exports.updateBook = asyncHandler(async(req,res,next)=>{
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
    if(!book){
        throw new Error(req.params.id + 'ID tai nom baihgui baina.',400)
    }
    res.status(200).json({
        success: true,
        data: book
    })
})
//1nom ustgah 
exports.deleteBook = asyncHandler(async(req,res,next)=>{
    const book = await Book.findByIdAndDelete(req.params.id)
        if(!book){
            throw new Error(req.params.id + 'ID tai nom baihgui baina',400)
        }
        res.status(200).json({
            success: true,
            data: book
        })
})

