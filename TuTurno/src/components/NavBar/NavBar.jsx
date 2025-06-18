import { useState } from "react";
import { NavLink, useNavigate } from "react-router";

import useUserStore from "../../stores/useUserStore";


import bellIcon from "/bell-icon.png";
import "./NavBar.css";
import { supabase } from "../../auth/supabaseAuth";



const NavBar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUserStore();

  const closeMenu = () => setMenuOpen(false);
  const linkClass = ({ isActive }) =>
    isActive ? "NavBar__link NavBar__link--active" : "NavBar__link";

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      useUserStore.getState().reset();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const renderGuestLinks = () => (
    <>
      <NavLink to="/signin" className={linkClass} onClick={closeMenu}>
        Sign In
      </NavLink>
      <NavLink to="/signup" className={linkClass} onClick={closeMenu}>
        Sign Up
      </NavLink>
    </>
  );

  const renderUserLinks = () => (
    <>
      <NavLink to="/profile" className={linkClass} onClick={closeMenu}>
        Profile
      </NavLink>

      <button
        onClick={handleSignOut}
        className="NavBar__link NavBar__link--button"
      >
        Sign Out
      </button>
    </>
  );

  const renderEmailUser = (user) =>
    user ? user.email.split("@")[0] : "Desconocido";

  return (
    <>
      <nav className="NavBar">
        <div className="NavBar__left">
          <img src={bellIcon} alt="Logo bellIcon" className="NavBar__logo" />
          <span className="NavBar__separator">
            {" "}
            <p>&nbsp;</p>{" "}
          </span>
          <span className="NavBar__brand">TuTurno</span>
        </div>

        <div className={`NavBar__links ${menuOpen ? "is-active" : ""}`}>
          
          <NavLink to="/" className={linkClass} onClick={closeMenu}>
            Inicio
          </NavLink>
          {user ? renderUserLinks() : renderGuestLinks()}
        </div>

        <div className="NavBar__right">
          {user && (
            <span className="NavBar__user" title={user.email}>
              {" "}
              👤 {renderEmailUser(user)}
            </span>
          )}
          <button
            className="NavBar__toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {menuOpen && <div className="NavBar__backdrop" onClick={closeMenu}></div>}
    </>
  );
};

export default NavBar;
