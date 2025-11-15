import { FaStar, FaTrash } from "react-icons/fa";

function ListaResenas({ resenas, onEliminar, modoTimeline = false }) {
  if (!resenas.length) {
    return <p className="status-text">Aún no hay reseñas para este juego.</p>;
  }

  return (
    <div className={modoTimeline ? "resenas-timeline" : "resenas-list"}>
      {resenas.map((r) => (
        <article
          key={r._id}
          className={modoTimeline ? "resena-item timeline-item" : "resena-item"}
        >
          <header>
            <span className="resena-stars">
              {Array.from({ length: r.puntuacion }).map((_, i) => (
                <FaStar key={i} className="star-active" />
              ))}
              <span className="resena-num">({r.puntuacion})</span>
            </span>
            <button
              className="btn-icon"
              onClick={() => onEliminar(r._id)}
              title="Eliminar reseña"
            >
              <FaTrash />
            </button>
          </header>

          <p>{r.textoResena}</p>

          <small>
            {r.horasJugadas ?? 0} h • Dificultad: {r.dificultad} •{" "}
            {r.recomendaria ? "La recomendaría" : "No la recomendaría"}
          </small>

          <small>
            {r.fechaCreacion &&
              new Date(r.fechaCreacion).toLocaleDateString("es-EC")}
          </small>
        </article>
      ))}
    </div>
  );
}

export default ListaResenas;
