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
      enum: {
        values: ["draft", "published", "closed"],
        message: "Status must be draft, published, or closed",
      },
      default: "draft",
    },
    points: {
      type: Number,
      required: [true, "Points are required"],
      min: [1, "Points must be at least 1"],
      max: [1000, "Points cannot exceed 1000"],
      default: 100,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: [true, "Course is required"],
    },
    submissions: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        submittedAt: {
          type: Date,
          default: Date.now,
        },
        grade: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Assignment", assignmentSchema)
