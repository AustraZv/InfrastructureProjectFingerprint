(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["hulk"] = factory();
	else
		root["hulk"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 26);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, context, definition) {
  if ( true && module.exports) module.exports = definition();
  else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else {}
})('urljoin', this, function () {

  function normalize (strArray) {
    var resultArray = [];
    if (strArray.length === 0) { return ''; }

    if (typeof strArray[0] !== 'string') {
      throw new TypeError('Url must be a string. Received ' + strArray[0]);
    }

    // If the first part is a plain protocol, we combine it with the next part.
    if (strArray[0].match(/^[^/:]+:\/*$/) && strArray.length > 1) {
      var first = strArray.shift();
      strArray[0] = first + strArray[0];
    }

    // There must be two or three slashes in the file protocol, two slashes in anything else.
    if (strArray[0].match(/^file:\/\/\//)) {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1:///');
    } else {
      strArray[0] = strArray[0].replace(/^([^/:]+):\/*/, '$1://');
    }

    for (var i = 0; i < strArray.length; i++) {
      var component = strArray[i];

      if (typeof component !== 'string') {
        throw new TypeError('Url must be a string. Received ' + component);
      }

      if (component === '') { continue; }

      if (i > 0) {
        // Removing the starting slashes for each component but the first.
        component = component.replace(/^[\/]+/, '');
      }
      if (i < strArray.length - 1) {
        // Removing the ending slashes for each component but the last.
        component = component.replace(/[\/]+$/, '');
      } else {
        // For the last component we will combine multiple slashes to a single one.
        component = component.replace(/[\/]+$/, '/');
      }

      resultArray.push(component);

    }

    var str = resultArray.join('/');
    // Each input component is now separated by a single slash except the possible first plain protocol part.

    // remove trailing slash before parameters or hash
    str = str.replace(/\/(\?|&|#[^!])/g, '$1');

    // replace ? in parameters with &
    var parts = str.split('?');
    str = parts.shift() + (parts.length > 0 ? '?': '') + parts.join('&');

    return str;
  }

  return function () {
    var input;

    if (typeof arguments[0] === 'object') {
      input = arguments[0];
    } else {
      input = [].slice.call(arguments);
    }

    return normalize(input);
  };

});


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fRetry = exports.FetchError = void 0;
// @ts-ignore
var p_retry_1 = __importDefault(__webpack_require__(13));
var debounce_promise_1 = __importDefault(__webpack_require__(17));
var clientSubscriptionErrors_1 = __webpack_require__(5);
var FetchError = /** @class */ (function (_super) {
    __extends(FetchError, _super);
    function FetchError(message, url, method, requestBody, responseStatus) {
        var _this = _super.call(this, message) || this;
        // Check https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // to understand the need to set the prototype for PushSubscriptionError Class
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, FetchError.prototype);
        }
        else {
            /// @ts-ignore
            _this.__proto__ = FetchError.prototype;
        }
        _this.url = url;
        _this.method = method;
        _this.requestBody = requestBody;
        _this.responseStatus = responseStatus;
        return _this;
    }
    return FetchError;
}(Error));
exports.FetchError = FetchError;
var getContentTypeHeader = function (headers) {
    for (var _i = 0, _a = Object.keys(headers); _i < _a.length; _i++) {
        var header = _a[_i];
        if (header.toLowerCase() === 'content-type') {
            /// @ts-ignore
            return headers[header];
        }
    }
    return null;
};
var fRetry = function (retryOptions) {
    return function (input, init, withClientError, responseValidator) {
        if (withClientError === void 0) { withClientError = true; }
        return __awaiter(void 0, void 0, void 0, function () {
            var debounceTrackClientErrors, run;
            return __generator(this, function (_a) {
                debounceTrackClientErrors = (0, debounce_promise_1.default)(clientSubscriptionErrors_1.trackClientErrors, 500);
                run = function (numberOfAttempts) { return __awaiter(void 0, void 0, void 0, function () {
                    var contentType, requestBody, url, method, body, _a, _b, _c, _d, response, isResponseInvalid, _e, message, error_1;
                    var _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                if (init && init.method && init.method.toUpperCase() !== 'GET' && init.headers && typeof init.body === 'string') {
                                    contentType = getContentTypeHeader(init.headers);
                                    if (contentType && contentType.toLowerCase() === 'application/json') {
                                        requestBody = JSON.parse(init.body);
                                        if (typeof requestBody === 'object') {
                                            init.body = JSON.stringify(__assign({ __numberOfAttempts: numberOfAttempts }, requestBody));
                                        }
                                    }
                                }
                                url = typeof input === 'string' ? input : input.url;
                                method = (init && init.method) || (typeof input !== 'string' && input.method) || 'get';
                                _b = (_a = JSON).parse;
                                _c = (init && init.body);
                                if (_c) return [3 /*break*/, 3];
                                _d = typeof input !== 'string';
                                if (!_d) return [3 /*break*/, 2];
                                return [4 /*yield*/, input.clone().text()];
                            case 1:
                                _d = (_g.sent());
                                _g.label = 2;
                            case 2:
                                _c = (_d);
                                _g.label = 3;
                            case 3:
                                body = _b.apply(_a, [(_c).toString()]) ||
                                    undefined;
                                _g.label = 4;
                            case 4:
                                _g.trys.push([4, 8, 9, 10]);
                                return [4 /*yield*/, fetch(input, __assign(__assign({}, init), { credentials: (init === null || init === void 0 ? void 0 : init.credentials) || 'omit' }))];
                            case 5:
                                response = _g.sent();
                                _e = responseValidator;
                                if (!_e) return [3 /*break*/, 7];
                                return [4 /*yield*/, responseValidator(response)];
                            case 6:
                                _e = !(_g.sent());
                                _g.label = 7;
                            case 7:
                                isResponseInvalid = _e;
                                if (!response.ok || isResponseInvalid) {
                                    message = isResponseInvalid ? 'Failed response validation' : response.statusText;
                                    throw new FetchError(message, url, method, body, response.status);
                                }
                                return [2 /*return*/, response];
                            case 8:
                                error_1 = _g.sent();
                                if (error_1 instanceof FetchError) {
                                    throw error_1;
                                }
                                throw new FetchError(error_1.message || 'Unexpected fetch error', url, method, body);
                            case 9:
                                if (withClientError) {
                                    // @ts-ignore
                                    // eslint-disable-next-line @typescript-eslint/no-floating-promises
                                    debounceTrackClientErrors((_f = init === null || init === void 0 ? void 0 : init.headers) === null || _f === void 0 ? void 0 : _f.Authorization);
                                }
                                return [7 /*endfinally*/];
                            case 10: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/, (0, p_retry_1.default)(run, retryOptions)];
            });
        });
    };
};
exports.fRetry = fRetry;
var fetchWithRetry = (0, exports.fRetry)({ retries: 5 });
exports.default = fetchWithRetry;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var SimpleStorage = /** @class */ (function () {
    function SimpleStorage(name, storageMechanism) {
        if (storageMechanism === void 0) { storageMechanism = localStorage; }
        this.name = name;
        this.storage = storageMechanism;
    }
    SimpleStorage.prototype.get = function () {
        try {
            var rawData = this.storage.getItem(this.name);
            if (rawData !== null) {
                return JSON.parse(rawData);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
        return null;
    };
    SimpleStorage.prototype.set = function (data) {
        try {
            this.storage.setItem(this.name, JSON.stringify(data));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };
    SimpleStorage.prototype.clear = function () {
        try {
            this.storage.removeItem(this.name);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        }
        catch (error) {
            // eslint-disable-next-line no-console
            console.error(error);
        }
    };
    return SimpleStorage;
}());
exports.default = SimpleStorage;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearStatus = exports.getStatus = exports.setStatus = void 0;
var SimpleStorage_1 = __importDefault(__webpack_require__(2));
var storage = new SimpleStorage_1.default('MOL-FE-WEB-PUSH_SUBSCRIPTION_STATUS');
var setStatus = function (state, metadata) {
    storage.set({ metadata: metadata, state: state });
};
exports.setStatus = setStatus;
var getStatus = function () { return storage.get(); };
exports.getStatus = getStatus;
var clearStatus = function () { return storage.clear(); };
exports.clearStatus = clearStatus;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackClientErrors = exports.clear = exports.addError = exports.getErrors = exports.setBaseEndpoint = void 0;
var serialize_error_1 = __webpack_require__(8);
var url_join_1 = __importDefault(__webpack_require__(0));
var SimpleStorage_1 = __importDefault(__webpack_require__(2));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var storageKey = 'MOL-FE-WEB-PUSH_CLIENT_SUBSCRIPTION_ERRORS';
var sessionStore = new SimpleStorage_1.default(storageKey, sessionStorage);
var baseEndpoint;
var setBaseEndpoint = function (endpoint) { return (baseEndpoint = endpoint); };
exports.setBaseEndpoint = setBaseEndpoint;
var getErrors = function () { return sessionStore.get(); };
exports.getErrors = getErrors;
var addError = function (err) {
    var error = (0, serialize_error_1.serializeError)(err);
    var session = (0, exports.getErrors)();
    // a bit crude and not 100% efficient
    var isDuplicate = session === null || session === void 0 ? void 0 : session.find(function (storedError) { return JSON.stringify(storedError) === JSON.stringify(error); });
    if (!isDuplicate) {
        sessionStore.set(__spreadArray(__spreadArray([], (session || []), true), [error], false));
    }
};
exports.addError = addError;
var clear = function () { return sessionStore.clear(); };
exports.clear = clear;
var trackClientErrors = function (authorizationHeader) { return __awaiter(void 0, void 0, void 0, function () {
    var errors, trackEndpoint, requestInit, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                errors = (0, exports.getErrors)();
                if (!errors || errors.length === 0) {
                    return [2 /*return*/];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                trackEndpoint = (0, url_join_1.default)(baseEndpoint, 'analytics/client/error');
                requestInit = {
                    body: JSON.stringify({ errors: errors }),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'post'
                };
                if (authorizationHeader) {
                    requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: authorizationHeader });
                }
                return [4 /*yield*/, (0, fetchWithRetry_1.default)(trackEndpoint, requestInit, false)];
            case 2:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                (0, exports.clear)();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                // noop for now we do not care if it fails
                // eslint-disable-next-line no-console
                console.error('Track Client Errors', error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.trackClientErrors = trackClientErrors;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceSubscription = exports.updatePushSubscription = exports.requestPushNotificationPermission = exports.subscribePushNotifications = exports.registerPushSubscription = exports.willExpireSoon = exports.needsMigration = exports.isWebPushSupported = void 0;
var showPrompt_1 = __webpack_require__(11);
var equalUint8Array_1 = __importDefault(__webpack_require__(19));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var PushSubscriptionError_1 = __importDefault(__webpack_require__(9));
var isWebPushSupported = function () { return 'serviceWorker' in navigator && 'PushManager' in window; };
exports.isWebPushSupported = isWebPushSupported;
var msPerWeek = 7 * 24 * 60 * 60 * 1000;
var needsMigration = function (subscription, appServerKey) {
    return (subscription.options.applicationServerKey instanceof ArrayBuffer &&
        !(0, equalUint8Array_1.default)(appServerKey, new Uint8Array(subscription.options.applicationServerKey, 0)));
};
exports.needsMigration = needsMigration;
var willExpireSoon = function (subscription) {
    // @ts-ignore
    return !!subscription.expirationTime && subscription.expirationTime < Date.now() + msPerWeek;
};
exports.willExpireSoon = willExpireSoon;
var isValidPushSubscription = function (subscription) {
    var auth;
    var p256dh;
    try {
        auth = subscription.getKey('auth');
        p256dh = subscription.getKey('p256dh');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        // eslint-disable-next-line no-console
        console.error("Unable to get auth and p256dh keys, subscription ".concat(JSON.stringify(subscription, null, 2)));
        return false;
    }
    return auth !== null && p256dh !== null;
};
var registerPushSubscription = function (subscriptionEndpoint, _a, apiKey) {
    var subscription = _a.subscription, metadata = _a.metadata;
    return __awaiter(void 0, void 0, void 0, function () {
        var body, requestInit;
        return __generator(this, function (_b) {
            if (isValidPushSubscription(subscription)) {
                body = {
                    metadata: __assign(__assign({}, metadata), { browserLanguage: navigator.language, firedPromptEventActions: showPrompt_1.firedPromptEventActions, subscribedUrl: location.href }),
                    subscription: subscription
                };
                requestInit = {
                    body: JSON.stringify(body),
                    headers: {
                        'Content-type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors'
                };
                if (apiKey) {
                    requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey ".concat(apiKey) });
                }
                return [2 /*return*/, (0, fetchWithRetry_1.default)(subscriptionEndpoint, requestInit)];
            }
            return [2 /*return*/, undefined];
        });
    });
};
exports.registerPushSubscription = registerPushSubscription;
var subscribePushNotifications = function (_a) {
    var apiKey = _a.apiKey, appServerKey = _a.appServerKey, metadata = _a.metadata, subscriptionEndpoint = _a.subscriptionEndpoint, registration = _a.registration;
    return __awaiter(void 0, void 0, void 0, function () {
        var subscription, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, registration.pushManager.subscribe({
                            applicationServerKey: appServerKey,
                            userVisibleOnly: true
                        })];
                case 1:
                    subscription = _b.sent();
                    return [4 /*yield*/, (0, exports.registerPushSubscription)(subscriptionEndpoint, { metadata: metadata, subscription: subscription }, apiKey)];
                case 2:
                    _b.sent();
                    return [2 /*return*/, subscription];
                case 3:
                    error_1 = _b.sent();
                    throw new PushSubscriptionError_1.default(error_1.message, 'register', error_1);
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.subscribePushNotifications = subscribePushNotifications;
var requestPushNotificationPermission = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var response = Notification.requestPermission(function (result) {
                    resolve(result);
                });
                if (response instanceof Promise) {
                    response.then(resolve, reject);
                }
            })];
    });
}); };
exports.requestPushNotificationPermission = requestPushNotificationPermission;
var updatePushSubscription = function (subscriptionEndpoint, _a, apiKey) {
    var subscription = _a.subscription, metadata = _a.metadata;
    return __awaiter(void 0, void 0, void 0, function () {
        var body, requestInit, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    body = {
                        metadata: __assign(__assign({}, metadata), { browserLanguage: navigator.language, subscribedUrl: location.href }),
                        subscription: subscription
                    };
                    requestInit = {
                        body: JSON.stringify(body),
                        headers: {
                            'Content-type': 'application/json'
                        },
                        method: 'PATCH',
                        mode: 'cors'
                    };
                    if (apiKey) {
                        requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey ".concat(apiKey) });
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, fetchWithRetry_1.default)(subscriptionEndpoint, requestInit)];
                case 2:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_2 = _b.sent();
                    throw new PushSubscriptionError_1.default(error_2.message, 'update', error_2);
                case 4: return [2 /*return*/];
            }
        });
    });
};
exports.updatePushSubscription = updatePushSubscription;
var replaceSubscription = function (_a) {
    var apiKey = _a.apiKey, appServerKey = _a.appServerKey, metadata = _a.metadata, registration = _a.registration, subscription = _a.subscription, subscriptionEndpoint = _a.subscriptionEndpoint;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, subscription.unsubscribe()];
                case 1:
                    _b.sent();
                    return [2 /*return*/, (0, exports.subscribePushNotifications)({
                            apiKey: apiKey,
                            appServerKey: appServerKey,
                            metadata: metadata,
                            registration: registration,
                            subscriptionEndpoint: subscriptionEndpoint
                        })];
            }
        });
    });
};
exports.replaceSubscription = replaceSubscription;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var trackEvent_1 = __importDefault(__webpack_require__(18));
var safeTrackEvent = function (baseEndpoint, event, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, trackEvent_1.default)(baseEndpoint, event, apiKey)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                // eslint-disable-next-line no-console
                console.error('TrackEvent Error', error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = safeTrackEvent;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class NonError extends Error {
	constructor(message) {
		super(NonError._prepareSuperMessage(message));
		Object.defineProperty(this, 'name', {
			value: 'NonError',
			configurable: true,
			writable: true
		});

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NonError);
		}
	}

	static _prepareSuperMessage(message) {
		try {
			return JSON.stringify(message);
		} catch (_) {
			return String(message);
		}
	}
}

