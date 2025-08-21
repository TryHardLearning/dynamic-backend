import express from 'express';
// import { router as userRoutes } from './routes/user.routes'; // Exemplo de rota

const app = express();

// Middlewares
app.use(express.json());
// app.use(cors()); // Se você precisar de CORS

// Monta as rotas
// app.use('/api/users', userRoutes);

export { app };