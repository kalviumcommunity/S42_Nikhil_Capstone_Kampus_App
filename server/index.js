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



// POST Routes
app.post("/api/students", (req, res) => {
  try {
    const { name, email } = req.body
    if(!name || !email) {
       return res.status(400).json({ success: false, message: "Name and email are required" })
    }
    const newStudent = {
      id: students.length + 1,
      name,
      email,
    }
    students.push(newStudent)
    res.json({ success: true, data: newStudent, message: "Student created" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
})

app.post("/api/assignments", (req, res) => {
  try {
    const { title, dueDate } = req.body
    if(!title || !dueDate) {
         res.status(400).json({ success: false, message: "Title and due date are required" })
    }
    const newAssignment = {
      id: assignments.length + 1,
      title,
      dueDate,
    }
    assignments.push(newAssignment)
    res.json({ success: true, data: newAssignment, message: "Assignment created" })
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" })
  }
})

// PUT Routes
app.put("/api/students/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { name, email } = req.body
  const studentIndex = students.findIndex((s) => s.id === id)

  if (studentIndex === -1) {
    return res.status(404).json({ success: false, message: "Student not found" })
  }

  students[studentIndex] = { id, name, email }
  res.json({ success: true, data: students[studentIndex], message: "Student updated" })
})

app.put("/api/assignments/:id", (req, res) => {
  const id = Number.parseInt(req.params.id)
  const { title, dueDate } = req.body
  const assignmentIndex = assignments.findIndex((a) => a.id === id)

  if (assignmentIndex === -1) {
    return res.status(404).json({ success: false, message: "Assignment not found" })
  }

  assignments[assignmentIndex] = { id, title, dueDate }
  res.json({ success: true, data: assignments[assignmentIndex], message: "Assignment updated" })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
