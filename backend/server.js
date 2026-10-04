const express = require("express")
const cors=require("cors")
const mongoose=require("mongoose");
const Todo = require("./models/Todo")
require("dotenv").config()
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error)
    })
const app = express();
app.use(express.json());
app.use(cors());


app.get("/api/todos", async (req, res) => {
    const todo=await Todo.find();
    res.json(todo)
})
app.post("/api/todos", async (req, res) => {
    const todo=await Todo.create({
        title:req.body.title,
        completed:req.body.completed
    })
    res.json(todo);
});
app.delete("/api/todos/:id", async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id)

    res.json(todo)
})
app.patch("/api/todos/:id",async(req,res)=>{
    console.log("I am running")
    const todo=await Todo.findByIdAndUpdate(req.params.id,req.body, { returnDocument: "after" });
    res.json(todo)
})
app.get("/api/todos/completed", async (req, res) => {
    const todos = await Todo.find({ completed: true })
    res.json(todos)
})
app.listen(5000,()=>{
    console.log("Server is running on port 5000")
})