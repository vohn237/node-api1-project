const express = require('express');
const db = require('../db.config.js');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello Devohn!');
});

server.get('/api/users', async (req, res) => {
  try {
    const users = await db('accounts');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.get('/api/users/:id', async (req, res) => {
  try {
    const user = await db('accounts');
    if (!user) {
      res
        .status(404)
        .json({ message: "user with the specified ID doesn't exist" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: 'user information could not be retrieved' });
  }
});

// server.post('/api/users', async (req, res) => {
//   try {
//     const newUser = await db('accounts');
//     if (!newUser.name || !newUser.bio) {
//       res.status(400).json({ message: 'provide name and bio for the user' });
//     } else {
//       db.insert(newUser);
//       res.status(201).json(newUser);
//     }
//   } catch (err) {
//     res.status(500).json({
//       message: 'error while saving the user to the database',
//     });
//   }
// });

// server.post('/api/users', (req, res) => {
//   const userInfo = req.body;

//   if (!userInfo.name || !userInfo.bio) {
//     res
//       .status(400)
//       .json({ errorMessage: 'Please provide name and bio for the user.',  });
//   } else {
//     // db.add is not a function throwing postman err  ??
//     db.insert(userInfo)
//       .then((users) => {
//         res.status(201).json(users);
//       })
//       .catch((err) => {
//         console.log(err);
//         res
//           .status(500)
//           .json({
//             errorMessage: 'Please provide name and bio for the user.',
//             err,
//           });
//       });
//   }
// });

server.post('/api/users', async (req, res) => {
  const postBody = req.body;
  try {
    const accounts = await db('accounts').insert(postBody);
    res.status(201).json(accounts);
  } catch (err) {
    res.status(500).json({ message: 'failed to post' });
  }
});

server.delete('/api/users/:id', async (req, res) => {
  try {
    const deleteUser = await db('accounts');
    if (!deleteUser) {
      res
        .status(404)
        .json({ message: 'user with the specified ID does not exist' });
    } else {
      res.json(deleteUser);
    }
  } catch (err) {
    res.status(500).json({ message: 'user could not be removed' });
  }
});

server.put('/api/users/:id', async (req, res) => {
  const updateUser = await db('accounts');
  if (!updateUser) {
    res
      .status(404)
      .json({ message: 'user with the specified ID does not exist' });
  } else if (!updateUser.name || !updateUser.bio) {
    res.status(400).json({ message: 'provide name and bio for the user' });
  } else {
    res.json(updateUser);
  }
});

module.exports = server;
