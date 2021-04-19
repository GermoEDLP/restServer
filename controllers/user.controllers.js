const { response, request } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");


const usuarioGet = async (req = request, res = response) => {
  // Especificación de que solo retorne aquellos usuarios con estado habilitado
  const estado = { estado: true };
  
  // Obtención de parametros pasados por URL (query en la URL)
  const { limit = 5, since = 0 } = req.query;

  const [total, users] = await Promise.all([
    User.countDocuments(estado),
    User.find(estado).skip(Number(since)).limit(Number(limit)),
  ]);

  res.json({
    total, users
  });
};

const usuarioPost = async (req, res = response) => {
  // Obtencion de parametros pasados por el body de la petición
  const { nombre, correo, password, rol } = req.body;
  const user = new User({ nombre, correo, password, rol });

  // Verificación de correo unico
  const existeMail = await User.findOne({ correo });
  if (existeMail) {
    return res.status(400).json({
      msg: "El mail ya existe",
    });
  }

  // Encriptación de password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Grabar en BD
  await user.save();

  /**
   * Cuando le paso el objeto user, le paso tambien la contraseña
   * y eso no lo quiero pasar, entonces sobreescribo el método .toJSON()
   * que proviene de la clase Schema en el modelo.
   */
  res.json({
    msg: "post API",
    user,
  });
};

const usuarioPut = async (req, res = response) => {
  //Obtención de parametros pasados por el URL (parte de la URL)
  const { id } = req.params;
  const { _id, password, google, estado, correo, ...resto } = req.body;
  
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  
  const user = await User.findByIdAndUpdate(id, resto);
  
  res.json({
    msg: "put API",
    user,
  });
};

const usuarioDelete = async(req, res = response) => {
  const { id } = req.params;

  // Eliminar definitavemente
  // const user = await User.findByIdAndDelete(id);

  // Eliminar por cambio de estado
  const user = await User.findByIdAndUpdate(id, {estado:false});

  res.json({
    user
  });
};
const usuarioPatch = (req, res = response) => {
  res.json({
    msg: "patch API",
  });
};

module.exports = {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
};
