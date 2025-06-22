import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: [true, "Email ID required"],
    trim: true,
  },
  country_code: {
    type: String,
    required: [true, "Country Code is required"],
    trim: true,
  },
  mobile: {
    type: String,
    required: [true, "Mobile Number is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  file: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ["open", "responded", "closed"],
    default: "open",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

const EnquiryModel = mongoose.model("enquiry", EnquirySchema);

export default EnquiryModel;
