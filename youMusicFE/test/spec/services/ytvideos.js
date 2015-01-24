'use strict';

describe('Service: YTvideos', function () {

  // load the service's module
  beforeEach(module('youMusicApp'));

  // instantiate service
  var YTvideos;
  beforeEach(inject(function (_YTvideos_) {
    YTvideos = _YTvideos_;
  }));

  it('should do something', function () {
    expect(!!YTvideos).toBe(true);
  });

});
