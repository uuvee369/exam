var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser');


app.use(cors())
app.use(bodyParser.json());

// get the client
const mysql = require('mysql2');

var host = 'localhost';
if(process.env.NODE_ENV == 'production')  {
    host = 'mysql-server'
}


// create the connection to database
const connection = mysql.createConnection({
  host: host,
  user: 'root',
  password: '1234',
  database: 'db'
});

app.get('/User', function (req, res, next) {
    connection.query(
  'SELECT * FROM tb',
  function(err, results, fields) {
    res.json(results);
    
   
    }
  );
  

})

app.post("/create", (req, res) => {
  connection.query(
    "INSERT INTO tb (n, l) VALUES (?,?)",
    [req.body.n,  req.body.l,],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({error: "Error inserting data into database"});
      } else {
        res.json({message: "Data inserted successfully"});
      }
    }
  );
});



app.listen(3333, function () {
  console.log('CORS-enabled web server listening on port 3333')
})