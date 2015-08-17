// require express
var express = require("express");

// path module
var path = require("path");

// create the express app
var app = express();

// require body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true}));

// static content
app.use(express.static(path.join(__dirname, "./static")));

// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
	res.render("index");
})

var server = app.listen(9000, function() {
	console.log("listening on port 9000");
})

// socket.io module
var io = require('socket.io').listen(server); // notice we pass the server object
io.sockets.on('connection', function(socket) {
	console.log('WE HAVE SOCKETS CONNECTED!');
	console.log(socket.id);
	socket.on("posting_form", function(data) {
		console.log('You emitted the following information to the server: ' + data);
		socket.emit('updated_message', {name: data.name, location: data.location, language: data.language, comments: data.comments});
		var random_number = Math.floor(Math.random() * 1000) + 1;
		socket.emit('random_number', {randomNumber: random_number});
	})
})