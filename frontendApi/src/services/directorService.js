import axios from 'axios';

// La URL base de el backend para el módulo de directores
const BASE_URL = 'http://localhost:3001/director';

export const obtenerDirectores = async () => {
  try {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error obteniendo los directores:", error);
    throw error;
  }
};

export const crearDirector = async (director) => {
  try {
    const respuesta = await axios.post(BASE_URL, director);
    return respuesta.data;
  } catch (error) {
    console.error("Error creando el director:", error);
    throw error;
  }
};

export const editarDirector = async (id, director) => {
  try {
    const respuesta = await axios.put(`${BASE_URL}/${id}`, director);
    return respuesta.data;
  } catch (error) {
    console.error("Error editando el director:", error);
    throw error;
  }
};