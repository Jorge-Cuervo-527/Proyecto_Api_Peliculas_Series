import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Importamos el servicio de Media
import { obtenerMedia, crearMedia, editarMedia, eliminarMedia } from '../services/mediaService';

// Importamos los servicios para llenar los desplegables
import { obtenerGeneros } from '../services/generoService';
import { obtenerDirectores } from '../services/directorService';
import { obtenerProductoras } from '../services/productoraService';
import { obtenerTipos } from '../services/tipoService';

export default function Media() {
  const [medias, setMedias] = useState([]);
  
  // Listas para los Selects
  const [generos, setGeneros] = useState([]);
  const [directores, setDirectores] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);
  
  const [cargando, setCargando] = useState(true);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [mediaEditando, setMediaEditando] = useState(null);

  // Estado inicial alineado con el Schema de Mongoose
  const estadoInicial = {
    serial: '', titulo: '', sinopsis: '', urlPelicula: '', 
    imagenPortada: '', anioEstreno: '', genero: '', director: '', 
    productora: '', tipo: ''
  };
  const [formData, setFormData] = useState(estadoInicial);

  // Al cargar la pantalla, traemos toda la información de la base de datos
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      // Usamos Promise.all para cargar todo al mismo tiempo (es más rápido)
      const [dataMedia, dataGeneros, dataDirectores, dataProductoras, dataTipos] = await Promise.all([
        obtenerMedia(), obtenerGeneros(), obtenerDirectores(), obtenerProductoras(), obtenerTipos()
      ]);
      
      setMedias(dataMedia);
      setGeneros(dataGeneros);
      setDirectores(dataDirectores);
      setProductoras(dataProductoras);
      setTipos(dataTipos);
      setCargando(false);
    } catch (error) {
      console.error("Error al cargar los datos", error);
      Swal.fire('Error', 'No se pudieron cargar los datos del servidor', 'error');
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    try {
      if (mediaEditando) {
        await editarMedia(mediaEditando, formData);
        Swal.fire('¡Éxito!', 'Producción actualizada correctamente', 'success');
      } else {
        await crearMedia(formData);
        Swal.fire('¡Éxito!', 'Producción registrada correctamente', 'success');
      }
      setMostrarFormulario(false);
      setMediaEditando(null);
      setFormData(estadoInicial);
      cargarDatos(); 
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar los datos', 'error');
    }
  };

  const handleEditarClick = (media) => {
    // Al editar, extraemos el ID si el objeto viene poblado desde el backend
    setFormData({ 
      serial: media.serial, 
      titulo: media.titulo, 
      sinopsis: media.sinopsis, 
      urlPelicula: media.urlPelicula, 
      imagenPortada: media.imagenPortada, 
      anioEstreno: media.anioEstreno, 
      genero: typeof media.genero === 'object' ? media.genero?._id : media.genero, 
      director: typeof media.director === 'object' ? media.director?._id : media.director, 
      productora: typeof media.productora === 'object' ? media.productora?._id : media.productora, 
      tipo: typeof media.tipo === 'object' ? media.tipo?._id : media.tipo 
    });
    setMediaEditando(media._id);
    setMostrarFormulario(true);
  };

  const handleEliminarClick = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminarMedia(id);
          Swal.fire('¡Eliminado!', 'La producción ha sido eliminada.', 'success');
          cargarDatos();
        } catch (error) {
          Swal.fire('Error', 'No se pudo eliminar el registro', 'error');
        }
      }
    });
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setMediaEditando(null);
    setFormData(estadoInicial);
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Catálogo de Películas y Series</h2>
        <button className="btn btn-primary" onClick={mostrarFormulario ? handleCancelar : () => setMostrarFormulario(true)}>
          {mostrarFormulario ? 'Cancelar' : '+ Registrar Producción'}
        </button>
      </div>

      {mostrarFormulario && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h5 className="mb-4">{mediaEditando ? 'Editar Producción' : 'Registrar Nueva Producción'}</h5>
            <form onSubmit={handleGuardar}>
              <div className="row">
                <div className="col-md-3 mb-3">
                  <label className="form-label">Serial (Único)</label>
                  <input type="text" className="form-control" name="serial" value={formData.serial} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Título</label>
                  <input type="text" className="form-control" name="titulo" value={formData.titulo} onChange={handleChange} required />
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Año de Estreno</label>
                  <input type="number" className="form-control" name="anioEstreno" value={formData.anioEstreno} onChange={handleChange} required />
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Sinopsis</label>
                  <textarea className="form-control" name="sinopsis" value={formData.sinopsis} onChange={handleChange} rows="2" required></textarea>
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL de la Película</label>
                  <input type="url" className="form-control" name="urlPelicula" value={formData.urlPelicula} onChange={handleChange} required />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL de Imagen (Portada)</label>
                  <input type="url" className="form-control" name="imagenPortada" value={formData.imagenPortada} onChange={handleChange} required />
                </div>

                <div className="col-md-3 mb-3">
                  <label className="form-label">Género</label>
                  <select className="form-select" name="genero" value={formData.genero} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    {generos.filter(g => g.estado === 'Activo').map(g => (
                      <option key={g._id} value={g._id}>{g.nombre}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Director</label>
                  <select className="form-select" name="director" value={formData.director} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    {directores.filter(d => d.estado === 'Activo').map(d => (
                      <option key={d._id} value={d._id}>{d.nombres}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Productora</label>
                  <select className="form-select" name="productora" value={formData.productora} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    {productoras.filter(p => p.estado === 'Activo').map(p => (
                      <option key={p._id} value={p._id}>{p.nombreProductora}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Tipo</label>
                  <select className="form-select" name="tipo" value={formData.tipo} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    {tipos.map(t => (
                      <option key={t._id} value={t._id}>{t.nombre}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button type="submit" className={mediaEditando ? "btn btn-warning mt-3" : "btn btn-success mt-3"}>
                {mediaEditando ? 'Actualizar Producción' : 'Guardar Producción'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* TABLA DE RESULTADOS RESPONSIVA */}
      <div className="card shadow">
        <div className="card-body table-responsive">
          <table className="table table-striped table-hover align-middle text-center">
            <thead className="table-dark">
              <tr>
                <th>Serial</th>
                <th>Título</th>
                <th>Sinopsis</th>
                <th>URL</th>
                <th>Año</th>
                <th>Género</th>
                <th>Director</th>
                <th>Productora</th>
                <th>Tipo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cargando ? (
                <tr><td colSpan="10" className="text-muted py-4">Cargando catálogo...</td></tr>
              ) : medias.length === 0 ? (
                <tr><td colSpan="10" className="text-muted py-4">No hay producciones registradas.</td></tr>
              ) : (
                medias.map((media) => (
                  <tr key={media._id}>
                    <td>{media.serial}</td>
                    <td><strong>{media.titulo}</strong></td>
                    <td style={{ maxWidth: '150px' }} className="text-truncate" title={media.sinopsis}>
                      {media.sinopsis}
                    </td>
                    <td>
                      <a href={media.urlPelicula} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-info">
                        Ver
                      </a>
                    </td>
                    <td>{media.anioEstreno}</td>
                    
                    <td>{media.genero?.nombre || 'N/A'}</td>
                    <td>{media.director?.nombres || 'N/A'}</td>
                    <td>{media.productora?.nombreProductora || media.productora?.nombre || 'N/A'}</td>
                    <td>{media.tipo?.nombre || 'N/A'}</td>
                    
                    <td>
                      <div className="d-flex flex-column align-items-center">
                        <button className="btn btn-sm btn-outline-warning mb-1 w-100" onClick={() => handleEditarClick(media)}>Editar</button>
                        <button className="btn btn-sm btn-outline-danger w-100" onClick={() => handleEliminarClick(media._id)}>Eliminar</button>
                      </div>
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