const express = require("express")
const app = express()
const port = 3000
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const fileUpload = require("express-fileupload")

app.use(morgan("combined"))
app.use(bodyParser.json())
app.use(cors())
app.use(fileUpload({ limits: { fileSize: 10000000 }, abortOnLimit: true }))

// ── DATABASE ──────────────────────────────────────
let database = [
  { BookId: "b1", BookName: "Ky thuat lap trinh co ban",  Author: "A", Category: "Lap trinh", Price: 70,  Image: "" },
  { BookId: "b2", BookName: "Ky thuat lap trinh nang cao", Author: "B", Category: "Lap trinh", Price: 100, Image: "" },
  { BookId: "b3", BookName: "May hoc co ban",              Author: "C",   Category: "AI/ML",     Price: 200, Image: "" },
  { BookId: "b4", BookName: "May hoc nang cao",            Author: "D",   Category: "AI/ML",     Price: 300, Image: "" },
  { BookId: "b5", BookName: "Lap trinh Robot co ban",      Author: "E",       Category: "Robot",     Price: 250, Image: "" },
]

// ── DEFAULT ───────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Hello Restful API - Exercise 50")
})

// ── GET ALL BOOKS ─────────────────────────────────
app.get("/books", cors(), (req, res) => {
  res.send(database)
})

// ── GET A BOOK ────────────────────────────────────
app.get("/books/:id", cors(), (req, res) => {
  const id = req.params["id"]
  const book = database.find(x => x.BookId == id)
  res.send(book)
})

// ── CREATE A BOOK ─────────────────────────────────
app.post("/books", cors(), (req, res) => {
  database.push(req.body)
  res.send(database)
})

// ── UPDATE A BOOK ─────────────────────────────────
app.put("/books", cors(), (req, res) => {
  const book = database.find(x => x.BookId == req.body.BookId)
  if (book != null) {
    book.BookName = req.body.BookName
    book.Author   = req.body.Author
    book.Category = req.body.Category
    book.Price    = req.body.Price
    book.Image    = req.body.Image
  }
  res.send(database)
})

// ── DELETE A BOOK ─────────────────────────────────
app.delete("/books/:id", cors(), (req, res) => {
  const id = req.params["id"]
  database = database.filter(x => x.BookId !== id)
  res.send(database)
})

// ── UPLOAD IMAGE ──────────────────────────────────
app.post("/upload", cors(), (req, res) => {
  const { image } = req.files
  if (!image) return res.sendStatus(400)
  image.mv(__dirname + "/upload/" + image.name)
  res.send({ filename: image.name })
})

// ── GET IMAGE ─────────────────────────────────────
app.get("/image/:id", cors(), (req, res) => {
  const id = req.params["id"]
  res.sendFile(__dirname + "/upload/" + id)
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})