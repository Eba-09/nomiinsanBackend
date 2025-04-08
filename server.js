const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const morgan = require("morgan")
dotenv.config({ path: './config/config.env'});
const errorHandler = require('./middleware/error')
const connectDB = require("./config/db")
const authorRouter = require("./router/Author")
const duremRouter = require("./router/durem")
const sanchRouter = require("./router/nomSanch")
const userRouter = require("./router/user")
const categoryRouter = require("./router/Category")
const bookRouter = require('./router/Book')
const zahialgaRouter = require('./router/Zahialga');
const zeelRouter = require('./router/Zeel')
const cors = require('cors')
var fs = require('fs')
var path = require('path')
var accesLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'),{flags:'a'})
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(errorHandler);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(morgan('combined',{stream:accesLogStream}))
app.use('/api/lib/author', authorRouter);
app.use('/api/lib/durem', duremRouter);
app.use('/api/lib/nomsanch', sanchRouter);
app.use('/api/lib/user', userRouter);
app.use('/api/lib/category',categoryRouter);
app.use('/api/lib/book',bookRouter);
app.use('/api/lib/zahialga', zahialgaRouter);
app.use('/api/lib/zeel', zeelRouter);
const server = app.listen(
    process.env.PORT,
    console.log(`express server ${process.env.PORT}`)
)
process.on('unhandledRejection', (err, promise)=>{
    console.log(`aldaa garla : ${err.message}`);
    server.close(()=>{process.exit(1)})
})