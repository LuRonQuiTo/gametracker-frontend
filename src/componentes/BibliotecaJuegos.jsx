import { motion, AnimatePresence } from "framer-motion";
import TarjetaJuego from "./TarjetaJuego";

function BibliotecaJuegos({
  juegos,
  onEditar,
  onEliminar,
  setJuegos,
  onVerDetalle,
}) {
  if (!juegos.length) {
    return <p>No tienes juegos en la biblioteca todavía.</p>;
  }

  return (
    <div>
      <h2>Biblioteca de juegos</h2>
      <div className="biblioteca-grid">
        <AnimatePresence>
          {juegos.map((juego) => (
            <motion.div
              key={juego._id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <TarjetaJuego
                juego={juego}
                onEditar={onEditar}
                onEliminar={onEliminar}
                setJuegos={setJuegos}
                onVerDetalle={onVerDetalle}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BibliotecaJuegos;
