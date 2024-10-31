// registerController.js
const { db } = require("./server");

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
