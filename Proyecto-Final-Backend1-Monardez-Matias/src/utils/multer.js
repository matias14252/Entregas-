import multer from 'multer';
import { join } from 'path';
import { __dirname } from '../path.js';

let folder;

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        
        if (file.mimetype.startsWith('profile/')) {
            folder = 'profiles';
        } else if (file.mimetype.startsWith('product/')) {
            folder = 'products';
        } else {
            folder = 'documents'; 
        }
        const destinationPath = join(__dirname, 'public', folder);
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const uniqueFilename = `${Date.now()}${file.originalname}`;
        cb(null, uniqueFilename);
    }
});

export const uploader = multer({ storage: storage });

