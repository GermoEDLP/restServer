const Rol = require('../models/rol.model');
const User = require("../models/user.model");

const validarRol = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta definido en BD`);
};

const validarExistenciaCorreo = async(correo) => {
  const existeCorreo = await User.findOne({ correo });
  if (existeCorreo) throw new Error(`El mail ya existe`);
  
}

const validarExistenciaId = async(id = '') => {
  const existeId = await User.findById(id);
  if (existeId==null) throw new Error(`El id especificado no corresponde a ningún usuario registrado`);
  
}

module.exports = { validarRol, validarExistenciaCorreo, validarExistenciaId };
