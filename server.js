var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Poll = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'majumdar123hillol',
    database: 'majumdar123hillol',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
}; 

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
var pool = new Poll(config);

var articles = {
 'article-one' : {
       title: 'Article One | Hillol Majumdar',
       heading: 'Article',
       date:'Sep 5, 2016',
       content:`<p>
       This is hillol. 1st article is displayed here.
       </p>`
    },
 'article-two' : {
       title: 'Article Two | Hillol Majumdar',
       heading: 'Article',
       date:'Sep 5, 2016',
       content:`<p>
       This is hillol. 1st article is displayed here.
       </p>`
},
 'article-three': {
       title: 'Article Three | Hillol Majumdar',
       heading: 'Article',
       date:'Sep 5, 2016',
       content:`<p>
       This is hillol. 1st article is displayed here.
       </p>`
},
};
    function createTemplete(data){
       var title = data.title;
       var date = data.date;
       var heading = data.heading;
       var content = data.content;
 var htmlTemplate = `<html>
  <head>
  <title>
	${title}
	</title>
	<meta name="viewport" content="width-device-width, initial-scale-1" />
	<link href="/ui/style.css" rel="stylesheet" />
  </head>
  <body>
      <div class='container'>
    <div >
      <a href="/">Home</a>
    </div>
    <hr/>
    ${heading}
    <div>
      ${date.toDateString()}
    </div>
    <div>
    ${content}
   </div>
   </div>
  </body>
</html>`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input, salt){
    // how do we create a hash
    var hashed = crypto.pbkdf2Sync(input, salt, 1000, 150, 'sha512');
    return ["pbkdf2","1000",salt, hashed.toString('hex')].join('$');
    
}

app.get('/hash/:input',function(req, res){
    var hashedString = hash(req.params.input, 'this-is-some-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res){
    //username, password
    //{"username": "hillol", "password": "password"}
     //JSON
     
     var username = req.body.username;
     var password = req.body.password;
     var salt = crypto.randomBytes(128).toString('hex');
     var dbString = hash(password, salt);
     pool.query('insert into userr (username, password) values ($1, $2)', [username, dbString], function(err, result){  
         if(err){res.status(500).send(err.toString());}
       else {res.send("User Created Fully"); }
         
     });
    });


app.post('/login', function(req, res){
    //username, password
    //{"username": "hillol", "password": "password"}
     //JSON
     
     var username = req.body.username;
     var password = req.body.password;
     
     pool.query('SELECT * from "userr" where username = $1', [username], function(err, result){  
         if(err){res.status(500).send(err.toString());}
       else {
           if(result.rows.lengtyh === 0){
           res.send(403).send('username is invalid');}
           else{
               //match the password
               var dbString = result.rows[0].password;
               var salt = dbString.split('$')[2];
               var hashedPassword = hash(password, salt);
               if(hashedPassword === dbString){
                   res.send("Credentials correct");
               } else {
                   res.send("invalid password");
               }
           }
           
       }
         
     });
    });


/*app.get('/test-db', function(req, res){
    pool.query('select * from test', function(err, result){
       if(err){res.status(500).send(err.toString());}
       else {res.send(JSON.stringify(result.rows)); }
    });
});*/

var counter = 0;
app.get('/counter', function(req , res){
    counter = counter + 1;
    res.send(counter.toString());
    });

var names = [];
app.get('/submit-name', function(req, res){
    //get the name from the request
    var name = req.query.name;
    
    names.push(name);
    // json
    res.send(JSON.stringify(names));
});


app.get('/articles/:articleName', function (req, res) {
    // articleName == article-one
    //articles[articleName] == {} content object for aricle one
    // Fetch data from database to display
   // pool.query("select * from article where title = '" + req.params.articleName + "'", function (err, result){
   pool.query("select * from article where title = $1", [req.params.articleName], function (err, result){
        if(err){res.status(500).send(err.toString());}
        else {
            if(result.rows.length === 0){
                res.status(404).send('Article Not Found');
            }
            else {var articleData = result.rows[0];
                res.send(createTemplete(articleData));
            }
        }
    });
    });


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});



// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});