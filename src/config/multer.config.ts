import { diskStorage } from "multer";
import { extname } from "path";


export const multerConfig={
   
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
              callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
            },
            
          }),
          fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
              return cb(new Error('Only image files are allowed!'), false);
            }
            cb(null, true);
          },
          limits: {
            fileSize: 10 * 1024 * 1024, // 10MB
          },
   
}