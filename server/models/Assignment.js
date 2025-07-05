const mongoose = require("mongoose")

const assignmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
    points: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Assignment", assignmentSchema)
