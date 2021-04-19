const {Schema, model} = require('mongoose');


const userSchema = Schema({
    nombre:{
        type: String,
        // SI es requerido y el mensaje de error si no es provisto
        required: [true, 'El nombre es requerido']
    },
    correo:{
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La constraseña es requerida'],
    },
    img:{
        type: String,
    },
    estado:{
        type: String,
        default: true
    },
    google:{
        type: String,
        default: false
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },

});

/**
 * Sobreescribo este metodo propio del Schema para que no pase
 * la contraseña ni la version cuando sea impreso el objeto.
 * Tener en cuenta que cuando es impreso como un JSON, automaticamnete
 * se llama la función .toJSON() 
 */
userSchema.methods.toJSON = function() {
    const {__v, password, ...user} = this.toObject();
    return user;
}

module.exports = model('User', userSchema);