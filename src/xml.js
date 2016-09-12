'use strict';


/**
 * @module
 * @copyright paywell Team at byteskode <www.byteskode.com>
 * @description utilities for parse and build xml
 * @since 0.1.0
 * @author lally elias<lallyelias87@gmail.com, lally.elias@byteskode.com>
 * @singleton
 * @public
 */


//dependencies
const _ = require('lodash');
const xml2js = require('xml2js');
const Parser = xml2js.Parser;
const Builder = xml2js.Builder;

//xml value processors
const parseNumbers = xml2js.processors.parseNumbers;
const parseBooleans = xml2js.processors.parseBooleans;

//constants
const VERSION = '1.0';
const ENCODING = 'UTF-8';


/**
 * @function
 * @name parse
 * @description parse xml string into json
 * @param  {String|Buffer}   xml     valid xml string
 * @param  {Object}   [options] option to be parsed into xml parser
 * @param  {Function} done    a callback to invoke on success or failure
 * @return {Object}           json representation of xml string
 * @since 0.1.0
 * @public
 */
exports.parse = function (xml, options, done) {

  //normalize arguments
  if (options && _.isFunction(options)) {
    done = options;
    options = {};
  }

  //ensure xml structure
  const isValidXml = !!xml && _.isString(xml) && !_.isEmpty(xml);
  if (!isValidXml) {
    let error = new Error('Invalid XML Structure');
    error.status = 400;
    return done(error);
  }

  //merge options
  options = _.merge({}, {
    root: 'root',
    explicitArray: false,
    valueProcessors: [parseNumbers, parseBooleans]
  }, options);

  //instantiate xml2json parser
  const parser = new Parser(options);

  //parse valid xml structure to json
  parser.parseString(xml, function (error, json) {
    //set error status
    if (error) {
      error.status = 400;
    }

    //obtain root element if specified
    const _json = _.get(json, options.root);
    json = _json ? _json : json;

    return done(error, json);
  });

};


/**
 * @function
 * @name build
 * @description convert json to xml
 * @param  {Object}   json     valid json
 * @param  {Object}   [options] option to be parsed into xml builder
 * @param  {Function} done    a callback to invoke on success or failure
 * @return {Object}           xml representation of json
 * @since 0.1.0
 * @public
 */
exports.build = function (json, options, done) {
  //TODO fix date problem on xml build

  //normalize arguments
  if (options && _.isFunction(options)) {
    done = options;
    options = {};
  }

  //ensure json structure
  json = _.merge({}, json);
  const isValidJson = !!json && _.isPlainObject(json) && !_.isEmpty(json);
  if (!isValidJson) {
    let error = new Error('Invalid JSON Structure');
    error.status = 400;
    return done(error);
  }

  //merge options
  options = _.merge({}, {
    xmldec: {
      encoding: ENCODING,
      version: VERSION,
      standalone: null
    },
    renderOpts: {
      pretty: true
    },
    $: {}
  }, options);

  // prepare xml builder instance
  const xmlBuilder = new Builder(options);

  //prepare json with root
  try {
    //set root and root options
    const hasRoot = _.keys(json).length === 1;

    //build with provided root
    if (hasRoot) {
      //obtain json root element name
      const rootName = _.first(_.keys(json));

      //merge root options
      const _json = _.merge({}, json[rootName], { $: options.$ });

      //update json root
      json[rootName] = _json;

    }

    //build with default root if json has no root
    else {
      json = {
        root: _.merge(json, {
          $: options.$
        })
      };
    }

    //build xml from json
    json = xmlBuilder.buildObject(json);
    return done(null, json);
  }

  //catch errors
  catch (error) {
    //set error status
    error.status = 400;
    return done(error);
  }

};