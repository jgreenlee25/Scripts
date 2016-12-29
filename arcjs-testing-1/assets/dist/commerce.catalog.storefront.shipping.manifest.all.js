(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.index = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  
  'http.commerce.catalog.storefront.shipping.requestRates.before': {
      actionName: 'http.commerce.catalog.storefront.shipping.requestRates.before',
      customFunction: require('./domains/commerce.catalog.storefront.shipping/http.commerce.catalog.storefront.shipping.requestRates.before')
  }
};

},{"./domains/commerce.catalog.storefront.shipping/http.commerce.catalog.storefront.shipping.requestRates.before":2}],2:[function(require,module,exports){
/**
 * Implementation for http.commerce.catalog.storefront.shipping.requestRates.before


 * HTTP Actions all receive a similar context object that includes
 * `request` and `response` objects. These objects are similar to
 * http.IncomingMessage objects in NodeJS.

{
  configuration: {},
  request: http.ClientRequest,
  response: http.ClientResponse
}

 * Call `response.end()` to end the response early.
 * Call `response.set(headerName)` to set an HTTP header for the response.
 * `request.headers` is an object containing the HTTP headers for the request.
 *
 * The `request` and `response` objects are both Streams and you can read
 * data out of them the way that you would in Node.

 */

module.exports = function(context, callback) {
    console.log(context.response);
    callback();
    
  // console.log(context.response.body.rates[0]);
  // console.log(context.response.body.rates[0].shippingRates);
  // console.log(context.response.body.rates[0].shippingRates[0].amount);
  //
  // var rounding = context.configuration.rounding;
  // var percentIncrease = context.configuration.percentIncrease;
  // var ratesLength = context.response.body.rates.length;
  //
  // try {
  //   for (var i = 0; i < ratesLength; i++) {
  //     for (var q = 0; q < context.response.body.rates[i].shippingRates.length; q++) {
  //       context.response.body.rates[i].shippingRates[q].amount = context.response.body.rates[i].shippingRates[q].amount * (1 + percentIncrease);
  //       if (rounding == "up") {
  //         context.response.body.rates[i].shippingRates[q].amount = parseFloat(context.response.body.rates[i].shippingRates[q].amount.toFixed(3)) + 0.001;
  //       } else if (rounding == "down") {
  //         context.response.body.rates[i].shippingRates[q].amount = parseFloat(context.response.body.rates[i].shippingRates[q].amount.toFixed(3));
  //       }
  //     }
  //   }
  //
  // } catch (e) {
  //   console.log("unable to change shipping amount due to exception" + e.toString());
  // }
};

},{}]},{},[1])(1)
});