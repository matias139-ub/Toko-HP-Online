import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Produk belum dapat dimuat. Pastikan backend sedang berjalan."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    `${product.name} ${product.brand}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) return <p>Memuat produk...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">KATALOG</p>
          <h1>Daftar HP</h1>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Cari nama atau merek HP"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <p>Produk tidak ditemukan.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;