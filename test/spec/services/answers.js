'use strict';

describe('Service: Answers', function () {

  // load the service's module
  beforeEach(module('webAppApp'));

  // instantiate service
  var Answers;
  beforeEach(inject(function (_Answers_) {
    Answers = _Answers_;
  }));

  it('should do something', function () {
    expect(!!Answers).toBe(true);
  });

});
