const express = require('express');
const router = express.Router();
const Radiografia = require('../Models/scanner');


//create
router.post('/crear', async (req, res) => {
    try {
      const nuevaRadiografia = new Radiografia(req.body);
      const radiografiaGuardada = await nuevaRadiografia.save();
      res.json(radiografiaGuardada);
    } catch (error) {
      console.error('Error al crear una nueva radiografía:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  
//getAll
router.get('/', async (req, res) => {
    try {
      const radiografias = await Radiografia.find();
      res.json(radiografias);
    } catch (error) {
      console.error('Error al obtener la colección de radiografías:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
//radiografias para hoy
router.get('/fecha/:fecha', async (req, res) => {
    try {
      const fechaBuscada = new Date(req.params.fecha);
      
      const radiografiasPorFecha = await Radiografia.find({ fecha: fechaBuscada });
      
      res.json(radiografiasPorFecha);
    } catch (error) {
      console.error('Error al obtener Scanner por fecha:', error);
      res.status(500).send('Error interno del servidor');
    }
  });

  //radiografias segun random
router.get('/fecha/:fecha/random/:random', async (req, res) => {
  try {
    const fechaBuscada = new Date(req.params.fecha);
    const randomEspecifico = req.params.random;

    // Realizar la consulta a la base de datos
    const radiografiasPorFecha = await Radiografia.find({
      fecha: fechaBuscada,
      random: randomEspecifico
    });

    // Calcular el largo de las radiografías encontradas
    

    res.json({
      radiografiasPorFecha
    });
  } catch (error) {
    console.error('Error al obtener radiografías por fecha y random:', error);
    res.status(500).send('Error interno del servidor');
  }
});
//operaciones por Rut:
//delete
router.delete('/rut/:rut', async (req, res) => {
    try {
      const radiografiaEliminada = await Radiografia.findOneAndRemove({ rut: req.params.rut });
      if (!radiografiaEliminada) {
        return res.status(404).json({ mensaje: 'Scanner no encontrada por Rut' });
      }
      res.json({ mensaje: 'Scanner eliminada correctamente por Rut' });
    } catch (error) {
      console.error('Error al eliminar una radiografía por Rut:', error);
      res.status(500).send('Error interno del servidor');
    }
  });
  //update
router.put('/rut/:rut', async (req, res) => {
try {
    const radiografiaActualizada = await Radiografia.findOneAndUpdate(
    { rut: req.params.rut },
    req.body,
    { new: true }
    );
    if (!radiografiaActualizada) {
    return res.status(404).json({ mensaje: 'Radiografía no encontrada por Rut' });
    }
    res.json(radiografiaActualizada);
} catch (error) {
    console.error('Error al actualizar una radiografía por Rut:', error);
    res.status(500).send('Error interno del servidor');
}
});

//Find
router.get('/rut/:rut', async (req, res) => {
try {
    const radiografiasPorRut = await Radiografia.find({ rut: req.params.rut });
    res.json(radiografiasPorRut);
} catch (error) {
    console.error('Error al obtener radiografías por Rut:', error);
    res.status(500).send('Error interno del servidor');
}
});
  

module.exports = router;
