require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 7777;
const bodyParser = require('body-parser');
const cors = require('cors');
const crudRoutes = require('./routes/crud');
const userRoutes = require('./routes/user');
//database connection
require('./config/database')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/todos', crudRoutes);
app.use('/api/users', userRoutes);
//server running status
app.listen(port, () => {
    console.log(`The app listening at http://localhost: ${port}`)
});



