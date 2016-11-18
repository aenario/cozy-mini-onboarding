(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("cozy-api", [], factory);
	else if(typeof exports === 'object')
		exports["cozy-api"] = factory();
	else
		root["cozy-api"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	(function(self) {
	  'use strict';
	
	  if (self.fetch) {
	    return
	  }
	
	  var support = {
	    searchParams: 'URLSearchParams' in self,
	    iterable: 'Symbol' in self && 'iterator' in Symbol,
	    blob: 'FileReader' in self && 'Blob' in self && (function() {
	      try {
	        new Blob()
	        return true
	      } catch(e) {
	        return false
	      }
	    })(),
	    formData: 'FormData' in self,
	    arrayBuffer: 'ArrayBuffer' in self
	  }
	
	  function normalizeName(name) {
	    if (typeof name !== 'string') {
	      name = String(name)
	    }
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	      throw new TypeError('Invalid character in header field name')
	    }
	    return name.toLowerCase()
	  }
	
	  function normalizeValue(value) {
	    if (typeof value !== 'string') {
	      value = String(value)
	    }
	    return value
	  }
	
	  // Build a destructive iterator for the value list
	  function iteratorFor(items) {
	    var iterator = {
	      next: function() {
	        var value = items.shift()
	        return {done: value === undefined, value: value}
	      }
	    }
	
	    if (support.iterable) {
	      iterator[Symbol.iterator] = function() {
	        return iterator
	      }
	    }
	
	    return iterator
	  }
	
	  function Headers(headers) {
	    this.map = {}
	
	    if (headers instanceof Headers) {
	      headers.forEach(function(value, name) {
	        this.append(name, value)
	      }, this)
	
	    } else if (headers) {
	      Object.getOwnPropertyNames(headers).forEach(function(name) {
	        this.append(name, headers[name])
	      }, this)
	    }
	  }
	
	  Headers.prototype.append = function(name, value) {
	    name = normalizeName(name)
	    value = normalizeValue(value)
	    var list = this.map[name]
	    if (!list) {
	      list = []
	      this.map[name] = list
	    }
	    list.push(value)
	  }
	
	  Headers.prototype['delete'] = function(name) {
	    delete this.map[normalizeName(name)]
	  }
	
	  Headers.prototype.get = function(name) {
	    var values = this.map[normalizeName(name)]
	    return values ? values[0] : null
	  }
	
	  Headers.prototype.getAll = function(name) {
	    return this.map[normalizeName(name)] || []
	  }
	
	  Headers.prototype.has = function(name) {
	    return this.map.hasOwnProperty(normalizeName(name))
	  }
	
	  Headers.prototype.set = function(name, value) {
	    this.map[normalizeName(name)] = [normalizeValue(value)]
	  }
	
	  Headers.prototype.forEach = function(callback, thisArg) {
	    Object.getOwnPropertyNames(this.map).forEach(function(name) {
	      this.map[name].forEach(function(value) {
	        callback.call(thisArg, value, name, this)
	      }, this)
	    }, this)
	  }
	
	  Headers.prototype.keys = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push(name) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.values = function() {
	    var items = []
	    this.forEach(function(value) { items.push(value) })
	    return iteratorFor(items)
	  }
	
	  Headers.prototype.entries = function() {
	    var items = []
	    this.forEach(function(value, name) { items.push([name, value]) })
	    return iteratorFor(items)
	  }
	
	  if (support.iterable) {
	    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
	  }
	
	  function consumed(body) {
	    if (body.bodyUsed) {
	      return Promise.reject(new TypeError('Already read'))
	    }
	    body.bodyUsed = true
	  }
	
	  function fileReaderReady(reader) {
	    return new Promise(function(resolve, reject) {
	      reader.onload = function() {
	        resolve(reader.result)
	      }
	      reader.onerror = function() {
	        reject(reader.error)
	      }
	    })
	  }
	
	  function readBlobAsArrayBuffer(blob) {
	    var reader = new FileReader()
	    reader.readAsArrayBuffer(blob)
	    return fileReaderReady(reader)
	  }
	
	  function readBlobAsText(blob) {
	    var reader = new FileReader()
	    reader.readAsText(blob)
	    return fileReaderReady(reader)
	  }
	
	  function Body() {
	    this.bodyUsed = false
	
	    this._initBody = function(body) {
	      this._bodyInit = body
	      if (typeof body === 'string') {
	        this._bodyText = body
	      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
	        this._bodyBlob = body
	      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
	        this._bodyFormData = body
	      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	        this._bodyText = body.toString()
	      } else if (!body) {
	        this._bodyText = ''
	      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
	        // Only support ArrayBuffers for POST method.
	        // Receiving ArrayBuffers happens via Blobs, instead.
	      } else {
	        throw new Error('unsupported BodyInit type')
	      }
	
	      if (!this.headers.get('content-type')) {
	        if (typeof body === 'string') {
	          this.headers.set('content-type', 'text/plain;charset=UTF-8')
	        } else if (this._bodyBlob && this._bodyBlob.type) {
	          this.headers.set('content-type', this._bodyBlob.type)
	        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
	          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
	        }
	      }
	    }
	
	    if (support.blob) {
	      this.blob = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return Promise.resolve(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as blob')
	        } else {
	          return Promise.resolve(new Blob([this._bodyText]))
	        }
	      }
	
	      this.arrayBuffer = function() {
	        return this.blob().then(readBlobAsArrayBuffer)
	      }
	
	      this.text = function() {
	        var rejected = consumed(this)
	        if (rejected) {
	          return rejected
	        }
	
	        if (this._bodyBlob) {
	          return readBlobAsText(this._bodyBlob)
	        } else if (this._bodyFormData) {
	          throw new Error('could not read FormData body as text')
	        } else {
	          return Promise.resolve(this._bodyText)
	        }
	      }
	    } else {
	      this.text = function() {
	        var rejected = consumed(this)
	        return rejected ? rejected : Promise.resolve(this._bodyText)
	      }
	    }
	
	    if (support.formData) {
	      this.formData = function() {
	        return this.text().then(decode)
	      }
	    }
	
	    this.json = function() {
	      return this.text().then(JSON.parse)
	    }
	
	    return this
	  }
	
	  // HTTP methods whose capitalization should be normalized
	  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']
	
	  function normalizeMethod(method) {
	    var upcased = method.toUpperCase()
	    return (methods.indexOf(upcased) > -1) ? upcased : method
	  }
	
	  function Request(input, options) {
	    options = options || {}
	    var body = options.body
	    if (Request.prototype.isPrototypeOf(input)) {
	      if (input.bodyUsed) {
	        throw new TypeError('Already read')
	      }
	      this.url = input.url
	      this.credentials = input.credentials
	      if (!options.headers) {
	        this.headers = new Headers(input.headers)
	      }
	      this.method = input.method
	      this.mode = input.mode
	      if (!body) {
	        body = input._bodyInit
	        input.bodyUsed = true
	      }
	    } else {
	      this.url = input
	    }
	
	    this.credentials = options.credentials || this.credentials || 'omit'
	    if (options.headers || !this.headers) {
	      this.headers = new Headers(options.headers)
	    }
	    this.method = normalizeMethod(options.method || this.method || 'GET')
	    this.mode = options.mode || this.mode || null
	    this.referrer = null
	
	    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
	      throw new TypeError('Body not allowed for GET or HEAD requests')
	    }
	    this._initBody(body)
	  }
	
	  Request.prototype.clone = function() {
	    return new Request(this)
	  }
	
	  function decode(body) {
	    var form = new FormData()
	    body.trim().split('&').forEach(function(bytes) {
	      if (bytes) {
	        var split = bytes.split('=')
	        var name = split.shift().replace(/\+/g, ' ')
	        var value = split.join('=').replace(/\+/g, ' ')
	        form.append(decodeURIComponent(name), decodeURIComponent(value))
	      }
	    })
	    return form
	  }
	
	  function headers(xhr) {
	    var head = new Headers()
	    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
	    pairs.forEach(function(header) {
	      var split = header.trim().split(':')
	      var key = split.shift().trim()
	      var value = split.join(':').trim()
	      head.append(key, value)
	    })
	    return head
	  }
	
	  Body.call(Request.prototype)
	
	  function Response(bodyInit, options) {
	    if (!options) {
	      options = {}
	    }
	
	    this.type = 'default'
	    this.status = options.status
	    this.ok = this.status >= 200 && this.status < 300
	    this.statusText = options.statusText
	    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
	    this.url = options.url || ''
	    this._initBody(bodyInit)
	  }
	
	  Body.call(Response.prototype)
	
	  Response.prototype.clone = function() {
	    return new Response(this._bodyInit, {
	      status: this.status,
	      statusText: this.statusText,
	      headers: new Headers(this.headers),
	      url: this.url
	    })
	  }
	
	  Response.error = function() {
	    var response = new Response(null, {status: 0, statusText: ''})
	    response.type = 'error'
	    return response
	  }
	
	  var redirectStatuses = [301, 302, 303, 307, 308]
	
	  Response.redirect = function(url, status) {
	    if (redirectStatuses.indexOf(status) === -1) {
	      throw new RangeError('Invalid status code')
	    }
	
	    return new Response(null, {status: status, headers: {location: url}})
	  }
	
	  self.Headers = Headers
	  self.Request = Request
	  self.Response = Response
	
	  self.fetch = function(input, init) {
	    return new Promise(function(resolve, reject) {
	      var request
	      if (Request.prototype.isPrototypeOf(input) && !init) {
	        request = input
	      } else {
	        request = new Request(input, init)
	      }
	
	      var xhr = new XMLHttpRequest()
	
	      function responseURL() {
	        if ('responseURL' in xhr) {
	          return xhr.responseURL
	        }
	
	        // Avoid security warnings on getResponseHeader when not allowed by CORS
	        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
	          return xhr.getResponseHeader('X-Request-URL')
	        }
	
	        return
	      }
	
	      xhr.onload = function() {
	        var options = {
	          status: xhr.status,
	          statusText: xhr.statusText,
	          headers: headers(xhr),
	          url: responseURL()
	        }
	        var body = 'response' in xhr ? xhr.response : xhr.responseText
	        resolve(new Response(body, options))
	      }
	
	      xhr.onerror = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.ontimeout = function() {
	        reject(new TypeError('Network request failed'))
	      }
	
	      xhr.open(request.method, request.url, true)
	
	      if (request.credentials === 'include') {
	        xhr.withCredentials = true
	      }
	
	      if ('responseType' in xhr && support.blob) {
	        xhr.responseType = 'blob'
	      }
	
	      request.headers.forEach(function(value, name) {
	        xhr.setRequestHeader(name, value)
	      })
	
	      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
	    })
	  }
	  self.fetch.polyfill = true
	})(typeof self !== 'undefined' ? self : this);


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _crud = __webpack_require__(3);
	
	var crud = _interopRequireWildcard(_crud);
	
	var _init = __webpack_require__(5);
	
	var _init2 = _interopRequireDefault(_init);
	
	var _utils = __webpack_require__(4);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  init: _init2.default,
	  // create(doctype, attributes) add a document to the database
	  create: function create(doctype, attributes, optCallback) {
	    return (0, _utils.promiser)(crud.create(doctype, attributes), optCallback);
	  },
	  // find(doctype, id) retrieve a document by its doctype & ID.
	  find: function find(doctype, id, optCallback) {
	    return (0, _utils.promiser)(crud.find(doctype, id), optCallback);
	  },
	  update: function update(doctype, doc, changes, optCallback) {
	    return (0, _utils.promiser)(crud.update(doctype, doc, changes), optCallback);
	  },
	  delete: function _delete(doctype, doc, optCallback) {
	    return (0, _utils.promiser)(crud._delete(doctype, doc), optCallback);
	  },
	  // updateAttributes(doctype, {_id, _rev}, changes) performs a patch.
	  updateAttribute: crud.updateAttributes,
	  // destroy(doctype, {_id, _rev}) removes a document from the database
	  destroy: crud.destroy
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports._delete = exports.update = exports.find = exports.create = undefined;
	
	var create = exports.create = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(doctype, attributes) {
	    var config, path, response;
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            _context.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context.sent;
	            path = createPath(config, doctype);
	            _context.next = 6;
	            return doFetch(config, 'POST', path, attributes);
	
	          case 6:
	            response = _context.sent;
	
	            if (!config.isV1) {
	              _context.next = 11;
	              break;
	            }
	
	            _context.next = 10;
	            return find(doctype, response._id);
	
	          case 10:
	            return _context.abrupt('return', _context.sent);
	
	          case 11:
	            return _context.abrupt('return', response.data);
	
	          case 12:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function create(_x3, _x4) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var find = exports.find = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(doctype, id) {
	    var config, path, response;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context2.sent;
	
	            if (id) {
	              _context2.next = 5;
	              break;
	            }
	
	            throw new Error('Missing id parameter');
	
	          case 5:
	            path = createPath(config, doctype, id);
	            _context2.next = 8;
	            return doFetch(config, 'GET', path);
	
	          case 8:
	            response = _context2.sent;
	
	
	            if (config.isV1) Object.assign(response, { _rev: NOREV });
	
	            return _context2.abrupt('return', response);
	
	          case 11:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function find(_x5, _x6) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var update = exports.update = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(doctype, doc, changes) {
	    var config, _id, _rev, path, response;
	
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context3.sent;
	            _id = doc._id, _rev = doc._rev;
	
	            if (_id) {
	              _context3.next = 6;
	              break;
	            }
	
	            throw new Error('Missing _id field in passed document');
	
	          case 6:
	            if (!(!config.isV1 && !_rev)) {
	              _context3.next = 8;
	              break;
	            }
	
	            throw new Error('Missing _rev field in passed document');
	
	          case 8:
	
	            if (config.isV1) {
	              changes = Object.assign({ _id: _id }, changes);
	            } else {
	              changes = Object.assign({ _id: _id, _rev: _rev }, changes);
	            }
	
	            path = createPath(config, doctype, _id);
	            _context3.next = 12;
	            return doFetch(config, 'PUT', path, changes);
	
	          case 12:
	            response = _context3.sent;
	
	            if (!config.isV1) {
	              _context3.next = 17;
	              break;
	            }
	
	            _context3.next = 16;
	            return find(doctype, _id);
	
	          case 16:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 17:
	            return _context3.abrupt('return', response.data);
	
	          case 18:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function update(_x7, _x8, _x9) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	var _delete = exports._delete = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(doctype, doc) {
	    var config, _id, _rev, query, path, response;
	
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            _context4.next = 2;
	            return (0, _utils.waitConfig)();
	
	          case 2:
	            config = _context4.sent;
	            _id = doc._id, _rev = doc._rev;
	
	            if (_id) {
	              _context4.next = 6;
	              break;
	            }
	
	            throw new Error('Missing _id field in passed document');
	
	          case 6:
	            if (!(!config.isV1 && !_rev)) {
	              _context4.next = 8;
	              break;
	            }
	
	            throw new Error('Missing _rev field in passed document');
	
	          case 8:
	            query = config.isV1 ? null : { rev: _rev };
	            path = createPath(config, doctype, _id, query);
	            _context4.next = 12;
	            return doFetch(config, 'DELETE', path);
	
	          case 12:
	            response = _context4.sent;
	
	
	            if (config.isV1) Object.assign(response, { id: _id, rev: NOREV });
	
	            return _context4.abrupt('return', response);
	
	          case 15:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function _delete(_x10, _x11) {
	    return _ref4.apply(this, arguments);
	  };
	}();
	
	exports.updateAttributes = updateAttributes;
	exports.destroy = destroy;
	
	var _utils = __webpack_require__(4);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global fetch, btoa */
	
	var NOREV = 'stack-v1-no-rev';
	
	function doFetch(config, method, path, body) {
	  var options = { method: method, headers: {} };
	  if (body !== undefined) {
	    options.headers['Content-Type'] = 'application/json';
	    options.body = JSON.stringify(body);
	  }
	  if (config.auth) {
	    var auth = config.auth.appName + ':' + config.auth.token;
	    options.headers['Authorization'] = 'Basic ' + btoa(auth);
	  }
	
	  var target = config.target || '';
	  var pathprefix = config.isV1 ? '/ds-api' : '';
	  var fullpath = target + pathprefix + path;
	  return fetch(fullpath, options).then(function (res) {
	    var json = res.json();
	    if (!res.ok) {
	      return json.then(function (err) {
	        throw err;
	      });
	    } else {
	      return json;
	    }
	  });
	}
	
	function createPath(config, doctype) {
	  var id = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
	  var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
	
	  var route = '/data/';
	  if (!config.isV1) {
	    route += encodeURIComponent(doctype) + '/';
	  }
	  if (id !== '') {
	    route += encodeURIComponent(id);
	  }
	  if (query) {
	    var q = [];
	    for (var qname in query) {
	      q.push(encodeURIComponent(qname) + '=' + encodeURIComponent(query[qname]));
	    }
	    route += '?' + q.join('&');
	  }
	  return route;
	}
	
	function updateAttributes(doctype, doc) {
	  throw new Error('not implemented');
	}
	
	function destroy(doctype, doc) {
	  throw new Error('not implemented');
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var waitConfig = exports.waitConfig = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opts) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', config);
	
	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function waitConfig(_x) {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	exports.configure = configure;
	exports.promiser = promiser;
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
	
	var config = exports.config = {};
	
	function configure(opts) {
	  exports.config = config = opts;
	}
	
	function promiser(promise, optCallback) {
	  if (!optCallback || typeof optCallback !== 'function') {
	    return promise;
	  }
	  promise.then(function (result) {
	    optCallback(null, result);
	  }, function (err) {
	    optCallback(err, null);
	  });
	  return null;
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var getV2Token = function () {
	  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt('return', { appName: 'noauth', token: 'irrelevant' });
	
	          case 1:
	          case 'end':
	            return _context.stop();
	        }
	      }
	    }, _callee, this);
	  }));
	
	  return function getV2Token() {
	    return _ref.apply(this, arguments);
	  };
	}();
	
	var isV1 = function () {
	  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(opts) {
	    var response, status;
	    return regeneratorRuntime.wrap(function _callee2$(_context2) {
	      while (1) {
	        switch (_context2.prev = _context2.next) {
	          case 0:
	            _context2.next = 2;
	            return fetch((opts.target || '') + '/status/');
	
	          case 2:
	            response = _context2.sent;
	            _context2.next = 5;
	            return response.json();
	
	          case 5:
	            status = _context2.sent;
	            return _context2.abrupt('return', status.datasystem !== undefined);
	
	          case 7:
	          case 'end':
	            return _context2.stop();
	        }
	      }
	    }, _callee2, this);
	  }));
	
	  return function isV1(_x) {
	    return _ref2.apply(this, arguments);
	  };
	}();
	
	var getAuth = function () {
	  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(opts) {
	    return regeneratorRuntime.wrap(function _callee3$(_context3) {
	      while (1) {
	        switch (_context3.prev = _context3.next) {
	          case 0:
	            _context3.t0 = opts.isV1;
	
	            if (_context3.t0) {
	              _context3.next = 5;
	              break;
	            }
	
	            _context3.next = 4;
	            return isV1(opts);
	
	          case 4:
	            _context3.t0 = _context3.sent;
	
	          case 5:
	            opts.isV1 = _context3.t0;
	
	            if (!opts.isV1) {
	              _context3.next = 10;
	              break;
	            }
	
	            _context3.next = 9;
	            return getV1Token(opts);
	
	          case 9:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 10:
	            _context3.next = 12;
	            return getV2Token(opts);
	
	          case 12:
	            return _context3.abrupt('return', _context3.sent);
	
	          case 13:
	          case 'end':
	            return _context3.stop();
	        }
	      }
	    }, _callee3, this);
	  }));
	
	  return function getAuth(_x2) {
	    return _ref3.apply(this, arguments);
	  };
	}();
	
	var _utils = __webpack_require__(4);
	
	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /* global fetch */
	
	
	var V1TOKEN_ABORT_TIMEOUT = 3000;
	
	function getV1Token() {
	  return new Promise(function (resolve, reject) {
	    if (typeof window === 'undefined') {
	      reject(new Error('getV1Token should be used in browser'));
	    } else if (!window.parent) {
	      reject(new Error('getV1Token should be used in iframe'));
	    } else if (!window.parent.postMessage) {
	      reject(new Error('getV1Token should be used in modern browser'));
	    } else {
	      (function () {
	        var origin = window.origin;
	        var intent = { action: 'getToken' };
	        var timeout = null;
	        var receiver = function receiver(event) {
	          window.removeEventListener('message', receiver);
	          clearTimeout(timeout);
	          resolve({
	            appName: event.data.appName,
	            token: event.data.token
	          });
	        };
	        window.addEventListener('message', receiver, false);
	        window.parent.postMessage(intent, origin);
	        timeout = setTimeout(function () {
	          reject(new Error('No response from parent iframe after 3s'));
	        }, V1TOKEN_ABORT_TIMEOUT);
	      })();
	    }
	  });
	}
	
	exports.default = function () {
	  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(opts) {
	    return regeneratorRuntime.wrap(function _callee4$(_context4) {
	      while (1) {
	        switch (_context4.prev = _context4.next) {
	          case 0:
	            opts = opts || {};
	            _context4.t0 = opts.auth;
	
	            if (_context4.t0) {
	              _context4.next = 6;
	              break;
	            }
	
	            _context4.next = 5;
	            return getAuth(opts);
	
	          case 5:
	            _context4.t0 = _context4.sent;
	
	          case 6:
	            opts.auth = _context4.t0;
	            return _context4.abrupt('return', (0, _utils.configure)(opts));
	
	          case 8:
	          case 'end':
	            return _context4.stop();
	        }
	      }
	    }, _callee4, this);
	  }));
	
	  return function (_x3) {
	    return _ref4.apply(this, arguments);
	  };
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=cozy-api.js.map