const { Schema, model } = require("mongoose");

const rolSchema = Schema({
  role: {
    type: String,
    require: [true, "El rol es requerido"],
  },
});

module.exports = model('Role', rolSchema);
