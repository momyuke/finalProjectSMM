const multer = require('multer');

const methodFileHandler = function (identify){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `./images/${identify}`);
        },
        filename: function (req, file, cb) {
            cb(null, identify + (Math.floor(Math.random() * 100) + 1) + '.jpeg');
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