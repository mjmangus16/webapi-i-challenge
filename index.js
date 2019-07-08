// implement your API here
const express = require("express");

const server = express();

const db = require("./data/db");

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({ error: "There was an error" }));
});

server.listen(5000, () => console.log("Server running on port 5000"));
