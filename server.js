require('dotenv').config();
const app = require('express')();
const http = require('http').createServer(app);
const PORT = process.env.PORT || 7777;

const bodyParser = require('body-parser');
const cors = require('cors');
const crudRoutes = require('./routes/crud');
const userRoutes = require('./routes/user');
const dataRoutes = require('./routes/data');


//database connection
require('./config/database')

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

//routes
app.use('/api/todos', crudRoutes);
app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes)
//server running status
app.listen(PORT, () => {
    console.log(`The app listening at http://localhost: ${PORT}`)
});



