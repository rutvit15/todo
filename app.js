var todoController = require('./controllers/todoController');
var express = require('express');
var app = express();

app.set('view engine','ejs');

app.use('/assets',express.static('assets'));
todoController(app);
app.listen(3000);
console.log('listening');
