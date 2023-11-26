const express = require('express');
const router = express.Router();
const User = require('../Models/user');

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Buscar al usuario por su nombre de usuario
    const usuario = await User.findOne({ username });

    if (!usuario) {
      return res.status(404).json({ message: 'Nombre de usuario incorrecto' });
    }

    // Verificar la contraseña
    if (password === usuario.password) {
      // Si las credenciales son correctas, enviar el nombre de usuario
      res.status(200).json({ message: 'Inicio de sesión exitoso', username: usuario.username });
    } else {
      res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    res.status(500).json({ error: 'Error en la autenticación' });
  }
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
  // Lógica para limpiar la sesión del usuario
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      res.status(500).json({ error: 'Error al cerrar sesión' });
    } else {
      res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    }
  });
});

module.exports = router;
