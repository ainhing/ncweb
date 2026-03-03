const express = require("express");
const app = express();
const port = 3000;

const morgan = require("morgan");
app.use(morgan("combined"));

const cors = require("cors");
app.use(cors({ origin: "http://localhost:4200" }));

// dùng built-in json parser của express (khỏi body-parser)
app.use(express.json());

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
  res.json(database);
});

// GET detail
app.get("/books/:id",cors(),(req,res)=>{ 
  id=req.params["id"] 
  let p=database.find(x=>x.BookId==id) 
  res.send(p)     
}) 

// POST create
app.post("/books",cors(),(req,res)=>{    
//put json book into database 
database.push(req.body); 
//send message to client(send all database to client) 
res.send(database) 
})

// PUT update theo URL /books/:id
app.put("/books",cors(),(req,res)=>{ 
book=database.find(x=>x.BookId==req.body.BookId) 
if(book!=null) 
{ 
book.BookName=req.body.BookName 
book.Price=req.body.Price 
book.Image=req.body.Image 
} 
res.send(database) 
}) 

// DELETE /books/:id
app.delete("/books/:id",cors(),(req,res)=>{ 
id=req.params["id"] 
database = database.filter(x => x.BookId !== id); 
res.send(database)     
}) 

// SEARCH (optional)
app.get("/search", (req, res) => {
  const keyword = (req.query.keyword || "").toString().trim().toLowerCase();
  const result = database.filter((b) => b.BookName.toLowerCase().includes(keyword));
  res.json(result);
});

app.listen(port, () => {
  console.log(`My Server is starting at =${port}`);
});