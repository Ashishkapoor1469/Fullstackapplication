import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "audio_tweets",
    resource_type: "video", // Important for audio
    format: "webm",
  },
});

export const audioUpload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});
