import React, { useState, useEffect } from 'react';
import { obtenerDirectores, crearDirector, editarDirector } from '../services/directorService';
import Swal from 'sweetalert2';

export default function Director() {
  const [directores, setDirectores] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // Los directores suelen tener solo nombre y estado
  const [formData, setFormData] = useState({ nombres: '', estado: 'Activo' });
  const [directorEditando, setDirectorEditando] = useState(null);

  useEffect(() => {
    cargarDirectores();
  }, []);

  const cargarDirectores = async () => {
    try {
      const data = await obtenerDirectores();
      setDirectores(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar la tabla", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditarClick = (director) => {
    setFormData({ 
      nombres: director.nombres, 
      estado: director.estado 
    });
    setDirectorEditando(director._id);
    setMostrarFormulario(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (directorEditando) {
        await editarDirector(directorEditando, formData);
        Swal.fire('¡Éxito!', 'El director se actualizó correctamente', 'success');
      } else {
        await crearDirector(formData);
        Swal.fire('¡Éxito!', 'El director se creó correctamente', 'success');
      }
      
      setMostrarFormulario(false);
      setDirectorEditando(null);
      setFormData({ nombres: '', estado: 'Activo' });
      cargarDirectores(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el director', 'error');
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setDirectorEditando(null);
    setFormData({ nombres: '', estado: 'Activo' });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Directores</h2>
        <button 
          className="btn btn-primary" 
          onClick={mostrarFormulario ? handleCancelar : () => setMostrarFormulario(true)}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Director'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3">{directorEditando ? 'Editar Director' : 'Crear Nuevo Director'}</h5>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombres del Director</label>
                  {/* Asegúrate de que tu backend reciba "nombres" o "nombre" según como lo hayas programado */}
                  <input type="text" className="form-control" name="nombres" value={formData.nombres} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
              <button type="submit" className={directorEditando ? "btn btn-warning" : "btn btn-success"}>
                {directorEditando ? 'Actualizar Director' : 'Guardar Director'}
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
                <th>Nombres</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="3" className="text-center text-muted">Cargando directores...</td></tr>
              ) : directores.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted">No hay directores registrados.</td></tr>
              ) : (
                directores.map((director) => (
                  <tr key={director._id}>
                    <td>{director.nombres}</td>
                    <td>{director.estado}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEditarClick(director)}
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