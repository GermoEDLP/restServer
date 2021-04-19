const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRouterPath = "/api/usuarios";

    //Conexión de la base de datos
    this.conectarDB();

    //Middlewares
    this.middleware();

    //Rutas de la aplicación
    this.routes();
  }

  async conectarDB() {
    await dbConection();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    //Lectura y parseo
    this.app.use(express.json());

    // Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosRouterPath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
