var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var fs = require('fs');
var ytdl = require('ytdl-core');
var ffmpeg = require('fluent-ffmpeg');
var glob = require('glob');
var flow = require('nimble');

var db = require('./config/db');
var port = process.env.PORT || 8080;
var Song = require('./app/models/song');


mongoose.connect(db.url);

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/youMusicFE/dist'));

exports = module.exports = app;

var server = require('http').Server(app);
var io = require('socket.io').listen(server);
server.listen(port, function() { 
	console.log('magic on port ' + port); 
});

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/youMusicFE/dist/index.html');
});

io.on('connection', function(socket){
	console.log('- user connected');

	socket.on('disconnect', function(){
		console.log('- user disconnected');
	});
	
	socket.on('dlRequest', function(videoId, title) {
		console.log('- request for ' + videoId + ' acknowledged');
		
		var query = Song.findOne({'videoId': videoId});
		query.exec(function(err, song) {
			if(err) return console.log(err);
			var thisSong = song;
			if(song === null) {
				console.log('- song dont exist: ' + videoId);
				flow.series([function(callback) {
					//create record and begin download
					thisSong = new Song({
						videoId: videoId,
						path: db.host + '/' + videoId + '.mp3',
						title: title.replace(' ', '_')
					});
					
					thisSong.save(function (err) { if (err) return console.log(err); });
					console.log(thisSong);
					var video_src = ytdl('http://www.youtube.com/watch?v=' + thisSong.videoId);
					video_src.pipe(fs.createWriteStream(__dirname + '/public/' + thisSong.videoId + '.flv'));
					console.log('- saving video file');
					video_src.on('end', function() {
						console.log('- video FLV complete');

						callback();
					});
				}, function(callback) {
					//convert on dl complete
					console.log('- converting video file');
					var proc = new ffmpeg({source:__dirname + '/public/' + thisSong.videoId + '.flv'})
						.setFfmpegPath(db.ffmpegPath)
						.toFormat('mp3')
						.saveToFile(__dirname + '/public/' + thisSong.title + '(' + thisSong.videoId + ')' + '.mp3')
						.on('end', function() {
							callback();
						})
						.on('error', function(err, stdout, stderr) {
							console.log(" =====Convert Video Failed======");
							console.log(err);
							console.log("stdout: " + stdout);
							console.log("stderr: " + stderr);
						});
				}, function(callback) {
					//broadcast on dl complete and delete video file
					console.log('- broadcasting complete status');
					io.sockets.emit('dlComplete', thisSong);
					fs.unlink(__dirname + '/public/' + thisSong.videoId + '.flv', function (err) {
						if (err) return console.log(err);
						console.log('- successfully deleted ' + thisSong.videoId + '.flv');
					});
					callback();
				}]);
			} else {
				//send the result back
				socket.emit('dlComplete', song);
			}
		});
	});
	
});