const mongoose = require("mongoose")

const courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Instructor is required"],
        validate: {
          validator: async (instructorId) => {
            const user = await mongoose.model("User").findById(instructorId)
            return user && user.role === "teacher"
          },
          message: "Instructor must be a user with teacher role",
        },
      },
      students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          validate: {
            validator: async (studentId) => {
              const user = await mongoose.model("User").findById(studentId)
              return user && user.role === "student"
            },
            message: "All enrolled users must be students",
          },
        },
    ],
  },
  { timestamps: true },
)

module.exports = mongoose.model("Course", courseSchema)
