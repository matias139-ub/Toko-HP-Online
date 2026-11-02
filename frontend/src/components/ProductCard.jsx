import { Link } from "react-router";

function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img
        className="product-image"
        src={product.image}
        alt={product.name}
        onError={(event) => {
          event.currentTarget.style.visibility = "hidden";
        }}
      />

      <div className="product-card-body">
        <p className="product-brand">{product.brand}</p>
        <h2>{product.name}</h2>
        <p className="product-price">{formatRupiah(product.price)}</p>
        <Link className="text-link" to={`/products/${product._id}`}>
          Lihat detail →
        </Link>
      </div>
    </article>
  );
}

export default ProductCard;