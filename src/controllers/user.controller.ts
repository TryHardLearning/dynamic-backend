// import { Request, Response } from 'express';
// import userService from '../services/user.service';

// const createUser = async (req: Request, res: Response) => {
//   // AQUI você acessa os dados enviados pelo cliente
//   // express.json() já converteu o JSON para um objeto JS
//   const userData = req.body;

//   try {
//     const newUser = await userService.createUser(userData);
//     return res.status(201).json(newUser);
//   } catch (error) {
//     return res.status(500).json({ message: 'Erro ao criar usuário.' });
//   }
// };

// export default {
//   createUser,
// };
