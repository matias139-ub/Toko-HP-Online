require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
     origin: [
    "http://localhost:5173",
    "http://localhost:5174"
  ]
  })
);
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "API toko HP aktif." });
});

app.use("/api/products", productRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan." });
});

async function startServer() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menghubungkan MongoDB:", error.message);
    process.exit(1);
  }
}

startServer();