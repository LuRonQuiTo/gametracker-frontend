function EstadisticasPersonales({ juegos }) {
  const total = juegos.length;
  const completados = juegos.filter((j) => j.completado).length;
  const pendientes = total - completados;
  const porcentaje = total ? Math.round((completados / total) * 100) : 0;

  return (
    <div className="estadisticas-card">
      <h2>Estadísticas personales</h2>
      <ul className="stats-list">
        <li>
          🎮 <span>Juegos totales</span>
          <strong>{total}</strong>
        </li>
        <li>
          ✅ <span>Completados</span>
          <strong>
            {completados} ({porcentaje}%)
          </strong>
        </li>
        <li>
          ⏳ <span>Pendientes</span>
          <strong>{pendientes}</strong>
        </li>
      </ul>
    </div>
  );
}

export default EstadisticasPersonales;
