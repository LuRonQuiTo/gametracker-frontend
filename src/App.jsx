import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getJuegos,
  createJuego,
  updateJuego,
  deleteJuego,
} from "./services/api";
import BibliotecaJuegos from "./componentes/BibliotecaJuegos";
import FormularioJuego from "./componentes/FormularioJuego";
import EstadisticasPersonales from "./componentes/EstadisticasPersonales";
import GameDetail from "./componentes/GameDetail";
import { API_URL } from "./config";
import { FaGamepad } from "react-icons/fa";
import "./App.css";

function App() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [juegoDetalle, setJuegoDetalle] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // cargar juegos al iniciar
  useEffect(() => {
    cargarJuegos();
  }, []);

  async function cargarJuegos() {
    try {
      setCargando(true);
      setError("");
      const data = await getJuegos();
      setJuegos(data);
    } catch (err) {
      console.error(err);
      setError("No se pudo cargar la biblioteca.");
    } finally {
      setCargando(false);
    }
  }

  async function manejarGuardarJuego(formData) {
    try {
      setError("");
      if (formData._id) {
        // actualizar
        const actualizado = await updateJuego(formData._id, formData);
        setJuegos((prev) =>
          prev.map((j) => (j._id === actualizado._id ? actualizado : j))
        );
      } else {
        // crear
        const nuevo = await createJuego(formData);
        setJuegos((prev) => [nuevo, ...prev]);
      }
      setJuegoEditando(null);
    } catch (err) {
      console.error(err);
      setError("Error guardando el juego.");
    }
  }

  async function manejarEliminarJuego(id) {
    if (!confirm("¿Eliminar este juego?")) return;
    try {
      await deleteJuego(id);
      setJuegos((prev) => prev.filter((j) => j._id !== id));
      if (juegoDetalle && juegoDetalle._id === id) {
        setJuegoDetalle(null);
      }
    } catch (err) {
      console.error(err);
      setError("Error eliminando el juego.");
    }
  }

  function manejarEditarJuego(juego) {
    setJuegoEditando(juego);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function manejarVerDetalle(juego) {
    setJuegoDetalle(juego);
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <motion.div
          className="logo-box"
          initial={{ y: -12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <FaGamepad className="logo-icon" />
          <div>
            <h1>GameTracker</h1>
            <p className="subtitle">
              Organiza, reseña y analiza tu experiencia gamer.
            </p>
            <p className="api-info">API: {API_URL}</p>
          </div>
        </motion.div>
      </header>

      {/* LAYOUT DOS COLUMNAS */}
      <main className="layout">
        {/* IZQUIERDA: formulario + stats */}
        <aside className="side-column">
          <FormularioJuego
            juego={juegoEditando}
            onGuardar={manejarGuardarJuego}
            onCancelar={() => setJuegoEditando(null)}
          />

          <EstadisticasPersonales juegos={juegos} />
        </aside>

        {}
        <section className="main-column">
          {cargando && <p className="status-text">Cargando biblioteca...</p>}
          {error && <p className="error-msg">{error}</p>}

          <BibliotecaJuegos
            juegos={juegos}
            onEditar={manejarEditarJuego}
            onEliminar={manejarEliminarJuego}
            setJuegos={setJuegos}
            onVerDetalle={manejarVerDetalle}
          />
        </section>
      </main>

      {/* MODAL DETALLE */}
      {juegoDetalle && (
        <GameDetail juego={juegoDetalle} onClose={() => setJuegoDetalle(null)} />
      )}
    </div>
  );
}

export default App;
