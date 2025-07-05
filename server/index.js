const express = require("express")
const app = express()
const PORT = 3000

// Middleware
app.use(express.json())

// Sample data
const students = [
  { id: 1, name: "John Doe", email: "john@edu.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah@edu.com" },
]

const assignments = [
  { id: 1, title: "React Project", dueDate: "2024-01-15" },
  { id: 2, title: "Database Design", dueDate: "2024-01-20" },
]

// GET Routes
app.get("/", (req, res) => {
  res.json({ message: "Kampus App API Server Running" })
})

app.get("/api/students", (req, res) => {
  res.json({ success: true, data: students })
})

app.get("/api/assignments", (req, res) => {
  res.json({ success: true, data: assignments })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
