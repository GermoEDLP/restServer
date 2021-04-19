const { Router } = require("express");
const { body, check } = require("express-validator");
const {
  usuarioGet,
  usuarioPost,
  usuarioPut,
  usuarioDelete,
  usuarioPatch,
} = require("../controllers/user.controllers");
const {
  validarRol,
  validarExistenciaCorreo,
  validarExistenciaId,
} = require("../helpers/custom-validators");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();

router.get("/", usuarioGet);

// Como segundo parametro podemos pasar middlewares solo para ese método.
router.post(
  "/",
  [
    body("correo", "El correo no es valido").isEmail(),
    body("correo").custom(validarExistenciaCorreo),
    body("nombre", "El nombre es obligatorio").notEmpty(),
    body("password", "La contraseña debe tener al menos 6 carcateres").isLength(
      {
        min: 6,
      }
    ),
    /* Validación de rol en duro */
    // body("rol", "Rol invalido").isIn(['ADMIN_ROLE', 'USER_ROLE']),
    /* Validación de rol trayendo info de la base de datos */
    body("rol").custom(validarRol),
    validarCampos,
  ],
  usuarioPost
);

router.put(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validarExistenciaId),
    body("rol").custom(validarRol),
    validarCampos,
  ],
  usuarioPut
  );
  
  router.delete("/:id", [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(validarExistenciaId),
    validarCampos
],usuarioDelete);

router.patch("/", usuarioPatch);

module.exports = router;
