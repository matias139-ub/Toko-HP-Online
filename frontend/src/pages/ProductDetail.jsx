import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import api from "../services/api";

function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message || "Detail produk tidak dapat dimuat."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p>Memuat detail produk...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!product) return <p>Produk tidak ditemukan.</p>;

  return (
    <section>
      <Link className="text-link" to="/products">
        ← Kembali ke daftar produk
      </Link>

      <div className="detail-layout">
        <img className="detail-image" src={product.image} alt={product.name} />

        <div>
          <p className="product-brand">{product.brand}</p>
          <h1>{product.name}</h1>
          <p className="detail-price">{formatRupiah(product.price)}</p>
          <p>{product.description}</p>
          <p>Kategori: {product.category}</p>
          <p>Stok: {product.stock}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetail;