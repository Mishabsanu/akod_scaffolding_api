import express from "express";
import {
  AddEnquiry,
  DeleteEnquiry,
  ListEnquiry,
  UpdateEnquiry,
} from "../controllers/enquiry.js";
import verifyToken from "../middleware/index.js";
import { MulterFunction } from "../config/multer/multer.js";

const router = express.Router();

router.post(
  "/add-enquiry",

  MulterFunction("./uploads").fields([{ name: "file", maxCount: 1 }]),
  AddEnquiry
);
router.patch("/update-enquiry", UpdateEnquiry);
router.delete("/delete-enquiry", DeleteEnquiry);
router.get("/list-enquiry", verifyToken, ListEnquiry);

export default router;
