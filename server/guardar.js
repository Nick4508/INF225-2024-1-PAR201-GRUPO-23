const db = require('./Database')
const user = require('./Models/user')

db()

const guardarUsuarios = async () => {
    try {
      const usuario1 = new user({
        username: 'admin',
        password: 'admin',
        role: 'admin',
      });
  
      const usuario2 = new user({
        username: 'user_1',
        password: 'user_1',
        role: 'user_1',
      });
  
      await usuario1.save();
      await usuario2.save();
  
      console.log('Usuarios guardados exitosamente en la base de datos.');
    } catch (error) {
      console.error('Error al guardar usuarios:', error);
    } finally {
      // Cerrar la conexión después de guardar los usuarios
      mongoose.connection.close();
    }
  };
  
  guardarUsuarios();