const express = require('express');
const router = express.Router();
const mysqlConnection = require('../../connection');

router.get('/', (req, res) => {
    mysqlConnection.query('SELECT * FROM tournaments', (err, rows, fields) => {
        if (err) {
            console.log("There was an error: ", err);
        } else {
            res.send(rows);
        }
    })
})

module.exports = router;
 