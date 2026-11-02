import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/auth/me")
      .then((response) => setUser(response.data.user))
      .catch((err) => {
        setError(
          err.response?.data?.message || "Sesi login tidak valid."
        );
        logout();
      });
  }, [logout]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  if (error) return <p>{error}</p>;
  if (!user) return <p>Memuat data akun...</p>;

  return (
    <section className="auth-card">
      <p className="eyebrow">HALAMAN TERPROTEKSI</p>
      <h1>Akun Saya</h1>
      <p>Nama: {user.name}</p>
      <p>Email: {user.email}</p>
      <button className="button" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
}

export default Account;