const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

// Import Discussion model
const Discussion = require("./models/Discussion")

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())

// Database connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/eduvault")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Database connection error:", err))

// Root route
app.get("/", (req, res) => {
  res.json({ message: "EduVault API Server with Discussion CRUD Operations" })
})

// 📖 READ OPERATIONS - GET Discussions
app.get("/api/discussions", async (req, res) => {
  try {
    console.log("📖 READ: Fetching all discussions from database")

    const discussions = await Discussion.find()

    console.log(`✅ READ SUCCESS: Found ${discussions.length} discussions`)
    res.json({
      success: true,
      count: discussions.length,
      data: discussions,
    })
  } catch (error) {
    console.error("❌ READ ERROR:", error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

// 📖 READ OPERATION - GET Single Discussion
app.get("/api/discussions/:id", async (req, res) => {
  try {
    console.log(`📖 READ: Fetching discussion with ID: ${req.params.id}`)

    const discussion = await Discussion.findById(req.params.id)

    if (!discussion) {
      console.log("❌ READ: Discussion not found")
      return res.status(404).json({ success: false, message: "Discussion not found" })
    }

    console.log("✅ READ SUCCESS: Discussion found")
    res.json({ success: true, data: discussion })
  } catch (error) {
    console.error("❌ READ ERROR:", error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

// 📝 WRITE OPERATION - CREATE Discussion
app.post("/api/discussions", async (req, res) => {
  try {
    console.log("📝 WRITE: Creating new discussion in database")
    console.log("Data received:", req.body)

    const discussion = new Discussion(req.body)
    const savedDiscussion = await discussion.save()

    console.log("✅ WRITE SUCCESS: Discussion created with ID:", savedDiscussion._id)
    res.status(201).json({
      success: true,
      data: savedDiscussion,
      message: "Discussion created successfully",
    })
  } catch (error) {
    console.error("❌ WRITE ERROR:", error.message)
    res.status(400).json({ success: false, error: error.message })
  }
})

// 🔄 UPDATE OPERATION - UPDATE Discussion
app.put("/api/discussions/:id", async (req, res) => {
  try {
    console.log(`🔄 UPDATE: Updating discussion with ID: ${req.params.id}`)
    console.log("Update data:", req.body)

    const updatedDiscussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })

    if (!updatedDiscussion) {
      console.log("❌ UPDATE: Discussion not found")
      return res.status(404).json({ success: false, message: "Discussion not found" })
    }

    console.log("✅ UPDATE SUCCESS: Discussion updated")
    res.json({
      success: true,
      data: updatedDiscussion,
      message: "Discussion updated successfully",
    })
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error.message)
    res.status(400).json({ success: false, error: error.message })
  }
})

// 🗑️ DELETE OPERATION - DELETE Discussion
app.delete("/api/discussions/:id", async (req, res) => {
  try {
    console.log(`🗑️ DELETE: Removing discussion with ID: ${req.params.id}`)

    const deletedDiscussion = await Discussion.findByIdAndDelete(req.params.id)

    if (!deletedDiscussion) {
      console.log("❌ DELETE: Discussion not found")
      return res.status(404).json({ success: false, message: "Discussion not found" })
    }

    console.log("✅ DELETE SUCCESS: Discussion removed")
    res.json({
      success: true,
      message: "Discussion deleted successfully",
      data: deletedDiscussion,
    })
  } catch (error) {
    console.error("❌ DELETE ERROR:", error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

// 📊 ADVANCED READ - Get discussions with filters
app.get("/api/discussions/course/:course", async (req, res) => {
  try {
    console.log(`📖 READ: Fetching discussions for course: ${req.params.course}`)

    const discussions = await Discussion.find({ course: req.params.course })

    console.log(`✅ READ SUCCESS: Found ${discussions.length} discussions for course`)
    res.json({
      success: true,
      course: req.params.course,
      count: discussions.length,
      data: discussions,
    })
  } catch (error) {
    console.error("❌ READ ERROR:", error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

// 🔄 ADVANCED UPDATE - Increment likes
app.patch("/api/discussions/:id/like", async (req, res) => {
  try {
    console.log(`🔄 UPDATE: Incrementing likes for discussion: ${req.params.id}`)

    const discussion = await Discussion.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true })

    if (!discussion) {
      return res.status(404).json({ success: false, message: "Discussion not found" })
    }

    console.log(`✅ UPDATE SUCCESS: Likes incremented to ${discussion.likes}`)
    res.json({
      success: true,
      data: discussion,
      message: "Discussion liked successfully",
    })
  } catch (error) {
    console.error("❌ UPDATE ERROR:", error.message)
    res.status(500).json({ success: false, error: error.message })
  }
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log("\n📡 Available Discussion Endpoints:")
  console.log("📖 GET    /api/discussions           - Read all discussions")
  console.log("📖 GET    /api/discussions/:id       - Read single discussion")
  console.log("📝 POST   /api/discussions           - Create new discussion")
  console.log("🔄 PUT    /api/discussions/:id       - Update discussion")
  console.log("🗑️ DELETE /api/discussions/:id       - Delete discussion")
  console.log("📖 GET    /api/discussions/course/:course - Get by course")
  console.log("🔄 PATCH  /api/discussions/:id/like  - Like discussion")
})
