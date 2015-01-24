'use strict';

describe('Filter: removeYTUsers', function () {

  // load the filter's module
  beforeEach(module('youMusicApp'));

  // initialize a new instance of the filter before each test
  var removeYTUsers;
  beforeEach(inject(function ($filter) {
    removeYTUsers = $filter('removeYTUsers');
  }));

  it('should return the input prefixed with "removeYTUsers filter:"', function () {
    var text = 'angularjs';
    expect(removeYTUsers(text)).toBe('removeYTUsers filter: ' + text);
  });

});
