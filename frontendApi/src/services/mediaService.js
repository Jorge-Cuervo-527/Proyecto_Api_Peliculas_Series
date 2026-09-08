import axios from 'axios';

const BASE_URL = 'http://localhost:3001/media';

export const obtenerMedia = async () => {
  try {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error obteniendo los medios:", error);
    throw error;
  }
};

export const crearMedia = async (media) => {
  try {
    const respuesta = await axios.post(BASE_URL, media);
    return respuesta.data;
  } catch (error) {
    console.error("Error creando el medio:", error);
    throw error;
  }
};

export const editarMedia = async (id, media) => {
  try {
    const respuesta = await axios.put(`${BASE_URL}/${id}`, media);
    return respuesta.data;
  } catch (error) {
    console.error("Error editando el medio:", error);
    throw error;
  }
};

export const eliminarMedia = async (id) => {
  try {
    const respuesta = await axios.delete(`${BASE_URL}/${id}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error eliminando el medio:", error);
    throw error;
  }
};