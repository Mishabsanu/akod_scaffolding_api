import express from "express";
import {
  AddEnquiry,
  DeleteEnquiry,
  ListEnquiry,
  UpdateEnquiry,
} from "../controllers/enquiry.js";
import verifyToken from "../middleware/index.js";

const router = express.Router();

router.post("/add-enquiry", AddEnquiry);
router.patch("/update-enquiry", UpdateEnquiry);
router.delete("/delete-enquiry", DeleteEnquiry);
router.get("/list-enquiry", verifyToken, ListEnquiry);

export default router;
