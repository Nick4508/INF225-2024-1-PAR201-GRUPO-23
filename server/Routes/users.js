const express = require('express');
const router = express.Router();
const User = require('../Models/user');

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const usuario = await users.findOne({ username, password });
    if (usuario) {
      console.log("Usuario verificado correctamente");
    } else {
      console.log("Nombre de usuario o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error al verificar el usuario", error);
  }
});

// Ruta para crear usuario
router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "El nombre de usuario ya existe" });
    }

    // Crear un nuevo usuario
    const newUser = new User({
      username,
      password,
      role
    });

    // Guardar el nuevo usuario en la base de datos
    const savedUser = await newUser.save();

    res.status(201).json({ message: "Usuario registrado exitosamente", user: savedUser });
  } catch (error) {
    console.error("Error al registrar el usuario", error);
    res.status(500).json({ message: "Error interno del servidor" });
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

