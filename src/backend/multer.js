import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile_imgs/'); // Pasta onde as imagens serão armazenadas
  },
  
  filename: function (req, file, cb) {
    cb(null,`${Date.now()}_${file.originalname}`)
  }
});

// Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {

    cb(null, true);
    
  } else {
    cb(new Error('Arquivo não é uma imagem!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter
});

export default upload;