'use strict';

/**
 * @ngdoc function
 * @name youMusicApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the youMusicApp
 */
angular.module('youMusicApp')
.controller('MainCtrl', function ($scope, YTvideos) {
	var socket = io();
	$scope.awesomeItems = [];
	$scope.queryString = '';

	$scope.videos = [];
	
	var typingTimer;
	var doneTypingInterval = 1000;
	
	$scope.searchKeyup = function(keyPressEvent) {
		if(keyPressEvent.keyCode === 13 || keyPressEvent.keyCode === 32) {
			$scope.search();
		}
		clearTimeout(typingTimer);
		typingTimer = setTimeout($scope.search, doneTypingInterval);
	};
	
	$scope.searchKeydown = function() {
		clearTimeout(typingTimer);
	};
	
	$scope.search = function() {
		//console.log($scope.queryString);
		YTvideos.search($scope.queryString)
		.success(function(data) {
			//console.log(data);
			$scope.videos = data.items;
		});

	};
	$scope.search();
	
	$scope.request = function(videoId, title) {
		$('#logo').addClass('animated bounceIn');
		setTimeout(function() {
			$('#logo').removeClass('animated bounceIn');
		}, 1000);
		console.log(videoId);
		socket.emit('dlRequest', videoId, title);
		var contains = false;
		for(var i in $scope.awesomeItems) {
			if($scope.awesomeItems[i].videoId === videoId) {
				contains = true;
			}
		}
		if(!contains) {
			$scope.awesomeItems.push({
				videoId: videoId, 
				path: 'loading',
				title: title
			});
		}
	};
	
	$scope.whichPath = function(link) {
		if(link === 'loading') {
			return false;
		} else {
			
			//window.open(link, '_blank');
		}
	};
	

	socket.on('dlComplete', function(song) {
		console.log(song);
		$('#' + song.videoId).attr("href", song.path)
		for(var i in $scope.awesomeItems) {
			if($scope.awesomeItems[i].videoId === song.videoId) {
				$scope.awesomeItems[i].path = song.path;
				// console.log('match');
			}
		}
		$scope.$apply();
	});

});
