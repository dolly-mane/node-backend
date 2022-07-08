const express = require('express');
const mongoose=require('mongoose');
require('dotenv').config()
const app = express();

const Task = require("./model/Task");

app.use(express.json())

const PORT = process.env.PORT||5000;


//to check server is running or not

app.get('/health',(req,res)=>{
    res.json({
       "status":'Server is running Well'
    })
})

//temp database
let tasks = [];

mongoose.connect(process.env.MONGODB_URI ,()=>{

    console.log("Connected to MongoDB Database....")

})



//create a task
app.post('/tasks',async(req,res)=>{

    const task = new Task({
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        emoji: req.body.emoji,
    })

    const savedTask = await task.save();

    res.json({
               'status': 'success',
               'data': savedTask
           })

 });




//To read all tasks
app.get('/tasks' , async(req,res) => {

    const allTasks = await Task.find();
    res.json({
        'status':'success',
        'data': allTasks
    });
    
});

//to read specific task
app.post('/get_task',async(req,res) =>{

    const id = req.body.id;

   const specificTask = await Task.findOne({id: id});


    res.json({
        'status':'success',
        'data': specificTask
    })

})


//to delete all tasks
app.post('/delete_tasks',async(req,res) =>{
    
    const result = await Task.deleteMany();
    res.json({
        'status':'success',
        'message':'deleted all tasks',
        'data':result
    })
})

//to delete specific task
app.post('/delete_task',async(req,res) =>{
   
    const id = req.body.id;
    
    const result = await Task.deleteOne({id: id});


    res.json({
        'status':'success',
        'message':`successfully deleted task by ${id}`,
        'data': result
    })
})

//to update tasks
app.post('/update_task',async(req,res) =>{
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const emoji = req.body.emoji;

    const updateResult = await Task.updateOne({id: id},{
        $set: {
             title: title,
             description: description,
             priority: priority,
             emoji: emoji,
          }
    })

    res.json({
        'status':'success',
        'message': 'successfully task updated',
        'data': updateResult
    });

});

app.listen(PORT,()=>{

    console.log('Server start running on port',PORT);
})