const commonProperties = [
	{property: 'name', enumerable: false},
	{property: 'message', enumerable: false},
	{property: 'stack', enumerable: false},
	{property: 'code', enumerable: true}
];

const destroyCircular = ({from, seen, to_, forceEnumerable}) => {
	const to = to_ || (Array.isArray(from) ? [] : {});

	seen.push(from);

	for (const [key, value] of Object.entries(from)) {
		if (typeof value === 'function') {
			continue;
		}

		if (!value || typeof value !== 'object') {
			to[key] = value;
			continue;
		}

		if (!seen.includes(from[key])) {
			to[key] = destroyCircular({from: from[key], seen: seen.slice(), forceEnumerable});
			continue;
		}

		to[key] = '[Circular]';
	}

	for (const {property, enumerable} of commonProperties) {
		if (typeof from[property] === 'string') {
			Object.defineProperty(to, property, {
				value: from[property],
				enumerable: forceEnumerable ? true : enumerable,
				configurable: true,
				writable: true
			});
		}
	}

	return to;
};

const serializeError = value => {
	if (typeof value === 'object' && value !== null) {
		return destroyCircular({from: value, seen: [], forceEnumerable: true});
	}

	// People sometimes throw things besides Error objects…
	if (typeof value === 'function') {
		// `JSON.stringify()` discards functions. We do too, unless a function is thrown directly.
		return `[Function: ${(value.name || 'anonymous')}]`;
	}

	return value;
};

const deserializeError = value => {
	if (value instanceof Error) {
		return value;
	}

	if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
		const newError = new Error();
		destroyCircular({from: value, seen: [], to_: newError});
		return newError;
	}

	return new NonError(value);
};

