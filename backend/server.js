require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:5174",
  process.env.CLIENT_URL
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Origin tidak diizinkan oleh CORS."));
    }
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ message: "API toko online aktif." });
});

// Pastikan koneksi database tersedia sebelum route API berjalan.
app.use("/api", async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("Koneksi MongoDB gagal:", error.message);
    res.status(500).json({ message: "Database belum dapat diakses." });
  }
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Endpoint tidak ditemukan." });
});

// Jalankan server lokal. Di Vercel, app diekspor sebagai function.
if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server berjalan di http://localhost:${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Gagal menghubungkan MongoDB:", error.message);
      process.exit(1);
    });
}

module.exports = app;