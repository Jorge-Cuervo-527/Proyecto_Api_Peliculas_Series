const mongoose = require ('mongoose');

const productoraSchema = mongoose.Schema ({
    nombreProductora: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },

    slogan: {
        type: String,
        required: true

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

module.exports = mongoose.model ('Productora', productoraSchema);

