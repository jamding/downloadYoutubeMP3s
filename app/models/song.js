var mongoose = require('mongoose');

var Song = mongoose.model('Song', {
	videoId: String,
	date: {type: Date, default: Date.now },
	path: String,
	title: String
});

module.exports = exports = Song;
