const express = require("express")
const cors = require("cors");
const mysql = require("mysql")

const app = express();

app.use(cors());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "praveen_db"
})



app.use(express.json());

app.get("/",(req ,res)=>{
      return res.json("hello your server is working");
})

app.post('/data', (req, res) => {
    const sql = `INSERT INTO todo_table (no, todo, todo_id) VALUES (${req.body.no}, '${req.body.todo}', '${req.body.id}')`;
    db.query(sql, (err, result) => {
        if (err) {
            console.error("Error inserting record:", err);
            return res.status(500).json({ error: "Failed to insert record" });
        }
        console.log("1 record inserted");
        return res.json({ message: "Record inserted successfully" });
    });
});


app.get("/users" , (req , res) =>{
    const sql = "SELECT * from todo_table"
    db.query(sql , (err , data)=>{
        if(err){
            return res.json( err )
        }

        return res.json(data)
    });
})

app.post("/delete" , (req , res) =>{
    const sql = `DELETE FROM todo_table WHERE no = ${req.body.no} `  
    db.query(sql , (err , data)=>{
        if(err){
            return res.json( err )
        }
        return res.json(data)
    });
})

app.post("/update" , (req , res) =>{
    const sql = `UPDATE todo_table SET todo = '${req.body.updated_todo}' WHERE no = ${req.body.no};`  
    db.query(sql , (err , data)=>{
        if(err){
            return res.json( err )
        }

        return res.json(data)
    });
})



app.listen(3000 , ()=>{
   console.log("runing at 3000")
})