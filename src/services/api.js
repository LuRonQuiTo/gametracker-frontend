import { API_URL } from "../config";

async function handleResponse(res) {
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    const message =
      errorBody.message || `Error HTTP ${res.status} - ${res.statusText}`;
    throw new Error(message);
  }
  // si no hay body, devuelve un objeto vacio
  return res.json().catch(() => ({}));
}

// juegos
export function getJuegos() {
  return fetch(`${API_URL}/juegos`).then(handleResponse);
}

export function getJuegoById(id) {
  return fetch(`${API_URL}/juegos/${id}`).then(handleResponse);
}

export function createJuego(data) {
  return fetch(`${API_URL}/juegos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function updateJuego(id, data) {
  return fetch(`${API_URL}/juegos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function deleteJuego(id) {
  return fetch(`${API_URL}/juegos/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Error eliminando juego");
  });
}

// reseñas
export function getAllResenas() {
  return fetch(`${API_URL}/resenas`).then(handleResponse);
}

export function getResenasByJuego(juegoId) {
  return fetch(`${API_URL}/resenas/juego/${juegoId}`).then(handleResponse);
}

export function createResena(data) {
  return fetch(`${API_URL}/resenas`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function updateResena(id, data) {
  return fetch(`${API_URL}/resenas/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
}

export function deleteResena(id) {
  return fetch(`${API_URL}/resenas/${id}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) throw new Error("Error eliminando reseña");
  });
}
