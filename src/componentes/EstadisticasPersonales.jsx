import { FaChartPie, FaCheckCircle, FaList } from "react-icons/fa";

function EstadisticasPersonales({ juegos }) {
  const totalJuegos = juegos.length;
  const completados = juegos.filter((j) => j.completado).length;
  const pendientes = totalJuegos - completados;
  const porcentaje =
    totalJuegos === 0 ? 0 : Math.round((completados / totalJuegos) * 100);

  return (
    <section className="panel">
      <h2>Estadísticas personales</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <FaList />
          <span className="stat-label">Juegos totales</span>
          <span className="stat-value">{totalJuegos}</span>
        </div>
        <div className="stat-card">
          <FaCheckCircle />
          <span className="stat-label">Completados</span>
          <span className="stat-value">
            {completados} ({porcentaje}%)
          </span>
        </div>
        <div className="stat-card">
          <FaChartPie />
          <span className="stat-label">Pendientes</span>
          <span className="stat-value">{pendientes}</span>
        </div>
      </div>
    </section>
  );
}

export default EstadisticasPersonales;
