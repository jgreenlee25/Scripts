(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.index = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  
  'embedded.commerce.carts.addItem.before': {
      actionName: 'embedded.commerce.carts.addItem.before',
      customFunction: require('./domains/commerce.carts/embedded.commerce.carts.addItem.before')
  }
};

},{"./domains/commerce.carts/embedded.commerce.carts.addItem.before":2}],2:[function(require,module,exports){
/**
 * Implementation for embedded.commerce.carts.addItem.before

 * This custom function will receive the following context object:
{
  "exec": {
    "setData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "value",
          "type": "object"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cart"
      }
    },
    "removeData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cart"
      }
    },
    "setItemData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "value",
          "type": "object"
        },
        {
          "name": "itemId",
          "optional": true,
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cartItem"
      }
    },
    "removeItemData": {
      "parameters": [
        {
          "name": "key",
          "type": "string"
        },
        {
          "name": "itemId",
          "optional": true,
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cartItem"
      }
    },
    "setItemAllocation": {
      "parameters": [
        {
          "name": "allocationId",
          "type": "number"
        },
        {
          "name": "expiration",
          "type": "date"
        },
        {
          "name": "productCode",
          "type": "string"
        },
        {
          "name": "itemId",
          "optional": true,
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cartItem"
      }
    },
    "removeItem": {
      "parameters": [
        {
          "name": "itemId",
          "type": "string"
        }
      ],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cart"
      }
    }
  },
  "get": {
    "cart": {
      "parameters": [],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cart"
      }
    },
    "cartItem": {
      "parameters": [],
      "return": {
        "type": "mozu.commerceRuntime.contracts.cart.cartItem"
      }
    }
  }
}


 */

module.exports = function(context, callback) {
  var cart = context.get.cart();
  console.log("this is a test");
  console.log(cart);
  callback();
};

},{}]},{},[1])(1)
});