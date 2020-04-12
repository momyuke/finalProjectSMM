const multer = require('multer');

const methodFileHandler = function (identify){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./images/${identify}`);
        },
        filename: function (req, file, cb) {
            const fileName = identify === 'user' ? req.body.displayName  : req.body.firstName;
            cb(null, identify + fileName + '.jpeg');
        }
    })
    
    const fileFilterReq = (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    
    const uploadHandler = multer({ 
        storage: storage, 
        fileFilter : fileFilterReq
    });

    return uploadHandler;
}

module.exports = methodFileHandler;