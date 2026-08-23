const mongoose = require ('mongoose');

const generoSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true,
        unique: true
    },

   estado: {
    type: String,
    required: true,
    enum: ['Activo', 'Inactivo'],
    default: 'Activo'
   },

   descripcion: {
    type: String,
    required: true    
   }

},

{
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});

module.exports = mongoose.model('Genero', generoSchema);