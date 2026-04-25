(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target,
    mod2
  ));

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports2) {
      "use strict";
      exports2.byteLength = byteLength;
      exports2.toByteArray = toByteArray;
      exports2.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports2) {
      exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports2) {
      "use strict";
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer2;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer2.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer2.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer2.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function Buffer2(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer2.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer2.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer2.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer2, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer2.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer2.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer2.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer2.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer2.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer2.alloc(+length);
      }
      Buffer2.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer2.prototype;
      };
      Buffer2.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer2.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer2.from(b, b.offset, b.byteLength);
        if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer2.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer2.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer2.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer2.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer2.isBuffer(buf)) buf = Buffer2.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer2.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer2.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer2.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer2.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer2.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer2.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer2.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
      Buffer2.prototype.equals = function equals(b) {
        if (!Buffer2.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer2.compare(this, b) === 0;
      };
      Buffer2.prototype.inspect = function inspect() {
        let str = "";
        const max2 = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max2).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max2) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
      }
      Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer2.from(target, target.offset, target.byteLength);
        }
        if (!Buffer2.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer2.from(val, encoding);
        }
        if (Buffer2.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer2.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer2.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer2.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer2.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max2, min) {
        if (!Buffer2.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max2 || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max2) {
        checkIntBI(value, min, max2, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max2) {
        checkIntBI(value, min, max2, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max2, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer2.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer2.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max2, buf, offset, byteLength2) {
        if (value > max2 || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max2}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // node_modules/base64-search/dist/index.js
  var require_dist = __commonJS({
    "node_modules/base64-search/dist/index.js"(exports2) {
      "use strict";
      Object.defineProperty(exports2, "__esModule", { value: true });
      exports2.base64Regex = exports2.base64Encodings = void 0;
      var buffer_1 = require_buffer();
      var base64Encodings = (input) => {
        const buffer = buffer_1.Buffer.isBuffer(input) ? input : buffer_1.Buffer.from(input);
        return [
          buffer.toString("base64"),
          buffer_1.Buffer.concat([buffer_1.Buffer.alloc(1), buffer]).toString("base64").substring(2),
          buffer_1.Buffer.concat([buffer_1.Buffer.alloc(2), buffer]).toString("base64").substring(4)
        ].map((e) => e.replace(/.==?$/, ""));
      };
      exports2.base64Encodings = base64Encodings;
      var base64Regex = (input) => {
        const encodings = exports2.base64Encodings(input);
        return `(${encodings.sort().join("|")})`;
      };
      exports2.base64Regex = base64Regex;
    }
  });

  // node_modules/es-errors/type.js
  var require_type = __commonJS({
    "node_modules/es-errors/type.js"(exports2, module2) {
      "use strict";
      module2.exports = TypeError;
    }
  });

  // (disabled):node_modules/object-inspect/util.inspect
  var require_util = __commonJS({
    "(disabled):node_modules/object-inspect/util.inspect"() {
    }
  });

  // node_modules/object-inspect/index.js
  var require_object_inspect = __commonJS({
    "node_modules/object-inspect/index.js"(exports2, module2) {
      var hasMap = typeof Map === "function" && Map.prototype;
      var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
      var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
      var mapForEach = hasMap && Map.prototype.forEach;
      var hasSet = typeof Set === "function" && Set.prototype;
      var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
      var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
      var setForEach = hasSet && Set.prototype.forEach;
      var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
      var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
      var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
      var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
      var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
      var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
      var booleanValueOf = Boolean.prototype.valueOf;
      var objectToString = Object.prototype.toString;
      var functionToString = Function.prototype.toString;
      var $match = String.prototype.match;
      var $slice = String.prototype.slice;
      var $replace = String.prototype.replace;
      var $toUpperCase = String.prototype.toUpperCase;
      var $toLowerCase = String.prototype.toLowerCase;
      var $test = RegExp.prototype.test;
      var $concat = Array.prototype.concat;
      var $join = Array.prototype.join;
      var $arrSlice = Array.prototype.slice;
      var $floor = Math.floor;
      var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
      var gOPS = Object.getOwnPropertySymbols;
      var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
      var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
      var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
      var isEnumerable = Object.prototype.propertyIsEnumerable;
      var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
        return O.__proto__;
      } : null);
      function addNumericSeparator(num, str) {
        if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
          return str;
        }
        var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
        if (typeof num === "number") {
          var int = num < 0 ? -$floor(-num) : $floor(num);
          if (int !== num) {
            var intStr = String(int);
            var dec = $slice.call(str, intStr.length + 1);
            return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
          }
        }
        return $replace.call(str, sepRegex, "$&_");
      }
      var utilInspect = require_util();
      var inspectCustom = utilInspect.custom;
      var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
      var quotes = {
        __proto__: null,
        "double": '"',
        single: "'"
      };
      var quoteREs = {
        __proto__: null,
        "double": /(["\\])/g,
        single: /(['\\])/g
      };
      module2.exports = function inspect_(obj, options, depth, seen) {
        var opts = options || {};
        if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
          throw new TypeError('option "quoteStyle" must be "single" or "double"');
        }
        if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
          throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
        }
        var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
        if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
          throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
        }
        if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
          throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
        }
        if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
          throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
        }
        var numericSeparator = opts.numericSeparator;
        if (typeof obj === "undefined") {
          return "undefined";
        }
        if (obj === null) {
          return "null";
        }
        if (typeof obj === "boolean") {
          return obj ? "true" : "false";
        }
        if (typeof obj === "string") {
          return inspectString(obj, opts);
        }
        if (typeof obj === "number") {
          if (obj === 0) {
            return Infinity / obj > 0 ? "0" : "-0";
          }
          var str = String(obj);
          return numericSeparator ? addNumericSeparator(obj, str) : str;
        }
        if (typeof obj === "bigint") {
          var bigIntStr = String(obj) + "n";
          return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
        }
        var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
        if (typeof depth === "undefined") {
          depth = 0;
        }
        if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
          return isArray(obj) ? "[Array]" : "[Object]";
        }
        var indent = getIndent(opts, depth);
        if (typeof seen === "undefined") {
          seen = [];
        } else if (indexOf(seen, obj) >= 0) {
          return "[Circular]";
        }
        function inspect(value, from, noIndent) {
          if (from) {
            seen = $arrSlice.call(seen);
            seen.push(from);
          }
          if (noIndent) {
            var newOpts = {
              depth: opts.depth
            };
            if (has(opts, "quoteStyle")) {
              newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
          }
          return inspect_(value, opts, depth + 1, seen);
        }
        if (typeof obj === "function" && !isRegExp(obj)) {
          var name = nameOf(obj);
          var keys = arrObjKeys(obj, inspect);
          return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
        }
        if (isSymbol(obj)) {
          var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
          return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
        }
        if (isElement(obj)) {
          var s = "<" + $toLowerCase.call(String(obj.nodeName));
          var attrs = obj.attributes || [];
          for (var i = 0; i < attrs.length; i++) {
            s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
          }
          s += ">";
          if (obj.childNodes && obj.childNodes.length) {
            s += "...";
          }
          s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
          return s;
        }
        if (isArray(obj)) {
          if (obj.length === 0) {
            return "[]";
          }
          var xs = arrObjKeys(obj, inspect);
          if (indent && !singleLineValues(xs)) {
            return "[" + indentedJoin(xs, indent) + "]";
          }
          return "[ " + $join.call(xs, ", ") + " ]";
        }
        if (isError(obj)) {
          var parts = arrObjKeys(obj, inspect);
          if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
            return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
          }
          if (parts.length === 0) {
            return "[" + String(obj) + "]";
          }
          return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
        }
        if (typeof obj === "object" && customInspect) {
          if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
            return utilInspect(obj, { depth: maxDepth - depth });
          } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
            return obj.inspect();
          }
        }
        if (isMap(obj)) {
          var mapParts = [];
          if (mapForEach) {
            mapForEach.call(obj, function(value, key) {
              mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
            });
          }
          return collectionOf("Map", mapSize.call(obj), mapParts, indent);
        }
        if (isSet(obj)) {
          var setParts = [];
          if (setForEach) {
            setForEach.call(obj, function(value) {
              setParts.push(inspect(value, obj));
            });
          }
          return collectionOf("Set", setSize.call(obj), setParts, indent);
        }
        if (isWeakMap(obj)) {
          return weakCollectionOf("WeakMap");
        }
        if (isWeakSet(obj)) {
          return weakCollectionOf("WeakSet");
        }
        if (isWeakRef(obj)) {
          return weakCollectionOf("WeakRef");
        }
        if (isNumber(obj)) {
          return markBoxed(inspect(Number(obj)));
        }
        if (isBigInt(obj)) {
          return markBoxed(inspect(bigIntValueOf.call(obj)));
        }
        if (isBoolean(obj)) {
          return markBoxed(booleanValueOf.call(obj));
        }
        if (isString(obj)) {
          return markBoxed(inspect(String(obj)));
        }
        if (typeof window !== "undefined" && obj === window) {
          return "{ [object Window] }";
        }
        if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
          return "{ [object globalThis] }";
        }
        if (!isDate(obj) && !isRegExp(obj)) {
          var ys = arrObjKeys(obj, inspect);
          var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
          var protoTag = obj instanceof Object ? "" : "null prototype";
          var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
          var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
          var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
          if (ys.length === 0) {
            return tag + "{}";
          }
          if (indent) {
            return tag + "{" + indentedJoin(ys, indent) + "}";
          }
          return tag + "{ " + $join.call(ys, ", ") + " }";
        }
        return String(obj);
      };
      function wrapQuotes(s, defaultStyle, opts) {
        var style = opts.quoteStyle || defaultStyle;
        var quoteChar = quotes[style];
        return quoteChar + s + quoteChar;
      }
      function quote(s) {
        return $replace.call(String(s), /"/g, "&quot;");
      }
      function canTrustToString(obj) {
        return !toStringTag || !(typeof obj === "object" && (toStringTag in obj || typeof obj[toStringTag] !== "undefined"));
      }
      function isArray(obj) {
        return toStr(obj) === "[object Array]" && canTrustToString(obj);
      }
      function isDate(obj) {
        return toStr(obj) === "[object Date]" && canTrustToString(obj);
      }
      function isRegExp(obj) {
        return toStr(obj) === "[object RegExp]" && canTrustToString(obj);
      }
      function isError(obj) {
        return toStr(obj) === "[object Error]" && canTrustToString(obj);
      }
      function isString(obj) {
        return toStr(obj) === "[object String]" && canTrustToString(obj);
      }
      function isNumber(obj) {
        return toStr(obj) === "[object Number]" && canTrustToString(obj);
      }
      function isBoolean(obj) {
        return toStr(obj) === "[object Boolean]" && canTrustToString(obj);
      }
      function isSymbol(obj) {
        if (hasShammedSymbols) {
          return obj && typeof obj === "object" && obj instanceof Symbol;
        }
        if (typeof obj === "symbol") {
          return true;
        }
        if (!obj || typeof obj !== "object" || !symToString) {
          return false;
        }
        try {
          symToString.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isBigInt(obj) {
        if (!obj || typeof obj !== "object" || !bigIntValueOf) {
          return false;
        }
        try {
          bigIntValueOf.call(obj);
          return true;
        } catch (e) {
        }
        return false;
      }
      var hasOwn = Object.prototype.hasOwnProperty || function(key) {
        return key in this;
      };
      function has(obj, key) {
        return hasOwn.call(obj, key);
      }
      function toStr(obj) {
        return objectToString.call(obj);
      }
      function nameOf(f) {
        if (f.name) {
          return f.name;
        }
        var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
        if (m) {
          return m[1];
        }
        return null;
      }
      function indexOf(xs, x) {
        if (xs.indexOf) {
          return xs.indexOf(x);
        }
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x) {
            return i;
          }
        }
        return -1;
      }
      function isMap(x) {
        if (!mapSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          mapSize.call(x);
          try {
            setSize.call(x);
          } catch (s) {
            return true;
          }
          return x instanceof Map;
        } catch (e) {
        }
        return false;
      }
      function isWeakMap(x) {
        if (!weakMapHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakMapHas.call(x, weakMapHas);
          try {
            weakSetHas.call(x, weakSetHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakMap;
        } catch (e) {
        }
        return false;
      }
      function isWeakRef(x) {
        if (!weakRefDeref || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakRefDeref.call(x);
          return true;
        } catch (e) {
        }
        return false;
      }
      function isSet(x) {
        if (!setSize || !x || typeof x !== "object") {
          return false;
        }
        try {
          setSize.call(x);
          try {
            mapSize.call(x);
          } catch (m) {
            return true;
          }
          return x instanceof Set;
        } catch (e) {
        }
        return false;
      }
      function isWeakSet(x) {
        if (!weakSetHas || !x || typeof x !== "object") {
          return false;
        }
        try {
          weakSetHas.call(x, weakSetHas);
          try {
            weakMapHas.call(x, weakMapHas);
          } catch (s) {
            return true;
          }
          return x instanceof WeakSet;
        } catch (e) {
        }
        return false;
      }
      function isElement(x) {
        if (!x || typeof x !== "object") {
          return false;
        }
        if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
          return true;
        }
        return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
      }
      function inspectString(str, opts) {
        if (str.length > opts.maxStringLength) {
          var remaining = str.length - opts.maxStringLength;
          var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
          return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
        }
        var quoteRE = quoteREs[opts.quoteStyle || "single"];
        quoteRE.lastIndex = 0;
        var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
        return wrapQuotes(s, "single", opts);
      }
      function lowbyte(c) {
        var n = c.charCodeAt(0);
        var x = {
          8: "b",
          9: "t",
          10: "n",
          12: "f",
          13: "r"
        }[n];
        if (x) {
          return "\\" + x;
        }
        return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
      }
      function markBoxed(str) {
        return "Object(" + str + ")";
      }
      function weakCollectionOf(type) {
        return type + " { ? }";
      }
      function collectionOf(type, size, entries, indent) {
        var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
        return type + " (" + size + ") {" + joinedEntries + "}";
      }
      function singleLineValues(xs) {
        for (var i = 0; i < xs.length; i++) {
          if (indexOf(xs[i], "\n") >= 0) {
            return false;
          }
        }
        return true;
      }
      function getIndent(opts, depth) {
        var baseIndent;
        if (opts.indent === "	") {
          baseIndent = "	";
        } else if (typeof opts.indent === "number" && opts.indent > 0) {
          baseIndent = $join.call(Array(opts.indent + 1), " ");
        } else {
          return null;
        }
        return {
          base: baseIndent,
          prev: $join.call(Array(depth + 1), baseIndent)
        };
      }
      function indentedJoin(xs, indent) {
        if (xs.length === 0) {
          return "";
        }
        var lineJoiner = "\n" + indent.prev + indent.base;
        return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
      }
      function arrObjKeys(obj, inspect) {
        var isArr = isArray(obj);
        var xs = [];
        if (isArr) {
          xs.length = obj.length;
          for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
          }
        }
        var syms = typeof gOPS === "function" ? gOPS(obj) : [];
        var symMap;
        if (hasShammedSymbols) {
          symMap = {};
          for (var k = 0; k < syms.length; k++) {
            symMap["$" + syms[k]] = syms[k];
          }
        }
        for (var key in obj) {
          if (!has(obj, key)) {
            continue;
          }
          if (isArr && String(Number(key)) === key && key < obj.length) {
            continue;
          }
          if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
            continue;
          } else if ($test.call(/[^\w$]/, key)) {
            xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
          } else {
            xs.push(key + ": " + inspect(obj[key], obj));
          }
        }
        if (typeof gOPS === "function") {
          for (var j = 0; j < syms.length; j++) {
            if (isEnumerable.call(obj, syms[j])) {
              xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
            }
          }
        }
        return xs;
      }
    }
  });

  // node_modules/side-channel-list/index.js
  var require_side_channel_list = __commonJS({
    "node_modules/side-channel-list/index.js"(exports2, module2) {
      "use strict";
      var inspect = require_object_inspect();
      var $TypeError = require_type();
      var listGetNode = function(list, key, isDelete) {
        var prev = list;
        var curr;
        for (; (curr = prev.next) != null; prev = curr) {
          if (curr.key === key) {
            prev.next = curr.next;
            if (!isDelete) {
              curr.next = /** @type {NonNullable<typeof list.next>} */
              list.next;
              list.next = curr;
            }
            return curr;
          }
        }
      };
      var listGet = function(objects, key) {
        if (!objects) {
          return void 0;
        }
        var node = listGetNode(objects, key);
        return node && node.value;
      };
      var listSet = function(objects, key, value) {
        var node = listGetNode(objects, key);
        if (node) {
          node.value = value;
        } else {
          objects.next = /** @type {import('./list.d.ts').ListNode<typeof value, typeof key>} */
          {
            // eslint-disable-line no-param-reassign, no-extra-parens
            key,
            next: objects.next,
            value
          };
        }
      };
      var listHas = function(objects, key) {
        if (!objects) {
          return false;
        }
        return !!listGetNode(objects, key);
      };
      var listDelete = function(objects, key) {
        if (objects) {
          return listGetNode(objects, key, true);
        }
      };
      module2.exports = function getSideChannelList() {
        var $o;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            var deletedNode = listDelete($o, key);
            if (deletedNode && $o && !$o.next) {
              $o = void 0;
            }
            return !!deletedNode;
          },
          get: function(key) {
            return listGet($o, key);
          },
          has: function(key) {
            return listHas($o, key);
          },
          set: function(key, value) {
            if (!$o) {
              $o = {
                next: void 0
              };
            }
            listSet(
              /** @type {NonNullable<typeof $o>} */
              $o,
              key,
              value
            );
          }
        };
        return channel;
      };
    }
  });

  // node_modules/es-object-atoms/index.js
  var require_es_object_atoms = __commonJS({
    "node_modules/es-object-atoms/index.js"(exports2, module2) {
      "use strict";
      module2.exports = Object;
    }
  });

  // node_modules/es-errors/index.js
  var require_es_errors = __commonJS({
    "node_modules/es-errors/index.js"(exports2, module2) {
      "use strict";
      module2.exports = Error;
    }
  });

  // node_modules/es-errors/eval.js
  var require_eval = __commonJS({
    "node_modules/es-errors/eval.js"(exports2, module2) {
      "use strict";
      module2.exports = EvalError;
    }
  });

  // node_modules/es-errors/range.js
  var require_range = __commonJS({
    "node_modules/es-errors/range.js"(exports2, module2) {
      "use strict";
      module2.exports = RangeError;
    }
  });

  // node_modules/es-errors/ref.js
  var require_ref = __commonJS({
    "node_modules/es-errors/ref.js"(exports2, module2) {
      "use strict";
      module2.exports = ReferenceError;
    }
  });

  // node_modules/es-errors/syntax.js
  var require_syntax = __commonJS({
    "node_modules/es-errors/syntax.js"(exports2, module2) {
      "use strict";
      module2.exports = SyntaxError;
    }
  });

  // node_modules/es-errors/uri.js
  var require_uri = __commonJS({
    "node_modules/es-errors/uri.js"(exports2, module2) {
      "use strict";
      module2.exports = URIError;
    }
  });

  // node_modules/math-intrinsics/abs.js
  var require_abs = __commonJS({
    "node_modules/math-intrinsics/abs.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.abs;
    }
  });

  // node_modules/math-intrinsics/floor.js
  var require_floor = __commonJS({
    "node_modules/math-intrinsics/floor.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.floor;
    }
  });

  // node_modules/math-intrinsics/max.js
  var require_max = __commonJS({
    "node_modules/math-intrinsics/max.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.max;
    }
  });

  // node_modules/math-intrinsics/min.js
  var require_min = __commonJS({
    "node_modules/math-intrinsics/min.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.min;
    }
  });

  // node_modules/math-intrinsics/pow.js
  var require_pow = __commonJS({
    "node_modules/math-intrinsics/pow.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.pow;
    }
  });

  // node_modules/math-intrinsics/round.js
  var require_round = __commonJS({
    "node_modules/math-intrinsics/round.js"(exports2, module2) {
      "use strict";
      module2.exports = Math.round;
    }
  });

  // node_modules/math-intrinsics/isNaN.js
  var require_isNaN = __commonJS({
    "node_modules/math-intrinsics/isNaN.js"(exports2, module2) {
      "use strict";
      module2.exports = Number.isNaN || function isNaN2(a) {
        return a !== a;
      };
    }
  });

  // node_modules/math-intrinsics/sign.js
  var require_sign = __commonJS({
    "node_modules/math-intrinsics/sign.js"(exports2, module2) {
      "use strict";
      var $isNaN = require_isNaN();
      module2.exports = function sign(number) {
        if ($isNaN(number) || number === 0) {
          return number;
        }
        return number < 0 ? -1 : 1;
      };
    }
  });

  // node_modules/gopd/gOPD.js
  var require_gOPD = __commonJS({
    "node_modules/gopd/gOPD.js"(exports2, module2) {
      "use strict";
      module2.exports = Object.getOwnPropertyDescriptor;
    }
  });

  // node_modules/gopd/index.js
  var require_gopd = __commonJS({
    "node_modules/gopd/index.js"(exports2, module2) {
      "use strict";
      var $gOPD = require_gOPD();
      if ($gOPD) {
        try {
          $gOPD([], "length");
        } catch (e) {
          $gOPD = null;
        }
      }
      module2.exports = $gOPD;
    }
  });

  // node_modules/es-define-property/index.js
  var require_es_define_property = __commonJS({
    "node_modules/es-define-property/index.js"(exports2, module2) {
      "use strict";
      var $defineProperty = Object.defineProperty || false;
      if ($defineProperty) {
        try {
          $defineProperty({}, "a", { value: 1 });
        } catch (e) {
          $defineProperty = false;
        }
      }
      module2.exports = $defineProperty;
    }
  });

  // node_modules/has-symbols/shams.js
  var require_shams = __commonJS({
    "node_modules/has-symbols/shams.js"(exports2, module2) {
      "use strict";
      module2.exports = function hasSymbols() {
        if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
          return false;
        }
        if (typeof Symbol.iterator === "symbol") {
          return true;
        }
        var obj = {};
        var sym = /* @__PURE__ */ Symbol("test");
        var symObj = Object(sym);
        if (typeof sym === "string") {
          return false;
        }
        if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
          return false;
        }
        if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
          return false;
        }
        var symVal = 42;
        obj[sym] = symVal;
        for (var _ in obj) {
          return false;
        }
        if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
          return false;
        }
        if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
          return false;
        }
        var syms = Object.getOwnPropertySymbols(obj);
        if (syms.length !== 1 || syms[0] !== sym) {
          return false;
        }
        if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
          return false;
        }
        if (typeof Object.getOwnPropertyDescriptor === "function") {
          var descriptor = (
            /** @type {PropertyDescriptor} */
            Object.getOwnPropertyDescriptor(obj, sym)
          );
          if (descriptor.value !== symVal || descriptor.enumerable !== true) {
            return false;
          }
        }
        return true;
      };
    }
  });

  // node_modules/has-symbols/index.js
  var require_has_symbols = __commonJS({
    "node_modules/has-symbols/index.js"(exports2, module2) {
      "use strict";
      var origSymbol = typeof Symbol !== "undefined" && Symbol;
      var hasSymbolSham = require_shams();
      module2.exports = function hasNativeSymbols() {
        if (typeof origSymbol !== "function") {
          return false;
        }
        if (typeof Symbol !== "function") {
          return false;
        }
        if (typeof origSymbol("foo") !== "symbol") {
          return false;
        }
        if (typeof /* @__PURE__ */ Symbol("bar") !== "symbol") {
          return false;
        }
        return hasSymbolSham();
      };
    }
  });

  // node_modules/get-proto/Reflect.getPrototypeOf.js
  var require_Reflect_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Reflect.getPrototypeOf.js"(exports2, module2) {
      "use strict";
      module2.exports = typeof Reflect !== "undefined" && Reflect.getPrototypeOf || null;
    }
  });

  // node_modules/get-proto/Object.getPrototypeOf.js
  var require_Object_getPrototypeOf = __commonJS({
    "node_modules/get-proto/Object.getPrototypeOf.js"(exports2, module2) {
      "use strict";
      var $Object = require_es_object_atoms();
      module2.exports = $Object.getPrototypeOf || null;
    }
  });

  // node_modules/function-bind/implementation.js
  var require_implementation = __commonJS({
    "node_modules/function-bind/implementation.js"(exports2, module2) {
      "use strict";
      var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
      var toStr = Object.prototype.toString;
      var max2 = Math.max;
      var funcType = "[object Function]";
      var concatty = function concatty2(a, b) {
        var arr = [];
        for (var i = 0; i < a.length; i += 1) {
          arr[i] = a[i];
        }
        for (var j = 0; j < b.length; j += 1) {
          arr[j + a.length] = b[j];
        }
        return arr;
      };
      var slicy = function slicy2(arrLike, offset) {
        var arr = [];
        for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
          arr[j] = arrLike[i];
        }
        return arr;
      };
      var joiny = function(arr, joiner) {
        var str = "";
        for (var i = 0; i < arr.length; i += 1) {
          str += arr[i];
          if (i + 1 < arr.length) {
            str += joiner;
          }
        }
        return str;
      };
      module2.exports = function bind(that) {
        var target = this;
        if (typeof target !== "function" || toStr.apply(target) !== funcType) {
          throw new TypeError(ERROR_MESSAGE + target);
        }
        var args = slicy(arguments, 1);
        var bound;
        var binder = function() {
          if (this instanceof bound) {
            var result = target.apply(
              this,
              concatty(args, arguments)
            );
            if (Object(result) === result) {
              return result;
            }
            return this;
          }
          return target.apply(
            that,
            concatty(args, arguments)
          );
        };
        var boundLength = max2(0, target.length - args.length);
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
          boundArgs[i] = "$" + i;
        }
        bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
        if (target.prototype) {
          var Empty = function Empty2() {
          };
          Empty.prototype = target.prototype;
          bound.prototype = new Empty();
          Empty.prototype = null;
        }
        return bound;
      };
    }
  });

  // node_modules/function-bind/index.js
  var require_function_bind = __commonJS({
    "node_modules/function-bind/index.js"(exports2, module2) {
      "use strict";
      var implementation = require_implementation();
      module2.exports = Function.prototype.bind || implementation;
    }
  });

  // node_modules/call-bind-apply-helpers/functionCall.js
  var require_functionCall = __commonJS({
    "node_modules/call-bind-apply-helpers/functionCall.js"(exports2, module2) {
      "use strict";
      module2.exports = Function.prototype.call;
    }
  });

  // node_modules/call-bind-apply-helpers/functionApply.js
  var require_functionApply = __commonJS({
    "node_modules/call-bind-apply-helpers/functionApply.js"(exports2, module2) {
      "use strict";
      module2.exports = Function.prototype.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/reflectApply.js
  var require_reflectApply = __commonJS({
    "node_modules/call-bind-apply-helpers/reflectApply.js"(exports2, module2) {
      "use strict";
      module2.exports = typeof Reflect !== "undefined" && Reflect && Reflect.apply;
    }
  });

  // node_modules/call-bind-apply-helpers/actualApply.js
  var require_actualApply = __commonJS({
    "node_modules/call-bind-apply-helpers/actualApply.js"(exports2, module2) {
      "use strict";
      var bind = require_function_bind();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var $reflectApply = require_reflectApply();
      module2.exports = $reflectApply || bind.call($call, $apply);
    }
  });

  // node_modules/call-bind-apply-helpers/index.js
  var require_call_bind_apply_helpers = __commonJS({
    "node_modules/call-bind-apply-helpers/index.js"(exports2, module2) {
      "use strict";
      var bind = require_function_bind();
      var $TypeError = require_type();
      var $call = require_functionCall();
      var $actualApply = require_actualApply();
      module2.exports = function callBindBasic(args) {
        if (args.length < 1 || typeof args[0] !== "function") {
          throw new $TypeError("a function is required");
        }
        return $actualApply(bind, $call, args);
      };
    }
  });

  // node_modules/dunder-proto/get.js
  var require_get = __commonJS({
    "node_modules/dunder-proto/get.js"(exports2, module2) {
      "use strict";
      var callBind = require_call_bind_apply_helpers();
      var gOPD = require_gopd();
      var hasProtoAccessor;
      try {
        hasProtoAccessor = /** @type {{ __proto__?: typeof Array.prototype }} */
        [].__proto__ === Array.prototype;
      } catch (e) {
        if (!e || typeof e !== "object" || !("code" in e) || e.code !== "ERR_PROTO_ACCESS") {
          throw e;
        }
      }
      var desc = !!hasProtoAccessor && gOPD && gOPD(
        Object.prototype,
        /** @type {keyof typeof Object.prototype} */
        "__proto__"
      );
      var $Object = Object;
      var $getPrototypeOf = $Object.getPrototypeOf;
      module2.exports = desc && typeof desc.get === "function" ? callBind([desc.get]) : typeof $getPrototypeOf === "function" ? (
        /** @type {import('./get')} */
        function getDunder(value) {
          return $getPrototypeOf(value == null ? value : $Object(value));
        }
      ) : false;
    }
  });

  // node_modules/get-proto/index.js
  var require_get_proto = __commonJS({
    "node_modules/get-proto/index.js"(exports2, module2) {
      "use strict";
      var reflectGetProto = require_Reflect_getPrototypeOf();
      var originalGetProto = require_Object_getPrototypeOf();
      var getDunderProto = require_get();
      module2.exports = reflectGetProto ? function getProto(O) {
        return reflectGetProto(O);
      } : originalGetProto ? function getProto(O) {
        if (!O || typeof O !== "object" && typeof O !== "function") {
          throw new TypeError("getProto: not an object");
        }
        return originalGetProto(O);
      } : getDunderProto ? function getProto(O) {
        return getDunderProto(O);
      } : null;
    }
  });

  // node_modules/hasown/index.js
  var require_hasown = __commonJS({
    "node_modules/hasown/index.js"(exports2, module2) {
      "use strict";
      var call = Function.prototype.call;
      var $hasOwn = Object.prototype.hasOwnProperty;
      var bind = require_function_bind();
      module2.exports = bind.call(call, $hasOwn);
    }
  });

  // node_modules/get-intrinsic/index.js
  var require_get_intrinsic = __commonJS({
    "node_modules/get-intrinsic/index.js"(exports2, module2) {
      "use strict";
      var undefined2;
      var $Object = require_es_object_atoms();
      var $Error = require_es_errors();
      var $EvalError = require_eval();
      var $RangeError = require_range();
      var $ReferenceError = require_ref();
      var $SyntaxError = require_syntax();
      var $TypeError = require_type();
      var $URIError = require_uri();
      var abs = require_abs();
      var floor = require_floor();
      var max2 = require_max();
      var min = require_min();
      var pow = require_pow();
      var round = require_round();
      var sign = require_sign();
      var $Function = Function;
      var getEvalledConstructor = function(expressionSyntax) {
        try {
          return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
        } catch (e) {
        }
      };
      var $gOPD = require_gopd();
      var $defineProperty = require_es_define_property();
      var throwTypeError = function() {
        throw new $TypeError();
      };
      var ThrowTypeError = $gOPD ? (function() {
        try {
          arguments.callee;
          return throwTypeError;
        } catch (calleeThrows) {
          try {
            return $gOPD(arguments, "callee").get;
          } catch (gOPDthrows) {
            return throwTypeError;
          }
        }
      })() : throwTypeError;
      var hasSymbols = require_has_symbols()();
      var getProto = require_get_proto();
      var $ObjectGPO = require_Object_getPrototypeOf();
      var $ReflectGPO = require_Reflect_getPrototypeOf();
      var $apply = require_functionApply();
      var $call = require_functionCall();
      var needsEval = {};
      var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
      var INTRINSICS = {
        __proto__: null,
        "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
        "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
        "%AsyncFromSyncIteratorPrototype%": undefined2,
        "%AsyncFunction%": needsEval,
        "%AsyncGenerator%": needsEval,
        "%AsyncGeneratorFunction%": needsEval,
        "%AsyncIteratorPrototype%": needsEval,
        "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
        "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
        "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
        "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": $Error,
        "%eval%": eval,
        // eslint-disable-line no-eval
        "%EvalError%": $EvalError,
        "%Float16Array%": typeof Float16Array === "undefined" ? undefined2 : Float16Array,
        "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
        "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
        "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
        "%Function%": $Function,
        "%GeneratorFunction%": needsEval,
        "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
        "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
        "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
        "%JSON%": typeof JSON === "object" ? JSON : undefined2,
        "%Map%": typeof Map === "undefined" ? undefined2 : Map,
        "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": $Object,
        "%Object.getOwnPropertyDescriptor%": $gOPD,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
        "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
        "%RangeError%": $RangeError,
        "%ReferenceError%": $ReferenceError,
        "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": typeof Set === "undefined" ? undefined2 : Set,
        "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
        "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
        "%Symbol%": hasSymbols ? Symbol : undefined2,
        "%SyntaxError%": $SyntaxError,
        "%ThrowTypeError%": ThrowTypeError,
        "%TypedArray%": TypedArray,
        "%TypeError%": $TypeError,
        "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
        "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
        "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
        "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
        "%URIError%": $URIError,
        "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
        "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
        "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet,
        "%Function.prototype.call%": $call,
        "%Function.prototype.apply%": $apply,
        "%Object.defineProperty%": $defineProperty,
        "%Object.getPrototypeOf%": $ObjectGPO,
        "%Math.abs%": abs,
        "%Math.floor%": floor,
        "%Math.max%": max2,
        "%Math.min%": min,
        "%Math.pow%": pow,
        "%Math.round%": round,
        "%Math.sign%": sign,
        "%Reflect.getPrototypeOf%": $ReflectGPO
      };
      if (getProto) {
        try {
          null.error;
        } catch (e) {
          errorProto = getProto(getProto(e));
          INTRINSICS["%Error.prototype%"] = errorProto;
        }
      }
      var errorProto;
      var doEval = function doEval2(name) {
        var value;
        if (name === "%AsyncFunction%") {
          value = getEvalledConstructor("async function () {}");
        } else if (name === "%GeneratorFunction%") {
          value = getEvalledConstructor("function* () {}");
        } else if (name === "%AsyncGeneratorFunction%") {
          value = getEvalledConstructor("async function* () {}");
        } else if (name === "%AsyncGenerator%") {
          var fn = doEval2("%AsyncGeneratorFunction%");
          if (fn) {
            value = fn.prototype;
          }
        } else if (name === "%AsyncIteratorPrototype%") {
          var gen = doEval2("%AsyncGenerator%");
          if (gen && getProto) {
            value = getProto(gen.prototype);
          }
        }
        INTRINSICS[name] = value;
        return value;
      };
      var LEGACY_ALIASES = {
        __proto__: null,
        "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
        "%ArrayPrototype%": ["Array", "prototype"],
        "%ArrayProto_entries%": ["Array", "prototype", "entries"],
        "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
        "%ArrayProto_keys%": ["Array", "prototype", "keys"],
        "%ArrayProto_values%": ["Array", "prototype", "values"],
        "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
        "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
        "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
        "%BooleanPrototype%": ["Boolean", "prototype"],
        "%DataViewPrototype%": ["DataView", "prototype"],
        "%DatePrototype%": ["Date", "prototype"],
        "%ErrorPrototype%": ["Error", "prototype"],
        "%EvalErrorPrototype%": ["EvalError", "prototype"],
        "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
        "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
        "%FunctionPrototype%": ["Function", "prototype"],
        "%Generator%": ["GeneratorFunction", "prototype"],
        "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
        "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
        "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
        "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
        "%JSONParse%": ["JSON", "parse"],
        "%JSONStringify%": ["JSON", "stringify"],
        "%MapPrototype%": ["Map", "prototype"],
        "%NumberPrototype%": ["Number", "prototype"],
        "%ObjectPrototype%": ["Object", "prototype"],
        "%ObjProto_toString%": ["Object", "prototype", "toString"],
        "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
        "%PromisePrototype%": ["Promise", "prototype"],
        "%PromiseProto_then%": ["Promise", "prototype", "then"],
        "%Promise_all%": ["Promise", "all"],
        "%Promise_reject%": ["Promise", "reject"],
        "%Promise_resolve%": ["Promise", "resolve"],
        "%RangeErrorPrototype%": ["RangeError", "prototype"],
        "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
        "%RegExpPrototype%": ["RegExp", "prototype"],
        "%SetPrototype%": ["Set", "prototype"],
        "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
        "%StringPrototype%": ["String", "prototype"],
        "%SymbolPrototype%": ["Symbol", "prototype"],
        "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
        "%TypedArrayPrototype%": ["TypedArray", "prototype"],
        "%TypeErrorPrototype%": ["TypeError", "prototype"],
        "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
        "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
        "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
        "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
        "%URIErrorPrototype%": ["URIError", "prototype"],
        "%WeakMapPrototype%": ["WeakMap", "prototype"],
        "%WeakSetPrototype%": ["WeakSet", "prototype"]
      };
      var bind = require_function_bind();
      var hasOwn = require_hasown();
      var $concat = bind.call($call, Array.prototype.concat);
      var $spliceApply = bind.call($apply, Array.prototype.splice);
      var $replace = bind.call($call, String.prototype.replace);
      var $strSlice = bind.call($call, String.prototype.slice);
      var $exec = bind.call($call, RegExp.prototype.exec);
      var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
      var reEscapeChar = /\\(\\)?/g;
      var stringToPath = function stringToPath2(string) {
        var first = $strSlice(string, 0, 1);
        var last = $strSlice(string, -1);
        if (first === "%" && last !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
        } else if (last === "%" && first !== "%") {
          throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
        }
        var result = [];
        $replace(string, rePropName, function(match, number, quote, subString) {
          result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
        });
        return result;
      };
      var getBaseIntrinsic = function getBaseIntrinsic2(name, allowMissing) {
        var intrinsicName = name;
        var alias;
        if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
          alias = LEGACY_ALIASES[intrinsicName];
          intrinsicName = "%" + alias[0] + "%";
        }
        if (hasOwn(INTRINSICS, intrinsicName)) {
          var value = INTRINSICS[intrinsicName];
          if (value === needsEval) {
            value = doEval(intrinsicName);
          }
          if (typeof value === "undefined" && !allowMissing) {
            throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
          }
          return {
            alias,
            name: intrinsicName,
            value
          };
        }
        throw new $SyntaxError("intrinsic " + name + " does not exist!");
      };
      module2.exports = function GetIntrinsic(name, allowMissing) {
        if (typeof name !== "string" || name.length === 0) {
          throw new $TypeError("intrinsic name must be a non-empty string");
        }
        if (arguments.length > 1 && typeof allowMissing !== "boolean") {
          throw new $TypeError('"allowMissing" argument must be a boolean');
        }
        if ($exec(/^%?[^%]*%?$/, name) === null) {
          throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        }
        var parts = stringToPath(name);
        var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
        var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
        var intrinsicRealName = intrinsic.name;
        var value = intrinsic.value;
        var skipFurtherCaching = false;
        var alias = intrinsic.alias;
        if (alias) {
          intrinsicBaseName = alias[0];
          $spliceApply(parts, $concat([0, 1], alias));
        }
        for (var i = 1, isOwn = true; i < parts.length; i += 1) {
          var part = parts[i];
          var first = $strSlice(part, 0, 1);
          var last = $strSlice(part, -1);
          if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
            throw new $SyntaxError("property names with quotes must have matching quotes");
          }
          if (part === "constructor" || !isOwn) {
            skipFurtherCaching = true;
          }
          intrinsicBaseName += "." + part;
          intrinsicRealName = "%" + intrinsicBaseName + "%";
          if (hasOwn(INTRINSICS, intrinsicRealName)) {
            value = INTRINSICS[intrinsicRealName];
          } else if (value != null) {
            if (!(part in value)) {
              if (!allowMissing) {
                throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
              }
              return void undefined2;
            }
            if ($gOPD && i + 1 >= parts.length) {
              var desc = $gOPD(value, part);
              isOwn = !!desc;
              if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
                value = desc.get;
              } else {
                value = value[part];
              }
            } else {
              isOwn = hasOwn(value, part);
              value = value[part];
            }
            if (isOwn && !skipFurtherCaching) {
              INTRINSICS[intrinsicRealName] = value;
            }
          }
        }
        return value;
      };
    }
  });

  // node_modules/call-bound/index.js
  var require_call_bound = __commonJS({
    "node_modules/call-bound/index.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBindBasic = require_call_bind_apply_helpers();
      var $indexOf = callBindBasic([GetIntrinsic("%String.prototype.indexOf%")]);
      module2.exports = function callBoundIntrinsic(name, allowMissing) {
        var intrinsic = (
          /** @type {(this: unknown, ...args: unknown[]) => unknown} */
          GetIntrinsic(name, !!allowMissing)
        );
        if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
          return callBindBasic(
            /** @type {const} */
            [intrinsic]
          );
        }
        return intrinsic;
      };
    }
  });

  // node_modules/side-channel-map/index.js
  var require_side_channel_map = __commonJS({
    "node_modules/side-channel-map/index.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_call_bound();
      var inspect = require_object_inspect();
      var $TypeError = require_type();
      var $Map = GetIntrinsic("%Map%", true);
      var $mapGet = callBound("Map.prototype.get", true);
      var $mapSet = callBound("Map.prototype.set", true);
      var $mapHas = callBound("Map.prototype.has", true);
      var $mapDelete = callBound("Map.prototype.delete", true);
      var $mapSize = callBound("Map.prototype.size", true);
      module2.exports = !!$Map && /** @type {Exclude<import('.'), false>} */
      function getSideChannelMap() {
        var $m;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            if ($m) {
              var result = $mapDelete($m, key);
              if ($mapSize($m) === 0) {
                $m = void 0;
              }
              return result;
            }
            return false;
          },
          get: function(key) {
            if ($m) {
              return $mapGet($m, key);
            }
          },
          has: function(key) {
            if ($m) {
              return $mapHas($m, key);
            }
            return false;
          },
          set: function(key, value) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          }
        };
        return channel;
      };
    }
  });

  // node_modules/side-channel-weakmap/index.js
  var require_side_channel_weakmap = __commonJS({
    "node_modules/side-channel-weakmap/index.js"(exports2, module2) {
      "use strict";
      var GetIntrinsic = require_get_intrinsic();
      var callBound = require_call_bound();
      var inspect = require_object_inspect();
      var getSideChannelMap = require_side_channel_map();
      var $TypeError = require_type();
      var $WeakMap = GetIntrinsic("%WeakMap%", true);
      var $weakMapGet = callBound("WeakMap.prototype.get", true);
      var $weakMapSet = callBound("WeakMap.prototype.set", true);
      var $weakMapHas = callBound("WeakMap.prototype.has", true);
      var $weakMapDelete = callBound("WeakMap.prototype.delete", true);
      module2.exports = $WeakMap ? (
        /** @type {Exclude<import('.'), false>} */
        function getSideChannelWeakMap() {
          var $wm;
          var $m;
          var channel = {
            assert: function(key) {
              if (!channel.has(key)) {
                throw new $TypeError("Side channel does not contain " + inspect(key));
              }
            },
            "delete": function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapDelete($wm, key);
                }
              } else if (getSideChannelMap) {
                if ($m) {
                  return $m["delete"](key);
                }
              }
              return false;
            },
            get: function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapGet($wm, key);
                }
              }
              return $m && $m.get(key);
            },
            has: function(key) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if ($wm) {
                  return $weakMapHas($wm, key);
                }
              }
              return !!$m && $m.has(key);
            },
            set: function(key, value) {
              if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
                if (!$wm) {
                  $wm = new $WeakMap();
                }
                $weakMapSet($wm, key, value);
              } else if (getSideChannelMap) {
                if (!$m) {
                  $m = getSideChannelMap();
                }
                $m.set(key, value);
              }
            }
          };
          return channel;
        }
      ) : getSideChannelMap;
    }
  });

  // node_modules/side-channel/index.js
  var require_side_channel = __commonJS({
    "node_modules/side-channel/index.js"(exports2, module2) {
      "use strict";
      var $TypeError = require_type();
      var inspect = require_object_inspect();
      var getSideChannelList = require_side_channel_list();
      var getSideChannelMap = require_side_channel_map();
      var getSideChannelWeakMap = require_side_channel_weakmap();
      var makeChannel = getSideChannelWeakMap || getSideChannelMap || getSideChannelList;
      module2.exports = function getSideChannel() {
        var $channelData;
        var channel = {
          assert: function(key) {
            if (!channel.has(key)) {
              throw new $TypeError("Side channel does not contain " + inspect(key));
            }
          },
          "delete": function(key) {
            return !!$channelData && $channelData["delete"](key);
          },
          get: function(key) {
            return $channelData && $channelData.get(key);
          },
          has: function(key) {
            return !!$channelData && $channelData.has(key);
          },
          set: function(key, value) {
            if (!$channelData) {
              $channelData = makeChannel();
            }
            $channelData.set(key, value);
          }
        };
        return channel;
      };
    }
  });

  // node_modules/qs/lib/formats.js
  var require_formats = __commonJS({
    "node_modules/qs/lib/formats.js"(exports2, module2) {
      "use strict";
      var replace = String.prototype.replace;
      var percentTwenties = /%20/g;
      var Format = {
        RFC1738: "RFC1738",
        RFC3986: "RFC3986"
      };
      module2.exports = {
        "default": Format.RFC3986,
        formatters: {
          RFC1738: function(value) {
            return replace.call(value, percentTwenties, "+");
          },
          RFC3986: function(value) {
            return String(value);
          }
        },
        RFC1738: Format.RFC1738,
        RFC3986: Format.RFC3986
      };
    }
  });

  // node_modules/qs/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/qs/lib/utils.js"(exports2, module2) {
      "use strict";
      var formats = require_formats();
      var getSideChannel = require_side_channel();
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var overflowChannel = getSideChannel();
      var markOverflow = function markOverflow2(obj, maxIndex) {
        overflowChannel.set(obj, maxIndex);
        return obj;
      };
      var isOverflow = function isOverflow2(obj) {
        return overflowChannel.has(obj);
      };
      var getMaxIndex = function getMaxIndex2(obj) {
        return overflowChannel.get(obj);
      };
      var setMaxIndex = function setMaxIndex2(obj, maxIndex) {
        overflowChannel.set(obj, maxIndex);
      };
      var hexTable = (function() {
        var array = [];
        for (var i = 0; i < 256; ++i) {
          array[array.length] = "%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase();
        }
        return array;
      })();
      var compactQueue = function compactQueue2(queue) {
        while (queue.length > 1) {
          var item = queue.pop();
          var obj = item.obj[item.prop];
          if (isArray(obj)) {
            var compacted = [];
            for (var j = 0; j < obj.length; ++j) {
              if (typeof obj[j] !== "undefined") {
                compacted[compacted.length] = obj[j];
              }
            }
            item.obj[item.prop] = compacted;
          }
        }
      };
      var arrayToObject = function arrayToObject2(source, options) {
        var obj = options && options.plainObjects ? { __proto__: null } : {};
        for (var i = 0; i < source.length; ++i) {
          if (typeof source[i] !== "undefined") {
            obj[i] = source[i];
          }
        }
        return obj;
      };
      var merge = function merge2(target, source, options) {
        if (!source) {
          return target;
        }
        if (typeof source !== "object" && typeof source !== "function") {
          if (isArray(target)) {
            var nextIndex = target.length;
            if (options && typeof options.arrayLimit === "number" && nextIndex > options.arrayLimit) {
              return markOverflow(arrayToObject(target.concat(source), options), nextIndex);
            }
            target[nextIndex] = source;
          } else if (target && typeof target === "object") {
            if (isOverflow(target)) {
              var newIndex = getMaxIndex(target) + 1;
              target[newIndex] = source;
              setMaxIndex(target, newIndex);
            } else if (options && options.strictMerge) {
              return [target, source];
            } else if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
              target[source] = true;
            }
          } else {
            return [target, source];
          }
          return target;
        }
        if (!target || typeof target !== "object") {
          if (isOverflow(source)) {
            var sourceKeys = Object.keys(source);
            var result = options && options.plainObjects ? { __proto__: null, 0: target } : { 0: target };
            for (var m = 0; m < sourceKeys.length; m++) {
              var oldKey = parseInt(sourceKeys[m], 10);
              result[oldKey + 1] = source[sourceKeys[m]];
            }
            return markOverflow(result, getMaxIndex(source) + 1);
          }
          var combined = [target].concat(source);
          if (options && typeof options.arrayLimit === "number" && combined.length > options.arrayLimit) {
            return markOverflow(arrayToObject(combined, options), combined.length - 1);
          }
          return combined;
        }
        var mergeTarget = target;
        if (isArray(target) && !isArray(source)) {
          mergeTarget = arrayToObject(target, options);
        }
        if (isArray(target) && isArray(source)) {
          source.forEach(function(item, i) {
            if (has.call(target, i)) {
              var targetItem = target[i];
              if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
                target[i] = merge2(targetItem, item, options);
              } else {
                target[target.length] = item;
              }
            } else {
              target[i] = item;
            }
          });
          return target;
        }
        return Object.keys(source).reduce(function(acc, key) {
          var value = source[key];
          if (has.call(acc, key)) {
            acc[key] = merge2(acc[key], value, options);
          } else {
            acc[key] = value;
          }
          if (isOverflow(source) && !isOverflow(acc)) {
            markOverflow(acc, getMaxIndex(source));
          }
          if (isOverflow(acc)) {
            var keyNum = parseInt(key, 10);
            if (String(keyNum) === key && keyNum >= 0 && keyNum > getMaxIndex(acc)) {
              setMaxIndex(acc, keyNum);
            }
          }
          return acc;
        }, mergeTarget);
      };
      var assign = function assignSingleSource(target, source) {
        return Object.keys(source).reduce(function(acc, key) {
          acc[key] = source[key];
          return acc;
        }, target);
      };
      var decode = function(str, defaultDecoder, charset) {
        var strWithoutPlus = str.replace(/\+/g, " ");
        if (charset === "iso-8859-1") {
          return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
        }
        try {
          return decodeURIComponent(strWithoutPlus);
        } catch (e) {
          return strWithoutPlus;
        }
      };
      var limit = 1024;
      var encode = function encode2(str, defaultEncoder, charset, kind, format) {
        if (str.length === 0) {
          return str;
        }
        var string = str;
        if (typeof str === "symbol") {
          string = Symbol.prototype.toString.call(str);
        } else if (typeof str !== "string") {
          string = String(str);
        }
        if (charset === "iso-8859-1") {
          return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
            return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
          });
        }
        var out = "";
        for (var j = 0; j < string.length; j += limit) {
          var segment = string.length >= limit ? string.slice(j, j + limit) : string;
          var arr = [];
          for (var i = 0; i < segment.length; ++i) {
            var c = segment.charCodeAt(i);
            if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
              arr[arr.length] = segment.charAt(i);
              continue;
            }
            if (c < 128) {
              arr[arr.length] = hexTable[c];
              continue;
            }
            if (c < 2048) {
              arr[arr.length] = hexTable[192 | c >> 6] + hexTable[128 | c & 63];
              continue;
            }
            if (c < 55296 || c >= 57344) {
              arr[arr.length] = hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
              continue;
            }
            i += 1;
            c = 65536 + ((c & 1023) << 10 | segment.charCodeAt(i) & 1023);
            arr[arr.length] = hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
          }
          out += arr.join("");
        }
        return out;
      };
      var compact = function compact2(value) {
        var queue = [{ obj: { o: value }, prop: "o" }];
        var refs = [];
        for (var i = 0; i < queue.length; ++i) {
          var item = queue[i];
          var obj = item.obj[item.prop];
          var keys = Object.keys(obj);
          for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
              queue[queue.length] = { obj, prop: key };
              refs[refs.length] = val;
            }
          }
        }
        compactQueue(queue);
        return value;
      };
      var isRegExp = function isRegExp2(obj) {
        return Object.prototype.toString.call(obj) === "[object RegExp]";
      };
      var isBuffer = function isBuffer2(obj) {
        if (!obj || typeof obj !== "object") {
          return false;
        }
        return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
      };
      var combine = function combine2(a, b, arrayLimit, plainObjects) {
        if (isOverflow(a)) {
          var newIndex = getMaxIndex(a) + 1;
          a[newIndex] = b;
          setMaxIndex(a, newIndex);
          return a;
        }
        var result = [].concat(a, b);
        if (result.length > arrayLimit) {
          return markOverflow(arrayToObject(result, { plainObjects }), result.length - 1);
        }
        return result;
      };
      var maybeMap = function maybeMap2(val, fn) {
        if (isArray(val)) {
          var mapped = [];
          for (var i = 0; i < val.length; i += 1) {
            mapped[mapped.length] = fn(val[i]);
          }
          return mapped;
        }
        return fn(val);
      };
      module2.exports = {
        arrayToObject,
        assign,
        combine,
        compact,
        decode,
        encode,
        isBuffer,
        isOverflow,
        isRegExp,
        markOverflow,
        maybeMap,
        merge
      };
    }
  });

  // node_modules/qs/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/qs/lib/stringify.js"(exports2, module2) {
      "use strict";
      var getSideChannel = require_side_channel();
      var utils = require_utils();
      var formats = require_formats();
      var has = Object.prototype.hasOwnProperty;
      var arrayPrefixGenerators = {
        brackets: function brackets(prefix) {
          return prefix + "[]";
        },
        comma: "comma",
        indices: function indices(prefix, key) {
          return prefix + "[" + key + "]";
        },
        repeat: function repeat(prefix) {
          return prefix;
        }
      };
      var isArray = Array.isArray;
      var push2 = Array.prototype.push;
      var pushToArray = function(arr, valueOrArray) {
        push2.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
      };
      var toISO = Date.prototype.toISOString;
      var defaultFormat = formats["default"];
      var defaults = {
        addQueryPrefix: false,
        allowDots: false,
        allowEmptyArrays: false,
        arrayFormat: "indices",
        charset: "utf-8",
        charsetSentinel: false,
        commaRoundTrip: false,
        delimiter: "&",
        encode: true,
        encodeDotInKeys: false,
        encoder: utils.encode,
        encodeValuesOnly: false,
        filter: void 0,
        format: defaultFormat,
        formatter: formats.formatters[defaultFormat],
        // deprecated
        indices: false,
        serializeDate: function serializeDate(date) {
          return toISO.call(date);
        },
        skipNulls: false,
        strictNullHandling: false
      };
      var isNonNullishPrimitive = function isNonNullishPrimitive2(v) {
        return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
      };
      var sentinel = {};
      var stringify = function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, allowEmptyArrays, strictNullHandling, skipNulls, encodeDotInKeys, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
        var obj = object;
        var tmpSc = sideChannel;
        var step = 0;
        var findFlag = false;
        while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
          var pos = tmpSc.get(object);
          step += 1;
          if (typeof pos !== "undefined") {
            if (pos === step) {
              throw new RangeError("Cyclic object value");
            } else {
              findFlag = true;
            }
          }
          if (typeof tmpSc.get(sentinel) === "undefined") {
            step = 0;
          }
        }
        if (typeof filter === "function") {
          obj = filter(prefix, obj);
        } else if (obj instanceof Date) {
          obj = serializeDate(obj);
        } else if (generateArrayPrefix === "comma" && isArray(obj)) {
          obj = utils.maybeMap(obj, function(value2) {
            if (value2 instanceof Date) {
              return serializeDate(value2);
            }
            return value2;
          });
        }
        if (obj === null) {
          if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
          }
          obj = "";
        }
        if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
          if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
            return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
          }
          return [formatter(prefix) + "=" + formatter(String(obj))];
        }
        var values = [];
        if (typeof obj === "undefined") {
          return values;
        }
        var objKeys;
        if (generateArrayPrefix === "comma" && isArray(obj)) {
          if (encodeValuesOnly && encoder) {
            obj = utils.maybeMap(obj, encoder);
          }
          objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
        } else if (isArray(filter)) {
          objKeys = filter;
        } else {
          var keys = Object.keys(obj);
          objKeys = sort ? keys.sort(sort) : keys;
        }
        var encodedPrefix = encodeDotInKeys ? String(prefix).replace(/\./g, "%2E") : String(prefix);
        var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? encodedPrefix + "[]" : encodedPrefix;
        if (allowEmptyArrays && isArray(obj) && obj.length === 0) {
          return adjustedPrefix + "[]";
        }
        for (var j = 0; j < objKeys.length; ++j) {
          var key = objKeys[j];
          var value = typeof key === "object" && key && typeof key.value !== "undefined" ? key.value : obj[key];
          if (skipNulls && value === null) {
            continue;
          }
          var encodedKey = allowDots && encodeDotInKeys ? String(key).replace(/\./g, "%2E") : String(key);
          var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, encodedKey) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + encodedKey : "[" + encodedKey + "]");
          sideChannel.set(object, step);
          var valueSideChannel = getSideChannel();
          valueSideChannel.set(sentinel, sideChannel);
          pushToArray(values, stringify2(
            value,
            keyPrefix,
            generateArrayPrefix,
            commaRoundTrip,
            allowEmptyArrays,
            strictNullHandling,
            skipNulls,
            encodeDotInKeys,
            generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset,
            valueSideChannel
          ));
        }
        return values;
      };
      var normalizeStringifyOptions = function normalizeStringifyOptions2(opts) {
        if (!opts) {
          return defaults;
        }
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
          throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        }
        if (typeof opts.encodeDotInKeys !== "undefined" && typeof opts.encodeDotInKeys !== "boolean") {
          throw new TypeError("`encodeDotInKeys` option can only be `true` or `false`, when provided");
        }
        if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
          throw new TypeError("Encoder has to be a function.");
        }
        var charset = opts.charset || defaults.charset;
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        var format = formats["default"];
        if (typeof opts.format !== "undefined") {
          if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError("Unknown format option provided.");
          }
          format = opts.format;
        }
        var formatter = formats.formatters[format];
        var filter = defaults.filter;
        if (typeof opts.filter === "function" || isArray(opts.filter)) {
          filter = opts.filter;
        }
        var arrayFormat;
        if (opts.arrayFormat in arrayPrefixGenerators) {
          arrayFormat = opts.arrayFormat;
        } else if ("indices" in opts) {
          arrayFormat = opts.indices ? "indices" : "repeat";
        } else {
          arrayFormat = defaults.arrayFormat;
        }
        if ("commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
          throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        }
        var allowDots = typeof opts.allowDots === "undefined" ? opts.encodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
          addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
          arrayFormat,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          commaRoundTrip: !!opts.commaRoundTrip,
          delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
          encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
          encodeDotInKeys: typeof opts.encodeDotInKeys === "boolean" ? opts.encodeDotInKeys : defaults.encodeDotInKeys,
          encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
          encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
          filter,
          format,
          formatter,
          serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
          skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
          sort: typeof opts.sort === "function" ? opts.sort : null,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
        };
      };
      module2.exports = function(object, opts) {
        var obj = object;
        var options = normalizeStringifyOptions(opts);
        var objKeys;
        var filter;
        if (typeof options.filter === "function") {
          filter = options.filter;
          obj = filter("", obj);
        } else if (isArray(options.filter)) {
          filter = options.filter;
          objKeys = filter;
        }
        var keys = [];
        if (typeof obj !== "object" || obj === null) {
          return "";
        }
        var generateArrayPrefix = arrayPrefixGenerators[options.arrayFormat];
        var commaRoundTrip = generateArrayPrefix === "comma" && options.commaRoundTrip;
        if (!objKeys) {
          objKeys = Object.keys(obj);
        }
        if (options.sort) {
          objKeys.sort(options.sort);
        }
        var sideChannel = getSideChannel();
        for (var i = 0; i < objKeys.length; ++i) {
          var key = objKeys[i];
          var value = obj[key];
          if (options.skipNulls && value === null) {
            continue;
          }
          pushToArray(keys, stringify(
            value,
            key,
            generateArrayPrefix,
            commaRoundTrip,
            options.allowEmptyArrays,
            options.strictNullHandling,
            options.skipNulls,
            options.encodeDotInKeys,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset,
            sideChannel
          ));
        }
        var joined = keys.join(options.delimiter);
        var prefix = options.addQueryPrefix === true ? "?" : "";
        if (options.charsetSentinel) {
          if (options.charset === "iso-8859-1") {
            prefix += "utf8=%26%2310003%3B&";
          } else {
            prefix += "utf8=%E2%9C%93&";
          }
        }
        return joined.length > 0 ? prefix + joined : "";
      };
    }
  });

  // node_modules/qs/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/qs/lib/parse.js"(exports2, module2) {
      "use strict";
      var utils = require_utils();
      var has = Object.prototype.hasOwnProperty;
      var isArray = Array.isArray;
      var defaults = {
        allowDots: false,
        allowEmptyArrays: false,
        allowPrototypes: false,
        allowSparse: false,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: false,
        comma: false,
        decodeDotInKeys: false,
        decoder: utils.decode,
        delimiter: "&",
        depth: 5,
        duplicates: "combine",
        ignoreQueryPrefix: false,
        interpretNumericEntities: false,
        parameterLimit: 1e3,
        parseArrays: true,
        plainObjects: false,
        strictDepth: false,
        strictMerge: true,
        strictNullHandling: false,
        throwOnLimitExceeded: false
      };
      var interpretNumericEntities = function(str) {
        return str.replace(/&#(\d+);/g, function($0, numberStr) {
          return String.fromCharCode(parseInt(numberStr, 10));
        });
      };
      var parseArrayValue = function(val, options, currentArrayLength) {
        if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
          return val.split(",");
        }
        if (options.throwOnLimitExceeded && currentArrayLength >= options.arrayLimit) {
          throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
        }
        return val;
      };
      var isoSentinel = "utf8=%26%2310003%3B";
      var charsetSentinel = "utf8=%E2%9C%93";
      var parseValues = function parseQueryStringValues(str, options) {
        var obj = { __proto__: null };
        var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
        cleanStr = cleanStr.replace(/%5B/gi, "[").replace(/%5D/gi, "]");
        var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
        var parts = cleanStr.split(
          options.delimiter,
          options.throwOnLimitExceeded && typeof limit !== "undefined" ? limit + 1 : limit
        );
        if (options.throwOnLimitExceeded && typeof limit !== "undefined" && parts.length > limit) {
          throw new RangeError("Parameter limit exceeded. Only " + limit + " parameter" + (limit === 1 ? "" : "s") + " allowed.");
        }
        var skipIndex = -1;
        var i;
        var charset = options.charset;
        if (options.charsetSentinel) {
          for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf("utf8=") === 0) {
              if (parts[i] === charsetSentinel) {
                charset = "utf-8";
              } else if (parts[i] === isoSentinel) {
                charset = "iso-8859-1";
              }
              skipIndex = i;
              i = parts.length;
            }
          }
        }
        for (i = 0; i < parts.length; ++i) {
          if (i === skipIndex) {
            continue;
          }
          var part = parts[i];
          var bracketEqualsPos = part.indexOf("]=");
          var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
          var key;
          var val;
          if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, "key");
            val = options.strictNullHandling ? null : "";
          } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
            if (key !== null) {
              val = utils.maybeMap(
                parseArrayValue(
                  part.slice(pos + 1),
                  options,
                  isArray(obj[key]) ? obj[key].length : 0
                ),
                function(encodedVal) {
                  return options.decoder(encodedVal, defaults.decoder, charset, "value");
                }
              );
            }
          }
          if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
            val = interpretNumericEntities(String(val));
          }
          if (part.indexOf("[]=") > -1) {
            val = isArray(val) ? [val] : val;
          }
          if (options.comma && isArray(val) && val.length > options.arrayLimit) {
            if (options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            }
            val = utils.combine([], val, options.arrayLimit, options.plainObjects);
          }
          if (key !== null) {
            var existing = has.call(obj, key);
            if (existing && (options.duplicates === "combine" || part.indexOf("[]=") > -1)) {
              obj[key] = utils.combine(
                obj[key],
                val,
                options.arrayLimit,
                options.plainObjects
              );
            } else if (!existing || options.duplicates === "last") {
              obj[key] = val;
            }
          }
        }
        return obj;
      };
      var parseObject = function(chain, val, options, valuesParsed) {
        var currentArrayLength = 0;
        if (chain.length > 0 && chain[chain.length - 1] === "[]") {
          var parentKey = chain.slice(0, -1).join("");
          currentArrayLength = Array.isArray(val) && val[parentKey] ? val[parentKey].length : 0;
        }
        var leaf = valuesParsed ? val : parseArrayValue(val, options, currentArrayLength);
        for (var i = chain.length - 1; i >= 0; --i) {
          var obj;
          var root = chain[i];
          if (root === "[]" && options.parseArrays) {
            if (utils.isOverflow(leaf)) {
              obj = leaf;
            } else {
              obj = options.allowEmptyArrays && (leaf === "" || options.strictNullHandling && leaf === null) ? [] : utils.combine(
                [],
                leaf,
                options.arrayLimit,
                options.plainObjects
              );
            }
          } else {
            obj = options.plainObjects ? { __proto__: null } : {};
            var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
            var decodedRoot = options.decodeDotInKeys ? cleanRoot.replace(/%2E/g, ".") : cleanRoot;
            var index2 = parseInt(decodedRoot, 10);
            var isValidArrayIndex = !isNaN(index2) && root !== decodedRoot && String(index2) === decodedRoot && index2 >= 0 && options.parseArrays;
            if (!options.parseArrays && decodedRoot === "") {
              obj = { 0: leaf };
            } else if (isValidArrayIndex && index2 < options.arrayLimit) {
              obj = [];
              obj[index2] = leaf;
            } else if (isValidArrayIndex && options.throwOnLimitExceeded) {
              throw new RangeError("Array limit exceeded. Only " + options.arrayLimit + " element" + (options.arrayLimit === 1 ? "" : "s") + " allowed in an array.");
            } else if (isValidArrayIndex) {
              obj[index2] = leaf;
              utils.markOverflow(obj, index2);
            } else if (decodedRoot !== "__proto__") {
              obj[decodedRoot] = leaf;
            }
          }
          leaf = obj;
        }
        return leaf;
      };
      var splitKeyIntoSegments = function splitKeyIntoSegments2(givenKey, options) {
        var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
        if (options.depth <= 0) {
          if (!options.plainObjects && has.call(Object.prototype, key)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          return [key];
        }
        var brackets = /(\[[^[\]]*])/;
        var child = /(\[[^[\]]*])/g;
        var segment = brackets.exec(key);
        var parent = segment ? key.slice(0, segment.index) : key;
        var keys = [];
        if (parent) {
          if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys[keys.length] = parent;
        }
        var i = 0;
        while ((segment = child.exec(key)) !== null && i < options.depth) {
          i += 1;
          var segmentContent = segment[1].slice(1, -1);
          if (!options.plainObjects && has.call(Object.prototype, segmentContent)) {
            if (!options.allowPrototypes) {
              return;
            }
          }
          keys[keys.length] = segment[1];
        }
        if (segment) {
          if (options.strictDepth === true) {
            throw new RangeError("Input depth exceeded depth option of " + options.depth + " and strictDepth is true");
          }
          keys[keys.length] = "[" + key.slice(segment.index) + "]";
        }
        return keys;
      };
      var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
        if (!givenKey) {
          return;
        }
        var keys = splitKeyIntoSegments(givenKey, options);
        if (!keys) {
          return;
        }
        return parseObject(keys, val, options, valuesParsed);
      };
      var normalizeParseOptions = function normalizeParseOptions2(opts) {
        if (!opts) {
          return defaults;
        }
        if (typeof opts.allowEmptyArrays !== "undefined" && typeof opts.allowEmptyArrays !== "boolean") {
          throw new TypeError("`allowEmptyArrays` option can only be `true` or `false`, when provided");
        }
        if (typeof opts.decodeDotInKeys !== "undefined" && typeof opts.decodeDotInKeys !== "boolean") {
          throw new TypeError("`decodeDotInKeys` option can only be `true` or `false`, when provided");
        }
        if (opts.decoder !== null && typeof opts.decoder !== "undefined" && typeof opts.decoder !== "function") {
          throw new TypeError("Decoder has to be a function.");
        }
        if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
          throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
        }
        if (typeof opts.throwOnLimitExceeded !== "undefined" && typeof opts.throwOnLimitExceeded !== "boolean") {
          throw new TypeError("`throwOnLimitExceeded` option must be a boolean");
        }
        var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
        var duplicates = typeof opts.duplicates === "undefined" ? defaults.duplicates : opts.duplicates;
        if (duplicates !== "combine" && duplicates !== "first" && duplicates !== "last") {
          throw new TypeError("The duplicates option must be either combine, first, or last");
        }
        var allowDots = typeof opts.allowDots === "undefined" ? opts.decodeDotInKeys === true ? true : defaults.allowDots : !!opts.allowDots;
        return {
          allowDots,
          allowEmptyArrays: typeof opts.allowEmptyArrays === "boolean" ? !!opts.allowEmptyArrays : defaults.allowEmptyArrays,
          allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
          allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
          arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
          charset,
          charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
          comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
          decodeDotInKeys: typeof opts.decodeDotInKeys === "boolean" ? opts.decodeDotInKeys : defaults.decodeDotInKeys,
          decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
          delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
          // eslint-disable-next-line no-implicit-coercion, no-extra-parens
          depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
          duplicates,
          ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
          interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
          parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
          parseArrays: opts.parseArrays !== false,
          plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
          strictDepth: typeof opts.strictDepth === "boolean" ? !!opts.strictDepth : defaults.strictDepth,
          strictMerge: typeof opts.strictMerge === "boolean" ? !!opts.strictMerge : defaults.strictMerge,
          strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling,
          throwOnLimitExceeded: typeof opts.throwOnLimitExceeded === "boolean" ? opts.throwOnLimitExceeded : false
        };
      };
      module2.exports = function(str, opts) {
        var options = normalizeParseOptions(opts);
        if (str === "" || str === null || typeof str === "undefined") {
          return options.plainObjects ? { __proto__: null } : {};
        }
        var tempObj = typeof str === "string" ? parseValues(str, options) : str;
        var obj = options.plainObjects ? { __proto__: null } : {};
        var keys = Object.keys(tempObj);
        for (var i = 0; i < keys.length; ++i) {
          var key = keys[i];
          var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
          obj = utils.merge(obj, newObj, options);
        }
        if (options.allowSparse === true) {
          return obj;
        }
        return utils.compact(obj);
      };
    }
  });

  // node_modules/qs/lib/index.js
  var require_lib = __commonJS({
    "node_modules/qs/lib/index.js"(exports2, module2) {
      "use strict";
      var stringify = require_stringify();
      var parse = require_parse();
      var formats = require_formats();
      module2.exports = {
        formats,
        parse,
        stringify
      };
    }
  });

  // node_modules/@protobufjs/aspromise/index.js
  var require_aspromise = __commonJS({
    "node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
      "use strict";
      module2.exports = asPromise;
      function asPromise(fn, ctx) {
        var params = new Array(arguments.length - 1), offset = 0, index2 = 2, pending = true;
        while (index2 < arguments.length)
          params[offset++] = arguments[index2++];
        return new Promise(function executor(resolve, reject) {
          params[offset] = function callback(err2) {
            if (pending) {
              pending = false;
              if (err2)
                reject(err2);
              else {
                var params2 = new Array(arguments.length - 1), offset2 = 0;
                while (offset2 < params2.length)
                  params2[offset2++] = arguments[offset2];
                resolve.apply(null, params2);
              }
            }
          };
          try {
            fn.apply(ctx || null, params);
          } catch (err2) {
            if (pending) {
              pending = false;
              reject(err2);
            }
          }
        });
      }
    }
  });

  // node_modules/@protobufjs/base64/index.js
  var require_base64 = __commonJS({
    "node_modules/@protobufjs/base64/index.js"(exports2) {
      "use strict";
      var base64 = exports2;
      base64.length = function length(string) {
        var p = string.length;
        if (!p)
          return 0;
        var n = 0;
        while (--p % 4 > 1 && string.charAt(p) === "=")
          ++n;
        return Math.ceil(string.length * 3) / 4 - n;
      };
      var b64 = new Array(64);
      var s64 = new Array(123);
      for (i = 0; i < 64; )
        s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
      var i;
      base64.encode = function encode(buffer, start, end) {
        var parts = null, chunk = [];
        var i2 = 0, j = 0, t;
        while (start < end) {
          var b = buffer[start++];
          switch (j) {
            case 0:
              chunk[i2++] = b64[b >> 2];
              t = (b & 3) << 4;
              j = 1;
              break;
            case 1:
              chunk[i2++] = b64[t | b >> 4];
              t = (b & 15) << 2;
              j = 2;
              break;
            case 2:
              chunk[i2++] = b64[t | b >> 6];
              chunk[i2++] = b64[b & 63];
              j = 0;
              break;
          }
          if (i2 > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i2 = 0;
          }
        }
        if (j) {
          chunk[i2++] = b64[t];
          chunk[i2++] = 61;
          if (j === 1)
            chunk[i2++] = 61;
        }
        if (parts) {
          if (i2)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i2));
      };
      var invalidEncoding = "invalid encoding";
      base64.decode = function decode(string, buffer, offset) {
        var start = offset;
        var j = 0, t;
        for (var i2 = 0; i2 < string.length; ) {
          var c = string.charCodeAt(i2++);
          if (c === 61 && j > 1)
            break;
          if ((c = s64[c]) === void 0)
            throw Error(invalidEncoding);
          switch (j) {
            case 0:
              t = c;
              j = 1;
              break;
            case 1:
              buffer[offset++] = t << 2 | (c & 48) >> 4;
              t = c;
              j = 2;
              break;
            case 2:
              buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
              t = c;
              j = 3;
              break;
            case 3:
              buffer[offset++] = (t & 3) << 6 | c;
              j = 0;
              break;
          }
        }
        if (j === 1)
          throw Error(invalidEncoding);
        return offset - start;
      };
      base64.test = function test(string) {
        return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string);
      };
    }
  });

  // node_modules/@protobufjs/eventemitter/index.js
  var require_eventemitter = __commonJS({
    "node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
      "use strict";
      module2.exports = EventEmitter;
      function EventEmitter() {
        this._listeners = {};
      }
      EventEmitter.prototype.on = function on(evt, fn, ctx) {
        (this._listeners[evt] || (this._listeners[evt] = [])).push({
          fn,
          ctx: ctx || this
        });
        return this;
      };
      EventEmitter.prototype.off = function off(evt, fn) {
        if (evt === void 0)
          this._listeners = {};
        else {
          if (fn === void 0)
            this._listeners[evt] = [];
          else {
            var listeners = this._listeners[evt];
            for (var i = 0; i < listeners.length; )
              if (listeners[i].fn === fn)
                listeners.splice(i, 1);
              else
                ++i;
          }
        }
        return this;
      };
      EventEmitter.prototype.emit = function emit(evt) {
        var listeners = this._listeners[evt];
        if (listeners) {
          var args = [], i = 1;
          for (; i < arguments.length; )
            args.push(arguments[i++]);
          for (i = 0; i < listeners.length; )
            listeners[i].fn.apply(listeners[i++].ctx, args);
        }
        return this;
      };
    }
  });

  // node_modules/@protobufjs/float/index.js
  var require_float = __commonJS({
    "node_modules/@protobufjs/float/index.js"(exports2, module2) {
      "use strict";
      module2.exports = factory(factory);
      function factory(exports3) {
        if (typeof Float32Array !== "undefined") (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
        else (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
        if (typeof Float64Array !== "undefined") (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
        else (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? (
                /* positive */
                0
              ) : (
                /* negative 0 */
                2147483648
              ), buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
        return exports3;
      }
      function writeUintLE(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      function writeUintBE(val, buf, pos) {
        buf[pos] = val >>> 24;
        buf[pos + 1] = val >>> 16 & 255;
        buf[pos + 2] = val >>> 8 & 255;
        buf[pos + 3] = val & 255;
      }
      function readUintLE(buf, pos) {
        return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
      }
      function readUintBE(buf, pos) {
        return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
      }
    }
  });

  // node_modules/@protobufjs/inquire/index.js
  var require_inquire = __commonJS({
    "node_modules/@protobufjs/inquire/index.js"(exports, module) {
      "use strict";
      module.exports = inquire;
      function inquire(moduleName) {
        try {
          var mod = eval("quire".replace(/^/, "re"))(moduleName);
          if (mod && (mod.length || Object.keys(mod).length))
            return mod;
        } catch (e) {
        }
        return null;
      }
    }
  });

  // node_modules/@protobufjs/utf8/index.js
  var require_utf8 = __commonJS({
    "node_modules/@protobufjs/utf8/index.js"(exports2) {
      "use strict";
      var utf8 = exports2;
      utf8.length = function utf8_length(string) {
        var len = 0, c = 0;
        for (var i = 0; i < string.length; ++i) {
          c = string.charCodeAt(i);
          if (c < 128)
            len += 1;
          else if (c < 2048)
            len += 2;
          else if ((c & 64512) === 55296 && (string.charCodeAt(i + 1) & 64512) === 56320) {
            ++i;
            len += 4;
          } else
            len += 3;
        }
        return len;
      };
      utf8.read = function utf8_read(buffer, start, end) {
        var len = end - start;
        if (len < 1)
          return "";
        var parts = null, chunk = [], i = 0, t;
        while (start < end) {
          t = buffer[start++];
          if (t < 128)
            chunk[i++] = t;
          else if (t > 191 && t < 224)
            chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
          else if (t > 239 && t < 365) {
            t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
            chunk[i++] = 55296 + (t >> 10);
            chunk[i++] = 56320 + (t & 1023);
          } else
            chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
          if (i > 8191) {
            (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
            i = 0;
          }
        }
        if (parts) {
          if (i)
            parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
          return parts.join("");
        }
        return String.fromCharCode.apply(String, chunk.slice(0, i));
      };
      utf8.write = function utf8_write(string, buffer, offset) {
        var start = offset, c1, c2;
        for (var i = 0; i < string.length; ++i) {
          c1 = string.charCodeAt(i);
          if (c1 < 128) {
            buffer[offset++] = c1;
          } else if (c1 < 2048) {
            buffer[offset++] = c1 >> 6 | 192;
            buffer[offset++] = c1 & 63 | 128;
          } else if ((c1 & 64512) === 55296 && ((c2 = string.charCodeAt(i + 1)) & 64512) === 56320) {
            c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
            ++i;
            buffer[offset++] = c1 >> 18 | 240;
            buffer[offset++] = c1 >> 12 & 63 | 128;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          } else {
            buffer[offset++] = c1 >> 12 | 224;
            buffer[offset++] = c1 >> 6 & 63 | 128;
            buffer[offset++] = c1 & 63 | 128;
          }
        }
        return offset - start;
      };
    }
  });

  // node_modules/@protobufjs/pool/index.js
  var require_pool = __commonJS({
    "node_modules/@protobufjs/pool/index.js"(exports2, module2) {
      "use strict";
      module2.exports = pool;
      function pool(alloc, slice, size) {
        var SIZE = size || 8192;
        var MAX = SIZE >>> 1;
        var slab = null;
        var offset = SIZE;
        return function pool_alloc(size2) {
          if (size2 < 1 || size2 > MAX)
            return alloc(size2);
          if (offset + size2 > SIZE) {
            slab = alloc(SIZE);
            offset = 0;
          }
          var buf = slice.call(slab, offset, offset += size2);
          if (offset & 7)
            offset = (offset | 7) + 1;
          return buf;
        };
      }
    }
  });

  // node_modules/protobufjs/src/util/longbits.js
  var require_longbits = __commonJS({
    "node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
      "use strict";
      module2.exports = LongBits;
      var util = require_minimal();
      function LongBits(lo, hi) {
        this.lo = lo >>> 0;
        this.hi = hi >>> 0;
      }
      var zero = LongBits.zero = new LongBits(0, 0);
      zero.toNumber = function() {
        return 0;
      };
      zero.zzEncode = zero.zzDecode = function() {
        return this;
      };
      zero.length = function() {
        return 1;
      };
      var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
      LongBits.fromNumber = function fromNumber(value) {
        if (value === 0)
          return zero;
        var sign = value < 0;
        if (sign)
          value = -value;
        var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
        if (sign) {
          hi = ~hi >>> 0;
          lo = ~lo >>> 0;
          if (++lo > 4294967295) {
            lo = 0;
            if (++hi > 4294967295)
              hi = 0;
          }
        }
        return new LongBits(lo, hi);
      };
      LongBits.from = function from(value) {
        if (typeof value === "number")
          return LongBits.fromNumber(value);
        if (util.isString(value)) {
          if (util.Long)
            value = util.Long.fromString(value);
          else
            return LongBits.fromNumber(parseInt(value, 10));
        }
        return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
      };
      LongBits.prototype.toNumber = function toNumber(unsigned) {
        if (!unsigned && this.hi >>> 31) {
          var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
          if (!lo)
            hi = hi + 1 >>> 0;
          return -(lo + hi * 4294967296);
        }
        return this.lo + this.hi * 4294967296;
      };
      LongBits.prototype.toLong = function toLong(unsigned) {
        return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
      };
      var charCodeAt = String.prototype.charCodeAt;
      LongBits.fromHash = function fromHash(hash) {
        if (hash === zeroHash)
          return zero;
        return new LongBits(
          (charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0,
          (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0
        );
      };
      LongBits.prototype.toHash = function toHash() {
        return String.fromCharCode(
          this.lo & 255,
          this.lo >>> 8 & 255,
          this.lo >>> 16 & 255,
          this.lo >>> 24,
          this.hi & 255,
          this.hi >>> 8 & 255,
          this.hi >>> 16 & 255,
          this.hi >>> 24
        );
      };
      LongBits.prototype.zzEncode = function zzEncode() {
        var mask = this.hi >> 31;
        this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
        this.lo = (this.lo << 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.zzDecode = function zzDecode() {
        var mask = -(this.lo & 1);
        this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
        this.hi = (this.hi >>> 1 ^ mask) >>> 0;
        return this;
      };
      LongBits.prototype.length = function length() {
        var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
        return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
      };
    }
  });

  // node_modules/protobufjs/src/util/minimal.js
  var require_minimal = __commonJS({
    "node_modules/protobufjs/src/util/minimal.js"(exports2) {
      "use strict";
      var util = exports2;
      util.asPromise = require_aspromise();
      util.base64 = require_base64();
      util.EventEmitter = require_eventemitter();
      util.float = require_float();
      util.inquire = require_inquire();
      util.utf8 = require_utf8();
      util.pool = require_pool();
      util.LongBits = require_longbits();
      util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
      util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
      util.emptyArray = Object.freeze ? Object.freeze([]) : (
        /* istanbul ignore next */
        []
      );
      util.emptyObject = Object.freeze ? Object.freeze({}) : (
        /* istanbul ignore next */
        {}
      );
      util.isInteger = Number.isInteger || /* istanbul ignore next */
      function isInteger(value) {
        return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
      };
      util.isString = function isString(value) {
        return typeof value === "string" || value instanceof String;
      };
      util.isObject = function isObject(value) {
        return value && typeof value === "object";
      };
      util.isset = /**
       * Checks if a property on a message is considered to be present.
       * @param {Object} obj Plain object or message instance
       * @param {string} prop Property name
       * @returns {boolean} `true` if considered to be present, otherwise `false`
       */
      util.isSet = function isSet(obj, prop) {
        var value = obj[prop];
        if (value != null && obj.hasOwnProperty(prop))
          return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
        return false;
      };
      util.Buffer = (function() {
        try {
          var Buffer2 = util.inquire("buffer").Buffer;
          return Buffer2.prototype.utf8Write ? Buffer2 : (
            /* istanbul ignore next */
            null
          );
        } catch (e) {
          return null;
        }
      })();
      util._Buffer_from = null;
      util._Buffer_allocUnsafe = null;
      util.newBuffer = function newBuffer(sizeOrArray) {
        return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
      };
      util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      util.Long = /* istanbul ignore next */
      util.global.dcodeIO && /* istanbul ignore next */
      util.global.dcodeIO.Long || /* istanbul ignore next */
      util.global.Long || util.inquire("long");
      util.key2Re = /^true|false|0|1$/;
      util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
      util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
      util.longToHash = function longToHash(value) {
        return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
      };
      util.longFromHash = function longFromHash(hash, unsigned) {
        var bits2 = util.LongBits.fromHash(hash);
        if (util.Long)
          return util.Long.fromBits(bits2.lo, bits2.hi, unsigned);
        return bits2.toNumber(Boolean(unsigned));
      };
      function merge(dst, src, ifNotSet) {
        for (var keys = Object.keys(src), i = 0; i < keys.length; ++i)
          if (dst[keys[i]] === void 0 || !ifNotSet)
            dst[keys[i]] = src[keys[i]];
        return dst;
      }
      util.merge = merge;
      util.lcFirst = function lcFirst(str) {
        return str.charAt(0).toLowerCase() + str.substring(1);
      };
      function newError(name) {
        function CustomError(message, properties) {
          if (!(this instanceof CustomError))
            return new CustomError(message, properties);
          Object.defineProperty(this, "message", { get: function() {
            return message;
          } });
          if (Error.captureStackTrace)
            Error.captureStackTrace(this, CustomError);
          else
            Object.defineProperty(this, "stack", { value: new Error().stack || "" });
          if (properties)
            merge(this, properties);
        }
        CustomError.prototype = Object.create(Error.prototype, {
          constructor: {
            value: CustomError,
            writable: true,
            enumerable: false,
            configurable: true
          },
          name: {
            get: function get() {
              return name;
            },
            set: void 0,
            enumerable: false,
            // configurable: false would accurately preserve the behavior of
            // the original, but I'm guessing that was not intentional.
            // For an actual error subclass, this property would
            // be configurable.
            configurable: true
          },
          toString: {
            value: function value() {
              return this.name + ": " + this.message;
            },
            writable: true,
            enumerable: false,
            configurable: true
          }
        });
        return CustomError;
      }
      util.newError = newError;
      util.ProtocolError = newError("ProtocolError");
      util.oneOfGetter = function getOneOf(fieldNames) {
        var fieldMap = {};
        for (var i = 0; i < fieldNames.length; ++i)
          fieldMap[fieldNames[i]] = 1;
        return function() {
          for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
            if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
              return keys[i2];
        };
      };
      util.oneOfSetter = function setOneOf(fieldNames) {
        return function(name) {
          for (var i = 0; i < fieldNames.length; ++i)
            if (fieldNames[i] !== name)
              delete this[fieldNames[i]];
        };
      };
      util.toJSONOptions = {
        longs: String,
        enums: String,
        bytes: String,
        json: true
      };
      util._configure = function() {
        var Buffer2 = util.Buffer;
        if (!Buffer2) {
          util._Buffer_from = util._Buffer_allocUnsafe = null;
          return;
        }
        util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || /* istanbul ignore next */
        function Buffer_from(value, encoding) {
          return new Buffer2(value, encoding);
        };
        util._Buffer_allocUnsafe = Buffer2.allocUnsafe || /* istanbul ignore next */
        function Buffer_allocUnsafe(size) {
          return new Buffer2(size);
        };
      };
    }
  });

  // node_modules/protobufjs/src/writer.js
  var require_writer = __commonJS({
    "node_modules/protobufjs/src/writer.js"(exports2, module2) {
      "use strict";
      module2.exports = Writer;
      var util = require_minimal();
      var BufferWriter;
      var LongBits = util.LongBits;
      var base64 = util.base64;
      var utf8 = util.utf8;
      function Op(fn, len, val) {
        this.fn = fn;
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      function noop() {
      }
      function State(writer) {
        this.head = writer.head;
        this.tail = writer.tail;
        this.len = writer.len;
        this.next = writer.states;
      }
      function Writer() {
        this.len = 0;
        this.head = new Op(noop, 0, 0);
        this.tail = this.head;
        this.states = null;
      }
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup() {
          return (Writer.create = function create_buffer() {
            return new BufferWriter();
          })();
        } : function create_array() {
          return new Writer();
        };
      };
      Writer.create = create();
      Writer.alloc = function alloc(size) {
        return new util.Array(size);
      };
      if (util.Array !== Array)
        Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
      Writer.prototype._push = function push2(fn, len, val) {
        this.tail = this.tail.next = new Op(fn, len, val);
        this.len += len;
        return this;
      };
      function writeByte(val, buf, pos) {
        buf[pos] = val & 255;
      }
      function writeVarint32(val, buf, pos) {
        while (val > 127) {
          buf[pos++] = val & 127 | 128;
          val >>>= 7;
        }
        buf[pos] = val;
      }
      function VarintOp(len, val) {
        this.len = len;
        this.next = void 0;
        this.val = val;
      }
      VarintOp.prototype = Object.create(Op.prototype);
      VarintOp.prototype.fn = writeVarint32;
      Writer.prototype.uint32 = function write_uint32(value) {
        this.len += (this.tail = this.tail.next = new VarintOp(
          (value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5,
          value
        )).len;
        return this;
      };
      Writer.prototype.int32 = function write_int32(value) {
        return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
      };
      Writer.prototype.sint32 = function write_sint32(value) {
        return this.uint32((value << 1 ^ value >> 31) >>> 0);
      };
      function writeVarint64(val, buf, pos) {
        while (val.hi) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
          val.hi >>>= 7;
        }
        while (val.lo > 127) {
          buf[pos++] = val.lo & 127 | 128;
          val.lo = val.lo >>> 7;
        }
        buf[pos++] = val.lo;
      }
      Writer.prototype.uint64 = function write_uint64(value) {
        var bits2 = LongBits.from(value);
        return this._push(writeVarint64, bits2.length(), bits2);
      };
      Writer.prototype.int64 = Writer.prototype.uint64;
      Writer.prototype.sint64 = function write_sint64(value) {
        var bits2 = LongBits.from(value).zzEncode();
        return this._push(writeVarint64, bits2.length(), bits2);
      };
      Writer.prototype.bool = function write_bool(value) {
        return this._push(writeByte, 1, value ? 1 : 0);
      };
      function writeFixed32(val, buf, pos) {
        buf[pos] = val & 255;
        buf[pos + 1] = val >>> 8 & 255;
        buf[pos + 2] = val >>> 16 & 255;
        buf[pos + 3] = val >>> 24;
      }
      Writer.prototype.fixed32 = function write_fixed32(value) {
        return this._push(writeFixed32, 4, value >>> 0);
      };
      Writer.prototype.sfixed32 = Writer.prototype.fixed32;
      Writer.prototype.fixed64 = function write_fixed64(value) {
        var bits2 = LongBits.from(value);
        return this._push(writeFixed32, 4, bits2.lo)._push(writeFixed32, 4, bits2.hi);
      };
      Writer.prototype.sfixed64 = Writer.prototype.fixed64;
      Writer.prototype.float = function write_float(value) {
        return this._push(util.float.writeFloatLE, 4, value);
      };
      Writer.prototype.double = function write_double(value) {
        return this._push(util.float.writeDoubleLE, 8, value);
      };
      var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytes_for(val, buf, pos) {
        for (var i = 0; i < val.length; ++i)
          buf[pos + i] = val[i];
      };
      Writer.prototype.bytes = function write_bytes(value) {
        var len = value.length >>> 0;
        if (!len)
          return this._push(writeByte, 1, 0);
        if (util.isString(value)) {
          var buf = Writer.alloc(len = base64.length(value));
          base64.decode(value, buf, 0);
          value = buf;
        }
        return this.uint32(len)._push(writeBytes, len, value);
      };
      Writer.prototype.string = function write_string(value) {
        var len = utf8.length(value);
        return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
      };
      Writer.prototype.fork = function fork() {
        this.states = new State(this);
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
        return this;
      };
      Writer.prototype.reset = function reset() {
        if (this.states) {
          this.head = this.states.head;
          this.tail = this.states.tail;
          this.len = this.states.len;
          this.states = this.states.next;
        } else {
          this.head = this.tail = new Op(noop, 0, 0);
          this.len = 0;
        }
        return this;
      };
      Writer.prototype.ldelim = function ldelim() {
        var head = this.head, tail = this.tail, len = this.len;
        this.reset().uint32(len);
        if (len) {
          this.tail.next = head.next;
          this.tail = tail;
          this.len += len;
        }
        return this;
      };
      Writer.prototype.finish = function finish() {
        var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
        while (head) {
          head.fn(head.val, buf, pos);
          pos += head.len;
          head = head.next;
        }
        return buf;
      };
      Writer._configure = function(BufferWriter_) {
        BufferWriter = BufferWriter_;
        Writer.create = create();
        BufferWriter._configure();
      };
    }
  });

  // node_modules/protobufjs/src/writer_buffer.js
  var require_writer_buffer = __commonJS({
    "node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferWriter;
      var Writer = require_writer();
      (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
      var util = require_minimal();
      function BufferWriter() {
        Writer.call(this);
      }
      BufferWriter._configure = function() {
        BufferWriter.alloc = util._Buffer_allocUnsafe;
        BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
          buf.set(val, pos);
        } : function writeBytesBuffer_copy(val, buf, pos) {
          if (val.copy)
            val.copy(buf, pos, 0, val.length);
          else for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
        };
      };
      BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
        if (util.isString(value))
          value = util._Buffer_from(value, "base64");
        var len = value.length >>> 0;
        this.uint32(len);
        if (len)
          this._push(BufferWriter.writeBytesBuffer, len, value);
        return this;
      };
      function writeStringBuffer(val, buf, pos) {
        if (val.length < 40)
          util.utf8.write(val, buf, pos);
        else if (buf.utf8Write)
          buf.utf8Write(val, pos);
        else
          buf.write(val, pos);
      }
      BufferWriter.prototype.string = function write_string_buffer(value) {
        var len = util.Buffer.byteLength(value);
        this.uint32(len);
        if (len)
          this._push(writeStringBuffer, len, value);
        return this;
      };
      BufferWriter._configure();
    }
  });

  // node_modules/protobufjs/src/reader.js
  var require_reader = __commonJS({
    "node_modules/protobufjs/src/reader.js"(exports2, module2) {
      "use strict";
      module2.exports = Reader;
      var util = require_minimal();
      var BufferReader;
      var LongBits = util.LongBits;
      var utf8 = util.utf8;
      function indexOutOfRange(reader, writeLength) {
        return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
      }
      function Reader(buffer) {
        this.buf = buffer;
        this.pos = 0;
        this.len = buffer.length;
      }
      var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
        if (buffer instanceof Uint8Array || Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      } : function create_array2(buffer) {
        if (Array.isArray(buffer))
          return new Reader(buffer);
        throw Error("illegal buffer");
      };
      var create = function create2() {
        return util.Buffer ? function create_buffer_setup(buffer) {
          return (Reader.create = function create_buffer(buffer2) {
            return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
          })(buffer);
        } : create_array;
      };
      Reader.create = create();
      Reader.prototype._slice = util.Array.prototype.subarray || /* istanbul ignore next */
      util.Array.prototype.slice;
      Reader.prototype.uint32 = /* @__PURE__ */ (function read_uint32_setup() {
        var value = 4294967295;
        return function read_uint32() {
          value = (this.buf[this.pos] & 127) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
          if (this.buf[this.pos++] < 128) return value;
          if ((this.pos += 5) > this.len) {
            this.pos = this.len;
            throw indexOutOfRange(this, 10);
          }
          return value;
        };
      })();
      Reader.prototype.int32 = function read_int32() {
        return this.uint32() | 0;
      };
      Reader.prototype.sint32 = function read_sint32() {
        var value = this.uint32();
        return value >>> 1 ^ -(value & 1) | 0;
      };
      function readLongVarint() {
        var bits2 = new LongBits(0, 0);
        var i = 0;
        if (this.len - this.pos > 4) {
          for (; i < 4; ++i) {
            bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits2;
          }
          bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
          bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits2;
          i = 0;
        } else {
          for (; i < 3; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits2.lo = (bits2.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits2;
          }
          bits2.lo = (bits2.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
          return bits2;
        }
        if (this.len - this.pos > 4) {
          for (; i < 5; ++i) {
            bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits2;
          }
        } else {
          for (; i < 5; ++i) {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
            bits2.hi = (bits2.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
            if (this.buf[this.pos++] < 128)
              return bits2;
          }
        }
        throw Error("invalid varint encoding");
      }
      Reader.prototype.bool = function read_bool() {
        return this.uint32() !== 0;
      };
      function readFixed32_end(buf, end) {
        return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
      }
      Reader.prototype.fixed32 = function read_fixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4);
      };
      Reader.prototype.sfixed32 = function read_sfixed32() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        return readFixed32_end(this.buf, this.pos += 4) | 0;
      };
      function readFixed64() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 8);
        return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
      }
      Reader.prototype.float = function read_float() {
        if (this.pos + 4 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readFloatLE(this.buf, this.pos);
        this.pos += 4;
        return value;
      };
      Reader.prototype.double = function read_double() {
        if (this.pos + 8 > this.len)
          throw indexOutOfRange(this, 4);
        var value = util.float.readDoubleLE(this.buf, this.pos);
        this.pos += 8;
        return value;
      };
      Reader.prototype.bytes = function read_bytes() {
        var length = this.uint32(), start = this.pos, end = this.pos + length;
        if (end > this.len)
          throw indexOutOfRange(this, length);
        this.pos += length;
        if (Array.isArray(this.buf))
          return this.buf.slice(start, end);
        if (start === end) {
          var nativeBuffer = util.Buffer;
          return nativeBuffer ? nativeBuffer.alloc(0) : new this.buf.constructor(0);
        }
        return this._slice.call(this.buf, start, end);
      };
      Reader.prototype.string = function read_string() {
        var bytes = this.bytes();
        return utf8.read(bytes, 0, bytes.length);
      };
      Reader.prototype.skip = function skip(length) {
        if (typeof length === "number") {
          if (this.pos + length > this.len)
            throw indexOutOfRange(this, length);
          this.pos += length;
        } else {
          do {
            if (this.pos >= this.len)
              throw indexOutOfRange(this);
          } while (this.buf[this.pos++] & 128);
        }
        return this;
      };
      Reader.prototype.skipType = function(wireType) {
        switch (wireType) {
          case 0:
            this.skip();
            break;
          case 1:
            this.skip(8);
            break;
          case 2:
            this.skip(this.uint32());
            break;
          case 3:
            while ((wireType = this.uint32() & 7) !== 4) {
              this.skipType(wireType);
            }
            break;
          case 5:
            this.skip(4);
            break;
          /* istanbul ignore next */
          default:
            throw Error("invalid wire type " + wireType + " at offset " + this.pos);
        }
        return this;
      };
      Reader._configure = function(BufferReader_) {
        BufferReader = BufferReader_;
        Reader.create = create();
        BufferReader._configure();
        var fn = util.Long ? "toLong" : (
          /* istanbul ignore next */
          "toNumber"
        );
        util.merge(Reader.prototype, {
          int64: function read_int64() {
            return readLongVarint.call(this)[fn](false);
          },
          uint64: function read_uint64() {
            return readLongVarint.call(this)[fn](true);
          },
          sint64: function read_sint64() {
            return readLongVarint.call(this).zzDecode()[fn](false);
          },
          fixed64: function read_fixed64() {
            return readFixed64.call(this)[fn](true);
          },
          sfixed64: function read_sfixed64() {
            return readFixed64.call(this)[fn](false);
          }
        });
      };
    }
  });

  // node_modules/protobufjs/src/reader_buffer.js
  var require_reader_buffer = __commonJS({
    "node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
      "use strict";
      module2.exports = BufferReader;
      var Reader = require_reader();
      (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
      var util = require_minimal();
      function BufferReader(buffer) {
        Reader.call(this, buffer);
      }
      BufferReader._configure = function() {
        if (util.Buffer)
          BufferReader.prototype._slice = util.Buffer.prototype.slice;
      };
      BufferReader.prototype.string = function read_string_buffer() {
        var len = this.uint32();
        return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
      };
      BufferReader._configure();
    }
  });

  // node_modules/protobufjs/src/rpc/service.js
  var require_service = __commonJS({
    "node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var util = require_minimal();
      (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
      function Service(rpcImpl, requestDelimited, responseDelimited) {
        if (typeof rpcImpl !== "function")
          throw TypeError("rpcImpl must be a function");
        util.EventEmitter.call(this);
        this.rpcImpl = rpcImpl;
        this.requestDelimited = Boolean(requestDelimited);
        this.responseDelimited = Boolean(responseDelimited);
      }
      Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
        if (!request)
          throw TypeError("request must be specified");
        var self2 = this;
        if (!callback)
          return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
        if (!self2.rpcImpl) {
          setTimeout(function() {
            callback(Error("already ended"));
          }, 0);
          return void 0;
        }
        try {
          return self2.rpcImpl(
            method,
            requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(),
            function rpcCallback(err2, response) {
              if (err2) {
                self2.emit("error", err2, method);
                return callback(err2);
              }
              if (response === null) {
                self2.end(
                  /* endedByRPC */
                  true
                );
                return void 0;
              }
              if (!(response instanceof responseCtor)) {
                try {
                  response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
                } catch (err3) {
                  self2.emit("error", err3, method);
                  return callback(err3);
                }
              }
              self2.emit("data", response, method);
              return callback(null, response);
            }
          );
        } catch (err2) {
          self2.emit("error", err2, method);
          setTimeout(function() {
            callback(err2);
          }, 0);
          return void 0;
        }
      };
      Service.prototype.end = function end(endedByRPC) {
        if (this.rpcImpl) {
          if (!endedByRPC)
            this.rpcImpl(null, null, null);
          this.rpcImpl = null;
          this.emit("end").off();
        }
        return this;
      };
    }
  });

  // node_modules/protobufjs/src/rpc.js
  var require_rpc = __commonJS({
    "node_modules/protobufjs/src/rpc.js"(exports2) {
      "use strict";
      var rpc = exports2;
      rpc.Service = require_service();
    }
  });

  // node_modules/protobufjs/src/roots.js
  var require_roots = __commonJS({
    "node_modules/protobufjs/src/roots.js"(exports2, module2) {
      "use strict";
      module2.exports = {};
    }
  });

  // node_modules/protobufjs/src/index-minimal.js
  var require_index_minimal = __commonJS({
    "node_modules/protobufjs/src/index-minimal.js"(exports2) {
      "use strict";
      var protobuf = exports2;
      protobuf.build = "minimal";
      protobuf.Writer = require_writer();
      protobuf.BufferWriter = require_writer_buffer();
      protobuf.Reader = require_reader();
      protobuf.BufferReader = require_reader_buffer();
      protobuf.util = require_minimal();
      protobuf.rpc = require_rpc();
      protobuf.roots = require_roots();
      protobuf.configure = configure;
      function configure() {
        protobuf.util._configure();
        protobuf.Writer._configure(protobuf.BufferWriter);
        protobuf.Reader._configure(protobuf.BufferReader);
      }
      configure();
    }
  });

  // node_modules/@protobufjs/codegen/index.js
  var require_codegen = __commonJS({
    "node_modules/@protobufjs/codegen/index.js"(exports2, module2) {
      "use strict";
      module2.exports = codegen;
      function codegen(functionParams, functionName) {
        if (typeof functionParams === "string") {
          functionName = functionParams;
          functionParams = void 0;
        }
        var body = [];
        function Codegen(formatStringOrScope) {
          if (typeof formatStringOrScope !== "string") {
            var source = toString();
            if (codegen.verbose)
              console.log("codegen: " + source);
            source = "return " + source;
            if (formatStringOrScope) {
              var scopeKeys = Object.keys(formatStringOrScope), scopeParams = new Array(scopeKeys.length + 1), scopeValues = new Array(scopeKeys.length), scopeOffset = 0;
              while (scopeOffset < scopeKeys.length) {
                scopeParams[scopeOffset] = scopeKeys[scopeOffset];
                scopeValues[scopeOffset] = formatStringOrScope[scopeKeys[scopeOffset++]];
              }
              scopeParams[scopeOffset] = source;
              return Function.apply(null, scopeParams).apply(null, scopeValues);
            }
            return Function(source)();
          }
          var formatParams = new Array(arguments.length - 1), formatOffset = 0;
          while (formatOffset < formatParams.length)
            formatParams[formatOffset] = arguments[++formatOffset];
          formatOffset = 0;
          formatStringOrScope = formatStringOrScope.replace(/%([%dfijs])/g, function replace($0, $1) {
            var value = formatParams[formatOffset++];
            switch ($1) {
              case "d":
              case "f":
                return String(Number(value));
              case "i":
                return String(Math.floor(value));
              case "j":
                return JSON.stringify(value);
              case "s":
                return String(value);
            }
            return "%";
          });
          if (formatOffset !== formatParams.length)
            throw Error("parameter count mismatch");
          body.push(formatStringOrScope);
          return Codegen;
        }
        function toString(functionNameOverride) {
          return "function " + (functionNameOverride || functionName || "") + "(" + (functionParams && functionParams.join(",") || "") + "){\n  " + body.join("\n  ") + "\n}";
        }
        Codegen.toString = toString;
        return Codegen;
      }
      codegen.verbose = false;
    }
  });

  // node_modules/@protobufjs/fetch/index.js
  var require_fetch = __commonJS({
    "node_modules/@protobufjs/fetch/index.js"(exports2, module2) {
      "use strict";
      module2.exports = fetch;
      var asPromise = require_aspromise();
      var inquire2 = require_inquire();
      var fs = inquire2("fs");
      function fetch(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = {};
        } else if (!options)
          options = {};
        if (!callback)
          return asPromise(fetch, this, filename, options);
        if (!options.xhr && fs && fs.readFile)
          return fs.readFile(filename, function fetchReadFileCallback(err2, contents) {
            return err2 && typeof XMLHttpRequest !== "undefined" ? fetch.xhr(filename, options, callback) : err2 ? callback(err2) : callback(null, options.binary ? contents : contents.toString("utf8"));
          });
        return fetch.xhr(filename, options, callback);
      }
      fetch.xhr = function fetch_xhr(filename, options, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function fetchOnReadyStateChange() {
          if (xhr.readyState !== 4)
            return void 0;
          if (xhr.status !== 0 && xhr.status !== 200)
            return callback(Error("status " + xhr.status));
          if (options.binary) {
            var buffer = xhr.response;
            if (!buffer) {
              buffer = [];
              for (var i = 0; i < xhr.responseText.length; ++i)
                buffer.push(xhr.responseText.charCodeAt(i) & 255);
            }
            return callback(null, typeof Uint8Array !== "undefined" ? new Uint8Array(buffer) : buffer);
          }
          return callback(null, xhr.responseText);
        };
        if (options.binary) {
          if ("overrideMimeType" in xhr)
            xhr.overrideMimeType("text/plain; charset=x-user-defined");
          xhr.responseType = "arraybuffer";
        }
        xhr.open("GET", filename);
        xhr.send();
      };
    }
  });

  // node_modules/@protobufjs/path/index.js
  var require_path = __commonJS({
    "node_modules/@protobufjs/path/index.js"(exports2) {
      "use strict";
      var path = exports2;
      var isAbsolute = (
        /**
         * Tests if the specified path is absolute.
         * @param {string} path Path to test
         * @returns {boolean} `true` if path is absolute
         */
        path.isAbsolute = function isAbsolute2(path2) {
          return /^(?:\/|\w+:)/.test(path2);
        }
      );
      var normalize = (
        /**
         * Normalizes the specified path.
         * @param {string} path Path to normalize
         * @returns {string} Normalized path
         */
        path.normalize = function normalize2(path2) {
          path2 = path2.replace(/\\/g, "/").replace(/\/{2,}/g, "/");
          var parts = path2.split("/"), absolute = isAbsolute(path2), prefix = "";
          if (absolute)
            prefix = parts.shift() + "/";
          for (var i = 0; i < parts.length; ) {
            if (parts[i] === "..") {
              if (i > 0 && parts[i - 1] !== "..")
                parts.splice(--i, 2);
              else if (absolute)
                parts.splice(i, 1);
              else
                ++i;
            } else if (parts[i] === ".")
              parts.splice(i, 1);
            else
              ++i;
          }
          return prefix + parts.join("/");
        }
      );
      path.resolve = function resolve(originPath, includePath, alreadyNormalized) {
        if (!alreadyNormalized)
          includePath = normalize(includePath);
        if (isAbsolute(includePath))
          return includePath;
        if (!alreadyNormalized)
          originPath = normalize(originPath);
        return (originPath = originPath.replace(/(?:\/|^)[^/]+$/, "")).length ? normalize(originPath + "/" + includePath) : includePath;
      };
    }
  });

  // node_modules/protobufjs/src/namespace.js
  var require_namespace = __commonJS({
    "node_modules/protobufjs/src/namespace.js"(exports2, module2) {
      "use strict";
      module2.exports = Namespace;
      var ReflectionObject = require_object();
      ((Namespace.prototype = Object.create(ReflectionObject.prototype)).constructor = Namespace).className = "Namespace";
      var Field = require_field();
      var util = require_util2();
      var OneOf = require_oneof();
      var Type;
      var Service;
      var Enum;
      Namespace.fromJSON = function fromJSON(name, json) {
        return new Namespace(name, json.options).addJSON(json.nested);
      };
      function arrayToJSON(array, toJSONOptions) {
        if (!(array && array.length))
          return void 0;
        var obj = {};
        for (var i = 0; i < array.length; ++i)
          obj[array[i].name] = array[i].toJSON(toJSONOptions);
        return obj;
      }
      Namespace.arrayToJSON = arrayToJSON;
      Namespace.isReservedId = function isReservedId(reserved, id) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i)
            if (typeof reserved[i] !== "string" && reserved[i][0] <= id && reserved[i][1] > id)
              return true;
        }
        return false;
      };
      Namespace.isReservedName = function isReservedName(reserved, name) {
        if (reserved) {
          for (var i = 0; i < reserved.length; ++i)
            if (reserved[i] === name)
              return true;
        }
        return false;
      };
      function Namespace(name, options) {
        ReflectionObject.call(this, name, options);
        this.nested = void 0;
        this._nestedArray = null;
        this._lookupCache = {};
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
      }
      function clearCache(namespace) {
        namespace._nestedArray = null;
        namespace._lookupCache = {};
        var parent = namespace;
        while (parent = parent.parent) {
          parent._lookupCache = {};
        }
        return namespace;
      }
      Object.defineProperty(Namespace.prototype, "nestedArray", {
        get: function() {
          return this._nestedArray || (this._nestedArray = util.toArray(this.nested));
        }
      });
      Namespace.prototype.toJSON = function toJSON(toJSONOptions) {
        return util.toObject([
          "options",
          this.options,
          "nested",
          arrayToJSON(this.nestedArray, toJSONOptions)
        ]);
      };
      Namespace.prototype.addJSON = function addJSON(nestedJson) {
        var ns = this;
        if (nestedJson) {
          for (var names = Object.keys(nestedJson), i = 0, nested; i < names.length; ++i) {
            nested = nestedJson[names[i]];
            ns.add(
              // most to least likely
              (nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : nested.id !== void 0 ? Field.fromJSON : Namespace.fromJSON)(names[i], nested)
            );
          }
        }
        return this;
      };
      Namespace.prototype.get = function get(name) {
        return this.nested && this.nested[name] || null;
      };
      Namespace.prototype.getEnum = function getEnum(name) {
        if (this.nested && this.nested[name] instanceof Enum)
          return this.nested[name].values;
        throw Error("no such enum: " + name);
      };
      Namespace.prototype.add = function add(object) {
        if (!(object instanceof Field && object.extend !== void 0 || object instanceof Type || object instanceof OneOf || object instanceof Enum || object instanceof Service || object instanceof Namespace))
          throw TypeError("object must be a valid nested object");
        if (!this.nested)
          this.nested = {};
        else {
          var prev = this.get(object.name);
          if (prev) {
            if (prev instanceof Namespace && object instanceof Namespace && !(prev instanceof Type || prev instanceof Service)) {
              var nested = prev.nestedArray;
              for (var i = 0; i < nested.length; ++i)
                object.add(nested[i]);
              this.remove(prev);
              if (!this.nested)
                this.nested = {};
              object.setOptions(prev.options, true);
            } else
              throw Error("duplicate name '" + object.name + "' in " + this);
          }
        }
        this.nested[object.name] = object;
        if (!(this instanceof Type || this instanceof Service || this instanceof Enum || this instanceof Field)) {
          if (!object._edition) {
            object._edition = object._defaultEdition;
          }
        }
        this._needsRecursiveFeatureResolution = true;
        this._needsRecursiveResolve = true;
        var parent = this;
        while (parent = parent.parent) {
          parent._needsRecursiveFeatureResolution = true;
          parent._needsRecursiveResolve = true;
        }
        object.onAdd(this);
        return clearCache(this);
      };
      Namespace.prototype.remove = function remove(object) {
        if (!(object instanceof ReflectionObject))
          throw TypeError("object must be a ReflectionObject");
        if (object.parent !== this)
          throw Error(object + " is not a member of " + this);
        delete this.nested[object.name];
        if (!Object.keys(this.nested).length)
          this.nested = void 0;
        object.onRemove(this);
        return clearCache(this);
      };
      Namespace.prototype.define = function define(path, json) {
        if (util.isString(path))
          path = path.split(".");
        else if (!Array.isArray(path))
          throw TypeError("illegal path");
        if (path && path.length && path[0] === "")
          throw Error("path must be relative");
        var ptr = this;
        while (path.length > 0) {
          var part = path.shift();
          if (ptr.nested && ptr.nested[part]) {
            ptr = ptr.nested[part];
            if (!(ptr instanceof Namespace))
              throw Error("path conflicts with non-namespace objects");
          } else
            ptr.add(ptr = new Namespace(part));
        }
        if (json)
          ptr.addJSON(json);
        return ptr;
      };
      Namespace.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        this._resolveFeaturesRecursive(this._edition);
        var nested = this.nestedArray, i = 0;
        this.resolve();
        while (i < nested.length)
          if (nested[i] instanceof Namespace)
            nested[i++].resolveAll();
          else
            nested[i++].resolve();
        this._needsRecursiveResolve = false;
        return this;
      };
      Namespace.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        this._needsRecursiveFeatureResolution = false;
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeaturesRecursive.call(this, edition);
        this.nestedArray.forEach((nested) => {
          nested._resolveFeaturesRecursive(edition);
        });
        return this;
      };
      Namespace.prototype.lookup = function lookup(path, filterTypes, parentAlreadyChecked) {
        if (typeof filterTypes === "boolean") {
          parentAlreadyChecked = filterTypes;
          filterTypes = void 0;
        } else if (filterTypes && !Array.isArray(filterTypes))
          filterTypes = [filterTypes];
        if (util.isString(path) && path.length) {
          if (path === ".")
            return this.root;
          path = path.split(".");
        } else if (!path.length)
          return this;
        var flatPath = path.join(".");
        if (path[0] === "")
          return this.root.lookup(path.slice(1), filterTypes);
        var found = this.root._fullyQualifiedObjects && this.root._fullyQualifiedObjects["." + flatPath];
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        found = this._lookupImpl(path, flatPath);
        if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
          return found;
        }
        if (parentAlreadyChecked)
          return null;
        var current = this;
        while (current.parent) {
          found = current.parent._lookupImpl(path, flatPath);
          if (found && (!filterTypes || filterTypes.indexOf(found.constructor) > -1)) {
            return found;
          }
          current = current.parent;
        }
        return null;
      };
      Namespace.prototype._lookupImpl = function lookup(path, flatPath) {
        if (Object.prototype.hasOwnProperty.call(this._lookupCache, flatPath)) {
          return this._lookupCache[flatPath];
        }
        var found = this.get(path[0]);
        var exact = null;
        if (found) {
          if (path.length === 1) {
            exact = found;
          } else if (found instanceof Namespace) {
            path = path.slice(1);
            exact = found._lookupImpl(path, path.join("."));
          }
        } else {
          for (var i = 0; i < this.nestedArray.length; ++i)
            if (this._nestedArray[i] instanceof Namespace && (found = this._nestedArray[i]._lookupImpl(path, flatPath)))
              exact = found;
        }
        this._lookupCache[flatPath] = exact;
        return exact;
      };
      Namespace.prototype.lookupType = function lookupType(path) {
        var found = this.lookup(path, [Type]);
        if (!found)
          throw Error("no such type: " + path);
        return found;
      };
      Namespace.prototype.lookupEnum = function lookupEnum(path) {
        var found = this.lookup(path, [Enum]);
        if (!found)
          throw Error("no such Enum '" + path + "' in " + this);
        return found;
      };
      Namespace.prototype.lookupTypeOrEnum = function lookupTypeOrEnum(path) {
        var found = this.lookup(path, [Type, Enum]);
        if (!found)
          throw Error("no such Type or Enum '" + path + "' in " + this);
        return found;
      };
      Namespace.prototype.lookupService = function lookupService(path) {
        var found = this.lookup(path, [Service]);
        if (!found)
          throw Error("no such Service '" + path + "' in " + this);
        return found;
      };
      Namespace._configure = function(Type_, Service_, Enum_) {
        Type = Type_;
        Service = Service_;
        Enum = Enum_;
      };
    }
  });

  // node_modules/protobufjs/src/mapfield.js
  var require_mapfield = __commonJS({
    "node_modules/protobufjs/src/mapfield.js"(exports2, module2) {
      "use strict";
      module2.exports = MapField;
      var Field = require_field();
      ((MapField.prototype = Object.create(Field.prototype)).constructor = MapField).className = "MapField";
      var types = require_types();
      var util = require_util2();
      function MapField(name, id, keyType, type, options, comment) {
        Field.call(this, name, id, type, void 0, void 0, options, comment);
        if (!util.isString(keyType))
          throw TypeError("keyType must be a string");
        this.keyType = keyType;
        this.resolvedKeyType = null;
        this.map = true;
      }
      MapField.fromJSON = function fromJSON(name, json) {
        return new MapField(name, json.id, json.keyType, json.type, json.options, json.comment);
      };
      MapField.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "keyType",
          this.keyType,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      MapField.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if (types.mapKey[this.keyType] === void 0)
          throw Error("invalid key type: " + this.keyType);
        return Field.prototype.resolve.call(this);
      };
      MapField.d = function decorateMapField(fieldId, fieldKeyType, fieldValueType) {
        if (typeof fieldValueType === "function")
          fieldValueType = util.decorateType(fieldValueType).name;
        else if (fieldValueType && typeof fieldValueType === "object")
          fieldValueType = util.decorateEnum(fieldValueType).name;
        return function mapFieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new MapField(fieldName, fieldId, fieldKeyType, fieldValueType));
        };
      };
    }
  });

  // node_modules/protobufjs/src/method.js
  var require_method = __commonJS({
    "node_modules/protobufjs/src/method.js"(exports2, module2) {
      "use strict";
      module2.exports = Method;
      var ReflectionObject = require_object();
      ((Method.prototype = Object.create(ReflectionObject.prototype)).constructor = Method).className = "Method";
      var util = require_util2();
      function Method(name, type, requestType, responseType, requestStream, responseStream, options, comment, parsedOptions) {
        if (util.isObject(requestStream)) {
          options = requestStream;
          requestStream = responseStream = void 0;
        } else if (util.isObject(responseStream)) {
          options = responseStream;
          responseStream = void 0;
        }
        if (!(type === void 0 || util.isString(type)))
          throw TypeError("type must be a string");
        if (!util.isString(requestType))
          throw TypeError("requestType must be a string");
        if (!util.isString(responseType))
          throw TypeError("responseType must be a string");
        ReflectionObject.call(this, name, options);
        this.type = type || "rpc";
        this.requestType = requestType;
        this.requestStream = requestStream ? true : void 0;
        this.responseType = responseType;
        this.responseStream = responseStream ? true : void 0;
        this.resolvedRequestType = null;
        this.resolvedResponseType = null;
        this.comment = comment;
        this.parsedOptions = parsedOptions;
      }
      Method.fromJSON = function fromJSON(name, json) {
        return new Method(name, json.type, json.requestType, json.responseType, json.requestStream, json.responseStream, json.options, json.comment, json.parsedOptions);
      };
      Method.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "type",
          this.type !== "rpc" && /* istanbul ignore next */
          this.type || void 0,
          "requestType",
          this.requestType,
          "requestStream",
          this.requestStream,
          "responseType",
          this.responseType,
          "responseStream",
          this.responseStream,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0,
          "parsedOptions",
          this.parsedOptions
        ]);
      };
      Method.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        this.resolvedRequestType = this.parent.lookupType(this.requestType);
        this.resolvedResponseType = this.parent.lookupType(this.responseType);
        return ReflectionObject.prototype.resolve.call(this);
      };
    }
  });

  // node_modules/protobufjs/src/service.js
  var require_service2 = __commonJS({
    "node_modules/protobufjs/src/service.js"(exports2, module2) {
      "use strict";
      module2.exports = Service;
      var Namespace = require_namespace();
      ((Service.prototype = Object.create(Namespace.prototype)).constructor = Service).className = "Service";
      var Method = require_method();
      var util = require_util2();
      var rpc = require_rpc();
      function Service(name, options) {
        Namespace.call(this, name, options);
        this.methods = {};
        this._methodsArray = null;
      }
      Service.fromJSON = function fromJSON(name, json) {
        var service = new Service(name, json.options);
        if (json.methods)
          for (var names = Object.keys(json.methods), i = 0; i < names.length; ++i)
            service.add(Method.fromJSON(names[i], json.methods[names[i]]));
        if (json.nested)
          service.addJSON(json.nested);
        if (json.edition)
          service._edition = json.edition;
        service.comment = json.comment;
        service._defaultEdition = "proto3";
        return service;
      };
      Service.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "methods",
          Namespace.arrayToJSON(this.methodsArray, toJSONOptions) || /* istanbul ignore next */
          {},
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Object.defineProperty(Service.prototype, "methodsArray", {
        get: function() {
          return this._methodsArray || (this._methodsArray = util.toArray(this.methods));
        }
      });
      function clearCache(service) {
        service._methodsArray = null;
        return service;
      }
      Service.prototype.get = function get(name) {
        return this.methods[name] || Namespace.prototype.get.call(this, name);
      };
      Service.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolve.call(this);
        var methods = this.methodsArray;
        for (var i = 0; i < methods.length; ++i)
          methods[i].resolve();
        return this;
      };
      Service.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.methodsArray.forEach((method) => {
          method._resolveFeaturesRecursive(edition);
        });
        return this;
      };
      Service.prototype.add = function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Method) {
          this.methods[object.name] = object;
          object.parent = this;
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      };
      Service.prototype.remove = function remove(object) {
        if (object instanceof Method) {
          if (this.methods[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.methods[object.name];
          object.parent = null;
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      };
      Service.prototype.create = function create(rpcImpl, requestDelimited, responseDelimited) {
        var rpcService = new rpc.Service(rpcImpl, requestDelimited, responseDelimited);
        for (var i = 0, method; i < /* initializes */
        this.methodsArray.length; ++i) {
          var methodName = util.lcFirst((method = this._methodsArray[i]).resolve().name).replace(/[^$\w_]/g, "");
          rpcService[methodName] = util.codegen(["r", "c"], util.isReserved(methodName) ? methodName + "_" : methodName)("return this.rpcCall(m,q,s,r,c)")({
            m: method,
            q: method.resolvedRequestType.ctor,
            s: method.resolvedResponseType.ctor
          });
        }
        return rpcService;
      };
    }
  });

  // node_modules/protobufjs/src/message.js
  var require_message = __commonJS({
    "node_modules/protobufjs/src/message.js"(exports2, module2) {
      "use strict";
      module2.exports = Message;
      var util = require_minimal();
      function Message(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (key === "__proto__")
              continue;
            this[key] = properties[key];
          }
      }
      Message.create = function create(properties) {
        return this.$type.create(properties);
      };
      Message.encode = function encode(message, writer) {
        return this.$type.encode(message, writer);
      };
      Message.encodeDelimited = function encodeDelimited(message, writer) {
        return this.$type.encodeDelimited(message, writer);
      };
      Message.decode = function decode(reader) {
        return this.$type.decode(reader);
      };
      Message.decodeDelimited = function decodeDelimited(reader) {
        return this.$type.decodeDelimited(reader);
      };
      Message.verify = function verify(message) {
        return this.$type.verify(message);
      };
      Message.fromObject = function fromObject(object) {
        return this.$type.fromObject(object);
      };
      Message.toObject = function toObject(message, options) {
        return this.$type.toObject(message, options);
      };
      Message.prototype.toJSON = function toJSON() {
        return this.$type.toObject(this, util.toJSONOptions);
      };
    }
  });

  // node_modules/protobufjs/src/decoder.js
  var require_decoder = __commonJS({
    "node_modules/protobufjs/src/decoder.js"(exports2, module2) {
      "use strict";
      module2.exports = decoder;
      var Enum = require_enum();
      var types = require_types();
      var util = require_util2();
      function missing(field) {
        return "missing required '" + field.name + "'";
      }
      function decoder(mtype) {
        var gen = util.codegen(["r", "l", "e"], mtype.name + "$decode")("if(!(r instanceof Reader))")("r=Reader.create(r)")("var c=l===undefined?r.len:r.pos+l,m=new this.ctor" + (mtype.fieldsArray.filter(function(field2) {
          return field2.map;
        }).length ? ",k,value" : ""))("while(r.pos<c){")("var t=r.uint32()")("if(t===e)")("break")("switch(t>>>3){");
        var i = 0;
        for (; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(), type = field.resolvedType instanceof Enum ? "int32" : field.type, ref = "m" + util.safeProp(field.name);
          gen("case %i: {", field.id);
          if (field.map) {
            gen("if(%s===util.emptyObject)", ref)("%s={}", ref)("var c2 = r.uint32()+r.pos");
            if (types.defaults[field.keyType] !== void 0) gen("k=%j", types.defaults[field.keyType]);
            else gen("k=null");
            if (types.defaults[type] !== void 0) gen("value=%j", types.defaults[type]);
            else gen("value=null");
            gen("while(r.pos<c2){")("var tag2=r.uint32()")("switch(tag2>>>3){")("case 1: k=r.%s(); break", field.keyType)("case 2:");
            if (types.basic[type] === void 0) gen("value=types[%i].decode(r,r.uint32())", i);
            else gen("value=r.%s()", type);
            gen("break")("default:")("r.skipType(tag2&7)")("break")("}")("}");
            if (types.long[field.keyType] !== void 0) gen('%s[typeof k==="object"?util.longToHash(k):k]=value', ref);
            else gen("%s[k]=value", ref);
          } else if (field.repeated) {
            gen("if(!(%s&&%s.length))", ref, ref)("%s=[]", ref);
            if (types.packed[type] !== void 0) gen("if((t&7)===2){")("var c2=r.uint32()+r.pos")("while(r.pos<c2)")("%s.push(r.%s())", ref, type)("}else");
            if (types.basic[type] === void 0) gen(field.delimited ? "%s.push(types[%i].decode(r,undefined,((t&~7)|4)))" : "%s.push(types[%i].decode(r,r.uint32()))", ref, i);
            else gen("%s.push(r.%s())", ref, type);
          } else if (types.basic[type] === void 0) gen(field.delimited ? "%s=types[%i].decode(r,undefined,((t&~7)|4))" : "%s=types[%i].decode(r,r.uint32())", ref, i);
          else gen("%s=r.%s()", ref, type);
          gen("break")("}");
        }
        gen("default:")("r.skipType(t&7)")("break")("}")("}");
        for (i = 0; i < mtype._fieldsArray.length; ++i) {
          var rfield = mtype._fieldsArray[i];
          if (rfield.required) gen("if(!m.hasOwnProperty(%j))", rfield.name)("throw util.ProtocolError(%j,{instance:m})", missing(rfield));
        }
        return gen("return m");
      }
    }
  });

  // node_modules/protobufjs/src/verifier.js
  var require_verifier = __commonJS({
    "node_modules/protobufjs/src/verifier.js"(exports2, module2) {
      "use strict";
      module2.exports = verifier;
      var Enum = require_enum();
      var util = require_util2();
      function invalid(field, expected) {
        return field.name + ": " + expected + (field.repeated && expected !== "array" ? "[]" : field.map && expected !== "object" ? "{k:" + field.keyType + "}" : "") + " expected";
      }
      function genVerifyValue(gen, field, fieldIndex, ref) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(%s){", ref)("default:")("return%j", invalid(field, "enum value"));
            for (var keys = Object.keys(field.resolvedType.values), j = 0; j < keys.length; ++j) gen("case %i:", field.resolvedType.values[keys[j]]);
            gen("break")("}");
          } else {
            gen("{")("var e=types[%i].verify(%s);", fieldIndex, ref)("if(e)")("return%j+e", field.name + ".")("}");
          }
        } else {
          switch (field.type) {
            case "int32":
            case "uint32":
            case "sint32":
            case "fixed32":
            case "sfixed32":
              gen("if(!util.isInteger(%s))", ref)("return%j", invalid(field, "integer"));
              break;
            case "int64":
            case "uint64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(!util.isInteger(%s)&&!(%s&&util.isInteger(%s.low)&&util.isInteger(%s.high)))", ref, ref, ref, ref)("return%j", invalid(field, "integer|Long"));
              break;
            case "float":
            case "double":
              gen('if(typeof %s!=="number")', ref)("return%j", invalid(field, "number"));
              break;
            case "bool":
              gen('if(typeof %s!=="boolean")', ref)("return%j", invalid(field, "boolean"));
              break;
            case "string":
              gen("if(!util.isString(%s))", ref)("return%j", invalid(field, "string"));
              break;
            case "bytes":
              gen('if(!(%s&&typeof %s.length==="number"||util.isString(%s)))', ref, ref, ref)("return%j", invalid(field, "buffer"));
              break;
          }
        }
        return gen;
      }
      function genVerifyKey(gen, field, ref) {
        switch (field.keyType) {
          case "int32":
          case "uint32":
          case "sint32":
          case "fixed32":
          case "sfixed32":
            gen("if(!util.key32Re.test(%s))", ref)("return%j", invalid(field, "integer key"));
            break;
          case "int64":
          case "uint64":
          case "sint64":
          case "fixed64":
          case "sfixed64":
            gen("if(!util.key64Re.test(%s))", ref)("return%j", invalid(field, "integer|Long key"));
            break;
          case "bool":
            gen("if(!util.key2Re.test(%s))", ref)("return%j", invalid(field, "boolean key"));
            break;
        }
        return gen;
      }
      function verifier(mtype) {
        var gen = util.codegen(["m"], mtype.name + "$verify")('if(typeof m!=="object"||m===null)')("return%j", "object expected");
        var oneofs = mtype.oneofsArray, seenFirstField = {};
        if (oneofs.length) gen("var p={}");
        for (var i = 0; i < /* initializes */
        mtype.fieldsArray.length; ++i) {
          var field = mtype._fieldsArray[i].resolve(), ref = "m" + util.safeProp(field.name);
          if (field.optional) gen("if(%s!=null&&m.hasOwnProperty(%j)){", ref, field.name);
          if (field.map) {
            gen("if(!util.isObject(%s))", ref)("return%j", invalid(field, "object"))("var k=Object.keys(%s)", ref)("for(var i=0;i<k.length;++i){");
            genVerifyKey(gen, field, "k[i]");
            genVerifyValue(gen, field, i, ref + "[k[i]]")("}");
          } else if (field.repeated) {
            gen("if(!Array.isArray(%s))", ref)("return%j", invalid(field, "array"))("for(var i=0;i<%s.length;++i){", ref);
            genVerifyValue(gen, field, i, ref + "[i]")("}");
          } else {
            if (field.partOf) {
              var oneofProp = util.safeProp(field.partOf.name);
              if (seenFirstField[field.partOf.name] === 1) gen("if(p%s===1)", oneofProp)("return%j", field.partOf.name + ": multiple values");
              seenFirstField[field.partOf.name] = 1;
              gen("p%s=1", oneofProp);
            }
            genVerifyValue(gen, field, i, ref);
          }
          if (field.optional) gen("}");
        }
        return gen("return null");
      }
    }
  });

  // node_modules/protobufjs/src/converter.js
  var require_converter = __commonJS({
    "node_modules/protobufjs/src/converter.js"(exports2) {
      "use strict";
      var converter = exports2;
      var Enum = require_enum();
      var util = require_util2();
      function genValuePartial_fromObject(gen, field, fieldIndex, prop) {
        var defaultAlreadyEmitted = false;
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) {
            gen("switch(d%s){", prop);
            for (var values = field.resolvedType.values, keys = Object.keys(values), i = 0; i < keys.length; ++i) {
              if (values[keys[i]] === field.typeDefault && !defaultAlreadyEmitted) {
                gen("default:")('if(typeof(d%s)==="number"){m%s=d%s;break}', prop, prop, prop);
                if (!field.repeated) gen("break");
                defaultAlreadyEmitted = true;
              }
              gen("case%j:", keys[i])("case %i:", values[keys[i]])("m%s=%j", prop, values[keys[i]])("break");
            }
            gen("}");
          } else gen('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s=types[%i].fromObject(d%s)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("m%s=Number(d%s)", prop, prop);
              break;
            case "uint32":
            case "fixed32":
              gen("m%s=d%s>>>0", prop, prop);
              break;
            case "int32":
            case "sint32":
            case "sfixed32":
              gen("m%s=d%s|0", prop, prop);
              break;
            case "uint64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen("if(util.Long)")("(m%s=util.Long.fromValue(d%s)).unsigned=%j", prop, prop, isUnsigned)('else if(typeof d%s==="string")', prop)("m%s=parseInt(d%s,10)", prop, prop)('else if(typeof d%s==="number")', prop)("m%s=d%s", prop, prop)('else if(typeof d%s==="object")', prop)("m%s=new util.LongBits(d%s.low>>>0,d%s.high>>>0).toNumber(%s)", prop, prop, prop, isUnsigned ? "true" : "");
              break;
            case "bytes":
              gen('if(typeof d%s==="string")', prop)("util.base64.decode(d%s,m%s=util.newBuffer(util.base64.length(d%s)),0)", prop, prop, prop)("else if(d%s.length >= 0)", prop)("m%s=d%s", prop, prop);
              break;
            case "string":
              gen("m%s=String(d%s)", prop, prop);
              break;
            case "bool":
              gen("m%s=Boolean(d%s)", prop, prop);
              break;
          }
        }
        return gen;
      }
      converter.fromObject = function fromObject(mtype) {
        var fields = mtype.fieldsArray;
        var gen = util.codegen(["d"], mtype.name + "$fromObject")("if(d instanceof this.ctor)")("return d");
        if (!fields.length) return gen("return new this.ctor");
        gen("var m=new this.ctor");
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(), prop = util.safeProp(field.name);
          if (field.map) {
            gen("if(d%s){", prop)('if(typeof d%s!=="object")', prop)("throw TypeError(%j)", field.fullName + ": object expected")("m%s={}", prop)("for(var ks=Object.keys(d%s),i=0;i<ks.length;++i){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop + "[ks[i]]"
            )("}")("}");
          } else if (field.repeated) {
            gen("if(d%s){", prop)("if(!Array.isArray(d%s))", prop)("throw TypeError(%j)", field.fullName + ": array expected")("m%s=[]", prop)("for(var i=0;i<d%s.length;++i){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop + "[i]"
            )("}")("}");
          } else {
            if (!(field.resolvedType instanceof Enum)) gen("if(d%s!=null){", prop);
            genValuePartial_fromObject(
              gen,
              field,
              /* not sorted */
              i,
              prop
            );
            if (!(field.resolvedType instanceof Enum)) gen("}");
          }
        }
        return gen("return m");
      };
      function genValuePartial_toObject(gen, field, fieldIndex, prop) {
        if (field.resolvedType) {
          if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?(types[%i].values[m%s]===undefined?m%s:types[%i].values[m%s]):m%s", prop, fieldIndex, prop, prop, fieldIndex, prop, prop);
          else gen("d%s=types[%i].toObject(m%s,o)", prop, fieldIndex, prop);
        } else {
          var isUnsigned = false;
          switch (field.type) {
            case "double":
            case "float":
              gen("d%s=o.json&&!isFinite(m%s)?String(m%s):m%s", prop, prop, prop, prop);
              break;
            case "uint64":
              isUnsigned = true;
            // eslint-disable-next-line no-fallthrough
            case "int64":
            case "sint64":
            case "fixed64":
            case "sfixed64":
              gen('if(typeof m%s==="number")', prop)("d%s=o.longs===String?String(m%s):m%s", prop, prop, prop)("else")("d%s=o.longs===String?util.Long.prototype.toString.call(m%s):o.longs===Number?new util.LongBits(m%s.low>>>0,m%s.high>>>0).toNumber(%s):m%s", prop, prop, prop, prop, isUnsigned ? "true" : "", prop);
              break;
            case "bytes":
              gen("d%s=o.bytes===String?util.base64.encode(m%s,0,m%s.length):o.bytes===Array?Array.prototype.slice.call(m%s):m%s", prop, prop, prop, prop, prop);
              break;
            default:
              gen("d%s=m%s", prop, prop);
              break;
          }
        }
        return gen;
      }
      converter.toObject = function toObject(mtype) {
        var fields = mtype.fieldsArray.slice().sort(util.compareFieldsById);
        if (!fields.length)
          return util.codegen()("return {}");
        var gen = util.codegen(["m", "o"], mtype.name + "$toObject")("if(!o)")("o={}")("var d={}");
        var repeatedFields = [], mapFields = [], normalFields = [], i = 0;
        for (; i < fields.length; ++i)
          if (!fields[i].partOf)
            (fields[i].resolve().repeated ? repeatedFields : fields[i].map ? mapFields : normalFields).push(fields[i]);
        if (repeatedFields.length) {
          gen("if(o.arrays||o.defaults){");
          for (i = 0; i < repeatedFields.length; ++i) gen("d%s=[]", util.safeProp(repeatedFields[i].name));
          gen("}");
        }
        if (mapFields.length) {
          gen("if(o.objects||o.defaults){");
          for (i = 0; i < mapFields.length; ++i) gen("d%s={}", util.safeProp(mapFields[i].name));
          gen("}");
        }
        if (normalFields.length) {
          gen("if(o.defaults){");
          for (i = 0; i < normalFields.length; ++i) {
            var field = normalFields[i], prop = util.safeProp(field.name);
            if (field.resolvedType instanceof Enum) gen("d%s=o.enums===String?%j:%j", prop, field.resolvedType.valuesById[field.typeDefault], field.typeDefault);
            else if (field.long) gen("if(util.Long){")("var n=new util.Long(%i,%i,%j)", field.typeDefault.low, field.typeDefault.high, field.typeDefault.unsigned)("d%s=o.longs===String?n.toString():o.longs===Number?n.toNumber():n", prop)("}else")("d%s=o.longs===String?%j:%i", prop, field.typeDefault.toString(), field.typeDefault.toNumber());
            else if (field.bytes) {
              var arrayDefault = "[" + Array.prototype.slice.call(field.typeDefault).join(",") + "]";
              gen("if(o.bytes===String)d%s=%j", prop, String.fromCharCode.apply(String, field.typeDefault))("else{")("d%s=%s", prop, arrayDefault)("if(o.bytes!==Array)d%s=util.newBuffer(d%s)", prop, prop)("}");
            } else gen("d%s=%j", prop, field.typeDefault);
          }
          gen("}");
        }
        var hasKs2 = false;
        for (i = 0; i < fields.length; ++i) {
          var field = fields[i], index2 = mtype._fieldsArray.indexOf(field), prop = util.safeProp(field.name);
          if (field.map) {
            if (!hasKs2) {
              hasKs2 = true;
              gen("var ks2");
            }
            gen("if(m%s&&(ks2=Object.keys(m%s)).length){", prop, prop)("d%s={}", prop)("for(var j=0;j<ks2.length;++j){");
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index2,
              prop + "[ks2[j]]"
            )("}");
          } else if (field.repeated) {
            gen("if(m%s&&m%s.length){", prop, prop)("d%s=[]", prop)("for(var j=0;j<m%s.length;++j){", prop);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index2,
              prop + "[j]"
            )("}");
          } else {
            gen("if(m%s!=null&&m.hasOwnProperty(%j)){", prop, field.name);
            genValuePartial_toObject(
              gen,
              field,
              /* sorted */
              index2,
              prop
            );
            if (field.partOf) gen("if(o.oneofs)")("d%s=%j", util.safeProp(field.partOf.name), field.name);
          }
          gen("}");
        }
        return gen("return d");
      };
    }
  });

  // node_modules/protobufjs/src/wrappers.js
  var require_wrappers = __commonJS({
    "node_modules/protobufjs/src/wrappers.js"(exports2) {
      "use strict";
      var wrappers = exports2;
      var Message = require_message();
      wrappers[".google.protobuf.Any"] = {
        fromObject: function(object) {
          if (object && object["@type"]) {
            var name = object["@type"].substring(object["@type"].lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type) {
              var type_url = object["@type"].charAt(0) === "." ? object["@type"].slice(1) : object["@type"];
              if (type_url.indexOf("/") === -1) {
                type_url = "/" + type_url;
              }
              return this.create({
                type_url,
                value: type.encode(type.fromObject(object)).finish()
              });
            }
          }
          return this.fromObject(object);
        },
        toObject: function(message, options) {
          var googleApi = "type.googleapis.com/";
          var prefix = "";
          var name = "";
          if (options && options.json && message.type_url && message.value) {
            name = message.type_url.substring(message.type_url.lastIndexOf("/") + 1);
            prefix = message.type_url.substring(0, message.type_url.lastIndexOf("/") + 1);
            var type = this.lookup(name);
            if (type)
              message = type.decode(message.value);
          }
          if (!(message instanceof this.ctor) && message instanceof Message) {
            var object = message.$type.toObject(message, options);
            var messageName = message.$type.fullName[0] === "." ? message.$type.fullName.slice(1) : message.$type.fullName;
            if (prefix === "") {
              prefix = googleApi;
            }
            name = prefix + messageName;
            object["@type"] = name;
            return object;
          }
          return this.toObject(message, options);
        }
      };
    }
  });

  // node_modules/protobufjs/src/type.js
  var require_type2 = __commonJS({
    "node_modules/protobufjs/src/type.js"(exports2, module2) {
      "use strict";
      module2.exports = Type;
      var Namespace = require_namespace();
      ((Type.prototype = Object.create(Namespace.prototype)).constructor = Type).className = "Type";
      var Enum = require_enum();
      var OneOf = require_oneof();
      var Field = require_field();
      var MapField = require_mapfield();
      var Service = require_service2();
      var Message = require_message();
      var Reader = require_reader();
      var Writer = require_writer();
      var util = require_util2();
      var encoder = require_encoder();
      var decoder = require_decoder();
      var verifier = require_verifier();
      var converter = require_converter();
      var wrappers = require_wrappers();
      function Type(name, options) {
        name = name.replace(/\W/g, "");
        Namespace.call(this, name, options);
        this.fields = {};
        this.oneofs = void 0;
        this.extensions = void 0;
        this.reserved = void 0;
        this.group = void 0;
        this._fieldsById = null;
        this._fieldsArray = null;
        this._oneofsArray = null;
        this._ctor = null;
      }
      Object.defineProperties(Type.prototype, {
        /**
         * Message fields by id.
         * @name Type#fieldsById
         * @type {Object.<number,Field>}
         * @readonly
         */
        fieldsById: {
          get: function() {
            if (this._fieldsById)
              return this._fieldsById;
            this._fieldsById = {};
            for (var names = Object.keys(this.fields), i = 0; i < names.length; ++i) {
              var field = this.fields[names[i]], id = field.id;
              if (this._fieldsById[id])
                throw Error("duplicate id " + id + " in " + this);
              this._fieldsById[id] = field;
            }
            return this._fieldsById;
          }
        },
        /**
         * Fields of this message as an array for iteration.
         * @name Type#fieldsArray
         * @type {Field[]}
         * @readonly
         */
        fieldsArray: {
          get: function() {
            return this._fieldsArray || (this._fieldsArray = util.toArray(this.fields));
          }
        },
        /**
         * Oneofs of this message as an array for iteration.
         * @name Type#oneofsArray
         * @type {OneOf[]}
         * @readonly
         */
        oneofsArray: {
          get: function() {
            return this._oneofsArray || (this._oneofsArray = util.toArray(this.oneofs));
          }
        },
        /**
         * The registered constructor, if any registered, otherwise a generic constructor.
         * Assigning a function replaces the internal constructor. If the function does not extend {@link Message} yet, its prototype will be setup accordingly and static methods will be populated. If it already extends {@link Message}, it will just replace the internal constructor.
         * @name Type#ctor
         * @type {Constructor<{}>}
         */
        ctor: {
          get: function() {
            return this._ctor || (this.ctor = Type.generateConstructor(this)());
          },
          set: function(ctor) {
            var prototype = ctor.prototype;
            if (!(prototype instanceof Message)) {
              (ctor.prototype = new Message()).constructor = ctor;
              util.merge(ctor.prototype, prototype);
            }
            ctor.$type = ctor.prototype.$type = this;
            util.merge(ctor, Message, true);
            this._ctor = ctor;
            var i = 0;
            for (; i < /* initializes */
            this.fieldsArray.length; ++i)
              this._fieldsArray[i].resolve();
            var ctorProperties = {};
            for (i = 0; i < /* initializes */
            this.oneofsArray.length; ++i)
              ctorProperties[this._oneofsArray[i].resolve().name] = {
                get: util.oneOfGetter(this._oneofsArray[i].oneof),
                set: util.oneOfSetter(this._oneofsArray[i].oneof)
              };
            if (i)
              Object.defineProperties(ctor.prototype, ctorProperties);
          }
        }
      });
      Type.generateConstructor = function generateConstructor(mtype) {
        var gen = util.codegen(["p"], mtype.name);
        for (var i = 0, field; i < mtype.fieldsArray.length; ++i)
          if ((field = mtype._fieldsArray[i]).map) gen("this%s={}", util.safeProp(field.name));
          else if (field.repeated) gen("this%s=[]", util.safeProp(field.name));
        return gen("if(p)for(var ks=Object.keys(p),i=0;i<ks.length;++i)if(p[ks[i]]!=null)")("this[ks[i]]=p[ks[i]]");
      };
      function clearCache(type) {
        type._fieldsById = type._fieldsArray = type._oneofsArray = null;
        delete type.encode;
        delete type.decode;
        delete type.verify;
        return type;
      }
      Type.fromJSON = function fromJSON(name, json) {
        var type = new Type(name, json.options);
        type.extensions = json.extensions;
        type.reserved = json.reserved;
        var names = Object.keys(json.fields), i = 0;
        for (; i < names.length; ++i)
          type.add(
            (typeof json.fields[names[i]].keyType !== "undefined" ? MapField.fromJSON : Field.fromJSON)(names[i], json.fields[names[i]])
          );
        if (json.oneofs)
          for (names = Object.keys(json.oneofs), i = 0; i < names.length; ++i)
            type.add(OneOf.fromJSON(names[i], json.oneofs[names[i]]));
        if (json.nested)
          for (names = Object.keys(json.nested), i = 0; i < names.length; ++i) {
            var nested = json.nested[names[i]];
            type.add(
              // most to least likely
              (nested.id !== void 0 ? Field.fromJSON : nested.fields !== void 0 ? Type.fromJSON : nested.values !== void 0 ? Enum.fromJSON : nested.methods !== void 0 ? Service.fromJSON : Namespace.fromJSON)(names[i], nested)
            );
          }
        if (json.extensions && json.extensions.length)
          type.extensions = json.extensions;
        if (json.reserved && json.reserved.length)
          type.reserved = json.reserved;
        if (json.group)
          type.group = true;
        if (json.comment)
          type.comment = json.comment;
        if (json.edition)
          type._edition = json.edition;
        type._defaultEdition = "proto3";
        return type;
      };
      Type.prototype.toJSON = function toJSON(toJSONOptions) {
        var inherited = Namespace.prototype.toJSON.call(this, toJSONOptions);
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          inherited && inherited.options || void 0,
          "oneofs",
          Namespace.arrayToJSON(this.oneofsArray, toJSONOptions),
          "fields",
          Namespace.arrayToJSON(this.fieldsArray.filter(function(obj) {
            return !obj.declaringField;
          }), toJSONOptions) || {},
          "extensions",
          this.extensions && this.extensions.length ? this.extensions : void 0,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "group",
          this.group || void 0,
          "nested",
          inherited && inherited.nested || void 0,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Type.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        Namespace.prototype.resolveAll.call(this);
        var oneofs = this.oneofsArray;
        i = 0;
        while (i < oneofs.length)
          oneofs[i++].resolve();
        var fields = this.fieldsArray, i = 0;
        while (i < fields.length)
          fields[i++].resolve();
        return this;
      };
      Type.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        if (!this._needsRecursiveFeatureResolution) return this;
        edition = this._edition || edition;
        Namespace.prototype._resolveFeaturesRecursive.call(this, edition);
        this.oneofsArray.forEach((oneof) => {
          oneof._resolveFeatures(edition);
        });
        this.fieldsArray.forEach((field) => {
          field._resolveFeatures(edition);
        });
        return this;
      };
      Type.prototype.get = function get(name) {
        return this.fields[name] || this.oneofs && this.oneofs[name] || this.nested && this.nested[name] || null;
      };
      Type.prototype.add = function add(object) {
        if (this.get(object.name))
          throw Error("duplicate name '" + object.name + "' in " + this);
        if (object instanceof Field && object.extend === void 0) {
          if (this._fieldsById ? (
            /* istanbul ignore next */
            this._fieldsById[object.id]
          ) : this.fieldsById[object.id])
            throw Error("duplicate id " + object.id + " in " + this);
          if (this.isReservedId(object.id))
            throw Error("id " + object.id + " is reserved in " + this);
          if (this.isReservedName(object.name))
            throw Error("name '" + object.name + "' is reserved in " + this);
          if (object.parent)
            object.parent.remove(object);
          this.fields[object.name] = object;
          object.message = this;
          object.onAdd(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs)
            this.oneofs = {};
          this.oneofs[object.name] = object;
          object.onAdd(this);
          return clearCache(this);
        }
        return Namespace.prototype.add.call(this, object);
      };
      Type.prototype.remove = function remove(object) {
        if (object instanceof Field && object.extend === void 0) {
          if (!this.fields || this.fields[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.fields[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        if (object instanceof OneOf) {
          if (!this.oneofs || this.oneofs[object.name] !== object)
            throw Error(object + " is not a member of " + this);
          delete this.oneofs[object.name];
          object.parent = null;
          object.onRemove(this);
          return clearCache(this);
        }
        return Namespace.prototype.remove.call(this, object);
      };
      Type.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      Type.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
      Type.prototype.create = function create(properties) {
        return new this.ctor(properties);
      };
      Type.prototype.setup = function setup() {
        var fullName = this.fullName, types = [];
        for (var i = 0; i < /* initializes */
        this.fieldsArray.length; ++i)
          types.push(this._fieldsArray[i].resolve().resolvedType);
        this.encode = encoder(this)({
          Writer,
          types,
          util
        });
        this.decode = decoder(this)({
          Reader,
          types,
          util
        });
        this.verify = verifier(this)({
          types,
          util
        });
        this.fromObject = converter.fromObject(this)({
          types,
          util
        });
        this.toObject = converter.toObject(this)({
          types,
          util
        });
        var wrapper = wrappers[fullName];
        if (wrapper) {
          var originalThis = Object.create(this);
          originalThis.fromObject = this.fromObject;
          this.fromObject = wrapper.fromObject.bind(originalThis);
          originalThis.toObject = this.toObject;
          this.toObject = wrapper.toObject.bind(originalThis);
        }
        return this;
      };
      Type.prototype.encode = function encode_setup(message, writer) {
        return this.setup().encode(message, writer);
      };
      Type.prototype.encodeDelimited = function encodeDelimited(message, writer) {
        return this.encode(message, writer && writer.len ? writer.fork() : writer).ldelim();
      };
      Type.prototype.decode = function decode_setup(reader, length) {
        return this.setup().decode(reader, length);
      };
      Type.prototype.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof Reader))
          reader = Reader.create(reader);
        return this.decode(reader, reader.uint32());
      };
      Type.prototype.verify = function verify_setup(message) {
        return this.setup().verify(message);
      };
      Type.prototype.fromObject = function fromObject(object) {
        return this.setup().fromObject(object);
      };
      Type.prototype.toObject = function toObject(message, options) {
        return this.setup().toObject(message, options);
      };
      Type.d = function decorateType(typeName) {
        return function typeDecorator(target) {
          util.decorateType(target, typeName);
        };
      };
    }
  });

  // node_modules/protobufjs/src/root.js
  var require_root = __commonJS({
    "node_modules/protobufjs/src/root.js"(exports2, module2) {
      "use strict";
      module2.exports = Root;
      var Namespace = require_namespace();
      ((Root.prototype = Object.create(Namespace.prototype)).constructor = Root).className = "Root";
      var Field = require_field();
      var Enum = require_enum();
      var OneOf = require_oneof();
      var util = require_util2();
      var Type;
      var parse;
      var common;
      function Root(options) {
        Namespace.call(this, "", options);
        this.deferred = [];
        this.files = [];
        this._edition = "proto2";
        this._fullyQualifiedObjects = {};
      }
      Root.fromJSON = function fromJSON(json, root) {
        if (!root)
          root = new Root();
        if (json.options)
          root.setOptions(json.options);
        return root.addJSON(json.nested).resolveAll();
      };
      Root.prototype.resolvePath = util.path.resolve;
      Root.prototype.fetch = util.fetch;
      function SYNC() {
      }
      Root.prototype.load = function load(filename, options, callback) {
        if (typeof options === "function") {
          callback = options;
          options = void 0;
        }
        var self2 = this;
        if (!callback) {
          return util.asPromise(load, self2, filename, options);
        }
        var sync = callback === SYNC;
        function finish(err2, root) {
          if (!callback) {
            return;
          }
          if (sync) {
            throw err2;
          }
          if (root) {
            root.resolveAll();
          }
          var cb = callback;
          callback = null;
          cb(err2, root);
        }
        function getBundledFileName(filename2) {
          var idx = filename2.lastIndexOf("google/protobuf/");
          if (idx > -1) {
            var altname = filename2.substring(idx);
            if (altname in common) return altname;
          }
          return null;
        }
        function process(filename2, source) {
          try {
            if (util.isString(source) && source.charAt(0) === "{")
              source = JSON.parse(source);
            if (!util.isString(source))
              self2.setOptions(source.options).addJSON(source.nested);
            else {
              parse.filename = filename2;
              var parsed = parse(source, self2, options), resolved2, i2 = 0;
              if (parsed.imports) {
                for (; i2 < parsed.imports.length; ++i2)
                  if (resolved2 = getBundledFileName(parsed.imports[i2]) || self2.resolvePath(filename2, parsed.imports[i2]))
                    fetch(resolved2);
              }
              if (parsed.weakImports) {
                for (i2 = 0; i2 < parsed.weakImports.length; ++i2)
                  if (resolved2 = getBundledFileName(parsed.weakImports[i2]) || self2.resolvePath(filename2, parsed.weakImports[i2]))
                    fetch(resolved2, true);
              }
            }
          } catch (err2) {
            finish(err2);
          }
          if (!sync && !queued) {
            finish(null, self2);
          }
        }
        function fetch(filename2, weak) {
          filename2 = getBundledFileName(filename2) || filename2;
          if (self2.files.indexOf(filename2) > -1) {
            return;
          }
          self2.files.push(filename2);
          if (filename2 in common) {
            if (sync) {
              process(filename2, common[filename2]);
            } else {
              ++queued;
              setTimeout(function() {
                --queued;
                process(filename2, common[filename2]);
              });
            }
            return;
          }
          if (sync) {
            var source;
            try {
              source = util.fs.readFileSync(filename2).toString("utf8");
            } catch (err2) {
              if (!weak)
                finish(err2);
              return;
            }
            process(filename2, source);
          } else {
            ++queued;
            self2.fetch(filename2, function(err2, source2) {
              --queued;
              if (!callback) {
                return;
              }
              if (err2) {
                if (!weak)
                  finish(err2);
                else if (!queued)
                  finish(null, self2);
                return;
              }
              process(filename2, source2);
            });
          }
        }
        var queued = 0;
        if (util.isString(filename)) {
          filename = [filename];
        }
        for (var i = 0, resolved; i < filename.length; ++i)
          if (resolved = self2.resolvePath("", filename[i]))
            fetch(resolved);
        if (sync) {
          self2.resolveAll();
          return self2;
        }
        if (!queued) {
          finish(null, self2);
        }
        return self2;
      };
      Root.prototype.loadSync = function loadSync(filename, options) {
        if (!util.isNode)
          throw Error("not supported");
        return this.load(filename, options, SYNC);
      };
      Root.prototype.resolveAll = function resolveAll() {
        if (!this._needsRecursiveResolve) return this;
        if (this.deferred.length)
          throw Error("unresolvable extensions: " + this.deferred.map(function(field) {
            return "'extend " + field.extend + "' in " + field.parent.fullName;
          }).join(", "));
        return Namespace.prototype.resolveAll.call(this);
      };
      var exposeRe = /^[A-Z]/;
      function tryHandleExtension(root, field) {
        var extendedType = field.parent.lookup(field.extend);
        if (extendedType) {
          var sisterField = new Field(field.fullName, field.id, field.type, field.rule, void 0, field.options);
          if (extendedType.get(sisterField.name)) {
            return true;
          }
          sisterField.declaringField = field;
          field.extensionField = sisterField;
          extendedType.add(sisterField);
          return true;
        }
        return false;
      }
      Root.prototype._handleAdd = function _handleAdd(object) {
        if (object instanceof Field) {
          if (
            /* an extension field (implies not part of a oneof) */
            object.extend !== void 0 && /* not already handled */
            !object.extensionField
          ) {
            if (!tryHandleExtension(this, object))
              this.deferred.push(object);
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            object.parent[object.name] = object.values;
        } else if (!(object instanceof OneOf)) {
          if (object instanceof Type)
            for (var i = 0; i < this.deferred.length; )
              if (tryHandleExtension(this, this.deferred[i]))
                this.deferred.splice(i, 1);
              else
                ++i;
          for (var j = 0; j < /* initializes */
          object.nestedArray.length; ++j)
            this._handleAdd(object._nestedArray[j]);
          if (exposeRe.test(object.name))
            object.parent[object.name] = object;
        }
        if (object instanceof Type || object instanceof Enum || object instanceof Field) {
          this._fullyQualifiedObjects[object.fullName] = object;
        }
      };
      Root.prototype._handleRemove = function _handleRemove(object) {
        if (object instanceof Field) {
          if (
            /* an extension field */
            object.extend !== void 0
          ) {
            if (
              /* already handled */
              object.extensionField
            ) {
              object.extensionField.parent.remove(object.extensionField);
              object.extensionField = null;
            } else {
              var index2 = this.deferred.indexOf(object);
              if (index2 > -1)
                this.deferred.splice(index2, 1);
            }
          }
        } else if (object instanceof Enum) {
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        } else if (object instanceof Namespace) {
          for (var i = 0; i < /* initializes */
          object.nestedArray.length; ++i)
            this._handleRemove(object._nestedArray[i]);
          if (exposeRe.test(object.name))
            delete object.parent[object.name];
        }
        delete this._fullyQualifiedObjects[object.fullName];
      };
      Root._configure = function(Type_, parse_, common_) {
        Type = Type_;
        parse = parse_;
        common = common_;
      };
    }
  });

  // node_modules/protobufjs/src/util.js
  var require_util2 = __commonJS({
    "node_modules/protobufjs/src/util.js"(exports2, module2) {
      "use strict";
      var util = module2.exports = require_minimal();
      var roots = require_roots();
      var Type;
      var Enum;
      util.codegen = require_codegen();
      util.fetch = require_fetch();
      util.path = require_path();
      util.fs = util.inquire("fs");
      util.toArray = function toArray(object) {
        if (object) {
          var keys = Object.keys(object), array = new Array(keys.length), index2 = 0;
          while (index2 < keys.length)
            array[index2] = object[keys[index2++]];
          return array;
        }
        return [];
      };
      util.toObject = function toObject(array) {
        var object = {}, index2 = 0;
        while (index2 < array.length) {
          var key = array[index2++], val = array[index2++];
          if (val !== void 0)
            object[key] = val;
        }
        return object;
      };
      var safePropBackslashRe = /\\/g;
      var safePropQuoteRe = /"/g;
      util.isReserved = function isReserved(name) {
        return /^(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|instanceof)$/.test(name);
      };
      util.safeProp = function safeProp(prop) {
        if (!/^[$\w_]+$/.test(prop) || util.isReserved(prop))
          return '["' + prop.replace(safePropBackslashRe, "\\\\").replace(safePropQuoteRe, '\\"') + '"]';
        return "." + prop;
      };
      util.ucFirst = function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
      };
      var camelCaseRe = /_([a-z])/g;
      util.camelCase = function camelCase(str) {
        return str.substring(0, 1) + str.substring(1).replace(camelCaseRe, function($0, $1) {
          return $1.toUpperCase();
        });
      };
      util.compareFieldsById = function compareFieldsById(a, b) {
        return a.id - b.id;
      };
      util.decorateType = function decorateType(ctor, typeName) {
        if (ctor.$type) {
          if (typeName && ctor.$type.name !== typeName) {
            util.decorateRoot.remove(ctor.$type);
            ctor.$type.name = typeName;
            util.decorateRoot.add(ctor.$type);
          }
          return ctor.$type;
        }
        if (!Type)
          Type = require_type2();
        var type = new Type(typeName || ctor.name);
        util.decorateRoot.add(type);
        type.ctor = ctor;
        Object.defineProperty(ctor, "$type", { value: type, enumerable: false });
        Object.defineProperty(ctor.prototype, "$type", { value: type, enumerable: false });
        return type;
      };
      var decorateEnumIndex = 0;
      util.decorateEnum = function decorateEnum(object) {
        if (object.$type)
          return object.$type;
        if (!Enum)
          Enum = require_enum();
        var enm = new Enum("Enum" + decorateEnumIndex++, object);
        util.decorateRoot.add(enm);
        Object.defineProperty(object, "$type", { value: enm, enumerable: false });
        return enm;
      };
      util.setProperty = function setProperty(dst, path, value, ifNotSet) {
        function setProp(dst2, path2, value2) {
          var part = path2.shift();
          if (part === "__proto__" || part === "prototype") {
            return dst2;
          }
          if (path2.length > 0) {
            dst2[part] = setProp(dst2[part] || {}, path2, value2);
          } else {
            var prevValue = dst2[part];
            if (prevValue && ifNotSet)
              return dst2;
            if (prevValue)
              value2 = [].concat(prevValue).concat(value2);
            dst2[part] = value2;
          }
          return dst2;
        }
        if (typeof dst !== "object")
          throw TypeError("dst must be an object");
        if (!path)
          throw TypeError("path must be specified");
        path = path.split(".");
        return setProp(dst, path, value);
      };
      Object.defineProperty(util, "decorateRoot", {
        get: function() {
          return roots["decorated"] || (roots["decorated"] = new (require_root())());
        }
      });
    }
  });

  // node_modules/protobufjs/src/types.js
  var require_types = __commonJS({
    "node_modules/protobufjs/src/types.js"(exports2) {
      "use strict";
      var types = exports2;
      var util = require_util2();
      var s = [
        "double",
        // 0
        "float",
        // 1
        "int32",
        // 2
        "uint32",
        // 3
        "sint32",
        // 4
        "fixed32",
        // 5
        "sfixed32",
        // 6
        "int64",
        // 7
        "uint64",
        // 8
        "sint64",
        // 9
        "fixed64",
        // 10
        "sfixed64",
        // 11
        "bool",
        // 12
        "string",
        // 13
        "bytes"
        // 14
      ];
      function bake(values, offset) {
        var i = 0, o = {};
        offset |= 0;
        while (i < values.length) o[s[i + offset]] = values[i++];
        return o;
      }
      types.basic = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2,
        /* bytes    */
        2
      ]);
      types.defaults = bake([
        /* double   */
        0,
        /* float    */
        0,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        0,
        /* sfixed32 */
        0,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        0,
        /* sfixed64 */
        0,
        /* bool     */
        false,
        /* string   */
        "",
        /* bytes    */
        util.emptyArray,
        /* message  */
        null
      ]);
      types.long = bake([
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1
      ], 7);
      types.mapKey = bake([
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0,
        /* string   */
        2
      ], 2);
      types.packed = bake([
        /* double   */
        1,
        /* float    */
        5,
        /* int32    */
        0,
        /* uint32   */
        0,
        /* sint32   */
        0,
        /* fixed32  */
        5,
        /* sfixed32 */
        5,
        /* int64    */
        0,
        /* uint64   */
        0,
        /* sint64   */
        0,
        /* fixed64  */
        1,
        /* sfixed64 */
        1,
        /* bool     */
        0
      ]);
    }
  });

  // node_modules/protobufjs/src/field.js
  var require_field = __commonJS({
    "node_modules/protobufjs/src/field.js"(exports2, module2) {
      "use strict";
      module2.exports = Field;
      var ReflectionObject = require_object();
      ((Field.prototype = Object.create(ReflectionObject.prototype)).constructor = Field).className = "Field";
      var Enum = require_enum();
      var types = require_types();
      var util = require_util2();
      var Type;
      var ruleRe = /^required|optional|repeated$/;
      Field.fromJSON = function fromJSON(name, json) {
        var field = new Field(name, json.id, json.type, json.rule, json.extend, json.options, json.comment);
        if (json.edition)
          field._edition = json.edition;
        field._defaultEdition = "proto3";
        return field;
      };
      function Field(name, id, type, rule, extend, options, comment) {
        if (util.isObject(rule)) {
          comment = extend;
          options = rule;
          rule = extend = void 0;
        } else if (util.isObject(extend)) {
          comment = options;
          options = extend;
          extend = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!util.isInteger(id) || id < 0)
          throw TypeError("id must be a non-negative integer");
        if (!util.isString(type))
          throw TypeError("type must be a string");
        if (rule !== void 0 && !ruleRe.test(rule = rule.toString().toLowerCase()))
          throw TypeError("rule must be a string rule");
        if (extend !== void 0 && !util.isString(extend))
          throw TypeError("extend must be a string");
        if (rule === "proto3_optional") {
          rule = "optional";
        }
        this.rule = rule && rule !== "optional" ? rule : void 0;
        this.type = type;
        this.id = id;
        this.extend = extend || void 0;
        this.repeated = rule === "repeated";
        this.map = false;
        this.message = null;
        this.partOf = null;
        this.typeDefault = null;
        this.defaultValue = null;
        this.long = util.Long ? types.long[type] !== void 0 : (
          /* istanbul ignore next */
          false
        );
        this.bytes = type === "bytes";
        this.resolvedType = null;
        this.extensionField = null;
        this.declaringField = null;
        this.comment = comment;
      }
      Object.defineProperty(Field.prototype, "required", {
        get: function() {
          return this._features.field_presence === "LEGACY_REQUIRED";
        }
      });
      Object.defineProperty(Field.prototype, "optional", {
        get: function() {
          return !this.required;
        }
      });
      Object.defineProperty(Field.prototype, "delimited", {
        get: function() {
          return this.resolvedType instanceof Type && this._features.message_encoding === "DELIMITED";
        }
      });
      Object.defineProperty(Field.prototype, "packed", {
        get: function() {
          return this._features.repeated_field_encoding === "PACKED";
        }
      });
      Object.defineProperty(Field.prototype, "hasPresence", {
        get: function() {
          if (this.repeated || this.map) {
            return false;
          }
          return this.partOf || // oneofs
          this.declaringField || this.extensionField || // extensions
          this._features.field_presence !== "IMPLICIT";
        }
      });
      Field.prototype.setOption = function setOption(name, value, ifNotSet) {
        return ReflectionObject.prototype.setOption.call(this, name, value, ifNotSet);
      };
      Field.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "rule",
          this.rule !== "optional" && this.rule || void 0,
          "type",
          this.type,
          "id",
          this.id,
          "extend",
          this.extend,
          "options",
          this.options,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      Field.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if ((this.typeDefault = types.defaults[this.type]) === void 0) {
          this.resolvedType = (this.declaringField ? this.declaringField.parent : this.parent).lookupTypeOrEnum(this.type);
          if (this.resolvedType instanceof Type)
            this.typeDefault = null;
          else
            this.typeDefault = this.resolvedType.values[Object.keys(this.resolvedType.values)[0]];
        } else if (this.options && this.options.proto3_optional) {
          this.typeDefault = null;
        }
        if (this.options && this.options["default"] != null) {
          this.typeDefault = this.options["default"];
          if (this.resolvedType instanceof Enum && typeof this.typeDefault === "string")
            this.typeDefault = this.resolvedType.values[this.typeDefault];
        }
        if (this.options) {
          if (this.options.packed !== void 0 && this.resolvedType && !(this.resolvedType instanceof Enum))
            delete this.options.packed;
          if (!Object.keys(this.options).length)
            this.options = void 0;
        }
        if (this.long) {
          this.typeDefault = util.Long.fromNumber(this.typeDefault, this.type.charAt(0) === "u");
          if (Object.freeze)
            Object.freeze(this.typeDefault);
        } else if (this.bytes && typeof this.typeDefault === "string") {
          var buf;
          if (util.base64.test(this.typeDefault))
            util.base64.decode(this.typeDefault, buf = util.newBuffer(util.base64.length(this.typeDefault)), 0);
          else
            util.utf8.write(this.typeDefault, buf = util.newBuffer(util.utf8.length(this.typeDefault)), 0);
          this.typeDefault = buf;
        }
        if (this.map)
          this.defaultValue = util.emptyObject;
        else if (this.repeated)
          this.defaultValue = util.emptyArray;
        else
          this.defaultValue = this.typeDefault;
        if (this.parent instanceof Type)
          this.parent.ctor.prototype[this.name] = this.defaultValue;
        return ReflectionObject.prototype.resolve.call(this);
      };
      Field.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures(edition) {
        if (edition !== "proto2" && edition !== "proto3") {
          return {};
        }
        var features = {};
        if (this.rule === "required") {
          features.field_presence = "LEGACY_REQUIRED";
        }
        if (this.parent && types.defaults[this.type] === void 0) {
          var type = this.parent.get(this.type.split(".").pop());
          if (type && type instanceof Type && type.group) {
            features.message_encoding = "DELIMITED";
          }
        }
        if (this.getOption("packed") === true) {
          features.repeated_field_encoding = "PACKED";
        } else if (this.getOption("packed") === false) {
          features.repeated_field_encoding = "EXPANDED";
        }
        return features;
      };
      Field.prototype._resolveFeatures = function _resolveFeatures(edition) {
        return ReflectionObject.prototype._resolveFeatures.call(this, this._edition || edition);
      };
      Field.d = function decorateField(fieldId, fieldType, fieldRule, defaultValue) {
        if (typeof fieldType === "function")
          fieldType = util.decorateType(fieldType).name;
        else if (fieldType && typeof fieldType === "object")
          fieldType = util.decorateEnum(fieldType).name;
        return function fieldDecorator(prototype, fieldName) {
          util.decorateType(prototype.constructor).add(new Field(fieldName, fieldId, fieldType, fieldRule, { "default": defaultValue }));
        };
      };
      Field._configure = function configure(Type_) {
        Type = Type_;
      };
    }
  });

  // node_modules/protobufjs/src/oneof.js
  var require_oneof = __commonJS({
    "node_modules/protobufjs/src/oneof.js"(exports2, module2) {
      "use strict";
      module2.exports = OneOf;
      var ReflectionObject = require_object();
      ((OneOf.prototype = Object.create(ReflectionObject.prototype)).constructor = OneOf).className = "OneOf";
      var Field = require_field();
      var util = require_util2();
      function OneOf(name, fieldNames, options, comment) {
        if (!Array.isArray(fieldNames)) {
          options = fieldNames;
          fieldNames = void 0;
        }
        ReflectionObject.call(this, name, options);
        if (!(fieldNames === void 0 || Array.isArray(fieldNames)))
          throw TypeError("fieldNames must be an Array");
        this.oneof = fieldNames || [];
        this.fieldsArray = [];
        this.comment = comment;
      }
      OneOf.fromJSON = function fromJSON(name, json) {
        return new OneOf(name, json.oneof, json.options, json.comment);
      };
      OneOf.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "options",
          this.options,
          "oneof",
          this.oneof,
          "comment",
          keepComments ? this.comment : void 0
        ]);
      };
      function addFieldsToParent(oneof) {
        if (oneof.parent) {
          for (var i = 0; i < oneof.fieldsArray.length; ++i)
            if (!oneof.fieldsArray[i].parent)
              oneof.parent.add(oneof.fieldsArray[i]);
        }
      }
      OneOf.prototype.add = function add(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        if (field.parent && field.parent !== this.parent)
          field.parent.remove(field);
        this.oneof.push(field.name);
        this.fieldsArray.push(field);
        field.partOf = this;
        addFieldsToParent(this);
        return this;
      };
      OneOf.prototype.remove = function remove(field) {
        if (!(field instanceof Field))
          throw TypeError("field must be a Field");
        var index2 = this.fieldsArray.indexOf(field);
        if (index2 < 0)
          throw Error(field + " is not a member of " + this);
        this.fieldsArray.splice(index2, 1);
        index2 = this.oneof.indexOf(field.name);
        if (index2 > -1)
          this.oneof.splice(index2, 1);
        field.partOf = null;
        return this;
      };
      OneOf.prototype.onAdd = function onAdd(parent) {
        ReflectionObject.prototype.onAdd.call(this, parent);
        var self2 = this;
        for (var i = 0; i < this.oneof.length; ++i) {
          var field = parent.get(this.oneof[i]);
          if (field && !field.partOf) {
            field.partOf = self2;
            self2.fieldsArray.push(field);
          }
        }
        addFieldsToParent(this);
      };
      OneOf.prototype.onRemove = function onRemove(parent) {
        for (var i = 0, field; i < this.fieldsArray.length; ++i)
          if ((field = this.fieldsArray[i]).parent)
            field.parent.remove(field);
        ReflectionObject.prototype.onRemove.call(this, parent);
      };
      Object.defineProperty(OneOf.prototype, "isProto3Optional", {
        get: function() {
          if (this.fieldsArray == null || this.fieldsArray.length !== 1) {
            return false;
          }
          var field = this.fieldsArray[0];
          return field.options != null && field.options["proto3_optional"] === true;
        }
      });
      OneOf.d = function decorateOneOf() {
        var fieldNames = new Array(arguments.length), index2 = 0;
        while (index2 < arguments.length)
          fieldNames[index2] = arguments[index2++];
        return function oneOfDecorator(prototype, oneofName) {
          util.decorateType(prototype.constructor).add(new OneOf(oneofName, fieldNames));
          Object.defineProperty(prototype, oneofName, {
            get: util.oneOfGetter(fieldNames),
            set: util.oneOfSetter(fieldNames)
          });
        };
      };
    }
  });

  // node_modules/protobufjs/src/object.js
  var require_object = __commonJS({
    "node_modules/protobufjs/src/object.js"(exports2, module2) {
      "use strict";
      module2.exports = ReflectionObject;
      ReflectionObject.className = "ReflectionObject";
      var OneOf = require_oneof();
      var util = require_util2();
      var Root;
      var editions2023Defaults = { enum_type: "OPEN", field_presence: "EXPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
      var proto2Defaults = { enum_type: "CLOSED", field_presence: "EXPLICIT", json_format: "LEGACY_BEST_EFFORT", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "EXPANDED", utf8_validation: "NONE" };
      var proto3Defaults = { enum_type: "OPEN", field_presence: "IMPLICIT", json_format: "ALLOW", message_encoding: "LENGTH_PREFIXED", repeated_field_encoding: "PACKED", utf8_validation: "VERIFY" };
      function ReflectionObject(name, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (options && !util.isObject(options))
          throw TypeError("options must be an object");
        this.options = options;
        this.parsedOptions = null;
        this.name = name;
        this._edition = null;
        this._defaultEdition = "proto2";
        this._features = {};
        this._featuresResolved = false;
        this.parent = null;
        this.resolved = false;
        this.comment = null;
        this.filename = null;
      }
      Object.defineProperties(ReflectionObject.prototype, {
        /**
         * Reference to the root namespace.
         * @name ReflectionObject#root
         * @type {Root}
         * @readonly
         */
        root: {
          get: function() {
            var ptr = this;
            while (ptr.parent !== null)
              ptr = ptr.parent;
            return ptr;
          }
        },
        /**
         * Full name including leading dot.
         * @name ReflectionObject#fullName
         * @type {string}
         * @readonly
         */
        fullName: {
          get: function() {
            var path = [this.name], ptr = this.parent;
            while (ptr) {
              path.unshift(ptr.name);
              ptr = ptr.parent;
            }
            return path.join(".");
          }
        }
      });
      ReflectionObject.prototype.toJSON = /* istanbul ignore next */
      function toJSON() {
        throw Error();
      };
      ReflectionObject.prototype.onAdd = function onAdd(parent) {
        if (this.parent && this.parent !== parent)
          this.parent.remove(this);
        this.parent = parent;
        this.resolved = false;
        var root = parent.root;
        if (root instanceof Root)
          root._handleAdd(this);
      };
      ReflectionObject.prototype.onRemove = function onRemove(parent) {
        var root = parent.root;
        if (root instanceof Root)
          root._handleRemove(this);
        this.parent = null;
        this.resolved = false;
      };
      ReflectionObject.prototype.resolve = function resolve() {
        if (this.resolved)
          return this;
        if (this.root instanceof Root)
          this.resolved = true;
        return this;
      };
      ReflectionObject.prototype._resolveFeaturesRecursive = function _resolveFeaturesRecursive(edition) {
        return this._resolveFeatures(this._edition || edition);
      };
      ReflectionObject.prototype._resolveFeatures = function _resolveFeatures(edition) {
        if (this._featuresResolved) {
          return;
        }
        var defaults = {};
        if (!edition) {
          throw new Error("Unknown edition for " + this.fullName);
        }
        var protoFeatures = Object.assign(
          this.options ? Object.assign({}, this.options.features) : {},
          this._inferLegacyProtoFeatures(edition)
        );
        if (this._edition) {
          if (edition === "proto2") {
            defaults = Object.assign({}, proto2Defaults);
          } else if (edition === "proto3") {
            defaults = Object.assign({}, proto3Defaults);
          } else if (edition === "2023") {
            defaults = Object.assign({}, editions2023Defaults);
          } else {
            throw new Error("Unknown edition: " + edition);
          }
          this._features = Object.assign(defaults, protoFeatures || {});
          this._featuresResolved = true;
          return;
        }
        if (this.partOf instanceof OneOf) {
          var lexicalParentFeaturesCopy = Object.assign({}, this.partOf._features);
          this._features = Object.assign(lexicalParentFeaturesCopy, protoFeatures || {});
        } else if (this.declaringField) {
        } else if (this.parent) {
          var parentFeaturesCopy = Object.assign({}, this.parent._features);
          this._features = Object.assign(parentFeaturesCopy, protoFeatures || {});
        } else {
          throw new Error("Unable to find a parent for " + this.fullName);
        }
        if (this.extensionField) {
          this.extensionField._features = this._features;
        }
        this._featuresResolved = true;
      };
      ReflectionObject.prototype._inferLegacyProtoFeatures = function _inferLegacyProtoFeatures() {
        return {};
      };
      ReflectionObject.prototype.getOption = function getOption(name) {
        if (this.options)
          return this.options[name];
        return void 0;
      };
      ReflectionObject.prototype.setOption = function setOption(name, value, ifNotSet) {
        if (!this.options)
          this.options = {};
        if (/^features\./.test(name)) {
          util.setProperty(this.options, name, value, ifNotSet);
        } else if (!ifNotSet || this.options[name] === void 0) {
          if (this.getOption(name) !== value) this.resolved = false;
          this.options[name] = value;
        }
        return this;
      };
      ReflectionObject.prototype.setParsedOption = function setParsedOption(name, value, propName) {
        if (!this.parsedOptions) {
          this.parsedOptions = [];
        }
        var parsedOptions = this.parsedOptions;
        if (propName) {
          var opt = parsedOptions.find(function(opt2) {
            return Object.prototype.hasOwnProperty.call(opt2, name);
          });
          if (opt) {
            var newValue = opt[name];
            util.setProperty(newValue, propName, value);
          } else {
            opt = {};
            opt[name] = util.setProperty({}, propName, value);
            parsedOptions.push(opt);
          }
        } else {
          var newOpt = {};
          newOpt[name] = value;
          parsedOptions.push(newOpt);
        }
        return this;
      };
      ReflectionObject.prototype.setOptions = function setOptions(options, ifNotSet) {
        if (options)
          for (var keys = Object.keys(options), i = 0; i < keys.length; ++i)
            this.setOption(keys[i], options[keys[i]], ifNotSet);
        return this;
      };
      ReflectionObject.prototype.toString = function toString() {
        var className = this.constructor.className, fullName = this.fullName;
        if (fullName.length)
          return className + " " + fullName;
        return className;
      };
      ReflectionObject.prototype._editionToJSON = function _editionToJSON() {
        if (!this._edition || this._edition === "proto3") {
          return void 0;
        }
        return this._edition;
      };
      ReflectionObject._configure = function(Root_) {
        Root = Root_;
      };
    }
  });

  // node_modules/protobufjs/src/enum.js
  var require_enum = __commonJS({
    "node_modules/protobufjs/src/enum.js"(exports2, module2) {
      "use strict";
      module2.exports = Enum;
      var ReflectionObject = require_object();
      ((Enum.prototype = Object.create(ReflectionObject.prototype)).constructor = Enum).className = "Enum";
      var Namespace = require_namespace();
      var util = require_util2();
      function Enum(name, values, options, comment, comments, valuesOptions) {
        ReflectionObject.call(this, name, options);
        if (values && typeof values !== "object")
          throw TypeError("values must be an object");
        this.valuesById = {};
        this.values = Object.create(this.valuesById);
        this.comment = comment;
        this.comments = comments || {};
        this.valuesOptions = valuesOptions;
        this._valuesFeatures = {};
        this.reserved = void 0;
        if (values) {
          for (var keys = Object.keys(values), i = 0; i < keys.length; ++i)
            if (typeof values[keys[i]] === "number")
              this.valuesById[this.values[keys[i]] = values[keys[i]]] = keys[i];
        }
      }
      Enum.prototype._resolveFeatures = function _resolveFeatures(edition) {
        edition = this._edition || edition;
        ReflectionObject.prototype._resolveFeatures.call(this, edition);
        Object.keys(this.values).forEach((key) => {
          var parentFeaturesCopy = Object.assign({}, this._features);
          this._valuesFeatures[key] = Object.assign(parentFeaturesCopy, this.valuesOptions && this.valuesOptions[key] && this.valuesOptions[key].features);
        });
        return this;
      };
      Enum.fromJSON = function fromJSON(name, json) {
        var enm = new Enum(name, json.values, json.options, json.comment, json.comments);
        enm.reserved = json.reserved;
        if (json.edition)
          enm._edition = json.edition;
        enm._defaultEdition = "proto3";
        return enm;
      };
      Enum.prototype.toJSON = function toJSON(toJSONOptions) {
        var keepComments = toJSONOptions ? Boolean(toJSONOptions.keepComments) : false;
        return util.toObject([
          "edition",
          this._editionToJSON(),
          "options",
          this.options,
          "valuesOptions",
          this.valuesOptions,
          "values",
          this.values,
          "reserved",
          this.reserved && this.reserved.length ? this.reserved : void 0,
          "comment",
          keepComments ? this.comment : void 0,
          "comments",
          keepComments ? this.comments : void 0
        ]);
      };
      Enum.prototype.add = function add(name, id, comment, options) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        if (!util.isInteger(id))
          throw TypeError("id must be an integer");
        if (this.values[name] !== void 0)
          throw Error("duplicate name '" + name + "' in " + this);
        if (this.isReservedId(id))
          throw Error("id " + id + " is reserved in " + this);
        if (this.isReservedName(name))
          throw Error("name '" + name + "' is reserved in " + this);
        if (this.valuesById[id] !== void 0) {
          if (!(this.options && this.options.allow_alias))
            throw Error("duplicate id " + id + " in " + this);
          this.values[name] = id;
        } else
          this.valuesById[this.values[name] = id] = name;
        if (options) {
          if (this.valuesOptions === void 0)
            this.valuesOptions = {};
          this.valuesOptions[name] = options || null;
        }
        this.comments[name] = comment || null;
        return this;
      };
      Enum.prototype.remove = function remove(name) {
        if (!util.isString(name))
          throw TypeError("name must be a string");
        var val = this.values[name];
        if (val == null)
          throw Error("name '" + name + "' does not exist in " + this);
        delete this.valuesById[val];
        delete this.values[name];
        delete this.comments[name];
        if (this.valuesOptions)
          delete this.valuesOptions[name];
        return this;
      };
      Enum.prototype.isReservedId = function isReservedId(id) {
        return Namespace.isReservedId(this.reserved, id);
      };
      Enum.prototype.isReservedName = function isReservedName(name) {
        return Namespace.isReservedName(this.reserved, name);
      };
    }
  });

  // node_modules/protobufjs/src/encoder.js
  var require_encoder = __commonJS({
    "node_modules/protobufjs/src/encoder.js"(exports2, module2) {
      "use strict";
      module2.exports = encoder;
      var Enum = require_enum();
      var types = require_types();
      var util = require_util2();
      function genTypePartial(gen, field, fieldIndex, ref) {
        return field.delimited ? gen("types[%i].encode(%s,w.uint32(%i)).uint32(%i)", fieldIndex, ref, (field.id << 3 | 3) >>> 0, (field.id << 3 | 4) >>> 0) : gen("types[%i].encode(%s,w.uint32(%i).fork()).ldelim()", fieldIndex, ref, (field.id << 3 | 2) >>> 0);
      }
      function encoder(mtype) {
        var gen = util.codegen(["m", "w"], mtype.name + "$encode")("if(!w)")("w=Writer.create()");
        var i, ref;
        var fields = (
          /* initializes */
          mtype.fieldsArray.slice().sort(util.compareFieldsById)
        );
        for (var i = 0; i < fields.length; ++i) {
          var field = fields[i].resolve(), index2 = mtype._fieldsArray.indexOf(field), type = field.resolvedType instanceof Enum ? "int32" : field.type, wireType = types.basic[type];
          ref = "m" + util.safeProp(field.name);
          if (field.map) {
            gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j)){", ref, field.name)("for(var ks=Object.keys(%s),i=0;i<ks.length;++i){", ref)("w.uint32(%i).fork().uint32(%i).%s(ks[i])", (field.id << 3 | 2) >>> 0, 8 | types.mapKey[field.keyType], field.keyType);
            if (wireType === void 0) gen("types[%i].encode(%s[ks[i]],w.uint32(18).fork()).ldelim().ldelim()", index2, ref);
            else gen(".uint32(%i).%s(%s[ks[i]]).ldelim()", 16 | wireType, type, ref);
            gen("}")("}");
          } else if (field.repeated) {
            gen("if(%s!=null&&%s.length){", ref, ref);
            if (field.packed && types.packed[type] !== void 0) {
              gen("w.uint32(%i).fork()", (field.id << 3 | 2) >>> 0)("for(var i=0;i<%s.length;++i)", ref)("w.%s(%s[i])", type, ref)("w.ldelim()");
            } else {
              gen("for(var i=0;i<%s.length;++i)", ref);
              if (wireType === void 0)
                genTypePartial(gen, field, index2, ref + "[i]");
              else gen("w.uint32(%i).%s(%s[i])", (field.id << 3 | wireType) >>> 0, type, ref);
            }
            gen("}");
          } else {
            if (field.optional) gen("if(%s!=null&&Object.hasOwnProperty.call(m,%j))", ref, field.name);
            if (wireType === void 0)
              genTypePartial(gen, field, index2, ref);
            else gen("w.uint32(%i).%s(%s)", (field.id << 3 | wireType) >>> 0, type, ref);
          }
        }
        return gen("return w");
      }
    }
  });

  // node_modules/protobufjs/src/index-light.js
  var require_index_light = __commonJS({
    "node_modules/protobufjs/src/index-light.js"(exports2, module2) {
      "use strict";
      var protobuf = module2.exports = require_index_minimal();
      protobuf.build = "light";
      function load(filename, root, callback) {
        if (typeof root === "function") {
          callback = root;
          root = new protobuf.Root();
        } else if (!root)
          root = new protobuf.Root();
        return root.load(filename, callback);
      }
      protobuf.load = load;
      function loadSync(filename, root) {
        if (!root)
          root = new protobuf.Root();
        return root.loadSync(filename);
      }
      protobuf.loadSync = loadSync;
      protobuf.encoder = require_encoder();
      protobuf.decoder = require_decoder();
      protobuf.verifier = require_verifier();
      protobuf.converter = require_converter();
      protobuf.ReflectionObject = require_object();
      protobuf.Namespace = require_namespace();
      protobuf.Root = require_root();
      protobuf.Enum = require_enum();
      protobuf.Type = require_type2();
      protobuf.Field = require_field();
      protobuf.OneOf = require_oneof();
      protobuf.MapField = require_mapfield();
      protobuf.Service = require_service2();
      protobuf.Method = require_method();
      protobuf.Message = require_message();
      protobuf.wrappers = require_wrappers();
      protobuf.types = require_types();
      protobuf.util = require_util2();
      protobuf.ReflectionObject._configure(protobuf.Root);
      protobuf.Namespace._configure(protobuf.Type, protobuf.Service, protobuf.Enum);
      protobuf.Root._configure(protobuf.Type);
      protobuf.Field._configure(protobuf.Type);
    }
  });

  // node_modules/protobufjs/src/tokenize.js
  var require_tokenize = __commonJS({
    "node_modules/protobufjs/src/tokenize.js"(exports2, module2) {
      "use strict";
      module2.exports = tokenize;
      var delimRe = /[\s{}=;:[\],'"()<>]/g;
      var stringDoubleRe = /(?:"([^"\\]*(?:\\.[^"\\]*)*)")/g;
      var stringSingleRe = /(?:'([^'\\]*(?:\\.[^'\\]*)*)')/g;
      var setCommentRe = /^ *[*/]+ */;
      var setCommentAltRe = /^\s*\*?\/*/;
      var setCommentSplitRe = /\n/g;
      var whitespaceRe = /\s/;
      var unescapeRe = /\\(.?)/g;
      var unescapeMap = {
        "0": "\0",
        "r": "\r",
        "n": "\n",
        "t": "	"
      };
      function unescape2(str) {
        return str.replace(unescapeRe, function($0, $1) {
          switch ($1) {
            case "\\":
            case "":
              return $1;
            default:
              return unescapeMap[$1] || "";
          }
        });
      }
      tokenize.unescape = unescape2;
      function tokenize(source, alternateCommentMode) {
        source = source.toString();
        var offset = 0, length = source.length, line = 1, lastCommentLine = 0, comments = {};
        var stack = [];
        var stringDelim = null;
        function illegal(subject) {
          return Error("illegal " + subject + " (line " + line + ")");
        }
        function readString() {
          var re = stringDelim === "'" ? stringSingleRe : stringDoubleRe;
          re.lastIndex = offset - 1;
          var match = re.exec(source);
          if (!match)
            throw illegal("string");
          offset = re.lastIndex;
          push2(stringDelim);
          stringDelim = null;
          return unescape2(match[1]);
        }
        function charAt(pos) {
          return source.charAt(pos);
        }
        function setComment(start, end, isLeading) {
          var comment = {
            type: source.charAt(start++),
            lineEmpty: false,
            leading: isLeading
          };
          var lookback;
          if (alternateCommentMode) {
            lookback = 2;
          } else {
            lookback = 3;
          }
          var commentOffset = start - lookback, c;
          do {
            if (--commentOffset < 0 || (c = source.charAt(commentOffset)) === "\n") {
              comment.lineEmpty = true;
              break;
            }
          } while (c === " " || c === "	");
          var lines = source.substring(start, end).split(setCommentSplitRe);
          for (var i = 0; i < lines.length; ++i)
            lines[i] = lines[i].replace(alternateCommentMode ? setCommentAltRe : setCommentRe, "").trim();
          comment.text = lines.join("\n").trim();
          comments[line] = comment;
          lastCommentLine = line;
        }
        function isDoubleSlashCommentLine(startOffset) {
          var endOffset = findEndOfLine(startOffset);
          var lineText = source.substring(startOffset, endOffset);
          var isComment = /^\s*\/\//.test(lineText);
          return isComment;
        }
        function findEndOfLine(cursor) {
          var endOffset = cursor;
          while (endOffset < length && charAt(endOffset) !== "\n") {
            endOffset++;
          }
          return endOffset;
        }
        function next() {
          if (stack.length > 0)
            return stack.shift();
          if (stringDelim)
            return readString();
          var repeat, prev, curr, start, isDoc, isLeadingComment = offset === 0;
          do {
            if (offset === length)
              return null;
            repeat = false;
            while (whitespaceRe.test(curr = charAt(offset))) {
              if (curr === "\n") {
                isLeadingComment = true;
                ++line;
              }
              if (++offset === length)
                return null;
            }
            if (charAt(offset) === "/") {
              if (++offset === length) {
                throw illegal("comment");
              }
              if (charAt(offset) === "/") {
                if (!alternateCommentMode) {
                  isDoc = charAt(start = offset + 1) === "/";
                  while (charAt(++offset) !== "\n") {
                    if (offset === length) {
                      return null;
                    }
                  }
                  ++offset;
                  if (isDoc) {
                    setComment(start, offset - 1, isLeadingComment);
                    isLeadingComment = true;
                  }
                  ++line;
                  repeat = true;
                } else {
                  start = offset;
                  isDoc = false;
                  if (isDoubleSlashCommentLine(offset - 1)) {
                    isDoc = true;
                    do {
                      offset = findEndOfLine(offset);
                      if (offset === length) {
                        break;
                      }
                      offset++;
                      if (!isLeadingComment) {
                        break;
                      }
                    } while (isDoubleSlashCommentLine(offset));
                  } else {
                    offset = Math.min(length, findEndOfLine(offset) + 1);
                  }
                  if (isDoc) {
                    setComment(start, offset, isLeadingComment);
                    isLeadingComment = true;
                  }
                  line++;
                  repeat = true;
                }
              } else if ((curr = charAt(offset)) === "*") {
                start = offset + 1;
                isDoc = alternateCommentMode || charAt(start) === "*";
                do {
                  if (curr === "\n") {
                    ++line;
                  }
                  if (++offset === length) {
                    throw illegal("comment");
                  }
                  prev = curr;
                  curr = charAt(offset);
                } while (prev !== "*" || curr !== "/");
                ++offset;
                if (isDoc) {
                  setComment(start, offset - 2, isLeadingComment);
                  isLeadingComment = true;
                }
                repeat = true;
              } else {
                return "/";
              }
            }
          } while (repeat);
          var end = offset;
          delimRe.lastIndex = 0;
          var delim = delimRe.test(charAt(end++));
          if (!delim)
            while (end < length && !delimRe.test(charAt(end)))
              ++end;
          var token = source.substring(offset, offset = end);
          if (token === '"' || token === "'")
            stringDelim = token;
          return token;
        }
        function push2(token) {
          stack.push(token);
        }
        function peek() {
          if (!stack.length) {
            var token = next();
            if (token === null)
              return null;
            push2(token);
          }
          return stack[0];
        }
        function skip(expected, optional) {
          var actual = peek(), equals = actual === expected;
          if (equals) {
            next();
            return true;
          }
          if (!optional)
            throw illegal("token '" + actual + "', '" + expected + "' expected");
          return false;
        }
        function cmnt(trailingLine) {
          var ret = null;
          var comment;
          if (trailingLine === void 0) {
            comment = comments[line - 1];
            delete comments[line - 1];
            if (comment && (alternateCommentMode || comment.type === "*" || comment.lineEmpty)) {
              ret = comment.leading ? comment.text : null;
            }
          } else {
            if (lastCommentLine < trailingLine) {
              peek();
            }
            comment = comments[trailingLine];
            delete comments[trailingLine];
            if (comment && !comment.lineEmpty && (alternateCommentMode || comment.type === "/")) {
              ret = comment.leading ? null : comment.text;
            }
          }
          return ret;
        }
        return Object.defineProperty({
          next,
          peek,
          push: push2,
          skip,
          cmnt
        }, "line", {
          get: function() {
            return line;
          }
        });
      }
    }
  });

  // node_modules/protobufjs/src/parse.js
  var require_parse2 = __commonJS({
    "node_modules/protobufjs/src/parse.js"(exports2, module2) {
      "use strict";
      module2.exports = parse;
      parse.filename = null;
      parse.defaults = { keepCase: false };
      var tokenize = require_tokenize();
      var Root = require_root();
      var Type = require_type2();
      var Field = require_field();
      var MapField = require_mapfield();
      var OneOf = require_oneof();
      var Enum = require_enum();
      var Service = require_service2();
      var Method = require_method();
      var ReflectionObject = require_object();
      var types = require_types();
      var util = require_util2();
      var base10Re = /^[1-9][0-9]*$/;
      var base10NegRe = /^-?[1-9][0-9]*$/;
      var base16Re = /^0[x][0-9a-fA-F]+$/;
      var base16NegRe = /^-?0[x][0-9a-fA-F]+$/;
      var base8Re = /^0[0-7]+$/;
      var base8NegRe = /^-?0[0-7]+$/;
      var numberRe = /^(?![eE])[0-9]*(?:\.[0-9]*)?(?:[eE][+-]?[0-9]+)?$/;
      var nameRe = /^[a-zA-Z_][a-zA-Z_0-9]*$/;
      var typeRefRe = /^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/;
      function parse(source, root, options) {
        if (!(root instanceof Root)) {
          options = root;
          root = new Root();
        }
        if (!options)
          options = parse.defaults;
        var preferTrailingComment = options.preferTrailingComment || false;
        var tn = tokenize(source, options.alternateCommentMode || false), next = tn.next, push2 = tn.push, peek = tn.peek, skip = tn.skip, cmnt = tn.cmnt;
        var head = true, pkg, imports, weakImports, edition = "proto2";
        var ptr = root;
        var topLevelObjects = [];
        var topLevelOptions = {};
        var applyCase = options.keepCase ? function(name) {
          return name;
        } : util.camelCase;
        function resolveFileFeatures() {
          topLevelObjects.forEach((obj) => {
            obj._edition = edition;
            Object.keys(topLevelOptions).forEach((opt) => {
              if (obj.getOption(opt) !== void 0) return;
              obj.setOption(opt, topLevelOptions[opt], true);
            });
          });
        }
        function illegal(token2, name, insideTryCatch) {
          var filename = parse.filename;
          if (!insideTryCatch)
            parse.filename = null;
          return Error("illegal " + (name || "token") + " '" + token2 + "' (" + (filename ? filename + ", " : "") + "line " + tn.line + ")");
        }
        function readString() {
          var values = [], token2;
          do {
            if ((token2 = next()) !== '"' && token2 !== "'")
              throw illegal(token2);
            values.push(next());
            skip(token2);
            token2 = peek();
          } while (token2 === '"' || token2 === "'");
          return values.join("");
        }
        function readValue(acceptTypeRef) {
          var token2 = next();
          switch (token2) {
            case "'":
            case '"':
              push2(token2);
              return readString();
            case "true":
            case "TRUE":
              return true;
            case "false":
            case "FALSE":
              return false;
          }
          try {
            return parseNumber(
              token2,
              /* insideTryCatch */
              true
            );
          } catch (e) {
            if (acceptTypeRef && typeRefRe.test(token2))
              return token2;
            throw illegal(token2, "value");
          }
        }
        function readRanges(target, acceptStrings) {
          var token2, start;
          do {
            if (acceptStrings && ((token2 = peek()) === '"' || token2 === "'")) {
              var str = readString();
              target.push(str);
              if (edition >= 2023) {
                throw illegal(str, "id");
              }
            } else {
              try {
                target.push([start = parseId(next()), skip("to", true) ? parseId(next()) : start]);
              } catch (err2) {
                if (acceptStrings && typeRefRe.test(token2) && edition >= 2023) {
                  target.push(token2);
                } else {
                  throw err2;
                }
              }
            }
          } while (skip(",", true));
          var dummy = { options: void 0 };
          dummy.setOption = function(name, value) {
            if (this.options === void 0) this.options = {};
            this.options[name] = value;
          };
          ifBlock(
            dummy,
            function parseRange_block(token3) {
              if (token3 === "option") {
                parseOption(dummy, token3);
                skip(";");
              } else
                throw illegal(token3);
            },
            function parseRange_line() {
              parseInlineOptions(dummy);
            }
          );
        }
        function parseNumber(token2, insideTryCatch) {
          var sign = 1;
          if (token2.charAt(0) === "-") {
            sign = -1;
            token2 = token2.substring(1);
          }
          switch (token2) {
            case "inf":
            case "INF":
            case "Inf":
              return sign * Infinity;
            case "nan":
            case "NAN":
            case "Nan":
            case "NaN":
              return NaN;
            case "0":
              return 0;
          }
          if (base10Re.test(token2))
            return sign * parseInt(token2, 10);
          if (base16Re.test(token2))
            return sign * parseInt(token2, 16);
          if (base8Re.test(token2))
            return sign * parseInt(token2, 8);
          if (numberRe.test(token2))
            return sign * parseFloat(token2);
          throw illegal(token2, "number", insideTryCatch);
        }
        function parseId(token2, acceptNegative) {
          switch (token2) {
            case "max":
            case "MAX":
            case "Max":
              return 536870911;
            case "0":
              return 0;
          }
          if (!acceptNegative && token2.charAt(0) === "-")
            throw illegal(token2, "id");
          if (base10NegRe.test(token2))
            return parseInt(token2, 10);
          if (base16NegRe.test(token2))
            return parseInt(token2, 16);
          if (base8NegRe.test(token2))
            return parseInt(token2, 8);
          throw illegal(token2, "id");
        }
        function parsePackage() {
          if (pkg !== void 0)
            throw illegal("package");
          pkg = next();
          if (!typeRefRe.test(pkg))
            throw illegal(pkg, "name");
          ptr = ptr.define(pkg);
          skip(";");
        }
        function parseImport() {
          var token2 = peek();
          var whichImports;
          switch (token2) {
            case "weak":
              whichImports = weakImports || (weakImports = []);
              next();
              break;
            case "public":
              next();
            // eslint-disable-next-line no-fallthrough
            default:
              whichImports = imports || (imports = []);
              break;
          }
          token2 = readString();
          skip(";");
          whichImports.push(token2);
        }
        function parseSyntax() {
          skip("=");
          edition = readString();
          if (edition < 2023)
            throw illegal(edition, "syntax");
          skip(";");
        }
        function parseEdition() {
          skip("=");
          edition = readString();
          const supportedEditions = ["2023"];
          if (!supportedEditions.includes(edition))
            throw illegal(edition, "edition");
          skip(";");
        }
        function parseCommon(parent, token2) {
          switch (token2) {
            case "option":
              parseOption(parent, token2);
              skip(";");
              return true;
            case "message":
              parseType(parent, token2);
              return true;
            case "enum":
              parseEnum(parent, token2);
              return true;
            case "service":
              parseService(parent, token2);
              return true;
            case "extend":
              parseExtension(parent, token2);
              return true;
          }
          return false;
        }
        function ifBlock(obj, fnIf, fnElse) {
          var trailingLine = tn.line;
          if (obj) {
            if (typeof obj.comment !== "string") {
              obj.comment = cmnt();
            }
            obj.filename = parse.filename;
          }
          if (skip("{", true)) {
            var token2;
            while ((token2 = next()) !== "}")
              fnIf(token2);
            skip(";", true);
          } else {
            if (fnElse)
              fnElse();
            skip(";");
            if (obj && (typeof obj.comment !== "string" || preferTrailingComment))
              obj.comment = cmnt(trailingLine) || obj.comment;
          }
        }
        function parseType(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "type name");
          var type = new Type(token2);
          ifBlock(type, function parseType_block(token3) {
            if (parseCommon(type, token3))
              return;
            switch (token3) {
              case "map":
                parseMapField(type, token3);
                break;
              case "required":
                if (edition !== "proto2")
                  throw illegal(token3);
              /* eslint-disable no-fallthrough */
              case "repeated":
                parseField(type, token3);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional");
                } else if (edition !== "proto2") {
                  throw illegal(token3);
                } else {
                  parseField(type, "optional");
                }
                break;
              case "oneof":
                parseOneOf(type, token3);
                break;
              case "extensions":
                readRanges(type.extensions || (type.extensions = []));
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3)) {
                  throw illegal(token3);
                }
                push2(token3);
                parseField(type, "optional");
                break;
            }
          });
          parent.add(type);
          if (parent === ptr) {
            topLevelObjects.push(type);
          }
        }
        function parseField(parent, rule, extend) {
          var type = next();
          if (type === "group") {
            parseGroup(parent, rule);
            return;
          }
          while (type.endsWith(".") || peek().startsWith(".")) {
            type += next();
          }
          if (!typeRefRe.test(type))
            throw illegal(type, "type");
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          name = applyCase(name);
          skip("=");
          var field = new Field(name, parseId(next()), type, rule, extend);
          ifBlock(field, function parseField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, function parseField_line() {
            parseInlineOptions(field);
          });
          if (rule === "proto3_optional") {
            var oneof = new OneOf("_" + name);
            field.setOption("proto3_optional", true);
            oneof.add(field);
            parent.add(oneof);
          } else {
            parent.add(field);
          }
          if (parent === ptr) {
            topLevelObjects.push(field);
          }
        }
        function parseGroup(parent, rule) {
          if (edition >= 2023) {
            throw illegal("group");
          }
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          var fieldName = util.lcFirst(name);
          if (name === fieldName)
            name = util.ucFirst(name);
          skip("=");
          var id = parseId(next());
          var type = new Type(name);
          type.group = true;
          var field = new Field(fieldName, id, name, rule);
          field.filename = parse.filename;
          ifBlock(type, function parseGroup_block(token2) {
            switch (token2) {
              case "option":
                parseOption(type, token2);
                skip(";");
                break;
              case "required":
              case "repeated":
                parseField(type, token2);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(type, "proto3_optional");
                } else {
                  parseField(type, "optional");
                }
                break;
              case "message":
                parseType(type, token2);
                break;
              case "enum":
                parseEnum(type, token2);
                break;
              case "reserved":
                readRanges(type.reserved || (type.reserved = []), true);
                break;
              /* istanbul ignore next */
              default:
                throw illegal(token2);
            }
          });
          parent.add(type).add(field);
        }
        function parseMapField(parent) {
          skip("<");
          var keyType = next();
          if (types.mapKey[keyType] === void 0)
            throw illegal(keyType, "type");
          skip(",");
          var valueType = next();
          if (!typeRefRe.test(valueType))
            throw illegal(valueType, "type");
          skip(">");
          var name = next();
          if (!nameRe.test(name))
            throw illegal(name, "name");
          skip("=");
          var field = new MapField(applyCase(name), parseId(next()), keyType, valueType);
          ifBlock(field, function parseMapField_block(token2) {
            if (token2 === "option") {
              parseOption(field, token2);
              skip(";");
            } else
              throw illegal(token2);
          }, function parseMapField_line() {
            parseInlineOptions(field);
          });
          parent.add(field);
        }
        function parseOneOf(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var oneof = new OneOf(applyCase(token2));
          ifBlock(oneof, function parseOneOf_block(token3) {
            if (token3 === "option") {
              parseOption(oneof, token3);
              skip(";");
            } else {
              push2(token3);
              parseField(oneof, "optional");
            }
          });
          parent.add(oneof);
        }
        function parseEnum(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var enm = new Enum(token2);
          ifBlock(enm, function parseEnum_block(token3) {
            switch (token3) {
              case "option":
                parseOption(enm, token3);
                skip(";");
                break;
              case "reserved":
                readRanges(enm.reserved || (enm.reserved = []), true);
                if (enm.reserved === void 0) enm.reserved = [];
                break;
              default:
                parseEnumValue(enm, token3);
            }
          });
          parent.add(enm);
          if (parent === ptr) {
            topLevelObjects.push(enm);
          }
        }
        function parseEnumValue(parent, token2) {
          if (!nameRe.test(token2))
            throw illegal(token2, "name");
          skip("=");
          var value = parseId(next(), true), dummy = {
            options: void 0
          };
          dummy.getOption = function(name) {
            return this.options[name];
          };
          dummy.setOption = function(name, value2) {
            ReflectionObject.prototype.setOption.call(dummy, name, value2);
          };
          dummy.setParsedOption = function() {
            return void 0;
          };
          ifBlock(dummy, function parseEnumValue_block(token3) {
            if (token3 === "option") {
              parseOption(dummy, token3);
              skip(";");
            } else
              throw illegal(token3);
          }, function parseEnumValue_line() {
            parseInlineOptions(dummy);
          });
          parent.add(token2, value, dummy.comment, dummy.parsedOptions || dummy.options);
        }
        function parseOption(parent, token2) {
          var option;
          var propName;
          var isOption = true;
          if (token2 === "option") {
            token2 = next();
          }
          while (token2 !== "=") {
            if (token2 === "(") {
              var parensValue = next();
              skip(")");
              token2 = "(" + parensValue + ")";
            }
            if (isOption) {
              isOption = false;
              if (token2.includes(".") && !token2.includes("(")) {
                var tokens = token2.split(".");
                option = tokens[0] + ".";
                token2 = tokens[1];
                continue;
              }
              option = token2;
            } else {
              propName = propName ? propName += token2 : token2;
            }
            token2 = next();
          }
          var name = propName ? option.concat(propName) : option;
          var optionValue = parseOptionValue(parent, name);
          propName = propName && propName[0] === "." ? propName.slice(1) : propName;
          option = option && option[option.length - 1] === "." ? option.slice(0, -1) : option;
          setParsedOption(parent, option, optionValue, propName);
        }
        function parseOptionValue(parent, name) {
          if (skip("{", true)) {
            var objectResult = {};
            while (!skip("}", true)) {
              if (!nameRe.test(token = next())) {
                throw illegal(token, "name");
              }
              if (token === null) {
                throw illegal(token, "end of input");
              }
              var value;
              var propName = token;
              skip(":", true);
              if (peek() === "{") {
                value = parseOptionValue(parent, name + "." + token);
              } else if (peek() === "[") {
                value = [];
                var lastValue;
                if (skip("[", true)) {
                  do {
                    lastValue = readValue(true);
                    value.push(lastValue);
                  } while (skip(",", true));
                  skip("]");
                  if (typeof lastValue !== "undefined") {
                    setOption(parent, name + "." + token, lastValue);
                  }
                }
              } else {
                value = readValue(true);
                setOption(parent, name + "." + token, value);
              }
              var prevValue = objectResult[propName];
              if (prevValue)
                value = [].concat(prevValue).concat(value);
              objectResult[propName] = value;
              skip(",", true);
              skip(";", true);
            }
            return objectResult;
          }
          var simpleValue = readValue(true);
          setOption(parent, name, simpleValue);
          return simpleValue;
        }
        function setOption(parent, name, value) {
          if (ptr === parent && /^features\./.test(name)) {
            topLevelOptions[name] = value;
            return;
          }
          if (parent.setOption)
            parent.setOption(name, value);
        }
        function setParsedOption(parent, name, value, propName) {
          if (parent.setParsedOption)
            parent.setParsedOption(name, value, propName);
        }
        function parseInlineOptions(parent) {
          if (skip("[", true)) {
            do {
              parseOption(parent, "option");
            } while (skip(",", true));
            skip("]");
          }
          return parent;
        }
        function parseService(parent, token2) {
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "service name");
          var service = new Service(token2);
          ifBlock(service, function parseService_block(token3) {
            if (parseCommon(service, token3)) {
              return;
            }
            if (token3 === "rpc")
              parseMethod(service, token3);
            else
              throw illegal(token3);
          });
          parent.add(service);
          if (parent === ptr) {
            topLevelObjects.push(service);
          }
        }
        function parseMethod(parent, token2) {
          var commentText = cmnt();
          var type = token2;
          if (!nameRe.test(token2 = next()))
            throw illegal(token2, "name");
          var name = token2, requestType, requestStream, responseType, responseStream;
          skip("(");
          if (skip("stream", true))
            requestStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          requestType = token2;
          skip(")");
          skip("returns");
          skip("(");
          if (skip("stream", true))
            responseStream = true;
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2);
          responseType = token2;
          skip(")");
          var method = new Method(name, type, requestType, responseType, requestStream, responseStream);
          method.comment = commentText;
          ifBlock(method, function parseMethod_block(token3) {
            if (token3 === "option") {
              parseOption(method, token3);
              skip(";");
            } else
              throw illegal(token3);
          });
          parent.add(method);
        }
        function parseExtension(parent, token2) {
          if (!typeRefRe.test(token2 = next()))
            throw illegal(token2, "reference");
          var reference = token2;
          ifBlock(null, function parseExtension_block(token3) {
            switch (token3) {
              case "required":
              case "repeated":
                parseField(parent, token3, reference);
                break;
              case "optional":
                if (edition === "proto3") {
                  parseField(parent, "proto3_optional", reference);
                } else {
                  parseField(parent, "optional", reference);
                }
                break;
              default:
                if (edition === "proto2" || !typeRefRe.test(token3))
                  throw illegal(token3);
                push2(token3);
                parseField(parent, "optional", reference);
                break;
            }
          });
        }
        var token;
        while ((token = next()) !== null) {
          switch (token) {
            case "package":
              if (!head)
                throw illegal(token);
              parsePackage();
              break;
            case "import":
              if (!head)
                throw illegal(token);
              parseImport();
              break;
            case "syntax":
              if (!head)
                throw illegal(token);
              parseSyntax();
              break;
            case "edition":
              if (!head)
                throw illegal(token);
              parseEdition();
              break;
            case "option":
              parseOption(ptr, token);
              skip(";", true);
              break;
            default:
              if (parseCommon(ptr, token)) {
                head = false;
                continue;
              }
              throw illegal(token);
          }
        }
        resolveFileFeatures();
        parse.filename = null;
        return {
          "package": pkg,
          "imports": imports,
          weakImports,
          root
        };
      }
    }
  });

  // node_modules/protobufjs/src/common.js
  var require_common = __commonJS({
    "node_modules/protobufjs/src/common.js"(exports2, module2) {
      "use strict";
      module2.exports = common;
      var commonRe = /\/|\./;
      function common(name, json) {
        if (!commonRe.test(name)) {
          name = "google/protobuf/" + name + ".proto";
          json = { nested: { google: { nested: { protobuf: { nested: json } } } } };
        }
        common[name] = json;
      }
      common("any", {
        /**
         * Properties of a google.protobuf.Any message.
         * @interface IAny
         * @type {Object}
         * @property {string} [typeUrl]
         * @property {Uint8Array} [bytes]
         * @memberof common
         */
        Any: {
          fields: {
            type_url: {
              type: "string",
              id: 1
            },
            value: {
              type: "bytes",
              id: 2
            }
          }
        }
      });
      var timeType;
      common("duration", {
        /**
         * Properties of a google.protobuf.Duration message.
         * @interface IDuration
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Duration: timeType = {
          fields: {
            seconds: {
              type: "int64",
              id: 1
            },
            nanos: {
              type: "int32",
              id: 2
            }
          }
        }
      });
      common("timestamp", {
        /**
         * Properties of a google.protobuf.Timestamp message.
         * @interface ITimestamp
         * @type {Object}
         * @property {number|Long} [seconds]
         * @property {number} [nanos]
         * @memberof common
         */
        Timestamp: timeType
      });
      common("empty", {
        /**
         * Properties of a google.protobuf.Empty message.
         * @interface IEmpty
         * @memberof common
         */
        Empty: {
          fields: {}
        }
      });
      common("struct", {
        /**
         * Properties of a google.protobuf.Struct message.
         * @interface IStruct
         * @type {Object}
         * @property {Object.<string,IValue>} [fields]
         * @memberof common
         */
        Struct: {
          fields: {
            fields: {
              keyType: "string",
              type: "Value",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Value message.
         * @interface IValue
         * @type {Object}
         * @property {string} [kind]
         * @property {0} [nullValue]
         * @property {number} [numberValue]
         * @property {string} [stringValue]
         * @property {boolean} [boolValue]
         * @property {IStruct} [structValue]
         * @property {IListValue} [listValue]
         * @memberof common
         */
        Value: {
          oneofs: {
            kind: {
              oneof: [
                "nullValue",
                "numberValue",
                "stringValue",
                "boolValue",
                "structValue",
                "listValue"
              ]
            }
          },
          fields: {
            nullValue: {
              type: "NullValue",
              id: 1
            },
            numberValue: {
              type: "double",
              id: 2
            },
            stringValue: {
              type: "string",
              id: 3
            },
            boolValue: {
              type: "bool",
              id: 4
            },
            structValue: {
              type: "Struct",
              id: 5
            },
            listValue: {
              type: "ListValue",
              id: 6
            }
          }
        },
        NullValue: {
          values: {
            NULL_VALUE: 0
          }
        },
        /**
         * Properties of a google.protobuf.ListValue message.
         * @interface IListValue
         * @type {Object}
         * @property {Array.<IValue>} [values]
         * @memberof common
         */
        ListValue: {
          fields: {
            values: {
              rule: "repeated",
              type: "Value",
              id: 1
            }
          }
        }
      });
      common("wrappers", {
        /**
         * Properties of a google.protobuf.DoubleValue message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        DoubleValue: {
          fields: {
            value: {
              type: "double",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.FloatValue message.
         * @interface IFloatValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FloatValue: {
          fields: {
            value: {
              type: "float",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int64Value message.
         * @interface IInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        Int64Value: {
          fields: {
            value: {
              type: "int64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt64Value message.
         * @interface IUInt64Value
         * @type {Object}
         * @property {number|Long} [value]
         * @memberof common
         */
        UInt64Value: {
          fields: {
            value: {
              type: "uint64",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.Int32Value message.
         * @interface IInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        Int32Value: {
          fields: {
            value: {
              type: "int32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.UInt32Value message.
         * @interface IUInt32Value
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        UInt32Value: {
          fields: {
            value: {
              type: "uint32",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BoolValue message.
         * @interface IBoolValue
         * @type {Object}
         * @property {boolean} [value]
         * @memberof common
         */
        BoolValue: {
          fields: {
            value: {
              type: "bool",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.StringValue message.
         * @interface IStringValue
         * @type {Object}
         * @property {string} [value]
         * @memberof common
         */
        StringValue: {
          fields: {
            value: {
              type: "string",
              id: 1
            }
          }
        },
        /**
         * Properties of a google.protobuf.BytesValue message.
         * @interface IBytesValue
         * @type {Object}
         * @property {Uint8Array} [value]
         * @memberof common
         */
        BytesValue: {
          fields: {
            value: {
              type: "bytes",
              id: 1
            }
          }
        }
      });
      common("field_mask", {
        /**
         * Properties of a google.protobuf.FieldMask message.
         * @interface IDoubleValue
         * @type {Object}
         * @property {number} [value]
         * @memberof common
         */
        FieldMask: {
          fields: {
            paths: {
              rule: "repeated",
              type: "string",
              id: 1
            }
          }
        }
      });
      common.get = function get(file) {
        return common[file] || null;
      };
    }
  });

  // node_modules/protobufjs/src/index.js
  var require_src = __commonJS({
    "node_modules/protobufjs/src/index.js"(exports2, module2) {
      "use strict";
      var protobuf = module2.exports = require_index_light();
      protobuf.build = "full";
      protobuf.tokenize = require_tokenize();
      protobuf.parse = require_parse2();
      protobuf.common = require_common();
      protobuf.Root._configure(protobuf.Type, protobuf.parse, protobuf.common);
    }
  });

  // node_modules/protobufjs/index.js
  var require_protobufjs = __commonJS({
    "node_modules/protobufjs/index.js"(exports2, module2) {
      "use strict";
      module2.exports = require_src();
    }
  });

  // node_modules/jsonpath-plus/dist/index-browser-esm.js
  var Hooks = class {
    /**
     * @callback HookCallback
     * @this {*|Jsep} this
     * @param {Jsep} env
     * @returns: void
     */
    /**
     * Adds the given callback to the list of callbacks for the given hook.
     *
     * The callback will be invoked when the hook it is registered for is run.
     *
     * One callback function can be registered to multiple hooks and the same hook multiple times.
     *
     * @param {string|object} name The name of the hook, or an object of callbacks keyed by name
     * @param {HookCallback|boolean} callback The callback function which is given environment variables.
     * @param {?boolean} [first=false] Will add the hook to the top of the list (defaults to the bottom)
     * @public
     */
    add(name, callback, first) {
      if (typeof arguments[0] != "string") {
        for (let name2 in arguments[0]) {
          this.add(name2, arguments[0][name2], arguments[1]);
        }
      } else {
        (Array.isArray(name) ? name : [name]).forEach(function(name2) {
          this[name2] = this[name2] || [];
          if (callback) {
            this[name2][first ? "unshift" : "push"](callback);
          }
        }, this);
      }
    }
    /**
     * Runs a hook invoking all registered callbacks with the given environment variables.
     *
     * Callbacks will be invoked synchronously and in the order in which they were registered.
     *
     * @param {string} name The name of the hook.
     * @param {Object<string, any>} env The environment variables of the hook passed to all callbacks registered.
     * @public
     */
    run(name, env) {
      this[name] = this[name] || [];
      this[name].forEach(function(callback) {
        callback.call(env && env.context ? env.context : env, env);
      });
    }
  };
  var Plugins = class {
    constructor(jsep2) {
      this.jsep = jsep2;
      this.registered = {};
    }
    /**
     * @callback PluginSetup
     * @this {Jsep} jsep
     * @returns: void
     */
    /**
     * Adds the given plugin(s) to the registry
     *
     * @param {object} plugins
     * @param {string} plugins.name The name of the plugin
     * @param {PluginSetup} plugins.init The init function
     * @public
     */
    register() {
      for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
        plugins[_key] = arguments[_key];
      }
      plugins.forEach((plugin2) => {
        if (typeof plugin2 !== "object" || !plugin2.name || !plugin2.init) {
          throw new Error("Invalid JSEP plugin format");
        }
        if (this.registered[plugin2.name]) {
          return;
        }
        plugin2.init(this.jsep);
        this.registered[plugin2.name] = plugin2;
      });
    }
  };
  var Jsep = class _Jsep {
    /**
     * @returns {string}
     */
    static get version() {
      return "1.4.0";
    }
    /**
     * @returns {string}
     */
    static toString() {
      return "JavaScript Expression Parser (JSEP) v" + _Jsep.version;
    }
    // ==================== CONFIG ================================
    /**
     * @method addUnaryOp
     * @param {string} op_name The name of the unary op to add
     * @returns {Jsep}
     */
    static addUnaryOp(op_name) {
      _Jsep.max_unop_len = Math.max(op_name.length, _Jsep.max_unop_len);
      _Jsep.unary_ops[op_name] = 1;
      return _Jsep;
    }
    /**
     * @method jsep.addBinaryOp
     * @param {string} op_name The name of the binary op to add
     * @param {number} precedence The precedence of the binary op (can be a float). Higher number = higher precedence
     * @param {boolean} [isRightAssociative=false] whether operator is right-associative
     * @returns {Jsep}
     */
    static addBinaryOp(op_name, precedence, isRightAssociative) {
      _Jsep.max_binop_len = Math.max(op_name.length, _Jsep.max_binop_len);
      _Jsep.binary_ops[op_name] = precedence;
      if (isRightAssociative) {
        _Jsep.right_associative.add(op_name);
      } else {
        _Jsep.right_associative.delete(op_name);
      }
      return _Jsep;
    }
    /**
     * @method addIdentifierChar
     * @param {string} char The additional character to treat as a valid part of an identifier
     * @returns {Jsep}
     */
    static addIdentifierChar(char) {
      _Jsep.additional_identifier_chars.add(char);
      return _Jsep;
    }
    /**
     * @method addLiteral
     * @param {string} literal_name The name of the literal to add
     * @param {*} literal_value The value of the literal
     * @returns {Jsep}
     */
    static addLiteral(literal_name, literal_value) {
      _Jsep.literals[literal_name] = literal_value;
      return _Jsep;
    }
    /**
     * @method removeUnaryOp
     * @param {string} op_name The name of the unary op to remove
     * @returns {Jsep}
     */
    static removeUnaryOp(op_name) {
      delete _Jsep.unary_ops[op_name];
      if (op_name.length === _Jsep.max_unop_len) {
        _Jsep.max_unop_len = _Jsep.getMaxKeyLen(_Jsep.unary_ops);
      }
      return _Jsep;
    }
    /**
     * @method removeAllUnaryOps
     * @returns {Jsep}
     */
    static removeAllUnaryOps() {
      _Jsep.unary_ops = {};
      _Jsep.max_unop_len = 0;
      return _Jsep;
    }
    /**
     * @method removeIdentifierChar
     * @param {string} char The additional character to stop treating as a valid part of an identifier
     * @returns {Jsep}
     */
    static removeIdentifierChar(char) {
      _Jsep.additional_identifier_chars.delete(char);
      return _Jsep;
    }
    /**
     * @method removeBinaryOp
     * @param {string} op_name The name of the binary op to remove
     * @returns {Jsep}
     */
    static removeBinaryOp(op_name) {
      delete _Jsep.binary_ops[op_name];
      if (op_name.length === _Jsep.max_binop_len) {
        _Jsep.max_binop_len = _Jsep.getMaxKeyLen(_Jsep.binary_ops);
      }
      _Jsep.right_associative.delete(op_name);
      return _Jsep;
    }
    /**
     * @method removeAllBinaryOps
     * @returns {Jsep}
     */
    static removeAllBinaryOps() {
      _Jsep.binary_ops = {};
      _Jsep.max_binop_len = 0;
      return _Jsep;
    }
    /**
     * @method removeLiteral
     * @param {string} literal_name The name of the literal to remove
     * @returns {Jsep}
     */
    static removeLiteral(literal_name) {
      delete _Jsep.literals[literal_name];
      return _Jsep;
    }
    /**
     * @method removeAllLiterals
     * @returns {Jsep}
     */
    static removeAllLiterals() {
      _Jsep.literals = {};
      return _Jsep;
    }
    // ==================== END CONFIG ============================
    /**
     * @returns {string}
     */
    get char() {
      return this.expr.charAt(this.index);
    }
    /**
     * @returns {number}
     */
    get code() {
      return this.expr.charCodeAt(this.index);
    }
    /**
     * @param {string} expr a string with the passed in express
     * @returns Jsep
     */
    constructor(expr) {
      this.expr = expr;
      this.index = 0;
    }
    /**
     * static top-level parser
     * @returns {jsep.Expression}
     */
    static parse(expr) {
      return new _Jsep(expr).parse();
    }
    /**
     * Get the longest key length of any object
     * @param {object} obj
     * @returns {number}
     */
    static getMaxKeyLen(obj) {
      return Math.max(0, ...Object.keys(obj).map((k) => k.length));
    }
    /**
     * `ch` is a character code in the next three functions
     * @param {number} ch
     * @returns {boolean}
     */
    static isDecimalDigit(ch) {
      return ch >= 48 && ch <= 57;
    }
    /**
     * Returns the precedence of a binary operator or `0` if it isn't a binary operator. Can be float.
     * @param {string} op_val
     * @returns {number}
     */
    static binaryPrecedence(op_val) {
      return _Jsep.binary_ops[op_val] || 0;
    }
    /**
     * Looks for start of identifier
     * @param {number} ch
     * @returns {boolean}
     */
    static isIdentifierStart(ch) {
      return ch >= 65 && ch <= 90 || // A...Z
      ch >= 97 && ch <= 122 || // a...z
      ch >= 128 && !_Jsep.binary_ops[String.fromCharCode(ch)] || // any non-ASCII that is not an operator
      _Jsep.additional_identifier_chars.has(String.fromCharCode(ch));
    }
    /**
     * @param {number} ch
     * @returns {boolean}
     */
    static isIdentifierPart(ch) {
      return _Jsep.isIdentifierStart(ch) || _Jsep.isDecimalDigit(ch);
    }
    /**
     * throw error at index of the expression
     * @param {string} message
     * @throws
     */
    throwError(message) {
      const error = new Error(message + " at character " + this.index);
      error.index = this.index;
      error.description = message;
      throw error;
    }
    /**
     * Run a given hook
     * @param {string} name
     * @param {jsep.Expression|false} [node]
     * @returns {?jsep.Expression}
     */
    runHook(name, node) {
      if (_Jsep.hooks[name]) {
        const env = {
          context: this,
          node
        };
        _Jsep.hooks.run(name, env);
        return env.node;
      }
      return node;
    }
    /**
     * Runs a given hook until one returns a node
     * @param {string} name
     * @returns {?jsep.Expression}
     */
    searchHook(name) {
      if (_Jsep.hooks[name]) {
        const env = {
          context: this
        };
        _Jsep.hooks[name].find(function(callback) {
          callback.call(env.context, env);
          return env.node;
        });
        return env.node;
      }
    }
    /**
     * Push `index` up to the next non-space character
     */
    gobbleSpaces() {
      let ch = this.code;
      while (ch === _Jsep.SPACE_CODE || ch === _Jsep.TAB_CODE || ch === _Jsep.LF_CODE || ch === _Jsep.CR_CODE) {
        ch = this.expr.charCodeAt(++this.index);
      }
      this.runHook("gobble-spaces");
    }
    /**
     * Top-level method to parse all expressions and returns compound or single node
     * @returns {jsep.Expression}
     */
    parse() {
      this.runHook("before-all");
      const nodes = this.gobbleExpressions();
      const node = nodes.length === 1 ? nodes[0] : {
        type: _Jsep.COMPOUND,
        body: nodes
      };
      return this.runHook("after-all", node);
    }
    /**
     * top-level parser (but can be reused within as well)
     * @param {number} [untilICode]
     * @returns {jsep.Expression[]}
     */
    gobbleExpressions(untilICode) {
      let nodes = [], ch_i, node;
      while (this.index < this.expr.length) {
        ch_i = this.code;
        if (ch_i === _Jsep.SEMCOL_CODE || ch_i === _Jsep.COMMA_CODE) {
          this.index++;
        } else {
          if (node = this.gobbleExpression()) {
            nodes.push(node);
          } else if (this.index < this.expr.length) {
            if (ch_i === untilICode) {
              break;
            }
            this.throwError('Unexpected "' + this.char + '"');
          }
        }
      }
      return nodes;
    }
    /**
     * The main parsing function.
     * @returns {?jsep.Expression}
     */
    gobbleExpression() {
      const node = this.searchHook("gobble-expression") || this.gobbleBinaryExpression();
      this.gobbleSpaces();
      return this.runHook("after-expression", node);
    }
    /**
     * Search for the operation portion of the string (e.g. `+`, `===`)
     * Start by taking the longest possible binary operations (3 characters: `===`, `!==`, `>>>`)
     * and move down from 3 to 2 to 1 character until a matching binary operation is found
     * then, return that binary operation
     * @returns {string|boolean}
     */
    gobbleBinaryOp() {
      this.gobbleSpaces();
      let to_check = this.expr.substr(this.index, _Jsep.max_binop_len);
      let tc_len = to_check.length;
      while (tc_len > 0) {
        if (_Jsep.binary_ops.hasOwnProperty(to_check) && (!_Jsep.isIdentifierStart(this.code) || this.index + to_check.length < this.expr.length && !_Jsep.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))) {
          this.index += tc_len;
          return to_check;
        }
        to_check = to_check.substr(0, --tc_len);
      }
      return false;
    }
    /**
     * This function is responsible for gobbling an individual expression,
     * e.g. `1`, `1+2`, `a+(b*2)-Math.sqrt(2)`
     * @returns {?jsep.BinaryExpression}
     */
    gobbleBinaryExpression() {
      let node, biop, prec, stack, biop_info, left, right, i, cur_biop;
      left = this.gobbleToken();
      if (!left) {
        return left;
      }
      biop = this.gobbleBinaryOp();
      if (!biop) {
        return left;
      }
      biop_info = {
        value: biop,
        prec: _Jsep.binaryPrecedence(biop),
        right_a: _Jsep.right_associative.has(biop)
      };
      right = this.gobbleToken();
      if (!right) {
        this.throwError("Expected expression after " + biop);
      }
      stack = [left, biop_info, right];
      while (biop = this.gobbleBinaryOp()) {
        prec = _Jsep.binaryPrecedence(biop);
        if (prec === 0) {
          this.index -= biop.length;
          break;
        }
        biop_info = {
          value: biop,
          prec,
          right_a: _Jsep.right_associative.has(biop)
        };
        cur_biop = biop;
        const comparePrev = (prev) => biop_info.right_a && prev.right_a ? prec > prev.prec : prec <= prev.prec;
        while (stack.length > 2 && comparePrev(stack[stack.length - 2])) {
          right = stack.pop();
          biop = stack.pop().value;
          left = stack.pop();
          node = {
            type: _Jsep.BINARY_EXP,
            operator: biop,
            left,
            right
          };
          stack.push(node);
        }
        node = this.gobbleToken();
        if (!node) {
          this.throwError("Expected expression after " + cur_biop);
        }
        stack.push(biop_info, node);
      }
      i = stack.length - 1;
      node = stack[i];
      while (i > 1) {
        node = {
          type: _Jsep.BINARY_EXP,
          operator: stack[i - 1].value,
          left: stack[i - 2],
          right: node
        };
        i -= 2;
      }
      return node;
    }
    /**
     * An individual part of a binary expression:
     * e.g. `foo.bar(baz)`, `1`, `"abc"`, `(a % 2)` (because it's in parenthesis)
     * @returns {boolean|jsep.Expression}
     */
    gobbleToken() {
      let ch, to_check, tc_len, node;
      this.gobbleSpaces();
      node = this.searchHook("gobble-token");
      if (node) {
        return this.runHook("after-token", node);
      }
      ch = this.code;
      if (_Jsep.isDecimalDigit(ch) || ch === _Jsep.PERIOD_CODE) {
        return this.gobbleNumericLiteral();
      }
      if (ch === _Jsep.SQUOTE_CODE || ch === _Jsep.DQUOTE_CODE) {
        node = this.gobbleStringLiteral();
      } else if (ch === _Jsep.OBRACK_CODE) {
        node = this.gobbleArray();
      } else {
        to_check = this.expr.substr(this.index, _Jsep.max_unop_len);
        tc_len = to_check.length;
        while (tc_len > 0) {
          if (_Jsep.unary_ops.hasOwnProperty(to_check) && (!_Jsep.isIdentifierStart(this.code) || this.index + to_check.length < this.expr.length && !_Jsep.isIdentifierPart(this.expr.charCodeAt(this.index + to_check.length)))) {
            this.index += tc_len;
            const argument = this.gobbleToken();
            if (!argument) {
              this.throwError("missing unaryOp argument");
            }
            return this.runHook("after-token", {
              type: _Jsep.UNARY_EXP,
              operator: to_check,
              argument,
              prefix: true
            });
          }
          to_check = to_check.substr(0, --tc_len);
        }
        if (_Jsep.isIdentifierStart(ch)) {
          node = this.gobbleIdentifier();
          if (_Jsep.literals.hasOwnProperty(node.name)) {
            node = {
              type: _Jsep.LITERAL,
              value: _Jsep.literals[node.name],
              raw: node.name
            };
          } else if (node.name === _Jsep.this_str) {
            node = {
              type: _Jsep.THIS_EXP
            };
          }
        } else if (ch === _Jsep.OPAREN_CODE) {
          node = this.gobbleGroup();
        }
      }
      if (!node) {
        return this.runHook("after-token", false);
      }
      node = this.gobbleTokenProperty(node);
      return this.runHook("after-token", node);
    }
    /**
     * Gobble properties of of identifiers/strings/arrays/groups.
     * e.g. `foo`, `bar.baz`, `foo['bar'].baz`
     * It also gobbles function calls:
     * e.g. `Math.acos(obj.angle)`
     * @param {jsep.Expression} node
     * @returns {jsep.Expression}
     */
    gobbleTokenProperty(node) {
      this.gobbleSpaces();
      let ch = this.code;
      while (ch === _Jsep.PERIOD_CODE || ch === _Jsep.OBRACK_CODE || ch === _Jsep.OPAREN_CODE || ch === _Jsep.QUMARK_CODE) {
        let optional;
        if (ch === _Jsep.QUMARK_CODE) {
          if (this.expr.charCodeAt(this.index + 1) !== _Jsep.PERIOD_CODE) {
            break;
          }
          optional = true;
          this.index += 2;
          this.gobbleSpaces();
          ch = this.code;
        }
        this.index++;
        if (ch === _Jsep.OBRACK_CODE) {
          node = {
            type: _Jsep.MEMBER_EXP,
            computed: true,
            object: node,
            property: this.gobbleExpression()
          };
          if (!node.property) {
            this.throwError('Unexpected "' + this.char + '"');
          }
          this.gobbleSpaces();
          ch = this.code;
          if (ch !== _Jsep.CBRACK_CODE) {
            this.throwError("Unclosed [");
          }
          this.index++;
        } else if (ch === _Jsep.OPAREN_CODE) {
          node = {
            type: _Jsep.CALL_EXP,
            "arguments": this.gobbleArguments(_Jsep.CPAREN_CODE),
            callee: node
          };
        } else if (ch === _Jsep.PERIOD_CODE || optional) {
          if (optional) {
            this.index--;
          }
          this.gobbleSpaces();
          node = {
            type: _Jsep.MEMBER_EXP,
            computed: false,
            object: node,
            property: this.gobbleIdentifier()
          };
        }
        if (optional) {
          node.optional = true;
        }
        this.gobbleSpaces();
        ch = this.code;
      }
      return node;
    }
    /**
     * Parse simple numeric literals: `12`, `3.4`, `.5`. Do this by using a string to
     * keep track of everything in the numeric literal and then calling `parseFloat` on that string
     * @returns {jsep.Literal}
     */
    gobbleNumericLiteral() {
      let number = "", ch, chCode;
      while (_Jsep.isDecimalDigit(this.code)) {
        number += this.expr.charAt(this.index++);
      }
      if (this.code === _Jsep.PERIOD_CODE) {
        number += this.expr.charAt(this.index++);
        while (_Jsep.isDecimalDigit(this.code)) {
          number += this.expr.charAt(this.index++);
        }
      }
      ch = this.char;
      if (ch === "e" || ch === "E") {
        number += this.expr.charAt(this.index++);
        ch = this.char;
        if (ch === "+" || ch === "-") {
          number += this.expr.charAt(this.index++);
        }
        while (_Jsep.isDecimalDigit(this.code)) {
          number += this.expr.charAt(this.index++);
        }
        if (!_Jsep.isDecimalDigit(this.expr.charCodeAt(this.index - 1))) {
          this.throwError("Expected exponent (" + number + this.char + ")");
        }
      }
      chCode = this.code;
      if (_Jsep.isIdentifierStart(chCode)) {
        this.throwError("Variable names cannot start with a number (" + number + this.char + ")");
      } else if (chCode === _Jsep.PERIOD_CODE || number.length === 1 && number.charCodeAt(0) === _Jsep.PERIOD_CODE) {
        this.throwError("Unexpected period");
      }
      return {
        type: _Jsep.LITERAL,
        value: parseFloat(number),
        raw: number
      };
    }
    /**
     * Parses a string literal, staring with single or double quotes with basic support for escape codes
     * e.g. `"hello world"`, `'this is\nJSEP'`
     * @returns {jsep.Literal}
     */
    gobbleStringLiteral() {
      let str = "";
      const startIndex = this.index;
      const quote = this.expr.charAt(this.index++);
      let closed = false;
      while (this.index < this.expr.length) {
        let ch = this.expr.charAt(this.index++);
        if (ch === quote) {
          closed = true;
          break;
        } else if (ch === "\\") {
          ch = this.expr.charAt(this.index++);
          switch (ch) {
            case "n":
              str += "\n";
              break;
            case "r":
              str += "\r";
              break;
            case "t":
              str += "	";
              break;
            case "b":
              str += "\b";
              break;
            case "f":
              str += "\f";
              break;
            case "v":
              str += "\v";
              break;
            default:
              str += ch;
          }
        } else {
          str += ch;
        }
      }
      if (!closed) {
        this.throwError('Unclosed quote after "' + str + '"');
      }
      return {
        type: _Jsep.LITERAL,
        value: str,
        raw: this.expr.substring(startIndex, this.index)
      };
    }
    /**
     * Gobbles only identifiers
     * e.g.: `foo`, `_value`, `$x1`
     * Also, this function checks if that identifier is a literal:
     * (e.g. `true`, `false`, `null`) or `this`
     * @returns {jsep.Identifier}
     */
    gobbleIdentifier() {
      let ch = this.code, start = this.index;
      if (_Jsep.isIdentifierStart(ch)) {
        this.index++;
      } else {
        this.throwError("Unexpected " + this.char);
      }
      while (this.index < this.expr.length) {
        ch = this.code;
        if (_Jsep.isIdentifierPart(ch)) {
          this.index++;
        } else {
          break;
        }
      }
      return {
        type: _Jsep.IDENTIFIER,
        name: this.expr.slice(start, this.index)
      };
    }
    /**
     * Gobbles a list of arguments within the context of a function call
     * or array literal. This function also assumes that the opening character
     * `(` or `[` has already been gobbled, and gobbles expressions and commas
     * until the terminator character `)` or `]` is encountered.
     * e.g. `foo(bar, baz)`, `my_func()`, or `[bar, baz]`
     * @param {number} termination
     * @returns {jsep.Expression[]}
     */
    gobbleArguments(termination) {
      const args = [];
      let closed = false;
      let separator_count = 0;
      while (this.index < this.expr.length) {
        this.gobbleSpaces();
        let ch_i = this.code;
        if (ch_i === termination) {
          closed = true;
          this.index++;
          if (termination === _Jsep.CPAREN_CODE && separator_count && separator_count >= args.length) {
            this.throwError("Unexpected token " + String.fromCharCode(termination));
          }
          break;
        } else if (ch_i === _Jsep.COMMA_CODE) {
          this.index++;
          separator_count++;
          if (separator_count !== args.length) {
            if (termination === _Jsep.CPAREN_CODE) {
              this.throwError("Unexpected token ,");
            } else if (termination === _Jsep.CBRACK_CODE) {
              for (let arg = args.length; arg < separator_count; arg++) {
                args.push(null);
              }
            }
          }
        } else if (args.length !== separator_count && separator_count !== 0) {
          this.throwError("Expected comma");
        } else {
          const node = this.gobbleExpression();
          if (!node || node.type === _Jsep.COMPOUND) {
            this.throwError("Expected comma");
          }
          args.push(node);
        }
      }
      if (!closed) {
        this.throwError("Expected " + String.fromCharCode(termination));
      }
      return args;
    }
    /**
     * Responsible for parsing a group of things within parentheses `()`
     * that have no identifier in front (so not a function call)
     * This function assumes that it needs to gobble the opening parenthesis
     * and then tries to gobble everything within that parenthesis, assuming
     * that the next thing it should see is the close parenthesis. If not,
     * then the expression probably doesn't have a `)`
     * @returns {boolean|jsep.Expression}
     */
    gobbleGroup() {
      this.index++;
      let nodes = this.gobbleExpressions(_Jsep.CPAREN_CODE);
      if (this.code === _Jsep.CPAREN_CODE) {
        this.index++;
        if (nodes.length === 1) {
          return nodes[0];
        } else if (!nodes.length) {
          return false;
        } else {
          return {
            type: _Jsep.SEQUENCE_EXP,
            expressions: nodes
          };
        }
      } else {
        this.throwError("Unclosed (");
      }
    }
    /**
     * Responsible for parsing Array literals `[1, 2, 3]`
     * This function assumes that it needs to gobble the opening bracket
     * and then tries to gobble the expressions as arguments.
     * @returns {jsep.ArrayExpression}
     */
    gobbleArray() {
      this.index++;
      return {
        type: _Jsep.ARRAY_EXP,
        elements: this.gobbleArguments(_Jsep.CBRACK_CODE)
      };
    }
  };
  var hooks = new Hooks();
  Object.assign(Jsep, {
    hooks,
    plugins: new Plugins(Jsep),
    // Node Types
    // ----------
    // This is the full set of types that any JSEP node can be.
    // Store them here to save space when minified
    COMPOUND: "Compound",
    SEQUENCE_EXP: "SequenceExpression",
    IDENTIFIER: "Identifier",
    MEMBER_EXP: "MemberExpression",
    LITERAL: "Literal",
    THIS_EXP: "ThisExpression",
    CALL_EXP: "CallExpression",
    UNARY_EXP: "UnaryExpression",
    BINARY_EXP: "BinaryExpression",
    ARRAY_EXP: "ArrayExpression",
    TAB_CODE: 9,
    LF_CODE: 10,
    CR_CODE: 13,
    SPACE_CODE: 32,
    PERIOD_CODE: 46,
    // '.'
    COMMA_CODE: 44,
    // ','
    SQUOTE_CODE: 39,
    // single quote
    DQUOTE_CODE: 34,
    // double quotes
    OPAREN_CODE: 40,
    // (
    CPAREN_CODE: 41,
    // )
    OBRACK_CODE: 91,
    // [
    CBRACK_CODE: 93,
    // ]
    QUMARK_CODE: 63,
    // ?
    SEMCOL_CODE: 59,
    // ;
    COLON_CODE: 58,
    // :
    // Operations
    // ----------
    // Use a quickly-accessible map to store all of the unary operators
    // Values are set to `1` (it really doesn't matter)
    unary_ops: {
      "-": 1,
      "!": 1,
      "~": 1,
      "+": 1
    },
    // Also use a map for the binary operations but set their values to their
    // binary precedence for quick reference (higher number = higher precedence)
    // see [Order of operations](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence)
    binary_ops: {
      "||": 1,
      "??": 1,
      "&&": 2,
      "|": 3,
      "^": 4,
      "&": 5,
      "==": 6,
      "!=": 6,
      "===": 6,
      "!==": 6,
      "<": 7,
      ">": 7,
      "<=": 7,
      ">=": 7,
      "<<": 8,
      ">>": 8,
      ">>>": 8,
      "+": 9,
      "-": 9,
      "*": 10,
      "/": 10,
      "%": 10,
      "**": 11
    },
    // sets specific binary_ops as right-associative
    right_associative: /* @__PURE__ */ new Set(["**"]),
    // Additional valid identifier chars, apart from a-z, A-Z and 0-9 (except on the starting char)
    additional_identifier_chars: /* @__PURE__ */ new Set(["$", "_"]),
    // Literals
    // ----------
    // Store the values to return for the various literals we may encounter
    literals: {
      "true": true,
      "false": false,
      "null": null
    },
    // Except for `this`, which is special. This could be changed to something like `'self'` as well
    this_str: "this"
  });
  Jsep.max_unop_len = Jsep.getMaxKeyLen(Jsep.unary_ops);
  Jsep.max_binop_len = Jsep.getMaxKeyLen(Jsep.binary_ops);
  var jsep = (expr) => new Jsep(expr).parse();
  var stdClassProps = Object.getOwnPropertyNames(class Test {
  });
  Object.getOwnPropertyNames(Jsep).filter((prop) => !stdClassProps.includes(prop) && jsep[prop] === void 0).forEach((m) => {
    jsep[m] = Jsep[m];
  });
  jsep.Jsep = Jsep;
  var CONDITIONAL_EXP = "ConditionalExpression";
  var ternary = {
    name: "ternary",
    init(jsep2) {
      jsep2.hooks.add("after-expression", function gobbleTernary(env) {
        if (env.node && this.code === jsep2.QUMARK_CODE) {
          this.index++;
          const test = env.node;
          const consequent = this.gobbleExpression();
          if (!consequent) {
            this.throwError("Expected expression");
          }
          this.gobbleSpaces();
          if (this.code === jsep2.COLON_CODE) {
            this.index++;
            const alternate = this.gobbleExpression();
            if (!alternate) {
              this.throwError("Expected expression");
            }
            env.node = {
              type: CONDITIONAL_EXP,
              test,
              consequent,
              alternate
            };
            if (test.operator && jsep2.binary_ops[test.operator] <= 0.9) {
              let newTest = test;
              while (newTest.right.operator && jsep2.binary_ops[newTest.right.operator] <= 0.9) {
                newTest = newTest.right;
              }
              env.node.test = newTest.right;
              newTest.right = env.node;
              env.node = test;
            }
          } else {
            this.throwError("Expected :");
          }
        }
      });
    }
  };
  jsep.plugins.register(ternary);
  var FSLASH_CODE = 47;
  var BSLASH_CODE = 92;
  var index = {
    name: "regex",
    init(jsep2) {
      jsep2.hooks.add("gobble-token", function gobbleRegexLiteral(env) {
        if (this.code === FSLASH_CODE) {
          const patternIndex = ++this.index;
          let inCharSet = false;
          while (this.index < this.expr.length) {
            if (this.code === FSLASH_CODE && !inCharSet) {
              const pattern = this.expr.slice(patternIndex, this.index);
              let flags = "";
              while (++this.index < this.expr.length) {
                const code = this.code;
                if (code >= 97 && code <= 122 || code >= 65 && code <= 90 || code >= 48 && code <= 57) {
                  flags += this.char;
                } else {
                  break;
                }
              }
              let value;
              try {
                value = new RegExp(pattern, flags);
              } catch (e) {
                this.throwError(e.message);
              }
              env.node = {
                type: jsep2.LITERAL,
                value,
                raw: this.expr.slice(patternIndex - 1, this.index)
              };
              env.node = this.gobbleTokenProperty(env.node);
              return env.node;
            }
            if (this.code === jsep2.OBRACK_CODE) {
              inCharSet = true;
            } else if (inCharSet && this.code === jsep2.CBRACK_CODE) {
              inCharSet = false;
            }
            this.index += this.code === BSLASH_CODE ? 2 : 1;
          }
          this.throwError("Unclosed Regex");
        }
      });
    }
  };
  var PLUS_CODE = 43;
  var MINUS_CODE = 45;
  var plugin = {
    name: "assignment",
    assignmentOperators: /* @__PURE__ */ new Set(["=", "*=", "**=", "/=", "%=", "+=", "-=", "<<=", ">>=", ">>>=", "&=", "^=", "|=", "||=", "&&=", "??="]),
    updateOperators: [PLUS_CODE, MINUS_CODE],
    assignmentPrecedence: 0.9,
    init(jsep2) {
      const updateNodeTypes = [jsep2.IDENTIFIER, jsep2.MEMBER_EXP];
      plugin.assignmentOperators.forEach((op) => jsep2.addBinaryOp(op, plugin.assignmentPrecedence, true));
      jsep2.hooks.add("gobble-token", function gobbleUpdatePrefix(env) {
        const code = this.code;
        if (plugin.updateOperators.some((c) => c === code && c === this.expr.charCodeAt(this.index + 1))) {
          this.index += 2;
          env.node = {
            type: "UpdateExpression",
            operator: code === PLUS_CODE ? "++" : "--",
            argument: this.gobbleTokenProperty(this.gobbleIdentifier()),
            prefix: true
          };
          if (!env.node.argument || !updateNodeTypes.includes(env.node.argument.type)) {
            this.throwError(`Unexpected ${env.node.operator}`);
          }
        }
      });
      jsep2.hooks.add("after-token", function gobbleUpdatePostfix(env) {
        if (env.node) {
          const code = this.code;
          if (plugin.updateOperators.some((c) => c === code && c === this.expr.charCodeAt(this.index + 1))) {
            if (!updateNodeTypes.includes(env.node.type)) {
              this.throwError(`Unexpected ${env.node.operator}`);
            }
            this.index += 2;
            env.node = {
              type: "UpdateExpression",
              operator: code === PLUS_CODE ? "++" : "--",
              argument: env.node,
              prefix: false
            };
          }
        }
      });
      jsep2.hooks.add("after-expression", function gobbleAssignment(env) {
        if (env.node) {
          updateBinariesToAssignments(env.node);
        }
      });
      function updateBinariesToAssignments(node) {
        if (plugin.assignmentOperators.has(node.operator)) {
          node.type = "AssignmentExpression";
          updateBinariesToAssignments(node.left);
          updateBinariesToAssignments(node.right);
        } else if (!node.operator) {
          Object.values(node).forEach((val) => {
            if (val && typeof val === "object") {
              updateBinariesToAssignments(val);
            }
          });
        }
      }
    }
  };
  jsep.plugins.register(index, plugin);
  jsep.addUnaryOp("typeof");
  jsep.addUnaryOp("void");
  jsep.addLiteral("null", null);
  jsep.addLiteral("undefined", void 0);
  var BLOCKED_PROTO_PROPERTIES = /* @__PURE__ */ new Set(["constructor", "__proto__", "__defineGetter__", "__defineSetter__", "__lookupGetter__", "__lookupSetter__"]);
  var SafeEval = {
    /**
     * @param {jsep.Expression} ast
     * @param {Record<string, any>} subs
     */
    evalAst(ast, subs) {
      switch (ast.type) {
        case "BinaryExpression":
        case "LogicalExpression":
          return SafeEval.evalBinaryExpression(ast, subs);
        case "Compound":
          return SafeEval.evalCompound(ast, subs);
        case "ConditionalExpression":
          return SafeEval.evalConditionalExpression(ast, subs);
        case "Identifier":
          return SafeEval.evalIdentifier(ast, subs);
        case "Literal":
          return SafeEval.evalLiteral(ast, subs);
        case "MemberExpression":
          return SafeEval.evalMemberExpression(ast, subs);
        case "UnaryExpression":
          return SafeEval.evalUnaryExpression(ast, subs);
        case "ArrayExpression":
          return SafeEval.evalArrayExpression(ast, subs);
        case "CallExpression":
          return SafeEval.evalCallExpression(ast, subs);
        case "AssignmentExpression":
          return SafeEval.evalAssignmentExpression(ast, subs);
        default:
          throw SyntaxError("Unexpected expression", ast);
      }
    },
    evalBinaryExpression(ast, subs) {
      const result = {
        "||": (a, b) => a || b(),
        "&&": (a, b) => a && b(),
        "|": (a, b) => a | b(),
        "^": (a, b) => a ^ b(),
        "&": (a, b) => a & b(),
        // eslint-disable-next-line eqeqeq -- API
        "==": (a, b) => a == b(),
        // eslint-disable-next-line eqeqeq -- API
        "!=": (a, b) => a != b(),
        "===": (a, b) => a === b(),
        "!==": (a, b) => a !== b(),
        "<": (a, b) => a < b(),
        ">": (a, b) => a > b(),
        "<=": (a, b) => a <= b(),
        ">=": (a, b) => a >= b(),
        "<<": (a, b) => a << b(),
        ">>": (a, b) => a >> b(),
        ">>>": (a, b) => a >>> b(),
        "+": (a, b) => a + b(),
        "-": (a, b) => a - b(),
        "*": (a, b) => a * b(),
        "/": (a, b) => a / b(),
        "%": (a, b) => a % b()
      }[ast.operator](SafeEval.evalAst(ast.left, subs), () => SafeEval.evalAst(ast.right, subs));
      return result;
    },
    evalCompound(ast, subs) {
      let last;
      for (let i = 0; i < ast.body.length; i++) {
        if (ast.body[i].type === "Identifier" && ["var", "let", "const"].includes(ast.body[i].name) && ast.body[i + 1] && ast.body[i + 1].type === "AssignmentExpression") {
          i += 1;
        }
        const expr = ast.body[i];
        last = SafeEval.evalAst(expr, subs);
      }
      return last;
    },
    evalConditionalExpression(ast, subs) {
      if (SafeEval.evalAst(ast.test, subs)) {
        return SafeEval.evalAst(ast.consequent, subs);
      }
      return SafeEval.evalAst(ast.alternate, subs);
    },
    evalIdentifier(ast, subs) {
      if (Object.hasOwn(subs, ast.name)) {
        return subs[ast.name];
      }
      throw ReferenceError(`${ast.name} is not defined`);
    },
    evalLiteral(ast) {
      return ast.value;
    },
    evalMemberExpression(ast, subs) {
      const prop = String(
        // NOTE: `String(value)` throws error when
        // value has overwritten the toString method to return non-string
        // i.e. `value = {toString: () => []}`
        ast.computed ? SafeEval.evalAst(ast.property) : ast.property.name
        // `object.property` property is Identifier
      );
      const obj = SafeEval.evalAst(ast.object, subs);
      if (obj === void 0 || obj === null) {
        throw TypeError(`Cannot read properties of ${obj} (reading '${prop}')`);
      }
      if (!Object.hasOwn(obj, prop) && BLOCKED_PROTO_PROPERTIES.has(prop)) {
        throw TypeError(`Cannot read properties of ${obj} (reading '${prop}')`);
      }
      const result = obj[prop];
      if (typeof result === "function") {
        return result.bind(obj);
      }
      return result;
    },
    evalUnaryExpression(ast, subs) {
      const result = {
        "-": (a) => -SafeEval.evalAst(a, subs),
        "!": (a) => !SafeEval.evalAst(a, subs),
        "~": (a) => ~SafeEval.evalAst(a, subs),
        // eslint-disable-next-line no-implicit-coercion -- API
        "+": (a) => +SafeEval.evalAst(a, subs),
        typeof: (a) => typeof SafeEval.evalAst(a, subs),
        // eslint-disable-next-line no-void, sonarjs/void-use -- feature
        void: (a) => void SafeEval.evalAst(a, subs)
      }[ast.operator](ast.argument);
      return result;
    },
    evalArrayExpression(ast, subs) {
      return ast.elements.map((el) => SafeEval.evalAst(el, subs));
    },
    evalCallExpression(ast, subs) {
      const args = ast.arguments.map((arg) => SafeEval.evalAst(arg, subs));
      const func = SafeEval.evalAst(ast.callee, subs);
      if (func === Function) {
        throw new Error("Function constructor is disabled");
      }
      return func(...args);
    },
    evalAssignmentExpression(ast, subs) {
      if (ast.left.type !== "Identifier") {
        throw SyntaxError("Invalid left-hand side in assignment");
      }
      const id = ast.left.name;
      const value = SafeEval.evalAst(ast.right, subs);
      subs[id] = value;
      return subs[id];
    }
  };
  var SafeScript = class {
    /**
     * @param {string} expr Expression to evaluate
     */
    constructor(expr) {
      this.code = expr;
      this.ast = jsep(this.code);
    }
    /**
     * @param {object} context Object whose items will be added
     *   to evaluation
     * @returns {EvaluatedResult} Result of evaluated code
     */
    runInNewContext(context) {
      const keyMap = Object.assign(/* @__PURE__ */ Object.create(null), context);
      return SafeEval.evalAst(this.ast, keyMap);
    }
  };
  function push(arr, item) {
    arr = arr.slice();
    arr.push(item);
    return arr;
  }
  function unshift(item, arr) {
    arr = arr.slice();
    arr.unshift(item);
    return arr;
  }
  var NewError = class extends Error {
    /**
     * @param {AnyResult} value The evaluated scalar value
     */
    constructor(value) {
      super('JSONPath should not be called with "new" (it prevents return of (unwrapped) scalar values)');
      this.avoidNew = true;
      this.value = value;
      this.name = "NewError";
    }
  };
  function JSONPath(opts, expr, obj, callback, otherTypeCallback) {
    if (!(this instanceof JSONPath)) {
      try {
        return new JSONPath(opts, expr, obj, callback, otherTypeCallback);
      } catch (e) {
        if (!e.avoidNew) {
          throw e;
        }
        return e.value;
      }
    }
    if (typeof opts === "string") {
      otherTypeCallback = callback;
      callback = obj;
      obj = expr;
      expr = opts;
      opts = null;
    }
    const optObj = opts && typeof opts === "object";
    opts = opts || {};
    this.json = opts.json || obj;
    this.path = opts.path || expr;
    this.resultType = opts.resultType || "value";
    this.flatten = opts.flatten || false;
    this.wrap = Object.hasOwn(opts, "wrap") ? opts.wrap : true;
    this.sandbox = opts.sandbox || {};
    this.eval = opts.eval === void 0 ? "safe" : opts.eval;
    this.ignoreEvalErrors = typeof opts.ignoreEvalErrors === "undefined" ? false : opts.ignoreEvalErrors;
    this.parent = opts.parent || null;
    this.parentProperty = opts.parentProperty || null;
    this.callback = opts.callback || callback || null;
    this.otherTypeCallback = opts.otherTypeCallback || otherTypeCallback || function() {
      throw new TypeError("You must supply an otherTypeCallback callback option with the @other() operator.");
    };
    if (opts.autostart !== false) {
      const args = {
        path: optObj ? opts.path : expr
      };
      if (!optObj) {
        args.json = obj;
      } else if ("json" in opts) {
        args.json = opts.json;
      }
      const ret = this.evaluate(args);
      if (!ret || typeof ret !== "object") {
        throw new NewError(ret);
      }
      return ret;
    }
  }
  JSONPath.prototype.evaluate = function(expr, json, callback, otherTypeCallback) {
    let currParent = this.parent, currParentProperty = this.parentProperty;
    let {
      flatten,
      wrap
    } = this;
    this.currResultType = this.resultType;
    this.currEval = this.eval;
    this.currSandbox = this.sandbox;
    callback = callback || this.callback;
    this.currOtherTypeCallback = otherTypeCallback || this.otherTypeCallback;
    json = json || this.json;
    expr = expr || this.path;
    if (expr && typeof expr === "object" && !Array.isArray(expr)) {
      if (!expr.path && expr.path !== "") {
        throw new TypeError('You must supply a "path" property when providing an object argument to JSONPath.evaluate().');
      }
      if (!Object.hasOwn(expr, "json")) {
        throw new TypeError('You must supply a "json" property when providing an object argument to JSONPath.evaluate().');
      }
      ({
        json
      } = expr);
      flatten = Object.hasOwn(expr, "flatten") ? expr.flatten : flatten;
      this.currResultType = Object.hasOwn(expr, "resultType") ? expr.resultType : this.currResultType;
      this.currSandbox = Object.hasOwn(expr, "sandbox") ? expr.sandbox : this.currSandbox;
      wrap = Object.hasOwn(expr, "wrap") ? expr.wrap : wrap;
      this.currEval = Object.hasOwn(expr, "eval") ? expr.eval : this.currEval;
      callback = Object.hasOwn(expr, "callback") ? expr.callback : callback;
      this.currOtherTypeCallback = Object.hasOwn(expr, "otherTypeCallback") ? expr.otherTypeCallback : this.currOtherTypeCallback;
      currParent = Object.hasOwn(expr, "parent") ? expr.parent : currParent;
      currParentProperty = Object.hasOwn(expr, "parentProperty") ? expr.parentProperty : currParentProperty;
      expr = expr.path;
    }
    currParent = currParent || null;
    currParentProperty = currParentProperty || null;
    if (Array.isArray(expr)) {
      expr = JSONPath.toPathString(expr);
    }
    if (!expr && expr !== "" || !json) {
      return void 0;
    }
    const exprList = JSONPath.toPathArray(expr);
    if (exprList[0] === "$" && exprList.length > 1) {
      exprList.shift();
    }
    this._hasParentSelector = null;
    const result = this._trace(exprList, json, ["$"], currParent, currParentProperty, callback).filter(function(ea) {
      return ea && !ea.isParentSelector;
    });
    if (!result.length) {
      return wrap ? [] : void 0;
    }
    if (!wrap && result.length === 1 && !result[0].hasArrExpr) {
      return this._getPreferredOutput(result[0]);
    }
    return result.reduce((rslt, ea) => {
      const valOrPath = this._getPreferredOutput(ea);
      if (flatten && Array.isArray(valOrPath)) {
        rslt = rslt.concat(valOrPath);
      } else {
        rslt.push(valOrPath);
      }
      return rslt;
    }, []);
  };
  JSONPath.prototype._getPreferredOutput = function(ea) {
    const resultType = this.currResultType;
    switch (resultType) {
      case "all": {
        const path = Array.isArray(ea.path) ? ea.path : JSONPath.toPathArray(ea.path);
        ea.pointer = JSONPath.toPointer(path);
        ea.path = typeof ea.path === "string" ? ea.path : JSONPath.toPathString(ea.path);
        return ea;
      }
      case "value":
      case "parent":
      case "parentProperty":
        return ea[resultType];
      case "path":
        return JSONPath.toPathString(ea[resultType]);
      case "pointer":
        return JSONPath.toPointer(ea.path);
      default:
        throw new TypeError("Unknown result type");
    }
  };
  JSONPath.prototype._handleCallback = function(fullRetObj, callback, type) {
    if (callback) {
      const preferredOutput = this._getPreferredOutput(fullRetObj);
      fullRetObj.path = typeof fullRetObj.path === "string" ? fullRetObj.path : JSONPath.toPathString(fullRetObj.path);
      callback(preferredOutput, type, fullRetObj);
    }
  };
  JSONPath.prototype._trace = function(expr, val, path, parent, parentPropName, callback, hasArrExpr, literalPriority) {
    let retObj;
    if (!expr.length) {
      retObj = {
        path,
        value: val,
        parent,
        parentProperty: parentPropName,
        hasArrExpr
      };
      this._handleCallback(retObj, callback, "value");
      return retObj;
    }
    const loc = expr[0], x = expr.slice(1);
    const ret = [];
    function addRet(elems) {
      if (Array.isArray(elems)) {
        elems.forEach((t) => {
          ret.push(t);
        });
      } else {
        ret.push(elems);
      }
    }
    if ((typeof loc !== "string" || literalPriority) && val && Object.hasOwn(val, loc)) {
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr));
    } else if (loc === "*") {
      this._walk(val, (m) => {
        addRet(this._trace(x, val[m], push(path, m), val, m, callback, true, true));
      });
    } else if (loc === "..") {
      addRet(this._trace(x, val, path, parent, parentPropName, callback, hasArrExpr));
      this._walk(val, (m) => {
        if (typeof val[m] === "object") {
          addRet(this._trace(expr.slice(), val[m], push(path, m), val, m, callback, true));
        }
      });
    } else if (loc === "^") {
      this._hasParentSelector = true;
      return {
        path: path.slice(0, -1),
        expr: x,
        isParentSelector: true
      };
    } else if (loc === "~") {
      retObj = {
        path: push(path, loc),
        value: parentPropName,
        parent,
        parentProperty: null
      };
      this._handleCallback(retObj, callback, "property");
      return retObj;
    } else if (loc === "$") {
      addRet(this._trace(x, val, path, null, null, callback, hasArrExpr));
    } else if (/^(-?\d*):(-?\d*):?(\d*)$/u.test(loc)) {
      addRet(this._slice(loc, x, val, path, parent, parentPropName, callback));
    } else if (loc.indexOf("?(") === 0) {
      if (this.currEval === false) {
        throw new Error("Eval [?(expr)] prevented in JSONPath expression.");
      }
      const safeLoc = loc.replace(/^\?\((.*?)\)$/u, "$1");
      const nested = /@.?([^?]*)[['](\??\(.*?\))(?!.\)\])[\]']/gu.exec(safeLoc);
      if (nested) {
        this._walk(val, (m) => {
          const npath = [nested[2]];
          const nvalue = nested[1] ? val[m][nested[1]] : val[m];
          const filterResults = this._trace(npath, nvalue, path, parent, parentPropName, callback, true);
          if (filterResults.length > 0) {
            addRet(this._trace(x, val[m], push(path, m), val, m, callback, true));
          }
        });
      } else {
        this._walk(val, (m) => {
          if (this._eval(safeLoc, val[m], m, path, parent, parentPropName)) {
            addRet(this._trace(x, val[m], push(path, m), val, m, callback, true));
          }
        });
      }
    } else if (loc[0] === "(") {
      if (this.currEval === false) {
        throw new Error("Eval [(expr)] prevented in JSONPath expression.");
      }
      addRet(this._trace(unshift(this._eval(loc, val, path.at(-1), path.slice(0, -1), parent, parentPropName), x), val, path, parent, parentPropName, callback, hasArrExpr));
    } else if (loc[0] === "@") {
      let addType = false;
      const valueType = loc.slice(1, -2);
      switch (valueType) {
        case "scalar":
          if (!val || !["object", "function"].includes(typeof val)) {
            addType = true;
          }
          break;
        case "boolean":
        case "string":
        case "undefined":
        case "function":
          if (typeof val === valueType) {
            addType = true;
          }
          break;
        case "integer":
          if (Number.isFinite(val) && !(val % 1)) {
            addType = true;
          }
          break;
        case "number":
          if (Number.isFinite(val)) {
            addType = true;
          }
          break;
        case "nonFinite":
          if (typeof val === "number" && !Number.isFinite(val)) {
            addType = true;
          }
          break;
        case "object":
          if (val && typeof val === valueType) {
            addType = true;
          }
          break;
        case "array":
          if (Array.isArray(val)) {
            addType = true;
          }
          break;
        case "other":
          addType = this.currOtherTypeCallback(val, path, parent, parentPropName);
          break;
        case "null":
          if (val === null) {
            addType = true;
          }
          break;
        /* c8 ignore next 2 */
        default:
          throw new TypeError("Unknown value type " + valueType);
      }
      if (addType) {
        retObj = {
          path,
          value: val,
          parent,
          parentProperty: parentPropName
        };
        this._handleCallback(retObj, callback, "value");
        return retObj;
      }
    } else if (loc[0] === "`" && val && Object.hasOwn(val, loc.slice(1))) {
      const locProp = loc.slice(1);
      addRet(this._trace(x, val[locProp], push(path, locProp), val, locProp, callback, hasArrExpr, true));
    } else if (loc.includes(",")) {
      const parts = loc.split(",");
      for (const part of parts) {
        addRet(this._trace(unshift(part, x), val, path, parent, parentPropName, callback, true));
      }
    } else if (!literalPriority && val && Object.hasOwn(val, loc)) {
      addRet(this._trace(x, val[loc], push(path, loc), val, loc, callback, hasArrExpr, true));
    }
    if (this._hasParentSelector) {
      for (let t = 0; t < ret.length; t++) {
        const rett = ret[t];
        if (rett && rett.isParentSelector) {
          const tmp = this._trace(rett.expr, val, rett.path, parent, parentPropName, callback, hasArrExpr);
          if (Array.isArray(tmp)) {
            ret[t] = tmp[0];
            const tl = tmp.length;
            for (let tt = 1; tt < tl; tt++) {
              t++;
              ret.splice(t, 0, tmp[tt]);
            }
          } else {
            ret[t] = tmp;
          }
        }
      }
    }
    return ret;
  };
  JSONPath.prototype._walk = function(val, f) {
    if (Array.isArray(val)) {
      const n = val.length;
      for (let i = 0; i < n; i++) {
        f(i);
      }
    } else if (val && typeof val === "object") {
      Object.keys(val).forEach((m) => {
        f(m);
      });
    }
  };
  JSONPath.prototype._slice = function(loc, expr, val, path, parent, parentPropName, callback) {
    if (!Array.isArray(val)) {
      return void 0;
    }
    const len = val.length, parts = loc.split(":"), step = parts[2] && Number.parseInt(parts[2]) || 1;
    let start = parts[0] && Number.parseInt(parts[0]) || 0, end = parts[1] && Number.parseInt(parts[1]) || len;
    start = start < 0 ? Math.max(0, start + len) : Math.min(len, start);
    end = end < 0 ? Math.max(0, end + len) : Math.min(len, end);
    const ret = [];
    for (let i = start; i < end; i += step) {
      const tmp = this._trace(unshift(i, expr), val, path, parent, parentPropName, callback, true);
      tmp.forEach((t) => {
        ret.push(t);
      });
    }
    return ret;
  };
  JSONPath.prototype._eval = function(code, _v, _vname, path, parent, parentPropName) {
    this.currSandbox._$_parentProperty = parentPropName;
    this.currSandbox._$_parent = parent;
    this.currSandbox._$_property = _vname;
    this.currSandbox._$_root = this.json;
    this.currSandbox._$_v = _v;
    const containsPath = code.includes("@path");
    if (containsPath) {
      this.currSandbox._$_path = JSONPath.toPathString(path.concat([_vname]));
    }
    const scriptCacheKey = this.currEval + "Script:" + code;
    if (!JSONPath.cache[scriptCacheKey]) {
      let script = code.replaceAll("@parentProperty", "_$_parentProperty").replaceAll("@parent", "_$_parent").replaceAll("@property", "_$_property").replaceAll("@root", "_$_root").replaceAll(/@([.\s)[])/gu, "_$_v$1");
      if (containsPath) {
        script = script.replaceAll("@path", "_$_path");
      }
      if (this.currEval === "safe" || this.currEval === true || this.currEval === void 0) {
        JSONPath.cache[scriptCacheKey] = new this.safeVm.Script(script);
      } else if (this.currEval === "native") {
        JSONPath.cache[scriptCacheKey] = new this.vm.Script(script);
      } else if (typeof this.currEval === "function" && this.currEval.prototype && Object.hasOwn(this.currEval.prototype, "runInNewContext")) {
        const CurrEval = this.currEval;
        JSONPath.cache[scriptCacheKey] = new CurrEval(script);
      } else if (typeof this.currEval === "function") {
        JSONPath.cache[scriptCacheKey] = {
          runInNewContext: (context) => this.currEval(script, context)
        };
      } else {
        throw new TypeError(`Unknown "eval" property "${this.currEval}"`);
      }
    }
    try {
      return JSONPath.cache[scriptCacheKey].runInNewContext(this.currSandbox);
    } catch (e) {
      if (this.ignoreEvalErrors) {
        return false;
      }
      throw new Error("jsonPath: " + e.message + ": " + code);
    }
  };
  JSONPath.cache = {};
  JSONPath.toPathString = function(pathArr) {
    const x = pathArr, n = x.length;
    let p = "$";
    for (let i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/u.test(x[i])) {
        p += /^[0-9*]+$/u.test(x[i]) ? "[" + x[i] + "]" : "['" + x[i] + "']";
      }
    }
    return p;
  };
  JSONPath.toPointer = function(pointer) {
    const x = pointer, n = x.length;
    let p = "";
    for (let i = 1; i < n; i++) {
      if (!/^(~|\^|@.*?\(\))$/u.test(x[i])) {
        p += "/" + x[i].toString().replaceAll("~", "~0").replaceAll("/", "~1");
      }
    }
    return p;
  };
  JSONPath.toPathArray = function(expr) {
    const {
      cache
    } = JSONPath;
    if (cache[expr]) {
      return cache[expr].concat();
    }
    const subx = [];
    const normalized = expr.replaceAll(/@(?:null|boolean|number|string|integer|undefined|nonFinite|scalar|array|object|function|other)\(\)/gu, ";$&;").replaceAll(/[['](\??\(.*?\))[\]'](?!.\])/gu, function($0, $1) {
      return "[#" + (subx.push($1) - 1) + "]";
    }).replaceAll(/\[['"]([^'\]]*)['"]\]/gu, function($0, prop) {
      return "['" + prop.replaceAll(".", "%@%").replaceAll("~", "%%@@%%") + "']";
    }).replaceAll("~", ";~;").replaceAll(/['"]?\.['"]?(?![^[]*\])|\[['"]?/gu, ";").replaceAll("%@%", ".").replaceAll("%%@@%%", "~").replaceAll(/(?:;)?(\^+)(?:;)?/gu, function($0, ups) {
      return ";" + ups.split("").join(";") + ";";
    }).replaceAll(/;;;|;;/gu, ";..;").replaceAll(/;$|'?\]|'$/gu, "");
    const exprList = normalized.split(";").map(function(exp) {
      const match = exp.match(/#(\d+)/u);
      return !match || !match[1] ? exp : subx[match[1]];
    });
    cache[expr] = exprList;
    return cache[expr].concat();
  };
  JSONPath.prototype.safeVm = {
    Script: SafeScript
  };
  var moveToAnotherArray = function(source, target, conditionCb) {
    const il = source.length;
    for (let i = 0; i < il; i++) {
      const item = source[i];
      if (conditionCb(item)) {
        target.push(source.splice(i--, 1)[0]);
      }
    }
  };
  var Script = class {
    /**
     * @param {string} expr Expression to evaluate
     */
    constructor(expr) {
      this.code = expr;
    }
    /**
     * @param {object} context Object whose items will be added
     *   to evaluation
     * @returns {EvaluatedResult} Result of evaluated code
     */
    runInNewContext(context) {
      let expr = this.code;
      const keys = Object.keys(context);
      const funcs = [];
      moveToAnotherArray(keys, funcs, (key) => {
        return typeof context[key] === "function";
      });
      const values = keys.map((vr) => {
        return context[vr];
      });
      const funcString = funcs.reduce((s, func) => {
        let fString = context[func].toString();
        if (!/function/u.test(fString)) {
          fString = "function " + fString;
        }
        return "var " + func + "=" + fString + ";" + s;
      }, "");
      expr = funcString + expr;
      if (!/(['"])use strict\1/u.test(expr) && !keys.includes("arguments")) {
        expr = "var arguments = undefined;" + expr;
      }
      expr = expr.replace(/;\s*$/u, "");
      const lastStatementEnd = expr.lastIndexOf(";");
      const code = lastStatementEnd !== -1 ? expr.slice(0, lastStatementEnd + 1) + " return " + expr.slice(lastStatementEnd + 1) : " return " + expr;
      return new Function(...keys, code)(...values);
    }
  };
  JSONPath.prototype.vm = {
    Script
  };

  // node_modules/trackhar/dist/index.js
  var import_base64_search = __toESM(require_dist(), 1);

  // node_modules/escape-string-regexp/index.js
  function escapeStringRegexp(string) {
    if (typeof string !== "string") {
      throw new TypeError("Expected a string");
    }
    return string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // node_modules/trackhar/dist/index.js
  var import_qs = __toESM(require_lib(), 1);

  // node_modules/fflate/esm/browser.js
  var u8 = Uint8Array;
  var u16 = Uint16Array;
  var i32 = Int32Array;
  var fleb = new u8([
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    1,
    1,
    1,
    1,
    2,
    2,
    2,
    2,
    3,
    3,
    3,
    3,
    4,
    4,
    4,
    4,
    5,
    5,
    5,
    5,
    0,
    /* unused */
    0,
    0,
    /* impossible */
    0
  ]);
  var fdeb = new u8([
    0,
    0,
    0,
    0,
    1,
    1,
    2,
    2,
    3,
    3,
    4,
    4,
    5,
    5,
    6,
    6,
    7,
    7,
    8,
    8,
    9,
    9,
    10,
    10,
    11,
    11,
    12,
    12,
    13,
    13,
    /* unused */
    0,
    0
  ]);
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  var freb = function(eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
      b[i] = start += 1 << eb[i - 1];
    }
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
      for (var j = b[i]; j < b[i + 1]; ++j) {
        r[j] = j - b[i] << 5 | i;
      }
    }
    return { b, r };
  };
  var _a = freb(fleb, 2);
  var fl = _a.b;
  var revfl = _a.r;
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0);
  var fd = _b.b;
  var revfd = _b.r;
  var rev = new u16(32768);
  for (i = 0; i < 32768; ++i) {
    x = (i & 43690) >> 1 | (i & 21845) << 1;
    x = (x & 52428) >> 2 | (x & 13107) << 2;
    x = (x & 61680) >> 4 | (x & 3855) << 4;
    rev[i] = ((x & 65280) >> 8 | (x & 255) << 8) >> 1;
  }
  var x;
  var i;
  var hMap = (function(cd, mb, r) {
    var s = cd.length;
    var i = 0;
    var l = new u16(mb);
    for (; i < s; ++i) {
      if (cd[i])
        ++l[cd[i] - 1];
    }
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
      le[i] = le[i - 1] + l[i - 1] << 1;
    }
    var co;
    if (r) {
      co = new u16(1 << mb);
      var rvb = 15 - mb;
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          var sv = i << 4 | cd[i];
          var r_1 = mb - cd[i];
          var v = le[cd[i] - 1]++ << r_1;
          for (var m = v | (1 << r_1) - 1; v <= m; ++v) {
            co[rev[v] >> rvb] = sv;
          }
        }
      }
    } else {
      co = new u16(s);
      for (i = 0; i < s; ++i) {
        if (cd[i]) {
          co[i] = rev[le[cd[i] - 1]++] >> 15 - cd[i];
        }
      }
    }
    return co;
  });
  var flt = new u8(288);
  for (i = 0; i < 144; ++i)
    flt[i] = 8;
  var i;
  for (i = 144; i < 256; ++i)
    flt[i] = 9;
  var i;
  for (i = 256; i < 280; ++i)
    flt[i] = 7;
  var i;
  for (i = 280; i < 288; ++i)
    flt[i] = 8;
  var i;
  var fdt = new u8(32);
  for (i = 0; i < 32; ++i)
    fdt[i] = 5;
  var i;
  var flrm = /* @__PURE__ */ hMap(flt, 9, 1);
  var fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
  var max = function(a) {
    var m = a[0];
    for (var i = 1; i < a.length; ++i) {
      if (a[i] > m)
        m = a[i];
    }
    return m;
  };
  var bits = function(d, p, m) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8) >> (p & 7) & m;
  };
  var bits16 = function(d, p) {
    var o = p / 8 | 0;
    return (d[o] | d[o + 1] << 8 | d[o + 2] << 16) >> (p & 7);
  };
  var shft = function(p) {
    return (p + 7) / 8 | 0;
  };
  var slc = function(v, s, e) {
    if (s == null || s < 0)
      s = 0;
    if (e == null || e > v.length)
      e = v.length;
    return new u8(v.subarray(s, e));
  };
  var ec = [
    "unexpected EOF",
    "invalid block type",
    "invalid length/literal",
    "invalid distance",
    "stream finished",
    "no stream handler",
    ,
    "no callback",
    "invalid UTF-8 data",
    "extra field too long",
    "date not in range 1980-2099",
    "filename too long",
    "stream finishing",
    "invalid zip data"
    // determined by unknown compression method
  ];
  var err = function(ind, msg, nt) {
    var e = new Error(msg || ec[ind]);
    e.code = ind;
    if (Error.captureStackTrace)
      Error.captureStackTrace(e, err);
    if (!nt)
      throw e;
    return e;
  };
  var inflt = function(dat, st, buf, dict) {
    var sl = dat.length, dl = dict ? dict.length : 0;
    if (!sl || st.f && !st.l)
      return buf || new u8(0);
    var noBuf = !buf;
    var resize = noBuf || st.i != 2;
    var noSt = st.i;
    if (noBuf)
      buf = new u8(sl * 3);
    var cbuf = function(l2) {
      var bl = buf.length;
      if (l2 > bl) {
        var nbuf = new u8(Math.max(bl * 2, l2));
        nbuf.set(buf);
        buf = nbuf;
      }
    };
    var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
    var tbts = sl * 8;
    do {
      if (!lm) {
        final = bits(dat, pos, 1);
        var type = bits(dat, pos + 1, 3);
        pos += 3;
        if (!type) {
          var s = shft(pos) + 4, l = dat[s - 4] | dat[s - 3] << 8, t = s + l;
          if (t > sl) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + l);
          buf.set(dat.subarray(s, t), bt);
          st.b = bt += l, st.p = pos = t * 8, st.f = final;
          continue;
        } else if (type == 1)
          lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
        else if (type == 2) {
          var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
          var tl = hLit + bits(dat, pos + 5, 31) + 1;
          pos += 14;
          var ldt = new u8(tl);
          var clt = new u8(19);
          for (var i = 0; i < hcLen; ++i) {
            clt[clim[i]] = bits(dat, pos + i * 3, 7);
          }
          pos += hcLen * 3;
          var clb = max(clt), clbmsk = (1 << clb) - 1;
          var clm = hMap(clt, clb, 1);
          for (var i = 0; i < tl; ) {
            var r = clm[bits(dat, pos, clbmsk)];
            pos += r & 15;
            var s = r >> 4;
            if (s < 16) {
              ldt[i++] = s;
            } else {
              var c = 0, n = 0;
              if (s == 16)
                n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
              else if (s == 17)
                n = 3 + bits(dat, pos, 7), pos += 3;
              else if (s == 18)
                n = 11 + bits(dat, pos, 127), pos += 7;
              while (n--)
                ldt[i++] = c;
            }
          }
          var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
          lbt = max(lt);
          dbt = max(dt);
          lm = hMap(lt, lbt, 1);
          dm = hMap(dt, dbt, 1);
        } else
          err(1);
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
      }
      if (resize)
        cbuf(bt + 131072);
      var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
      var lpos = pos;
      for (; ; lpos = pos) {
        var c = lm[bits16(dat, pos) & lms], sym = c >> 4;
        pos += c & 15;
        if (pos > tbts) {
          if (noSt)
            err(0);
          break;
        }
        if (!c)
          err(2);
        if (sym < 256)
          buf[bt++] = sym;
        else if (sym == 256) {
          lpos = pos, lm = null;
          break;
        } else {
          var add = sym - 254;
          if (sym > 264) {
            var i = sym - 257, b = fleb[i];
            add = bits(dat, pos, (1 << b) - 1) + fl[i];
            pos += b;
          }
          var d = dm[bits16(dat, pos) & dms], dsym = d >> 4;
          if (!d)
            err(3);
          pos += d & 15;
          var dt = fd[dsym];
          if (dsym > 3) {
            var b = fdeb[dsym];
            dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
          }
          if (pos > tbts) {
            if (noSt)
              err(0);
            break;
          }
          if (resize)
            cbuf(bt + 131072);
          var end = bt + add;
          if (bt < dt) {
            var shift = dl - dt, dend = Math.min(dt, end);
            if (shift + bt < 0)
              err(3);
            for (; bt < dend; ++bt)
              buf[bt] = dict[shift + bt];
          }
          for (; bt < end; ++bt)
            buf[bt] = buf[bt - dt];
        }
      }
      st.l = lm, st.p = lpos, st.b = bt, st.f = final;
      if (lm)
        final = 1, st.m = lbt, st.d = dm, st.n = dbt;
    } while (!final);
    return bt != buf.length && noBuf ? slc(buf, 0, bt) : buf.subarray(0, bt);
  };
  var et = /* @__PURE__ */ new u8(0);
  var gzs = function(d) {
    if (d[0] != 31 || d[1] != 139 || d[2] != 8)
      err(6, "invalid gzip data");
    var flg = d[3];
    var st = 10;
    if (flg & 4)
      st += (d[10] | d[11] << 8) + 2;
    for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
      ;
    return st + (flg & 2);
  };
  var gzl = function(d) {
    var l = d.length;
    return (d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16 | d[l - 1] << 24) >>> 0;
  };
  function gunzipSync(data, opts) {
    var st = gzs(data);
    if (st + 8 > data.length)
      err(6, "invalid gzip data");
    return inflt(data.subarray(st, -8), { i: 2 }, opts && opts.out || new u8(gzl(data)), opts && opts.dictionary);
  }
  var td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
  var tds = 0;
  try {
    td.decode(et, { stream: true });
    tds = 1;
  } catch (e) {
  }

  // node_modules/trackhar/dist/index.js
  var import_buffer = __toESM(require_buffer(), 1);

  // node_modules/jwt-decode/build/esm/index.js
  var InvalidTokenError = class extends Error {
  };
  InvalidTokenError.prototype.name = "InvalidTokenError";
  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
      let code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    }));
  }
  function base64UrlDecode(str) {
    let output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("base64 string is not of the correct length");
    }
    try {
      return b64DecodeUnicode(output);
    } catch (err2) {
      return atob(output);
    }
  }
  function jwtDecode(token, options) {
    if (typeof token !== "string") {
      throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    const pos = options.header === true ? 0 : 1;
    const part = token.split(".")[pos];
    if (typeof part !== "string") {
      throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
    }
    let decoded;
    try {
      decoded = base64UrlDecode(part);
    } catch (e) {
      throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
    }
    try {
      return JSON.parse(decoded);
    } catch (e) {
      throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
    }
  }

  // node_modules/trackhar/dist/index.js
  var import_protobufjs = __toESM(require_protobufjs(), 1);
  var $2ade9836ba78b915$export$8405652c088b60a = (...paths) => paths.reduce((res, path) => {
    for (const [property, pathOrPaths] of Object.entries(path))
      if (res[property]) res[property] = [
        res[property],
        pathOrPaths
      ].flat();
      else res[property] = pathOrPaths;
    return res;
  }, {});
  var $a006f264ba4c597f$var$openrtbSpecUrl = (fragment) => `https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/f26fdab655ebd7302dffde9fb635ac54c69ff960/2.6.md#${fragment}`;
  var $a006f264ba4c597f$export$b453d26931eb8f95 = (prefix = "") => ({
    userAgent: [
      {
        context: "body",
        path: prefix + "device.sua.browsers",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
      },
      {
        context: "body",
        path: prefix + "device.ua",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
      }
    ],
    referer: [
      {
        context: "body",
        path: prefix + "site.ref",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      }
    ],
    viewedPage: [
      {
        context: "body",
        path: prefix + "site.page",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      },
      {
        context: "body",
        path: prefix + "site.content.title",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3216---object-content-")
      },
      {
        context: "body",
        path: prefix + "site.content.url",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3216---object-content-")
      }
    ],
    viewedPageCategory: [
      {
        context: "body",
        path: prefix + "site.cat",
        notIf: "[]",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      },
      {
        context: "body",
        path: prefix + "site.sectioncat",
        notIf: "[]",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      },
      {
        context: "body",
        path: prefix + "site.content.genre",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3216---object-content-")
      }
    ],
    viewedPageKeywords: {
      context: "body",
      path: prefix + "site.keywords",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
    },
    propertyId: [
      {
        context: "body",
        path: prefix + "app.publisher.id",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3215---object-publisher-")
      },
      {
        context: "body",
        path: prefix + "site.publisher.id",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3215---object-publisher-")
      }
    ],
    websiteName: [
      {
        context: "body",
        path: prefix + "site.name",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      },
      {
        context: "body",
        path: prefix + "site.domain",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3213---object-site-")
      }
    ],
    websiteUrl: {
      context: "body",
      path: prefix + "site.publisher.domain",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3215---object-publisher-")
    },
    language: {
      context: "body",
      path: prefix + "device.language",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    viewedPageLanguage: {
      context: "body",
      path: prefix + "site.content.language",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3216---object-content-")
    },
    screenHeight: {
      context: "body",
      path: prefix + "device.h",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    screenWidth: {
      context: "body",
      path: prefix + "device.w",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    consentState: [
      // TCF consent string
      {
        context: "body",
        path: prefix + "user.consent",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3220---object-user-")
      },
      // GPP consent string
      {
        context: "body",
        path: prefix + "regs.gpp",
        notIf: "DBAA",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("323---object-regs-")
      }
    ],
    userId: [
      {
        context: "body",
        path: prefix + "eids.*.uids.*.id",
        notIf: "0",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3228---object-uid-")
      },
      {
        context: "body",
        path: prefix + "user.eids.*.uids.*.id",
        notIf: "0",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3228---object-uid-")
      }
    ],
    isMobileDevice: {
      context: "body",
      path: prefix + "device.sua.mobile",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    isDntEnabled: {
      context: "body",
      path: prefix + "device.dnt",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    isJsEnabled: {
      context: "body",
      path: prefix + "device.js",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    country: {
      context: "body",
      path: prefix + "device.geo.country",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3219---object-geo-")
    },
    latitude: {
      context: "body",
      path: prefix + "device.geo.lat",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3219---object-geo-")
    },
    longitude: {
      context: "body",
      path: prefix + "device.geo.lon",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3219---object-geo-")
    },
    userGender: {
      context: "body",
      path: prefix + "user.gender",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3220---object-user-")
    },
    appName: {
      context: "body",
      path: prefix + "app.name",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3214---object-app-")
    },
    appId: [
      {
        context: "body",
        path: prefix + "app.bundle",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3214---object-app-")
      },
      {
        context: "body",
        path: prefix + "app.storeurl",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3214---object-app-")
      }
    ],
    appVersion: {
      context: "body",
      path: prefix + "app.ver",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3214---object-app-")
    },
    manufacturer: {
      context: "body",
      path: prefix + "device.make",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    model: {
      context: "body",
      path: prefix + "device.model",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-model-")
    },
    osName: {
      context: "body",
      path: prefix + "device.os",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    osVersion: {
      context: "body",
      path: prefix + "device.osv",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    carrier: [
      {
        context: "body",
        path: prefix + "device.carrier",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
      },
      {
        context: "body",
        path: prefix + "device.mccmnc",
        reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
      }
    ],
    advertisingId: {
      context: "body",
      path: prefix + "device.ifa",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    networkConnectionType: {
      context: "body",
      path: prefix + "device.connectiontype",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    userInterests: {
      context: "body",
      path: prefix + "user.keywords",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3220---object-user-")
    },
    publicIp: {
      context: "body",
      path: prefix + "device.ip",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3218---object-device-")
    },
    timezone: {
      context: "body",
      path: prefix + "device.geo.utcoffset",
      reasoning: $a006f264ba4c597f$var$openrtbSpecUrl("3219---object-geo-")
    }
  });
  var $ebedc07b61dad4b4$export$e6753d62dd0b15f0 = {
    propertyId: {
      context: "query",
      path: "bidder",
      reasoning: "https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html#query-params"
    },
    userId: {
      context: "query",
      path: "uid",
      notIf: "OPTOUT",
      reasoning: "https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html#query-params"
    },
    consentState: {
      context: "query",
      path: "gdpr_consent",
      reasoning: "https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html#query-params"
    }
  };
  var $c601f7eb4c4e7047$var$tracker = {
    slug: "adagio",
    name: "Adagio (Onfocus SAS)",
    datenanfragenSlug: "adagio"
  };
  var $c601f7eb4c4e7047$var$adagioCommonHeaderAndCookiePaths = {
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://adagio.io/privacy"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://adagio.io/privacy"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://adagio.io/privacy"
      }
    ],
    referer: [
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      }
    ],
    userId: {
      context: "cookie",
      path: "uidsParsed.uids.*.uid",
      reasoning: "https://adagio.io/privacy"
    }
  };
  var $c601f7eb4c4e7047$export$1761c188a41008af = [
    {
      slug: "4dex-mp-prebid",
      name: "Adagio Prebid integration",
      tracker: $c601f7eb4c4e7047$var$tracker,
      endpointUrls: [
        "https://mp.4dex.io/prebid"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        },
        {
          function: "decodeBase64",
          input: "res.cookie.uids",
          output: "uidsDecoded"
        },
        {
          function: "parseJson",
          input: "uidsDecoded",
          output: "res.cookie.uidsParsed"
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), $c601f7eb4c4e7047$var$adagioCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "body",
          path: "organizationId",
          reasoning: "https://docs.prebid.org/dev-docs/bidders/adagio.html#bid-params"
        },
        userAgent: {
          context: "body",
          path: "device.userAgent",
          reasoning: "obvious property name"
        },
        sessionId: {
          context: "body",
          path: "data.session.id",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "4dex-u-setuid",
      // Implements: https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html
      name: "Adagio Prebid server cookie sync (setuid)",
      tracker: $c601f7eb4c4e7047$var$tracker,
      endpointUrls: [
        "https://u.4dex.io/setuid"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $ebedc07b61dad4b4$export$e6753d62dd0b15f0), $c601f7eb4c4e7047$var$adagioCommonHeaderAndCookiePaths)
    }
  ];
  var $874e61532f7f6c39$var$tracker = {
    slug: "adcolony",
    name: "AdColony, Inc.",
    datenanfragenSlug: "adcolony",
    exodusId: 90
  };
  var $874e61532f7f6c39$export$1761c188a41008af = [
    {
      slug: "adc3-launch",
      name: "AdColony (adc3-launch)",
      tracker: $874e61532f7f6c39$var$tracker,
      endpointUrls: [
        "https://adc3-launch.adcolony.com/v4/launch"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        advertisingId: {
          context: "body",
          path: "advertiser_id",
          reasoning: "obvious observed values"
        },
        deviceId: {
          context: "body",
          path: "device_id",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "body",
          path: "carrier_name",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "screen_width",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "screen_height",
          reasoning: "obvious property name"
        },
        language: [
          {
            context: "body",
            path: "locale_language_code",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "ln",
            reasoning: "obvious property name"
          }
        ],
        macAddress: {
          context: "body",
          path: "mac_address",
          reasoning: "obvious property name"
        },
        manufacturer: [
          {
            context: "body",
            path: "manufacturer",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device_brand",
            reasoning: "obvious property name"
          }
        ],
        model: [
          {
            context: "body",
            path: "model",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device_model",
            reasoning: "obvious property name"
          }
        ],
        networkConnectionType: {
          context: "body",
          path: "network_type",
          reasoning: "obvious property name"
        },
        osName: [
          {
            context: "body",
            path: "os_name",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "platform",
            reasoning: "obvious observed values"
          }
        ],
        osVersion: {
          context: "body",
          path: "os_version",
          reasoning: "obvious property name"
        },
        architecture: {
          context: "body",
          path: "arch",
          reasoning: "obvious property name"
        },
        batteryLevel: {
          context: "body",
          path: "battery_level",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "timezone_ietf",
          reasoning: "obvious property name"
        },
        orientation: {
          context: "body",
          path: "current_orientation",
          reasoning: "obvious property name"
        },
        isInDarkMode: {
          context: "body",
          path: "dark_mode",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdk_version",
          reasoning: "obvious property name"
        },
        appName: {
          context: "body",
          path: "app_bundle_name",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "app_bundle_version",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "configure",
      name: "AdColony (configure)",
      tracker: $874e61532f7f6c39$var$tracker,
      endpointUrls: [
        /^https:\/\/(android|ios)?ads\d-?\d\.adcolony\.com\/configure$/
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "body",
          path: "bundle_id",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "bundle_version_short",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "os_name",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "body",
          path: "os_version",
          reasoning: "obvious property name"
        },
        advertisingId: {
          context: "body",
          path: "advertiser_id",
          reasoning: "obvious property name"
        },
        developerScopedId: {
          context: "body",
          path: "vendor_id",
          reasoning: "obvious property name"
        },
        sessionId: {
          context: "body",
          path: "sid",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "body",
          path: "carrier",
          reasoning: "obvious property name"
        },
        language: {
          context: "body",
          path: "ln",
          reasoning: "obvious property name"
        },
        manufacturer: [
          {
            context: "body",
            path: "device_brand",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "manufacturer",
            reasoning: "obvious property name"
          }
        ],
        model: {
          context: "body",
          path: "device_model",
          reasoning: "obvious property name"
        },
        batteryLevel: {
          context: "body",
          path: "battery_level",
          reasoning: "obvious property name"
        },
        orientation: {
          context: "body",
          path: "current_orientation",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "timezone_ietf",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "screen_width",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "screen_height",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdk_version",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $a933a714180ea702$export$85a80da4d6018d37 = (prefix = "") => ({
    userAgent: {
      context: "body",
      path: prefix + "user.ext.sua.browsers",
      reasoning: "https://docs.prebid.org/features/firstPartyData.html#user-agent-client-hints"
    },
    websiteUrl: [
      {
        context: "body",
        path: prefix + "publisher.url",
        reasoning: "obvious observed values"
      }
    ],
    viewedPage: [
      {
        context: "body",
        path: prefix + "publisher.ext.page",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "site.ext.page",
        reasoning: "obvious property name"
      }
    ],
    viewedPageCategory: [
      {
        context: "body",
        path: prefix + "publisher.ext.cat",
        reasoning: "obvious observed values"
      },
      {
        context: "body",
        path: prefix + "publisher.ext.sectioncat",
        reasoning: "obvious observed values"
      },
      {
        context: "body",
        path: prefix + "site.ext.cat",
        reasoning: "obvious observed values"
      },
      {
        context: "body",
        path: prefix + "site.ext.sectioncat",
        reasoning: "obvious observed values"
      }
    ],
    viewedPageKeywords: [
      {
        context: "body",
        path: prefix + "publisher.ext.keywords",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "site.ext.keywords",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        // "content tags"
        path: prefix + "site.ext.data.cnt_tags",
        reasoning: "obvious property name"
      }
    ],
    propertyId: {
      context: "body",
      path: prefix + "publisher.networkid",
      reasoning: "obvious property name"
    },
    websiteName: [
      {
        context: "body",
        path: prefix + "publisher.ext.name",
        reasoning: "obvious observed values"
      },
      {
        context: "body",
        path: prefix + "site.ext.name",
        reasoning: "obvious observed values"
      }
    ],
    language: {
      context: "body",
      path: prefix + "user.ext.data.navigatorLanguage",
      reasoning: "obvious property name"
    },
    browserWindowHeight: [
      {
        context: "body",
        path: prefix + "user.ext.data.windowInnerHeight",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "viewport.height",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "device.ext.vph",
        notIf: "0",
        reasoning: "https://docs.prebid.org/features/firstPartyData.html#automatically-collected-first-party-data"
      },
      {
        context: "body",
        path: prefix + "site.ext.data.adg_rtd.features.viewport_dimensions",
        reasoning: "obvious property name"
      }
    ],
    browserWindowWidth: [
      {
        context: "body",
        path: prefix + "user.ext.data.windowInnerWidth",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "viewport.width",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "device.ext.vpw",
        notIf: "0",
        reasoning: "https://docs.prebid.org/features/firstPartyData.html#automatically-collected-first-party-data"
      },
      {
        context: "body",
        path: prefix + "site.ext.data.adg_rtd.features.viewport_dimensions",
        reasoning: "obvious property name"
      }
    ],
    pageHeight: [
      {
        context: "body",
        path: prefix + "user.ext.data.pageHeight",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "site.ext.data.adg_rtd.features.page_dimensions",
        reasoning: "obvious property name"
      }
    ],
    pageWidth: [
      {
        context: "body",
        path: prefix + "user.ext.data.pageWidth",
        notIf: "0",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: prefix + "site.ext.data.adg_rtd.features.page_dimensions",
        reasoning: "obvious property name"
      }
    ],
    sessionDuration: {
      context: "body",
      path: prefix + "user.ext.data.sessionDuration",
      reasoning: "obvious property name"
    },
    viewedPageLanguage: {
      context: "body",
      path: prefix + "user.ext.data.contentLanguage",
      reasoning: "obvious property name"
    },
    orientation: {
      context: "body",
      path: prefix + "user.ext.data.orientation",
      reasoning: "obvious property name"
    },
    screenHeight: {
      context: "body",
      path: prefix + "user.ext.device.h",
      reasoning: "obvious property name"
    },
    screenWidth: {
      context: "body",
      path: prefix + "user.ext.device.w",
      reasoning: "obvious property name"
    },
    consentState: [
      // TCF consent string
      {
        context: "body",
        path: prefix + "user.ext.consent",
        reasoning: "https://docs.prebid.org/prebid-server/endpoints/openrtb2/pbs-endpoint-auction.html#gdpr"
      },
      {
        context: "body",
        path: prefix + "gdprConsent.consentData",
        reasoning: "https://docs.prebid.org/dev-docs/modules/consentManagementTcf.html#page-integration"
      }
    ],
    userId: {
      context: "body",
      path: prefix + "user.ext.eids.*.uids.*.id",
      notIf: "0",
      reasoning: "obvious observed values"
    },
    isMobileDevice: {
      context: "body",
      path: prefix + "user.ext.sua.mobile",
      reasoning: "obvious property name"
    },
    scrollPositionX: {
      context: "body",
      path: prefix + "viewport.scrollTop",
      reasoning: "obvious property name"
    },
    scrollPositionY: {
      context: "body",
      path: prefix + "viewport.scrollLeft",
      reasoning: "obvious property name"
    },
    isAutomated: {
      context: "body",
      path: prefix + "device.ext.webdriver",
      reasoning: "https://docs.prebid.org/features/firstPartyData.html#automatically-collected-first-party-data"
    },
    sessionId: {
      context: "body",
      path: prefix + "site.ext.data.adg_rtd.session.id",
      reasoning: "https://github.com/prebid/Prebid.js/blob/bb586b85fb59424d366808d1dad82b2602ee0fc8/modules/adagioRtdProvider.js#L99"
    },
    lastActivityTime: {
      context: "body",
      path: prefix + "site.ext.data.adg_rtd.session.lastActivityTime",
      reasoning: "obvious property name"
    }
  });
  var $1bbd9ada6345b68c$var$tracker = {
    slug: "adform",
    name: "Adform A/S",
    datenanfragenSlug: "adform",
    exodusId: 157
  };
  var $1bbd9ada6345b68c$var$adformCommonHeaderAndCookiePaths = {
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://site.adform.com/privacy-center/platform-privacy/product-and-services-privacy-policy/#WhatInformationDoWeCollectandUse"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://site.adform.com/privacy-center/platform-privacy/product-and-services-privacy-policy/#WhatInformationDoWeCollectandUse"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://site.adform.com/privacy-center/platform-privacy/product-and-services-privacy-policy/#WhatInformationDoWeCollectandUse"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ],
    deviceId: {
      context: "cookie",
      path: "uid",
      reasoning: "https://site.adform.com/privacy-center/adform-cookies/"
    }
  };
  var $1bbd9ada6345b68c$export$1761c188a41008af = [
    {
      slug: "adx-openrtb",
      name: "Adform OpenRTB integration",
      tracker: $1bbd9ada6345b68c$var$tracker,
      endpointUrls: [
        "https://adx.adform.net/adx/openrtb",
        "https://adx2.adform.net/adx/openrtb"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $1bbd9ada6345b68c$var$adformCommonHeaderAndCookiePaths, {
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "cookie-match",
      name: "Adform cookie match",
      tracker: $1bbd9ada6345b68c$var$tracker,
      endpointUrls: [
        "https://c1.adform.net/serving/cookie/match",
        "https://track.adform.net/serving/cookie/match",
        "https://dmp.adform.net/serving/cookie/match"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($1bbd9ada6345b68c$var$adformCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gpp",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "cm-cookie",
      name: "Adform (cm/cookie)",
      tracker: $1bbd9ada6345b68c$var$tracker,
      endpointUrls: [
        "https://cm.adform.net/cookie"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($1bbd9ada6345b68c$var$adformCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "serving-trackpoint",
      // See: https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript and https://www.simoahava.com/custom-templates/adform-tracking-point/
      name: "Adform Tracking Point",
      tracker: $1bbd9ada6345b68c$var$tracker,
      endpointUrls: [
        "https://track.adform.net/Serving/TrackPoint"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($1bbd9ada6345b68c$var$adformCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "pm",
          reasoning: "https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript"
        },
        viewedPage: [
          {
            context: "query",
            path: "ADFPageName",
            reasoning: "https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript"
          },
          {
            context: "query",
            path: "loc",
            reasoning: "obvious observed values"
          }
        ],
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious observed values"
        },
        browserId: {
          context: "query",
          path: "$[?(@property.match(/^eid_.*_1$/i))]",
          notIf: "0",
          reasoning: "https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript#UUID-803b0388-0c41-dfbd-6cdb-a646d650b2a2_bridgehead-idm4544500177347233314505181547"
        },
        deviceId: {
          context: "query",
          path: "$[?(@property.match(/^eid_.*_2$/i))]",
          reasoning: "https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript#UUID-803b0388-0c41-dfbd-6cdb-a646d650b2a2_bridgehead-idm4544500177347233314505181547"
        },
        userId: {
          context: "query",
          path: "$[?(@property.match(/^eid_.*_3$/i))]",
          reasoning: "https://www.adformhelp.com/hc/en-us/articles/9740584592273-Unique-Naming-Javascript#UUID-803b0388-0c41-dfbd-6cdb-a646d650b2a2_bridgehead-idm4544500177347233314505181547"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    }
  ];
  var $d0d7f7c7df05405b$var$tracker = {
    slug: "adjust",
    name: "Adjust GmbH",
    description: "adjust",
    datenanfragenSlug: "adjust-com",
    exodusId: 52
  };
  var $d0d7f7c7df05405b$var$containedDataPaths = (context) => ({
    appId: [
      {
        context,
        path: "package_name",
        reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
      },
      {
        context,
        path: "bundle_id",
        reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
      }
    ],
    appVersion: [
      {
        context,
        path: "app_version",
        reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
      },
      {
        context,
        path: "app_version_short",
        reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
      }
    ],
    advertisingId: [
      {
        context,
        path: "gps_adid",
        reasoning: "https://help.adjust.com/en/article/device-identifiers"
      },
      {
        context,
        path: "idfa",
        reasoning: "https://help.adjust.com/en/article/device-identifiers"
      }
    ],
    developerScopedId: [
      {
        context,
        path: "idfv",
        reasoning: "https://help.adjust.com/en/article/device-identifiers"
      },
      {
        context,
        path: "android_id",
        reasoning: "https://help.adjust.com/en/article/device-identifiers"
      }
    ],
    deviceId: [
      {
        context,
        path: "android_uuid",
        reasoning: "adjust/uuid.md"
      },
      {
        context,
        path: "ios_uuid",
        reasoning: "adjust/uuid.md"
      },
      {
        context,
        path: "persistent_ios_uuid",
        reasoning: "adjust/uuid.md"
      },
      {
        context,
        path: "web_uuid",
        reasoning: "adjust/uuid.md"
      },
      {
        context,
        path: "fb_anon_id",
        reasoning: "adjust/fb_anon_id.md"
      },
      {
        context,
        path: "external_device_id",
        reasoning: "https://help.adjust.com/en/article/external-device-identifiers"
      }
    ],
    language: {
      context,
      path: "language",
      reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
    },
    model: {
      context,
      path: "device_name",
      reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
    },
    osName: {
      context,
      path: "os_name",
      reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
    },
    osVersion: [
      {
        context,
        path: "os_version",
        reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
      },
      {
        context,
        path: "os_build",
        reasoning: "obvious property name"
      }
    ],
    country: {
      context,
      path: "country",
      reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
    },
    installTime: {
      context,
      path: "installed_at",
      reasoning: "adjust/installed_at.md"
    }
  });
  var $d0d7f7c7df05405b$export$1761c188a41008af = [
    {
      slug: "body",
      name: "Adjust (POST body)",
      tracker: $d0d7f7c7df05405b$var$tracker,
      endpointUrls: [
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/session$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/event$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/sdk_click$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/sdk_info$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/third_party_sharing$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/ad_revenue$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/sdk_click$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.partner_params",
          output: "res.body.partner_params"
        },
        {
          function: "parseJson",
          input: "res.body.callback_params",
          output: "res.body.callback_params"
        }
      ],
      containedDataPaths: {
        ...$d0d7f7c7df05405b$var$containedDataPaths("body"),
        manufacturer: {
          context: "body",
          path: "device_manufacturer",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "display_width",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "display_height",
          reasoning: "obvious property name"
        },
        timeSpent: [
          {
            context: "body",
            path: "session_length",
            reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
          },
          {
            context: "body",
            path: "time_spent",
            reasoning: "https://help.adjust.com/en/article/server-to-server-sessions"
          }
        ],
        revenue: {
          context: "body",
          path: "revenue",
          reasoning: "https://help.adjust.com/en/article/s2s-ad-revenue"
        }
      }
    },
    {
      slug: "qs",
      name: "Adjust (query string)",
      tracker: $d0d7f7c7df05405b$var$tracker,
      endpointUrls: [
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/attribution$/,
        /^https:\/\/app(\.eu)?\.adjust\.(com|net\.in|world)\/measurement_consent$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: $d0d7f7c7df05405b$var$containedDataPaths("query")
    }
  ];
  var $e2f984b9e2d65d10$var$tracker = {
    slug: "apple",
    name: "Apple Distribution International Ltd.",
    datenanfragenSlug: "apple"
  };
  var $e2f984b9e2d65d10$export$1761c188a41008af = [
    {
      slug: "iadsdk-attribution-v2",
      name: "iAd SDK Attribution v2",
      tracker: $e2f984b9e2d65d10$var$tracker,
      endpointUrls: [
        "https://ca.iadsdk.apple.com/adserver/attribution/v2"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        otherIdentifiers: [
          {
            context: "body",
            path: "toroId",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "anonymousDemandId",
            reasoning: "obvious observed values"
          }
        ],
        appId: {
          context: "body",
          path: "bundleId",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $3523b39ea0afdad6$var$tracker = {
    slug: "branch-io",
    name: "Branch Metrics, Inc.",
    description: "branch-io",
    datenanfragenSlug: "branch-io",
    exodusId: 167
  };
  var $3523b39ea0afdad6$export$1761c188a41008af = [
    {
      slug: "v1",
      name: "Branch Attribution API",
      description: "branch-io-attribution-api",
      tracker: $3523b39ea0afdad6$var$tracker,
      endpointUrls: [
        /^https:\/\/api2?\.branch\.io\/v1\/install$/,
        /^https:\/\/api2?\.branch\.io\/v1\/open$/,
        /^https:\/\/api2?\.branch\.io\/v1\/close$/,
        /^https:\/\/api2?\.branch\.io\/v1\/profile$/,
        /^https:\/\/api2?\.branch\.io\/v1\/logout$/
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        advertisingId: [
          {
            context: "body",
            path: "google_advertising_id",
            reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
          },
          {
            context: "body",
            path: "advertising_ids.aaid",
            reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
          }
        ],
        developerScopedId: {
          context: "body",
          path: "ios_vendor_id",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        deviceId: [
          {
            context: "body",
            path: "hardware_id",
            reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
          },
          {
            context: "body",
            path: "metadata.device_id",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "metadata.$google_analytics_client_id",
            reasoning: "https://help.branch.io/partners-portal/docs/google-analytics"
          },
          {
            context: "body",
            path: "device_fingerprint_id",
            reasoning: "obvious property name"
          }
        ],
        userId: [
          {
            context: "body",
            path: "metadata.$marketing_cloud_visitor_id",
            reasoning: "branch-io/marketing_cloud_visitor_id.md"
          },
          {
            context: "body",
            path: "metadata.$mixpanel_distinct_id",
            reasoning: "branch-io/mixpanel_distinct_id.md"
          },
          {
            context: "body",
            path: "metadata.$segment_anonymous_id",
            reasoning: "branch-io/segment_anonymous_id.md"
          },
          {
            context: "body",
            path: "metadata.user_id",
            reasoning: "https://help.branch.io/using-branch/docs/advertising-identifiers-for-attribution"
          },
          {
            context: "body",
            path: "identity",
            reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
          },
          {
            context: "body",
            path: "identity_id",
            reasoning: "obvious property name"
          }
        ],
        installationId: {
          context: "body",
          path: "metadata.$braze_install_id",
          reasoning: "https://help.branch.io/partners-portal/docs/braze"
        },
        otherIdentifiers: [
          {
            context: "body",
            path: "metadata.uuid",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "UDID",
            reasoning: "obvious property name"
          }
        ],
        manufacturer: {
          context: "body",
          path: "brand",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "model",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "screen_width",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        screenHeight: {
          context: "body",
          path: "screen_height",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        networkConnectionType: {
          context: "body",
          path: "connection_type",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "os",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        osVersion: [
          {
            context: "body",
            path: "os_version_android",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "os_version",
            reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
          }
        ],
        language: [
          {
            context: "body",
            path: "language",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "locale",
            reasoning: "obvious property name"
          }
        ],
        localIp: {
          context: "body",
          path: "local_ip",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        architecture: {
          context: "body",
          path: "cpu_type",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "body",
          path: "device_carrier",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "body",
          path: "user_agent",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        country: {
          context: "body",
          path: "country",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "app_version",
          reasoning: "https://help.branch.io/developers-hub/reference/attribution-api"
        },
        appId: [
          {
            context: "body",
            path: "cd.pn",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "ios_bundle_id",
            reasoning: "obvious property name"
          }
        ],
        trackerSdkVersion: {
          context: "body",
          path: "sdk",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $f43167978965550b$var$tracker = {
    slug: "chartboost",
    name: "Chartboost, Inc.",
    description: "chartboost",
    datenanfragenSlug: "chartboost",
    exodusId: 53
  };
  var $f43167978965550b$export$1761c188a41008af = [
    {
      slug: "live-unnested",
      // See: https://docs.chartboost.com/en/monetization/charles-web-proxy/#interpreting-charles-results
      name: "Chartboost initialization calls",
      tracker: $f43167978965550b$var$tracker,
      endpointUrls: [
        "https://live.chartboost.com/api/install",
        "https://live.chartboost.com/api/config",
        "https://live.chartboost.com/banner/show"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeBase64",
          input: "res.body.identity",
          output: "res.body.identity"
        },
        {
          function: "parseJson",
          input: "res.body.identity",
          output: "res.body.identity"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "body",
          path: "bundle_id",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "bundle",
          reasoning: "obvious observed values"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdk",
          reasoning: "obvious property name"
        },
        advertisingId: [
          {
            context: "body",
            path: "identity.gaid",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "identity.ifa",
            reasoning: "obvious property name"
          }
        ],
        sessionId: [
          {
            context: "body",
            path: "session_id",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "session_ID",
            reasoning: "obvious property name"
          }
        ],
        manufacturer: {
          context: "body",
          path: "device_type",
          reasoning: "obvious observed values"
        },
        model: {
          context: "body",
          path: "model",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "os",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "body",
          path: "os",
          reasoning: "obvious property name"
        },
        language: {
          context: "body",
          path: "language",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "timezone",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "body",
          path: "user_agent",
          reasoning: "obvious property name"
        },
        orientation: {
          context: "body",
          path: "is_portrait",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "body",
          path: "carrier",
          notIf: /(^{}$)|("carrier-name":null)/,
          reasoning: "obvious property name"
        },
        isRooted: {
          context: "body",
          path: "rooted_device",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "w",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "h",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "body",
          path: "mobile_network",
          reasoning: "obvious property name"
        },
        country: {
          context: "body",
          path: "country",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "live-nested",
      name: "Chartboost ad view",
      tracker: $f43167978965550b$var$tracker,
      endpointUrls: [
        "https://live.chartboost.com/webview/v2/prefetch",
        "https://live.chartboost.com/webview/v2/reward/get",
        "https://live.chartboost.com/webview/v2/interstitial/get",
        "https://da.chartboost.com/auction/sdk/banner"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeBase64",
          input: "res.body.device.identity",
          output: "res.body.device.identity"
        },
        {
          function: "parseJson",
          input: "res.body.device.identity",
          output: "res.body.device.identity"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "body",
          path: "app.bundle_id",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "app.bundle",
          reasoning: "obvious observed values"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdk.sdk",
          reasoning: "obvious property name"
        },
        advertisingId: [
          {
            context: "body",
            path: "device.identity.gaid",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.identity.ifa",
            reasoning: "obvious property name"
          }
        ],
        sessionId: {
          context: "body",
          path: "app.session_id",
          reasoning: "obvious property name"
        },
        manufacturer: {
          context: "body",
          path: "device.device_type",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "device.model",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "device.os",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "body",
          path: "device.os",
          reasoning: "obvious property name"
        },
        language: {
          context: "body",
          path: "device.language",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "device.timezone",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "body",
          path: "device.user_agent",
          reasoning: "obvious property name"
        },
        orientation: {
          context: "body",
          path: "device.is_portrait",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "body",
          path: "device.carrier",
          notIf: /("carrier_name":null)|("carrier_name":"")/,
          reasoning: "obvious property name"
        },
        isRooted: {
          context: "body",
          path: "device.rooted_device",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "device.w",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "device.h",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "body",
          path: "device.mobile_network",
          reasoning: "obvious property name"
        },
        country: {
          context: "body",
          path: "device.country",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $3f9db871cb56baaa$var$tracker = {
    slug: "criteo",
    name: "Criteo",
    description: "criteo",
    datenanfragenSlug: "criteo",
    exodusId: 170
  };
  var $3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths = {
    browserId: {
      context: "cookie",
      path: "uid",
      reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
    },
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ]
  };
  var $3f9db871cb56baaa$export$1761c188a41008af = [
    {
      slug: "gum-syncframe",
      // https://pep.gmu.edu/wp-content/uploads/sites/28/2024/04/Johnson-Neumann.pdf mentions that this is related to
      // the Google Topics API, which I was able to confirm by looking at the returned HTML. It calls
      // `document.browsingTopics()` for example.
      name: "Criteo Google Topics API integration (gum/syncframe)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://gum.criteo.com/syncframe"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths,
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        viewedPage: {
          context: "query",
          path: "topUrl",
          reasoning: "obvious observed values"
        },
        consentState: [
          // TCF consent string
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          // GPP consent string
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      slug: "bidder-cdb",
      // Previously "Criteo Direct Bidder" (cdb, see:
      // https://archive.ph/2018.04.03-064004/http://demo.criteo.com/support/publisher/cdb/), later rolled into
      // Commerce Grid (see:
      // https://www.criteo.com/wp-content/uploads/2023/06/Criteo-Launches-First-ever-Supply-side-Platform-Built-for-Commerce.pdf).
      name: "Criteo Commerce Grid Prebid.js OpenRTB integration",
      description: "criteo-commerce-grid-prebidjs",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://bidder.criteo.com/cdb"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths, (0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), {
        trackerSdkVersion: {
          context: "query",
          path: "ptv",
          reasoning: "https://archive.ph/2018.04.03-064004/http://demo.criteo.com/support/publisher/cdb/#selection-639.27-639.40"
        }
      })
    },
    {
      slug: "bidder-csm-events",
      name: "Criteo (bidder/csm/events)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://bidder.criteo.com/csm/events"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths
    },
    {
      slug: "mug-sid",
      name: "Criteo (mug/sid)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://mug.criteo.com/sid"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths
    },
    {
      slug: "gum-sid-json",
      name: "Criteo (gum/sid/json)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://gum.criteo.com/sid/json"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths,
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        viewedPage: {
          context: "query",
          path: "topUrl",
          reasoning: "obvious observed values"
        },
        consentState: {
          context: "query",
          path: "gdprString",
          reasoning: "obvious observed values"
        }
      }
    },
    {
      slug: "dis-usersync",
      name: "Criteo (dis/usersync)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://dis.criteo.com/dis/usersync.aspx"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        },
        {
          function: "parseQueryString",
          input: "res.query.url",
          output: "res.query.url_query"
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths, {
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "url_query.gdpr_consent",
            reasoning: "obvious observed values"
          }
        ],
        otherIdentifiers: [
          {
            context: "query",
            path: "uid",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "url_query.uid",
            notIf: "@@CRITEO_USERID@@",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "url_query.obUid",
            reasoning: "https://www.outbrain.com/privacy/cookies/"
          }
        ],
        userId: {
          context: "query",
          path: "publisher_user_id",
          reasoning: "obvious property name"
        }
      })
    },
    {
      slug: "bidder-inapp-v2",
      name: "Criteo (bidder/inapp/v2)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://bidder.criteo.com/inapp/v2"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        userAgent: [
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
          },
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://www.criteo.com/privacy/how-we-use-your-data/"
          },
          {
            context: "body",
            path: "user.userAgent",
            reasoning: "obvious property name"
          }
        ],
        appId: {
          context: "body",
          path: "publisher.bundleId",
          reasoning: "obvious property name"
        },
        advertisingId: {
          context: "body",
          path: "user.deviceId",
          reasoning: "observed values match known device parameters"
        },
        osName: {
          context: "body",
          path: "user.deviceOs",
          reasoning: "obvious property name"
        },
        country: {
          context: "body",
          path: "user.ext.user.geo.country",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "user.ext.device.w",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "user.ext.device.h",
          reasoning: "obvious property name"
        },
        model: [
          {
            context: "body",
            path: "user.ext.device.model",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "user.deviceModel",
            reasoning: "obvious property name"
          }
        ],
        manufacturer: {
          context: "body",
          path: "user.ext.device.make",
          reasoning: "obvious property name"
        },
        language: {
          context: "body",
          path: "user.ext.data.inputLanguage",
          reasoning: "obvious property name"
        },
        sessionDuration: {
          context: "body",
          path: "user.ext.data.sessionDuration",
          reasoning: "obvious property name"
        },
        orientation: {
          context: "body",
          path: "user.ext.data.orientation",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdkVersion",
          reasoning: "obvious property name"
        },
        consentState: {
          context: "body",
          path: "gdprConsent.consentData",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "gum-sync",
      name: "Criteo (gum/sync)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://gum.criteo.com/sync"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths,
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious observed values"
        }
      }
    },
    {
      slug: "sslwidget-event",
      name: "Criteo (sslwidget/event)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://sslwidget.criteo.com/event"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseJson",
          input: "res.query.sc",
          output: "res.query.sc"
        },
        {
          function: "parseJson",
          input: "res.query.external_advids",
          output: "res.query.external_advids"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "tld",
          reasoning: "obvious observed values"
        },
        viewedPage: {
          context: "query",
          path: "fu",
          reasoning: "obvious observed values"
        },
        browserId: [
          {
            context: "query",
            path: "sc.fbp",
            reasoning: "https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc#fbp"
          },
          {
            context: "query",
            path: "sc.ttp",
            reasoning: "https://business-api.tiktok.com/portal/docs?id=1739584860883969"
          }
        ],
        userId: {
          context: "query",
          path: "external_advids[?(@.type === 'Id5')].value",
          reasoning: "https://github.com/id5io/id5-api.js/blob/1cf1ed3d0baeaedc5511aacb2ad5cf3295da4362/README.md#id5-id"
        }
      })
    },
    {
      slug: "ld-js",
      name: "Criteo (ld.js)",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://dynamic.criteo.com/js/ld/ld.js"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths,
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      }
    },
    {
      slug: "grid-bidder-prebidjs",
      name: "Criteo Prebid.js OpenRTB integration",
      description: "criteo-grid-bidder-prebidjs",
      tracker: $3f9db871cb56baaa$var$tracker,
      endpointUrls: [
        "https://grid-bidder.criteo.com/openrtb_2_5/pbjs/auction/request"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($3f9db871cb56baaa$var$criteoCommonHeaderAndCookiePaths, (0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)())
    }
  ];
  var $9f42fc5dae2d9adf$var$tracker = {
    slug: "equativ",
    // See: https://equativ.com/blog/press-release/smart-adserver-rebrands-as-equativ/
    name: "Equativ (formerly Smart AdServer)",
    datenanfragenSlug: "smartadserver",
    exodusId: 7
  };
  var $9f42fc5dae2d9adf$export$1761c188a41008af = [
    {
      slug: "smartadserver-prebid-v1",
      name: "Smart AdServer Prebid v1",
      tracker: $9f42fc5dae2d9adf$var$tracker,
      endpointUrls: [
        "https://prg.smartadserver.com/prebid/v1"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "body",
          path: "siteid",
          reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
        },
        viewedPage: {
          context: "body",
          path: "pageid",
          reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
        },
        userId: [
          {
            context: "body",
            path: "ckid",
            notIf: "0",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
          },
          {
            context: "body",
            path: "eids.*.uids.*.id",
            notIf: "0",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
          },
          {
            context: "cookie",
            path: "pid",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          },
          {
            context: "cookie",
            path: "csync",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          }
        ],
        websiteUrl: {
          context: "body",
          path: "pageDomain",
          reasoning: "obvious property name"
        },
        consentState: [
          {
            context: "body",
            path: "gdpr_consent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
          },
          {
            context: "body",
            path: "gpp",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API-GET-method-legacy#general-parameters"
          }
        ],
        userAgent: [
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          }
        ],
        referer: {
          context: "header",
          path: "Referer",
          reasoning: "obvious property name"
        },
        browserId: {
          context: "cookie",
          path: "pbw",
          reasoning: "https://equativ.com/end-users-privacy-policy/"
        }
      }
    },
    {
      slug: "smartadserver-rtb-csync-redir",
      name: "Smart AdServer RTB Cookie Sync redirect",
      tracker: $9f42fc5dae2d9adf$var$tracker,
      endpointUrls: [
        "https://rtb-csync.smartadserver.com/redir/"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        userId: [
          {
            context: "query",
            path: "partneruserid",
            notIf: /^GOOGLE_HOSTED_PI|OB_OK|1|0|TAM_OK|OPTOUT$/,
            reasoning: "obvious property name"
          },
          {
            context: "cookie",
            path: "pid",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          },
          {
            context: "cookie",
            path: "csync",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          }
        ],
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            notIf: "[GDPR_CONSENT]",
            reasoning: "obvious observed values"
          },
          // https://support.google.com/admanager/answer/9681920?hl=en
          {
            context: "query",
            path: "addtl_consent",
            reasoning: "obvious observed values"
          }
        ],
        userAgent: [
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          },
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          }
        ],
        referer: [
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          }
        ],
        browserId: {
          context: "cookie",
          path: "pbw",
          reasoning: "https://equativ.com/end-users-privacy-policy/"
        },
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ]
      }
    },
    {
      slug: "smartadserver-ssbsync-api-sync",
      name: "Smart AdServer (ssbsync/api/sync)",
      tracker: $9f42fc5dae2d9adf$var$tracker,
      endpointUrls: [
        "https://ssbsync.smartadserver.com/api/sync",
        "https://ssbsync-global.smartadserver.com/api/sync"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        userId: [
          {
            context: "query",
            path: "publisher_user_id",
            reasoning: "obvious property name"
          },
          {
            context: "cookie",
            path: "pid",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          },
          {
            context: "cookie",
            path: "csync",
            reasoning: "https://equativ.com/end-users-privacy-policy/"
          }
        ],
        consentState: {
          context: "query",
          path: "gdpr_consent",
          notIf: /^{GDPRCS}}|{consent_string}|\[USER_CONSENT]|\${GDPR_CONSENT}$/,
          reasoning: "obvious observed values"
        },
        userAgent: [
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          },
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://help.smartadserver.com/s/article/Ad-API#headers"
          }
        ],
        referer: [
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          }
        ],
        browserId: {
          context: "cookie",
          path: "pbw",
          reasoning: "https://equativ.com/end-users-privacy-policy/"
        }
      }
    }
  ];
  var $131d05907963357b$var$tracker = {
    slug: "facebook",
    name: "Facebook",
    datenanfragenSlug: "facebook"
  };
  var $131d05907963357b$var$graphActivitiesEndpointRegex = /^https:\/\/graph\.facebook\.com\/v\d{1,2}.\d\/\d+\/activities$/;
  var $131d05907963357b$var$graphActivitiesDataPaths = ({ pathPrefix, includeExtinfo }) => ({
    advertisingId: {
      context: "body",
      path: pathPrefix + "advertiser_id",
      reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
    },
    userId: {
      context: "body",
      path: pathPrefix + "app_user_id",
      notIf: "0",
      reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
    },
    deviceId: [
      {
        context: "body",
        path: pathPrefix + "anon_id",
        reasoning: "facebook/anon_id.md"
      },
      {
        context: "body",
        path: pathPrefix + "device_token",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      }
    ],
    osName: {
      context: "body",
      path: pathPrefix + "sdk",
      reasoning: "obvious observed values"
    },
    appId: [
      ...includeExtinfo !== false ? [
        {
          context: "body",
          path: pathPrefix + "extinfo.1",
          reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
        }
      ] : [],
      {
        context: "body",
        path: pathPrefix + "application_package_name",
        reasoning: "obvious property name"
      }
    ],
    ...includeExtinfo !== false && {
      appVersion: [
        {
          context: "body",
          path: pathPrefix + "extinfo.2",
          reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
        },
        {
          context: "body",
          path: pathPrefix + "extinfo.3",
          reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
        }
      ],
      osVersion: {
        context: "body",
        path: pathPrefix + "extinfo.4",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      model: {
        context: "body",
        path: pathPrefix + "extinfo.5",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      language: {
        context: "body",
        path: pathPrefix + "extinfo.6",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      timezone: [
        {
          context: "body",
          path: pathPrefix + "extinfo.7",
          reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
        },
        {
          context: "body",
          path: pathPrefix + "extinfo.15",
          reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
        }
      ],
      carrier: {
        context: "body",
        path: pathPrefix + "extinfo.8",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      screenWidth: {
        context: "body",
        path: pathPrefix + "extinfo.9",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      screenHeight: {
        context: "body",
        path: pathPrefix + "extinfo.10",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      diskTotal: {
        context: "body",
        path: pathPrefix + "extinfo.13",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      },
      diskFree: {
        context: "body",
        path: pathPrefix + "extinfo.14",
        reasoning: "https://developers.facebook.com/docs/graph-api/reference/v17.0/application/activities"
      }
    }
  });
  var $131d05907963357b$var$adDataPaths = ({ pathPrefix }) => ({
    appId: {
      context: "body",
      path: pathPrefix + "BUNDLE",
      reasoning: "obvious property name"
    },
    appName: {
      context: "body",
      path: pathPrefix + "APPNAME",
      reasoning: "obvious property name"
    },
    appVersion: {
      context: "body",
      path: pathPrefix + "APPVERS",
      reasoning: "obvious property name"
    },
    advertisingId: {
      context: "body",
      path: pathPrefix + "IDFA",
      reasoning: "obvious property name"
    },
    sessionId: {
      context: "body",
      path: pathPrefix + "SESSION_ID",
      reasoning: "obvious property name"
    },
    manufacturer: {
      context: "body",
      path: pathPrefix + "MAKE",
      reasoning: "obvious property name"
    },
    model: {
      context: "body",
      path: pathPrefix + "MODEL",
      reasoning: "obvious property name"
    },
    isRooted: {
      context: "body",
      path: pathPrefix + "ROOTED",
      reasoning: "obvious property name"
    },
    carrier: {
      context: "body",
      path: pathPrefix + "CARRIER",
      reasoning: "obvious property name"
    },
    screenHeight: {
      context: "body",
      path: pathPrefix + "SCREEN_HEIGHT",
      reasoning: "obvious property name"
    },
    screenWidth: {
      context: "body",
      path: pathPrefix + "SCREEN_WIDTH",
      reasoning: "obvious property name"
    },
    osName: {
      context: "body",
      path: pathPrefix + "OS",
      reasoning: "obvious property name"
    },
    osVersion: {
      context: "body",
      path: pathPrefix + "OSVERS",
      reasoning: "obvious property name"
    },
    language: {
      context: "body",
      path: pathPrefix + "LOCALE",
      reasoning: "obvious property name"
    },
    isEmulator: {
      context: "body",
      path: pathPrefix + "VALPARAMS.is_emu",
      reasoning: "obvious property name"
    },
    timezone: {
      context: "body",
      path: pathPrefix + "VALPARAMS.timezone_offset",
      reasoning: "obvious property name"
    },
    trackerSdkVersion: {
      context: "body",
      path: pathPrefix + "SDK_VERSION",
      reasoning: "obvious property name"
    },
    ramTotal: {
      context: "body",
      path: pathPrefix + "ANALOG.total_memory",
      reasoning: "obvious property name"
    },
    ramFree: {
      context: "body",
      path: pathPrefix + "ANALOG.available_memory",
      reasoning: "obvious property name"
    },
    accelerometerX: {
      context: "body",
      path: pathPrefix + "ANALOG.accelerometer_x",
      reasoning: "obvious property name"
    },
    accelerometerY: {
      context: "body",
      path: pathPrefix + "ANALOG.accelerometer_y",
      reasoning: "obvious property name"
    },
    accelerometerZ: {
      context: "body",
      path: pathPrefix + "ANALOG.accelerometer_z",
      reasoning: "obvious property name"
    },
    rotationX: {
      context: "body",
      path: pathPrefix + "ANALOG.rotation_x",
      reasoning: "obvious property name"
    },
    rotationY: {
      context: "body",
      path: pathPrefix + "ANALOG.rotation_y",
      reasoning: "obvious property name"
    },
    rotationZ: {
      context: "body",
      path: pathPrefix + "ANALOG.rotation_z",
      reasoning: "obvious property name"
    },
    isCharging: {
      context: "body",
      path: pathPrefix + "ANALOG.charging",
      reasoning: "obvious property name"
    },
    batteryLevel: {
      context: "body",
      path: pathPrefix + "ANALOG.battery",
      reasoning: "obvious property name"
    },
    diskFree: {
      context: "body",
      path: pathPrefix + "ANALOG.free_space",
      reasoning: "obvious property name"
    }
  });
  var $131d05907963357b$export$1761c188a41008af = [
    {
      slug: "graph-activities-json",
      name: "Facebook Graph App Events API (JSON)",
      description: "facebook-graph-app-events",
      tracker: $131d05907963357b$var$tracker,
      endpointUrls: [
        $131d05907963357b$var$graphActivitiesEndpointRegex
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.extinfo",
          output: "res.body.extinfo"
        }
      ],
      containedDataPaths: $131d05907963357b$var$graphActivitiesDataPaths({
        pathPrefix: ""
      })
    },
    {
      slug: "graph-activities-qs",
      name: "Facebook Graph App Events API (query string)",
      description: "facebook-graph-app-events",
      tracker: $131d05907963357b$var$tracker,
      endpointUrls: [
        $131d05907963357b$var$graphActivitiesEndpointRegex
      ],
      match: (r) => r.content?.includes("format=json&"),
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.extinfo",
          output: "res.body.extinfo"
        }
      ],
      containedDataPaths: $131d05907963357b$var$graphActivitiesDataPaths({
        pathPrefix: ""
      })
    },
    {
      slug: "graph",
      name: "Facebook Graph Batch API",
      description: "facebook-graph-app-events",
      tracker: $131d05907963357b$var$tracker,
      endpointUrls: [
        /^https:\/\/graph\.facebook\.com\/v\d{1,2}.\d$/
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "b"
        },
        {
          function: "parseJson",
          input: "b.batch",
          output: "batch"
        },
        {
          function: "getProperty",
          mapInput: "batch",
          options: {
            path: "relative_url"
          },
          output: "relativeUrls"
        },
        {
          function: "parseQueryString",
          mapInput: "relativeUrls",
          output: "res.body.batch"
        },
        {
          function: "getProperty",
          input: "b",
          options: {
            path: "batch_app_id"
          },
          output: "res.body.batch_app_id"
        }
      ],
      // The batch endpoint can receive requests to any of the other endpoints, so we would need to combine the data
      // paths here (see: https://developers.facebook.com/docs/graph-api/batch-requests).
      // However, from the traffic we have observed, it seems like it never receives `network_ads_common` or
      // `adnw_sync2` requests.
      containedDataPaths: $131d05907963357b$var$graphActivitiesDataPaths({
        pathPrefix: "batch.*.",
        // The batch objects _can_ have extinfo, but we currently don't support decoding that.
        includeExtinfo: false
      })
    },
    {
      slug: "graph-network-ads-common",
      // See: https://developers.facebook.com/docs/audience-network/setting-up/test/validate-ad-requests/#view-ad-requests
      name: "Meta Audience Network SDK",
      description: "facebook-audience-network",
      tracker: $131d05907963357b$var$tracker,
      endpointUrls: [
        "https://graph.facebook.com/network_ads_common"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.VALPARAMS",
          output: "res.body.VALPARAMS"
        },
        {
          function: "parseJson",
          input: "res.body.ANALOG",
          output: "res.body.ANALOG"
        }
      ],
      containedDataPaths: $131d05907963357b$var$adDataPaths({
        pathPrefix: ""
      })
    },
    {
      slug: "adnw-sync2",
      name: "Facebook Ad Network Sync 2",
      tracker: $131d05907963357b$var$tracker,
      endpointUrls: [
        /^https:\/\/(www|web)\.facebook\.com\/adnw_sync2?$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "q"
        },
        {
          function: "getProperty",
          input: "q",
          options: {
            path: "payload"
          },
          output: "payload"
        },
        {
          function: "parseJson",
          input: "payload",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.context.VALPARAMS",
          output: "res.body.context.VALPARAMS"
        },
        {
          function: "parseJson",
          input: "res.body.context.ANALOG",
          output: "res.body.context.ANALOG"
        }
      ],
      containedDataPaths: $131d05907963357b$var$adDataPaths({
        pathPrefix: "context."
      })
    }
  ];
  var $f37ff153785f33ea$var$tracker = {
    slug: "google",
    name: "Google LLC",
    datenanfragenSlug: "google"
  };
  var $f37ff153785f33ea$var$containedDataPathsDoubleclickMadsGma = (context) => ({
    manufacturer: {
      context,
      path: "platform",
      reasoning: "obvious property name"
    },
    model: {
      context,
      path: "submodel",
      reasoning: "obvious property name"
    },
    osName: {
      context,
      path: "sys_name",
      reasoning: "obvious property name"
    },
    osVersion: {
      context,
      path: "os_version",
      reasoning: "obvious property name"
    },
    volume: [
      {
        context,
        path: "android_app_volume",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "ios_app_volume",
        reasoning: "obvious property name"
      }
    ],
    language: {
      context,
      path: "hl",
      reasoning: "obvious observed values"
    },
    networkConnectionType: {
      context,
      path: "net",
      reasoning: "obvious property name"
    },
    architecture: {
      context,
      path: "binary_arch",
      reasoning: "obvious property name"
    },
    isRooted: {
      context,
      path: "ios_jb",
      reasoning: "obvious property name"
    },
    appId: [
      {
        context,
        path: "app_name",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "_package_name",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "msid",
        reasoning: "https://support.google.com/admanager/answer/10678356#msid-an"
      }
    ],
    appName: {
      context,
      path: "an",
      reasoning: "https://support.google.com/admanager/answer/10678356#msid-an"
    },
    trackerSdkVersion: {
      context,
      path: "dtsdk",
      reasoning: "obvious property name"
    },
    otherIdentifiers: {
      context: "cookie",
      path: "IDE",
      reasoning: "google/IDE.md"
    }
  });
  var $f37ff153785f33ea$var$cctAndroidUrl = (lines) => `https://github.com/firebase/firebase-android-sdk/blob/bb0823ffc999ccfc38d75a165f6c0391ed884f6b/transport/transport-backend-cct/src/test/proto/google/cct/google_cct.proto#${lines}`;
  var $f37ff153785f33ea$var$cctIosUrl = (lines) => `https://github.com/google/GoogleDataTransport/blob/78c44ad53d41c84d7d04ceab9e8773327befbf2c/GoogleDataTransport/ProtoSupport/Protos/cct.proto#${lines}`;
  var $f37ff153785f33ea$var$fireperfAndroidUrl = (lines) => `https://github.com/firebase/firebase-android-sdk/blob/132b8ba8563aa00b06e27b56ee811e738d14c791/firebase-perf/src/main/proto/firebase/perf/v1/perf_metric.proto#${lines}`;
  var $f37ff153785f33ea$var$fireperfIosUrl = (lines) => `https://github.com/firebase/firebase-ios-sdk/blob/7a0145207ec66f24e4bd1ceccd4f861a3e22535b/FirebasePerformance/ProtoSupport/Protos/perf_metric.proto#${lines}`;
  var $f37ff153785f33ea$var$crashlyticsUrl = (lines) => `https://github.com/firebase/firebase-ios-sdk/blob/7a0145207ec66f24e4bd1ceccd4f861a3e22535b/Crashlytics/ProtoSupport/Protos/crashlytics.proto#${lines}`;
  var $f37ff153785f33ea$var$appqualityUrl = (lines) => `https://github.com/firebase/firebase-ios-sdk/blob/7a0145207ec66f24e4bd1ceccd4f861a3e22535b/FirebaseSessions/ProtoSupport/Protos/sessions.proto#${lines}`;
  var $f37ff153785f33ea$var$corediagnosticsUrl = (lines) => `https://github.com/firebase/firebase-ios-sdk/blob/af1201c8a3e64d7c1893cebbec6877cd8c39abf7/Firebase/CoreDiagnostics/ProtoSupport/Protos/firebasecore.proto#${lines}`;
  var $f37ff153785f33ea$var$mlLogUrlAndroid = (lines) => `https://github.com/firebase/firebase-android-sdk/blob/master/firebase-ml-modeldownloader/src/test/proto/firebase/ml/modeldownloader/firebase_ml_log_sdk.proto#${lines}`;
  var $f37ff153785f33ea$var$mlLogUrlIos = (lines) => `https://github.com/firebase/firebase-ios-sdk/blob/477bb2a6961b18dc6210a0dafc90a975e6a448c6/FirebaseMLModelDownloader/Sources/proto/firebase_ml_log_sdk.proto#${lines}`;
  var $f37ff153785f33ea$var$containedDataPathsFireperf = {
    appId: {
      context: "body",
      path: "logEvents_FIREPERF.*.1.3.1",
      reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L326-L328")
    },
    trackerSdkVersion: [
      {
        context: "body",
        path: "logEvents_FIREPERF.*.1.3.2",
        reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L330-L331")
      },
      {
        context: "body",
        path: "logEvents_FIREPERF.*.1.4.2",
        reasoning: $f37ff153785f33ea$var$fireperfIosUrl("L454-L455")
      }
    ],
    appVersion: [
      {
        context: "body",
        path: "logEvents_FIREPERF.*.1.3.3",
        reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L333-L338")
      },
      {
        context: "body",
        path: "logEvents_FIREPERF.*.1.4.3",
        reasoning: $f37ff153785f33ea$var$fireperfIosUrl("L457-L461")
      }
    ],
    networkConnectionType: {
      context: "body",
      path: "logEvents_FIREPERF.*.1.4.5.1",
      reasoning: $f37ff153785f33ea$var$fireperfIosUrl("L469-L470")
    },
    isInForeground: {
      context: "body",
      path: "logEvents_FIREPERF.*.1.5",
      reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L314-L315")
    },
    sessionId: {
      context: "body",
      path: "logEvents_FIREPERF.*.4.1",
      reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L213-L217")
    },
    ramUsed: {
      context: "body",
      path: "logEvents_FIREPERF.*.4.4.*.2",
      reasoning: $f37ff153785f33ea$var$fireperfAndroidUrl("L255-L256")
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsGdtClientMetrics = {
    appId: {
      context: "body",
      path: "logEvents_GDT_CLIENT_METRICS.*.4",
      reasoning: `https://github.com/firebase/firebase-android-sdk/blob/132b8ba8563aa00b06e27b56ee811e738d14c791/transport/transport-runtime/src/main/proto/client_analytics.proto#L38-L39`
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsInAppMessaging = {
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_FIREBASE_INAPPMESSAGING.*.9",
      reasoning: `https://github.com/firebase/firebase-android-sdk/blob/132b8ba8563aa00b06e27b56ee811e738d14c791/firebase-inappmessaging/src/proto/logs/proto/firebase/inappmessaging/campaign_analytics.proto#L57-L58`
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsCrashlyticsReport = {
    trackerSdkVersion: [
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.sdkVersion",
        reasoning: $f37ff153785f33ea$var$crashlyticsUrl("L28-L29")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.generator",
        reasoning: "obvious observed values"
      }
    ],
    osName: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.platform",
      reasoning: $f37ff153785f33ea$var$crashlyticsUrl("L34-L35")
    },
    installationId: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.installationUuid",
      reasoning: $f37ff153785f33ea$var$crashlyticsUrl("L37-L39")
    },
    appVersion: [
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.buildVersion",
        reasoning: $f37ff153785f33ea$var$crashlyticsUrl("L47-L48")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.displayVersion",
        reasoning: $f37ff153785f33ea$var$crashlyticsUrl("L50-L51")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.app.version",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.app.displayVersion",
        reasoning: "obvious property name"
      }
    ],
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.app.identifier",
      reasoning: "obvious property name"
    },
    osVersion: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.os.version",
      reasoning: "obvious property name"
    },
    isRooted: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.os.jailbroken",
      reasoning: "obvious property name"
    },
    architecture: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.arch",
      reasoning: "obvious property name"
    },
    model: [
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.model",
        reasoning: "obvious property name"
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.modelClass",
        reasoning: "obvious property name"
      }
    ],
    ramTotal: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.ram",
      reasoning: "obvious property name"
    },
    diskTotal: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.diskSpace",
      reasoning: "obvious property name"
    },
    isEmulator: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.simulator",
      reasoning: "obvious property name"
    },
    manufacturer: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.device.manufacturer",
      reasoning: "obvious property name"
    },
    batteryLevel: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.events.*.device.batteryLevel",
      reasoning: "obvious property name"
    },
    orientation: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.events.*.device.orientation",
      reasoning: "obvious property name"
    },
    ramUsed: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.events.*.device.ramUsed",
      reasoning: "obvious property name"
    },
    diskUsed: {
      context: "body",
      path: "logEvents_FIREBASE_CRASHLYTICS_REPORT.*.session.events.*.device.diskUsed",
      reasoning: "obvious property name"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsAppQualityAndroid = {
    sessionId: [
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.sessionData.sessionId",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L120-L121")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.sessionData.firstSessionId",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L122-L124")
      }
    ],
    installationId: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.sessionData.firebaseInstallationId",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L128-L129")
    },
    model: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.deviceModel",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L172-L173")
    },
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.sessionSdkVersion",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L178-L179")
    },
    osVersion: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.osVersion",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L180-L181")
    },
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.androidAppInfo.appId",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L204-L205")
    },
    appVersion: [
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.androidAppInfo.versionName",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L207-L208")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.androidAppInfo.appBuildVersion",
        reasoning: "obvious property name"
      }
    ],
    manufacturer: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.applicationInfo.androidAppInfo.deviceManufacturer",
      reasoning: "obvious property name"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsAppQualityIos = {
    sessionId: [
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.2.1",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L120-L121")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.2.7",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L122-L124")
      }
    ],
    installationId: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.2.3",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L128-L129")
    },
    model: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.2",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L172-L173")
    },
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.7",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L178-L179")
    },
    osVersion: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.9",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L180-L181")
    },
    appVersion: [
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.6.1",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L207-L208")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.6.6",
        reasoning: $f37ff153785f33ea$var$appqualityUrl("L222-L223")
      }
    ],
    networkConnectionType: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.6.3.1",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L224-L225")
    },
    osName: {
      context: "body",
      path: "logEvents_FIREBASE_APPQUALITY_SESSION.*.3.6.4",
      reasoning: $f37ff153785f33ea$var$appqualityUrl("L226-L227")
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsFirebaseCoreDiagnostics = {
    trackerSdkVersion: [
      {
        context: "body",
        path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.18",
        reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L68")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.19",
        reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L69")
      },
      {
        context: "body",
        path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.31",
        reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L86")
      }
    ],
    model: {
      context: "body",
      path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.9",
      reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L74")
    },
    osVersion: {
      context: "body",
      path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.22",
      reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L75")
    },
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_COREDIAGNOSTICS.*.12",
      reasoning: $f37ff153785f33ea$var$corediagnosticsUrl("L77")
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsMlLogsAndroid = {
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.systemInfo.appId",
      reasoning: $f37ff153785f33ea$var$mlLogUrlAndroid("L28-L30")
    },
    appVersion: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.systemInfo.appVersion",
      reasoning: $f37ff153785f33ea$var$mlLogUrlAndroid("L32-34")
    },
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.systemInfo.mlSdkVersion",
      reasoning: $f37ff153785f33ea$var$mlLogUrlAndroid("L41-L43")
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsMlLogsIos = {
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.1.1",
      reasoning: $f37ff153785f33ea$var$mlLogUrlIos("L23-L24")
    },
    appVersion: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.1.2",
      reasoning: $f37ff153785f33ea$var$mlLogUrlIos("L26-L27")
    },
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_FIREBASE_ML_LOG_SDK.*.1.4",
      reasoning: $f37ff153785f33ea$var$mlLogUrlIos("L34-L35")
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsMlSdk = {
    appId: {
      context: "body",
      path: "logEvents_FIREBASE_ML_SDK.*.1.1",
      reasoning: "obvious observed values"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsPlayBilling = {
    trackerSdkVersion: {
      context: "body",
      path: "logEvents_PLAY_BILLING_LIBRARY.*.1.1",
      reasoning: "obvious observed values"
    },
    appId: {
      context: "body",
      path: "logEvents_PLAY_BILLING_LIBRARY.*.1.2",
      reasoning: "obvious observed values"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsCastSender = {
    appId: {
      context: "body",
      path: "logEvents_CAST_SENDER_SDK.*.48.1.1",
      reasoning: "obvious observed values"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsLocationEngine = {
    appId: {
      context: "body",
      path: "logEvents_LE.*.2.2.1",
      reasoning: "obvious observed values"
    }
  };
  var $f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders = {
    trackerSdkVersion: [
      {
        context: "header",
        path: "x-client-version",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "X-Client-Version",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "x-firebase-client",
        reasoning: "obvious property name"
      }
    ],
    appId: [
      {
        context: "header",
        path: "x-requested-with",
        reasoning: "obvious observed values"
      },
      {
        context: "header",
        path: "X-Android-Package",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "x-ios-bundle-identifier",
        reasoning: "obvious property name"
      }
    ]
  };
  var $f37ff153785f33ea$export$1761c188a41008af = [
    {
      slug: "app-measurement",
      name: "Google Analytics for Firebase (app-measurement.com)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://app-measurement.com/a"
      ],
      decodingSteps: [
        {
          function: "decodeProtobuf",
          input: "body",
          output: "res.body"
        },
        {
          function: "ensureArray",
          input: "res.body.1",
          output: "res.body.1"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "body",
          path: "1.*.14",
          reasoning: "obvious observed values"
        },
        appVersion: {
          context: "body",
          path: "1.*.16",
          reasoning: "obvious observed values"
        },
        advertisingId: {
          context: "body",
          path: "1.*.19",
          reasoning: "obvious observed values"
        },
        developerScopedId: {
          context: "body",
          path: "1.*.27",
          reasoning: "obvious observed values"
        },
        osName: {
          context: "body",
          path: "1.*.8",
          reasoning: "obvious observed values"
        },
        osVersion: {
          context: "body",
          path: "1.*.9",
          reasoning: "obvious observed values"
        }
      }
    },
    {
      slug: "device-provisioning-checkin",
      // See: https://github.com/firebase/firebase-ios-sdk/blob/ab0d0854a3682f14c0ee26859469cb4b1636d5e1/FirebaseMessaging/Sources/Token/FIRMessagingCheckinService.m#L27
      name: "Firebase Cloud Messaging (device checkin)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://device-provisioning.googleapis.com/checkin"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        language: {
          context: "body",
          path: "locale",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "checkin.iosbuild.model",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "checkin.iosbuild.os_version",
          reasoning: "obvious observed values"
        },
        osVersion: {
          context: "body",
          path: "checkin.iosbuild.os_version",
          reasoning: "obvious property name"
        },
        timezone: [
          {
            context: "body",
            path: "time_zone",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "timezone",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      slug: "fcmtoken-register",
      // See: https://github.com/firebase/firebase-ios-sdk/blob/ab0d0854a3682f14c0ee26859469cb4b1636d5e1/FirebaseMessaging/Sources/FIRMessagingUtilities.m#L41
      name: "Firebase Cloud Messaging (register token)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://fcmtoken.googleapis.com/register"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        osName: {
          context: "body",
          path: "plat",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "body",
          path: "X-osv",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "body",
          path: "device",
          reasoning: "obvious property name"
        },
        appId: {
          context: "body",
          path: "app",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "app_ver",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "doubleclick-mads-gma-body",
      name: "Google Mobile Ads SDK (DoubleClick, body)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://googleads.g.doubleclick.net/mads/gma"
      ],
      match: (r) => !!r.content,
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.IDE",
          options: {
            path: "IDE"
          }
        }
      ],
      containedDataPaths: $f37ff153785f33ea$var$containedDataPathsDoubleclickMadsGma("body")
    },
    {
      slug: "doubleclick-mads-gma-qs",
      name: "Google Mobile Ads SDK (DoubleClick, query string)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://googleads.g.doubleclick.net/mads/gma"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.IDE",
          options: {
            path: "IDE"
          }
        }
      ],
      containedDataPaths: {
        ...$f37ff153785f33ea$var$containedDataPathsDoubleclickMadsGma("query"),
        appVersion: {
          context: "query",
          path: "vnm",
          reasoning: "google/vnm.md"
        }
      }
    },
    {
      slug: "doubleclick-getconfig-pubsetting",
      name: "DoubleClick (getconfig/pubsetting)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://googleads.g.doubleclick.net/getconfig/pubsetting"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header.x-requested-with",
          options: {
            path: "x-requested-with"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.IDE",
          options: {
            path: "IDE"
          }
        }
      ],
      containedDataPaths: {
        appId: [
          {
            context: "query",
            path: "app_name",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ],
        appVersion: {
          context: "query",
          path: "vnm",
          reasoning: "google/vnm.md"
        },
        otherIdentifiers: {
          context: "cookie",
          path: "IDE",
          reasoning: "google/IDE.md"
        }
      }
    },
    {
      slug: "fundingchoicesmessages",
      name: "Privacy & Messaging API",
      description: "google-fundingchoices",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://fundingchoicesmessages.google.com/a/consent"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        advertisingId: {
          context: "body",
          path: "adid",
          reasoning: "observed values match known device parameters"
        },
        osName: {
          context: "body",
          path: "device_info.os_type",
          reasoning: "google/device_info.os_type.md"
        },
        model: {
          context: "body",
          path: "device_info.model",
          reasoning: "obvious property name"
        },
        osVersion: [
          {
            context: "body",
            path: "device_info.android_api_level",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device_info.version",
            reasoning: "observed values match known device parameters"
          }
        ],
        language: {
          context: "body",
          path: "language_code",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "screen_info.width",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "screen_info.height",
          reasoning: "obvious property name"
        },
        appId: {
          context: "body",
          path: "app_info.package_name",
          reasoning: "obvious property name"
        },
        appName: {
          context: "body",
          path: "app_info.publisher_display_name",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "app_info.version",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdk_info.version",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "body",
          path: "rdid",
          reasoning: "google/rdid.md"
        }
      }
    },
    {
      slug: "doubleclick-pagead-interaction",
      name: "DoubleClick (pagead/interaction)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://googleads.g.doubleclick.net/pagead/interaction"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.IDE",
          options: {
            path: "IDE"
          }
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header.x-requested-with",
          options: {
            path: "x-requested-with"
          }
        }
      ],
      containedDataPaths: {
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        otherIdentifiers: {
          context: "cookie",
          path: "IDE",
          reasoning: "google/IDE.md"
        }
      }
    },
    {
      slug: "googledatatransport-firelog-batchlog-json",
      name: "GoogleDataTransport (FireLog BatchedLogRequest, JSON)",
      description: "googledatatransport-batchlog",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://firebaselogging-pa.googleapis.com/v1/firelog/legacy/batchlog",
        "https://crashlyticsreports-pa.googleapis.com/v1/firelog/legacy/batchlog",
        "https://firebaselogging.googleapis.com/v0cc/log/batch"
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREPERF_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREPERF')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_FIREPERF_base64",
          output: "logEvents_FIREPERF_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_FIREPERF_protobuf",
          output: "res.body.logEvents_FIREPERF"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_GDT_CLIENT_METRICS_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'GDT_CLIENT_METRICS')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_GDT_CLIENT_METRICS_base64",
          output: "logEvents_GDT_CLIENT_METRICS_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_GDT_CLIENT_METRICS_protobuf",
          output: "res.body.logEvents_GDT_CLIENT_METRICS"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREBASE_INAPPMESSAGING_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREBASE_INAPPMESSAGING')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_FIREBASE_INAPPMESSAGING_base64",
          output: "logEvents_FIREBASE_INAPPMESSAGING_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_FIREBASE_INAPPMESSAGING_protobuf",
          output: "res.body.logEvents_FIREBASE_INAPPMESSAGING"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_PLAY_BILLING_LIBRARY_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'PLAY_BILLING_LIBRARY')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_PLAY_BILLING_LIBRARY_base64",
          output: "logEvents_PLAY_BILLING_LIBRARY_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_PLAY_BILLING_LIBRARY_protobuf",
          output: "res.body.logEvents_PLAY_BILLING_LIBRARY"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREBASE_ML_SDK_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREBASE_ML_SDK')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_FIREBASE_ML_SDK_base64",
          output: "logEvents_FIREBASE_ML_SDK_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_FIREBASE_ML_SDK_protobuf",
          output: "res.body.logEvents_FIREBASE_ML_SDK"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_CAST_SENDER_SDK_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'CAST_SENDER_SDK')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_CAST_SENDER_SDK_base64",
          output: "logEvents_CAST_SENDER_SDK_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_CAST_SENDER_SDK_protobuf",
          output: "res.body.logEvents_CAST_SENDER_SDK"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_LE_base64",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'LE')].sourceExtension"
          }
        },
        {
          function: "decodeBase64",
          mapInput: "logEvents_LE_base64",
          output: "logEvents_LE_protobuf"
        },
        {
          function: "decodeProtobuf",
          mapInput: "logEvents_LE_protobuf",
          output: "res.body.logEvents_LE"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREBASE_CRASHLYTICS_REPORT_json",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREBASE_CRASHLYTICS_REPORT')].sourceExtensionJsonProto3"
          }
        },
        {
          function: "parseJson",
          mapInput: "logEvents_FIREBASE_CRASHLYTICS_REPORT_json",
          output: "res.body.logEvents_FIREBASE_CRASHLYTICS_REPORT"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREBASE_APPQUALITY_SESSION_json",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREBASE_APPQUALITY_SESSION')].sourceExtensionJsonProto3"
          }
        },
        {
          function: "parseJson",
          mapInput: "logEvents_FIREBASE_APPQUALITY_SESSION_json",
          output: "res.body.logEvents_FIREBASE_APPQUALITY_SESSION"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "logEvents_FIREBASE_ML_LOG_SDK_json",
          options: {
            path: "$.logRequest.*.logEvent[?(@parent.logSourceName === 'FIREBASE_ML_LOG_SDK')].sourceExtensionJsonProto3"
          }
        },
        {
          function: "parseJson",
          mapInput: "logEvents_FIREBASE_ML_LOG_SDK_json",
          output: "res.body.logEvents_FIREBASE_ML_LOG_SDK"
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)({
        osName: {
          context: "body",
          path: "logRequest.*.clientInfo.clientType",
          reasoning: "obvious observed values"
        },
        osVersion: [
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.sdkVersion",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L101-L102")
          },
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.osBuild",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L120-L121")
          }
        ],
        model: [
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.model",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L104-L106")
          },
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.device",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L108-L110")
          },
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.hardware",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L116-L118")
          },
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.product",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L108-L110")
          },
          {
            context: "body",
            path: "logRequest.*.clientInfo.androidClientInfo.fingerprint",
            reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L158-L160")
          }
        ],
        manufacturer: {
          context: "body",
          path: "logRequest.*.clientInfo.androidClientInfo.manufacturer",
          reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L138-L140")
        },
        appVersion: {
          context: "body",
          path: "logRequest.*.clientInfo.androidClientInfo.applicationBuild",
          reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L123-L125")
        },
        carrier: {
          context: "body",
          path: "logRequest.*.clientInfo.androidClientInfo.mccMnc",
          reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L127-L129")
        },
        language: {
          context: "body",
          path: "logRequest.*.clientInfo.androidClientInfo.locale",
          reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L131-L133")
        },
        country: {
          context: "body",
          path: "logRequest.*.clientInfo.androidClientInfo.country",
          reasoning: $f37ff153785f33ea$var$cctAndroidUrl("L135-L136")
        },
        networkConnectionType: [
          {
            context: "body",
            path: "logRequest.*.logEvent.*.networkConnectionInfo.networkType",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "logRequest.*.logEvent.*.networkConnectionInfo.mobileSubtype",
            reasoning: "obvious property name"
          }
        ],
        timezone: {
          context: "body",
          path: "logRequest.*.logEvent.*.timezoneOffsetSeconds",
          reasoning: "obvious property name"
        }
      }, $f37ff153785f33ea$var$containedDataPathsFireperf, $f37ff153785f33ea$var$containedDataPathsGdtClientMetrics, $f37ff153785f33ea$var$containedDataPathsInAppMessaging, $f37ff153785f33ea$var$containedDataPathsCrashlyticsReport, $f37ff153785f33ea$var$containedDataPathsAppQualityAndroid, $f37ff153785f33ea$var$containedDataPathsPlayBilling, $f37ff153785f33ea$var$containedDataPathsMlLogsAndroid, $f37ff153785f33ea$var$containedDataPathsMlSdk, $f37ff153785f33ea$var$containedDataPathsCastSender, $f37ff153785f33ea$var$containedDataPathsLocationEngine)
    },
    {
      slug: "googledatatransport-firelog-batchlog-protobuf",
      name: "GoogleDataTransport (FireLog BatchedLogRequest, Protobuf)",
      description: "googledatatransport-batchlog",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://firebaselogging-pa.googleapis.com/v1/firelog/legacy/batchlog",
        "https://crashlyticsreports-pa.googleapis.com/v1/firelog/legacy/batchlog",
        "https://firebaselogging.googleapis.com/v0cc/log/batch"
      ],
      match: (r) => !r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "decodeProtobuf",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "res.body.logEvents_FIREPERF",
          options: {
            path: "$.1[?(@[2] === 462)].3.*.6"
          }
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "res.body.logEvents_GDT_CLIENT_METRICS",
          options: {
            path: "$.1[?(@[2] === 1710)].3.6"
          }
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "res.body.logEvents_FIREBASE_APPQUALITY_SESSION",
          options: {
            path: "$.1[?(@[2] === 1974)].3.6"
          }
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "res.body.logEvents_FIREBASE_COREDIAGNOSTICS",
          options: {
            path: "$.1[?(@[2] === 137)].3.6"
          }
        },
        {
          function: "getProperty",
          input: "res.body",
          output: "res.body.logEvents_FIREBASE_ML_LOG_SDK",
          options: {
            path: "$.1[?(@[2] === 1326)].3.*.6"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)({
        osName: {
          context: "body",
          path: "1.1.1.1",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L139-L143")
        },
        osVersion: [
          {
            context: "body",
            path: "1.1.4.3",
            reasoning: $f37ff153785f33ea$var$cctIosUrl("L108-L109")
          },
          {
            context: "body",
            path: "1.1.4.4",
            reasoning: $f37ff153785f33ea$var$cctIosUrl("L111-L112")
          }
        ],
        appVersion: {
          context: "body",
          path: "1.1.4.5",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L114-L116")
        },
        country: {
          context: "body",
          path: "1.1.4.6",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L118-L121")
        },
        model: {
          context: "body",
          path: "1.1.4.7",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L123-L125")
        },
        language: {
          context: "body",
          path: "1.1.4.8",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L127-L131")
        },
        appId: {
          context: "body",
          path: "1.1.4.11",
          reasoning: $f37ff153785f33ea$var$cctIosUrl("L133-L134")
        }
      }, $f37ff153785f33ea$var$containedDataPathsFireperf, $f37ff153785f33ea$var$containedDataPathsGdtClientMetrics, $f37ff153785f33ea$var$containedDataPathsAppQualityIos, $f37ff153785f33ea$var$containedDataPathsFirebaseCoreDiagnostics, $f37ff153785f33ea$var$containedDataPathsMlLogsIos)
    },
    {
      slug: "firebaseinstallations",
      name: "Firebase Installations SDK",
      description: "firebaseinstallations",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        /^https:\/\/firebaseinstallations\.googleapis\.com\/v1\/projects\/.+\/installations$/
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        // The `x-firebase-client` header can be plain text or encoded.
        {
          function: "decodeBase64",
          input: "res.header.x-firebase-client",
          output: "res.header.x-firebase-client-encoded"
        },
        {
          function: "gunzip",
          input: "res.header.x-firebase-client-encoded",
          output: "res.header.x-firebase-client-encoded"
        },
        {
          function: "parseJson",
          input: "res.header.x-firebase-client-encoded",
          output: "res.header.x-firebase-client-decoded"
        },
        // The `x-firebase-client` header contains space-separated fields (e.g. `device-model/generic_x86_64_arm64
        // fire-fcm/23.0.5 android-installer/ device-name/sdk_gphone_x86_64_arm64`).
        {
          function: "split",
          input: "res.header.x-firebase-client",
          output: "res.header.x-firebase-client-fields",
          options: {
            separator: " "
          }
        },
        {
          function: "split",
          mapInput: "res.header.x-firebase-client-decoded.heartbeats.*.agent",
          output: "res.header.x-firebase-client-decoded-fields",
          options: {
            separator: " "
          }
        }
      ],
      containedDataPaths: {
        installationId: {
          context: "body",
          path: "fid",
          reasoning: "https://firebase.google.com/docs/projects/manage-installations"
        },
        trackerSdkVersion: [
          {
            context: "body",
            path: "sdkVersion",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "x-firebase-client",
            onlyIf: /\//,
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "x-firebase-client-decoded.heartbeats.*.agent",
            reasoning: "obvious property name"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Android-Package",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "x-ios-bundle-identifier",
            reasoning: "obvious property name"
          }
        ],
        manufacturer: [
          {
            context: "header",
            path: "$.x-firebase-client-fields[?(@.startsWith('device-brand/'))]",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "$.x-firebase-client-decoded-fields.*[?(@.startsWith('device-brand/'))]",
            reasoning: "obvious property name"
          }
        ],
        model: [
          {
            context: "header",
            path: "$.x-firebase-client-fields[?(@.startsWith('device-model/'))]",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "$.x-firebase-client-fields[?(@.startsWith('device/'))]",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "$.x-firebase-client-decoded-fields.*[?(@.startsWith('device-model/'))]",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "$.x-firebase-client-decoded-fields.*[?(@.startsWith('device/'))]",
            reasoning: "obvious property name"
          }
        ],
        deviceName: [
          {
            context: "header",
            path: "$.x-firebase-client-fields[?(@.startsWith('device-name/'))]",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "$.x-firebase-client-decoded-fields.*[?(@.startsWith('device-name/'))]",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      slug: "identitytoolkit-relyingparty-getaccountinfo-json",
      name: "Identity Toolkit API v3 (getAccountInfo, JSON)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo"
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeJwt",
          input: "res.body.idToken",
          output: "res.body.idToken"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders,
        userId: [
          {
            context: "body",
            path: "idToken.user_id",
            reasoning: "google/idToken.md"
          },
          {
            context: "body",
            path: "idToken.firebase.identities.email.*",
            reasoning: "google/idToken.md"
          },
          {
            context: "body",
            path: "idToken.email",
            reasoning: "google/idToken.md"
          }
        ]
      }
    },
    {
      slug: "identitytoolkit-relyingparty-getaccountinfo-protobuf",
      name: "Identity Toolkit API v3 (getAccountInfo, Protobuf)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo"
      ],
      match: (r) => !r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "decodeProtobuf",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeJwt",
          input: "res.body.1",
          output: "res.body.idToken"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders,
        userId: {
          context: "body",
          path: "idToken.user_id",
          reasoning: "google/idToken.md"
        }
      }
    },
    {
      slug: "identitytoolkit-relyingparty-verifycustomtoken",
      name: "Identity Toolkit API v3 (verifyCustomToken)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeJwt",
          input: "res.body.token",
          output: "res.body.token"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders,
        userId: {
          context: "body",
          path: "token.uid",
          reasoning: "google/idToken.md"
        }
      }
    },
    {
      slug: "identitytoolkit-relyingparty-signupnewuser",
      name: "Identity Toolkit API v3 (signupNewUser)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        ...$f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders,
        userId: {
          context: "body",
          path: "email",
          reasoning: "https://developers.google.com/resources/api-libraries/documentation/identitytoolkit/v3/csharp/latest/classGoogle_1_1Apis_1_1IdentityToolkit_1_1v3_1_1Data_1_1IdentitytoolkitRelyingpartySignupNewUserRequest.html#a0a6e4c4c92b9ff59c34877f4d6c5e964"
        },
        osName: {
          context: "body",
          path: "clientType",
          reasoning: "obvious observed values"
        }
      }
    },
    {
      slug: "identitytoolkit-relyingparty-getprojectconfig",
      name: "Identity Toolkit API v3 (getProjectConfig)",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/getProjectConfig"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $f37ff153785f33ea$var$containedDataPathsIdentityToolkitHeaders
    },
    {
      slug: "firebaseremoteconfig",
      name: "Firebase Remote Config",
      description: "firebaseremoteconfig",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        /^https:\/\/firebaseremoteconfig\.googleapis\.com\/v1\/projects\/.+\/namespaces\/firebase:fetch$/
      ],
      match: (r) => r.content?.startsWith('{"'),
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        appVersion: {
          context: "body",
          path: "appVersion",
          reasoning: "obvious property name"
        },
        country: [
          {
            context: "body",
            path: "countryCode",
            reasoning: "obvious property name"
          }
        ],
        language: [
          {
            context: "body",
            path: "analyticsUserProperties.language",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "languageCode",
            reasoning: "obvious property name"
          }
        ],
        installTime: [
          {
            context: "body",
            path: "analyticsUserProperties.FirstAppStartTimestamp",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "firstOpenTime",
            reasoning: "obvious property name"
          }
        ],
        screenHeight: {
          context: "body",
          path: "analyticsUserProperties.Screensize",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "analyticsUserProperties.Screensize",
          reasoning: "obvious property name"
        },
        appId: [
          {
            context: "body",
            path: "analyticsUserProperties.PackageName",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "X-Android-Package",
            reasoning: "obvious property name"
          }
        ],
        networkConnectionType: [
          {
            context: "body",
            path: "analyticsUserProperties.network_type_name",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "analyticsUserProperties.network_type",
            reasoning: "obvious property name"
          }
        ],
        deviceId: [
          {
            context: "body",
            path: "analyticsUserProperties.deviceId",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "analyticsUserProperties.device_id",
            reasoning: "obvious property name"
          }
        ],
        otherIdentifiers: {
          context: "body",
          path: "analyticsUserProperties.uuid",
          reasoning: "obvious property name"
        },
        installationId: [
          {
            context: "body",
            path: "appInstanceIdToken",
            reasoning: "google/appInstanceIdToken.md"
          },
          {
            context: "header",
            path: "X-Goog-Firebase-Installations-Auth",
            reasoning: "google/appInstanceIdToken.md"
          }
        ],
        osVersion: [
          {
            context: "body",
            path: "analyticsUserProperties.android_sdk",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "platformVersion",
            reasoning: "obvious property name"
          }
        ],
        timezone: {
          context: "body",
          path: "timeZone",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "sdkVersion",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "googletagmanager-gtag",
      // See: https://developers.google.com/tag-platform/gtagjs
      name: "Google tag (gtag.js)",
      description: "google-gtag",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googletagmanager.com/gtag/js",
        "https://www.googletagmanager.com/gtag/destination"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "id",
          onlyIf: /^[a-z]{1,3}-[a-z0-9-]{5,}$/i,
          reasoning: "https://support.google.com/tagmanager/answer/12326985"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      slug: "googletagmanager-gtm",
      name: "Google Tag Manager (gtm.js)",
      description: "googletagmanager-gtm",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://www.googletagmanager.com/gtm.js",
        "https://www.google-analytics.com/gtm/js",
        "https://www.googletagmanager.com/gtm/ios",
        "https://www.google-analytics.com/gtm/android"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "id",
          onlyIf: /^[a-z]{1,3}-[a-z0-9-]{5,}$/i,
          reasoning: "https://support.google.com/tagmanager/answer/12326985"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      // This adapter is mixing GA4 and UA (and various other GA endpoints?) since they use very similar data formats.
      slug: "google-analytics",
      name: "Google Analytics",
      description: "google-analytics",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://region1.google-analytics.com/g/collect",
        "https://region1.analytics.google.com/g/collect",
        "https://region1.analytics.google.com/g/s/collect",
        "https://www.google-analytics.com/j/collect",
        "https://www.google-analytics.com/g/collect",
        "https://www.google-analytics.com/collect",
        "https://analytics.google.com/g/s/collect",
        "https://ssl.google-analytics.com/collect",
        "https://www.google.com/ccm/collect",
        "https://region1.google-analytics.com/privacy-sandbox/register-conversion",
        "https://ssl.google-analytics.com/batch",
        /^https:\/\/www\.google\..+\/ads\/ga-audiences$/,
        "https://www.google-analytics.com/analytics.js",
        "https://ssl.google-analytics.com/ga.js",
        "https://www.google-analytics.com/plugins/ua/ec.js",
        "https://www.google-analytics.com/plugins/ua/linkid.js",
        "https://www.google-analytics.com/plugins/ua/ecommerce.js",
        "https://www.google-analytics.com/ga.js",
        "https://www.google-analytics.com/urchin.js",
        "http://www.google-analytics.com/urchin.js",
        "http://www.google-analytics.com/ga.js",
        "http://www.google-analytics.com/analytics.js",
        // GA can also collect through DoubleClick endpoints, cf.: https://news.ycombinator.com/item?id=33733239 and
        // https://www.namehero.com/blog/how-to-disable-doubleclick-in-google-analytics/
        "https://stats.g.doubleclick.net/g/collect",
        "https://stats.g.doubleclick.net/j/collect",
        "https://stats.g.doubleclick.net/r/collect"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: [
          {
            context: "query",
            path: "tid",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tid"
          },
          {
            context: "body",
            path: "tid",
            notIf: "__GTM_DEFAULT_TRACKER__",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tid"
          }
        ],
        consentState: [
          {
            context: "query",
            path: "gcs",
            reasoning: "https://www.simoahava.com/analytics/consent-mode-v2-google-tags/#how-do-i-check-if-consent-mode-is-active"
          },
          {
            context: "body",
            path: "gcs",
            reasoning: "https://www.simoahava.com/analytics/consent-mode-v2-google-tags/#how-do-i-check-if-consent-mode-is-active"
          },
          {
            context: "query",
            path: "gcd",
            reasoning: "https://www.simoahava.com/analytics/consent-mode-v2-google-tags/#consent-mode-v2-signals"
          },
          {
            context: "body",
            path: "gcd",
            reasoning: "https://www.simoahava.com/analytics/consent-mode-v2-google-tags/#consent-mode-v2-signals"
          },
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          }
        ],
        language: [
          {
            context: "query",
            path: "ul",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul"
          },
          {
            context: "body",
            path: "ul",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ul"
          }
        ],
        screenHeight: [
          {
            context: "query",
            path: "sr",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr"
          },
          {
            context: "query",
            path: "vp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#vp"
          },
          {
            context: "body",
            path: "sr",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr"
          },
          {
            context: "body",
            path: "vp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#vp"
          }
        ],
        screenWidth: [
          {
            context: "query",
            path: "sr",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr"
          },
          {
            context: "query",
            path: "vp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#vp"
          },
          {
            context: "body",
            path: "sr",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sr"
          },
          {
            context: "body",
            path: "vp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#vp"
          }
        ],
        browserId: [
          {
            context: "query",
            path: "cid",
            reasoning: "https://louder.com.au/2022/06/27/client-id-in-ga4-what-is-it-and-how-to-get-it-in-your-report/"
          },
          {
            context: "body",
            path: "cid",
            reasoning: "https://louder.com.au/2022/06/27/client-id-in-ga4-what-is-it-and-how-to-get-it-in-your-report/"
          }
        ],
        viewedPage: [
          {
            context: "query",
            path: "dl",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dl"
          },
          {
            context: "query",
            path: "dt",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dt"
          },
          {
            context: "body",
            path: "dl",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dl"
          },
          {
            context: "body",
            path: "dt",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dt"
          },
          {
            context: "query",
            path: "dp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dp"
          },
          {
            context: "body",
            path: "dp",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#dp"
          }
        ],
        sessionId: {
          context: "query",
          path: "sid",
          reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
        },
        sessionCount: {
          context: "query",
          path: "sct",
          reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
        },
        isUserActive: [
          {
            context: "query",
            path: "seg",
            reasoning: "https://www.optimizesmart.com/what-is-measurement-protocol-in-google-analytics-4-ga4/#37-19-session-engaged"
          },
          {
            context: "body",
            path: "seg",
            reasoning: "https://www.optimizesmart.com/what-is-measurement-protocol-in-google-analytics-4-ga4/#37-19-session-engaged"
          }
        ],
        isUserInactive: [
          {
            context: "query",
            path: "ni",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ni"
          },
          {
            context: "body",
            path: "ni",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ni"
          }
        ],
        architecture: [
          {
            context: "query",
            path: "uaa",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          },
          {
            context: "header",
            path: "sec-ch-ua-arch",
            reasoning: "obvious property name"
          }
        ],
        model: [
          {
            context: "query",
            path: "uam",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          },
          {
            context: "header",
            path: "sec-ch-ua-model",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "dm",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "dm",
            reasoning: "obvious observed values"
          }
        ],
        osName: [
          {
            context: "query",
            path: "uap",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          },
          {
            context: "header",
            path: "sec-ch-ua-platform",
            reasoning: "obvious property name"
          }
        ],
        osVersion: [
          {
            context: "query",
            path: "uapv",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          },
          {
            context: "header",
            path: "sec-ch-ua-platform-version",
            reasoning: "obvious property name"
          }
        ],
        installationId: {
          context: "query",
          path: "_fid",
          reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet-beta/?p=_fid"
        },
        userId: [
          {
            context: "query",
            path: "uid",
            notIf: /nologin|0|(\r\n)|anonymous|(Without Profile)|(not set)|hashedId|--|na|notloggedin/i,
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#uid"
          },
          {
            context: "body",
            path: "uid",
            notIf: /nologin|0|(\r\n)|anonymous|(Without Profile)|(not set)|hashedId|--|na|notloggedin/i,
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#uid"
          },
          {
            context: "query",
            path: "_utma",
            reasoning: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?csw=1#gajs_-_cookie_usage"
          },
          {
            context: "query",
            path: "_gid",
            reasoning: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?csw=1#gtagjs_and_analyticsjs_universal_analytics_-_cookie_usage"
          },
          {
            context: "body",
            path: "_gid",
            reasoning: "https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage?csw=1#gtagjs_and_analyticsjs_universal_analytics_-_cookie_usage"
          }
        ],
        currency: [
          {
            context: "query",
            path: "cu",
            notIf: /not found/i,
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cu"
          },
          {
            context: "body",
            path: "cu",
            notIf: /not found/i,
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cu"
          }
        ],
        appId: [
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "aid",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aid"
          },
          {
            context: "body",
            path: "aid",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#aid"
          },
          {
            context: "body",
            path: "msid",
            reasoning: "https://support.google.com/admanager/answer/10678356#msid-an"
          }
        ],
        appName: [
          {
            context: "query",
            path: "an",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#an"
          },
          {
            context: "body",
            path: "an",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#an"
          }
        ],
        appVersion: [
          {
            context: "query",
            path: "av",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#av"
          },
          {
            context: "body",
            path: "av",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#av"
          }
        ],
        campaignSource: [
          {
            context: "query",
            path: "cs",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cs"
          },
          {
            context: "body",
            path: "cs",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cs"
          }
        ],
        campaignMedium: {
          context: "query",
          path: "cm",
          reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cm"
        },
        campaignName: [
          {
            context: "query",
            path: "cn",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#cn"
          },
          {
            context: "query",
            path: "ci",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ci"
          },
          {
            context: "query",
            path: "$[?(@property.match(/^promo\\d+id$/))]",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "$[?(@property.match(/^promo\\d+nm$/))]",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "$[?(@property.match(/^promo\\d+id$/))]",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "$[?(@property.match(/^promo\\d+nm$/))]",
            reasoning: "obvious property name"
          }
        ],
        campaignCreative: [
          {
            context: "query",
            path: "$[?(@property.match(/^promo\\d+cr$/))]",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "$[?(@property.match(/^promo\\d+cr$/))]",
            reasoning: "obvious property name"
          }
        ],
        campaignCreativePosition: [
          {
            context: "query",
            path: "$[?(@property.match(/^promo\\d+ps$/))]",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "$[?(@property.match(/^promo\\d+ps$/))]",
            reasoning: "obvious property name"
          }
        ],
        campaignTerm: {
          context: "query",
          path: "ck",
          reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ck"
        },
        isFirstLaunch: {
          context: "body",
          path: "_fv",
          reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet-beta/?p=_fv"
        },
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "dr",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          },
          {
            context: "body",
            path: "dr",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          }
        ],
        userAgent: [
          {
            context: "header",
            path: "user-agent",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "User-Agent",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "sec-ch-ua-full-version-list",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "ua",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ua"
          },
          {
            context: "body",
            path: "ua",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ua"
          },
          {
            context: "query",
            path: "uafvl",
            reasoning: "https://www.thyngster.com/ga4-measurement-protocol-cheatsheet/"
          }
        ],
        screenColorDepth: [
          {
            context: "query",
            path: "sd",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sd"
          },
          {
            context: "body",
            path: "sd",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#sd"
          }
        ],
        userAction: [
          {
            context: "query",
            path: "pa",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#pa"
          },
          {
            context: "body",
            path: "pa",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#pa"
          },
          {
            context: "query",
            path: "ea",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ea"
          },
          {
            context: "body",
            path: "ea",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#ea"
          }
        ],
        userActionSource: [
          {
            context: "query",
            path: "pal",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#pal"
          },
          {
            context: "body",
            path: "pal",
            reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#pal"
          }
        ],
        advertisingId: [
          {
            context: "query",
            path: "idfa",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "idfa",
            reasoning: "obvious property name"
          }
        ],
        interactedElement: {
          context: "query",
          path: "linkid",
          reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#linkid"
        },
        revenue: {
          context: "query",
          path: "tr",
          reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#tr"
        },
        trackerSdkVersion: [
          {
            context: "query",
            path: "_v",
            reasoning: "https://cheatography.com/dmpg-tom/cheat-sheets/google-universal-analytics-url-collect-parameters/"
          },
          {
            context: "body",
            path: "_v",
            reasoning: "https://cheatography.com/dmpg-tom/cheat-sheets/google-universal-analytics-url-collect-parameters/"
          }
        ],
        otherIdentifiers: {
          context: "query",
          path: "_gsid",
          // https://docs.gamesight.io/reference/web-sdk-set suggests it's a session ID but I'm not sure whether
          // we can trust this as a source and I haven't found any others.
          reasoning: "obvious observed values"
        },
        errorInformation: {
          context: "query",
          path: "exd",
          reasoning: "https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#exd"
        },
        isConversion: {
          context: "query",
          path: "_c",
          reasoning: "https://www.simoahava.com/analytics/transformations-server-side-google-tag-manager/#use-case-1-flag-custom-events-as-conversions-for-ga4"
        },
        userActiveTime: {
          context: "query",
          path: "_et",
          reasoning: "https://www.optimizesmart.com/what-is-measurement-protocol-in-google-analytics-4-ga4/#42-24-engagement-time"
        }
      }
    },
    {
      slug: "google-publisher-tag",
      // See: https://developers.google.com/publisher-tag/guides/get-started
      name: "Google Publisher Tag (GPT)",
      description: "google-publisher-tag",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://securepubads.g.doubleclick.net/tag/js/gpt.js",
        "https://www.googletagservices.com/tag/js/gpt.js",
        // cf.: https://developers.google.com/publisher-tag/common_implementation_mistakes#common-mistakes
        /https:\/\/securepubads\.g\.doubleclick\.net\/pagead\/managed\/js\/gpt\/.+\/pubads_impl\.js/,
        /https:\/\/securepubads\.g\.doubleclick\.net\/pagead\/managed\/js\/gpt\/.+\/pubads_impl_page_level_ads\.js/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "network-code",
          reasoning: "https://support.google.com/admanager/answer/7674889"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ],
        otherIdentifiers: {
          context: "cookie",
          path: "IDE",
          reasoning: "google/IDE.md"
        }
      }
    },
    {
      slug: "doubleclick-cookie-matching-pixel",
      name: "DoubleClick Pixel for Cookie Matching",
      description: "doubleclick-cookie-matching-pixel",
      tracker: $f37ff153785f33ea$var$tracker,
      endpointUrls: [
        "https://cm.g.doubleclick.net/pixel"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "google_nid",
          reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#match-tag-url-parameters"
        },
        userId: [
          {
            context: "query",
            path: "google_hm",
            notIf: "MA==",
            reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#storing-a-match-in-a-google-hosted-match-table"
          },
          {
            context: "query",
            path: "google_gid",
            reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#redirect-url-parameters"
          },
          {
            context: "query",
            path: "CriteoUserId",
            reasoning: "obvious property name"
          }
        ],
        consentState: {
          context: "query",
          path: "gdpr_consent",
          notIf: /\$/,
          reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#match-tag-url-parameters"
        },
        segment: {
          context: "query",
          path: "google_ula",
          notIf: /{/,
          reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#add-to-single-user-list"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ],
        otherIdentifiers: {
          context: "cookie",
          path: "IDE",
          reasoning: "google/IDE.md"
        }
      }
    }
  ];
  var $e0f6d422a5acf59d$var$tracker = {
    slug: "id5",
    name: "ID5 Technology Ltd.",
    description: "id5",
    datenanfragenSlug: "id5"
  };
  var $e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths = {
    userId: {
      context: "cookie",
      path: "id5",
      reasoning: "https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/README.md#id5-id"
    },
    userAgent: [
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://id5.io/platform-privacy-policy/#what-information-do-we-collect"
      },
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://id5.io/platform-privacy-policy/#what-information-do-we-collect"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://id5.io/platform-privacy-policy/#what-information-do-we-collect"
      }
    ],
    referer: [
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      }
    ]
  };
  var $e0f6d422a5acf59d$var$id5PartnerDataPaths = (prefix) => ({
    viewedPage: {
      context: "body",
      path: `${prefix}.8`,
      reasoning: "https://wiki.id5.io/identitycloud/retrieve-id5-ids/passing-partner-data-to-id5#supported-partner-data-keys"
    },
    websiteUrl: {
      context: "body",
      path: `${prefix}.9`,
      reasoning: "https://wiki.id5.io/identitycloud/retrieve-id5-ids/passing-partner-data-to-id5#supported-partner-data-keys"
    },
    publicIp: [
      {
        context: "body",
        path: `${prefix}.10`,
        reasoning: "https://wiki.id5.io/identitycloud/retrieve-id5-ids/passing-partner-data-to-id5#supported-partner-data-keys"
      },
      {
        context: "body",
        path: `${prefix}.11`,
        reasoning: "https://wiki.id5.io/identitycloud/retrieve-id5-ids/passing-partner-data-to-id5#supported-partner-data-keys"
      }
    ],
    userAgent: {
      context: "body",
      path: `${prefix}.12`,
      reasoning: "https://wiki.id5.io/identitycloud/retrieve-id5-ids/passing-partner-data-to-id5#supported-partner-data-keys"
    }
  });
  var $e0f6d422a5acf59d$export$1761c188a41008af = [
    {
      slug: "api-config-prebid",
      // See: https://wiki.id5.io/en/identitycloud/retrieve-id5-ids/prebid-user-id-module/id5-prebid-user-id-module
      name: "ID5 Prebid User ID Module",
      description: "id5-prebid-user-id",
      tracker: $e0f6d422a5acf59d$var$tracker,
      endpointUrls: [
        "https://id5-sync.com/api/config/prebid"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeBase64",
          input: "res.body.params.pd",
          output: "res.body.params.pdDecoded"
        },
        {
          function: "parseQueryString",
          input: "res.body.params.pdDecoded",
          output: "res.body.params.pdParsed"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths, $e0f6d422a5acf59d$var$id5PartnerDataPaths("params.pdParsed"), {
        propertyId: {
          context: "body",
          path: "params.partner",
          reasoning: "https://wiki.id5.io/en/identitycloud/retrieve-id5-ids/prebid-user-id-module/id5-prebid-user-id-module#configuration-parameters"
        }
      })
    },
    {
      slug: "g-v2-json",
      // This version of the endpoint was introduced in https://github.com/prebid/Prebid.js/pull/5406 and later
      // changed in https://github.com/prebid/Prebid.js/pull/8784.
      name: "ID5 Prebid User ID Module v2",
      tracker: $e0f6d422a5acf59d$var$tracker,
      endpointUrls: [
        /^https:\/\/id5-sync\.com\/g\/v2\/\d+\.json/
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeBase64",
          input: "res.body.pd",
          output: "res.body.pdDecoded"
        },
        {
          function: "parseQueryString",
          input: "res.body.pdDecoded",
          output: "res.body.pdParsed"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths, $e0f6d422a5acf59d$var$id5PartnerDataPaths("pdParsed"), {
        propertyId: {
          context: "body",
          path: "partner",
          reasoning: "https://wiki.id5.io/en/identitycloud/retrieve-id5-ids/prebid-user-id-module/id5-prebid-user-id-module#configuration-parameters"
        }
      })
    },
    {
      slug: "cookie-sync-gif",
      // See: https://wiki.id5.io/en/identitycloud/cookie-sync-with-id5/inititiate-cookie-sync-to-id5
      name: "ID5 Cookie Sync Pixel",
      description: "id5-cookie-sync",
      tracker: $e0f6d422a5acf59d$var$tracker,
      endpointUrls: [
        /^https:\/\/id5-sync\.com\/s\/\d+\/\d+\.gif/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths, {
        userId: {
          context: "query",
          path: "puid",
          reasoning: "https://wiki.id5.io/en/identitycloud/cookie-sync-with-id5/inititiate-cookie-sync-to-id5#id5-cookie-sync-pixel-url-with-a-user-id"
        },
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://wiki.id5.io/en/identitycloud/cookie-sync-with-id5/inititiate-cookie-sync-to-id5#id5-cookie-sync-pixel-url-with-a-user-id"
        }
      })
    },
    {
      slug: "gm-v3",
      // See: https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L9
      name: "ID5 multi fetch v3",
      tracker: $e0f6d422a5acf59d$var$tracker,
      endpointUrls: [
        "https://id5-sync.com/gm/v3"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "decodeBase64",
          mapInput: "res.body.requests.*.pd",
          output: "res.body.pdDecoded"
        },
        {
          function: "parseQueryString",
          mapInput: "res.body.pdDecoded",
          output: "res.body.pdParsed"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths, $e0f6d422a5acf59d$var$id5PartnerDataPaths("pdParsed.*"), {
        propertyId: {
          context: "body",
          path: "requests.*.partner",
          reasoning: "https://wiki.id5.io/en/identitycloud/retrieve-id5-ids/prebid-user-id-module/id5-prebid-user-id-module#configuration-parameters"
        },
        viewedPage: [
          {
            context: "body",
            path: "requests.*.tml",
            // Stands for "topmost location", see: https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L180
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            // https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L182
            path: "requests.*.cu",
            reasoning: "obvious observed values"
          }
        ],
        referer: {
          context: "body",
          // https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L181
          path: "requests.*.ref",
          reasoning: "obvious property name"
        },
        userAgent: [
          {
            context: "body",
            // https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L188
            path: "requests.*.ua",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "requests.*.ua_hints",
            reasoning: "obvious property name"
          }
        ],
        consentState: {
          context: "body",
          // https://github.com/id5io/id5-api.js/blob/874ace5d11a667b992650df198d53775fdb60709/packages/multiplexing/src/fetch.js#L197
          path: "requests.*.gdpr_consent",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "bounce",
      // See: https://wiki.id5.io/en/identitycloud/cookie-sync-with-id5/inititiate-cookie-sync-to-id5
      name: "ID5 bounce",
      tracker: $e0f6d422a5acf59d$var$tracker,
      endpointUrls: [
        "https://id5-sync.com/bounce"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $e0f6d422a5acf59d$var$id5CommonCookieAndHeaderPaths
    }
  ];
  var $ababe693f6cd03f6$var$tracker = {
    slug: "indexexchange",
    // See: https://mediaincanada.com/2015/01/28/casale-media-rebrands-as-index-exchange/
    name: "Index Exchange (formerly Casale Media)",
    datenanfragenSlug: "indexexchange"
  };
  var $ababe693f6cd03f6$var$indexexchangeCommonHeaderAndCookiePaths = {
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://www.indexexchange.com/privacy/exchange-platform-privacy-policy/#section-2"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://www.indexexchange.com/privacy/exchange-platform-privacy-policy/#section-2"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://www.indexexchange.com/privacy/exchange-platform-privacy-policy/#section-2"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ],
    browserId: {
      context: "cookie",
      path: "CMID",
      reasoning: "https://www.indexexchange.com/privacy/index-exchange-platform-cookie-notice/"
    }
  };
  var $ababe693f6cd03f6$export$1761c188a41008af = [
    {
      slug: "htlb-openrtb-pbjs",
      name: "Casale Media Prebid.js OpenRTB integration",
      tracker: $ababe693f6cd03f6$var$tracker,
      endpointUrls: [
        "https://htlb.casalemedia.com/openrtb/pbjs"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $ababe693f6cd03f6$var$indexexchangeCommonHeaderAndCookiePaths)
    },
    {
      slug: "ssum-usermatch",
      // See: https://docs.prebid.org/dev-docs/bidders/ix-server.html#hosting-instance
      name: "Casale Media User Sync (ssum/usermatch)",
      tracker: $ababe693f6cd03f6$var$tracker,
      endpointUrls: [
        "https://ssum-sec.casalemedia.com/usermatchredir",
        "https://ssum-sec.casalemedia.com/usermatch",
        "https://ssum.casalemedia.com/usermatchredir",
        "https://ssum.casalemedia.com/usermatch"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseQueryString",
          input: "res.query.cb",
          output: "res.query.cb_parsed"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($ababe693f6cd03f6$var$indexexchangeCommonHeaderAndCookiePaths, {
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        },
        propertyId: {
          context: "query",
          path: "s",
          reasoning: "https://docs.prebid.org/dev-docs/bidders/ix-server.html#hosting-instance"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "gpp",
            notIf: "DBAA",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "cb_parsed.gdpr_consent",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "cb_parsed.gpp",
            onlyIf: /^DBAB/,
            reasoning: "obvious observed values"
          }
        ],
        userId: [
          {
            context: "query",
            path: "google_gid",
            reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#step-2:-google-responds-with-redirect-including-match-data"
          },
          {
            context: "query",
            path: "cb_parsed.obUid",
            reasoning: "https://www.outbrain.com/privacy/cookies/"
          }
        ]
      })
    },
    {
      slug: "dsum-rum",
      name: "Casale Media (dsum/rum)",
      tracker: $ababe693f6cd03f6$var$tracker,
      endpointUrls: [
        "https://dsum-sec.casalemedia.com/rum",
        "https://dsum-sec.casalemedia.com/crum",
        "https://r.casalemedia.com/rum",
        "https://dsum.casalemedia.com/rum"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($ababe693f6cd03f6$var$indexexchangeCommonHeaderAndCookiePaths, {
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "gpp",
            notIf: "DBAA",
            reasoning: "obvious observed values"
          }
        ],
        userId: [
          {
            context: "query",
            path: "external_user_id",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "user_id",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "userId",
            reasoning: "obvious property name"
          }
        ]
      })
    }
  ];
  var $68ab345339af28b0$var$tracker = {
    slug: "infonline",
    name: "INFOnline GmbH",
    description: "infonline",
    datenanfragenSlug: "infonline-de",
    exodusId: 197
  };
  var $68ab345339af28b0$var$ioamJsonDataPaths = ({ context, prefix, hasEvents }) => ({
    appId: [
      {
        context,
        path: prefix + "application.package",
        reasoning: "obvious observed values"
      },
      {
        context,
        path: prefix + "application.bundleIdentifier",
        reasoning: "obvious property name"
      }
    ],
    appVersion: [
      {
        context,
        path: prefix + "application.versionName",
        reasoning: "obvious property name"
      },
      {
        context,
        path: prefix + "application.versionCode",
        reasoning: "obvious property name"
      },
      {
        context,
        path: prefix + "application.bundleVersion",
        reasoning: "obvious property name"
      }
    ],
    trackerSdkVersion: {
      context,
      path: prefix + "library.libVersion",
      reasoning: "obvious property name"
    },
    hashedAdvertisingId: {
      context,
      path: prefix + "client.uuids.advertisingIdentifier",
      reasoning: "infonline/client.uuids.advertisingIdentifier.md"
    },
    model: {
      context,
      path: prefix + "client.platform",
      reasoning: "obvious observed values"
    },
    osName: {
      context,
      path: prefix + "client.osIdentifier",
      reasoning: "obvious property name"
    },
    osVersion: {
      context,
      path: prefix + "client.osVersion",
      reasoning: "obvious property name"
    },
    language: {
      context,
      path: prefix + "client.language",
      reasoning: "obvious property name"
    },
    carrier: {
      context,
      path: prefix + "client.carrier",
      reasoning: "obvious property name"
    },
    screenWidth: {
      context,
      path: prefix + "client.screen.resolution",
      reasoning: "obvious property name"
    },
    screenHeight: {
      context,
      path: prefix + "client.screen.resolution",
      reasoning: "obvious property name"
    },
    country: {
      context,
      path: prefix + "client.country",
      reasoning: "obvious property name"
    },
    ...hasEvents && {
      startTime: {
        context,
        path: `$.${prefix}.events[?(@.identifier == 'application' && @.state == 'start')].timestamp`,
        reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
      },
      isInForeground: [
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'application' && @.state == 'enterForeground')].state`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        },
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'application' && @.state == 'enterBackground')].state`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        },
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'application' && @.state == 'becomeActive')].state`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        },
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'application' && @.state == 'resignActive')].state`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        }
      ],
      viewedPage: [
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'view' && @.state == 'appeared')].category`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        },
        {
          context,
          path: `$.${prefix}.events[?(@.identifier == 'view' && @.state == 'refreshed')].category`,
          reasoning: "https://docs.infonline.de/infonline-measurement/en/integration/lib/iOS/Vorgaben_zum_Aufruf/#events"
        }
      ]
    }
  });
  var $68ab345339af28b0$var$ioamTxQueryDataPaths = {
    viewedPage: {
      context: "query",
      path: "cp",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    country: {
      context: "query",
      path: "lo",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    state: {
      context: "query",
      path: "lo",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    referer: [
      {
        context: "query",
        path: "r2",
        reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
      },
      {
        context: "query",
        path: "rf",
        reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
      },
      {
        context: "query",
        path: "ur",
        reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
      }
    ],
    trackerSdkVersion: {
      context: "query",
      path: "vr",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    screenHeight: {
      context: "query",
      path: "xy",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    screenWidth: {
      context: "query",
      path: "xy",
      reasoning: "https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/"
    },
    deviceId: {
      context: "cookie",
      path: "i00",
      reasoning: "infonline/i00.md"
    }
  };
  var $68ab345339af28b0$export$1761c188a41008af = [
    {
      slug: "ioam",
      name: "INFOnline Measurement",
      tracker: $68ab345339af28b0$var$tracker,
      endpointUrls: [
        "https://config.ioam.de/appcfg.php"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: $68ab345339af28b0$var$ioamJsonDataPaths({
        context: "body",
        prefix: "",
        hasEvents: false
      })
    },
    {
      slug: "ioam-tx-query",
      // See: https://www.infonline.de/publisher/
      name: "INFOnline Measurement pseudonymous (query string)",
      description: "infonline-pseudonymous",
      tracker: $68ab345339af28b0$var$tracker,
      endpointUrls: [
        "https://de.ioam.de/tx.io",
        "https://at.iocnt.net/tx.io"
      ],
      match: (r) => r.path.includes("?"),
      decodingSteps: [
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.i00",
          options: {
            path: "i00"
          }
        },
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseJson",
          input: "res.query.mi",
          output: "res.query.mi"
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)(
        $68ab345339af28b0$var$ioamTxQueryDataPaths,
        // `mi` is the same JSON as in the other adapters, see:
        // https://docs.infonline.de/infonline-measurement/en/services/logfilebereitstellung/
        $68ab345339af28b0$var$ioamJsonDataPaths({
          context: "query",
          prefix: "mi.",
          hasEvents: false
        })
      )
    },
    {
      slug: "ioam-tx-body-gzip",
      name: "INFOnline Measurement pseudonymous (GZIP body)",
      description: "infonline-pseudonymous",
      tracker: $68ab345339af28b0$var$tracker,
      endpointUrls: [
        "https://de.ioam.de/tx.io",
        "https://at.iocnt.net/tx.io"
      ],
      // `H4s` is the base64-encoded gzip header.
      match: (r) => r.content?.includes("ae=H4s"),
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "parsedBody"
        },
        {
          function: "getProperty",
          input: "parsedBody",
          output: "ae",
          options: {
            path: "ae"
          }
        },
        {
          function: "decodeBase64",
          input: "ae",
          output: "decodedAe"
        },
        {
          function: "gunzip",
          input: "decodedAe",
          output: "unzippedAe"
        },
        {
          function: "parseJson",
          input: "unzippedAe",
          output: "res.body.ae"
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.i00",
          options: {
            path: "i00"
          }
        }
      ],
      containedDataPaths: {
        ...$68ab345339af28b0$var$ioamJsonDataPaths({
          context: "body",
          prefix: "ae.",
          hasEvents: true
        }),
        deviceId: {
          context: "cookie",
          path: "i00",
          reasoning: "infonline/i00.md"
        }
      }
    },
    {
      slug: "ioam-tx-body-json",
      name: "INFOnline Measurement pseudonymous (JSON body)",
      description: "infonline-pseudonymous",
      tracker: $68ab345339af28b0$var$tracker,
      endpointUrls: [
        "https://de.ioam.de/tx.io",
        "https://at.iocnt.net/tx.io"
      ],
      // `ewo` and `ey` are base64 representations of the beginnings of JSON objects (curly brace plus whitespace).
      match: (r) => r.content?.includes("ae=ewo") || r.content?.includes("ae=ey"),
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "parsedBody"
        },
        {
          function: "getProperty",
          input: "parsedBody",
          output: "ae",
          options: {
            path: "ae"
          }
        },
        {
          function: "decodeBase64",
          input: "ae",
          output: "decodedAe"
        },
        {
          function: "parseJson",
          input: "decodedAe",
          output: "res.body.ae"
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie.i00",
          options: {
            path: "i00"
          }
        }
      ],
      containedDataPaths: {
        ...$68ab345339af28b0$var$ioamJsonDataPaths({
          context: "body",
          prefix: "ae.",
          hasEvents: true
        }),
        deviceId: {
          context: "cookie",
          path: "i00",
          reasoning: "infonline/i00.md"
        }
      }
    }
  ];
  var $2c122393a7138586$var$tracker = {
    slug: "ironsource",
    name: "ironSource Ltd.",
    exodusId: 146
  };
  var $2c122393a7138586$export$1761c188a41008af = [
    {
      slug: "logs",
      name: "ironSource logs",
      tracker: $2c122393a7138586$var$tracker,
      endpointUrls: [
        "https://logs.ironsrc.mobi/logs"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "q"
        },
        {
          function: "decodeBase64",
          input: "q.data",
          output: "j"
        },
        {
          function: "parseJson",
          input: "j",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        manufacturer: {
          context: "body",
          path: "data.deviceoem",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "data.devicemodel",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "data.deviceos",
          reasoning: "obvious property name"
        },
        osVersion: [
          {
            context: "body",
            path: "data.deviceosversion",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "data.deviceapilevel",
            reasoning: "obvious property name"
          }
        ],
        advertisingId: {
          context: "body",
          path: "data.deviceid",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "body",
          path: "data.connectiontype",
          reasoning: "obvious property name"
        },
        appId: {
          context: "body",
          path: "data.bundleid",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "body",
          path: "data.appversion",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "body",
          path: "data.sdkversion",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $115db24f4832a35d$var$tracker = {
    slug: "kidoz",
    name: "KIDOZ Ltd.",
    datenanfragenSlug: "kidoz",
    exodusId: 235
  };
  var $115db24f4832a35d$export$1761c188a41008af = [
    {
      slug: "analytics-parents-kidozrestmobile",
      name: "Kidoz (analytics/parents/KidozRestMobile.php)",
      tracker: $115db24f4832a35d$var$tracker,
      endpointUrls: [
        "https://analytics.kidoz.net/parents/KidozRestMobile.php"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.KidozEventsLogAsJson",
          output: "res.body.KidozEventsLogAsJsonParsed"
        }
      ],
      containedDataPaths: {
        deviceId: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.DeviceHash",
          reasoning: "obvious property name"
        },
        appId: [
          {
            context: "body",
            path: "KidozEventsLogAsJsonParsed.DeviceParams.PackageID",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "KidozEventsLogAsJsonParsed.DeviceParams.AppID",
            reasoning: "obvious property name"
          }
        ],
        appVersion: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.AppVersion",
          reasoning: "obvious property name"
        },
        manufacturer: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.DeviceBrand",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.DeviceModel",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.ScreenW",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.ScreenH",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.OsType",
          reasoning: "obvious observed values"
        },
        osVersion: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.OsVersion",
          reasoning: "obvious property name"
        },
        language: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.DeviceLang",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.TimeZone",
          reasoning: "obvious property name"
        },
        country: {
          context: "body",
          path: "KidozEventsLogAsJsonParsed.DeviceParams.Country",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: [
          {
            context: "body",
            path: "KidozEventsLogAsJsonParsed.DeviceParams.SdkVersion",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "KidozEventsLogAsJsonParsed.Entries.*.EventParams.SdkVersion",
            reasoning: "obvious property name"
          }
        ]
      }
    },
    {
      slug: "vast-api-waterfall",
      name: "Kidoz (vast/api/waterfall)",
      tracker: $115db24f4832a35d$var$tracker,
      endpointUrls: [
        "https://vast.kidoz.net/api/waterfall"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        manufacturer: [
          {
            context: "query",
            path: "manufacturer",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "brand",
            reasoning: "obvious property name"
          }
        ],
        propertyId: {
          context: "query",
          path: "publisher_id",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "query",
          path: "User-Agent",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "query",
          path: "device_hash",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "device_lang",
          reasoning: "obvious property name"
        },
        osName: {
          context: "query",
          path: "os_type",
          reasoning: "obvious observed values"
        },
        trackerSdkVersion: [
          {
            context: "query",
            path: "sdk_version",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "actual_sdk_version",
            reasoning: "obvious property name"
          }
        ],
        networkConnectionType: {
          context: "query",
          path: "network_type",
          notIf: "Unknown",
          reasoning: "obvious property name"
        },
        appId: {
          context: "query",
          path: "package_id",
          reasoning: "obvious property name"
        },
        model: {
          context: "query",
          path: "model",
          reasoning: "obvious property name"
        },
        appVersion: [
          {
            context: "query",
            path: "app_version_code",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "app_version_name",
            reasoning: "obvious property name"
          }
        ],
        osVersion: {
          context: "query",
          path: "os_version",
          reasoning: "obvious property name"
        },
        advertisingId: {
          context: "query",
          path: "google_id",
          reasoning: "observed values match known device parameters"
        },
        carrier: {
          context: "query",
          path: "carrier_name",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "api-vast-error-gif",
      name: "Kidoz (api/vast/error.gif)",
      tracker: $115db24f4832a35d$var$tracker,
      endpointUrls: [
        "https://a.kidoz.net/api/vast/error.gif",
        "https://analytics.kidoz.net/api/vast/error.gif"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "query",
          path: "app_id",
          reasoning: "obvious property name"
        },
        propertyId: {
          context: "query",
          path: "publisher_id",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "query",
          path: "sdk_version",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "query",
          path: "device_hash",
          reasoning: "obvious property name"
        },
        publicIp: {
          context: "query",
          path: "wip",
          reasoning: "observed values match known device parameters"
        },
        osVersion: {
          context: "query",
          path: "os_version",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "device_lang",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "sdk-api-api-initsdk",
      name: "Kidoz (sdk-api/api/initSDK)",
      tracker: $115db24f4832a35d$var$tracker,
      endpointUrls: [
        "https://sdk-api.kidoz.net/api/initSDK"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        manufacturer: {
          context: "query",
          path: "manufacturer",
          reasoning: "obvious property name"
        },
        propertyId: {
          context: "query",
          path: "publisher_id",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "query",
          path: "device_hash",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "device_lang",
          reasoning: "obvious property name"
        },
        osName: {
          context: "query",
          path: "os_type",
          reasoning: "obvious observed values"
        },
        trackerSdkVersion: [
          {
            context: "query",
            path: "sdk_version",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "actual_sdk_version",
            reasoning: "obvious property name"
          }
        ],
        networkConnectionType: {
          context: "query",
          path: "network_type",
          notIf: "Unknown",
          reasoning: "obvious property name"
        },
        appId: {
          context: "query",
          path: "package_id",
          reasoning: "obvious property name"
        },
        model: {
          context: "query",
          path: "model",
          reasoning: "obvious property name"
        },
        appVersion: [
          {
            context: "query",
            path: "app_version_code",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "app_version_name",
            reasoning: "obvious property name"
          }
        ],
        osVersion: {
          context: "query",
          path: "os_version",
          reasoning: "obvious property name"
        },
        advertisingId: {
          context: "query",
          path: "google_id",
          reasoning: "observed values match known device parameters"
        },
        carrier: {
          context: "query",
          path: "carrier_name",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "openrtb2-vast",
      name: "Kidoz (openrtb2/vast)",
      tracker: $115db24f4832a35d$var$tracker,
      endpointUrls: [
        "https://v.kidoz.net/openrtb2/vast",
        "https://prebid-adapter.kidoz.net/openrtb2/vast"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        appId: [
          {
            context: "query",
            path: "app_id",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "app_store_url",
            reasoning: "obvious property name"
          }
        ],
        appName: {
          context: "query",
          path: "app_title",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "query",
          path: "app_version",
          reasoning: "obvious property name"
        },
        country: {
          context: "query",
          path: "country_code",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "query",
          path: "screen_width",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "query",
          path: "screen_height",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "device_language",
          reasoning: "obvious property name"
        },
        osName: {
          context: "query",
          path: "platform",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "query",
          path: "os_version",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "query",
          path: "user_agent",
          reasoning: "obvious property name"
        },
        publicIp: [
          {
            context: "query",
            path: "client_ip",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "wip",
            reasoning: "observed values match known device parameters"
          }
        ],
        manufacturer: {
          context: "query",
          path: "brand",
          reasoning: "obvious property name"
        },
        model: {
          context: "query",
          path: "model",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "query",
          path: "sdk_version",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "query",
          path: "timezone",
          reasoning: "obvious property name"
        },
        carrier: {
          context: "query",
          path: "carrier",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "query",
          // There is a `ifa_type` parameter that can for example also be `sessionid`, so we can't list this as
          // the advertising ID.
          path: "ifa",
          reasoning: "obvious property name"
        },
        propertyId: {
          context: "query",
          path: "publisher_id",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $9e803b34fb61375f$var$tracker = {
    slug: "magnite",
    // See: https://www.bizjournals.com/losangeles/news/2020/06/30/rubicon-rebrands-as-magnite-after-telaria-merger.html
    name: "Magnite, Inc. (formerly The Rubicon Project)",
    datenanfragenSlug: "rubiconproject",
    exodusId: 145
  };
  var $9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths = {
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://www.magnite.com/legal/advertising-platform-privacy-policy/#information-we-collect-use-disclose-and-the-purposes-for-such-disclosure"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://www.magnite.com/legal/advertising-platform-privacy-policy/#information-we-collect-use-disclose-and-the-purposes-for-such-disclosure"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://www.magnite.com/legal/advertising-platform-privacy-policy/#information-we-collect-use-disclose-and-the-purposes-for-such-disclosure"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ],
    browserId: {
      context: "cookie",
      path: "khaos",
      reasoning: "https://www.magnite.com/legal/user-choice-portal/#digital-identifiers"
    }
  };
  var $9e803b34fb61375f$export$1761c188a41008af = [
    {
      slug: "rubicon-pbs-openrtb2-auction",
      name: "Rubicon Project Prebid Server OpenRTB Auction",
      tracker: $9e803b34fb61375f$var$tracker,
      // Implements: https://docs.prebid.org/prebid-server/endpoints/openrtb2/pbs-endpoint-auction.html
      endpointUrls: [
        "https://prebid-server.rubiconproject.com/openrtb2/auction"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        },
        {
          function: "decodeBase64",
          input: "res.cookie.uids",
          output: "uidsDecoded"
        },
        {
          function: "parseJson",
          input: "uidsDecoded",
          output: "res.cookie.uidsParsed"
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        userId: {
          context: "cookie",
          path: "uidsParsed.tempUIDs.*.uid",
          notIf: "OPTOUT",
          reasoning: "https://docs.prebid.org/prebid-server/developers/pbs-cookie-sync.html#motivation"
        }
      })
    },
    {
      slug: "rubicon-fastlane-json",
      // FastLane is Rubicon's header bidding solution, cf.:
      // https://investor.rubiconproject.com/news-releases/news-release-details/rubicon-project-expands-leading-header-bidding-solution-first
      // and
      // https://www.businesswire.com/news/home/20160328005067/en/Rubicon-Project-Launches-First-Header-Bidding-Solution-Compliant-with-Google-AMP
      name: "Rubicon Project FastLane",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://fastlane.rubiconproject.com/a/api/fastlane.json"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "site_id",
          reasoning: "obvious property name"
        },
        viewedPageKeywords: {
          context: "query",
          path: "kw",
          reasoning: "obvious property name"
        },
        userId: [
          {
            context: "query",
            path: '$["eid_pubcid.org"]',
            reasoning: "https://docs.prebid.org/dev-docs/modules/pubCommonId.html"
          },
          {
            context: "query",
            path: "ppuid",
            reasoning: "https://docs.prebid.org/dev-docs/modules/userid-submodules/pubprovided.html"
          },
          {
            context: "query",
            path: '$["eid_id5-sync.com"]',
            notIf: "0^1^",
            reasoning: "https://github.com/id5io/id5-api.js/blob/1cf1ed3d0baeaedc5511aacb2ad5cf3295da4362/README.md#id5-id"
          }
        ],
        userAgent: [
          {
            context: "query",
            path: "m_ch_ua",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "m_ch_full_ver",
            reasoning: "obvious observed values"
          }
        ],
        isMobileDevice: {
          context: "query",
          path: "m_ch_mobile",
          reasoning: "obvious property name"
        },
        osName: {
          context: "query",
          path: "m_ch_platform",
          reasoning: "obvious property name"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "tg_v.consent",
            reasoning: "obvious property name"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ]
      })
    },
    {
      slug: "rubicon-pixel-exchange-sync-php",
      // See: https://github.com/prebid/prebid-server/issues/272
      name: "Rubicon Project cookie sync pixel",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://pixel.rubiconproject.com/exchange/sync.php",
        "https://pixel-eu.rubiconproject.com/exchange/sync.php",
        "https://pixel-us-east.rubiconproject.com/exchange/sync.php"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "p",
          reasoning: "https://github.com/prebid/prebid-server/issues/1405#issuecomment-661045724"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          }
        ],
        userId: [
          {
            context: "query",
            path: "google_gid",
            reasoning: "https://developers.google.com/authorized-buyers/rtb/cookie-guide#step-2:-google-responds-with-redirect-including-match-data"
          },
          {
            context: "query",
            path: "obUid",
            reasoning: "https://www.outbrain.com/privacy/cookies/"
          }
        ],
        browserId: {
          context: "query",
          path: "khaos",
          reasoning: "https://www.magnite.com/legal/user-choice-portal/#digital-identifiers"
        },
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "rubicon-eus-usync-html",
      name: "Rubicon Project cookie sync (usync.html)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://eus.rubiconproject.com/usync.html"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "p",
          reasoning: "https://github.com/prebid/prebid-server/issues/1405#issuecomment-661045724"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          }
        ],
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "rubicon-token-khaos-json",
      name: "Rubicon Project (token/khaos.json)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://token.rubiconproject.com/khaos.json"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        browserId: {
          context: "query",
          path: "khaos",
          reasoning: "https://www.magnite.com/legal/user-choice-portal/#digital-identifiers"
        }
      })
    },
    {
      slug: "rubicon-token-token",
      name: "Rubicon Project (token/token)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://token.rubiconproject.com/token"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "rubicon-pixel-tap-php",
      name: "Rubicon Project (pixel/tap.php)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://pixel.rubiconproject.com/tap.php"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "rubicon-pixel-token",
      name: "Rubicon Project (pixel/token)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://pixel.rubiconproject.com/token"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            notIf: '["",""]',
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          }
        ],
        appId: {
          context: "header",
          path: "X-Requested-With",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "rubicon-xapi-multi-sync-html",
      name: "Rubicon Project (utils/xapi/multi-sync.html)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://secure-assets.rubiconproject.com/utils/xapi/multi-sync.html"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, {
        propertyId: {
          context: "query",
          path: "p",
          reasoning: "https://github.com/prebid/prebid-server/issues/1405#issuecomment-661045724"
        },
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious property name"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ]
      })
    },
    {
      slug: "rubicon-pbs-setuid",
      // Implements: https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html
      name: "Rubicon Project Prebid Server cookie sync (setuid)",
      tracker: $9e803b34fb61375f$var$tracker,
      endpointUrls: [
        "https://prebid-server.rubiconproject.com/setuid"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9e803b34fb61375f$var$rubiconCommonHeaderAndCookiePaths, (0, $ebedc07b61dad4b4$export$e6753d62dd0b15f0), {
        consentState: {
          context: "query",
          path: "gpp",
          reasoning: "obvious property name"
        }
      })
    }
  ];
  var $169f7008e87e0ff6$var$tracker = {
    slug: "media-net",
    name: "Media.Net Advertising FZ-LLC",
    datenanfragenSlug: "media-net"
  };
  var $169f7008e87e0ff6$export$1761c188a41008af = [
    {
      slug: "rtb-prebid",
      name: "Media.Net Prebid.js OpenRTB integration (rtb/prebid)",
      tracker: $169f7008e87e0ff6$var$tracker,
      endpointUrls: [
        "https://prebid.media.net/rtb/prebid"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)("ortb2."), (0, $a933a714180ea702$export$85a80da4d6018d37)("ortb2."), {
        websiteUrl: {
          context: "body",
          path: "site.domain",
          reasoning: "obvious property name"
        },
        viewedPage: {
          context: "body",
          path: "site.page",
          reasoning: "obvious property name"
        },
        propertyId: {
          context: "body",
          path: "ext.customer_id",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "device.screen.h",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "device.screen.w",
          reasoning: "obvious property name"
        },
        userId: [
          {
            context: "body",
            path: "ext.user_id.hadronId",
            notIf: "0",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "ext.user_id.criteoId",
            notIf: "0",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "ext.user_id.pubcid",
            notIf: "0",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "ext.user_id.id5id.uid",
            notIf: "0",
            reasoning: "obvious property name"
          },
          {
            context: "cookie",
            path: "visitor-id",
            reasoning: "obvious property name"
          }
        ],
        consentState: {
          context: "body",
          path: "ext.gdpr_consent_string",
          reasoning: "obvious property name"
        },
        userAgent: [
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://www.media.net/privacy-policy/#privacy-practices-for-end-users"
          },
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://www.media.net/privacy-policy/#privacy-practices-for-end-users"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://www.media.net/privacy-policy/#privacy-practices-for-end-users"
          }
        ],
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ],
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    }
  ];
  var $3df5e9d80c05603e$var$tracker = {
    slug: "microsoft",
    name: "Microsoft Ireland Operations Ltd.",
    datenanfragenSlug: "microsoft",
    exodusId: 243
  };
  var $3df5e9d80c05603e$export$1761c188a41008af = [
    {
      slug: "appcenter-logs",
      // See: https://learn.microsoft.com/en-us/appcenter/
      name: "Visual Studio App Center",
      description: "microsoft-appcenter",
      tracker: $3df5e9d80c05603e$var$tracker,
      endpointUrls: [
        "https://in.appcenter.ms/logs"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header.Install-ID",
          options: {
            path: "Install-ID"
          }
        }
      ],
      containedDataPaths: {
        appId: {
          context: "body",
          path: "logs.*.device.appNamespace",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        appVersion: [
          {
            context: "body",
            path: "logs.*.device.appVersion",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          },
          {
            context: "body",
            path: "logs.*.device.appBuild",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          }
        ],
        trackerSdkVersion: {
          context: "body",
          path: "logs.*.device.sdkVersion",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        installationId: {
          context: "header",
          path: "Install-ID",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        sessionId: {
          context: "body",
          path: "logs.*.sid",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        userId: [
          {
            context: "body",
            path: "logs.*.userId",
            notIf: "-1",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          }
        ],
        manufacturer: {
          context: "body",
          path: "logs.*.device.oemName",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        model: {
          context: "body",
          path: "logs.*.device.model",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        osName: {
          context: "body",
          path: "logs.*.device.osName",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        osVersion: [
          {
            context: "body",
            path: "logs.*.device.osVersion",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          },
          {
            context: "body",
            path: "logs.*.device.osBuild",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          },
          {
            context: "body",
            path: "logs.*.device.osApiLevel",
            reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
          }
        ],
        language: {
          context: "body",
          path: "logs.*.device.locale",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        timezone: {
          context: "body",
          path: "logs.*.device.timeZoneOffset",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        screenWidth: {
          context: "body",
          path: "logs.*.device.screenSize",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        screenHeight: {
          context: "body",
          path: "logs.*.device.screenSize",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        },
        carrier: {
          context: "body",
          path: "logs.*.device.carrierName",
          reasoning: "https://learn.microsoft.com/en-us/appcenter/sdk/data-collected"
        }
      }
    },
    {
      slug: "adnxs-ib-ut-v3-prebid",
      // See: https://learn.microsoft.com/en-us/xandr/monetize/integrate-web-mobile-web-with-psp#implementation
      name: "Microsoft Monetize (AppNexus) Prebid integration (send top bid)",
      tracker: $3df5e9d80c05603e$var$tracker,
      endpointUrls: [
        "https://ib.adnxs.com/ut/v3/prebid"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        userId: [
          {
            context: "body",
            path: "user.external_uid",
            reasoning: "https://docs.prebid.org/dev-docs/bidders/appnexus.html#user-object"
          },
          {
            context: "body",
            path: "eids.*.id",
            notIf: "0",
            reasoning: "https://github.com/InteractiveAdvertisingBureau/openrtb2.x/blob/f26fdab655ebd7302dffde9fb635ac54c69ff960/2.6.md#3228---object-uid-"
          }
        ],
        trackerSdkVersion: {
          context: "body",
          path: "sdk.version",
          reasoning: "obvious property name"
        },
        referer: [
          {
            context: "body",
            path: "referrer_detection.rd_ref",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "referrer_detection.rd_stk",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "referrer_detection.rd_can",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          }
        ],
        consentState: [
          {
            context: "body",
            path: "gdpr_consent.consent_string",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "gdpr_consent.addtl_consent",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "privacy.gpp",
            reasoning: "obvious property name"
          }
        ],
        viewedPageKeywords: {
          context: "body",
          path: "keywords.*.key",
          reasoning: "obvious property name"
        },
        userAgent: [
          {
            context: "body",
            path: "device.useragent",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          }
        ],
        screenHeight: {
          context: "body",
          path: "device.h",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "device.w",
          reasoning: "obvious property name"
        },
        deviceId: [
          {
            context: "cookie",
            path: "uuid2",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "uids",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "XANDR_PANID",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ]
      }
    },
    {
      slug: "adnxs-ib-openrtb2-prebid",
      // See: https://learn.microsoft.com/en-us/xandr/monetize/integrate-web-mobile-web-with-psp#implementation-1
      name: "Microsoft Monetize (AppNexus) Prebid integration (send all bids)",
      tracker: $3df5e9d80c05603e$var$tracker,
      endpointUrls: [
        "https://ib.adnxs.com/openrtb2/prebid"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)(
        // Vendor-specific spec: https://learn.microsoft.com/en-us/xandr/supply-partners/integration-with-openrtb-2-6
        (0, $a006f264ba4c597f$export$b453d26931eb8f95)(),
        (0, $a933a714180ea702$export$85a80da4d6018d37)(),
        {
          userAgent: [
            {
              context: "header",
              path: "User-Agent",
              reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
            },
            {
              context: "header",
              path: "user-agent",
              reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
            }
          ]
        }
      )
    },
    {
      slug: "adnxs-ib-getuid",
      // See:
      // https://learn.microsoft.com/en-us/xandr/bidders/synchronize-your-user-ids#bidderdata-provider-stored-mapping
      // and https://learn.microsoft.com/en-us/xandr/bidders/user-data---faq#how-can-i-sync-user-ids-with-xandr
      name: "Xandr cookie matching pixel (mapping stored by bidder/data provider)",
      tracker: $3df5e9d80c05603e$var$tracker,
      endpointUrls: [
        "https://ib.adnxs.com/getuid",
        "https://secure.adnxs.com/getuid",
        "https://secure.adnxs.com/getuidnb"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        userAgent: [
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          }
        ],
        referer: [
          {
            context: "query",
            path: "referrer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ],
        deviceId: [
          {
            context: "cookie",
            path: "uuid2",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "uids",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "XANDR_PANID",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          }
        ],
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://learn.microsoft.com/en-us/xandr/bidders/synchronize-your-user-ids#bidderdata-provider-stored-mapping"
        }
      }
    },
    {
      slug: "adnxs-ib-setuid",
      // See:
      // https://learn.microsoft.com/en-us/xandr/bidders/synchronize-your-user-ids#storing-the-mapping-with-xandr
      // This implements https://docs.prebid.org/prebid-server/endpoints/pbs-endpoint-setuid.html plus
      // Microsoft-specific extensions.
      name: "Xandr cookie matching pixel (mapping stored by Xandr)",
      tracker: $3df5e9d80c05603e$var$tracker,
      endpointUrls: [
        "https://ib.adnxs.com/setuid",
        "https://ib.adnxs.com/prebid/setuid"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $ebedc07b61dad4b4$export$e6753d62dd0b15f0), {
        userAgent: [
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          },
          {
            context: "header",
            path: "sec-ch-ua",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/platform-privacy-policy#infoxandr"
          }
        ],
        referer: [
          {
            context: "query",
            path: "referrer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          }
        ],
        appId: [
          {
            context: "header",
            path: "X-Requested-With",
            reasoning: "obvious observed values"
          },
          {
            context: "header",
            path: "x-requested-with",
            reasoning: "obvious observed values"
          }
        ],
        deviceId: [
          {
            context: "cookie",
            path: "uuid2",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "uids",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          },
          {
            context: "cookie",
            path: "XANDR_PANID",
            reasoning: "https://about.ads.microsoft.com/en/resources/policies/digital-platform-cookie-policy"
          }
        ],
        propertyId: {
          context: "query",
          path: "entity",
          reasoning: "https://learn.microsoft.com/en-us/xandr/bidders/synchronize-your-user-ids#storing-the-mapping-with-xandr"
        },
        userId: {
          context: "query",
          path: "code",
          reasoning: "https://learn.microsoft.com/en-us/xandr/bidders/synchronize-your-user-ids#storing-the-mapping-with-xandr"
        }
      })
    }
  ];
  var $15ec35bea75dc38f$var$tracker = {
    slug: "mopub",
    name: "MoPub",
    description: "mopub",
    exodusId: 35
  };
  var $15ec35bea75dc38f$var$keyUrl = (lineNumber) => `https://github.com/mopub/mopub-ios-sdk/blob/4b5e70e4ff69b0c3f4ab71a8791f5e7351ad2828/MoPubSDK/Internal/MPAdServerKeys.m#L${lineNumber}`;
  var $15ec35bea75dc38f$export$1761c188a41008af = [
    {
      slug: "ads",
      name: "MoPub SDK",
      tracker: $15ec35bea75dc38f$var$tracker,
      endpointUrls: [
        "https://ads.mopub.com/m/open",
        "https://ads.mopub.com/m/gdpr_sync",
        "https://ads.mopub.com/m/ad"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        appId: [
          {
            context: "body",
            path: "bundle",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "id",
            onlyIf: /^[a-z0-9]+\.[a-z0-9.]+$/i,
            reasoning: "obvious observed values"
          }
        ],
        appVersion: {
          context: "body",
          path: "av",
          reasoning: $15ec35bea75dc38f$var$keyUrl(14)
        },
        trackerSdkVersion: {
          context: "body",
          path: "nv",
          reasoning: $15ec35bea75dc38f$var$keyUrl(19)
        },
        advertisingId: [
          {
            context: "body",
            path: "consent_ifa",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: '$[?(@property === "udid" && @.match(/ifa:/i))]',
            reasoning: "obvious observed values"
          }
        ],
        developerScopedId: {
          context: "body",
          path: "ifv",
          reasoning: $15ec35bea75dc38f$var$keyUrl(31)
        },
        otherIdentifiers: {
          context: "body",
          path: '$[?(@property === "udid" && !@.match(/ifa:/i))]',
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "os",
          reasoning: "obvious observed values"
        },
        osVersion: {
          context: "body",
          path: "osv",
          reasoning: "obvious observed values"
        },
        manufacturer: [
          {
            context: "body",
            path: "make",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "hwv",
            reasoning: "obvious observed values"
          },
          {
            context: "body",
            path: "dn",
            reasoning: $15ec35bea75dc38f$var$keyUrl(24)
          }
        ],
        model: [
          {
            context: "body",
            path: "model",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "dn",
            reasoning: $15ec35bea75dc38f$var$keyUrl(24)
          }
        ],
        timezone: {
          context: "body",
          path: "z",
          reasoning: $15ec35bea75dc38f$var$keyUrl(36)
        },
        carrier: {
          context: "body",
          path: "cn",
          reasoning: $15ec35bea75dc38f$var$keyUrl(39)
        },
        screenWidth: {
          context: "body",
          path: "w",
          reasoning: $15ec35bea75dc38f$var$keyUrl(45)
        },
        screenHeight: {
          context: "body",
          path: "h",
          reasoning: $15ec35bea75dc38f$var$keyUrl(46)
        }
      }
    }
  ];
  var $795c8b67fe1976dd$var$tracker = {
    slug: "onesignal",
    name: "OneSignal, Inc.",
    description: "onesignal",
    datenanfragenSlug: "onesignal",
    exodusId: 193
  };
  var $795c8b67fe1976dd$export$1761c188a41008af = [
    {
      slug: "players",
      name: "OneSignal (Add a device)",
      description: "onesignal-add-a-device",
      tracker: $795c8b67fe1976dd$var$tracker,
      endpointUrls: [
        "https://api.onesignal.com/players",
        "https://onesignal.com/api/v1/players",
        /https:\/\/api\.onesignal\.com\/players\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "path",
          output: "res.path",
          options: {
            path: "$"
          }
        }
      ],
      // The `tags.*` properties are custom properties that can be set by the app developer.
      containedDataPaths: {
        trackerSdkVersion: {
          context: "body",
          path: "sdk",
          reasoning: "onesignal/sdk.md"
        },
        appId: [
          {
            context: "body",
            path: "android_package",
            reasoning: "onesignal/android_package.md"
          },
          {
            context: "body",
            path: "ios_bundle",
            reasoning: "onesignal/ios_bundle.md"
          }
        ],
        appVersion: {
          context: "body",
          path: "game_version",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
        },
        pushNotificationToken: {
          context: "body",
          path: "identifier",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
        },
        userId: {
          context: "body",
          path: "external_user_id",
          notIf: "0",
          reasoning: "https://documentation.onesignal.com/v9.0/docs/users#external-user-ids"
        },
        installationId: {
          context: "path",
          path: "$",
          onlyIf: /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
          reasoning: "https://documentation.onesignal.com/v9.0/docs/users#player-id"
        },
        deviceId: {
          context: "body",
          path: "tags.deviceId",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "device_type",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
        },
        osVersion: {
          context: "body",
          path: "device_os",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
        },
        timezone: [
          {
            context: "body",
            path: "timezone_id",
            reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
          },
          {
            context: "body",
            path: "timezone",
            reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
          }
        ],
        model: {
          context: "body",
          path: "device_model",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
        },
        carrier: {
          context: "body",
          path: "carrier",
          reasoning: "onesignal/carrier.md"
        },
        isRooted: {
          context: "body",
          path: "rooted",
          reasoning: "https://documentation.onesignal.com/v9.0/reference/csv-export"
        },
        country: {
          context: "body",
          path: "tags.country",
          reasoning: "obvious property name"
        },
        language: [
          {
            context: "body",
            path: "language",
            reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
          },
          {
            context: "body",
            path: "tags.lang",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "tags.language",
            reasoning: "obvious property name"
          }
        ],
        latitude: [
          {
            context: "body",
            path: "lat",
            reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
          },
          {
            context: "body",
            path: "tags.geo_latitude",
            reasoning: "obvious property name"
          }
        ],
        longitude: [
          {
            context: "body",
            path: "long",
            reasoning: "https://documentation.onesignal.com/v9.0/reference/add-a-device"
          },
          {
            context: "body",
            path: "tags.geo_longitude",
            reasoning: "obvious property name"
          }
        ],
        deviceName: {
          context: "body",
          path: "tags.deviceName",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $9f19968234e4c94d$var$tracker = {
    slug: "openx",
    name: "OpenX Poland sp. z o.o.",
    datenanfragenSlug: "openx",
    exodusId: 210
  };
  var $9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths = {
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://www.openx.com/en-gb/privacy-center/ad-exchange-privacy-policy/#section-2"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://www.openx.com/en-gb/privacy-center/ad-exchange-privacy-policy/#section-2"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://www.openx.com/en-gb/privacy-center/ad-exchange-privacy-policy/#section-2"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ],
    deviceId: {
      context: "cookie",
      path: "i",
      reasoning: "https://www.openx.com/en-gb/privacy-center/ad-exchange-privacy-policy/#section-6"
    }
  };
  var $9f19968234e4c94d$export$1761c188a41008af = [
    {
      slug: "openrtbb-prebidjs",
      name: "OpenX Prebid.js OpenRTB integration",
      tracker: $9f19968234e4c94d$var$tracker,
      endpointUrls: [
        "https://rtb.openx.net/openrtbb/prebidjs"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths)
    },
    {
      slug: "w-1-0-cm",
      name: "OpenX (w/1.0/cm)",
      tracker: $9f19968234e4c94d$var$tracker,
      endpointUrls: [
        /^https:\/\/.+\.openx\.net\/w\/1\.0\/cm$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://docs.openx.com/publishers/adtagguide-parameters/"
        }
      })
    },
    {
      slug: "w-1-0-sd",
      // See: https://knowledgebase.zetaglobal.com/pug/implementing-pixels#ImplementingPixels-CookieMatching
      name: "OpenX cookie matching pixel (w/1.0/sd)",
      tracker: $9f19968234e4c94d$var$tracker,
      endpointUrls: [
        /^https:\/\/.+\.openx\.net\/w\/1\.0\/sd$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://docs.openx.com/publishers/adtagguide-parameters/"
        },
        userId: [
          {
            context: "query",
            path: "val",
            reasoning: "https://knowledgebase.zetaglobal.com/pug/implementing-pixels#ImplementingPixels-CookieMatching"
          },
          {
            context: "query",
            path: "ttd_puid",
            reasoning: "https://partner.thetradedesk.com/v3/portal/ssp/doc/CookieMapping#initiation"
          }
        ]
      })
    },
    {
      slug: "w-1-0-pd",
      name: "OpenX (w/1.0/pd)",
      tracker: $9f19968234e4c94d$var$tracker,
      endpointUrls: [
        /^https:\/\/.+\.openx\.net\/w\/1\.0\/pd$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://docs.openx.com/publishers/adtagguide-parameters/"
        }
      })
    },
    {
      slug: "rtb-sync-prebid",
      name: "OpenX (rtb/sync/prebid)",
      tracker: $9f19968234e4c94d$var$tracker,
      endpointUrls: [
        "https://rtb.openx.net/sync/prebid"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($9f19968234e4c94d$var$openxCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "https://docs.openx.com/publishers/adtagguide-parameters/"
        }
      })
    }
  ];
  var $6bf23ab069505bd1$var$tracker = {
    slug: "outbrain",
    name: "Outbrain Inc.",
    datenanfragenSlug: "outbrain",
    exodusId: 11
  };
  var $6bf23ab069505bd1$var$zemantaCommonCookieAndHeaderPaths = {
    userId: {
      context: "cookie",
      path: "obuid",
      reasoning: "https://www.outbrain.com/privacy/cookies/"
    },
    deviceId: {
      context: "cookie",
      path: "zuid",
      reasoning: "https://www.outbrain.com/privacy/privacy-policy-outbrain-dsp/"
    },
    userAgent: [
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://www.outbrain.com/privacy/privacy-policy-outbrain-dsp/"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://www.outbrain.com/privacy/privacy-policy-outbrain-dsp/"
      }
    ],
    referer: {
      context: "header",
      path: "Referer",
      reasoning: "obvious property name"
    }
  };
  var $6bf23ab069505bd1$export$1761c188a41008af = [
    {
      slug: "zemanta-prebid-bid",
      name: "Outbrain DSP (formerly Zemanta) Prebid integration",
      tracker: $6bf23ab069505bd1$var$tracker,
      endpointUrls: [
        "https://b1h-euc1.zemanta.com/api/bidder/prebid/bid/"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $6bf23ab069505bd1$var$zemantaCommonCookieAndHeaderPaths)
    },
    {
      slug: "zemanta-usersync",
      name: "Outbrain DSP (formerly Zemanta) user sync",
      tracker: $6bf23ab069505bd1$var$tracker,
      endpointUrls: [
        /^https:\/\/b1sync\.zemanta\.com\/usersync\/.+$/,
        /^https:\/\/b1h-euc1\.zemanta\.com\/usersync\/.+$/,
        /^https:\/\/b1h\.zemanta\.com\/usersync\/.+$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($6bf23ab069505bd1$var$zemantaCommonCookieAndHeaderPaths, {
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious observed values"
          },
          {
            context: "query",
            path: "gpp",
            reasoning: "obvious observed values"
          }
        ]
      })
    }
  ];
  var $09f932a5ce317f07$var$tracker = {
    slug: "pubmatic",
    name: "PubMatic, Inc.",
    datenanfragenSlug: "pubmatic",
    exodusId: 236
  };
  var $09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths = {
    deviceId: {
      context: "cookie",
      path: "KADUSERCOOKIE",
      reasoning: "https://pubmatic.com/legal/platform-cookie-policy/"
    },
    userId: {
      context: "cookie",
      path: '$[?(@property.startsWith("KRTBCOOKIE_"))]',
      reasoning: "https://pubmatic.com/legal/platform-cookie-policy/"
    },
    userAgent: [
      {
        context: "header",
        path: "user-agent",
        reasoning: "https://pubmatic.com/legal/privacy-policy/#userinfowecollect"
      },
      {
        context: "header",
        path: "User-Agent",
        reasoning: "https://pubmatic.com/legal/privacy-policy/#userinfowecollect"
      },
      {
        context: "header",
        path: "sec-ch-ua",
        reasoning: "https://pubmatic.com/legal/privacy-policy/#userinfowecollect"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ]
  };
  var $09f932a5ce317f07$export$1761c188a41008af = [
    {
      slug: "hbopenbid-translator",
      name: "Pubmatic (hbopenbid/translator)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        "https://hbopenbid.pubmatic.com/translator"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), $09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "adserver-pug",
      // I have not found a source for this, but:
      // - If you access the endpoint (with parameters), it returns a 1x1 image, so it is clearly a tracking pixel.
      // - The `rd` parameter in the query string is clearly a redirect URL for cookie syncing.
      name: "Pubmatic cookie sync pixel (AdServer/Pug)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        /^https:\/\/s?image\d\.pubmatic\.com\/AdServer\/Pug$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        }
      })
    },
    {
      slug: "adserver-pugmaster",
      name: "Pubmatic (AdServer/PugMaster)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        /^https:\/\/s?image\d\.pubmatic\.com\/AdServer\/PugMaster$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "adserver-spug",
      name: "Pubmatic cookie sync pixel (AdServer/SPug)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        /^https:\/\/s?image\d\.pubmatic\.com\/AdServer\/SPug$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        propertyId: {
          context: "query",
          path: "partnerID",
          notIf: "0",
          reasoning: "obvious property name"
        }
      })
    },
    {
      slug: "adserver-ucookiesetpug",
      // Same justification for the name as in `adserver-pug`.
      name: "Pubmatic cookie sync pixel (AdServer/UCookieSetPug)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        /^https:\/\/image\d\.pubmatic\.com\/AdServer\/UCookieSetPug$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "adserver-js-user-sync-html",
      name: "Pubmatic cookie sync (AdServer/js/user_sync.html)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        "https://ads.pubmatic.com/AdServer/js/user_sync.html"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: [
          {
            context: "query",
            path: "gdpr_consent",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "gdprConsent",
            reasoning: "obvious property name"
          }
        ],
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "adserver-imgsync",
      name: "Pubmatic (AdServer/ImgSync)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        "https://image8.pubmatic.com/AdServer/ImgSync"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)($09f932a5ce317f07$var$pubmaticCommonHeaderAndCookiePaths, {
        consentState: {
          context: "query",
          path: "gdpr_consent",
          notIf: "{consent}",
          reasoning: "obvious property name"
        },
        appId: {
          context: "header",
          path: "x-requested-with",
          reasoning: "obvious observed values"
        }
      })
    },
    {
      slug: "ow-openrtb-2-5",
      name: "Pubmatic OpenRTB 2.5 integration (ow/openrtb/2.5)",
      tracker: $09f932a5ce317f07$var$tracker,
      endpointUrls: [
        "https://ow.pubmatic.com/openrtb/2.5"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), {
        userAgent: [
          {
            context: "header",
            path: "user-agent",
            reasoning: "https://pubmatic.com/legal/privacy-policy/#userinfowecollect"
          },
          {
            context: "header",
            path: "User-Agent",
            reasoning: "https://pubmatic.com/legal/privacy-policy/#userinfowecollect"
          }
        ]
      })
    }
  ];
  var $3ae48204714fac82$var$tracker = {
    slug: "rayjump",
    name: "Rayjump"
  };
  var $3ae48204714fac82$var$containedDataPaths = (context) => ({
    osName: [
      {
        context,
        path: "os",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "db",
        reasoning: "obvious observed values"
      }
    ],
    osVersion: [
      {
        context,
        path: "osv",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "os_version",
        reasoning: "obvious property name"
      }
    ],
    orientation: {
      context,
      path: "orientation",
      notIf: "-1",
      reasoning: "obvious property name"
    },
    manufacturer: {
      context,
      path: "brand",
      reasoning: "obvious property name"
    },
    model: {
      context,
      path: "model",
      reasoning: "obvious property name"
    },
    advertisingId: [
      {
        context,
        path: "gaid",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "data.gaid",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "idfa",
        reasoning: "obvious property name"
      }
    ],
    developerScopedId: {
      context,
      path: "idfv",
      reasoning: "obvious property name"
    },
    language: {
      context,
      path: "language",
      reasoning: "obvious property name"
    },
    timezone: {
      context,
      path: "timezone",
      reasoning: "obvious property name"
    },
    userAgent: [
      {
        context,
        path: "useragent",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "ua",
        reasoning: "obvious observed values"
      }
    ],
    screenWidth: {
      context,
      path: "screen_size",
      reasoning: "obvious property name"
    },
    screenHeight: {
      context,
      path: "screen_size",
      reasoning: "obvious property name"
    },
    appId: [
      {
        context,
        path: "package_name",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "pn",
        reasoning: "obvious observed values"
      }
    ],
    appVersion: {
      context,
      path: "app_version_name",
      reasoning: "obvious property name"
    },
    trackerSdkVersion: {
      context,
      path: "sdk_version",
      reasoning: "obvious property name"
    },
    country: [
      {
        context,
        path: "ct",
        reasoning: "obvious observed values"
      },
      {
        context,
        path: "country_code",
        reasoning: "obvious property name"
      }
    ],
    publicIp: {
      context,
      path: "ip",
      reasoning: "obvious property name"
    }
  });
  var $3ae48204714fac82$export$1761c188a41008af = [
    {
      slug: "setting",
      name: "Rayjump (setting)",
      tracker: $3ae48204714fac82$var$tracker,
      endpointUrls: [
        "https://configure.rayjump.com/setting"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: $3ae48204714fac82$var$containedDataPaths("query")
    },
    {
      slug: "analytics",
      name: "Rayjump (analytics)",
      tracker: $3ae48204714fac82$var$tracker,
      endpointUrls: [
        "https://analytics.rayjump.com"
      ],
      decodingSteps: [
        {
          function: "decodeUrl",
          input: "body",
          output: "q"
        },
        {
          function: "parseQueryString",
          input: "q",
          output: "res.body"
        },
        {
          function: "parseQueryString",
          input: "res.body.data",
          output: "res.body.data"
        }
      ],
      containedDataPaths: $3ae48204714fac82$var$containedDataPaths("body")
    }
  ];
  var $79307d98e9875564$var$tracker = {
    slug: "singular-net",
    name: "Singular Labs, Inc.",
    description: "singular-net",
    exodusId: 251
  };
  var $79307d98e9875564$export$1761c188a41008af = [
    {
      slug: "api-v1",
      name: "Singular API v1",
      tracker: $79307d98e9875564$var$tracker,
      endpointUrls: [
        "https://sdk-api-v1.singular.net/api/v1/start",
        "https://sdk-api-v1.singular.net/api/v1/event",
        "https://sdk-api-v1.singular.net/api/v1/config",
        "https://sdk-api-v1.singular.net/api/v1/resolve",
        "https://s2s.singular.net/api/v1/launch",
        "https://i.singular.net/api/v1/imp"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "parseJson",
          input: "res.body.payload",
          output: "res.body.payload"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "query",
          path: "i",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        appName: {
          context: "query",
          path: "psn",
          reasoning: "obvious observed values"
        },
        appVersion: [
          {
            context: "query",
            path: "app_v",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          },
          {
            context: "query",
            path: "av",
            reasoning: "singular-net/av.md"
          }
        ],
        architecture: {
          context: "query",
          path: "ab",
          reasoning: "obvious observed values"
        },
        country: {
          context: "query",
          path: "country_code",
          reasoning: "obvious property name"
        },
        advertisingId: [
          {
            context: "query",
            path: "idfa",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          },
          {
            context: "query",
            path: "aifa",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          }
        ],
        developerScopedId: [
          {
            context: "query",
            path: "idfv",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          },
          {
            context: "query",
            path: "asid",
            reasoning: "singular-net/asid.md"
          },
          {
            context: "query",
            path: "andi",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          }
        ],
        installTime: {
          context: "query",
          path: "install_time",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        isFirstLaunch: {
          context: "query",
          path: "install",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        language: {
          context: "query",
          path: "lc",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        manufacturer: {
          context: "query",
          path: "ma",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        model: [
          {
            context: "query",
            path: "mo",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          },
          {
            context: "query",
            path: "d",
            reasoning: "obvious observed values"
          }
        ],
        networkConnectionType: {
          context: "query",
          path: "c",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        osName: {
          context: "query",
          path: "p",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        osVersion: [
          {
            context: "query",
            path: "v",
            reasoning: "singular-net/v.md"
          },
          {
            context: "query",
            path: "ve",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          },
          {
            context: "query",
            path: "bd",
            reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
          }
        ],
        userId: {
          context: "query",
          path: "custom_user_id",
          reasoning: "singular-net/custom_user_id.md"
        },
        publicIp: {
          context: "query",
          path: "ip",
          reasoning: "https://support.singular.net/hc/en-us/articles/360048588672-Server-to-Server-S2S-API-Endpoint-Reference"
        },
        timezone: {
          context: "query",
          path: "tz",
          reasoning: "obvious observed values"
        },
        trackerSdkVersion: {
          context: "query",
          path: "sdk",
          reasoning: "obvious observed values"
        },
        userAgent: [
          {
            context: "query",
            path: "device_user_agent",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "payload.ua",
            reasoning: "obvious observed values"
          }
        ]
      }
    }
  ];
  var $f5b41140c97046cf$var$tracker = {
    slug: "smartbear",
    name: "SmartBear Software",
    description: "smartbear-bugsnag",
    exodusId: 207
  };
  var $f5b41140c97046cf$export$1761c188a41008af = [
    {
      slug: "bugsnag-sessions",
      // See: https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting
      name: "BugSnag Session Tracking API",
      description: "smartbear-bugsnag-session",
      tracker: $f5b41140c97046cf$var$tracker,
      endpointUrls: [
        "https://sessions.bugsnag.com"
      ],
      match: (r) => r.method === "POST",
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        trackerSdkVersion: {
          context: "body",
          path: "notifier.version",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        appVersion: [
          {
            context: "body",
            path: "app.version",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "app.versionCode",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "app.bundleVersion",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "app.codeBundleId",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          }
        ],
        appId: [
          {
            context: "body",
            path: "app.id",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "app.packageName",
            reasoning: "obvious property name"
          }
        ],
        appName: {
          context: "body",
          path: "app.name",
          reasoning: "obvious property name"
        },
        isInForeground: {
          context: "body",
          path: "app.inForeground",
          reasoning: "obvious property name"
        },
        viewedPage: {
          context: "body",
          path: "app.activeScreen",
          reasoning: "obvious property name"
        },
        architecture: {
          context: "body",
          path: "device.cpuAbi",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "device.osName",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        osVersion: [
          {
            context: "body",
            path: "device.osVersion",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "device.osBuild",
            reasoning: "obvious property name"
          }
        ],
        isRooted: {
          context: "body",
          path: "device.jailbroken",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        manufacturer: [
          {
            context: "body",
            path: "device.manufacturer",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "device.brand",
            reasoning: "obvious property name"
          }
        ],
        model: [
          {
            context: "body",
            path: "device.model",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          },
          {
            context: "body",
            path: "device.modelNumber",
            reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
          }
        ],
        language: {
          context: "body",
          path: "device.locale",
          reasoning: "obvious property name"
        },
        userAgent: {
          context: "body",
          path: "device.userAgent",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        orientation: {
          context: "body",
          path: "device.orientation",
          reasoning: "obvious property name"
        },
        ramTotal: {
          context: "body",
          path: "device.totalMemory",
          reasoning: "obvious property name"
        },
        ramFree: {
          context: "body",
          path: "device.freeMemory",
          reasoning: "obvious property name"
        },
        timezone: {
          context: "body",
          path: "device.timezone",
          reasoning: "obvious property name"
        },
        isCharging: {
          context: "body",
          path: "device.charging",
          reasoning: "obvious property name"
        },
        diskFree: {
          context: "body",
          path: "device.freeDisk",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "body",
          path: "device.networkAccess",
          reasoning: "obvious property name"
        },
        isEmulator: {
          context: "body",
          path: "device.emulator",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "device.screenResolution",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "device.screenResolution",
          reasoning: "obvious property name"
        },
        batteryLevel: {
          context: "body",
          path: "device.batteryLevel",
          reasoning: "obvious property name"
        },
        deviceId: {
          context: "body",
          path: "device.id",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        userId: {
          context: "body",
          path: "sessions.*.user.id",
          notIf: "0",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        sessionId: {
          context: "body",
          path: "sessions.*.id",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        },
        startTime: {
          context: "body",
          path: "sessions.*.startedAt",
          reasoning: "https://bugsnagsessiontrackingapi.docs.apiary.io/#reference/0/session/report-a-session-starting"
        }
      }
    },
    {
      slug: "bugsnag-notify",
      // See: https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports
      name: "BugSnag Error Reporting API (Notify)",
      description: "smartbear-bugsnag-notify",
      tracker: $f5b41140c97046cf$var$tracker,
      endpointUrls: [
        "https://notify.bugsnag.com"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      // The `events.*.metaData.*` properties are custom properties that can be set by the app developer, though the
      // properties included here have been set in pretty much every request we've seen.
      containedDataPaths: {
        trackerSdkVersion: {
          context: "body",
          path: "notifier.version",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        userId: {
          context: "body",
          path: "events.*.user.id",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        deviceId: {
          context: "body",
          path: "events.*.device.id",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        sessionId: {
          context: "body",
          path: "events.*.session.id",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        appId: {
          context: "body",
          path: "events.*.app.id",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        appVersion: [
          {
            context: "body",
            path: "events.*.app.version",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.app.versionCode",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.app.bundleVersion",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.app.codeBundleId",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.app.buildUUID",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          }
        ],
        timeSpent: {
          context: "body",
          path: "events.*.app.duration",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        isInForeground: {
          context: "body",
          path: "events.*.app.inForeground",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        architecture: {
          context: "body",
          path: "events.*.device.cpuAbi",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        manufacturer: [
          {
            context: "body",
            path: "events.*.device.manufacturer",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.metaData.device.brand",
            reasoning: "obvious property name"
          }
        ],
        model: [
          {
            context: "body",
            path: "events.*.device.model",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          },
          {
            context: "body",
            path: "events.*.device.modelNumber",
            reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
          }
        ],
        osName: {
          context: "body",
          path: "events.*.device.osName",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        osVersion: {
          context: "body",
          path: "events.*.device.osVersion",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        ramFree: {
          context: "body",
          path: "events.*.device.freeMemory",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        ramTotal: {
          context: "body",
          path: "events.*.device.totalMemory",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        isRooted: {
          context: "body",
          path: "events.*.device.jailbroken",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        orientation: {
          context: "body",
          path: "events.*.device.orientation",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        viewedPage: {
          context: "body",
          path: "events.*.context",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        startTime: {
          context: "body",
          path: "events.*.session.startedAt",
          reasoning: "https://bugsnagerrorreportingapi.docs.apiary.io/#reference/0/notify/send-error-reports"
        },
        appName: {
          context: "body",
          path: "events.*.metaData.app.name",
          reasoning: "obvious property name"
        },
        isEmulator: {
          context: "body",
          path: "events.*.metaData.device.emulator",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "body",
          path: "events.*.metaData.device.networkAccess",
          reasoning: "obvious property name"
        },
        isCharging: {
          context: "body",
          path: "events.*.metaData.device.charging",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "body",
          path: "events.*.metaData.device.screenResolution",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "events.*.metaData.device.screenResolution",
          reasoning: "obvious property name"
        },
        batteryLevel: {
          context: "body",
          path: "events.*.metaData.device.batteryLevel",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $220895a926615d30$var$tracker = {
    slug: "start-io",
    name: "Start.io Inc.",
    datenanfragenSlug: "start-io",
    exodusId: 195
  };
  var $220895a926615d30$var$containedDataPaths = (context) => ({
    appId: {
      context,
      path: "packageId",
      reasoning: "obvious property name"
    },
    appVersion: {
      context,
      path: "appVersion",
      reasoning: "obvious property name"
    },
    viewedPage: {
      context,
      path: "appActivity",
      reasoning: "obvious property name"
    },
    isInForeground: {
      context,
      path: "fgApp",
      reasoning: "obvious property name"
    },
    trackerSdkVersion: {
      context,
      path: "sdkVersion",
      reasoning: "obvious property name"
    },
    sessionId: {
      context,
      path: "clientSessionId",
      reasoning: "obvious property name"
    },
    osName: {
      context,
      path: "os",
      reasoning: "obvious property name"
    },
    osVersion: {
      context,
      path: "deviceVersion",
      reasoning: "obvious property name"
    },
    advertisingId: {
      context,
      path: "userAdvertisingId",
      notIf: "0",
      reasoning: "obvious property name"
    },
    manufacturer: {
      context,
      path: "manufacturer",
      reasoning: "obvious property name"
    },
    model: {
      context,
      path: "model",
      reasoning: "obvious property name"
    },
    language: {
      context,
      path: "locale",
      reasoning: "obvious property name"
    },
    screenWidth: {
      context,
      path: "width",
      reasoning: "obvious property name"
    },
    screenHeight: {
      context,
      path: "height",
      reasoning: "obvious property name"
    },
    isRoaming: {
      context,
      path: "roaming",
      reasoning: "obvious property name"
    },
    uptime: {
      context,
      path: "timeSinceBoot",
      reasoning: "obvious property name"
    },
    isRooted: {
      context,
      path: "root",
      reasoning: "obvious property name"
    },
    orientation: {
      context,
      path: "orientation",
      reasoning: "obvious property name"
    },
    carrier: [
      {
        context,
        path: "ispName",
        reasoning: "obvious property name"
      },
      {
        context,
        path: "ispCarrIdName",
        reasoning: "obvious property name"
      }
    ],
    ramUsed: {
      context,
      path: "usedRam",
      reasoning: "obvious property name"
    },
    ramFree: {
      context,
      path: "freeRam",
      reasoning: "obvious property name"
    },
    networkConnectionType: {
      context,
      path: "grid",
      reasoning: "obvious observed values"
    },
    signalStrengthCellular: {
      context,
      path: "cellSignalLevel",
      reasoning: "obvious property name"
    },
    signalStrengthWifi: {
      context,
      path: "wifiSignalLevel",
      reasoning: "obvious property name"
    }
  });
  var $220895a926615d30$export$1761c188a41008af = [
    {
      slug: "infoevent",
      name: "Start.io (infoevent)",
      tracker: $220895a926615d30$var$tracker,
      endpointUrls: [
        "https://infoevent.startappservice.com/tracking/infoEvent",
        "https://infoevent.startappservice.com/infoevent/api/v1.0/info"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: $220895a926615d30$var$containedDataPaths("body")
    },
    {
      slug: "trackdownload",
      name: "Start.io (trackdownload)",
      tracker: $220895a926615d30$var$tracker,
      endpointUrls: [
        "https://trackdownload.startappservice.com/trackdownload/api/1.0/trackdownload"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: $220895a926615d30$var$containedDataPaths("query")
    }
  ];
  var $d8a723407db6bdbb$var$tracker = {
    slug: "taboola",
    name: "Taboola, Inc.",
    datenanfragenSlug: "taboola",
    exodusId: 173
  };
  var $d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths = {
    userId: [
      {
        context: "cookie",
        path: "t_gid",
        reasoning: "https://www.taboola.com/policies/cookie-policy#what-cookies-do-we-use-and-why"
      },
      {
        context: "cookie",
        path: "t_pt_gid",
        reasoning: "https://www.taboola.com/policies/cookie-policy#what-cookies-do-we-use-and-why"
      },
      {
        context: "cookie",
        path: "taboola_fp_td_user_id",
        reasoning: "https://www.taboola.com/policies/cookie-policy#what-cookies-do-we-use-and-why"
      }
    ],
    referer: [
      {
        context: "header",
        path: "referer",
        reasoning: "obvious property name"
      },
      {
        context: "header",
        path: "Referer",
        reasoning: "obvious property name"
      }
    ]
  };
  var $d8a723407db6bdbb$export$1761c188a41008af = [
    {
      slug: "openrtb-taboolahb-auction",
      name: "TaboolaHB OpenRTB Auction",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://display.bidder.taboola.com/OpenRTB/TaboolaHB/auction"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: (0, $2ade9836ba78b915$export$8405652c088b60a)((0, $a006f264ba4c597f$export$b453d26931eb8f95)(), (0, $a933a714180ea702$export$85a80da4d6018d37)(), {
        referer: [
          {
            context: "header",
            path: "referer",
            reasoning: "obvious property name"
          },
          {
            context: "header",
            path: "Referer",
            reasoning: "obvious property name"
          }
        ]
      })
    },
    {
      slug: "beacon",
      name: "Taboola beacon",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://beacon.taboola.com"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "pub",
          reasoning: "obvious observed values"
        },
        ...$d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths
      }
    },
    {
      slug: "videobidrequesthandlerservlet",
      name: "Taboola VideoBidRequestHandlerServlet",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://am-wf.taboola.com/VideoBidRequestHandlerServlet",
        "https://wf.taboola.com/VideoBidRequestHandlerServlet"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        },
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: {
        propertyId: {
          context: "query",
          path: "pubid",
          reasoning: "obvious property name"
        },
        websiteUrl: {
          context: "query",
          path: "cirf",
          reasoning: "obvious observed values"
        },
        ...$d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths
      }
    },
    {
      slug: "opportunityservlet",
      name: "Taboola OpportunityServlet",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://am-vid-events.taboola.com/OpportunityServlet"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths
    },
    {
      slug: "vidanalytics-putes-mbox",
      name: "Taboola video analytics (putes/mbox)",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://vidanalytics.taboola.com/putes/mbox"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths
    },
    {
      slug: "st",
      name: "Taboola (st)",
      tracker: $d8a723407db6bdbb$var$tracker,
      endpointUrls: [
        "https://am-vid-events.taboola.com/st",
        "https://am-vid-events.taboola.com/st"
      ],
      decodingSteps: [
        {
          function: "getProperty",
          input: "header",
          output: "res.header",
          options: {
            path: "$"
          }
        },
        {
          function: "getProperty",
          input: "cookie",
          output: "res.cookie",
          options: {
            path: "$"
          }
        }
      ],
      containedDataPaths: $d8a723407db6bdbb$var$taboolaCommonHeaderAndCookiePaths
    }
  ];
  var $cbff09008436e910$var$tracker = {
    slug: "unity",
    name: "Unity Technologies ApS",
    datenanfragenSlug: "unity3d",
    exodusId: 121
  };
  var $cbff09008436e910$export$1761c188a41008af = [
    {
      slug: "unityads-games",
      name: "Unity Ads",
      tracker: $cbff09008436e910$var$tracker,
      endpointUrls: [
        "https://publisher-config.unityads.unity3d.com/games/3268074/configuration",
        "https://auction.unityads.unity3d.com/v4/test/games/3268074/requests"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        appId: {
          context: "query",
          path: "bundleId",
          reasoning: "obvious property name"
        },
        manufacturer: {
          context: "query",
          path: "deviceMake",
          reasoning: "obvious property name"
        },
        model: {
          context: "query",
          path: "deviceModel",
          reasoning: "obvious property name"
        },
        advertisingId: {
          context: "query",
          path: "advertisingTrackingId",
          reasoning: "obvious observed values"
        },
        userId: {
          context: "query",
          path: "analyticsUserId",
          reasoning: "obvious property name"
        },
        networkConnectionType: {
          context: "query",
          path: "connectionType",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "query",
          path: "screenWidth",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "query",
          path: "screenHeight",
          reasoning: "obvious property name"
        },
        isRooted: {
          context: "query",
          path: "rooted",
          reasoning: "obvious property name"
        },
        osName: {
          context: "query",
          path: "platform",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "query",
          path: "osVersion",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "language",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $5bed6a52a2b6552a$var$tracker = {
    slug: "vungle",
    name: "Vungle Limited",
    datenanfragenSlug: "vungle",
    exodusId: 169
  };
  var $5bed6a52a2b6552a$export$1761c188a41008af = [
    {
      slug: "api-new",
      name: "Vungle SDK (api/new)",
      tracker: $5bed6a52a2b6552a$var$tracker,
      endpointUrls: [
        /^https:\/\/api\.vungle.com\/api\/v\d\/new$/
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        advertisingId: {
          context: "query",
          path: "ifa",
          notIf: "vungle.invalid.IFA",
          reasoning: "obvious property name"
        }
      }
    },
    {
      slug: "api-ads",
      name: "Vungle SDK (api/ads)",
      tracker: $5bed6a52a2b6552a$var$tracker,
      endpointUrls: [
        "https://ads.api.vungle.com/config",
        "https://api.vungle.com/api/v5/ads",
        "https://events.api.vungle.com/api/v5/cache_bust"
      ],
      decodingSteps: [
        {
          function: "parseJson",
          input: "body",
          output: "res.body"
        }
      ],
      containedDataPaths: {
        manufacturer: {
          context: "body",
          path: "device.make",
          reasoning: "obvious property name"
        },
        model: {
          context: "body",
          path: "device.model",
          reasoning: "obvious property name"
        },
        osName: {
          context: "body",
          path: "device.os",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "body",
          path: "device.osv",
          reasoning: "obvious observed values"
        },
        carrier: {
          context: "body",
          path: "device.carrier",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "body",
          path: "device.w",
          reasoning: "obvious observed values"
        },
        screenHeight: {
          context: "body",
          path: "device.h",
          reasoning: "obvious observed values"
        },
        advertisingId: [
          {
            context: "body",
            path: "device.ifa",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.android.gaid",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.idfa",
            reasoning: "obvious property name"
          }
        ],
        developerScopedId: {
          context: "body",
          path: "device.ext.vungle.ios.idfv",
          reasoning: "obvious property name"
        },
        batteryLevel: [
          {
            context: "body",
            path: "device.ext.vungle.android.battery_level",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.battery_level",
            reasoning: "obvious property name"
          }
        ],
        isCharging: [
          {
            context: "body",
            path: "device.ext.vungle.android.battery_state",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.battery_state",
            reasoning: "obvious property name"
          }
        ],
        networkConnectionType: [
          {
            context: "body",
            path: "device.ext.vungle.android.connection_type",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.connection_type",
            reasoning: "obvious property name"
          }
        ],
        language: [
          {
            context: "body",
            path: "device.ext.vungle.android.language",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.language",
            reasoning: "obvious property name"
          }
        ],
        timezone: [
          {
            context: "body",
            path: "device.ext.vungle.android.time_zone",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.time_zone",
            reasoning: "obvious property name"
          }
        ],
        volume: [
          {
            context: "body",
            path: "device.ext.vungle.android.volume_level",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.volume_level",
            reasoning: "obvious property name"
          }
        ],
        diskFree: [
          {
            context: "body",
            path: "device.ext.vungle.android.storage_bytes_available",
            reasoning: "obvious property name"
          },
          {
            context: "body",
            path: "device.ext.vungle.ios.storage_bytes_available",
            reasoning: "obvious property name"
          }
        ],
        userAgent: {
          context: "body",
          path: "device.ua",
          reasoning: "obvious property name"
        },
        appId: {
          context: "body",
          path: "app.bundle",
          reasoning: "obvious observed values"
        },
        appVersion: {
          context: "body",
          path: "app.ver",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $4bb27974a7368d9e$var$tracker = {
    slug: "yandex",
    name: "Yandex Oy",
    datenanfragenSlug: "yandex",
    exodusId: 124
  };
  var $4bb27974a7368d9e$export$1761c188a41008af = [
    {
      slug: "appmetrica",
      // See: https://appmetrica.yandex.com/about
      name: "AppMetrica Analytics",
      tracker: $4bb27974a7368d9e$var$tracker,
      endpointUrls: [
        "https://startup.mobile.yandex.net/analytics/startup",
        "https://report.appmetrica.yandex.net/report"
      ],
      decodingSteps: [
        {
          function: "parseQueryString",
          input: "query",
          output: "res.query"
        }
      ],
      containedDataPaths: {
        advertisingId: [
          {
            context: "query",
            path: "adv_id",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "ifa",
            reasoning: "obvious property name"
          }
        ],
        developerScopedId: {
          context: "query",
          path: "ifv",
          reasoning: "obvious property name"
        },
        deviceId: [
          {
            context: "query",
            path: "deviceid",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "deviceid2",
            reasoning: "obvious property name"
          },
          {
            context: "query",
            path: "android_id",
            reasoning: "obvious property name"
          }
        ],
        osName: {
          context: "query",
          path: "app_platform",
          reasoning: "obvious property name"
        },
        osVersion: {
          context: "query",
          path: "os_version",
          reasoning: "obvious property name"
        },
        manufacturer: {
          context: "query",
          path: "manufacturer",
          reasoning: "obvious property name"
        },
        model: {
          context: "query",
          path: "model",
          reasoning: "obvious property name"
        },
        screenHeight: {
          context: "query",
          path: "screen_height",
          reasoning: "obvious property name"
        },
        screenWidth: {
          context: "query",
          path: "screen_width",
          reasoning: "obvious property name"
        },
        language: {
          context: "query",
          path: "locale",
          reasoning: "obvious property name"
        },
        isRooted: {
          context: "query",
          path: "is_rooted",
          reasoning: "obvious property name"
        },
        trackerSdkVersion: {
          context: "query",
          path: "analytics_sdk_version_name",
          reasoning: "obvious property name"
        },
        appId: {
          context: "query",
          path: "app_id",
          reasoning: "obvious property name"
        },
        appVersion: {
          context: "query",
          path: "app_version_name",
          reasoning: "obvious property name"
        }
      }
    }
  ];
  var $fed6727b7e894e8d$export$1092d1e1951a08a5 = [
    ...(0, $c601f7eb4c4e7047$export$1761c188a41008af),
    ...(0, $874e61532f7f6c39$export$1761c188a41008af),
    ...(0, $1bbd9ada6345b68c$export$1761c188a41008af),
    ...(0, $d0d7f7c7df05405b$export$1761c188a41008af),
    ...(0, $e2f984b9e2d65d10$export$1761c188a41008af),
    ...(0, $3523b39ea0afdad6$export$1761c188a41008af),
    ...(0, $f43167978965550b$export$1761c188a41008af),
    ...(0, $3f9db871cb56baaa$export$1761c188a41008af),
    ...(0, $9f42fc5dae2d9adf$export$1761c188a41008af),
    ...(0, $131d05907963357b$export$1761c188a41008af),
    ...(0, $f37ff153785f33ea$export$1761c188a41008af),
    ...(0, $e0f6d422a5acf59d$export$1761c188a41008af),
    ...(0, $ababe693f6cd03f6$export$1761c188a41008af),
    ...(0, $68ab345339af28b0$export$1761c188a41008af),
    ...(0, $2c122393a7138586$export$1761c188a41008af),
    ...(0, $115db24f4832a35d$export$1761c188a41008af),
    ...(0, $9e803b34fb61375f$export$1761c188a41008af),
    ...(0, $169f7008e87e0ff6$export$1761c188a41008af),
    ...(0, $3df5e9d80c05603e$export$1761c188a41008af),
    ...(0, $15ec35bea75dc38f$export$1761c188a41008af),
    ...(0, $795c8b67fe1976dd$export$1761c188a41008af),
    ...(0, $9f19968234e4c94d$export$1761c188a41008af),
    ...(0, $6bf23ab069505bd1$export$1761c188a41008af),
    ...(0, $09f932a5ce317f07$export$1761c188a41008af),
    ...(0, $3ae48204714fac82$export$1761c188a41008af),
    ...(0, $79307d98e9875564$export$1761c188a41008af),
    ...(0, $f5b41140c97046cf$export$1761c188a41008af),
    ...(0, $220895a926615d30$export$1761c188a41008af),
    ...(0, $d8a723407db6bdbb$export$1761c188a41008af),
    ...(0, $cbff09008436e910$export$1761c188a41008af),
    ...(0, $5bed6a52a2b6552a$export$1761c188a41008af),
    ...(0, $4bb27974a7368d9e$export$1761c188a41008af)
  ];
  function $af1843b68b6e5fd0$var$byteArrayToChars(byteArray) {
    if (!byteArray) return "";
    let str = "";
    for (let i = 0; i < byteArray.length; ) str += String.fromCharCode(byteArray[i++]);
    return str;
  }
  var $af1843b68b6e5fd0$export$2c626d165d0efff4 = class _$af1843b68b6e5fd0$export$2c626d165d0efff4 {
    /**
     * Protobuf constructor.
     *
     * @param {byteArray | Uint8Array} data
     */
    constructor(data) {
      if (data instanceof Array || data instanceof Uint8Array) this.data = data;
      else throw new Error("Protobuf input must be a byteArray or Uint8Array");
      this.TYPE = 7;
      this.NUMBER = 120;
      this.MSB = 128;
      this.VALUE = 127;
      this.offset = 0;
      this.LENGTH = data.length;
      this.fieldTypes = {};
    }
    // Public Functions
    /**
     * Encode a varint from a number.
     *
     * @param {number} number
     *
     * @returns {byteArray}
     */
    static varIntEncode(number) {
      const MSB = 128, VALUE = 127, MSBALL = ~VALUE, INT = Math.pow(2, 31);
      const out = [];
      let offset = 0;
      while (number >= INT) {
        out[offset++] = number & 255 | MSB;
        number /= 128;
      }
      while (number & MSBALL) {
        out[offset++] = number & 255 | MSB;
        number >>>= 7;
      }
      out[offset] = number | 0;
      return out;
    }
    /**
     * Decode a varint from the byteArray.
     *
     * @param {byteArray} input
     *
     * @returns {number}
     */
    static varIntDecode(input) {
      const pb = new _$af1843b68b6e5fd0$export$2c626d165d0efff4(input);
      return pb._varInt();
    }
    /**
     * Encode input JSON according to the given schema.
     *
     * @param {Object} input
     * @param {Object[]} args
     *
     * @returns {Object}
     */
    static encode(input, args) {
      this.updateProtoRoot(args[0]);
      if (!this.mainMessageName) throw new Error("Schema Error: Schema not defined");
      const message = this.parsedProto.root.nested[this.mainMessageName];
      input = message.fromObject(input);
      const error = message.verify(input);
      if (error) throw new Error("Input Error: " + error);
      const output = message.encode(input).finish();
      return new Uint8Array(output).buffer;
    }
    /**
     * Parse Protobuf data.
     *
     * @param {byteArray} input
     *
     * @returns {Object}
     */
    static decode(input, args) {
      this.updateProtoRoot(args[0]);
      this.showUnknownFields = args[1];
      this.showTypes = args[2];
      return this.mergeDecodes(input);
    }
    /**
     * Update the parsedProto, throw parsing errors.
     *
     * @param {string} protoText
     */
    static updateProtoRoot(protoText) {
      try {
        this.parsedProto = (0, import_protobufjs.default).parse(protoText);
        if (this.parsedProto.package) this.parsedProto.root = this.parsedProto.root.nested[this.parsedProto.package];
        this.updateMainMessageName();
      } catch (error) {
        throw new Error("Schema " + error);
      }
    }
    /** Set mainMessageName to the first instance of a message defined in the schema that is not a submessage. */
    static updateMainMessageName() {
      const messageNames = [];
      const fieldTypes = [];
      this.parsedProto.root.nestedArray.forEach((block) => {
        if (block instanceof (0, import_protobufjs.default).Type) {
          messageNames.push(block.name);
          this.parsedProto.root.nested[block.name].fieldsArray.forEach((field) => {
            fieldTypes.push(field.type);
          });
        }
      });
      if (messageNames.length === 0) this.mainMessageName = null;
      else
        this.mainMessageName = messageNames[0];
    }
    /**
     * Decode input using Protobufjs package and raw methods, compare, and merge results.
     *
     * @param {byteArray} input
     *
     * @returns {Object}
     */
    static mergeDecodes(input) {
      const pb = new _$af1843b68b6e5fd0$export$2c626d165d0efff4(input);
      let rawDecode = pb._parse();
      let message;
      if (this.showTypes) {
        rawDecode = this.showRawTypes(rawDecode, pb.fieldTypes);
        this.parsedProto.root = this.appendTypesToFieldNames(this.parsedProto.root);
      }
      try {
        message = this.parsedProto.root.nested[this.mainMessageName];
        const packageDecode = message.toObject(message.decode(input), {
          bytes: String,
          longs: Number,
          enums: String,
          defualts: true
        });
        const output = {};
        if (this.showUnknownFields) {
          output[message.name] = packageDecode;
          output["Unknown Fields"] = this.compareFields(rawDecode, message);
          return output;
        }
        return packageDecode;
      } catch (error) {
        if (message) throw new Error("Input " + error);
        else return rawDecode;
      }
    }
    /**
     * Replace fieldnames with fieldname and type.
     *
     * @param {Object} schemaRoot
     *
     * @returns {Object}
     */
    static appendTypesToFieldNames(schemaRoot) {
      for (const block of schemaRoot.nestedArray) {
        if (block instanceof (0, import_protobufjs.default).Type) for (const [fieldName, fieldData] of Object.entries(block.fields)) {
          schemaRoot.nested[block.name].remove(block.fields[fieldName]);
          schemaRoot.nested[block.name].add(new (0, import_protobufjs.default).Field(`${fieldName} (${fieldData.type})`, fieldData.id, fieldData.type, fieldData.rule));
        }
      }
      return schemaRoot;
    }
    /**
     * Add field type to field name for fields in the raw decoded output.
     *
     * @param {Object} rawDecode
     * @param {Object} fieldTypes
     *
     * @returns {Object}
     */
    static showRawTypes(rawDecode, fieldTypes) {
      for (const [fieldNum, value] of Object.entries(rawDecode)) {
        const fieldType = fieldTypes[fieldNum];
        let outputFieldValue;
        let outputFieldType;
        if (isNaN(fieldType)) {
          outputFieldType = 2;
          if (Array.isArray(value)) {
            const fieldInstances = [];
            for (const instance of Object.keys(value)) if (typeof value[instance] !== "string") fieldInstances.push(this.showRawTypes(value[instance], fieldType));
            else fieldInstances.push(value[instance]);
            outputFieldValue = fieldInstances;
          } else outputFieldValue = this.showRawTypes(value, fieldType);
        } else {
          outputFieldType = fieldType;
          outputFieldValue = value;
        }
        rawDecode[`field #${fieldNum}: ${this.getTypeInfo(outputFieldType)}`] = outputFieldValue;
        delete rawDecode[fieldNum];
      }
      return rawDecode;
    }
    /**
     * Compare raw decode to package decode and return discrepancies.
     *
     * @param rawDecodedMessage
     * @param schemaMessage
     *
     * @returns {Object}
     */
    static compareFields(rawDecodedMessage, schemaMessage) {
      const schemaFieldProperties = {};
      const schemaFieldNames = Object.keys(schemaMessage.fields);
      schemaFieldNames.forEach((field) => schemaFieldProperties[schemaMessage.fields[field].id] = field);
      for (const fieldName in rawDecodedMessage) {
        let fieldId;
        if (isNaN(fieldName)) fieldId = fieldName.match(/^field #(\d+)/)[1];
        else fieldId = fieldName;
        if (fieldId in schemaFieldProperties) {
          const schemaFieldName = schemaFieldProperties[fieldId];
          const rawFieldData = rawDecodedMessage[fieldName];
          const schemaField = schemaMessage.fields[schemaFieldName];
          if (Array.isArray(rawFieldData) && !schemaField.repeated) rawDecodedMessage[`(${schemaMessage.name}) ${schemaFieldName} is a repeated field`] = rawFieldData;
          if (schemaField.resolvedType instanceof (0, import_protobufjs.default).Type) {
            const subMessageType = schemaMessage.fields[schemaFieldName].type;
            const schemaSubMessage = this.parsedProto.root.nested[subMessageType];
            const rawSubMessages = rawDecodedMessage[fieldName];
            let rawDecodedSubMessage = {};
            if (Array.isArray(rawSubMessages)) rawSubMessages.forEach((subMessageInstance) => {
              const instanceFields = Object.entries(subMessageInstance);
              instanceFields.forEach((subField) => {
                rawDecodedSubMessage[subField[0]] = subField[1];
              });
            });
            else rawDecodedSubMessage = rawSubMessages;
            rawDecodedSubMessage = _$af1843b68b6e5fd0$export$2c626d165d0efff4.compareFields(rawDecodedSubMessage, schemaSubMessage);
            if (Object.entries(rawDecodedSubMessage).length !== 0) rawDecodedMessage[`${schemaFieldName} (${subMessageType}) has missing fields`] = rawDecodedSubMessage;
          }
          delete rawDecodedMessage[fieldName];
        }
      }
      return rawDecodedMessage;
    }
    /**
     * Returns wiretype information for input wiretype number.
     *
     * @param {number} wireType
     *
     * @returns {string}
     */
    static getTypeInfo(wireType) {
      switch (wireType) {
        case 0:
          return "VarInt (e.g. int32, bool)";
        case 1:
          return "64-Bit (e.g. fixed64, double)";
        case 2:
          return "L-delim (e.g. string, message)";
        case 5:
          return "32-Bit (e.g. fixed32, float)";
      }
    }
    // Private Class Functions
    /**
     * Main private parsing function.
     *
     * @private
     *
     * @returns {Object}
     */
    _parse() {
      let object = {};
      while (this.offset < this.LENGTH) {
        const field = this._parseField();
        object = this._addField(field, object);
      }
      if (this.offset > this.LENGTH) throw new Error("Exhausted Buffer");
      return object;
    }
    /**
     * Add a field read from the protobuf data into the Object. As protobuf fields can appear multiple times, if the
     * field already exists we need to add the new field into an array of fields for that key.
     *
     * @private
     *
     * @param {Object} field
     * @param {Object} object
     *
     * @returns {Object}
     */
    _addField(field, object) {
      const key = field.key;
      const value = field.value;
      object[key] = Object.prototype.hasOwnProperty.call(object, key) ? object[key] instanceof Array ? object[key].concat([
        value
      ]) : [
        object[key],
        value
      ] : value;
      return object;
    }
    /**
     * Parse a field and return the Object read from the record.
     *
     * @private
     *
     * @returns {Object}
     */
    _parseField() {
      const header = this._fieldHeader();
      const type = header.type;
      const key = header.key;
      if (typeof this.fieldTypes[key] !== "object") this.fieldTypes[key] = type;
      switch (type) {
        // varint
        case 0:
          return {
            key,
            value: this._varInt()
          };
        // fixed 64
        case 1:
          return {
            key,
            value: this._uint64()
          };
        // length delimited
        case 2:
          return {
            key,
            value: this._lenDelim(key)
          };
        // fixed 32
        case 5:
          return {
            key,
            value: this._uint32()
          };
        // unknown type
        default:
          throw new Error("Unknown type 0x" + type.toString(16));
      }
    }
    /**
     * Parse the field header and return the type and key.
     *
     * @private
     *
     * @returns {Object}
     */
    _fieldHeader() {
      return {
        type: this._fieldType(),
        key: this._fieldNumber()
      };
    }
    /**
     * Parse the field type from the field header. Type is stored in the lower 3 bits of the tag byte. This does not
     * move the offset on as we need to read the field number from the tag byte too.
     *
     * @private
     *
     * @returns {number}
     */
    _fieldType() {
      return this.data[this.offset] & this.TYPE;
    }
    /**
     * Parse the field number (i.e. the key) from the field header. The field number is stored in the upper 5 bits of
     * the tag byte - but is also varint encoded so the follow on bytes may need to be read when field numbers are >
     * 15.
     *
     * @private
     *
     * @returns {number}
     */
    _fieldNumber() {
      let shift = -3;
      let fieldNumber = 0;
      do {
        fieldNumber += shift < 28 ? shift === -3 ? (this.data[this.offset] & this.NUMBER) >> -shift : (this.data[this.offset] & this.VALUE) << shift : (this.data[this.offset] & this.VALUE) * Math.pow(2, shift);
        shift += 7;
      } while ((this.data[this.offset++] & this.MSB) === this.MSB);
      return fieldNumber;
    }
    // Field Parsing Functions
    /**
     * Read off a varint from the data.
     *
     * @private
     *
     * @returns {number}
     */
    _varInt() {
      let value = 0;
      let shift = 0;
      do {
        value += shift < 28 ? (this.data[this.offset] & this.VALUE) << shift : (this.data[this.offset] & this.VALUE) * Math.pow(2, shift);
        shift += 7;
      } while ((this.data[this.offset++] & this.MSB) === this.MSB);
      return value;
    }
    /**
     * Read off a 64 bit unsigned integer from the data.
     *
     * @private
     *
     * @returns {number}
     */
    _uint64() {
      const lowerHalf = this.data[this.offset++] + this.data[this.offset++] * 256 + this.data[this.offset++] * 65536 + this.data[this.offset++] * 16777216;
      const upperHalf = this.data[this.offset++] + this.data[this.offset++] * 256 + this.data[this.offset++] * 65536 + this.data[this.offset++] * 16777216;
      return upperHalf * 4294967296 + lowerHalf;
    }
    /**
     * Read off a length delimited field from the data.
     *
     * @private
     *
     * @returns {Object | string}
     */
    _lenDelim(fieldNum) {
      const length = this._varInt();
      const fieldBytes = this.data.slice(this.offset, this.offset + length);
      let field;
      try {
        const pbObject = new _$af1843b68b6e5fd0$export$2c626d165d0efff4(fieldBytes);
        field = pbObject._parse();
        this.fieldTypes[fieldNum] = {
          ...this.fieldTypes[fieldNum],
          ...pbObject.fieldTypes
        };
      } catch (err2) {
        field = $af1843b68b6e5fd0$var$byteArrayToChars(fieldBytes);
      }
      this.offset += length;
      return field;
    }
    /**
     * Read a 32 bit unsigned integer from the data.
     *
     * @private
     *
     * @returns {number}
     */
    _uint32() {
      const dataview = new DataView(new Uint8Array(this.data.slice(this.offset, this.offset + 4)).buffer);
      const value = dataview.getUint32(0, true);
      this.offset += 4;
      return value;
    }
  };
  var $2262642343a148a4$var$decodeFunctions = {
    parseQueryString: (input) => (0, import_qs.default).parse(input.replace(/^.+?\?/, "")),
    parseJson: (input) => JSON.parse(input),
    decodeBase64: (input) => (0, import_buffer.Buffer).from(input, "base64").toString("binary"),
    decodeUrl: (input) => decodeURIComponent(input),
    decodeProtobuf: (input) => (0, $af1843b68b6e5fd0$export$2c626d165d0efff4).decode((0, import_buffer.Buffer).from(input, "binary"), [
      "",
      false,
      false
    ]),
    decodeJwt: (input) => (0, jwtDecode)(input),
    ensureArray: (input) => Array.isArray(input) ? input : [
      input
    ],
    getProperty: (input, options) => (0, JSONPath)({
      path: options.path,
      json: input,
      wrap: false
    }),
    gunzip: (input) => {
      const uint8Array = (0, gunzipSync)((0, import_buffer.Buffer).from(input, "binary"));
      return (0, import_buffer.Buffer).from(uint8Array).toString("binary");
    },
    split: (input, options) => input.toString().split(options.separator)
  };
  var $2262642343a148a4$export$3538a743ad56f9fc = (fn, input, options) => {
    try {
      return $2262642343a148a4$var$decodeFunctions[fn](input, options);
    } catch {
      return void 0;
    }
  };
  var $a3b22aeda395b50c$export$23ae01d57e3a0303 = (har) => har.log.entries.map((e) => {
    const url = new URL(e.request.url);
    const endpointUrl = `${url.protocol}//${url.host}${url.pathname}`;
    return {
      startTime: new Date(e.startedDateTime),
      method: e.request.method,
      host: url.hostname,
      path: url.pathname + url.search,
      endpointUrl,
      content: e.request.postData?.text,
      port: url.port,
      scheme: url.protocol.replace(":", ""),
      httpVersion: e.request.httpVersion,
      headers: e.request.headers,
      cookies: e.request.cookies
    };
  });
  var $149c1bd638913645$export$2145b2da3c9cc2f9 = (r, decodingSteps) => {
    const [path, query] = r.path.split("?");
    const reduceHeadersOrCookies = (headersOrCookies) => headersOrCookies?.reduce((acc, cur) => ({
      ...acc,
      [cur.name]: cur.value
    }), {});
    const vars = {
      header: reduceHeadersOrCookies(r.headers),
      cookie: reduceHeadersOrCookies(r.cookies),
      path,
      query,
      body: r.content,
      res: {}
    };
    const get = (id) => (0, JSONPath)({
      path: id,
      json: vars,
      wrap: false
    });
    const set = (id, value) => {
      const path2 = id.split(".");
      const last = path2.pop();
      if (!last) throw new Error("Invalid path");
      let current = vars;
      for (const p of path2) {
        let next = Array.isArray(current) ? current[+p] : current[p];
        if (!next) current[p] = {};
        next = Array.isArray(current) ? current[+p] : current[p];
        current = next;
      }
      if (Array.isArray(current)) current[+last] = value;
      else current[last] = value;
    };
    for (const step of decodingSteps) {
      if ("mapInput" in step) {
        const mapInput = get(step.mapInput) || [];
        if (!Array.isArray(mapInput)) throw new Error("mapInput must be an array.");
        const result2 = mapInput.filter((i) => i !== void 0 && i !== null).map((i) => (0, $2262642343a148a4$export$3538a743ad56f9fc)(step.function, i, step.options));
        if (result2) set(step.output, result2);
        continue;
      }
      const input = get(step.input);
      if (!input) continue;
      const result = (0, $2262642343a148a4$export$3538a743ad56f9fc)(step.function, input, step.options);
      if (result) set(step.output, result);
    }
    return vars.res;
  };
  var $149c1bd638913645$export$9ade1933bf5095cc = (r) => (0, $fed6727b7e894e8d$export$1092d1e1951a08a5).find((a) => a.endpointUrls.some((url) => url instanceof RegExp ? url.test(r.endpointUrl) || url.test(r.endpointUrl.replace(/\/$/, "")) : url === r.endpointUrl || url === r.endpointUrl.replace(/\/$/, "")) && (a.match ? a.match(r) : true));
  var $149c1bd638913645$export$c49bcb71aff21fdc = (request, options) => {
    const adapter = $149c1bd638913645$export$9ade1933bf5095cc(request);
    if (!adapter) {
      if (!options?.indicatorValues) return void 0;
      const indicators = Object.entries(options.indicatorValues).map(([property, valueOrValues]) => (Array.isArray(valueOrValues) ? valueOrValues : [
        valueOrValues
      ]).filter((value) => value !== void 0).map((value) => ({
        property,
        indicatorValue: value
      }))).flat();
      const indicatorMatches = indicators.map(({ property, indicatorValue }) => [
        "header",
        "path",
        "body"
      ].map((context) => [
        "plain text",
        "base64",
        "URL-encoded"
      ].map((encoding) => {
        const haystack = context === "body" ? request.content || "" : context === "path" ? request.path : (request.headers || []).map(({ name, value }) => `${name}: ${value}`).join("\n");
        const encodedIndicatorValue = encoding === "plain text" ? indicatorValue : encoding === "base64" ? (0, import_base64_search.base64Regex)(indicatorValue) : encodeURIComponent(indicatorValue);
        if (encoding !== "plain text" && encodedIndicatorValue === indicatorValue) return void 0;
        const caseInsensitive = [
          "plain text",
          "URL-encoded"
        ].includes(encoding) ? "i" : "";
        const matches = haystack.matchAll(new RegExp((0, escapeStringRegexp)(encodedIndicatorValue), `g${caseInsensitive}`));
        return [
          ...matches
        ].map((m) => ({
          adapter: "indicators",
          property,
          context,
          path: `$[${m.index}]`,
          reasoning: `indicator matching (${encoding})`,
          value: m[0]
        }));
      }))).flat(3).filter((r) => r !== void 0);
      if (indicatorMatches.length > 0) return indicatorMatches;
      return void 0;
    }
    const decodedRequest = $149c1bd638913645$export$2145b2da3c9cc2f9(request, adapter.decodingSteps);
    const flattenedPaths = Object.entries(adapter.containedDataPaths).map(([property, paths]) => (Array.isArray(paths) ? paths : [
      paths
    ]).map((p) => [
      property,
      p
    ])).flat();
    const stringify = (v) => typeof v === "bigint" || typeof v === "string" || typeof v === "symbol" || typeof v === "function" ? v.toString() : JSON.stringify(v);
    return flattenedPaths.map(([property, path]) => ((0, JSONPath)({
      path: path.path,
      json: decodedRequest[path.context],
      wrap: true
    }) ?? []).map((v) => ({
      adapter: `${adapter.tracker.slug}/${adapter.slug}`,
      property,
      ...path,
      value: v
    })).filter((v) => v.value !== void 0 && v.value !== null && v.value.trim?.() !== "").filter((v) => ![
      "unknown",
      "null",
      "undefined",
      "none",
      "n/a",
      "00000000-0000-0000-0000-000000000000",
      '""',
      "''",
      "[object Object]"
    ].includes(stringify(v.value).toLowerCase().trim()) && ![
      "NaN"
    ].includes(stringify(v.value).trim())).filter((v) => !v.onlyIf || (typeof v.onlyIf === "string" ? v.onlyIf === stringify(v.value) : v.onlyIf.test(stringify(v.value)))).filter((v) => !v.notIf || (typeof v.notIf === "string" ? v.notIf !== stringify(v.value) : !v.notIf.test(stringify(v.value))))).flat();
  };
  var $149c1bd638913645$export$e54fe5b0f43758f7 = async (har, options) => {
    const res = await Promise.all((0, $a3b22aeda395b50c$export$23ae01d57e3a0303)(har).map((r) => $149c1bd638913645$export$c49bcb71aff21fdc(r, options)));
    const ret = options?.valuesOnly ? res.map((req) => req?.reduce((acc, cur) => ({
      ...acc,
      [cur.property]: acc[cur.property]?.concat(cur.value) || [
        cur.value
      ]
    }), {})) : res;
    return ret;
  };

  // trackhar-wrapper.js
  globalThis.TrackHAR = {
    process: $149c1bd638913645$export$e54fe5b0f43758f7
  };
  globalThis.processHar = $149c1bd638913645$export$e54fe5b0f43758f7;
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

trackhar/dist/index.js:
  (**
   * Converts a charcode array to a string.
   *
   * @license Apache-2.0.
   *
   * @author n1474335 [n1474335@gmail.com]
   *
   * @example // returns "Hello" byteArrayToChars([72,101,108,108,111]);
   *
   * // returns "你好" byteArrayToChars([20320,22909]);
   *
   * @param {byteArray | Uint8Array} byteArray
   *
   * @returns {string}
   *
   * @copyright Crown Copyright 2016
   *)
*/
