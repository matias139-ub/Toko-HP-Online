import { Link } from "react-router";

function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">PILIHAN HP UNTUK KEBUTUHANMU</p>
      <h1>Temukan HP yang cocok untuk aktivitasmu.</h1>
      <p className="hero-copy">
        Lihat koleksi HP dari berbagai merek, cek harga dan stok, lalu buka
        halaman detail untuk mengetahui informasinya.
      </p>
      <Link className="button" to="/products">
        Lihat Daftar HP
      </Link>
    </section>
  );
}

export default Home;