const express = require('express');
const app = express();
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
      user: 'postgres',
      host: 'localhost',
      database: 'express',
      password: 'ASKsome123!',
      port: 5432,
    },
  });
  
app.use(express.json());

app.get("/api", async (req, res) => {
  try {
    const users = await db.select('*').from('users');
    res.json({ users });
  } catch (error) {
    console.error('Error fetching data from the database:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/api/add-user", async (req, res) => {
    try {
        const { username, email } = req.body;
        if (!username || !email) {
          return res.status(400).json({ error: 'Username and email are required' });
        }
        await db('users').insert({
          username,
          email,
        });
        res.json({ message: 'User added successfully' });
      } catch (error) {
        console.error('Error adding user to the database:', error);
        res.status(500).json({ error: error.message }); // Send detailed error message
      }
    });
  

app.listen(5000, () => {
  console.log("Server has started on Port 5000!");
});