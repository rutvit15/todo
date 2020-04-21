
//var data = [{item:'get food'},{item:'get sleep'},{item:'watch series'}];

var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

mongoose.connect('mongodb+srv://test:test@cluster0-zbezo.mongodb.net/test?retryWrites=true&w=majority',{ useUnifiedTopology: true,useNewUrlParser: true });

//create schema
var todoSchema = new mongoose.Schema({
    item:String
});

//create model
var Todo = mongoose.model('Todo',todoSchema);
/*var itemOne = Todo({item:'get flowers'}).save(function(err){
  if(err) throw err;
  console.log('item saved');
});*/

module.exports = function(app){
  app.get('/todo',function(req,res){
    Todo.find({},function(err,data){
      if(err) throw err;
      res.render('todo',{todoitem:data});
    });

  });

  app.post('/todo',urlencodeParser,function(req,res){
    var newTodo = Todo(req.body).save(function(err,data){
      if(err) throw err;
        res.json(data);
    });
    //  data.push(req.body);
    //res.json({todoitem:data});
  });

  app.delete('/todo/:item',function(req,res){
    Todo.find({item:req.params.item}).remove(function(err,data){
      if(err) throw err;
      res.json(data);
    });
      /*data = data.filter(function(todo){
        return todo.item !==req.params.item;
      });
      res.json(data);*/
  });

};
