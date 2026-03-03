const express = require('express');
const app = express();
const port = 3002;

const morgan = require("morgan");
app.use(morgan("combined"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require("cors");
app.use(cors());

const { MongoClient, ObjectId } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

let db;
let fashionCollection;
let userCollection;

// Kết nối MongoDB khi server khởi động
async function connectDB() {
  try {
    await client.connect();
    console.log("Kết nối MongoDB thành công!");
    db = client.db("FashionData");
    fashionCollection = db.collection("Fashion");
    userCollection = db.collection("User");
  } catch (err) {
    console.error("Lỗi kết nối MongoDB:", err);
    process.exit(1);
  }
}

connectDB();

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});

// Trang chủ
app.get("/", (req, res) => {
  res.send("This Web server is processed for MongoDB");
});

// Lấy tất cả fashions
app.get("/fashions", async (req, res) => {
  try {
    const result = await fashionCollection.find({}).toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Lấy fashion theo ID
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

// Lấy tất cả users (không trả password)
app.get("/users", async (req, res) => {
  try {
    const users = await userCollection.find({}).toArray();
    const safeUsers = users.map(u => ({
      _id: u._id,
      user: u.user,
      createdAt: u.createdAt || null
    }));
    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Lỗi server' });
  }
});

// Lấy user theo ID (không trả password)
app.get("/users/:id", async (req, res) => {
  try {
    const o_id = new ObjectId(req.params.id);
    const user = await userCollection.findOne({ _id: o_id });
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy user' });
    }

    const safeUser = {
      _id: user._id,
      user: user.user,
      createdAt: user.createdAt || null
    };

    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || 'Lỗi server' });
  }
});

// ENDPOINT GỘP: ĐĂNG KÝ + ĐĂNG NHẬP
app.post('/auth', async (req, res) => {
  try {
    const { user, password } = req.body;

    if (!user || !password) {
      return res.status(400).json({ success: false, message: 'Thiếu user hoặc password' });
    }

    // Tìm user theo trường "user"
    let foundUser = await userCollection.findOne({ user });

    if (foundUser) {
      // User tồn tại → kiểm tra password (login)
      const isMatch = bcrypt.compareSync(password, foundUser.password);
      if (isMatch) {
        return res.json({ success: true, message: 'Đăng nhập thành công' });
      } else {
        return res.status(401).json({ success: false, message: 'Mật khẩu không đúng' });
      }
    } else {
      // User chưa tồn tại → tự động đăng ký
      const hashed = bcrypt.hashSync(password, 10);
      const newUser = { 
        user, 
        password: hashed,
        createdAt: new Date() 
      };

      const result = await userCollection.insertOne(newUser);
      
      return res.status(201).json({ 
        success: true, 
        message: 'Đăng ký và đăng nhập thành công', 
        id: result.insertedId 
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Lỗi server: ' + err.message });
  }
});

// Xử lý route không tồn tại
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Không tìm thấy endpoint' });
});