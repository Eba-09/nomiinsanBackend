const asyncHandler = (Mysync) =>(req, res, next) =>
    Promise.resolve(Mysync(req,res,next)).catch(next)
module.exports = asyncHandler