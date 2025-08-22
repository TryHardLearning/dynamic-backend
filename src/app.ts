import express from 'express';
import cors from 'cors';

// import { router as userRoutes } from './routes/user.routes'; // Exemplo de rota

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Cords para permitir requisições de outros domínios

// Routes
// app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
  res.send('API is running!');
});

export { app };
