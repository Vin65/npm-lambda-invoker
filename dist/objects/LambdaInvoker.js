'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AWS = require('aws-sdk');
var offlineEnvironments = ['test', 'development'];

var loggingCallback = function loggingCallback(err, data) {
  console.log(err);
  console.log(data);
};

var LambdaInvoker = function () {
  function LambdaInvoker(environment, region, handler, apiVersion) {
    _classCallCheck(this, LambdaInvoker);

    this.environment = environment;
    this.region = region;
    this.apiVersion = apiVersion || '2015-03-31';
    this.handler = handler;
    this.Lambda = new AWS.Lambda({ apiVersion: this.apiVersion, region: this.region });
  }

  _createClass(LambdaInvoker, [{
    key: 'invoke',
    value: function invoke(params, callback, offlineAttributes) {
      var offline = offlineEnvironments.includes(this.environment);
      if (offline) {
        return this.invokeOffline(params, callback, offlineAttributes);
      }

      return this.Lambda.invoke(params, loggingCallback);
    }
  }, {
    key: 'invokeOffline',
    value: function invokeOffline(params, callback, offlineAttributes) {
      var functionName = this.parseFunctionName(params.FunctionName);
      var handlerFunction = this.handler[functionName];
      return handlerFunction(offlineAttributes.event, offlineAttributes.context, callback);
    }
  }, {
    key: 'parseFunctionName',
    value: function parseFunctionName(functionName) {
      var nameArray = functionName.split('-');
      return nameArray[nameArray.length - 1];
    }
  }]);

  return LambdaInvoker;
}();

;

module.exports = LambdaInvoker;