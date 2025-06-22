import mongoose from "mongoose";
import EnquiryModel from "../database/schema/enquiry.schema.js";
import catchAsync from "../errors/catchAsync.js";

// export const AddEnquiry = catchAsync(async (req, res) => {
//   const newEnquiry = new EnquiryModel(req.body);
//   const savedEnquiry = await newEnquiry.save();
//   return res.status(201).json({
//     result: savedEnquiry,
//     status: true,
//     message: "Enquiry created successfully",
//   });
// });

export const AddEnquiry = catchAsync(async (req, res) => {
  const { name, email, message, country_code, mobile } = req.body;
  console.log("dddddddddd");

  // Extract uploaded file
  const uploadedFile = req.files?.file?.[0]; // Multer stores files in `req.files`
console.log(uploadedFile,'uploadedFile');

  const filePath = uploadedFile ? uploadedFile.path : null;

  const newEnquiry = new EnquiryModel({
    name,
    email,
    message,
    country_code,
    mobile,
    file: filePath, // Store file path or name in DB
  });

  const savedEnquiry = await newEnquiry.save();

  return res.status(201).json({
    result: savedEnquiry,
    status: true,
    message: "Enquiry created successfully",
  });
});

export const UpdateEnquiry = catchAsync(async (req, res) => {
  const enquiryId = req.query.id;
  const updateData = req.body;
  if (!mongoose.Types.ObjectId.isValid(enquiryId)) {
    return res.status(400).json({
      result: [],
      status: false,
      message: "Invalid enquiry ID",
    });
  }
  const enquiry = await EnquiryModel.findByIdAndUpdate(
    enquiryId,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!enquiry) {
    return res.status(404).json({
      result: [],
      status: false,
      message: "Enquiry not found.",
    });
  }
  res.status(200).json({
    result: enquiry,
    status: true,
    message: "Enquiry Updated successfully",
  });
});

export const DeleteEnquiry = catchAsync(async (req, res) => {
  const { id } = req.query;

  const deletedEnquiry = await EnquiryModel.findByIdAndUpdate(
    id,
    { deleted_at: new Date() },
    { new: true }
  );

  if (!deletedEnquiry) {
    return res.status(404).json({
      status: false,
      message: "Enquiry entry not found",
    });
  }

  return res.status(200).json({
    result: deletedEnquiry,
    status: true,
    message: "Enquiry deleted successfully",
  });
});

export const ListEnquiry = catchAsync(async (req, res) => {
  console.log("mmmmmmmmm");

  const enquiryList = await EnquiryModel.find({ deleted_at: null });
  return res.status(200).json({
    result: enquiryList,
    status: true,
    message: "All active Enquiry entries",
  });
});
