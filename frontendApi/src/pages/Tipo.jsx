import React, { useState, useEffect } from 'react';
import { obtenerTipos, crearTipo, editarTipo } from '../services/tipoService';
import Swal from 'sweetalert2';

export default function Tipo() {
  const [tipos, setTipos] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '' });
  const [tipoEditando, setTipoEditando] = useState(null);

  useEffect(() => {
    cargarTipos();
  }, []);

  const cargarTipos = async () => {
    try {
      const data = await obtenerTipos();
      setTipos(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar la tabla", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditarClick = (tipo) => {
    setFormData({ 
      nombre: tipo.nombre, 
      descripcion: tipo.descripcion 
    });
    setTipoEditando(tipo._id);
    setMostrarFormulario(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (tipoEditando) {
        await editarTipo(tipoEditando, formData);
        Swal.fire('¡Éxito!', 'El tipo se actualizó correctamente', 'success');
      } else {
        await crearTipo(formData);
        Swal.fire('¡Éxito!', 'El tipo se creó correctamente', 'success');
      }
      
      setMostrarFormulario(false);
      setTipoEditando(null);
      setFormData({ nombre: '', descripcion: '' });
      cargarTipos(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar el tipo', 'error');
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setTipoEditando(null);
    setFormData({ nombre: '', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Tipos</h2>
        <button 
          className="btn btn-primary" 
          onClick={mostrarFormulario ? handleCancelar : () => setMostrarFormulario(true)}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nuevo Tipo'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3">{tipoEditando ? 'Editar Tipo' : 'Crear Nuevo Tipo'}</h5>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  <input type="text" className="form-control" name="nombre" value={formData.nombre} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Descripción</label>
                  <input type="text" className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className={tipoEditando ? "btn btn-warning" : "btn btn-success"}>
                {tipoEditando ? 'Actualizar Tipo' : 'Guardar Tipo'}
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
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="3" className="text-center text-muted">Cargando tipos...</td></tr>
              ) : tipos.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted">No hay tipos registrados.</td></tr>
              ) : (
                tipos.map((tipo) => (
                  <tr key={tipo._id}>
                    <td>{tipo.nombre}</td>
                    <td>{tipo.descripcion}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEditarClick(tipo)}
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