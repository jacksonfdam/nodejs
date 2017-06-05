### <i class="icon-file"></i>Lab 13

#### <i class="icon-hdd"></i>  index.js

        var express = require('express');

        /*
        * body-parser is a piece of express middleware that 
        *   reads a form's input and stores it as a javascript
        *   object accessible through `req.body` 
        *
        * 'body-parser' must be installed (via `npm install --save body-parser`)
        * For more info see: https://github.com/expressjs/body-parser
        */
        var bodyParser = require('body-parser');

        // create our app
        var app = express();

        // instruct the app to use the `bodyParser()` middleware for all routes
        app.use(bodyParser());

        // A browser's default method is 'GET', so this
        // is the route that express uses when we visit
        // our site initially.
        app.get('/', function(req, res){
        // The form's action is '/' and its method is 'POST',
        // so the `app.post('/', ...` route will receive the
        // result of our form
        var html = '<form action="/" method="post">' +
                    'Enter your name:' +
                    '<input type="text" name="userName" placeholder="..." />' +
                    '<br>' +
                    '<button type="submit">Submit</button>' +
                    '</form>';
                    
        res.send(html);
        });

        // This route receives the posted form.
        // As explained above, usage of 'body-parser' means
        // that `req.body` will be filled in with the form elements
        app.post('/', function(req, res){
        var userName = req.body.userName;
        var html = 'Hello: ' + userName + '.<br>' +
                    '<a href="/">Try again.</a>';
        res.send(html);
        });

        app.listen(8000);


#### <i class="icon-hdd"></i>  package.json

        {
        "name": "lab13",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
        },
        "author": "",
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.17.2",
            "express": "^4.15.3"
            }
        }












