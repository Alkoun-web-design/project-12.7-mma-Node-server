import multer from 'multer';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import { statSync } from 'fs';
import path from 'path';
import sharp from 'sharp';


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const uploadDir = join(__dirname, '../uploads');

// if (!fs.access(uploadDir)) {
//   try {
//     await fs.mkdirSync(uploadDir, { recursive: true });
//   } catch (error) {
//     console.error('Error creating upload directory:', error);
//   } 
// }

// Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Save files in this folder
//   },
//   filename: (req, file, cb) => {
//     const fullName = req.body.name;
//     const id = req.body.id;
//     const formattedName = fullName.toLowerCase().replace(/\s+/g, '-');
//     const ext = path.extname(file.originalname);
//     cb(null, `${id}-${formattedName}${ext}`);
//   }
// });

// // Filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only images (JPEG, PNG, GIF, WEBP) are allowed!'), false);
//   }
// };

// // Initialize Multer
// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // 5MB limit
//   }
// });

const storage = multer.memoryStorage(); // Store file in memory for processing


export const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});


export const processImage = async (req, res, next) => {
  // Skip if no file uploaded
  if (!req.file) return next();

  try {
    const fullName = req.body.name;
    const id = req.body.user_id || req.params.id;
    const formattedName = fullName.toLowerCase().replace(/\s+/g, '-');
    // const ext = path.extname(file.originalname);
    const outputPath = path.join('uploads', `${id}-${formattedName}.webp`);

    // Process image with Sharp
    await sharp(req.file.buffer)
      .webp({ 
        quality: 80, // Adjust quality (1-100)
        lossless: false, // For lossy compression
        alphaQuality: 100, // For transparency quality
        force: true // Force WebP output
      })
      .toFile(outputPath);

    // Add file info to request for later use
    req.file.processed = {
      filename: `${id}-${formattedName}.webp`,
      path: outputPath,
      size: statSync(outputPath).size,
      mimetype: 'image/webp'
    };

    next();
  } catch (err) {
    next(err);
  }
};