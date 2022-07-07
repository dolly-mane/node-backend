const express = require('express');

const app = express();

app.use(express.json())

const PORT = 5000;


//to check server is running or not

app.get('/health',(req,res)=>{
    res.json({
       "status":'Server is running Well'
    })
})

//temp database
let tasks = [];

//create a task
app.post('/tasks',(req,res)=>{

    const task = {
        'id':req.body.id,
        'title':req.body.title,
        'description':req.body.description,
        'priority':req.body.priority,
        'emoji':req.body.emoji,
    }

    tasks.push(task);

    res.json({
        'status':'success',
        'message': 'task added successfully',
        'data':task
    })



})

//To read all tasks
app.get('/tasks' , (req,res) => {

    res.json({
        'status':'success',
        'data':tasks
    })
    
})

//to read specific task
app.post('/get_task',(req,res) =>{
    const id = req.body.id;

    let resultTask;

    tasks.map((task) => {
       if(task === id){
        resultTask = task;
       }
    })

    res.json({
        'status':'success',
        'data': resultTask
    })

})


//to delete all tasks
app.post('/delete_tasks',(req,res) =>{
    tasks=[]
    res.json({
        'status':'success',
        'message':'deleted all tasks',
        'data':tasks
    })
})

//to delete specific task
app.post('/delete_task',(req,res) =>{
   
    const id = req.body.id;

    let index = -1;

    tasks.map((task,i) =>{
        if(id === task.id)
        {
            index = i;
        }
    })
    tasks.splice(index, 1)

    res.json({
        'status':'success',
        'message':`successfully deleted task by ${id}`,
        'data': tasks
    })
})

//to update tasks
app.post('/update_task',(req,res) =>{
    const id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority;
    const emoji = req.body.emoji;

    let index = -1;
    tasks.map((task, i) =>{
        if(id === task.id)
        {
            index=i;
        }
    })

    tasks[index] =  {
        id: id,
        title: title,
        description: description,
        priority: priority,
        emoji: emoji
    }

    res.json({
        'status':'success',
        'message': 'successfully task updated',
        'data': tasks
    })

})

app.listen(PORT,()=>{

    console.log('Server start running on port',PORT);
})