module.exports = {
	serializeError,
	deserializeError
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PushSubscriptionError = /** @class */ (function (_super) {
    __extends(PushSubscriptionError, _super);
    function PushSubscriptionError(message, type, cause) {
        var _this = _super.call(this, message) || this;
        // Check https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
        // to understand the need to set the prototype for PushSubscriptionError Class
        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(_this, PushSubscriptionError.prototype);
        }
        else {
            /// @ts-ignore
            _this.__proto__ = PushSubscriptionError.prototype;
        }
        _this.type = type;
        _this.cause = cause;
        return _this;
    }
    return PushSubscriptionError;
}(Error));
exports.default = PushSubscriptionError;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRegisterError = void 0;
var serialize_error_1 = __webpack_require__(8);
var clientSubscriptionErrors_1 = __webpack_require__(5);
var handleRegisterError = function (error, _a) {
    var emit = _a.emit, metadata = _a.metadata, rawAppServerKey = _a.rawAppServerKey;
    var enhancedSerializedError = __assign(__assign({}, (0, serialize_error_1.serializeError)(error)), { organisation: metadata === null || metadata === void 0 ? void 0 : metadata.organisation, rawAppServerKey: rawAppServerKey, userAgent: navigator.userAgent });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (true) {
        (0, clientSubscriptionErrors_1.addError)(enhancedSerializedError);
    }
    emit('error', enhancedSerializedError);
};
exports.handleRegisterError = handleRegisterError;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firedPromptEventActions = exports.LAST_PROMPT_EPOCH = void 0;
var ms_1 = __importDefault(__webpack_require__(3));
var pushSubscription_1 = __webpack_require__(6);
var subscriptionStatus_1 = __webpack_require__(4);
var safeTrackEvent_1 = __importDefault(__webpack_require__(7));
var handleSubscriptionError_1 = __importDefault(__webpack_require__(12));
exports.LAST_PROMPT_EPOCH = 'mol-fe-browser-notifications-last-prompt-epoch';
var canShowPrompt = function (promptFrequency) {
    if (!promptFrequency) {
        return true;
    }
    var frequency = (0, ms_1.default)(promptFrequency);
    if (typeof frequency !== 'number') {
        throw new TypeError('Prompt frequency must be a valid string like `1d` or `1h`');
    }
    if (!('localStorage' in window)) {
        return true;
    }
    var lastShown = JSON.parse(window.localStorage.getItem(exports.LAST_PROMPT_EPOCH) || '0');
    return Date.now() - lastShown >= frequency;
};
exports.firedPromptEventActions = [];
exports.default = (function (registration, options) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, appServerKey, emit, metadata, baseEndpoint, subscriptionEndpoint, promptFrequency, rawAppServerKey, renderPrePrompt, channels, crossOrgUserIds, platform_1, subChannels, userAgent_1, visitorIds, visitorId_1, crossOrgUserId_1, channel_1, subChannel_1, createPromptEvent_1, trackPromptEvent_1, showNativePrompt_1, subscription, msgData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = options.apiKey, appServerKey = options.appServerKey, emit = options.emit, metadata = options.metadata, baseEndpoint = options.baseEndpoint, subscriptionEndpoint = options.subscriptionEndpoint, promptFrequency = options.promptFrequency, rawAppServerKey = options.rawAppServerKey, renderPrePrompt = options.renderPrePrompt;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 12, , 13]);
                channels = metadata.channels, crossOrgUserIds = metadata.crossOrgUserIds, platform_1 = metadata.platform, subChannels = metadata.subChannels, userAgent_1 = metadata.userAgent, visitorIds = metadata.visitorIds;
                visitorId_1 = Array.isArray(visitorIds) ? visitorIds[0] : undefined;
                crossOrgUserId_1 = Array.isArray(crossOrgUserIds) ? crossOrgUserIds[0] : undefined;
                channel_1 = Array.isArray(channels) ? channels[0] : undefined;
                subChannel_1 = Array.isArray(subChannels) ? subChannels[0] : undefined;
                createPromptEvent_1 = function (data) {
                    return __assign({ channel: channel_1, crossOrgUserId: crossOrgUserId_1, organisation: metadata.organisation, platform: platform_1, subChannel: subChannel_1, type: 'prompt', userAgent: userAgent_1, visitorId: visitorId_1 }, data);
                };
                trackPromptEvent_1 = function (data) { return __awaiter(void 0, void 0, void 0, function () {
                    var action, type, promptEvent;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                action = data.action;
                                type = 'prompt';
                                promptEvent = createPromptEvent_1(data);
                                exports.firedPromptEventActions.push(action);
                                emit("".concat(type, "_").concat(action), promptEvent);
                                return [4 /*yield*/, (0, safeTrackEvent_1.default)(baseEndpoint, promptEvent, apiKey)];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                if (!!canShowPrompt(promptFrequency)) return [3 /*break*/, 2];
                emit('prompt_discarded', createPromptEvent_1({
                    // @ts-expect-error - we don't care about discarded action outside of emitting it.
                    action: 'discarded',
                    permission: Notification.permission,
                    type: 'prompt'
                }));
                return [3 /*break*/, 11];
            case 2:
                if (!(Notification.permission === 'default')) return [3 /*break*/, 8];
                showNativePrompt_1 = function () { return __awaiter(void 0, void 0, void 0, function () {
                    var permission, promises;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, trackPromptEvent_1({
                                    action: 'impression',
                                    permission: Notification.permission
                                })];
                            case 1:
                                _a.sent();
                                return [4 /*yield*/, (0, pushSubscription_1.requestPushNotificationPermission)()];
                            case 2:
                                permission = _a.sent();
                                promises = [trackPromptEvent_1({ action: 'click', permission: permission })];
                                if (permission === 'granted') {
                                    promises.push((0, pushSubscription_1.subscribePushNotifications)({
                                        apiKey: apiKey,
                                        appServerKey: appServerKey,
                                        metadata: metadata,
                                        registration: registration,
                                        subscriptionEndpoint: subscriptionEndpoint
                                    }));
                                }
                                return [4 /*yield*/, Promise.all(promises)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                if (!(typeof renderPrePrompt === 'function')) return [3 /*break*/, 5];
                return [4 /*yield*/, trackPromptEvent_1({
                        action: 'pre_prompt_impression',
                        permission: Notification.permission
                    })];
            case 3:
                _a.sent();
                return [4 /*yield*/, new Promise(function (resolve) {
                        renderPrePrompt(function (accepted) { return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, trackPromptEvent_1({
                                            action: 'pre_prompt_click',
                                            permission: accepted ? 'granted' : 'denied'
                                        })];
                                    case 1:
                                        _a.sent();
                                        if (!accepted) return [3 /*break*/, 3];
                                        return [4 /*yield*/, showNativePrompt_1()];
                                    case 2:
                                        _a.sent();
                                        _a.label = 3;
                                    case 3:
                                        resolve(accepted);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            case 4:
                _a.sent();
                return [3 /*break*/, 7];
            case 5: return [4 /*yield*/, showNativePrompt_1()];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                if ('localStorage' in window) {
                    window.localStorage.setItem(exports.LAST_PROMPT_EPOCH, JSON.stringify(Date.now()));
                }
                _a.label = 8;
            case 8:
                if (!(Notification.permission === 'granted')) return [3 /*break*/, 10];
                return [4 /*yield*/, registration.pushManager.getSubscription()];
            case 9:
                subscription = (_a.sent());
                msgData = {
                    subscription: subscription,
                    type: 'web-push-sw-subscription-ready'
                };
                /// @ts-ignore
                registration.active.postMessage(JSON.stringify(msgData));
                (0, subscriptionStatus_1.setStatus)('ready', metadata);
                return [3 /*break*/, 11];
            case 10:
                if (Notification.permission === 'default') {
                    (0, subscriptionStatus_1.setStatus)('undecided', metadata);
                }
                else {
                    (0, subscriptionStatus_1.clearStatus)();
                }
                _a.label = 11;
            case 11: return [3 /*break*/, 13];
            case 12:
                error_1 = _a.sent();
                (0, handleSubscriptionError_1.default)(error_1, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); });


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PushSubscriptionError_1 = __importDefault(__webpack_require__(9));
var subscriptionStatus_1 = __webpack_require__(4);
var handleRegisterError_1 = __webpack_require__(10);
exports.default = (function (error, opts) {
    if (error instanceof PushSubscriptionError_1.default) {
        var metadata = opts.metadata;
        if (error.type === 'register') {
            (0, subscriptionStatus_1.setStatus)('register_pending', metadata);
        }
        else if (error.type === 'update') {
            (0, subscriptionStatus_1.setStatus)('update_pending', metadata);
        }
    }
    (0, handleRegisterError_1.handleRegisterError)(error, opts);
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const retry = __webpack_require__(14);

class AbortError extends Error {
  constructor(message) {
    super();

    if (message instanceof Error) {
      this.originalError = message;
      ({
        message
      } = message);
    } else {
      this.originalError = new Error(message);
      this.originalError.stack = this.stack;
    }

    this.name = 'AbortError';
    this.message = message;
  }

}

const decorateErrorWithCounts = (error, attemptNumber, options) => {
  // Minus 1 from attemptNumber because the first attempt does not count as a retry
  const retriesLeft = options.retries - (attemptNumber - 1);
  error.attemptNumber = attemptNumber;
  error.retriesLeft = retriesLeft;
  return error;
};

const pRetry = (input, options) => new Promise((resolve, reject) => {
  options = {
    onFailedAttempt: () => {},
    retries: 10,
    ...options
  };
  const operation = retry.operation(options);
  operation.attempt(async attemptNumber => {
    try {
      resolve((await input(attemptNumber)));
    } catch (error) {
      if (!(error instanceof Error)) {
        reject(new TypeError(`Non-error was thrown: "${error}". You should only throw errors.`));
        return;
      }

      if (error instanceof AbortError) {
        operation.stop();
        reject(error.originalError);
      } else if (error instanceof TypeError) {
        operation.stop();
        reject(error);
      } else {
        decorateErrorWithCounts(error, attemptNumber, options);

        try {
          await options.onFailedAttempt(error);
        } catch (error) {
          reject(error);
          return;
        }

        if (!operation.retry(error)) {
          reject(operation.mainError());
        }
      }
    }
  });
});

module.exports = pRetry; // TODO: remove this in the next major version

module.exports.default = pRetry;
module.exports.AbortError = AbortError;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var RetryOperation = __webpack_require__(16);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && options.forever,
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * opts.minTimeout * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts;
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(this._errors.length - 1, this._errors.length);
      this._timeouts = this._cachedTimeouts.slice(0);
      timeout = this._timeouts.shift();
    } else {
      return false;
    }
  }

  var self = this;
  var timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global setTimeout, clearTimeout */

module.exports = function debounce(fn) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var lastCallAt = void 0;
  var deferred = void 0;
  var timer = void 0;
  var pendingArgs = [];
  return function debounced() {
    var currentWait = getWait(wait);
    var currentTime = new Date().getTime();

    var isCold = !lastCallAt || currentTime - lastCallAt > currentWait;

    lastCallAt = currentTime;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (isCold && options.leading) {
      return options.accumulate ? Promise.resolve(fn.call(this, [args])).then(function (result) {
        return result[0];
      }) : Promise.resolve(fn.call.apply(fn, [this].concat(args)));
    }

    if (deferred) {
      clearTimeout(timer);
    } else {
      deferred = defer();
    }

    pendingArgs.push(args);
    timer = setTimeout(flush.bind(this), currentWait);

    if (options.accumulate) {
      var argsIndex = pendingArgs.length - 1;
      return deferred.promise.then(function (results) {
        return results[argsIndex];
      });
    }

    return deferred.promise;
  };

  function flush() {
    var thisDeferred = deferred;
    clearTimeout(timer);

    Promise.resolve(options.accumulate ? fn.call(this, pendingArgs) : fn.apply(this, pendingArgs[pendingArgs.length - 1])).then(thisDeferred.resolve, thisDeferred.reject);

    pendingArgs = [];
    deferred = null;
  }
};

function getWait(wait) {
  return typeof wait === 'function' ? wait() : wait;
}

function defer() {
  var deferred = {};
  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
//# sourceMappingURL=index.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var url_join_1 = __importDefault(__webpack_require__(0));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var trackEvent = function (baseEndpoint, event, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var type, action, trackEndpoint, requestInit;
    return __generator(this, function (_a) {
        type = event.type, action = event.action;
        trackEndpoint = (0, url_join_1.default)(baseEndpoint, 'analytics/track', type, action);
        requestInit = {
            body: JSON.stringify(event),
            headers: {
                'Content-type': 'application/json'
            },
            method: 'post',
            mode: 'cors'
        };
        if (apiKey) {
            requestInit.headers = __assign(__assign({}, requestInit.headers), { Authorization: "ApiKey ".concat(apiKey) });
        }
        return [2 /*return*/, (0, fetchWithRetry_1.default)(trackEndpoint, requestInit)];
    });
}); };
exports.default = trackEvent;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable id-length */
var equalUint8Array = function (a, b) {
    if (a.byteLength !== b.byteLength) {
        return false;
    }
    for (var i = 0; i !== a.byteLength; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
};
exports.default = equalUint8Array;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (environment) {
    switch (environment) {
        case 'production':
            return 'https://hulkprod.anm.co.uk/api/web-push-notification';
        case 'integration':
            return 'https://hulkint.anm.co.uk/api/web-push-notification';
        default:
            return '/public';
    }
});


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);

  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
    desc = {
      enumerable: true,
      get: function () {
        return m[k];
      }
    };
  }

  Object.defineProperty(o, k2, desc);
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __exportStar = this && this.__exportStar || function (m, exports) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

__exportStar(__webpack_require__(37), exports);

__exportStar(__webpack_require__(38), exports);

__exportStar(__webpack_require__(39), exports);

__exportStar(__webpack_require__(40), exports);

__exportStar(__webpack_require__(41), exports);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var waitForDocumentReady = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) {
                /* istanbul ignore else */
                if ((document.readyState === 'interactive' && Boolean(document.body)) || document.readyState === 'complete') {
                    resolve();
                    return;
                }
                document.addEventListener('DOMContentLoaded', function () {
                    resolve();
                });
            })];
    });
}); };
var documentReady = waitForDocumentReady();
exports.default = documentReady;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetIntervalAsyncTimer = void 0;
var MIN_INTERVAL_MS = 10;
var MAX_INTERVAL_MS = 2147483647;
var SetIntervalAsyncTimer = /** @class */ (function () {
    function SetIntervalAsyncTimer() {
        this.timeout = undefined;
        this.promise = undefined;
        this.stopped = false;
    }
    SetIntervalAsyncTimer.startTimer = function (handler, intervalMs) {
        var handlerArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            handlerArgs[_i - 2] = arguments[_i];
        }
        var sanitisedIntervalMs = Math.min(Math.max(Math.trunc(intervalMs), MIN_INTERVAL_MS), MAX_INTERVAL_MS);
        var timer = new SetIntervalAsyncTimer();
        timer.scheduleTimeout.apply(timer, __spreadArray([handler, sanitisedIntervalMs, sanitisedIntervalMs], handlerArgs, false));
        return timer;
    };
    SetIntervalAsyncTimer.stopTimer = function (timer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        timer.stopped = true;
                        if (timer.timeout) {
                            clearTimeout(timer.timeout);
                        }
                        if (!timer.promise) return [3 /*break*/, 2];
                        return [4 /*yield*/, timer.promise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SetIntervalAsyncTimer.prototype.scheduleTimeout = function (handler, intervalMs, delayMs) {
        var _this = this;
        var handlerArgs = [];
        for (var _i = 3; _i < arguments.length; _i++) {
            handlerArgs[_i - 3] = arguments[_i];
        }
        this.timeout = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.timeout = undefined;
                        this.promise = this.runHandlerAndScheduleTimeout.apply(this, __spreadArray([handler, intervalMs], handlerArgs, false));
                        return [4 /*yield*/, this.promise];
                    case 1:
                        _a.sent();
                        this.promise = undefined;
                        return [2 /*return*/];
                }
            });
        }); }, delayMs);
    };
    SetIntervalAsyncTimer.prototype.runHandlerAndScheduleTimeout = function (handler, intervalMs) {
        var handlerArgs = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            handlerArgs[_i - 2] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var _1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, 3, 4]);
                        return [4 /*yield*/, handler.apply(void 0, handlerArgs)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2:
                        _1 = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        if (!this.stopped) {
                            this.scheduleTimeout.apply(this, __spreadArray([handler, intervalMs, intervalMs], handlerArgs, false));
                        }
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return SetIntervalAsyncTimer;
}());
exports.SetIntervalAsyncTimer = SetIntervalAsyncTimer;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldClickRecords = exports.getAll = exports.clear = exports.wasTrackedBefore = exports.markAsTracked = exports.storage = void 0;
var ms_1 = __importDefault(__webpack_require__(3));
var SimpleStorage_1 = __importDefault(__webpack_require__(2));
exports.storage = new SimpleStorage_1.default('MOL-FE-WEB-PULL_NOTIFICATION_CLICKS');
var markAsTracked = function (campaignId, crossOrgUserId) {
    var clickRecords = exports.storage.get() || [];
    return exports.storage.set(__spreadArray(__spreadArray([], clickRecords, true), [
        {
            campaignId: campaignId,
            crossOrgUserId: crossOrgUserId,
            epoch: Date.now()
        }
    ], false));
};
exports.markAsTracked = markAsTracked;
var wasTrackedBefore = function (campaignId, crossOrgUserId) {
    var clickRecords = exports.storage.get() || [];
    return clickRecords.some(function (record) { return record.campaignId === campaignId && record.crossOrgUserId === crossOrgUserId; });
};
exports.wasTrackedBefore = wasTrackedBefore;
var clear = function () {
    return exports.storage.clear();
};
exports.clear = clear;
var getAll = function () {
    return exports.storage.get() || [];
};
exports.getAll = getAll;
var deleteOldClickRecords = function () {
    var clickRecords = exports.storage.get() || [];
    exports.storage.set(clickRecords.filter(function (_a) {
        var epoch = _a.epoch;
        return Date.now() - epoch < (0, ms_1.default)('24h');
    }));
};
exports.deleteOldClickRecords = deleteOldClickRecords;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var getISOStringParts_1 = __webpack_require__(44);
var parseISOString = function (stringDate) {
    var _a = (0, getISOStringParts_1.getISOStringParts)(stringDate).map(function (digit) {
        return parseInt(digit, 10);
    }), year = _a[0], month = _a[1], date = _a[2], hours = _a[3], minutes = _a[4], seconds = _a[5], ms = _a[6];
    return new Date(Date.UTC(year, month - 1, date, hours, minutes, seconds, ms || 0));
};
exports.default = parseISOString;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = void 0;
var url_join_1 = __importDefault(__webpack_require__(0));
var Emitter_1 = __importDefault(__webpack_require__(27));
var fetchApplicationServerKey_1 = __importDefault(__webpack_require__(28));
var init_1 = __importDefault(__webpack_require__(30));
var showPrompt_1 = __importDefault(__webpack_require__(11));
var getBaseEndpoint_1 = __importDefault(__webpack_require__(20));
var pushSubscription_1 = __webpack_require__(6);
var validateRegisterOpts_1 = __importDefault(__webpack_require__(32));
var init_2 = __webpack_require__(33);
var getCrossOrgUserId_1 = __webpack_require__(54);
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register(options) {
        var _this = _super.call(this) || this;
        _this.appServerKey = null;
        _this.registration = null;
        var baseEndpoint = options.environment ? (0, getBaseEndpoint_1.default)(options.environment) : options.baseEndpoint || '';
        _this.options = (0, validateRegisterOpts_1.default)(__assign({}, options));
        _this.baseEndpoint = (0, url_join_1.default)(baseEndpoint, '/v1/organisation', _this.options.metadata.organisation);
        _this.subscriptionEndpoint = (0, url_join_1.default)(_this.baseEndpoint, 'subscription');
        return _this;
    }
    Register.isWebPushSupported = function () {
        return (0, pushSubscription_1.isWebPushSupported)();
    };
    Register.prototype.getAppServerKey = function (force) {
        if (force === void 0) { force = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.appServerKey === null || force)) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, (0, fetchApplicationServerKey_1.default)((0, url_join_1.default)(this.subscriptionEndpoint, 'publicKey'), this.options.apiKey)];
                    case 1:
                        _a.appServerKey = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.appServerKey];
                }
            });
        });
    };
    Register.prototype.getCrossOrgUserId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.crossOrguserId) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, (0, getCrossOrgUserId_1.getCrossOrgUserId)(this.options.metadata, function (name, args) { return _this.emit(name, args); })];
                    case 1:
                        _a.crossOrguserId = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.crossOrguserId];
                }
            });
        });
    };
    Register.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parsed, raw, _b, _c, _d;
            var _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.getAppServerKey()];
                    case 1:
                        _a = (_f.sent()) || {}, parsed = _a.parsed, raw = _a.raw;
                        _b = this;
                        _c = init_1.default;
                        _d = [__assign({}, this.options)];
                        _e = { appServerKey: parsed, baseEndpoint: this.baseEndpoint };
                        return [4 /*yield*/, this.getCrossOrgUserId()];
                    case 2: return [4 /*yield*/, _c.apply(void 0, [__assign.apply(void 0, _d.concat([(_e.crossOrgUserId = _f.sent(), _e.emit = function (name, args) { return _this.emit(name, args); }, _e.rawAppServerKey = raw, _e.subscriptionEndpoint = this.subscriptionEndpoint, _e)]))])];
                    case 3:
                        _b.registration = _f.sent();
                        return [2 /*return*/, this.registration];
                }
            });
        });
    };
    Register.prototype.initPullNotifications = function (_a) {
        var renderPullNotification = _a.renderPullNotification, canRender = _a.canRender;
        return __awaiter(this, void 0, void 0, function () {
            var _b;
            var _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (typeof renderPullNotification !== 'function') {
                            throw new TypeError('Missing required option `renderPullNotification` function');
                        }
                        if (canRender && typeof canRender !== 'function') {
                            throw new TypeError('Optional `canRender` option must be a function');
                        }
                        _b = init_2.init;
                        _c = {
                            apiKey: this.options.apiKey,
                            baseEndpoint: this.baseEndpoint,
                            canRender: canRender
                        };
                        return [4 /*yield*/, this.getCrossOrgUserId()];
                    case 1: return [4 /*yield*/, _b.apply(void 0, [(_c.crossOrgUserId = _d.sent(),
                                _c.emit = function (name, args) { return _this.emit(name, args); },
                                _c.metadata = __assign({ geo: 'ALL' }, this.options.metadata),
                                _c.renderPullNotification = renderPullNotification,
                                _c)])];
                    case 2:
                        _d.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Register.prototype.showPrompt = function (renderPrePrompt) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, parsed, raw;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getAppServerKey()];
                    case 1:
                        _a = (_b.sent()) || {}, parsed = _a.parsed, raw = _a.raw;
                        if (this.registration === null) {
                            throw new Error('Init must be called before attempting to call showPrompt');
                        }
                        return [2 /*return*/, (0, showPrompt_1.default)(this.registration, __assign(__assign({}, this.options), { appServerKey: parsed, baseEndpoint: this.baseEndpoint, emit: function (name, args) { return _this.emit(name, args); }, rawAppServerKey: raw, renderPrePrompt: renderPrePrompt, subscriptionEndpoint: this.subscriptionEndpoint }))];
                }
            });
        });
    };
    return Register;
}(Emitter_1.default));
exports.Register = Register;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @alias module:tiny-emitter
 * @class
 * @description Subset of  node's [Emitter class]{@link https://nodejs.org/api/events.html#events_class_eventemitter}
 * @param logger - Optional logger instance. Must comply to the [Console interface]{@link https://developer.mozilla.org/es/docs/Web/API/Console}.
 */
var Emitter = /** @class */ (function () {
    function Emitter(logger) {
        this.events = {};
        this.logger = logger || console;
    }
    /**a
     * Adds the listener function to the end of the listeners array for the event named eventName.
     *
     * @param eventName - The name of the event.
     * @param listener - Listener fn that handles the evt.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.on = function (eventName, listener) {
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        evtListeners.push(listener);
        return this;
    };
    /**
     * Removes the specified listener from the listener array for the event named eventName.
     *
     * @param eventName - The name of the event.
     * @param listener - Listener fn that handles the evt.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.removeListener = function (eventName, listener) {
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        events[eventName] = evtListeners.filter(function (eListener) { return eListener !== listener; });
        return this;
    };
    /**
     * Removes all listeners, or those of the specified eventName.
     *
     * @param eventName - The name of the event. Optional if ommited all listeners will be removed.
     * @returns - The Emitter instance.
     */
    Emitter.prototype.removeAllListeners = function (eventName) {
        if (eventName) {
            this.events[eventName] = null;
        }
        else {
            this.events = {};
        }
        return this;
    };
    /**
     * Synchronously calls each of the listeners registered for the event named eventName, in the order they were registered,
     * passing the supplied arguments to each.
     *
     * @param eventName - The name of the event.
     * @returns - Returns true if the event had listeners, false otherwise.
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Emitter.prototype.emit = function (eventName) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var events = this.events;
        var evtListeners = events[eventName] || (events[eventName] = []);
        var haveListeners = evtListeners.length > 0;
        var clonedArgs = args;
        // due to unexpected mutations on the event data (rta), we clone the data to prevent errors in ES
        try {
            clonedArgs = JSON.parse(JSON.stringify(args));
        }
        catch (err) {
            // noop
        }
        evtListeners.forEach(function (handler) {
            try {
                handler.apply(void 0, clonedArgs);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                _this.logger.error(error, error.stack);
            }
        });
        return haveListeners;
    };
    return Emitter;
}());
exports.default = Emitter;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var urlBase64ToUint8Array_1 = __importDefault(__webpack_require__(29));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var fetchApplicationServerKey = function (serverKeyEndpoint, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var requestInit, response, vapidPublicKey;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestInit = {
                    mode: 'cors'
                };
                if (apiKey) {
                    requestInit.headers = { Authorization: "ApiKey ".concat(apiKey) };
                }
                return [4 /*yield*/, (0, fetchWithRetry_1.default)(serverKeyEndpoint, requestInit, true, function (res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, res.clone().text()];
                            case 1: return [2 /*return*/, (_a.sent()).trim() !== ''];
                        }
                    }); }); })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                vapidPublicKey = _a.sent();
                return [2 /*return*/, {
                        parsed: (0, urlBase64ToUint8Array_1.default)(vapidPublicKey),
                        raw: vapidPublicKey
                    }];
        }
    });
}); };
exports.default = fetchApplicationServerKey;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-unused-expressions, no-bitwise, id-length */
var hasAtobBeenTampered = function () {
    try {
        // @ts-ignore
        window.atob();
        return true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (error) {
        return false;
    }
};
// Original code from https://gist.github.com/oeon/0ada0457194ebf70ec2428900ba76255
var decode = function (encoded) {
    var b;
    var c;
    var d;
    var char64Number = {};
    var f = 0;
    var g = 0;
    var decoded = '';
    var length = encoded.length;
    for (b = 0; b < 64; b++) {
        char64Number['ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(b)] = b;
    }
    for (c = 0; c < length; c++) {
        for (b = char64Number[encoded.charAt(c)], f = (f << 6) + b, g += 6; g >= 8;) {
            ((d = 255 & (f >>> (g -= 8))) || length - 2 > c) && (decoded += String.fromCharCode(d));
        }
    }
    return decoded;
};
// Note: from https://github.com/web-push-libs/web-push#using-vapid-key-for-applicationserverkey
var urlBase64ToUint8Array = function (base64String) {
    var padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    var base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    var rawData = hasAtobBeenTampered() ? decode(base64) : window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
};
exports.default = urlBase64ToUint8Array;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var documentReady_1 = __importDefault(__webpack_require__(22));
var pushSubscription_1 = __webpack_require__(6);
var subscriptionStatus_1 = __webpack_require__(4);
var handleSubscriptionError_1 = __importDefault(__webpack_require__(12));
var clientSubscriptionErrors_1 = __webpack_require__(5);
var safeTrackEvent_1 = __importDefault(__webpack_require__(7));
var pushNotificationClickStorage_1 = __webpack_require__(31);
var getClickAction = function (_a) {
    var sharedCrossOrgUserId = _a.sharedCrossOrgUserId, crossOrgUserId = _a.crossOrgUserId, campaignId = _a.campaignId, subscriptionId = _a.subscriptionId;
    if (!sharedCrossOrgUserId) {
        return 'click';
    }
    if (crossOrgUserId !== sharedCrossOrgUserId) {
        return 'click_page_share';
    }
    if ((0, pushNotificationClickStorage_1.wasTrackedBefore)(campaignId, subscriptionId)) {
        return 'click_page_refresh';
    }
    return 'click';
};
var pruneMacros = function (macros) {
    var _a;
    if (!macros || typeof macros !== 'object' || Object.keys(macros).length === 0) {
        return undefined;
    }
    var prunedMacros = {
        impression: (_a = macros.impression) === null || _a === void 0 ? void 0 : _a.filter(function (macro) {
            return typeof macro === 'string' || (Array.isArray(macro) && typeof macro[0] === 'string');
        })
    };
    return prunedMacros;
};
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var apiKey, appServerKey, notificationMacros, emit, metadata, baseEndpoint, swUrl, subscriptionEndpoint, rawAppServerKey, crossOrgUserId, visitorId, userAgent, params, ito, subscriptionStatus, crossOrgUserIds, campaignId, campaignRunId, subscriptionId, assetId, sharedCrossOrgUserId, action, notificationClickEvent, error_1, registration, subscription, migrated, msgData, newMeta, newState, newMeta, meta, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                apiKey = options.apiKey, appServerKey = options.appServerKey, notificationMacros = options.notificationMacros, emit = options.emit, metadata = options.metadata, baseEndpoint = options.baseEndpoint, swUrl = options.swUrl, subscriptionEndpoint = options.subscriptionEndpoint, rawAppServerKey = options.rawAppServerKey, crossOrgUserId = options.crossOrgUserId;
                visitorId = Array.isArray(metadata.visitorIds) ? metadata.visitorIds[0] : undefined;
                userAgent = metadata.userAgent;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 20, , 21]);
                return [4 /*yield*/, documentReady_1.default];
            case 2:
                _a.sent();
                (0, pushNotificationClickStorage_1.deleteOldClickRecords)();
                params = new URLSearchParams(window.location.search);
                ito = params.get('ito');
                (0, clientSubscriptionErrors_1.setBaseEndpoint)(baseEndpoint);
                subscriptionStatus = (0, subscriptionStatus_1.getStatus)();
                crossOrgUserIds = crossOrgUserId ? [crossOrgUserId] : undefined;
                metadata.crossOrgUserIds = crossOrgUserIds;
                if (!(ito === 'push-notification')) return [3 /*break*/, 4];
                campaignId = params.get('ci');
                campaignRunId = params.get('cri') || '';
                subscriptionId = params.get('si');
                assetId = params.get('ai');
                sharedCrossOrgUserId = params.get('xi');
                if (!(campaignId && subscriptionId)) return [3 /*break*/, 4];
                action = getClickAction({
                    campaignId: campaignId,
                    crossOrgUserId: crossOrgUserId,
                    sharedCrossOrgUserId: sharedCrossOrgUserId,
                    subscriptionId: subscriptionId
                });
                notificationClickEvent = {
                    action: action,
                    campaignId: campaignId,
                    campaignRunId: campaignRunId,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    platform: metadata.platform,
                    subscriptionId: subscriptionId,
                    type: 'notification',
                    userAgent: userAgent,
                    visitorId: visitorId
                };
                if (assetId) {
                    notificationClickEvent.assetId = assetId;
                }
                emit('notification_click', notificationClickEvent);
                return [4 /*yield*/, (0, safeTrackEvent_1.default)(baseEndpoint, __assign(__assign({}, notificationClickEvent), { action: action === 'click' ? 'click_page_load' : action }), apiKey)];
            case 3:
                _a.sent();
                (0, pushNotificationClickStorage_1.markAsTracked)(campaignId, subscriptionId);
                _a.label = 4;
            case 4:
                if (!swUrl) return [3 /*break*/, 8];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 7, , 8]);
                return [4 /*yield*/, navigator.serviceWorker.register(swUrl, { scope: '/' })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                // eslint-disable-next-line no-console
                console.error('ServiceWorker registration failed: ', error_1);
                return [3 /*break*/, 8];
            case 8: return [4 /*yield*/, navigator.serviceWorker.ready];
            case 9:
                registration = _a.sent();
                return [4 /*yield*/, registration.pushManager.getSubscription()];
            case 10:
                subscription = _a.sent();
                migrated = !!subscription && (0, pushSubscription_1.needsMigration)(subscription, appServerKey);
                subscriptionStatus = (0, subscriptionStatus_1.getStatus)();
                msgData = {
                    apiKey: apiKey,
                    baseEndpoint: baseEndpoint,
                    crossOrgUserId: crossOrgUserId,
                    navigatorPlatform: window.navigator.platform,
                    notificationMacros: pruneMacros(notificationMacros),
                    organisation: metadata.organisation,
                    permission: Notification.permission,
                    subscription: migrated ? null : subscription,
                    type: 'web-push-sw-init-data',
                    userAgent: metadata.userAgent,
                    visitorId: visitorId
                };
                /// @ts-ignore
                registration.active.postMessage(JSON.stringify(msgData));
                if (subscriptionStatus && subscriptionStatus.state === 'undecided' && Notification.permission === 'granted') {
                    (0, subscriptionStatus_1.setStatus)('register_pending', subscriptionStatus.metadata);
                    subscriptionStatus = (0, subscriptionStatus_1.getStatus)();
                }
                if (subscriptionStatus &&
                    subscriptionStatus.state !== 'undecided' &&
                    subscriptionStatus.metadata &&
                    (subscriptionStatus.metadata.userAgent !== metadata.userAgent ||
                        subscriptionStatus.metadata.profilingAllowed !== metadata.profilingAllowed ||
                        (subscriptionStatus.metadata.visitorIds || []).join(',') !== (metadata.visitorIds || []).join(',') ||
                        (subscriptionStatus.metadata.crossOrgUserIds || []).join(',') !== (crossOrgUserIds || []).join(',') ||
                        ito === 'push-notification')) {
                    newMeta = __assign(__assign({}, subscriptionStatus.metadata), { crossOrgUserIds: Array.from(new Set(__spreadArray(__spreadArray([], (subscriptionStatus.metadata.crossOrgUserIds || []), true), (crossOrgUserIds || []), true))), keywords: Array.from(new Set(__spreadArray(__spreadArray([], (subscriptionStatus.metadata.keywords || []), true), (metadata.keywords || []), true))), profilingAllowed: metadata.profilingAllowed, userAgent: metadata.userAgent, visitorIds: Array.from(new Set(__spreadArray(__spreadArray([], (subscriptionStatus.metadata.visitorIds || []), true), (metadata.visitorIds || []), true))) });
                    newState = subscriptionStatus.state === 'ready' ? 'update_pending' : subscriptionStatus.state;
                    (0, subscriptionStatus_1.setStatus)(newState, newMeta);
                    subscriptionStatus = (0, subscriptionStatus_1.getStatus)();
                }
                if (!subscription) return [3 /*break*/, 17];
                newMeta = subscriptionStatus ? subscriptionStatus.metadata : metadata;
                if (!(migrated || (0, pushSubscription_1.willExpireSoon)(subscription))) return [3 /*break*/, 12];
                return [4 /*yield*/, (0, pushSubscription_1.replaceSubscription)({
                        apiKey: apiKey,
                        appServerKey: appServerKey,
                        metadata: __assign(__assign({}, metadata), { migrated: migrated, migratedSubscriptionEndpoint: migrated ? subscription.endpoint : undefined }),
                        registration: registration,
                        subscription: subscription,
                        subscriptionEndpoint: subscriptionEndpoint
                    })];
            case 11:
                _a.sent();
                return [3 /*break*/, 16];
            case 12:
                if (!(subscriptionStatus && subscriptionStatus.state === 'register_pending')) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, pushSubscription_1.registerPushSubscription)(subscriptionEndpoint, { metadata: newMeta, subscription: subscription }, apiKey)];
            case 13:
                _a.sent();
                return [3 /*break*/, 16];
            case 14:
                if (!((subscriptionStatus && subscriptionStatus.state === 'update_pending') || !subscriptionStatus)) return [3 /*break*/, 16];
                return [4 /*yield*/, (0, pushSubscription_1.updatePushSubscription)(subscriptionEndpoint, { metadata: newMeta, subscription: subscription }, apiKey)];
            case 15:
                _a.sent();
                _a.label = 16;
            case 16:
                (0, subscriptionStatus_1.setStatus)('ready', metadata);
                return [3 /*break*/, 19];
            case 17:
                if (!(Notification.permission === 'granted')) return [3 /*break*/, 19];
                meta = subscriptionStatus ? subscriptionStatus.metadata : metadata;
                return [4 /*yield*/, (0, pushSubscription_1.subscribePushNotifications)({
                        apiKey: apiKey,
                        appServerKey: appServerKey,
                        metadata: meta,
                        registration: registration,
                        subscriptionEndpoint: subscriptionEndpoint
                    })];
            case 18:
                _a.sent();
                (0, subscriptionStatus_1.setStatus)('ready', meta);
                _a.label = 19;
            case 19: return [2 /*return*/, registration];
            case 20:
                error_2 = _a.sent();
                (0, handleSubscriptionError_1.default)(error_2, { emit: emit, metadata: metadata, rawAppServerKey: rawAppServerKey });
                return [3 /*break*/, 21];
            case 21: return [2 /*return*/, null];
        }
    });
}); });


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOldClickRecords = exports.getAll = exports.clear = exports.wasTrackedBefore = exports.markAsTracked = exports.storage = void 0;
var ms_1 = __importDefault(__webpack_require__(3));
var SimpleStorage_1 = __importDefault(__webpack_require__(2));
exports.storage = new SimpleStorage_1.default('MOL-FE-WEB-PUSH_NOTIFICATION_CLICKS');
var markAsTracked = function (campaignId, subscriptionId) {
    var clickRecords = exports.storage.get() || [];
    return exports.storage.set(__spreadArray(__spreadArray([], clickRecords, true), [
        {
            campaignId: campaignId,
            epoch: Date.now(),
            subscriptionId: subscriptionId
        }
    ], false));
};
exports.markAsTracked = markAsTracked;
var wasTrackedBefore = function (campaignId, subscriptionId) {
    var clickRecords = exports.storage.get() || [];
    return clickRecords.some(function (record) { return record.campaignId === campaignId && record.subscriptionId === subscriptionId; });
};
exports.wasTrackedBefore = wasTrackedBefore;
var clear = function () {
    return exports.storage.clear();
};
exports.clear = clear;
var getAll = function () {
    return exports.storage.get() || [];
};
exports.getAll = getAll;
var deleteOldClickRecords = function () {
    var clickRecords = exports.storage.get() || [];
    exports.storage.set(clickRecords.filter(function (_a) {
        var epoch = _a.epoch;
        return Date.now() - epoch < (0, ms_1.default)('24h');
    }));
};
exports.deleteOldClickRecords = deleteOldClickRecords;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var isBadString = function (value, maxLength) {
    if (maxLength === void 0) { maxLength = 0; }
    return typeof value !== 'string' || value.length === 0 || (maxLength && maxLength < value.length);
};
var isBadObject = function (value, properties) {
    var type = typeof value;
    if (value !== null && type === 'object') {
        var keys_1 = Object.keys(value);
        var hasProps = properties && properties.map(function (prop) { return keys_1.includes(prop); }).filter(Boolean).length === properties.length;
        return !keys_1.length || !hasProps;
    }
    return true;
};
var isBadBoolean = function (value) { return typeof value !== 'boolean'; };
var isBadStringArray = function (value) {
    return !Array.isArray(value) || (value.length && value.map(isBadString).every(Boolean));
};
var requiredMetadataProps = ['organisation', 'platform', 'profilingAllowed', 'userAgent'];
exports.default = (function (opts) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    // required props
    if (isBadObject(opts.metadata, requiredMetadataProps)) {
        throw new Error("metadata is required and must be object containing the following required fields ".concat(requiredMetadataProps.join(', '), "."));
    }
    if (isBadString((_a = opts.metadata) === null || _a === void 0 ? void 0 : _a.organisation)) {
        throw new Error('metadata.organisation is required and must be a non empty string.');
    }
    if (isBadString((_b = opts.metadata) === null || _b === void 0 ? void 0 : _b.platform)) {
        throw new Error('metadata.platform is required and must be a non empty string.');
    }
    if (isBadBoolean((_c = opts.metadata) === null || _c === void 0 ? void 0 : _c.profilingAllowed)) {
        throw new Error('metadata.profilingAllowed is required and must be a boolean.');
    }
    if (isBadString((_d = opts.metadata) === null || _d === void 0 ? void 0 : _d.userAgent)) {
        throw new Error('metadata.userAgent is required and must be a non empty string.');
    }
    // optional props
    if (opts.swUrl !== undefined && isBadString(opts.swUrl)) {
        throw new Error('swUrl is optional but must be non empty string when provided.');
    }
    if (((_e = opts.metadata) === null || _e === void 0 ? void 0 : _e.visitorIds) !== undefined && isBadStringArray((_f = opts.metadata) === null || _f === void 0 ? void 0 : _f.visitorIds)) {
        throw new Error('metadata.visitorIds is optional but must be a non empty string array.');
    }
    if (((_g = opts.metadata) === null || _g === void 0 ? void 0 : _g.crossOrgUserIds) !== undefined && isBadStringArray((_h = opts.metadata) === null || _h === void 0 ? void 0 : _h.crossOrgUserIds)) {
        throw new Error('metadata.crossOrgUserIds is optional but must be a non empty string array.');
    }
    if (((_j = opts.metadata) === null || _j === void 0 ? void 0 : _j.keywords) !== undefined && isBadStringArray((_k = opts.metadata) === null || _k === void 0 ? void 0 : _k.keywords)) {
        throw new Error('metadata.keywords is optional but must be a non empty string array when provided.');
    }
    if (((_l = opts.metadata) === null || _l === void 0 ? void 0 : _l.channels) !== undefined && isBadStringArray((_m = opts.metadata) === null || _m === void 0 ? void 0 : _m.channels)) {
        throw new Error('metadata.channels is optional but must be a non empty string array when provided.');
    }
    if (((_o = opts.metadata) === null || _o === void 0 ? void 0 : _o.subChannels) !== undefined && isBadStringArray((_p = opts.metadata) === null || _p === void 0 ? void 0 : _p.subChannels)) {
        throw new Error('metadata.subChannels is optional but must be a non empty string array when provided.');
    }
    return opts;
});


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
var ms_1 = __importDefault(__webpack_require__(3));
var documentReady_1 = __importDefault(__webpack_require__(22));
var setAsyncInterval_1 = __webpack_require__(34);
var handleRegisterError_1 = __webpack_require__(10);
var pullNotificationClickStorage_1 = __webpack_require__(24);
var pullNotifierFactory_1 = __webpack_require__(36);
var trackPullNotificationClickLoad_1 = __webpack_require__(53);
var init = function (opts) { return __awaiter(void 0, void 0, void 0, function () {
    var showPullNotification, timer, startPullNotifications, stopPullNotifications, onVisibilitychange, cleanup, params, ito, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                showPullNotification = (0, pullNotifierFactory_1.pullNotifierFactory)(opts).showPullNotification;
                timer = null;
                startPullNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, showPullNotification()];
                            case 1:
                                _a.sent();
                                timer = (0, setAsyncInterval_1.setIntervalAsync)(showPullNotification, (0, ms_1.default)('30s'));
                                return [2 /*return*/];
                        }
                    });
                }); };
                stopPullNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!timer) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, setAsyncInterval_1.clearIntervalAsync)(timer)];
                            case 1:
                                _a.sent();
                                timer = null;
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); };
                onVisibilitychange = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(document.visibilityState === 'hidden')) return [3 /*break*/, 2];
                                return [4 /*yield*/, stopPullNotifications()];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                if (!(document.visibilityState === 'visible' && !timer)) return [3 /*break*/, 4];
                                return [4 /*yield*/, startPullNotifications()];
                            case 3:
                                _a.sent();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                cleanup = function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                document.removeEventListener('visibilitychange', onVisibilitychange);
                                return [4 /*yield*/, stopPullNotifications()];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 7, , 8]);
                return [4 /*yield*/, documentReady_1.default];
            case 2:
                _a.sent();
                (0, pullNotificationClickStorage_1.deleteOldClickRecords)();
                params = new URLSearchParams(window.location.search);
                ito = params.get('ito');
                if (!(ito === 'pull-notification')) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, trackPullNotificationClickLoad_1.trackPullNotificationClickLoad)(params, opts)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (!(document.visibilityState === 'visible')) return [3 /*break*/, 6];
                return [4 /*yield*/, startPullNotifications()];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                document.addEventListener('visibilitychange', onVisibilitychange);
                return [3 /*break*/, 8];
            case 7:
                error_1 = _a.sent();
                (0, handleRegisterError_1.handleRegisterError)(error_1, { emit: opts.emit, metadata: opts.metadata });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/, {
                    cleanup: cleanup
                }];
        }
    });
}); };
exports.init = init;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
  The original version of this code comes from https://github.com/ealmansi/set-interval-async I did not use it becuase I don't have the time to make TS work with ecmascript modules.
  Once Hulk supports ecmascript modules we should use the set-interval-async as a dependency instead of this version of the module.
