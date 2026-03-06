const express = require('express');
const app = express();
const port = 3002;

// CORS phải khai báo ĐẦU TIÊN
const cors = require("cors");
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// SESSION
var session = require('express-session');
app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 giờ
}));

const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

const morgan = require("morgan");
app.use(morgan("combined"));

const bcrypt = require('bcrypt');

const { MongoClient, ObjectId } = require('mongodb');
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db, fashionCollection, userCollection, productCollection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Ket noi MongoDB thanh cong!");
    db = client.db("FashionData");
    fashionCollection = db.collection("Fashion");
    userCollection = db.collection("User");
    productCollection = db.collection("Product");
  } catch (err) {
    console.error("Loi ket noi MongoDB:", err);
    process.exit(1);
  }
}
connectDB();

app.listen(port, () => {
  console.log(`Server dang chay tai http://localhost:${port}`);
});

// ==================== TRANG CHU ====================
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

// ==================== FASHION ====================
app.get("/fashions", async (req, res) => {
  try {
    const result = await fashionCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});
app.get("/fashions/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const result = await fashionCollection.findOne({ _id: o_id });
    if (!result) return res.status(404).json({ message: "Khong tim thay" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "ID khong hop le hoac loi server" });
  }
});
app.post("/fashions", cors(), async (req, res) => {
  await fashionCollection.insertOne(req.body);
  res.send(req.body);
});
app.put("/fashions", cors(), async (req, res) => {
  await fashionCollection.updateOne(
    { _id: new ObjectId(req.body._id) },
    { $set: { style: req.body.style, fashion_subject: req.body.fashion_subject, fashion_detail: req.body.fashion_detail, fashion_image: req.body.fashion_image } }
  );
  const result = await fashionCollection.find({ _id: new ObjectId(req.body._id) }).toArray();
  res.send(result[0]);
});
app.delete("/fashions/:id", cors(), async (req, res) => {
  const o_id = new ObjectId(req.params["id"]);
  const result = await fashionCollection.find({ _id: o_id }).toArray();
  await fashionCollection.deleteOne({ _id: o_id });
  res.send(result[0]);
});

// ==================== USER ====================
app.get("/users", async (req, res) => {
  try {
    const users = await userCollection.find({}).toArray();
    res.json(users.map(u => ({ _id: u._id, user: u.user, createdAt: u.createdAt || null })));
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Loi server' });
  }
});
app.get("/users/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const user = await userCollection.findOne({ _id: o_id });
    if (!user) return res.status(404).json({ success: false, message: 'Khong tim thay user' });
    res.json({ _id: user._id, user: user.user, createdAt: user.createdAt || null });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Loi server' });
  }
});

// ==================== COOKIE (Bai 60) ====================
app.get("/create-cookie", (req, res) => {
  res.cookie("username", "ngainhi");
  res.cookie("password", "123456");
  res.cookie("account", { username: "ngainhi", password: "123456" });
  res.send("cookies are created");
});
app.get("/read-cookie", (req, res) => {
  const username = req.cookies.username;
  const password = req.cookies.password;
  const account = req.cookies.account;
  let infor = "username = " + username + "<br/>";
  infor += "password = " + password + "<br/>";
  if (account != null) {
    infor += "account.username = " + account.username + "<br/>";
    infor += "account.password = " + account.password + "<br/>";
  }
  res.send(infor);
});
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("password");
  res.clearCookie("account");
  res.send("Cookies are removed");
});

// ==================== LOGIN (Bai 61) ====================
app.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password)
      return res.status(400).json({ success: false, message: "Thieu thong tin" });
    const existingUser = await userCollection.findOne({ user });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User da ton tai" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userCollection.insertOne({ user, password: hashedPassword, createdAt: new Date() });
    res.json({ success: true, message: "Dang ky thanh cong" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { user, password } = req.body;
    console.log("Login request:", user);
    const found = await userCollection.findOne({ user });
    if (!found)
      return res.status(401).json({ message: "Invalid credentials", success: false });
    const isMatch = await bcrypt.compare(password, found.password);
    if (isMatch) {
      res.cookie("user", user, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.cookie("password", password, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000 });
      res.json({ message: "Login successful", success: true });
    } else {
      res.status(401).json({ message: "Invalid credentials", success: false });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== SESSION (Bai 62) ====================
app.get("/contact", cors(), (req, res) => {
  if (req.session.visited != null) {
    req.session.visited++;
    res.send("You visited this page " + req.session.visited + " times");
  } else {
    req.session.visited = 1;
    res.send("Welcome to this page for the first time!");
  }
});

// ==================== PRODUCT (Bai 63) ====================
app.get("/products", async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.post("/products", async (req, res) => {
  try {
    await productCollection.insertOne(req.body);
    res.json({ success: true, message: "Them san pham thanh cong" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CART - SESSION (Bai 63) ====================

// Xem gio hang
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

// Them san pham vao gio hang
app.post("/cart/add", (req, res) => {
  const product = req.body;
  if (!req.session.cart) req.session.cart = [];

  const existingIndex = req.session.cart.findIndex(item => item._id === product._id);
  if (existingIndex >= 0) {
    req.session.cart[existingIndex].quantity += 1;
  } else {
    req.session.cart.push({ ...product, quantity: 1 });
  }

  res.json({ success: true, cart: req.session.cart });
});

// Cap nhat so luong
app.put("/cart/update", (req, res) => {
  const { _id, quantity } = req.body;
  if (!req.session.cart)
    return res.json({ success: false, message: "Gio hang trong" });

  if (quantity <= 0) {
    req.session.cart = req.session.cart.filter(item => item._id !== _id);
  } else {
    const index = req.session.cart.findIndex(item => item._id === _id);
    if (index >= 0) req.session.cart[index].quantity = quantity;
  }

  res.json({ success: true, cart: req.session.cart });
});

// Xoa mot san pham
app.delete("/cart/remove/:id", (req, res) => {
  if (!req.session.cart) return res.json({ success: true, cart: [] });
  req.session.cart = req.session.cart.filter(item => item._id !== req.params.id);
  res.json({ success: true, cart: req.session.cart });
});

// Xoa toan bo gio hang
app.delete("/cart/clear", (req, res) => {
  req.session.cart = [];
  res.json({ success: true, message: "Da xoa gio hang" });
});