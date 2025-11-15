import { useState } from "react";
import { createResena } from "../services/api";
import { FaPaperPlane, FaStar } from "react-icons/fa";

const INITIAL_STATE = {
  textoResena: "",
  puntuacion: 3,
  horasJugadas: 0,
  dificultad: "Normal",
  recomendaria: true,
};

function FormularioResena({ juegoId, onResenaCreada }) {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [enviando, setEnviando] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "puntuacion" || name === "horasJugadas"
          ? Number(value)
          : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.textoResena.trim()) return;
    setEnviando(true);
    try {
      const nueva = await createResena({
        ...formData,
        juegoId,
      });
      onResenaCreada(nueva);
      setFormData(INITIAL_STATE);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form className="form-resena" onSubmit={handleSubmit}>
      <label>
        Reseña
        <textarea
          name="textoResena"
          value={formData.textoResena}
          onChange={handleChange}
          rows={3}
          placeholder="Escribe tu opinión..."
        />
      </label>

      <div className="form-row">
        <label>
          Puntuación
          <input
            type="number"
            name="puntuacion"
            min="1"
            max="5"
            value={formData.puntuacion}
            onChange={handleChange}
          />
        </label>

        <label>
          Horas jugadas
          <input
            type="number"
            name="horasJugadas"
            min="0"
            value={formData.horasJugadas}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-row">
        <label>
          Dificultad
          <select
            name="dificultad"
            value={formData.dificultad}
            onChange={handleChange}
          >
            <option value="Fácil">Fácil</option>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
          </select>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="recomendaria"
            checked={formData.recomendaria}
            onChange={handleChange}
          />
          ¿Lo recomendarías?
        </label>
      </div>

      <div className="rating-help">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar
            key={i}
            className={
              i < formData.puntuacion ? "star-active" : "star-muted"
            }
          />
        ))}
      </div>

      <button className="btn-primary" type="submit" disabled={enviando}>
        <FaPaperPlane /> {enviando ? "Enviando..." : "Agregar reseña"}
      </button>
    </form>
  );
}

export default FormularioResena;
