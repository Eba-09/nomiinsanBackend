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
exports.createBook = asyncHandler(async (req, res, next) => {
    try {
        // Зураг болон бусад өгөгдлийг шалгана
        if (!req.file || !req.body) {
            return res.status(400).json({ message: 'Фото болон мэдээллийг бүрдүүлнэ үү!' });
        }

        const { name, authorId, isbn, rating, price, hel, hewlesenOgnoo, too, huudas, available, bairshil, category, createUser } = req.body;

        // Категори шалгах
        const cat = await Category.findById(category);
        if (!cat) {
            return res.status(404).json({ message: 'Ийм ID-тай ангилал олдсонгүй' });
        }

        // Зургийн зам
        const photoPath = `/uploads/${req.file.filename}`;
        const bookData = {
            name,
            photo: photoPath,
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
        const newBook = new Book(bookData);
        await newBook.save();
        console.log('Ном амжилттай хадгалагдлаа:', newBook);
        return res.status(201).json({ message: 'Ном амжилттай хадгалагдлаа!', data: newBook });
    } catch (error) {
        console.error('Ном хадгалахад алдаа:', error);
        return res.status(500).json({ message: 'Дотоод серверийн алдаа' });
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

