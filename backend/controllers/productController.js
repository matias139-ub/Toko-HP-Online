const mongoose = require("mongoose");
const Product = require("../models/Product");

function sendError(res, error) {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return res.status(400).json({ message: error.message });
  }

  console.error(error);
  return res.status(500).json({ message: "Terjadi kesalahan pada server." });
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    sendError(res, error);
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID produk tidak valid." });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    res.json(product);
  } catch (error) {
    sendError(res, error);
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    sendError(res, error);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID produk tidak valid." });
    }

    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    res.json(product);
  } catch (error) {
    sendError(res, error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ message: "ID produk tidak valid." });
    }

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan." });
    }

    res.json({ message: "Produk berhasil dihapus." });
  } catch (error) {
    sendError(res, error);
  }
};