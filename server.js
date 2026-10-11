import express from 'express';
import cors from 'cors';
import noteRoutes from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.json({ message: "Servidor corriendo correctamente" });
});

// Rutas de la API para las notas
app.use('/api/notas', noteRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`API disponible en http://localhost:${PORT}/api/notas`);
});