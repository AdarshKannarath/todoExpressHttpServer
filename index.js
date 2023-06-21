const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());

//empty array
let todos=[];

//get all todos(get)
const getAllTodos=(req,res)=>{
    res.json(todos);
}
app.get('/todos',getAllTodos)

//create a todo(post)
const createTodos=(req,res)=>{
    const newTodos={
        id:Math.floor(Math.random() * 1000000),
        title: req.body.title,
        description: req.body.description
    };
    todos.push(newTodos);
    res.status(201).json(newTodos);
}
app.post('/todos',createTodos)

//get a todo by id(get)
const getById=()=>{
    const todo = todos.find(t => t.id === parseInt(req.params.id));
        if(!todo){
            res.status(404).json({error:'Not found'})
        }else{
            res.json(todo);
        }
    
}
app.get('/todos/:id',getById)

// update a todo(put)
const updateById=(req,res)=>{
    const todoIndex=todos.findIndex(t=>t.id===parseInt(req.params.id));
    if(todoIndex===-1){
        res.status(404).json({message: "invalid input"})
    }else{
        todos[todoIndex].title=req.body.title
        todos[todoIndex].description=req.body.description
        res.json(todos[todoIndex]);
    }
}
app.put('./todo/:id',updateById)

//delete todo(delete)
const deleteTodo=(req,res)=>{
    const todoIndex=todos.findIndex(t=>t.id===parseInt(req.params.id));
    if(todoIndex===-1){
        res.status(404).json({message: "invalid input"})
    }else{
        todos.splice(todoIndex,1)
        res.status(200).send()
    }
}
app.delete('./todos/:id',deleteTodo)
// for all other routes, return 404
app.use((req, res, next) => {
    res.status(404).send();
  });

//start the server
const start=()=>{
    console.log("Server has started");
}
app.listen(3000,start)
module.exports = app;