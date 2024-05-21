const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded());
app.use(express.json())

const users = [
  {
    'id': 1,
    'name': 'Tú' 
  },
  {
    'id': 2,
    'name': 'Thanh' 
  },
  {
    'id': 3,
    'name': 'Nguyên' 
  },
  {
    'id': 4,
    'name': 'Nguyệt' 
  },
  {
    'id': 5,
    'name': 'Trân' 
  }
]

//get all users
app.get('/users', (req, res) => {
    console.log(users)
    res.json(users)
})

//get detail user
app.get('/users/:id', (req, res) => {
  const userID =  parseInt(req.params.id)
  const detailUser = users.find(user => user.id === userID)
  res.json(detailUser)  
})

//post user
app.post('/users', (req, res) => {
  // const {id, name} = req.body
  // const name = req.body.name
  const newUser = req.body
  console.log(newUser)
  users.push(newUser)
  res.json(newUser)  
})

//put user
app.put('/users/:id', (req, res) => {
  const userID =  parseInt(req.params.id)
  const index = users.findIndex(user => user.id === userID)
  if(index != -1){
    const newUser = req.body
    users[index] = newUser
  }
  res.json(users)  
})

//delete user
app.delete('/users/:id', (req, res) => {
  const userID =  parseInt(req.params.id)
  const index = users.findIndex(user => user.id === userID)
  if(index != -1){
    users.splice(index, 1)
    console.log(users)
  }
  res.json(users)  
})

//test => không chạy được vì bị ngăn ở trên
app.get('/users/hello', (req, res) => {
  res.send('hello')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})