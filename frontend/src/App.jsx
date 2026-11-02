import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="*" element={<h1>Halaman tidak ditemukan.</h1>} />
        </Routes>
      </main>

      <footer className="footer">Toko HP Online · Project pembelajaran</footer>
    </>
  );
}

export default App;