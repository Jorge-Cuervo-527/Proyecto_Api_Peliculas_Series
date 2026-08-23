const mongoose = require ('mongoose');

const directorSchema = mongoose.Schema ({
    nombres: {
        type: String,
        required: true
    },

    estado: {
        type: String,
        required: true,
        enum: ['Activo', 'Inactivo'],
        default: 'Activo'
    },
},

{
    timestamps: {
        createdAt: 'fechaCreacion',
        updatedAt: 'fechaActualizacion'
    }
});

module.exports = mongoose.model('Director', directorSchema);