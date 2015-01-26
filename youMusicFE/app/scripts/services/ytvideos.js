'use strict';

/**
 * @ngdoc service
 * @name youMusicApp.YTvideos
 * @description
 * # YTvideos
 * Service in the youMusicApp.
 */
angular.module('youMusicApp')
  .factory('YTvideos', function ($http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
	var youtubeURL = 'https://www.googleapis.com/youtube/v3/search?';

	return {
		search: function(queryString) {
			var youtubeParams = [];
			youtubeParams.push('key=AIzaSyCsFnZ64jbCedT3hzYKjzlHeJAcYsOlC8A');
			youtubeParams.push('part=snippet');
			youtubeParams.push('maxResults=12');
			youtubeParams.push('q=' + encodeURIComponent(queryString));
			var youtubeAPI = youtubeURL + youtubeParams.join('&');
			return $http({
				url: youtubeAPI,
				method: 'GET',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
				}
			});
		}
	};
  });
