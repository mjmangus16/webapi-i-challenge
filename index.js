// implement your API here
const express = require("express");

const server = express();

const Users = require("./data/db");

server.use(express.json());

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err));
});

server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  Users.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json(err));
});

server.post("/api/users", (req, res) => {
  const userData = req.body;

  Users.insert(userData)

    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err));
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Can not find that user." });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;

  Users.update(id, data)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: "Can not find that user." });
      }
    })
    .catch(err => res.status(500).json(err));
});

server.listen(5000, () => console.log("Server running on port 5000"));
