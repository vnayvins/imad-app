var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser')

var config = {
    user:'vinayvins11',
    database:'vinayvins11',
    host:'db_imad.hasura-app.io',
    port:'5432',
    password:process.env.DB_PASSWORD
    };

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash( input,salt ){
    
    var hashed=crypto.pbkdf2sync(input,salt,10000,512,'sha512');
    return ['pbkdf' ,'10000' ,salt ,hashed.toString('hex')].join('$');
    
}

app.get('/hash/:input', function(req,res) {
    
    var hashedString=hash(req.params.input,'random -string');
    res.send(hashedString);
    
});

app.post('/create-user' function(req,res) {
    
    
    var username=req.body.username;
    var password=req.body.password;
    
    
    var salt=crypto.getrandomBytes(128).toString('hex');
    
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user1"(username,password) VALUES($1,$2)',[username,dbString] ,function(err,result) {
        
        if(err ) {
            res.status(500).send(err.toString());
             
        }
    else {
        res.send('user successfuly created:' +username);
    }
    
        
    });
});


var pool=new Pool(config)
app.get('/counter',function(req,res) {
    
    pool.query('SELECT * FROM test',function(err,result) {
        
        if(err ) {
            res.status(500).send(err.toString());
             
        }
    else {
        res.send(JSON.stringify(result.rows));
    }
        
    });

});


app.get('/page-1',function(req ,res) {
  res.sendFile(path.join(__dirname, 'ui', 'page-1.html'));
    
});

app.get('/page-2',function(req ,res) {
    res.sendFile(path.join(__dirname, 'ui', 'page-2.html'));
    
});

app.get('/page-3',function(req ,res) {
    res.sendFile(path.join(__dirname, 'ui', 'page-3.html'));
    
});


app.get('/test-db', function(req, res)  {
    
});



var counter=0;
app.get('/counter',function(req,res) {
    counter=counter+1;
    res.send(counter.toString());
    
});


app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
