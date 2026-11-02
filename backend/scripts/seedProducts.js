require("dotenv").config();

const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Product = require("../models/Product");

const products = [
  {
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    price: 5499000,
    description: "HP Samsung untuk contoh katalog toko online.",
    category: "Android",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
    stock: 10
  },
  {
    name: "Apple iPhone 15",
    brand: "Apple",
    price: 11999000,
    description: "HP Apple untuk contoh katalog toko online.",
    category: "iOS",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=80",
    stock: 8
  },
  {
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    price: 4299000,
    description: "HP Xiaomi untuk contoh katalog toko online.",
    category: "Android",
    image:
      "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=900&q=80",
    stock: 12
  },
  {
    name: "OPPO Reno12 F",
    brand: "OPPO",
    price: 4599000,
    description: "HP OPPO untuk contoh katalog toko online.",
    category: "Android",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&q=80",
    stock: 7
  },
  {
    name: "vivo V40 Lite",
    brand: "vivo",
    price: 3799000,
    description: "HP vivo untuk contoh katalog toko online.",
    category: "Android",
    image:
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=900&q=80",
    stock: 9
  }
];

async function seedProducts() {
  try {
    await connectDB();

    await Product.bulkWrite(
      products.map((product) => ({
        updateOne: {
          filter: { name: product.name },
          update: { $set: product },
          upsert: true
        }
      }))
    );

    console.log("Lima produk contoh sudah dimasukkan.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Gagal memasukkan data:", error.message);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedProducts();