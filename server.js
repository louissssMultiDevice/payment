const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  let db = JSON.parse(fs.readFileSync("database.json"));

  const user = db.find(u => u.username === username && u.password === password);
  if (user) {
    user.tanggalLogin = new Date().toISOString();
    fs.writeFileSync("database.json", JSON.stringify(db, null, 2));
    res.json({ success: true, message: "Login berhasil" });
  } else {
    res.json({ success: false, message: "Username atau password salah" });
  }
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
