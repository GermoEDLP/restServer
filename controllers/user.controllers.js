const { response } = require("express");

const usuarioGet = (req, res = response) => {
  // Obtención de parametros pasados por URL (query en la URL)
  const query = req.query;
  res.json({
    msg: "get API",
    query,
  });
};
const usuarioPost = (req, res = response) => {
  // Obtencion de parametros pasados por el body de la petición
  const body = req.body;

  res.json({
    msg: "post API",
    body,
  });
};
const usuarioPut = (req, res = response) => {
  //Obtención de parametros pasados por el URL (parte de la URL)
  const { id } = req.params;
  res.json({
    msg: "put API",
    id,
  });
};
const usuarioDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
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
