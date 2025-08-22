import { app } from './app'; // Importa a instância da aplicação
import dotenv from 'dotenv';
import createConnecetionDatabase from './config/mongodb';

dotenv.config();

const port = process.env.PORT || 3000;

// start connection with database
createConnecetionDatabase();

app.listen(port, () => {
  console.log(`Server Online on PORT: ${port}`);
});
console.log('Projeto TS rodando!');
