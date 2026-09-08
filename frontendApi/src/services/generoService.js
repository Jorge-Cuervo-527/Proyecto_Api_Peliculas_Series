import axios from 'axios';

// La URL base de el backend para el módulo de géneros
const BASE_URL = 'http://localhost:3001/genero';

// FUNCIÓN PARA OBTENER TODOS LOS GÉNEROS
export const obtenerGeneros = async () => {
  try {
    const respuesta = await axios.get(BASE_URL);
    return respuesta.data;
  } catch (error) {
    console.error("Error obteniendo los géneros:", error);
    throw error;
  }
};

//  FUNCIÓN PARA CREAR UN NUEVO GÉNERO
export const crearGenero = async (genero) => {
  try {
    const respuesta = await axios.post(BASE_URL, genero);
    return respuesta.data;
  } catch (error) {
    console.error("Error creando el género:", error);
    throw error;
  }
};

// FUNCIÓN PARA EDITAR UN GÉNERO
export const editarGenero = async (id, genero) => {
  try {
    const respuesta = await axios.put(`${BASE_URL}/${id}`, genero);
    return respuesta.data;
  } catch (error) {
    console.error("Error editando el género:", error);
    throw error;
  }
};