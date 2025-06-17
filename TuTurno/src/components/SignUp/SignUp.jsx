import React, { useRef, useState } from "react";
import styles from "./SignUp.module.css";
import { signUp } from "../../auth/auth.service";
import { useNavigate } from "react-router";

export default function SignUp() {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { message } = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );
      setMessage(message);
      console.log(message);
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      console.error(err.message);
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>SignUp</h2>

      <form onSubmit={handleSignUp}>
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className={styles.input}
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Contraseña"
          className={styles.input}
        />

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Cargando..." : "Crear cuenta"}
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p>{message}</p>}
    </div>
  );
}

