const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded());
app.use(express.json())

import fs from 'node:fs' //dùng ES6 thì import thư viện như thế này, giống với const fs = require('fs')

//get all users
app.get('/users', (req, res) => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if(err){
      res.send("Error reading file");
      return;
    }

    const users = JSON.parse(data);
    res.send(users);
  })
})

//get detail user
app.get('/users/:id', (req, res) => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if(err){
      res.send("Error reading file");
      return;
    }

    const users = JSON.parse(data);
    
    const index = users.findIndex(user => user.id === parseInt(req.params.id))
    if(index == -1){
      res.send("The id does not exist!");
      return;
    }

    const detailUser = users.find(user => user.id === parseInt(req.params.id));
    res.send(detailUser);
  })
})

//post
app.post('/users', (req, res) => {
  // const {id, name} = req.body
  // const name = req.body.name
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if(err){
      res.send("Error reading file" + err);
      return;
    }

    const users = JSON.parse(data);
    const newUser = req.body;

    if(users.find(user => user.id === newUser.id)){
      res.send("The id of req already exists!");
      return;
    }

    users.push(newUser);
    res.send(users);
    
    //write to file
    fs.writeFile('./data.json', JSON.stringify(users), (e) => {
      if(e){
        console.log("Error writing file");
      }else{
        console.log("File written");
      }
    })
    
  })
})

//put
app.put('/users/:id', (req, res) => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if(err){
      res.send("Error reading file" + err);
      return;
    }

    const users = JSON.parse(data);
    
    const index = users.findIndex(user => user.id === parseInt(req.params.id))
    if(index == -1){
      res.send("The id does not exist!");
      return;
    }
    
    const newUser = req.body;
    users[index] = newUser;
    
    res.send(users);

    //write to file
    fs.writeFile('./data.json', JSON.stringify(users), (e) => {
      if(e){
        console.log("Error writing file");
      }else{
        console.log("File written");
      }
    })
  })  
})

//delete user
app.delete('/users/:id', (req, res) => {
  fs.readFile('./data.json', "utf-8", (err, data) => {
    if(err){
      res.send("Error reading file" + err);
      return;
    }

    const users = JSON.parse(data);
    
    const index = users.findIndex(user => user.id === parseInt(req.params.id))
    if(index == -1){
      res.send("The id does not exist!");
      return;
    }
    
    users.splice(index, 1)
    
    res.send(users);

    //write to file
    fs.writeFile('./data.json', JSON.stringify(users), (e) => {
      if(e){
        console.log("Error writing file");
      }else{
        console.log("File written");
      }
    })
  })
})

//test => không chạy được vì bị ngăn ở trên
// app.get('/users/hello', (req, res) => {
//   res.send('hello')
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})