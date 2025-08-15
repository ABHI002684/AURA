import multer from 'multer';

const storage = multer.diskStorage({
    destimation: (req,file,cb)=>{ // Specify the destination for uploaded files
        cb(null,'./public'); //store files in public directory null is for error
    },

    filename:(req,file,cb)=>{// Specify the name of the file
        cb(null,file.originalname);
    }
});

const upload = multer({storage}); //create multer instance with storage configuration

export default upload;