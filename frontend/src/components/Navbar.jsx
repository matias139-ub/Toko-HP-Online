import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link className="brand" to="/">Smart<span>Gadget</span></Link>

        <nav className="nav-links">
          <NavLink to="/">Beranda</NavLink>
          <NavLink to="/products">Daftar HP</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Registrasi</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;