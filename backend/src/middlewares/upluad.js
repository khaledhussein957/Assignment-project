import multer from "multer";
import path from "path";
import fs from "fs";

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "src/uploads/product/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadImages = multer({ storage: productStorage });

export default uploadImages;
