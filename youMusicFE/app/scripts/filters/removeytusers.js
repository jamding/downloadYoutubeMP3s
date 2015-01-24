'use strict';

/**
 * @ngdoc filter
 * @name youMusicApp.filter:removeYTUsers
 * @function
 * @description
 * # removeYTUsers
 * Filter in the youMusicApp.
 */
angular.module('youMusicApp')
  .filter('removeYTUsers', function () {
    return function (input) {
      var temp = [];
	  for(var i in input) {
		if(input[i].id.videoId) {
			temp.push(input[i]);
		}
	  }
	  return temp;
    };
  });
