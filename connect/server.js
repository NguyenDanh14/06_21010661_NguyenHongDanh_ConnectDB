const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  database: 'dblogin',
  password: 'sapassword',
  port: 3306,
});
// kết nối mysql
db.connect((err) => {
  if (err) {
    console.error('Không thể kết nối đến MySQL:', err);
    return;
  }
  console.log('Kết nối đến MySQL');
});
// lấy danh sách user
app.get('/api/data', (req, res) => {
  db.query('SELECT id, name, pass, img FROM user', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Lỗi truy vấn Database' });
    }
    res.json(results);
  });
});

// Endpoint để đăng ký tài khoản
app.post('/api/register', (req, res) => {
  const { name, pass, img } = req.body;

  // Kiểm tra tên người dùng đã tồn tại hay chưa
  const checkQuery = 'SELECT * FROM user WHERE name = ?';
  db.query(checkQuery, [name], (err, result) => {
    if (err) {
      console.error('Lỗi:', err);
      return res.status(500).json({ error: 'Lỗi !' });
    }

    if (result.length > 0) {
      return res.status(409).json({ error: 'Username đã tồn tại' });
    }

    // Thêm người dùng vào cơ sở dữ liệu
    const insertQuery = 'INSERT INTO user (name, pass, img) VALUES (?, ?, ?)';
    db.query(insertQuery, [name, pass, img], (err, result) => {
      if (err) {
        console.error('Lỗi:', err); // Log lỗi insert
        return res.status(500).json({ error: 'Lỗi !' });
      }
      res.status(201).json({ message: 'Người dùng đã đăng ký thành công', userId: result.insertId });
    });
  });
});

// Endpoint để cập nhật thông tin người dùng
app.put('/api/user/:id', (req, res) => {
  console.log(`Received request to update user with ID: ${req.params.id}`);
  const userId = req.params.id;
  const { name, pass, img } = req.body;

  const updateQuery = 'UPDATE user SET name = ?, pass = ?, img = ? WHERE id = ?';
  db.query(updateQuery, [name, pass, img, userId], (err, result) => {
    if (err) {
      console.error('Lỗi cập nhật thông tin người dùng:', err);
      return res.status(500).json({ error: 'Lỗi Database khi cập nhật người dùng' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    res.json({ message: 'Người dùng được câp nhật thành công' });
  });
});

// Endpoint để xóa người dùng
app.delete('/api/users/delete/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Đã nhận được yêu cầu xóa người dùng có ID: ${userId}`);

  const deleteQuery = 'DELETE FROM user WHERE id = ?';
  db.query(deleteQuery, [userId], (err, result) => {
    if (err) {
      console.error('Lỗi :', err);
      return res.status(500).json({ error: 'Lỗi Database khi xóa người dùng' });
    }
    if (result.affectedRows === 0) {
      console.log('Không tìm thấy người dùng');
      return res.status(404).json({ error: 'Không tìm thấy người dùng' });
    }
    console.log('Xóa người dùng thành công');
    res.json({ message: 'Xóa người dùng thành công' });
  });
});


const registerUser = (req, res) => {
  const { name, pass, img } = req.body;
  console.log("Request body:", req.body);
  const query = "INSERT INTO user (name, pass, img) VALUES (?, ?, ?)";

  db.query(query, [name, pass, img || null], (err, result) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Truy vấn Database thất bại" });
    }
    res.status(201).json({ message: "Đăng ký thành công" });
  });
};

module.exports = { registerUser };

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
