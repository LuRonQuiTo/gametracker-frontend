import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes } from "react-icons/fa";

const INITIAL_STATE = {
  titulo: "",
  genero: "",
  plataforma: "",
  anioLanzamiento: "",
  desarrollador: "",
  imagenPortada: "",
  descripcion: "",
  completado: false,
};

function FormularioJuego({ juego, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState(INITIAL_STATE);

  useEffect(() => {
    if (juego) {
      setFormData({
        _id: juego._id,
        titulo: juego.titulo || "",
        genero: juego.genero || "",
        plataforma: juego.plataforma || "",
        anioLanzamiento: juego.anioLanzamiento || "",
        desarrollador: juego.desarrollador || "",
        imagenPortada: juego.imagenPortada || "",
        descripcion: juego.descripcion || "",
        completado: juego.completado || false,
      });
    } else {
      setFormData(INITIAL_STATE);
    }
  }, [juego]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "anioLanzamiento"
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.titulo.trim()) return;
    onGuardar(formData);
  }

  return (
    <motion.section
      className="panel"
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <h2>{juego ? "Editar juego" : "Agregar juego"}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Título *
          <input
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Género
          <input
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            placeholder="Acción, RPG, Estrategia..."
          />
        </label>

        <label>
          Plataforma
          <input
            name="plataforma"
            value={formData.plataforma}
            onChange={handleChange}
            placeholder="PC, PlayStation, Xbox..."
          />
        </label>

        <div className="form-row">
          <label>
            Año lanzamiento
            <input
              type="number"
              name="anioLanzamiento"
              value={formData.anioLanzamiento}
              onChange={handleChange}
              min="1970"
              max={new Date().getFullYear()}
            />
          </label>

          <label>
            Desarrollador
            <input
              name="desarrollador"
              value={formData.desarrollador}
              onChange={handleChange}
              placeholder="Studio / Dev"
            />
          </label>
        </div>

        <label>
          URL de portada
          <input
            name="imagenPortada"
            value={formData.imagenPortada}
            onChange={handleChange}
            placeholder="https://..."
          />
        </label>

        <label>
          Descripción
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows={3}
            placeholder="Breve resumen del juego..."
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="completado"
            checked={formData.completado}
            onChange={handleChange}
          />
          Marcar como completado
        </label>

        <div className="form-actions">
          <button type="submit" className="btn-primary">
            <FaSave /> Guardar
          </button>
          {juego && (
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancelar}
            >
              <FaTimes /> Cancelar
            </button>
          )}
        </div>
      </form>
    </motion.section>
  );
}

export default FormularioJuego;
