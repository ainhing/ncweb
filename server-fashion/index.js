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

// ==================== SESSION (Bài 63) ====================
const session = require('express-session');
app.use(session({
  secret: 'shopping_cart_secret',
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
    console.log("Kết nối MongoDB thành công!");
    db = client.db("FashionData");
    fashionCollection = db.collection("Fashion");
    userCollection = db.collection("User");
    productCollection = db.collection("Product");
  } catch (err) {
    console.error("Lỗi kết nối MongoDB:", err);
    process.exit(1);
  }
}
connectDB();

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// ==================== TRANG CHỦ ====================
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
    if (!result) return res.status(404).json({ message: "Không tìm thấy" });
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: "ID không hợp lệ hoặc lỗi server" });
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
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== COOKIE (Bài 60) ====================
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("user");
  res.clearCookie("password");
  res.send("[user, password] Cookies are removed");
});

// ==================== LOGIN (Bài 61) ====================
app.post("/register", async (req, res) => {
  try {
    const { user, password } = req.body;
    if (!user || !password)
      return res.status(400).json({ success: false, message: "Thiếu thông tin" });
    const existingUser = await userCollection.findOne({ user });
    if (existingUser)
      return res.status(400).json({ success: false, message: "User đã tồn tại" });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userCollection.insertOne({ user, password: hashedPassword, createdAt: new Date() });
    res.json({ success: true, message: "Đăng ký thành công" });
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

// ==================== PRODUCT (Bài 63) ====================

// Lấy toàn bộ danh sách sản phẩm
app.get("/products", async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Thêm sản phẩm mới (để seed data)
app.post("/products", async (req, res) => {
  try {
    await productCollection.insertOne(req.body);
    res.json({ success: true, message: "Thêm sản phẩm thành công" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ==================== CART - SESSION (Bài 63) ====================

// Xem giỏ hàng hiện tại
app.get("/cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

// Thêm sản phẩm vào giỏ hàng (lưu vào Session)
app.post("/cart/add", (req, res) => {
  const product = req.body; // { _id, name, price, image, quantity }
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // Kiểm tra sản phẩm đã có trong giỏ chưa
  const existingIndex = req.session.cart.findIndex(
    item => item._id === product._id
  );

  if (existingIndex >= 0) {
    // Nếu đã có thì tăng số lượng
    req.session.cart[existingIndex].quantity += 1;
  } else {
    // Chưa có thì thêm mới với quantity = 1
    req.session.cart.push({ ...product, quantity: 1 });
  }

  res.json({ success: true, cart: req.session.cart });
});

// Cập nhật giỏ hàng (số lượng)
app.put("/cart/update", (req, res) => {
  const { _id, quantity } = req.body;
  if (!req.session.cart) {
    return res.json({ success: false, message: "Giỏ hàng trống" });
  }

  if (quantity <= 0) {
    // Nếu quantity = 0 thì xóa khỏi giỏ
    req.session.cart = req.session.cart.filter(item => item._id !== _id);
  } else {
    const index = req.session.cart.findIndex(item => item._id === _id);
    if (index >= 0) {
      req.session.cart[index].quantity = quantity;
    }
  }

  res.json({ success: true, cart: req.session.cart });
});

// Xóa một sản phẩm khỏi giỏ hàng
app.delete("/cart/remove/:id", (req, res) => {
  const id = req.params.id;
  if (!req.session.cart) {
    return res.json({ success: true, cart: [] });
  }
  req.session.cart = req.session.cart.filter(item => item._id !== id);
  res.json({ success: true, cart: req.session.cart });
});

// Xóa toàn bộ giỏ hàng
app.delete("/cart/clear", (req, res) => {
  req.session.cart = [];
  res.json({ success: true, message: "Đã xóa giỏ hàng" });
});