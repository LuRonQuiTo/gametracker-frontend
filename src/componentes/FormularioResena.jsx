import { useState } from "react";
import { FaStar } from "react-icons/fa";

function FormularioResena({ juegoId, onResenaCreada }) {
  const [textoResena, setTextoResena] = useState("");
  const [horasJugadas, setHorasJugadas] = useState("");
  const [dificultad, setDificultad] = useState("Normal");
  const [recomendaria, setRecomendaria] = useState(false);

  // ⭐ rating
  const [puntuacion, setPuntuacion] = useState(0);
  const [hovered, setHovered] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const [enviando, setEnviando] = useState(false);

  async function manejarSubmit(e) {
    e.preventDefault();

    if (!puntuacion) {
      alert("Selecciona una puntuación (estrellas).");
      return;
    }

    // Payload con nombres EXACTOS del modelo
    const payload = {
      juegoId, // 👈 el id del juego lo manda el padre
      textoResena,
      puntuacion,
      horasJugadas: horasJugadas ? Number(horasJugadas) : 0,
      dificultad,
      recomendaria,
    };

    try {
      setEnviando(true);

      // El padre (GameDetail) hará el POST real
      if (onResenaCreada) {
        await onResenaCreada(payload);
      }

      // Limpiar formulario
      setTextoResena("");
      setHorasJugadas("");
      setDificultad("Normal");
      setRecomendaria(false);
      setPuntuacion(0);
    } catch (err) {
      console.error("Error al guardar reseña:", err);
      alert("No se pudo guardar la reseña.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="resena-form" onSubmit={manejarSubmit}>
      <h3>Escribir reseña</h3>

      {/* ⭐ PUNTUACIÓN CON ESTRELLAS */}
      <label>Puntuación</label>
      <div className="rating-input">
        {stars.map((s) => {
          const active = s <= puntuacion;
          const isHovering = hovered >= s;

          return (
            <FaStar
              key={s}
              className={`rating-star 
                ${active ? "active" : ""} 
                ${isHovering ? "hover" : ""}`}
              onMouseEnter={() => setHovered(s)}
              onMouseLeave={() => setHovered(0)}
              onClick={() => setPuntuacion(s)}
            />
          );
        })}

        <span className="rating-score">
          {puntuacion ? `${puntuacion}/5` : "Sin calificar"}
        </span>
      </div>

      <label>Reseña</label>
      <textarea
        value={textoResena}
        onChange={(e) => setTextoResena(e.target.value)}
        placeholder="Escribe tu opinión..."
      />

      <label>Horas jugadas</label>
      <input
        type="number"
        min="0"
        value={horasJugadas}
        onChange={(e) => setHorasJugadas(e.target.value)}
      />

      <label>Dificultad</label>
      <select
        value={dificultad}
        onChange={(e) => setDificultad(e.target.value)}
      >
        <option value="Fácil">Fácil</option>
        <option value="Normal">Normal</option>
        <option value="Difícil">Difícil</option>
        <option value="Experto">Experto</option>
      </select>

      <label>
        <input
          type="checkbox"
          checked={recomendaria}
          onChange={(e) => setRecomendaria(e.target.checked)}
        />{" "}
        ¿Lo recomendarías?
      </label>

      <button type="submit" className="btn-primary" disabled={enviando}>
        {enviando ? "Guardando..." : "Agregar reseña"}
      </button>
    </form>
  );
}

export default FormularioResena;
