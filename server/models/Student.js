const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    studentId: {
      type: String,
      required: true,
      unique: true,
    },
    major: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      enum: ["Freshman", "Sophomore", "Junior", "Senior"],
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Student", studentSchema)
