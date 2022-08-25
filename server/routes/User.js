import pool from '../queries/queries.js';

const UserRoutes = {
  getUsers(req, res) {
    pool.query(
      'SELECT id, email FROM users ORDER BY id ASC',
      (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows)
      }
    )
  },
  getUserById(req, res) {
    const id = parseInt(req.params.id);
    pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id],
      (err, results) => {
        if (err) throw err;
        res.status(200).json(results.rows)
      }
    )
  },
  createUser(req, res) {
    const { name, email } = req.body;
    pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email],
      (err, results) => {
        if (err) throw err;
        res.status(201).json(`User added with ID: ${results.rows[0].id}`)
      }
    )
  },
  updateUser(req, res) {
    const { id, name, email } = req.body;
    pool.query(
      'UPDATE users SET name = $1, email = $2 WHERE id = $3',
      [name, email, id],
      (err, results) => {
        if (err) throw err;
        res.status(200).json(`User modified with ID: ${id}. New user's properties are ${name} ${email}.`)
      }
    )
  },
  deleteUser(req, res) {
    const id = parseInt(req.params.id);
    pool.query(
      'DELETE FROM users WHERE id = $1',
      [id],
      (error, results) => {
        if (error) throw error;
        res.status(200).send(`User deleted with ID: ${id}`)
      }
    )
  },
}

export default UserRoutes;