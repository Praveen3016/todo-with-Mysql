
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react'
import { MdPublishedWithChanges } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

function App() {

const [users , setusers] = useState([])
const [todos , setTodos] = useState([])
const [todo , settodo] = useState("")
const [count , setcount] = useState(101)
const [updatedTodo , setupdatedTodo] = useState("")
const [update , setupdate] = useState(false)
const [tempUpdateId , setTempUpdateId] = useState("")




const addData = () => {

  if(todo.length < 1)
  { 
    alert("Please write ToDo")
    return
  }

  setcount(prew => prew + 1)
  console.log(todo);

  fetch("http://localhost:3000/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ no : count ,
       todo: todo ,
        }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      totaluser();
      settodo("")
    })
    .catch((err) => console.log(err));
};


const deletetodo = (todo_id) => {
  
  fetch("http://localhost:3000/delete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ no : todo_id }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      totaluser();
    })
    .catch((err) => console.log(err));
};


const updatetodo = (todo_id , message) => {
  settodo(message)
  setTempUpdateId(todo_id)

};

function updatedata()
{
  fetch("http://localhost:3000/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ no : tempUpdateId , updated_todo : todo}),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      totaluser();
      setTempUpdateId("");
      setupdate(false)
      settodo("")
    })
    .catch((err) => console.log(err));
}

function totaluser(){
  fetch("http://localhost:3000/users")
  .then(res => res.json())
  .then(data => {console.log(data)
    setusers(data)
  })
  .catch(err => console.log(err)) 
}

 useEffect( ()=>{
  totaluser();
 
 },[])
  return (
    <>
     <h1>Tast-Manager | Mysql</h1>
     <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label></Form.Label>
        <Form.Control value={todo} onChange={(e) => settodo(e.target.value)} type="email" placeholder="Enter your task" />
        <Form.Text className="text-muted">
          Write any thing you want as todo
        </Form.Text>
      </Form.Group>
      </Form>
      {
        update ?  <button onClick={updatedata}  style={{marginBottom:"10px"}}>Update</button> : <button onClick={addData} style={{marginBottom:"10px"}}>Add new todo</button>
      }
    
      
  


<Table striped bordered hover>
      <thead>
        <tr>
        <th>No.</th>
    <th>Name</th>
    <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {
  users.map((user , index)=>{
  return <tr>
    <td>{index}</td>
    <td>{user.todo}</td>
    <td>
      {
        update ? "" :
        <div className="d-flex justify-content-evenly">
    <button className='btn btn-sm border ' onClick={()=>{ setupdate(true); updatetodo(user.no,user.todo); }}><MdPublishedWithChanges  className='text-success' /></button>
      <button className='btn btn-sm border ' onClick={()=>deletetodo(user.no)}><MdDeleteForever  className='text-danger' /></button>
    </div>
      }
    
    </td>
  </tr>
    })
  }
      </tbody>
    </Table>


    </>
  )
}

export default App
