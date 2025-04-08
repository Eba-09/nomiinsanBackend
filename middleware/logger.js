    //logger middleware
    const logger = (req, res, next) => {
        console.log(`${req.method} ${req.protocol}: // ${req.host} ${req.originalUrl}`)
        next()
    }; //middleware ee use func bolgoj hergleh
module.exports = logger;