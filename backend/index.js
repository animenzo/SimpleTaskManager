
const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db');
const TaskRouter = require('./routes/TaskRouter');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const cors = require('cors');

app.use(cors());


app.use(bodyParser.json())
app.use('/tasks',TaskRouter )

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});