const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

// Import models
const Student = require("./models/Student")
const Assignment = require("./models/Assignment")
const Discussion = require("./models/Discussion")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eduvault")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("Database connection error:", err))

// Routes
app.get("/", (req, res) => {
  res.json({ message: "EduVault API Server Running with MongoDB" })
})

// GET Routes
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find()
    res.json({ success: true, data: students })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/assignments", async (req, res) => {
  try {
    const assignments = await Assignment.find()
    res.json({ success: true, data: assignments })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

app.get("/api/discussions", async (req, res) => {
  try {
    const discussions = await Discussion.find()
    res.json({ success: true, data: discussions })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
})

// POST Routes
app.post("/api/students", async (req, res) => {
  try {
    const student = new Student(req.body)
    await student.save()
    res.json({ success: true, data: student, message: "Student created" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post("/api/assignments", async (req, res) => {
  try {
    const assignment = new Assignment(req.body)
    await assignment.save()
    res.json({ success: true, data: assignment, message: "Assignment created" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.post("/api/discussions", async (req, res) => {
  try {
    const discussion = new Discussion(req.body)
    await discussion.save()
    res.json({ success: true, data: discussion, message: "Discussion created" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// PUT Routes
app.put("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" })
    }
    res.json({ success: true, data: student, message: "Student updated" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

app.put("/api/assignments/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!assignment) {
      return res.status(404).json({ success: false, message: "Assignment not found" })
    }
    res.json({ success: true, data: assignment, message: "Assignment updated" })
  } catch (error) {
    res.status(400).json({ success: false, error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
