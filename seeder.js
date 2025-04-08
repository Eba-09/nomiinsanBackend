const fs = require('fs') // file g systemes unshih
const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const errorHandler = require('./middleware/error')
const connectDB = require("./config/db")
dotenv.config({ path: './config/config.env'});
const Author = require("./models/Author");
const Book = require("./models/book");
const Category = require("./models/Category");
const Durem = require("./models/durem");
const nomSanch = require("./models/nomiinsanch");
const Torguuli = require("./models/torguuli");
const User = require("./models/user");
const Zahialga = require("./models/zahialga");
const Zeel = require("./models/zeel");

dotenv.config({ path: './config/config.env'});
mongoose.connect(process.env.MONGODB_URL)
const mycategories = JSON.parse(fs.readFileSync(__dirname + '/data/categories.json', 'utf-8'))
const myAuthors = JSON.parse(fs.readFileSync(__dirname + '/data/author.json', 'utf-8'))
const myUsers = JSON.parse(fs.readFileSync(__dirname + '/data/user.json', 'utf-8'))
const myBooks = JSON.parse(fs.readFileSync(__dirname + '/data/book.json', 'utf-8'))
const myDurems = JSON.parse(fs.readFileSync(__dirname + '/data/durem.json', 'utf-8'))
const mySanchs = JSON.parse(fs.readFileSync(__dirname + '/data/nomiinsanch.json', 'utf-8'))
const myTorguulis = JSON.parse(fs.readFileSync(__dirname + '/data/torguuli.json', 'utf-8'))
const myZahialgas = JSON.parse(fs.readFileSync(__dirname + '/data/zahialga.json', 'utf-8'))
const myZeels = JSON.parse(fs.readFileSync(__dirname + '/data/zeel.json', 'utf-8'))
const importData = async () =>{
    try{
        await Category.create(mycategories)
        await User.create(myUsers)
        await Author.create(myAuthors)
        await Book.create(myBooks)
        await Durem.create(myDurems)
        await nomSanch.create(mySanchs)
        await Torguuli.create(myTorguulis)
        await Zahialga.create(myZahialgas)
        await Zeel.create(myZeels)
    }
    catch(err){
        console.log(err)
    }
}
const deleteData = async () =>{
    try{
        await Category.deleteMany()
        await User.deleteMany()
        await Author.deleteMany()
        await Book.deleteMany()
        await Durem.deleteMany(myDurems)
        await nomSanch.deleteMany(mySanchs)
        await Torguuli.deleteMany(myTorguulis)
        await Zahialga.deleteMany(myZahialgas)
        await Zeel.deleteMany(myZeels)
    }
    catch(err){
        console.log(err)
    }
}
if(process.argv[2] == '-i'){
    importData()
    console.log('бүх өгөгдлийг импортлож орууллаа')
}
else if (process.argv[2] == '-d'){
    deleteData()
    console.log('Бүх өгөгдлийг устгаж дууслаа.')
}
