const express = require("express");
const app = express();
const { Client } = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "Santanotreal2018",
  database: "employeeSystem",
});

client.connect();

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  client.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES ($1,$2,$3,$4,$5)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/employees", (req, res) => {
  client.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:employeeId", (req, res) => {
  const employeeId = req.params.employeeId;
  client.query(
    "DELETE FROM employees WHERE employeeId = $1",
    employeeId,
    (err, result, fields) => {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted Record: " + result.rows);
      }
    }
  );
}); //work on delete

app.listen(3001, () => {
  console.log("Yay, server is runing");
});
