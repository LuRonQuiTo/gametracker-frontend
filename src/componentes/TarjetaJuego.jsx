import { motion } from "framer-motion";
import { updateJuego } from "../services/api";
import { FaTrash, FaEdit, FaCheck, FaGamepad } from "react-icons/fa";

function TarjetaJuego({ juego, onEditar, onEliminar, setJuegos, onVerDetalle }) {
  async function toggleCompletado(e) {
    e.stopPropagation(); // no abrir detalle al hacer click
    const actualizado = await updateJuego(juego._id, {
      ...juego,
      completado: !juego.completado,
    });
    setJuegos((prev) => prev.map((j) => (j._id === juego._id ? actualizado : j)));
  }

  function handleCardClick() {
    onVerDetalle(juego);
  }

  return (
    <motion.article
      className="card-juego card-3d"
      whileHover={{ y: -4 }}
      onClick={handleCardClick}
    >
      <div className="card-3d-inner">
        {/* Cara frontal: solo imagen 9:16 */}
        <div className="card-face card-front">
          <div className="aspect-9-16">
            {juego.imagenPortada ? (
              <img
                src={juego.imagenPortada}
                alt={juego.titulo}
                className="card-portada-img"
              />
            ) : (
              <div className="card-portada-placeholder">
                <FaGamepad />
              </div>
            )}
          </div>
        </div>

        {/* Cara trasera: info del juego */}
        <div className="card-face card-back">
          <div className="card-back-content">
            <h3>{juego.titulo}</h3>
            <p className="card-meta">
              <span>{juego.genero || "Sin género"}</span>
              <span>
                {juego.plataforma || "Plataforma desconocida"}{" "}
                {juego.anioLanzamiento && `• ${juego.anioLanzamiento}`}
              </span>
              {juego.desarrollador && <span>Dev: {juego.desarrollador}</span>}
            </p>

            {juego.descripcion && (
              <p className="card-description">
                {juego.descripcion.length > 140
                  ? juego.descripcion.slice(0, 140) + "..."
                  : juego.descripcion}
              </p>
            )}

            <div className="card-tags">
              <button
                className={`tag ${
                  juego.completado ? "tag-success" : "tag-warning"
                }`}
                onClick={toggleCompletado}
              >
                <FaCheck />
                {juego.completado ? "Completado" : "Pendiente"}
              </button>
            </div>

            <div className="card-actions">
              <button
                className="btn-secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  onEditar(juego);
                }}
              >
                <FaEdit /> Editar
              </button>
              <button
                className="btn-danger"
                onClick={(e) => {
                  e.stopPropagation();
                  onEliminar(juego._id);
                }}
              >
                <FaTrash /> Eliminar
              </button>
            </div>

            <p className="hint-detalle">Click para ver reseñas y detalles</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default TarjetaJuego;
