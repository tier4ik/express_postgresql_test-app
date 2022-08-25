import path from 'path';
import { fileURLToPath } from 'url';
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import bodyParser from 'body-parser';

// Default routes utility functions
import DefaultRoutes from './routes/Default.js';
const { displayHome } = DefaultRoutes;
// User routes utility functions
import UserRoutes from './routes/User.js';
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = UserRoutes;

const app = express();

const staticPath = path.join(path.dirname(fileURLToPath(import.meta.url)), 'static');
app.use(express.static(staticPath));
app.use(bodyParser.json());

const port = process.env.port || 3000;

app.get('/', displayHome)
app.get('/users', getUsers)
app.get('/users/:id', getUserById)

app.post('/users', createUser)

app.put('/users', updateUser)

app.delete('/users/:id', deleteUser)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})