const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

const adminLoginData = {
    username: "admin",
    password: "admin"
}

/* In the latest version of express there is no need of that
const bodyParser = require('body-parser'); */

// for static files (CSS)
app.use(express.static(__dirname + "/client"));

/* In the latest version of express there is no need of that (deprecated)
app.use(bodyParser.urlencoded({extended: true})); */
// instead: 
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/admin', (req,res) => {
    res.sendFile(__dirname + '/client/adminLogin.html');
})

app.post('/admin', (req,res) => {
    let username = req.body.username;
    let password = req.body.password;

    if(username == adminLoginData.username && password == adminLoginData.password){
        res.sendFile(__dirname + "/client/adminDashboard.html");
    } else{
        res.status(404).send('Nope!');
        // if you want a custome 404 error page you have to make a html
    }

    
})

app.listen(PORT, ()=> {
    console.log(`Server is running on port: ${PORT}`);
})