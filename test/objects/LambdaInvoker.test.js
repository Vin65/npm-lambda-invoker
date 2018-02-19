'use strict';

import Invoker from './../../src/objects/LambdaInvoker';

const expect = require('chai').expect;
const sinon = require('sinon');

describe('Invoker', function() {
  beforeEach(function() {
    this.handler = {};
    this.handler['test'] = function() {};
    this.invoker = new Invoker('test', 'us-east', this.handler, '2015-03-31');
    this.params = { FunctionName: 'Lambda-test' };
  });

  afterEach(function() {
  });

  describe('#invoke', function() {
    context('when offline', function() {
      it('invokes the offline method', function() {
        let spy = sinon.spy(this.invoker, 'invokeOffline');
        this.invoker.invoke(this.params, () => {}, {});
        expect(spy.called).to.be.eql(true);
      });
    });

    context('when online', function() {
      it('invokes the aws lambda sdk', function() {
        let spy = sinon.spy(this.invoker.Lambda, 'invoke');
        this.invoker.environment = 'production';
        this.invoker.invoke(this.params, () => {}, {});
        expect(spy.called).to.be.eql(true);
      });
    });
  });

  describe('#offlineInvoke', function() {
    it('invokes the handler function', function() {
      let spy = sinon.spy(this.handler, 'test');
      this.invoker.invokeOffline(this.params, () => {}, {});
      expect(spy.called).to.be.eql(true);
    });
  });

  describe('#parseFunctionName', function() {
    it('returns the name of the function', function() {
      let name = 'lambda-test';
      expect(this.invoker.parseFunctionName(name)).to.be.eql('test');
    });
  });
});