*/
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIntervalAsync = exports.clearIntervalAsync = void 0;
var clearIntervalAsync_1 = __webpack_require__(35);
Object.defineProperty(exports, "clearIntervalAsync", { enumerable: true, get: function () { return clearIntervalAsync_1.clearIntervalAsync; } });
var setIntervalAsyncTimer_1 = __webpack_require__(23);
var setIntervalAsync = function (handler, intervalMs) {
    var handlerArgs = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        handlerArgs[_i - 2] = arguments[_i];
    }
    if (!(typeof handler === 'function')) {
        throw new TypeError('First argument is not a function');
    }
    if (!(typeof intervalMs === 'number')) {
        throw new TypeError('Second argument is not a number');
    }
    return setIntervalAsyncTimer_1.SetIntervalAsyncTimer.startTimer.apply(setIntervalAsyncTimer_1.SetIntervalAsyncTimer, __spreadArray([handler, intervalMs], handlerArgs, false));
};
exports.setIntervalAsync = setIntervalAsync;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearIntervalAsync = void 0;
var setIntervalAsyncTimer_1 = __webpack_require__(23);
/**
 * Stops an execution cycle started by setIntervalAsync.
 * Any ongoing function executions will run until completion,
 * but all future ones will be cancelled.
 */
var clearIntervalAsync = function (timer) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(timer instanceof setIntervalAsyncTimer_1.SetIntervalAsyncTimer)) {
                    throw new TypeError('First argument is not an instance of SetIntervalAsyncTimer');
                }
                return [4 /*yield*/, setIntervalAsyncTimer_1.SetIntervalAsyncTimer.stopTimer(timer)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.clearIntervalAsync = clearIntervalAsync;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pullNotifierFactory = void 0;
var mol_fe_web_push_types_1 = __webpack_require__(21);
var ms_1 = __importDefault(__webpack_require__(3));
var hashStorage_1 = __webpack_require__(42);
var safeTrackEvent_1 = __importDefault(__webpack_require__(7));
var getLatestPullCampaign_1 = __webpack_require__(43);
var getPullNotificationData_1 = __webpack_require__(52);
var pullNotificationEventHandler = function (action, emit, baseEndpoint, apiKey, data) {
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var event;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    event = {
                        action: action,
                        campaignId: data.campaignId,
                        crossOrgUserId: data.crossOrgUserId,
                        organisation: data.organisation,
                        platform: data.platform,
                        type: 'pull-notification',
                        userAgent: navigator.userAgent
                    };
                    if (!(action === mol_fe_web_push_types_1.PullNotificationEventAction.CLICK)) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, safeTrackEvent_1.default)(baseEndpoint, event, apiKey)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    emit("pull_notification_".concat(action), event);
                    return [2 /*return*/];
            }
        });
    }); };
};
var pullNotifierFactory = function (opts) {
    var apiKey = opts.apiKey, baseEndpoint = opts.baseEndpoint, metadata = opts.metadata, crossOrgUserId = opts.crossOrgUserId, renderPullNotification = opts.renderPullNotification, emit = opts.emit, _a = opts.canRender, canRender = _a === void 0 ? function () { return true; } : _a;
    var storage = new hashStorage_1.HashStorage('hulk_pull-notification_shown_campaigns', (0, ms_1.default)('24h'), 1000);
    var showPullNotification = function () { return __awaiter(void 0, void 0, void 0, function () {
        var campaign, notificationData, onImpression, onClick;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, getLatestPullCampaign_1.getLatestPullCampaign)(baseEndpoint, metadata, apiKey)];
                case 1:
                    campaign = _a.sent();
                    if (!(campaign && !storage.get(campaign.id) && document.visibilityState === 'visible' && canRender(campaign))) return [3 /*break*/, 4];
                    notificationData = (0, getPullNotificationData_1.getPullNotificationData)(metadata, campaign, crossOrgUserId);
                    onImpression = pullNotificationEventHandler(mol_fe_web_push_types_1.PullNotificationEventAction.IMPRESSION, emit, baseEndpoint, apiKey, notificationData);
                    onClick = pullNotificationEventHandler(mol_fe_web_push_types_1.PullNotificationEventAction.CLICK, emit, baseEndpoint, apiKey, notificationData);
                    return [4 /*yield*/, renderPullNotification(notificationData, { onClick: onClick })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, onImpression()];
                case 3:
                    _a.sent();
                    storage.set(campaign.id, true, (0, ms_1.default)('24h'));
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return { showPullNotification: showPullNotification, storage: storage };
};
exports.pullNotifierFactory = pullNotifierFactory;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedisDB = void 0;
var RedisDB;

(function (RedisDB) {
  RedisDB[RedisDB["MAIN"] = 0] = "MAIN";
  RedisDB[RedisDB["REDLOCK"] = 1] = "REDLOCK";
  RedisDB[RedisDB["SESSION"] = 2] = "SESSION";
})(RedisDB = exports.RedisDB || (exports.RedisDB = {}));

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MetricsLogLevel = void 0;
var MetricsLogLevel;

(function (MetricsLogLevel) {
  MetricsLogLevel["DEBUG"] = "debug";
  MetricsLogLevel["INFO"] = "info";
  MetricsLogLevel["WARN"] = "warn";
  MetricsLogLevel["ERROR"] = "error";
})(MetricsLogLevel = exports.MetricsLogLevel || (exports.MetricsLogLevel = {}));

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PullNotificationEventAction = exports.PullCampaignStatus = exports.PullCampaignType = void 0;
var PullCampaignType;

(function (PullCampaignType) {
  PullCampaignType["DEFAULT"] = "DEFAULT";
  PullCampaignType["SCHEDULED"] = "SCHEDULED";
})(PullCampaignType = exports.PullCampaignType || (exports.PullCampaignType = {}));

var PullCampaignStatus;

(function (PullCampaignStatus) {
  PullCampaignStatus["SCHEDULED"] = "SCHEDULED";
  PullCampaignStatus["ACTIVE"] = "ACTIVE";
  PullCampaignStatus["CANCELED"] = "CANCELED";
  PullCampaignStatus["FINISHED"] = "FINISHED";
})(PullCampaignStatus = exports.PullCampaignStatus || (exports.PullCampaignStatus = {}));

var PullNotificationEventAction;

(function (PullNotificationEventAction) {
  PullNotificationEventAction["IMPRESSION"] = "impression";
  PullNotificationEventAction["CLICK"] = "click";
  PullNotificationEventAction["CLICK_PAGE_LOAD"] = "click_page_load";
  PullNotificationEventAction["CLICK_PAGE_SHARE"] = "click_page_share";
  PullNotificationEventAction["CLICK_PAGE_REFRESH"] = "click_page_refresh";
})(PullNotificationEventAction = exports.PullNotificationEventAction || (exports.PullNotificationEventAction = {}));

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pipeline = exports.CampaignRunType = exports.CampaignType = exports.CampaignStatus = exports.SubscriptionStatus = exports.SubscriptionMigrationStatus = void 0;
var SubscriptionMigrationStatus;

(function (SubscriptionMigrationStatus) {
  SubscriptionMigrationStatus[SubscriptionMigrationStatus["PENDING"] = 1] = "PENDING";
  SubscriptionMigrationStatus[SubscriptionMigrationStatus["PARTIAL"] = 2] = "PARTIAL";
  SubscriptionMigrationStatus[SubscriptionMigrationStatus["DONE"] = 3] = "DONE";
})(SubscriptionMigrationStatus = exports.SubscriptionMigrationStatus || (exports.SubscriptionMigrationStatus = {}));

var SubscriptionStatus;

(function (SubscriptionStatus) {
  SubscriptionStatus["ACTIVE"] = "ACTIVE";
  SubscriptionStatus["INACTIVE"] = "INACTIVE";
  SubscriptionStatus["ZOMBIE"] = "ZOMBIE";
})(SubscriptionStatus = exports.SubscriptionStatus || (exports.SubscriptionStatus = {}));

var CampaignStatus;

(function (CampaignStatus) {
  CampaignStatus["READY"] = "READY";
  CampaignStatus["STARTED"] = "STARTED";
  CampaignStatus["CANCELED"] = "CANCELED";
  CampaignStatus["SEARCHING"] = "SEARCHING";
  CampaignStatus["DELIVERING"] = "DELIVERING";
  CampaignStatus["FINISHED"] = "FINISHED";
  CampaignStatus["SCHEDULED"] = "SCHEDULED";
  CampaignStatus["SAMPLE_PROBING"] = "SAMPLE_PROBING";
  CampaignStatus["AB_TESTING"] = "AB_TESTING";
  CampaignStatus["WAITING"] = "WAITING";
  CampaignStatus["CANCELED_BY_PROBE"] = "CANCELED_BY_PROBE";
})(CampaignStatus = exports.CampaignStatus || (exports.CampaignStatus = {}));

var CampaignType;

(function (CampaignType) {
  CampaignType["DEFAULT"] = "DEFAULT";
  CampaignType["SCHEDULED_SAMPLE_PROBING"] = "SCHEDULED_SAMPLE_PROBING";
  CampaignType["SAMPLE_PROBING"] = "SAMPLE_PROBING";
  CampaignType["SCHEDULED_AB_TESTING"] = "SCHEDULED_AB_TESTING";
  CampaignType["SCHEDULED_AB_TESTING_SAMPLE_PROBING"] = "SCHEDULED_AB_TESTING_SAMPLE_PROBING";
  CampaignType["AB_TESTING_SAMPLE_PROBING"] = "AB_TESTING_SAMPLE_PROBING";
  CampaignType["AB_TESTING"] = "AB_TESTING";
  CampaignType["SCHEDULED"] = "SCHEDULED";
  CampaignType["PING"] = "PING";
})(CampaignType = exports.CampaignType || (exports.CampaignType = {}));

var CampaignRunType;

(function (CampaignRunType) {
  CampaignRunType["DEFAULT"] = "DEFAULT";
  CampaignRunType["SAMPLE_PROBE"] = "SAMPLE_PROBE";
  CampaignRunType["AB_PROBE"] = "AB_PROBE";
  CampaignRunType["PING"] = "PING";
})(CampaignRunType = exports.CampaignRunType || (exports.CampaignRunType = {}));

var Pipeline;

(function (Pipeline) {
  Pipeline["USER_AGENT"] = "USER_AGENT";
})(Pipeline = exports.Pipeline || (exports.Pipeline = {}));

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashStorage = void 0;
var ms_1 = __importDefault(__webpack_require__(3));
var SimpleStorage_1 = __importDefault(__webpack_require__(2));
var HashStorage = /** @class */ (function () {
    function HashStorage(name, ttl, entriesLimit) {
        if (ttl === void 0) { ttl = (0, ms_1.default)('24h'); }
        if (entriesLimit === void 0) { entriesLimit = 1000; }
        this.name = name;
        this.storage = new SimpleStorage_1.default(name);
        this.defaultTTL = ttl;
        this.entriesLimit = entriesLimit;
        this.syncHash();
    }
    HashStorage.prototype.getHash = function () {
        return this.storage.get() || {};
    };
    HashStorage.prototype.syncHash = function () {
        var hash = this.getHash();
        var syncHash = {};
        var recentEntriesFirst = Object.entries(hash).sort(function (entryA, entryB) {
            return entryB[1].epoch - entryA[1].epoch;
        });
        var totalEntries = 0;
        for (var _i = 0, recentEntriesFirst_1 = recentEntriesFirst; _i < recentEntriesFirst_1.length; _i++) {
            var _a = recentEntriesFirst_1[_i], key = _a[0], entry = _a[1];
            if (Date.now() - entry.epoch < entry.ttl && totalEntries < this.entriesLimit) {
                syncHash[key] = entry;
                totalEntries += 1;
            }
        }
        this.storage.set(syncHash);
    };
    HashStorage.prototype.get = function (key) {
        var entry = this.getHash()[key];
        if (entry) {
            return entry.data;
        }
        return null;
    };
    HashStorage.prototype.set = function (key, data, ttl) {
        var hash = this.getHash();
        var entry = {
            data: data,
            epoch: Date.now(),
            ttl: ttl
        };
        hash[key] = entry;
        this.storage.set(hash);
        this.syncHash();
    };
    HashStorage.prototype.clear = function () {
        this.storage.clear();
    };
    return HashStorage;
}());
exports.HashStorage = HashStorage;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestPullCampaign = void 0;
var parseISOString_1 = __importDefault(__webpack_require__(25));
var fetchSegmentedPullCampaigns_1 = __webpack_require__(45);
var getLatestPullCampaign = function (baseEndpoint, meta, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var campaigns;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fetchSegmentedPullCampaigns_1.fetchSegmentedPullCampaigns)(baseEndpoint, meta, apiKey)];
            case 1:
                campaigns = _a.sent();
                return [2 /*return*/, campaigns.sort(function (campaignA, campaignB) {
                        var epochA = (0, parseISOString_1.default)(campaignA.triggerTime || campaignA.creationTimestamp).getTime();
                        var epochB = (0, parseISOString_1.default)(campaignB.triggerTime || campaignB.creationTimestamp).getTime();
                        return epochB - epochA;
                    })[0]];
        }
    });
}); };
exports.getLatestPullCampaign = getLatestPullCampaign;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getISOStringParts = void 0;
var getISOStringParts = function (date) { return date.split(/\D+/); };
exports.getISOStringParts = getISOStringParts;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSegmentedPullCampaigns = void 0;
var fetchPullCampaigns_1 = __webpack_require__(46);
var isActive_1 = __webpack_require__(47);
var matchesSegments_1 = __webpack_require__(48);
var fetchSegmentedPullCampaigns = function (baseEndpoint, meta, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var campaigns;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, fetchPullCampaigns_1.fetchPullCampaigns)(baseEndpoint, apiKey)];
            case 1:
                campaigns = _a.sent();
                return [2 /*return*/, campaigns.filter(function (campaign) { return (0, isActive_1.isActive)(meta.platform, campaign) && (0, matchesSegments_1.matchesSegments)(meta, campaign.segments); })];
        }
    });
}); };
exports.fetchSegmentedPullCampaigns = fetchSegmentedPullCampaigns;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchPullCampaigns = void 0;
var url_join_1 = __importDefault(__webpack_require__(0));
var fetchWithRetry_1 = __importDefault(__webpack_require__(1));
var fetchPullCampaigns = function (baseEndpoint, apiKey) { return __awaiter(void 0, void 0, void 0, function () {
    var requestInit, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requestInit = {
                    mode: 'cors'
                };
                if (apiKey) {
                    requestInit.headers = { Authorization: "ApiKey ".concat(apiKey) };
                }
                return [4 /*yield*/, (0, fetchWithRetry_1.default)((0, url_join_1.default)(baseEndpoint, 'pull-campaign'), requestInit, true)];
            case 1:
                response = _a.sent();
                return [2 /*return*/, response.json() || []];
        }
    });
}); };
exports.fetchPullCampaigns = fetchPullCampaigns;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActive = void 0;
var mol_fe_web_push_types_1 = __webpack_require__(21);
var parseISOString_1 = __importDefault(__webpack_require__(25));
var isActive = function (platform, pullCampaign) {
    if (!pullCampaign.ttl) {
        return false;
    }
    var ttl = platform === 'desktop' ? pullCampaign.ttl.desktop : pullCampaign.ttl.mobile;
    var ttlInMs = ttl * 1000;
    var startISOString = pullCampaign.type === mol_fe_web_push_types_1.PullCampaignType.SCHEDULED
        ? pullCampaign.triggerTime
        : pullCampaign.creationTimestamp;
    var startTime = (0, parseISOString_1.default)(startISOString).getTime();
    var expireTime = new Date(startTime + ttlInMs).getTime();
    return Date.now() <= expireTime;
};
exports.isActive = isActive;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesSegments = void 0;
var matchesSegment_1 = __webpack_require__(49);
var matchesSegments = function (metadata, segments) {
    var excludeSegments = segments.exclude, includeSegments = segments.include;
    if (excludeSegments) {
        for (var _i = 0, excludeSegments_1 = excludeSegments; _i < excludeSegments_1.length; _i++) {
            var segment = excludeSegments_1[_i];
            if ((0, matchesSegment_1.matchesSegment)(metadata, segment)) {
                return false;
            }
        }
    }
    for (var _a = 0, includeSegments_1 = includeSegments; _a < includeSegments_1.length; _a++) {
        var segment = includeSegments_1[_a];
        if ((0, matchesSegment_1.matchesSegment)(metadata, segment)) {
            return true;
        }
    }
    return false;
};
exports.matchesSegments = matchesSegments;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesSegment = void 0;
var matchesAndCriteria_1 = __webpack_require__(50);
var matchesSegment = function (metadata, segment) {
    for (var _i = 0, _a = segment.criteria.and; _i < _a.length; _i++) {
        var criteria = _a[_i];
        if (!(0, matchesAndCriteria_1.matchesAndCriteria)(metadata, criteria)) {
            return false;
        }
    }
    return true;
};
exports.matchesSegment = matchesSegment;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesAndCriteria = void 0;
var matchesCriterion_1 = __webpack_require__(51);
var matchesAndCriteria = function (metadata, criteria) {
    return criteria.or.some(function (criterion) { return (0, matchesCriterion_1.matchesCriterion)(metadata, criterion); });
};
exports.matchesAndCriteria = matchesAndCriteria;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.matchesCriterion = void 0;
var criterionProp2SubsMetaProp = function (property) {
    switch (property) {
        case 'channel':
            return 'channels';
        case 'subchannel':
            return 'subChannels';
        case 'geo':
            return 'geo';
        case 'keyword':
            return 'keywords';
        case 'platform':
            return 'platform';
    }
};
var eqMatcher = function (meta, criterion) {
    var data = meta[criterionProp2SubsMetaProp(criterion.property)];
    if (!data) {
        return criterion.value === 'ALL';
    }
    var values = Array.isArray(data) ? data : [data];
    return values.some(function (value) { return value === criterion.value; });
};
var oneOfMatcher = function (meta, criterion) {
    var data = meta[criterionProp2SubsMetaProp(criterion.property)];
    if (!data) {
        return false;
    }
    var values = Array.isArray(data) ? data : [data];
    var criterionValues = Array.isArray(criterion.value) ? criterion.value : [criterion.value];
    return values.some(function (value) { return criterionValues.includes(value); });
};
var criterionMatchers = {
    eq: eqMatcher,
    neq: function (meta, criterion) { return !eqMatcher(meta, criterion); },
    not_one_of: function (meta, criterion) { return !oneOfMatcher(meta, criterion); },
    one_of: oneOfMatcher
};
var matchesCriterion = function (meta, criterion) {
    var matcher = criterionMatchers[criterion.operator];
    return matcher(meta, criterion);
};
exports.matchesCriterion = matchesCriterion;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.getPullNotificationData = void 0;
var getPullNotificationData = function (metadata, campaign, crossOrgUserId) {
    var assetId = campaign.assetId, body = campaign.body, clickThroughUrl = campaign.clickThroughUrl, id = campaign.id, organisation = campaign.organisation, title = campaign.title, image = campaign.image, icon = campaign.icon, campaignMeta = campaign.metadata;
    var geo = metadata.geo, platform = metadata.platform;
    var notificationClickUrl = new URL(clickThroughUrl);
    if (!notificationClickUrl.searchParams.has('ito')) {
        notificationClickUrl.searchParams.append('ito', 'pull-notification');
    }
    notificationClickUrl.searchParams.append('ci', "".concat(campaign.id));
    if (crossOrgUserId) {
        notificationClickUrl.searchParams.append('xi', "".concat(crossOrgUserId));
    }
    if (assetId) {
        notificationClickUrl.searchParams.append('ai', "".concat(assetId));
    }
    var notificationData = {
        assetId: assetId,
        body: body,
        campaignId: id,
        clickThroughUrl: notificationClickUrl.href,
        geo: geo,
        icon: icon,
        image: image,
        metadata: campaignMeta,
        organisation: organisation,
        platform: platform,
        title: title,
        type: 'pull-notification',
        userAgent: navigator.userAgent
    };
    return notificationData;
};
exports.getPullNotificationData = getPullNotificationData;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackPullNotificationClickLoad = void 0;
var mol_fe_web_push_types_1 = __webpack_require__(21);
var pullNotificationClickStorage_1 = __webpack_require__(24);
var safeTrackEvent_1 = __importDefault(__webpack_require__(7));
var getClickAction = function (_a) {
    var sharedCrossOrgUserId = _a.sharedCrossOrgUserId, crossOrgUserId = _a.crossOrgUserId, campaignId = _a.campaignId;
    if (!sharedCrossOrgUserId) {
        return mol_fe_web_push_types_1.PullNotificationEventAction.CLICK_PAGE_LOAD;
    }
    if (crossOrgUserId !== sharedCrossOrgUserId) {
        return mol_fe_web_push_types_1.PullNotificationEventAction.CLICK_PAGE_SHARE;
    }
    if ((0, pullNotificationClickStorage_1.wasTrackedBefore)(campaignId, sharedCrossOrgUserId)) {
        return mol_fe_web_push_types_1.PullNotificationEventAction.CLICK_PAGE_REFRESH;
    }
    return mol_fe_web_push_types_1.PullNotificationEventAction.CLICK_PAGE_LOAD;
};
var trackPullNotificationClickLoad = function (params, opts) { return __awaiter(void 0, void 0, void 0, function () {
    var crossOrgUserId, metadata, emit, baseEndpoint, apiKey, campaignId, assetId, sharedCrossOrgUserId, action, notificationClickEvent;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                crossOrgUserId = opts.crossOrgUserId, metadata = opts.metadata, emit = opts.emit, baseEndpoint = opts.baseEndpoint, apiKey = opts.apiKey;
                campaignId = params.get('ci');
                assetId = params.get('ai');
                sharedCrossOrgUserId = params.get('xi');
                if (!campaignId) return [3 /*break*/, 2];
                action = getClickAction({
                    campaignId: campaignId,
                    crossOrgUserId: crossOrgUserId,
                    sharedCrossOrgUserId: sharedCrossOrgUserId
                });
                notificationClickEvent = {
                    action: action,
                    campaignId: campaignId,
                    crossOrgUserId: crossOrgUserId,
                    organisation: metadata.organisation,
                    platform: metadata.platform,
                    type: 'pull-notification',
                    userAgent: navigator.userAgent
                };
                if (assetId) {
                    notificationClickEvent.assetId = assetId;
                }
                return [4 /*yield*/, (0, safeTrackEvent_1.default)(baseEndpoint, notificationClickEvent, apiKey)];
            case 1:
                _a.sent();
                emit('pull_notification_click', notificationClickEvent);
                (0, pullNotificationClickStorage_1.markAsTracked)(campaignId, crossOrgUserId || 'unknown');
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.trackPullNotificationClickLoad = trackPullNotificationClickLoad;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrossOrgUserId = void 0;
var crossOrgRequest_1 = __webpack_require__(55);
var handleRegisterError_1 = __webpack_require__(10);
var subscriptionStatus_1 = __webpack_require__(4);
var getCrossOrgUserId = function (metadata, emit) { return __awaiter(void 0, void 0, void 0, function () {
    var subscriptionStatus, organisation, crossOrgUserIds, crossOrgUserId, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                subscriptionStatus = (0, subscriptionStatus_1.getStatus)();
                organisation = metadata.organisation;
                crossOrgUserIds = subscriptionStatus && Array.isArray(subscriptionStatus.metadata.crossOrgUserIds)
                    ? subscriptionStatus.metadata.crossOrgUserIds
                    : [];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, crossOrgRequest_1.getCrossOrgUserIdFromCentral)(organisation)];
            case 2:
                crossOrgUserId = (_a.sent()) || undefined;
                return [2 /*return*/, crossOrgUserId];
            case 3:
                error_1 = _a.sent();
                (0, handleRegisterError_1.handleRegisterError)(error_1, { emit: emit, metadata: metadata });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, crossOrgUserIds[crossOrgUserIds.length - 1]];
        }
    });
}); };
exports.getCrossOrgUserId = getCrossOrgUserId;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCrossOrgUserIdFromCentral = exports.API_ROOT_BY_ENV = void 0;
var crossFrame_1 = __webpack_require__(56);
exports.API_ROOT_BY_ENV = {
    development: {
        central: "".concat(location.protocol, "//").concat(location.host, "/public/v1/static/latest/mol-fe-web-push-browser-register")
    },
    integration: {
        central: 'https://hulkint.anm.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register'
    },
    production: {
        central: 'https://hulkprod.anm.co.uk/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register'
    }
};
var PROD_HOSTNAMES = {
    inews: ['inews.co.uk'],
    metro: ['metro.co.uk'],
    mol: ['www.dailymail.co.uk', 'a.dailymail.co.uk', 'b.dailymail.co.uk', 'c.dailymail.co.uk'],
    newzit: ['www.newzit.com']
};
var getEnvironmentByOrganisationAndUrl = function (organisation, url) {
    var hostname = new URL(url).hostname;
    if (hostname === 'localhost' || hostname.endsWith('ngrok.io')) {
        return 'development';
    }
    if (!PROD_HOSTNAMES[organisation]) {
        throw new Error("No hostnames for organisation: ".concat(organisation));
    }
    if (PROD_HOSTNAMES[organisation].includes(hostname)) {
        return 'production';
    }
    return 'integration';
};
var getCrossOrgUserIdFromCentral = function (organisation) { return __awaiter(void 0, void 0, void 0, function () {
    var environment, frameUrl, data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                environment = getEnvironmentByOrganisationAndUrl(organisation, location.href);
                frameUrl = "".concat(exports.API_ROOT_BY_ENV[environment].central, "/crossOrgInlinedMin.html?command=getCrossOrgUserId");
                return [4 /*yield*/, (0, crossFrame_1.loadIframeAndWaitForMessage)(frameUrl, 'mol-fe-web-push-cross-org-user-id')];
            case 1:
                data = _a.sent();
                return [2 /*return*/, data && data.crossOrgUserId];
        }
    });
}); };
exports.getCrossOrgUserIdFromCentral = getCrossOrgUserIdFromCentral;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadIframeAndWaitForMessage = void 0;
var FRAME_TIMEOUT = 10000;
var loadIframeAndWaitForMessage = function (frameUrl, expectedScope) { return __awaiter(void 0, void 0, void 0, function () {
    var expectedOrigin;
    return __generator(this, function (_a) {
        expectedOrigin = new URL(frameUrl).origin;
        return [2 /*return*/, new Promise(function (resolve, reject) {
                // eslint-disable-next-line prefer-const
                var timeout;
                var iframe = null;
                var messageHandler = function (event) {
                    if (event.data.scope !== expectedScope || event.origin !== expectedOrigin) {
                        return;
                    }
                    window.removeEventListener('message', messageHandler);
                    if (timeout) {
                        clearTimeout(timeout);
                    }
                    if (typeof event.data.data !== 'undefined') {
                        resolve(event.data.data);
                    }
                    else {
                        reject(new Error('Invalid data posted back from crossOrg iframe'));
                    }
                    if (iframe) {
                        iframe.remove();
                    }
                };
                window.addEventListener('message', messageHandler);
                iframe = document.createElement('iframe');
                iframe.style.width = '0px';
                iframe.style.height = '0px';
                iframe.style.border = 'none';
                iframe.src = frameUrl;
                document.body.appendChild(iframe);
                timeout = window.setTimeout(function () {
                    window.removeEventListener('message', messageHandler);
                    reject(new Error('crossOrg iframe timed out'));
                    if (iframe) {
                        iframe.remove();
                    }
                }, FRAME_TIMEOUT);
            })];
    });
}); };
exports.loadIframeAndWaitForMessage = loadIframeAndWaitForMessage;


/***/ })
/******/ ]);
});
//# sourceMappingURL=register.js.map