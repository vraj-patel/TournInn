const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const mysqlConnection = require("../../connection");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const checkExistingEmailQuery = "SELECT COUNT(*) As emailCount FROM users WHERE email = ?";
  mysqlConnection.query(checkExistingEmailQuery, req.body.email, (err, data) => {
    if (err) {
      console.log("Select query failed.");
      return res.status(500).json({
        error: err,
      });
    } else if (data[0].emailCount > 0) {
      console.log("Email already exists.");
      return res.status(200).json({
        message: "Email already exists.",
      });
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          console.log("Creating user failed.");
          return res.status(500).json({
            error: err,
          });
        } else {
          const newUser = new User({
            id: null,
            email: req.body.email,
            role: req.body.role,
            password: hash,
          });
          const query = "INSERT INTO users SET ?";

          mysqlConnection.query(query, newUser, (err, result) => {
            if (err) {
              console.log("Inserting new user failed.");
              res.status(500).json({
                error: err,
              });
            } else {
              console.log("Successfully inserted new user.");
              res.status(201).json({
                message: "Successfully inserted new user.",
              });
            }
          });
        }
      });
    }
  });
};

exports.login = (req, res, next) => {
  const query = "SELECT * FROM users WHERE email = ?";

  mysqlConnection.query(query, req.body.email, (err, rows, fields) => {
    if (err) {
      console.log("Error during login.");
      res.status(500).json({
        error: err,
      });
    } else if (rows.length < 1) {
      console.log("Login failed.");
      res.status(401).json({
        message: "Login failed.",
      });
    } else {
      bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
        if (err) {
          console.log("Login failed.");
          res.status(401).json({
            message: "Login failed.",
          });
        } else if (result) {
          const token = jwt.sign(
            {
              email: rows[0].email,
              id: rows[0].id,
              role: rows[0].role,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          console.log("Login successful.");
          res.status(200).json({
            message: "Login successful.",
            token: token,
          });
        } else {
          console.log("Login failed.");
          res.status(401).json({
            message: "Login failed.",
          });
        }
      });
    }
  });
};

exports.deleteUser = (req, res, next) => {
  const query = "DELETE FROM users WHERE id = " + req.params.userId;

  mysqlConnection.query(query, (err, rows, fields) => {
    if (err) {
      console.log("Deleting user failed.");
      res.status(500).json({
        error: err,
      });
    } else {
      console.log("Successfully deleted user.");
      res.status(200).json({
        message: "User was successfully deleted.",
      });
    }
  });
};
