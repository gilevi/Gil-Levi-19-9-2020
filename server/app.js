var experss = require('express');
var app = experss();
var bodyParser = require('body-parser');
var port = process.env.PORT || 9000;
var cors = require('cors');


const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const { redirect } = require('statuses');
let receiveMails = fs.readFileSync('recieve-messages.json');
let recEmails = JSON.parse(receiveMails);


let sentMails = fs.readFileSync('sent-messages.json');
let sentEmails = JSON.parse(sentMails);
app.use(cors());

app.use(bodyParser.json());

app.get('/', function(req,res){

    res.send('The server is up and runing');
})

app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/messages-receive', function(req,res){

    let mails = fs.readFileSync('recieve-messages.json');
    let sEmails = JSON.parse(mails);
    res.send(sEmails);
});
app.get('/messages-sent', function(req,res){

    let mails = fs.readFileSync('sent-messages.json');
    let sEmails = JSON.parse(mails);
    res.send(sEmails);
});

app.post('/send-message', function(req,res){
    // Here we got the data
    var data = JSON.parse(JSON.stringify(req.body));
    data = Object.keys(data);
    var new_data = data.toString();
    new_data = JSON.parse(new_data);

    // Here we read and add data to json file
    var d = Date(Date.now()); 
    let mails = fs.readFileSync('sent-messages.json');
    let sEmails = JSON.parse(mails);
    var last_id = sEmails[sEmails.length-1]['id'];
     var email = {
         id: last_id+1,
        sender: "gilevi@gmail.com",
        receiver: new_data['data']['email'],
        message: new_data['data']['message'],
        subject: new_data['data']['subject'],
        creationDate: d
    }
    let da = JSON.parse(JSON.stringify(email));
    sEmails.push(da);
    fs.writeFileSync('sent-messages.json', JSON.stringify(sEmails));
    res.send('OK');
});

    // Here we read and delete data from json file
app.delete('/delete-message/:id', function(req,res){
    var loc = req.path.split(':');
    var id = parseInt(loc[1]);
    let mails = fs.readFileSync('recieve-messages.json');
    let sEmails = JSON.parse(mails);
    for( var i=0; i<sEmails.length; i++){
        
        if(sEmails[i]['id'] === id){
            sEmails.splice(i,1);
        }
    }
    fs.writeFileSync('recieve-messages.json', JSON.stringify(sEmails));
    res.send('OK');


})

app.delete('/delete-message-s/:id', function(req,res){
    var loc = req.path.split(':');
    var id = parseInt(loc[1]);
    let mails = fs.readFileSync('sent-messages.json');
    let sEmails = JSON.parse(mails);
    for( var i=0; i<sEmails.length; i++){
        
        if(sEmails[i]['id'] === id){
            sEmails.splice(i,1);
        }
    }
    fs.writeFileSync('sent-messages.json', JSON.stringify(sEmails));
    res.send('OK');

})

app.get('/users', function(req,res){
    let users = fs.readFileSync('users.json');
    let check_users = JSON.parse(users);  
    res.send(check_users);

})
app.post('/users/login', function(req,res){
    console.log(req.body);
    var data = JSON.parse(JSON.stringify(req.body));
    data = Object.keys(data);
    var new_data = data.toString();
    new_data = JSON.parse(new_data);
    let users = fs.readFileSync('users.json');
    let check_users = JSON.parse(users);
    for( var i=0; i<check_users.length; i++){
            if(new_data['user'] == check_users[i]['user'] 
            && new_data['password'] == check_users[i]['password']){
                console.log(new_data['user'], new_data['password'] , check_users[i]['user'], check_users[i]['password']);
                return res.status(201).send('Success');    
            } 
    }
    return res.status(400).send('Cannot find user');
})

   



app.listen(port);
