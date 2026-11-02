import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { saveLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      saveLogin(response.data);
      navigate(location.state?.from || "/account", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-card">
      <p className="eyebrow">MASUK KE AKUN</p>
      <h1>Login</h1>

      <form onSubmit={handleSubmit} className="auth-form">
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
          Password
          <input
            data-private
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button className="button" disabled={loading}>
          {loading ? "Memeriksa..." : "Login"}
        </button>
      </form>

      <p>Belum punya akun? <Link to="/register">Registrasi</Link></p>
    </section>
  );
}

export default Login;