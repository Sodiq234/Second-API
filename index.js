const express = require('express');

const bodyParser = require('body-parser');

const data = require('./dataStore');

const app = express();

const PORT = 8887;

app.use(bodyParser.json());

app.post('/login', (req,res) => {

    const { email, password } = req.body;
    
    if (!email || !password || email.indexOf("@") === -1) {

     return res.status(400).json({
            status: false,
            message: "Please provide the correct information"
        })
    }

    const checkUser = data.filter(user => user.email === email && user.password === password)

    if (checkUser.length === 0){

    return  res.status(400).json({
            status: false,
            message: "Invalid Password or Email",
    })}

    res.status(200).json({
        status: true,
        message: "You are successfully logged in",
        data: checkUser
    }) 
})

app.post('/signup', (req,res) => {

    const { name, email, password, age } = req.body;

    if (!name || !email || !password || !age){
        
        return res.status(400).json({
               status: false,
               message: "All fields are required"
        })
    }

    const collectedData = {
        id: data.length + 1,
        name,
        email,
        password,
        age
    }
    data.push(collectedData);

    res.status(400).json({
    status: true,
    message: "You are signed up",
    data: collectedData
})
})

app.get('/all-users', (req,res) => {

    res.status(200).json({
        status: true,
        message: "All users list",
        data: data
    })
})

app.get('/user/me/:id', (req,res) => {

    const userId = parseInt(req.params.id);

    const userIndex = data.findIndex(user => user.id === userId)

    if (userIndex === -1){
     return   res.status(400).json({
              status: false,
              message: "User not found"
        })
    }

    const foundData = data.find(user => user.id === userId)

    res.status(200).json({
        status: true,
        message: "This is the user requested",
        data: foundData
    })
    
})

app.listen(PORT, () => {

    console.log(`Server is listening on port ${PORT}`)
})
