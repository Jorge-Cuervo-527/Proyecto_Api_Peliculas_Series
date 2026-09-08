import React, { useState, useEffect } from 'react';
import { obtenerGeneros, crearGenero, editarGenero } from '../services/generoService'; // Importamos editarGenero
import Swal from 'sweetalert2';

export default function Genero() {
  const [generos, setGeneros] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', estado: 'Activo', descripcion: '' });
  
  // NUEVO ESTADO: Guardará el ID del género si estamos editando, o null si estamos creando
  const [generoEditando, setGeneroEditando] = useState(null);

  useEffect(() => {
    cargarGeneros();
  }, []);

  const cargarGeneros = async () => {
    try {
      const data = await obtenerGeneros();
      setGeneros(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar la tabla", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // NUEVA FUNCIÓN: Se ejecuta al dar clic en el botón "Editar" de la tabla
  const handleEditarClick = (genero) => {
    setFormData({ 
      nombre: genero.nombre, 
      estado: genero.estado, 
      descripcion: genero.descripcion 
    });
    setGeneroEditando(genero._id); // Guardamos el ID para saber que vamos a actualizar
    setMostrarFormulario(true); // Abrimos el formulario
  };

  // FUNCIÓN MODIFICADA: Ahora decide si crea o edita
  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (generoEditando) {
        // Si hay un ID en generoEditando, actualizamos
        await editarGenero(generoEditando, formData);
        Swal.fire('¡Éxito!', 'El género se actualizó correctamente', 'success');
      } else {
        // Si no hay ID, creamos uno nuevo
        await crearGenero(formData);
        Swal.fire('¡Éxito!', 'El género se creó correctamente', 'success');
      }
      
      // Reseteamos todo después de guardar
      setMostrarFormulario(false);
      setGeneroEditando(null);
      setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
      cargarGeneros(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el género', 'error');
    }
  };

  // NUEVA FUNCIÓN: Para limpiar si el usuario cancela a mitad de una edición
  const handleCancelar = () => {
    setMostrarFormulario(false);
    setGeneroEditando(null);
    setFormData({ nombre: '', estado: 'Activo', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Géneros</h2>
        <button 
          className="btn btn-primary" 
          onClick={mostrarFormulario ? handleCancelar : () => setMostrarFormulario(true)}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Género'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow mb-4">
          <div className="card-body">
            {/* Cambiamos el título dinámicamente */}
            <h5 className="mb-3">{generoEditando ? 'Editar Género' : 'Crear Nuevo Género'}</h5>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Descripción</label>
                  <input type="text" className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
              </div>
              {/* Cambiamos el botón dinámicamente */}
              <button type="submit" className={generoEditando ? "btn btn-warning" : "btn btn-success"}>
                {generoEditando ? 'Actualizar Género' : 'Guardar Género'}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="card shadow">
        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="4" className="text-center text-muted">Cargando géneros...</td></tr>
              ) : generos.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted">No hay géneros registrados.</td></tr>
              ) : (
                generos.map((genero) => (
                  <tr key={genero._id}>
                    <td>{genero.nombre}</td>
                    <td>{genero.estado}</td>
                    <td>{genero.descripcion}</td>
                    <td>
                      {/* Enlazamos el botón de editar con nuestra nueva función */}
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEditarClick(genero)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}