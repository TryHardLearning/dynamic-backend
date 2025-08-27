import multer from 'multer';

const storage = multer.diskStorage({
    filename: (_, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

export default upload;