const asyncHandler = fn => {
    return (req, res, next) => {
        console.log('error flag');
        fn(req, res, next).catch(next);
    }
}

module.exports = asyncHandler; 

 