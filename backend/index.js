
const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db');
const TaskRouter = require('./routes/TaskRouter');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const cors =require('cors');

app.use(cors({
    origin:[
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "https://simple-task-manager-ui.vercel.app/"
      
    ],
    credentials:true
}));

app.get('/',(req,res)=>{
    res.send("Hell from server")
})
app.use(bodyParser.json())
app.use('/tasks',TaskRouter )

app.listen(PORT, "0.0.0.0",() => {
    console.log(`Server is running on port ${PORT}`);
});