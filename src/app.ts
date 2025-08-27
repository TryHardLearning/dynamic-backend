import express from 'express';
import cors from 'cors';
import { router } from './routes';

// import { router as userRoutes } from './routes/user.routes'; // Exemplo de rota

const app = express();

// Middlewares
app.use(express.json());
app.use(cors()); // Cords para permitir requisições de outros domínios

// Routes
app.get('/', (_, res) => {
    res.send('API is running!');
});

app.use('/api', router);

export { app };
