'use strict';

//dependencies
const path = require('path');
const fs = require('fs');
const faker = require('faker');
const expect = require('chai').expect;
const xml = require(path.join(__dirname, '..'));
const payload =
  fs.readFileSync(path.join(__dirname, 'fixtures', 'payload.xml'), 'utf-8');

describe('xml', function () {

  it('should be importable', function () {
    expect(xml).to.exist;
    expect(xml).to.not.be.null;
    expect(xml).to.not.be.undefined;
    expect(xml).to.be.an.Object;
  });

  it('should be able to parse valid xml to json', function (done) {
    xml.parse(payload, function (error, json) {
      expect(error).to.not.exist;
      expect(json).to.exist;
      expect(json.name).to.exist;
      expect(json.email).to.exist;
      expect(json.avatar).to.exist;
      expect(json.phone).to.exist;
      done(error, json);
    });
  });

  it('should throw error when parse invalid xml to json', function (done) {
    xml.parse(faker.lorem.word(), function (error) {
      expect(error).to.exist;
      expect(error.message).to.exist;
      expect(error.status).to.exist;
      expect(error.status).to.to.be.equal(400);
      done();
    });
  });

  it('should throw error when parse null xml to json', function (done) {
    xml.parse(null, function (error) {
      expect(error).to.exist;
      expect(error.message).to.exist;
      expect(error.message).to.be.equal('Invalid XML Structure');
      expect(error.status).to.exist;
      expect(error.status).to.to.be.equal(400);
      done();
    });
  });

  it('should throw error when parse empty xml to json', function (done) {
    xml.parse('', function (error) {
      expect(error).to.exist;
      expect(error.message).to.exist;
      expect(error.message).to.be.equal('Invalid XML Structure');
      expect(error.status).to.exist;
      expect(error.status).to.to.be.equal(400);
      done();
    });
  });

  it('should throw error when parse undefined xml to json', function (done) {
    xml.parse(undefined, function (error) {
      expect(error).to.exist;
      expect(error.message).to.exist;
      expect(error.message).to.be.equal('Invalid XML Structure');
      expect(error.status).to.exist;
      expect(error.status).to.to.be.equal(400);
      done();
    });
  });

  it(
    'should be able to build xml from valid json without root',
    function (done) {
      const json = {
        amount: 725,
        business: 'Langworth Group',
        name: 'Money Market Account 0964',
        type: 'payment',
        account: 62025968
      };
      xml.build(json, function (error, _xml) {
        expect(error).to.not.exist;
        expect(_xml).to.exist;
        xml.parse(_xml, function (error, _json) {
          expect(_json).to.be.eql(json);
          done(error, _json);
        });
      });
    });

  it(
    'should be able to build xml from valid json with root',
    function (done) {
      const json = {
        payment: {
          amount: 725,
          business: 'Langworth Group',
          name: 'Money Market Account 0964',
          type: 'payment',
          account: 62025968
        }
      };
      xml.build(json, function (error, _xml) {
        expect(error).to.not.exist;
        expect(_xml).to.exist;
        xml.parse(_xml, { root: 'payment' }, function (error, _json) {
          expect(_json).to.be.eql(json.payment);
          done(error, _json);
        });
      });
    });

});