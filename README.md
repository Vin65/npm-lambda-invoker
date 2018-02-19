# Installation
* `npm install --save git+ssh://git@github.com/Vin65/npm-lambda-invoker.git#master`

# Usage

### `LambdaInvoker`
* Add `const LambdaInvoker = require('npm-lambda-invoker);` to make `LambdaInvoker` constructor available to your code.

* To create a new `LambdaInvoker` instance, call `new LambdaInvoker(environment, region, handler, api_version)

  * environment(string): The current execution environment. Test and developement will invoke the lambda offline.

  * region(string): The execution region of the lambda.

  * handler(object): The handler object containing the handling functions.

  * api_version(string): The version of the aws api to be used.

* Using the invoke function `invoker.invoke(params, callback, offlineAttributes)`
  * params(object): Needs to have a FunctionName property with the name as string.
  * callback(function): The invocation callback function
  * offlineAttributes(object): Should contain the event object and the context object.

  The function will determine weather to invoke using the Lambda AWS sdk object or invoke offline based on the environment.

* Invoking offline directly `invoker.invokeOffline(params, callback, offlineAttributes`