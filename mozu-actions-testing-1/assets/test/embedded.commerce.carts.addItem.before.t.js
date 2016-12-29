/**
 * This is a scaffold for unit tests for the custom function for
 * `embedded.commerce.carts.addItem.before`.
 * Modify the test conditions below. You may:
 *  - add special assertions for code actions from Simulator.assert
 *  - create a mock context with Simulator.context() and modify it
 *  - use and modify mock Mozu business objects from Simulator.fixtures
 */

'use strict';

var Simulator = require('mozu-action-simulator');
var assert = Simulator.assert;

var actionName = 'embedded.commerce.carts.addItem.before';

describe('embedded.commerce.carts.addItem.before implementing embedded.commerce.carts.addItem.before', function () {

  var action;

  before(function () {
    action = require('../src/domains/commerce.carts/embedded.commerce.carts.addItem.before');
  });

  it('runs successfully', function(done) {

    var callback = function(err) {
      assert.ok(!err, "Callback was called with an error: " + err);
      // more assertions
      done();
    };

    var context = Simulator.context(actionName, callback);

    // modify context as necessary


    Simulator.simulate(actionName, action, context, callback);
  });
});

module.exports = function(context, callback) {
  var cart = context.exec.get.cart();
  console.log("this is a test");
  callback();
}
