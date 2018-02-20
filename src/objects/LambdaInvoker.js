'use strict';

import 'babel-polyfill';

const AWS = require('aws-sdk');
const offlineEnvironments = ['test', 'development'];

const loggingCallback = function(err, data) {
  console.log(err);
  console.log(data);
};

class LambdaInvoker {
  constructor(environment, region, handler, apiVersion) {
    this.environment = environment;
    this.region = region;
    this.apiVersion = apiVersion || '2015-03-31';
    this.handler = handler;
    this.Lambda = new AWS.Lambda({ apiVersion: this.apiVersion, region: this.region });
  }

  invoke(params, callback, offlineAttributes) {
    let offline = offlineEnvironments.includes(this.environment);
    if (offline) { return this.invokeOffline(params, callback, offlineAttributes); }

    return this.Lambda.invoke(params, loggingCallback);
  }

  invokeOffline(params, callback, offlineAttributes) {
    let functionName = this.parseFunctionName(params.FunctionName);
    let handlerFunction = this.handler[functionName];
    return handlerFunction(offlineAttributes.event, offlineAttributes.context, callback);
  };

  parseFunctionName(functionName) {
    let nameArray = functionName.split('-');
    return nameArray[nameArray.length - 1];
  };
};

module.exports = LambdaInvoker;
