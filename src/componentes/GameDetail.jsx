import { useEffect, useState } from "react";
import {
  getResenasByJuego,
  createResena,
  deleteResena,
} from "../services/api";
import ListaResenas from "./ListaResenas";
import FormularioResena from "./FormularioResena";
import { FaTimes } from "react-icons/fa";

function GameDetail({ juego, onClose }) {
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(false);

  const portadaUrl =
    juego.imagenPortada ||
    juego.urlPortada ||
    juego.portada ||
    juego.coverUrl ||
    "";

  useEffect(() => {
    if (!juego?._id) return;
    cargarResenas();
  }, [juego._id]);

  async function cargarResenas() {
    setCargando(true);
    try {
      const data = await getResenasByJuego(juego._id);
      setResenas(Array.isArray(data) ? data : []);
    } finally {
      setCargando(false);
    }
  }

  async function manejarEliminarResena(id) {
    await deleteResena(id);
    setResenas((prev) => prev.filter((r) => r._id !== id));
  }

  //POST real con createResena
  async function manejarCrearResena(payload) {
    const nueva = await createResena(payload);
    setResenas((prev) => [nueva, ...prev]);
  }

  const total = resenas.length;
  const promedio =
    total === 0
      ? 0
      : resenas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) / total;

  const porcentaje = Math.round((promedio / 5) * 100);
  const angulo = (promedio / 5) * 360;

  return (
    <div className="detail-overlay">
      <div className="detail-panel">
        <button className="detail-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="detail-layout">
          {/* Izquierda: imagen + grafica en forma de pastel*/}
          <div className="detail-left">
            <div className="detail-image-wrapper">
              <div className="aspect-9-16">
                {portadaUrl ? (
                  <img
                    src={portadaUrl}
                    alt={juego.titulo}
                    className="detail-image"
                    onError={(e) => {
                      // si la URL falla,se muestra una placeholder
                      e.currentTarget.style.display = "none";
                      e.currentTarget.parentElement.innerHTML =
                        '<div class="card-portada-placeholder">Sin portada</div>';
                    }}
                  />
                ) : (
                  <div className="card-portada-placeholder">
                    {juego.titulo}
                  </div>
                )}
              </div>
            </div>

            <div className="detail-info">
              <h2>{juego.titulo}</h2>
              <p className="detail-meta">
                <span>{juego.genero || "Sin género"}</span>
                <span>
                  {juego.plataforma || "Plataforma desconocida"}{" "}
                  {juego.anioLanzamiento && `• ${juego.anioLanzamiento}`}
                </span>
                {juego.desarrollador && (
                  <span>Dev: {juego.desarrollador}</span>
                )}
              </p>
              {juego.descripcion && (
                <p className="detail-description">{juego.descripcion}</p>
              )}
            </div>

            {/* Gráfico tipo pastel */}
            <div className="detail-pie-section">
              <h3>Promedio de reseñas</h3>
              <div className="pie-wrapper">
                <div
                  className="pie-chart"
                  style={{
                    background: `conic-gradient(#facc15 0 ${angulo}deg, #111827 ${angulo}deg 360deg)`,
                  }}
                >
                  <div className="pie-center">
                    <span className="pie-score">
                      {promedio ? promedio.toFixed(1) : "-"}
                    </span>
                    <span className="pie-label">/ 5</span>
                  </div>
                </div>
                <div className="pie-legend">
                  <span>{total} reseñas</span>
                  <span>{porcentaje}% satisfacción</span>
                </div>
              </div>
            </div>
          </div>

          {/* Derecha: reseñas tipo linea de tiempo*/}
          <div className="detail-right">
            <h3>Reseñas de usuarios</h3>
            {cargando ? (
              <p>Cargando reseñas...</p>
            ) : (
              <div className="detail-reviews-scroll">
                <ListaResenas
                  resenas={resenas}
                  onEliminar={manejarEliminarResena}
                  modoTimeline
                />
              </div>
            )}

            <div className="detail-form-wrapper">
              <FormularioResena
                juegoId={juego._id}
                onResenaCreada={manejarCrearResena}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDetail;
