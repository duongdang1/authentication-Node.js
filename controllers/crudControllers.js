var { Todos } = require('../models/crudModel');
var ObjectID = require('mongoose').Types.ObjectId;

exports.index = (req, res) => {
    Todos.find((err,docs) => {
        if(!err) res.send(docs)
        else res.status(500).send(err);
    })
};

exports.searchById = (req, res) => {
    let id = req.params.id;
    res.send("Id found" + id);
}

// Handle POST requests that insert value to the database
exports.insert = (req, res) => {
    let todo_items = req.body.todo; 
    let newTodos = new Todos({todo: todo_items});

    newTodos.save((err, docs) =>{
        if(!err) res.status(201).send(docs);
        else res.status(500).send(err);
    });
}

// Handle POST requests that update data of existing data
exports.update = (req, res) => {
    console.log(req.params.id);
    
    if (!ObjectID.isValid(req.params.id))
    return res.send(400).send('No record with given id: ' + req.params.id)

    let todo_item = req.body.todo;
    let new_todo = {todo: todo_item};

    Todos.findByIdAndUpdate(req.params.id, {$set: new_todo}, {new: true}, (err, docs) =>{
        if (!err) res.status(200).send(docs)
        else console.log('Error while updating the data'+ JSON.stringify(err,undefined,2))
    })

}

exports.delete = (req, res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.send(400).send('No record with given id:' + req.params.id)
    Todos.findByIdAndRemove(req.params.id, (err, docs) => {
        let result = {
            data:docs, 
            message: "Todo has been removed successfully", 
            status: 200
        }
        if(!err) res.status(200).send(result);
        else res.status(500).send(err);
    })
}