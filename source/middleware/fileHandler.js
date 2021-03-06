const multer = require('multer');
const moment = require('moment');
const path = require('path');

const methodFileHandler = function (identify){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, `../../assets/images/${identify}`));
        },
        filename: function (req, file, cb) {
            cb(null,  moment().format('YYYY-MM-DD_HH-mm-ss') + '.jpeg');
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