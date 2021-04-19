require('colors');
const mongoose = require("mongoose");

const dbConection = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('Base de datos online'.green);

    } catch (error) {
        console.log(`Error: ${error}`.red);
        throw new Error('Error en la conexión con la base de datos');
    }
};

module.exports = {
  dbConection,
};
