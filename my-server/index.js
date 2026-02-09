const express = require("express");
const app = express();
const port = 3000;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

const path = require("path");
app.use("/static", express.static(path.join(__dirname, "public")));

// default api
app.get("/", (req, res) => {
  res.send("Con mèo kêu sao");
});

let database = [
  { BookId: "b1", BookName: "Kỹ thuật lập trình cơ bản", Price: 70, Image: "b1.jpg" },
  { BookId: "b2", BookName: "Kỹ thuật lập trình nâng cao", Price: 100, Image: "b2.jpg" },
  { BookId: "b3", BookName: "Máy học cơ bản", Price: 200, Image: "b3.jpg" },
  { BookId: "b4", BookName: "Máy học nâng cao", Price: 300, Image: "b4.jpg" },
  { BookId: "b5", BookName: "Lập trình Robot cơ bản", Price: 250, Image: "b5.jpg" },
];

// GET all
app.get("/books", (req, res) => {
  res.send(database);
});

// GET detail
app.get("/books/:id", (req, res) => {
  const id = req.params["id"];
  const p = database.find((x) => x.BookId == id);
  if (!p) return res.status(404).send({ message: "Book not found" });
  res.send(p);
});

// POST create
app.post("/books", (req, res) => {
  const b = req.body;

  if (!b || !b.BookId || !b.BookName) {
    return res.status(400).send({ message: "Missing BookId/BookName" });
  }

  const exists = database.some((x) => x.BookId === b.BookId);
  if (exists) return res.status(409).send({ message: "BookId already exists" });

  if (!b.Image) b.Image = "no-image.jpg";
  if (!b.Price) b.Price = 0;

  database.push(b);
  res.send(database);
});

// PUT update (theo URL /books/:id)
app.put("/books/:id", (req, res) => {
  const id = req.params["id"];
  const index = database.findIndex((x) => x.BookId == id);
  if (index < 0) return res.status(404).send({ message: "Book not found" });

  const b = req.body;
  // giữ BookId theo id trên URL cho chắc
  database[index] = { ...b, BookId: id };
  res.send(database);
});

// DELETE
app.delete("/books/:id", (req, res) => {
  const id = req.params["id"];
  const before = database.length;
  database = database.filter((x) => x.BookId !== id);

  if (database.length === before) return res.status(404).send({ message: "Book not found" });
  res.send(database);
});

// SEARCH (optional)
app.get("/search", (req, res) => {
  const keyword = (req.query.keyword || "").toString().trim();
  const result = database.filter((b) =>
    b.BookName.toLowerCase().includes(keyword.toLowerCase())
  );
  res.send(result);
});

app.listen(port, () => {
  console.log(`My Server is starting at =${port}`);
});
