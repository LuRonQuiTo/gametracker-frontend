import { useEffect, useMemo, useState } from "react";

const GENEROS = [
  "Acción",
  "Aventura",
  "RPG",
  "Shooter",
  "Lucha",
  "Carreras",
  "Plataformas",
  "Estrategia",
  "MMO",
  "Simulación",
  "Terror",
  "Deportes",
  "Puzzle",
  "Indie",
];

function FormularioJuego({ juego, onGuardar, onCancelar }) {
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1980; y--) {
      years.push(y);
    }
    return years;
  }, []);

  const emptyForm = {
    titulo: "",
    genero: "",
    plataforma: "",
    anioLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
  };

  const [form, setForm] = useState(emptyForm);

  // Cuando seleccionas un juego para editar, llenamos el formulario
  useEffect(() => {
    if (juego) {
      setForm({
        titulo: juego.titulo || "",
        genero: juego.genero || "",
        plataforma: juego.plataforma || "",
        anioLanzamiento: juego.anioLanzamiento || "",
        desarrollador: juego.desarrollador || "",
        imagenPortada: juego.imagenPortada || "",
        descripcion: juego.descripcion || "",
        completado: !!juego.completado,
        _id: juego._id,
      });
    } else {
      setForm(emptyForm);
    }
  }, [juego]);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.titulo.trim()) return alert("El título es obligatorio");
    if (!form.genero) return alert("Selecciona un género");
    if (!form.plataforma.trim()) return alert("La plataforma es obligatoria");

    const payload = {
      ...form,
      anioLanzamiento: form.anioLanzamiento
        ? Number(form.anioLanzamiento)
        : undefined,
    };

    onGuardar(payload);
  }

  const editando = !!form._id;

  return (
    <div className="formulario-juego">
      <h2>{editando ? "Editar juego" : "Agregar juego"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="titulo">Título *</label>
          <input
            id="titulo"
            name="titulo"
            type="text"
            placeholder="God of War, Hollow Knight..."
            value={form.titulo}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="genero">Género</label>
          <select
            id="genero"
            name="genero"
            value={form.genero}
            onChange={handleChange}
          >
            <option value="">Selecciona un género</option>
            {GENEROS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="plataforma">Plataforma</label>
          <input
            id="plataforma"
            name="plataforma"
            type="text"
            placeholder="PC, PlayStation, Xbox..."
            value={form.plataforma}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="anioLanzamiento">Año de lanzamiento</label>
          <select
            id="anioLanzamiento"
            name="anioLanzamiento"
            value={form.anioLanzamiento}
            onChange={handleChange}
          >
            <option value="">Selecciona un año</option>
            {yearOptions.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="desarrollador">Desarrollador / Studio</label>
          <input
            id="desarrollador"
            name="desarrollador"
            type="text"
            placeholder="Santa Monica Studio, FromSoftware..."
            value={form.desarrollador}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="imagenPortada">URL de portada</label>
          <input
            id="imagenPortada"
            name="imagenPortada"
            type="text"
            placeholder="https://..."
            value={form.imagenPortada}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Breve resumen del juego..."
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label>
            <input
              type="checkbox"
              name="completado"
              checked={form.completado}
              onChange={handleChange}
            />{" "}
            Marcar como completado
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "0.5rem",
            marginTop: "0.2rem",
          }}
        >
          {editando && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => onCancelar()}
            >
              Cancelar
            </button>
          )}
          <button type="submit" className="btn-secondary">
            {editando ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioJuego;
