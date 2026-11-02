import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveLogin } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password
      });

      saveLogin(response.data);
      navigate("/account");
    } catch (err) {
      setError(err.response?.data?.message || "Registrasi gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <p className="eyebrow">BUAT AKUN BARU</p>
      <h1>Registrasi</h1>

      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Nama
          <input
            data-private
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email
          <input
            data-private
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Password minimal 8 karakter
          <input
            data-private
            type="password"
            autoComplete="new-password"
            minLength={8}
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="button" disabled={loading}>
          {loading ? "Membuat akun..." : "Daftar"}
        </button>
      </form>

      <p>Sudah punya akun? <Link to="/login">Login</Link></p>
    </section>
  );
}

export default Register;