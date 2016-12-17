var
express = require('express'),
    uuid = require('node-uuid'),
    level = require('level'),
    db = level('./users.db'),
    app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.logger());
app.use(express.json());
app.use(app.router);

app.get('/', function(req, res) {
    var users = [];
    var stream = db.createReadStream();
    stream.on('data', function(data) {
        users.push(data);
    });
    stream.on('error', function(err) {
        return res.json(500, err);
    })
    stream.on('end', function() {
        return res.json(200, users);
    });
});

app.get('/user/:id', function(req, res) {
    db.get(req.params.id, function(err, user) {
        if (err) return res.json(500, err);
        return res.json(200, user);
    });
});

app.post('/user', function(req, res) {
    db.put(uuid.v1(), req.body.user, function(err) {
        if (err) return res.json(500, err);
        return res.json(200);
    });
});

app.del('/user/:code', function(req, res) {
    db.del(req.params.code, function(err) {
        if (err) return res.json(500, err);
        return res.json(200);
    });
});

app.listen(app.get('port'), function() {
    console.log("API LevelDB na porta %d", app.get('port'));
});