import React, { useState, useEffect } from 'react';
import { obtenerProductoras, crearProductora, editarProductora } from '../services/productoraService';
import Swal from 'sweetalert2';

export default function Productora() {
  const [productoras, setProductoras] = useState([]);
  const [cargando, setCargando] = useState(true);
  
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // 1. CORREGIDO: Cambiamos 'nombre' por 'nombreProductora'
  const [formData, setFormData] = useState({ nombreProductora: '', estado: 'Activo', slogan: '', descripcion: '' });
  const [productoraEditando, setProductoraEditando] = useState(null);

  useEffect(() => {
    cargarProductoras();
  }, []);

  const cargarProductoras = async () => {
    try {
      const data = await obtenerProductoras();
      setProductoras(data);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar la tabla", error);
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditarClick = (productora) => {
    setFormData({ 
      // 2. CORREGIDO: Ajustamos el mapeo al editar
      nombreProductora: productora.nombreProductora, 
      estado: productora.estado,
      slogan: productora.slogan,
      descripcion: productora.descripcion
    });
    setProductoraEditando(productora._id);
    setMostrarFormulario(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (productoraEditando) {
        await editarProductora(productoraEditando, formData);
        Swal.fire('¡Éxito!', 'La productora se actualizó correctamente', 'success');
      } else {
        await crearProductora(formData);
        Swal.fire('¡Éxito!', 'La productora se creó correctamente', 'success');
      }
      
      setMostrarFormulario(false);
      setProductoraEditando(null);
      // 3. CORREGIDO: Ajustamos al limpiar el formulario
      setFormData({ nombreProductora: '', estado: 'Activo', slogan: '', descripcion: '' });
      cargarProductoras(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar la productora', 'error');
    }
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setProductoraEditando(null);
    // 4. CORREGIDO: Ajustamos al cancelar
    setFormData({ nombreProductora: '', estado: 'Activo', slogan: '', descripcion: '' });
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Gestión de Productoras</h2>
        <button 
          className="btn btn-primary" 
          onClick={mostrarFormulario ? handleCancelar : () => setMostrarFormulario(true)}
        >
          {mostrarFormulario ? 'Cancelar' : '+ Nueva Productora'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-3">{productoraEditando ? 'Editar Productora' : 'Crear Nueva Productora'}</h5>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Nombre</label>
                  {/* 5. CORREGIDO: El name y value del input */}
                  <input type="text" className="form-control" name="nombreProductora" value={formData.nombreProductora} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Estado</label>
                  <select className="form-select" name="estado" value={formData.estado} onChange={handleChange}>
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Slogan</label>
                  <input type="text" className="form-control" name="slogan" value={formData.slogan} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Descripción</label>
                  <input type="text" className="form-control" name="descripcion" value={formData.descripcion} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className={productoraEditando ? "btn btn-warning" : "btn btn-success"}>
                {productoraEditando ? 'Actualizar Productora' : 'Guardar Productora'}
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
                <th>Slogan</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="5" className="text-center text-muted">Cargando productoras...</td></tr>
              ) : productoras.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">No hay productoras registradas.</td></tr>
              ) : (
                productoras.map((productora) => (
                  <tr key={productora._id}>
                    {/* 6. CORREGIDO: Mostrar el dato en la tabla */}
                    <td>{productora.nombreProductora}</td>
                    <td>{productora.estado}</td>
                    <td>{productora.slogan}</td>
                    <td>{productora.descripcion}</td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-warning"
                        onClick={() => handleEditarClick(productora)}
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