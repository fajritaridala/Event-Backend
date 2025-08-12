import { v2 as cloudinary } from "cloudinary";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "./env";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// // cloudinary connection test
// cloudinary.api
//   .ping()
//   .then((result) => {
//     console.log("Cloudinary connected successfully!");
//     console.log("Account info:", result);
//   })
//   .catch((error) => {
//     console.log("Cloudinary connection failed:", error.message);
//   });

const toDataURL = (file: Express.Multer.File) => {
  const b64 = Buffer.from(file.buffer).toString("base64");
  const dataUrl = `data:${file.mimetype};base64,${b64}`;
  return dataUrl;
};

const getPublicIDFromFileUrl = (fileUrl: string) => {
  const fileNameUsingSubstring = fileUrl.substring(
    fileUrl.lastIndexOf("/") + 1
  );
  const publicID = fileNameUsingSubstring.substring(
    0,
    fileNameUsingSubstring.lastIndexOf(".")
  );
  return publicID;
};

export default {
  async uploadSingle(file: Express.Multer.File) {
    const fileDataUrl = toDataURL(file);
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "auto", 
    });
    return result;
  },
  async uploadMultiple(files: Express.Multer.File[]) {
    const uploadBatch = files.map((item) => {
      const result = this.uploadSingle(item);
      return result;
    });
    const results = await Promise.all(uploadBatch);
    return results;
  },
  async remove(fileUrl: string) {
    const publicID = getPublicIDFromFileUrl(fileUrl);
    const result = await cloudinary.uploader.destroy(publicID);
    return result;
  },
};
