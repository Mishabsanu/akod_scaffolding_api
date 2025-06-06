import fs from "fs";
import ApiError from "./apiError.js";

const catchAsync = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      if (req.files) {
        const fileFields = Object.keys(req.files);
        fileFields.forEach((field) => {
          const uploadedFiles = req.files[field];
          if (uploadedFiles && uploadedFiles.length > 0) {
            uploadedFiles.forEach((file) => {
              fs.unlinkSync(file.path);
            });
          }
        });
      }

      return next(new ApiError(error.message, 400));
    }
  };
};

export default catchAsync;
