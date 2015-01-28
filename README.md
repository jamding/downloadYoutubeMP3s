Youtube MP3 Downloader Webapp
===========================
![MEAN development](https://github.com/jamding/MEAN_GRUNT_Boilerplate/blob/master/meanstack.jpg)


Fullstack node/angular/socket.io app to asynchronously request audio downloads from Youtube. Webapp queries Youtube Data v3 API for search, then communicates via Socket.io to download video, convert using FFMPEG to MP3 if not available, then supply user with MP3 download link.

Technologies: NodeJS, AngularJS, ExpressJS, MongoDB, FFMPEG, Youtube Data v3 API, Socket.io, websockets, fs, Grunt, Yeoman, JSHint, Bower, TCP, functional design


NOTE: youtube update 1-27-15 breaks app, throws status 404 when downloading FLV file, pending fix when I have time