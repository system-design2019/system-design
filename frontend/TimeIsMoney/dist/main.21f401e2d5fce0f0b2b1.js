webpackJsonp([16],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(15);
var isBuffer = __webpack_require__(54);

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return mapState; });
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return mapActions; });
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.1.0
 * (c) 2019 Evan You
 * @license MIT
 */
function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (false) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (false) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if (false) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if (false) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return result.then(function (res) {
    try {
      this$1._actionSubscribers
        .filter(function (sub) { return sub.after; })
        .forEach(function (sub) { return sub.after(action, this$1.state); });
    } catch (e) {
      if (false) {
        console.warn("[vuex] error in after action subscribers: ");
        console.error(e);
      }
    }
    return res
  })
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (false) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (false) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.1.0',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};

/* harmony default export */ __webpack_exports__["a"] = (index_esm);



/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(39);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);


// 创建axios实例
var service = __WEBPACK_IMPORTED_MODULE_0_axios___default.a.create({
    baseURL: 'http://118.25.215.11:8080',
    //baseURL: 'http://172.26.112.137:8080',
    //baseURL: 'http://api.timoney.xyz',
    timeout: 5000, // 请求的超时时间
    method: 'get',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    withCredentials: true // 允许携带cookie
});

// 发送请求前处理request的数据
__WEBPACK_IMPORTED_MODULE_0_axios___default.a.defaults.transformRequest = [function (data) {
    var newData = '';
    for (var k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
    }
    return newData;
}];

// request拦截器
service.interceptors.request.use(function (config) {
    // 发送请求之前，要做的业务
    return config;
}, function (error) {
    // 错误处理代码
    return Promise.reject(error);
});

// response拦截器
service.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

/* harmony default export */ __webpack_exports__["a"] = (service);

// 如下所示，如果需要调用ajax请求

// import fetch from '@/utils/fetch'
// fetch({
//   method: 'get',
//   url: '/users/list'
// })
//   .then(res => {
//   cosole.log(res)
// })

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["e"] = getQuesList;
/* harmony export (immutable) */ __webpack_exports__["f"] = getCollectQuesList;
/* harmony export (immutable) */ __webpack_exports__["g"] = getAttendQuesList;
/* harmony export (immutable) */ __webpack_exports__["h"] = getPublishQuesList;
/* harmony export (immutable) */ __webpack_exports__["l"] = collectQues;
/* harmony export (immutable) */ __webpack_exports__["k"] = cancelCollectQues;
/* harmony export (immutable) */ __webpack_exports__["a"] = getQuesContent;
/* harmony export (immutable) */ __webpack_exports__["i"] = getDetail;
/* harmony export (immutable) */ __webpack_exports__["b"] = getAnsListByQuesId;
/* harmony export (immutable) */ __webpack_exports__["c"] = getAnsByQUId;
/* harmony export (immutable) */ __webpack_exports__["d"] = commitAns;
/* harmony export (immutable) */ __webpack_exports__["j"] = createQues;
/* harmony export (immutable) */ __webpack_exports__["m"] = closeQues;
/* harmony export (immutable) */ __webpack_exports__["n"] = deleteQues;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service_js__ = __webpack_require__(4);


/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getQuesList() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/proceed/all');
    // //(JSON.stringify(response.data))
    return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getCollectQuesList() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/collect/all');
    return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAttendQuesList() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/fill/all');
    return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getPublishQuesList() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/publish/all');
    return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function collectQues(id) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].put('questionnaires/' + id + '/collect');
    return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function cancelCollectQues(id) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].delete('questionnaires/' + id + '/collect');
    return response.data;
}

/**
 * Get the content of the questionnaire by id
 * @param {int} id  id of the target questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getQuesContent(id) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/content/' + id);
    var data = {
        success: response.data.success,
        msg: response.data.msg,
        formContent: {
            quesID: response.data.data.quesID,
            title: response.data.data.title,
            number: response.data.data.number,
            questions: []
        }
    };
    data.formContent.questions = response.data.data.ques1.concat(response.data.data.ques2);
    data.formContent.questions.sort(sortByThrorder);
    // console.error(data)
    return data;
}

function sortByThrorder(a, b) {
    return a.theorder - b.theorder;
};

/**
 * Get the detail of the questionnaire
 * @param {int}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getDetail(id) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/' + id);
    // //(JSON.stringify(response))
    return response.data;
}

/**
 * Get the detail of the questionnaire
 * @param {int}  id  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAnsListByQuesId(quesid) {
    console.error('当前id' + quesid);
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/getUsers/' + quesid);
    // //(JSON.stringify(response))
    return response.data;
}

/**
 * Get the detail of the questionnaire
 * @param {int}  quesid  id of questionnaire
 * @param {int}  userid  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAnsByQUId(quesid, userid) {
    console.error(quesid, userid);
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/Answer/' + quesid + '/' + userid);
    // //(JSON.stringify(response))
    return response.data;
}

/**
 * Commit the content of the questionaire
 * @param {int}  id  id of questionnaire
 * @param {string}  answer  id of questionnaire
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function commitAns(answer) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/questionnaires/commit', answer);
    return response.data;
}

/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
async function createQues(data) {
    // //("创建问卷："+JSON.stringify(data))
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/questionnaires/publish', data);
    return response.data;
}

/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
async function closeQues(quesid) {
    // //("创建问卷："+JSON.stringify(data))
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/closeQues/' + quesid);
    return response.data;
}
/**
 * Create a new questionnaire
 * @return {Promise}
 * Promise will return the response of the action
 */
async function deleteQues(quesid) {
    // //("创建问卷："+JSON.stringify(data))
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/deleteQues/' + quesid);
    return response.data;
}

/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var settle = __webpack_require__(45);
var buildURL = __webpack_require__(16);
var parseHeaders = __webpack_require__(52);
var isURLSameOrigin = __webpack_require__(50);
var createError = __webpack_require__(12);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(48);

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(44);

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach([
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
    'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
    'socketPath'
  ], function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(0);
var normalizeHeaderName = __webpack_require__(51);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  // Only Node.JS has a process variable that is of [[Class]] process
  if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(9);
  } else if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(9);
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(23)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getTopTen;
/* harmony export (immutable) */ __webpack_exports__["b"] = sendMessage;
/* harmony export (immutable) */ __webpack_exports__["c"] = deleteCache;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service_js__ = __webpack_require__(4);


async function getTopTen() {

    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/tenQues');
    console.error("11111111111");
    console.error(JSON.stringify(response));
    return response.data;
}

async function sendMessage(data) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/notifications', data);
    return response.data;
}

async function deleteCache() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].delete('/cache');
    return response.data;
}

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_RANKLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_ADVERTISES; });
var SET_RANKLIST = 'SET_RANKLIST';
var SET_ADVERTISES = 'SET_ADVERTISES';

/* harmony default export */ __webpack_exports__["a"] = ({
    SET_RANKLIST: function SET_RANKLIST(state, list) {
        state.rankList = list;
    },
    SET_ADVERTISES: function SET_ADVERTISES(state, list) {
        state.advertises = list;
    }
});

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SIGNIN */
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SIGNIN = 'SIGNIN';

/* harmony default export */ __webpack_exports__["a"] = (_defineProperty({}, SIGNIN, function (state, userid) {
    var obj = {
        "log": true,
        "userID": userid
    };
    window.sessionStorage.setItem('LogInfo', JSON.stringify(obj));
    // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
}));

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_PER_INFO; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_PUBLISHING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SET_ATTENDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_STARRING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_DETAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_RECEIVE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return CHANGE_LOCAL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "j", function() { return DELETE_LOCAL_ALERT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "i", function() { return CHANGE_ALL_LOCAL_STATUS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "k", function() { return DELETE_ALL_LOCAL_ALERT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "l", function() { return UPDATE_ASSET; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
var _SET_PER_INFO$SET_REC;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var SET_PER_INFO = 'SET_PER_INFO';
var SET_PUBLISHING = 'SET_PUBLISHING';
var SET_ATTENDING = 'SET_ATTENDING';
var SET_STARRING = 'SET_STARRING';
var SET_DETAIL = 'SET_DETAIL';
var SET_RECEIVE = 'SET_RECEIVE';
var CHANGE_LOCAL_STATUS = 'CHANGE_LOCAL_STATUS';
var DELETE_LOCAL_ALERT = 'DELETE_LOCAL_ALERT';
var CHANGE_ALL_LOCAL_STATUS = 'CHANGE_ALL_LOCAL_STATUS';
var DELETE_ALL_LOCAL_ALERT = 'DELETE_ALL_LOCAL_ALERT';
var UPDATE_ASSET = 'UPDATE_ASSET';

/* harmony default export */ __webpack_exports__["a"] = (_SET_PER_INFO$SET_REC = {}, _defineProperty(_SET_PER_INFO$SET_REC, SET_PER_INFO, function (state, info) {
    state.personalInfo = info;
}), _defineProperty(_SET_PER_INFO$SET_REC, SET_RECEIVE, function (state, info) {
    state.mailReceive = info;
    // console.log('啊啊啊'+JSON.stringify(state.mailReceive))
}), _defineProperty(_SET_PER_INFO$SET_REC, SET_PUBLISHING, function (state, info) {
    state.publishing = info;
}), _defineProperty(_SET_PER_INFO$SET_REC, SET_ATTENDING, function (state, info) {
    state.attending = info;
}), _defineProperty(_SET_PER_INFO$SET_REC, SET_STARRING, function (state, info) {
    state.starring = info;
}), _defineProperty(_SET_PER_INFO$SET_REC, SET_DETAIL, function (state, detail) {
    state.quesDetail = detail;
}), _defineProperty(_SET_PER_INFO$SET_REC, CHANGE_LOCAL_STATUS, function (state, index) {
    state.mailReceive[index].hasRead = !state.mailReceive[index].hasRead;
    // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
}), _defineProperty(_SET_PER_INFO$SET_REC, CHANGE_ALL_LOCAL_STATUS, function (state, index) {
    for (var i = 0; i < state.mailReceive.length; ++i) {
        state.mailReceive[i].hasRead = true;
    }
    // console.log("curr mail: "+index+JSON.stringify(state.mailReceive[index]))
}), _defineProperty(_SET_PER_INFO$SET_REC, DELETE_LOCAL_ALERT, function (state, index) {
    state.mailReceive.splice(index, 1);
}), _defineProperty(_SET_PER_INFO$SET_REC, DELETE_ALL_LOCAL_ALERT, function (state) {
    state.mailReceive.splice(0, state.mailReceive.length);
}), _defineProperty(_SET_PER_INFO$SET_REC, UPDATE_ASSET, function (state, data) {
    state.allDeals = data;
}), _SET_PER_INFO$SET_REC);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_QUESLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_COLLECT_QUESLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return SET_ATTEND_QUESLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return SET_PUBLISH_QUESLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return SET_DETAIL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return SET_LOCAL_COLLECTLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "h", function() { return DELETE_QUES_BY_INDEX; });
var _SET_QUESLIST$SET_COL;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_QUESLIST = 'SET_QUESLIST';
var SET_COLLECT_QUESLIST = 'SET_COLLECT_QUESLIST';
var SET_ATTEND_QUESLIST = 'SET_ATTEND_QUESLIST';
var SET_PUBLISH_QUESLIST = 'SET_PUBLISH_QUESLIST';
var SET_DETAIL = 'SET_DETAIL';
var SET_LOCAL_COLLECTLIST = 'SET_LOCAL_COLLECTLIST';
var DELETE_QUES_BY_INDEX = 'DELETE_QUES_BY_INDEX';
/* harmony default export */ __webpack_exports__["a"] = (_SET_QUESLIST$SET_COL = {}, _defineProperty(_SET_QUESLIST$SET_COL, SET_QUESLIST, function (state, list) {
    state.quesList = list;
    return true;
}), _defineProperty(_SET_QUESLIST$SET_COL, SET_COLLECT_QUESLIST, function (state, list) {
    state.collectQuesList = list;
    return true;
    // console.error(list)
}), _defineProperty(_SET_QUESLIST$SET_COL, SET_PUBLISH_QUESLIST, function (state, list) {
    state.publishQuesList = list;
    return true;
    // console.error(list)
}), _defineProperty(_SET_QUESLIST$SET_COL, SET_ATTEND_QUESLIST, function (state, list) {
    state.attendQuesList = list;
    return true;
    // console.error(list)
}), _defineProperty(_SET_QUESLIST$SET_COL, SET_DETAIL, function (state, detail) {
    state.quesDetail = detail;
    return true;
}), _defineProperty(_SET_QUESLIST$SET_COL, SET_LOCAL_COLLECTLIST, function (state, id) {
    var pos = state.collectQuesList.indexOf(id);
    if (pos != -1) {
        state.collectQuesList.splice(pos, 1);
    } else {
        state.collectQuesList.push(id);
    }
    return true;
}), _defineProperty(_SET_QUESLIST$SET_COL, DELETE_QUES_BY_INDEX, function (state, index) {
    state.quesList.splice(index, 1);
    return true;
}), _SET_QUESLIST$SET_COL);

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SET_ERRANDLIST; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SET_ATTEND_LIST; });
/* unused harmony export SET_DETAIL */
/* unused harmony export DELETE_FAVOR_BY_INDEX */
var _SET_ERRANDLIST$SET_D;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_ERRANDLIST = 'SET_ERRANDLIST';
var SET_ATTEND_LIST = 'SET_ATTEND_LIST';
var SET_DETAIL = 'SET_DETAIL';
var DELETE_FAVOR_BY_INDEX = 'DELETE_FAVOR_BY_INDEX';

/* harmony default export */ __webpack_exports__["a"] = (_SET_ERRANDLIST$SET_D = {}, _defineProperty(_SET_ERRANDLIST$SET_D, SET_ERRANDLIST, function (state, list) {
    state.errandList = list;
}), _defineProperty(_SET_ERRANDLIST$SET_D, SET_DETAIL, function (state, data) {
    state.errandDetail = data;
}), _defineProperty(_SET_ERRANDLIST$SET_D, SET_ATTEND_LIST, function (state, data) {
    state.attendErrandList = data;
}), _SET_ERRANDLIST$SET_D);

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util = {};
util.title = function (title) {
    title = title ? title : 'T.I.M.';
    window.document.title = title;
};

/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//此处用于处理页间路由，不同后缀进入不同页面

var routers = [{
    path: '/', //跳转页面
    meta: {
        title: 'T.I.M'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(90)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/sign', //登陆注册页面，登陆注册模块使用动态组件切换，参考知乎
    meta: {
        title: 'Sign'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(10).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(81)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/',
    component: function component(resolve) {
        return __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(91)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    },
    children: [{
        path: '/main',
        name: 'main',
        redirect: function redirect(to) {
            var id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID;
            return 'home';
        }
    }, {
        path: 'home',
        name: 'home',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(11).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(89)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'questionnaire',
        name: 'questionnaire',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(8).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(94)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'checkList/:type',
        name: 'checkList',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(15).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(84)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'questionnaire/createQuestionnaire', //check the user's receiveBox
        name: 'createQuestionnaire',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(87)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'questionnaire/filling', //check the user's receiveBox
        name: 'filling',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(14).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(88)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'favor',
        name: 'favor',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(7).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(96)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'favor/createFavor',
        name: 'createFavor',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(9).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(86)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'personal', //personal page
        name: 'personal',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(92)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'personal/attend', //personal page
        name: 'attend',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(83)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'personal/publish', //personal page
        name: 'publish',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(93)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'personal/collect', //personal page
        name: 'collect',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(85)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'personal/account', //personal page
        name: 'account',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(12).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(82)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }, {
        path: 'receiveBox', //check the user's receiveBox
        name: 'receiveBox',
        component: function component(resolve) {
            return __webpack_require__.e/* require */(13).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(95)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
        }
    }]
}];
/* harmony default export */ __webpack_exports__["a"] = (routers);

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_js__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__questionnaire_index_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__runFavor_index__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__home_index__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__personal_index__ = __webpack_require__(36);











__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
    state: {
        LogInfo: 0,
        activeNav: 0,
        navRightTags: undefined
    },
    actions: __WEBPACK_IMPORTED_MODULE_2__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_4__getters_js__["a" /* default */],
    modules: {
        Ques: __WEBPACK_IMPORTED_MODULE_5__questionnaire_index_js__["a" /* default */],
        Favor: __WEBPACK_IMPORTED_MODULE_6__runFavor_index__["a" /* default */],
        Home: __WEBPACK_IMPORTED_MODULE_7__home_index__["a" /* default */],
        Personal: __WEBPACK_IMPORTED_MODULE_8__personal_index__["a" /* default */]
    }
}));

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

    /**
 * Vue Cookies v1.5.13
 * https://github.com/cmp-cc/vue-cookies
 *
 * Copyright 2016, cmp-cc
 * Released under the MIT license
 */

(function() {

    var defaultConfig = {
        expires : '1d',
        path : '; path=/'
    }

    var VueCookies = {
        // install of Vue
        install: function(Vue) {
            Vue.prototype.$cookies = this
            Vue.cookies = this
        },
        config : function(expireTimes,path) {
            if(expireTimes) {
                defaultConfig.expires = expireTimes;
            }
            if(path) {
                defaultConfig.path = '; path=' + path;
            }
        },
        get: function(key) {
            var value = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null

            if(value && value.substring(0,1) === "{" && value.substring(value.length-1,value.length) === "}") {
                try {
                    value = JSON.parse(value)
                }catch (e) {
                    return value;
                }
            }
            return value;
        },
        set: function(key, value, expireTimes, path, domain, secure) {
            if (!key) {
                throw new Error("cookie name is not find in first argument")
            }else if(/^(?:expires|max\-age|path|domain|secure)$/i.test(key)){
                throw new Error("cookie key name illegality ,Cannot be set to ['expires','max-age','path','domain','secure']\t","current key name: "+key);
            }
            // support json object
            if(value && value.constructor === Object) {
                value = JSON.stringify(value);
            }
            var _expires = "";
            expireTimes = expireTimes === undefined ? defaultConfig.expires : expireTimes;
            if (expireTimes && expireTimes != 0) {
                switch (expireTimes.constructor) {
                    case Number:
                        if(expireTimes === Infinity || expireTimes === -1) _expires = "; expires=Fri, 31 Dec 9999 23:59:59 GMT";
                        else _expires = "; max-age=" + expireTimes;
                        break;
                    case String:
                        if (/^(?:\d{1,}(y|m|d|h|min|s))$/i.test(expireTimes)) {
                            // get capture number group
                            var _expireTime = expireTimes.replace(/^(\d{1,})(?:y|m|d|h|min|s)$/i, "$1");
                            // get capture type group , to lower case
                            switch (expireTimes.replace(/^(?:\d{1,})(y|m|d|h|min|s)$/i, "$1").toLowerCase()) {
                                // Frequency sorting
                                case 'm':  _expires = "; max-age=" + +_expireTime * 2592000; break; // 60 * 60 * 24 * 30
                                case 'd':  _expires = "; max-age=" + +_expireTime * 86400; break; // 60 * 60 * 24
                                case 'h': _expires = "; max-age=" + +_expireTime * 3600; break; // 60 * 60
                                case 'min':  _expires = "; max-age=" + +_expireTime * 60; break; // 60
                                case 's': _expires = "; max-age=" + _expireTime; break;
                                case 'y': _expires = "; max-age=" + +_expireTime * 31104000; break; // 60 * 60 * 24 * 30 * 12
                                default: new Error("unknown exception of 'set operation'");
                            }
                        } else {
                            _expires = "; expires=" + expireTimes;
                        }
                        break;
                    case Date:
                        _expires = "; expires=" + expireTimes.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + _expires + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : defaultConfig.path) + (secure ? "; secure" : "");
            return this;
        },
        remove: function(key, path, domain) {
            if (!key || !this.isKey(key)) {
                return false;
            }
            document.cookie = encodeURIComponent(key) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : defaultConfig.path);
            return this;
        },
        isKey: function(key) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(key).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys:  function() {
            if(!document.cookie) return [];
            var _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var _index = 0; _index < _keys.length; _index++) {
                _keys[_index] = decodeURIComponent(_keys[_index]);
            }
            return _keys;
        }
    }

    if (true) {
        module.exports = VueCookies;
    } else if (typeof define == "function" && define.amd) {
        define([], function() {
            return VueCookies;
        })
    } else if (window.Vue) {
        Vue.use(VueCookies);
    }
    // vue-cookies can exist independently,no dependencies library
    if(typeof window!=="undefined"){
        window.$cookies = VueCookies;
    }

})()


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(74)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(80),
  /* scopeId */
  "data-v-cf2b295c",
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\app.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] app.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cf2b295c", Component.options)
  } else {
    hotAPI.reload("data-v-cf2b295c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 34 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_js__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_js__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__getters_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__fill_fill_js__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__check_check_js__ = __webpack_require__(67);








__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var Ques = {
    namespaced: true,
    state: {
        username: '',
        quesList: [],
        quesDetail: {
            Infos: { "招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00' },
            quesid: 0, number: 0, publisherName: 'suata', head: '../../static/jump/social.png', title: '大学生心理健康调查', content: '关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', command: '在校大学生', price: 10
        },
        collectQuesList: [],
        attendQuesList: [],
        publishQuesList: []
    },
    actions: __WEBPACK_IMPORTED_MODULE_2__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_4__getters_js___default.a,
    modules: {
        createQues: {
            namespaced: true,
            state: {
                formValidate: {
                    detail: '',
                    command: '',
                    reward: 0,
                    quantity: 0,
                    info: [],
                    startdate: '',
                    starttime: '',
                    enddate: '',
                    endtime: '',
                    number: 0
                },
                formContent: {
                    title: 'aaaaaaaa',
                    number: 2,
                    tians: [{ mode: 1, theorder: 1, title: '试试', fill: false }],
                    xuans: [{ mode: 2, theorder: 2, title: '试试', choose: 1, choices: ['选项1', '选项2'], fill: false }]
                },
                questions: [{ mode: 1, theorder: 1, tianID: 1, title: '试试', fill: false }, { mode: 2, theorder: 2, title: '试试', xuanID: 1, choose: 1, choices: ['选项1', '选项2'], fill: false }]
            },
            actions: {},
            mutations: {
                SET_VALIDATE: function SET_VALIDATE(state, formValidate) {
                    state.formValidate = formValidate;
                    // 传到服务器
                    // commit('')
                    // commit(COMMIT_QUES, formValidate)
                },
                SET_CONTENT: function SET_CONTENT(state, content) {
                    state.formContent = content;
                },
                CLEAR: function CLEAR(state) {
                    state.formContent = {
                        title: 'aaaaaaaa',
                        number: 2,
                        fillings: [{ mode: 1, theorder: 1, tianID: 1, title: '试试', fill: false }],
                        chooses: [{ mode: 2, theorder: 2, xuanID: 1, title: '试试', choose: 1, choices: ['选项1', '选项2'], fill: false }]
                    };
                    state.formValidate = {
                        detail: '',
                        command: '',
                        reward: 0,
                        quantity: 0,
                        info: [],
                        startdate: '',
                        starttime: '',
                        enddate: '',
                        endtime: '',
                        number: 0
                    };
                }
            }
        },
        fillQues: __WEBPACK_IMPORTED_MODULE_5__fill_fill_js__["a" /* default */],
        checkQues: __WEBPACK_IMPORTED_MODULE_6__check_check_js__["a" /* default */]
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Ques);

/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_js__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__getters_js__);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var Personal = {
    namespaced: true,
    state: {
        personalInfo: {
            nickname: 'Yezo',
            id: 0,
            gender: 0,
            email: '123',
            phone: '123',
            qq: '123',
            university: '123',
            major: '123',
            grade: '123',
            studentId: '',
            payaccount: '',
            wechat: 'wechat',
            credit: 3,
            assst: 0

        },
        quesDetail: {
            infos: { "招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00' },
            quesid: 0,
            number: 0,
            publisher: 'suata',
            head: '../../static/jump/social.png',
            title: '大学生心理健康调查',
            content: '关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
            command: '在校大学生',
            price: 10
        },
        publishing: [],
        attending: [],
        starring: [],
        mailReceive: [],
        allDeals: []
    },
    actions: __WEBPACK_IMPORTED_MODULE_2__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_4__getters_js___default.a
};

/* harmony default export */ __webpack_exports__["a"] = (Personal);

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_js__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_js__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__getters_js__);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var Favor = {
    namespaced: true,
    state: {
        username: '',
        errandList: [],
        errandDetail: {},
        attendErrandList: [],
        publishErrandList: []
    },
    actions: __WEBPACK_IMPORTED_MODULE_2__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_4__getters_js___default.a,
    modules: {
        createFavor: {
            namespaced: true,
            state: {
                favorContent: {
                    title: '',
                    date: '',
                    time: '',
                    place: '',
                    event: '',
                    reward: 0,
                    deposit: 0,
                    quantity: 0
                }
            },
            actions: {},
            mutations: {
                SET_CONTENT: function SET_CONTENT(state, content) {
                    state.favorContent = content;
                },
                CLEAR: function CLEAR(state) {
                    state.favorContent = {
                        title: '',
                        date: '',
                        time: '',
                        place: '',
                        event: '',
                        reward: 0,
                        deposit: 0,
                        quantity: 0
                    };
                }
            }
        }
    }
};

/* harmony default export */ __webpack_exports__["a"] = (Favor);

/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__actions_js__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mutations_js__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__getters_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__getters_js__);






__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);

var Home = {
    namespaced: true,
    state: {
        rankList: [],
        advertises: []
    },
    actions: __WEBPACK_IMPORTED_MODULE_2__actions_js__["a" /* default */],
    mutations: __WEBPACK_IMPORTED_MODULE_3__mutations_js__["a" /* default */],
    getters: __WEBPACK_IMPORTED_MODULE_4__getters_js___default.a
};

/* harmony default export */ __webpack_exports__["a"] = (Home);

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var bind = __webpack_require__(15);
var Axios = __webpack_require__(41);
var mergeConfig = __webpack_require__(13);
var defaults = __webpack_require__(14);

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(10);
axios.CancelToken = __webpack_require__(40);
axios.isCancel = __webpack_require__(11);

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(53);

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(10);

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var buildURL = __webpack_require__(16);
var InterceptorManager = __webpack_require__(42);
var dispatchRequest = __webpack_require__(43);
var mergeConfig = __webpack_require__(13);

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);
  config.method = config.method ? config.method.toLowerCase() : 'get';

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);
var transformData = __webpack_require__(46);
var isCancel = __webpack_require__(11);
var defaults = __webpack_require__(14);
var isAbsoluteURL = __webpack_require__(49);
var combineURLs = __webpack_require__(47);

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(12);

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(0);

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

module.exports = function isBuffer (obj) {
  return obj != null && obj.constructor != null &&
    typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            isRouterAlive: true
        };
    },
    provide: function provide() {
        return {
            reload: this.reload
        };
    },
    mounted: function mounted() {
        // console.log(window.sessionStorage.getItem('LogInfo'))
    },
    created: function created() {},
    beforeDestroy: function beforeDestroy() {},

    methods: {
        reload: function reload() {
            this.isRouterAlive = false;
            this.$nextTick(function () {
                this.isRouterAlive = true;
            });
        }
    }
});

/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getErrandList;
/* harmony export (immutable) */ __webpack_exports__["b"] = createErrand;
/* harmony export (immutable) */ __webpack_exports__["e"] = closeErrand;
/* unused harmony export deleteErrand */
/* harmony export (immutable) */ __webpack_exports__["d"] = attendErrand;
/* unused harmony export confirmErrand */
/* harmony export (immutable) */ __webpack_exports__["c"] = getAttendUserList;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service_js__ = __webpack_require__(4);


/**
 * Get all the questionnaires and show on the index
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getErrandList() {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/errands/proceed/all');
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {Json} data
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function createErrand(data) {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/errands/publish', data);
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function closeErrand(id) {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/closeErra/' + id);
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function deleteErrand(id) {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/deleteErra/' + id);
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} erraid
 * @param {int} userid
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function attendErrand(eid, uid) {
  console.error(eid + " " + uid);
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/participate/' + eid + '/' + uid);
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} erraid
 * @param {int} userid
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function confirmErrand(eid, uid) {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/confirm/' + eid + '/' + uid);
  // //(JSON.stringify(response.data))
  return response.data;
}

/**
 * Get all the questionnaires and show on the index
 * @param {int} id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAttendUserList(id) {
  var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/allParticipant/' + id);
  // //(JSON.stringify(response.data))
  return response.data;
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getPersonalInfo;
/* harmony export (immutable) */ __webpack_exports__["b"] = setPersonalInfo;
/* harmony export (immutable) */ __webpack_exports__["c"] = getPublishing;
/* harmony export (immutable) */ __webpack_exports__["d"] = getAttending;
/* harmony export (immutable) */ __webpack_exports__["e"] = getStarring;
/* unused harmony export getDetail */
/* harmony export (immutable) */ __webpack_exports__["f"] = getAlerts;
/* harmony export (immutable) */ __webpack_exports__["g"] = changeAlertStatusById;
/* harmony export (immutable) */ __webpack_exports__["h"] = changeAllAlertStatus;
/* harmony export (immutable) */ __webpack_exports__["i"] = deleteAlertById;
/* harmony export (immutable) */ __webpack_exports__["j"] = deleteAllAlerts;
/* harmony export (immutable) */ __webpack_exports__["m"] = getAllDeals;
/* harmony export (immutable) */ __webpack_exports__["k"] = rechargeAsset;
/* harmony export (immutable) */ __webpack_exports__["l"] = withdrawAsset;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service_js__ = __webpack_require__(4);


/**
 * Get the personal informatin by userid
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getPersonalInfo() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/user'); //!!!这里要改动 axios实例名为service
    ////(response)
    return response.data;
}

async function setPersonalInfo(data) {
    //("setthe Info :" + JSON.stringify(data))
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].put('/user', data);
    return response.data;
}

//get the list of the publishing tasks by cookies
async function getPublishing() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/user/publish/all');
    return response.data;
}

/**
 * Get the list of the attending tasks by cookies
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAttending() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/user/fill/all');
    return response.data;
}

/**
 * Get the list of the starring questionnaire by id
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getStarring() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('user/collect/all');
    return response.data;
}

async function getDetail(id) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/questionnaires/' + id);
    // //(JSON.stringify(response))
    return response.data;
}

/**
 * Get the list of the alert information
 * @param {int} id the id of the target user
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function getAlerts(id) {
    // let response = await axios.get('/', id)
    // return response.data
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/notifications/all');
    return response.data;
}

/**
 * Set the status of the alert default
 * @param {int} id the id of the alert
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function changeAlertStatusById(data) {
    var response = __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].put('/notifications', data);
    return response.data;
}

/**
 * Set the status of the alert default
 * @param {int} id the id of the alert
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function changeAllAlertStatus() {
    var response = __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].put('/notifications/all/' + true);
    return response.data;
}

/**
 * Delete all the alerts by userid
 * @param {int} id the target user's id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function deleteAlertById(data) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].delete('/notifications', { data: data });
    return response.data;
}

/**
 * Delete all the alerts by userid
 * @param {int} id the target user's id
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

async function deleteAllAlerts() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].delete('/notifications/all');
    return response.data;
}

/**
 * get all the log of the user's deals 
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

async function getAllDeals() {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].get('/user/asset/all');
    //(response.msg)
    return response.data;
}

/**
 * recharge your account
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */
async function rechargeAsset(paymentAbout) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/money', paymentAbout);
    ////(response.data)
    return response;
}

/**
 * get all the log of the user's deals 
 * @return {Promise}
 * Promise will return the data of the questionnaires
 */

async function withdrawAsset(paymentAbout) {
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/money', paymentAbout);
    ////(response.data)
    return response;
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = login;
/* harmony export (immutable) */ __webpack_exports__["b"] = userRegister;
/* harmony export (immutable) */ __webpack_exports__["c"] = sendIndentify;
/* harmony export (immutable) */ __webpack_exports__["d"] = checkIndentify;
/* harmony export (immutable) */ __webpack_exports__["e"] = sendIndentify2;
/* harmony export (immutable) */ __webpack_exports__["f"] = checkIndentify2;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_service_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_qs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_qs__);




/**
 * Login with a post to login url with the data {username, password}.
 * @param {string} username The username of the user.
 * Should be phone or email judged by frontend
 * @param {string} password The password of the user.
 * @param {string} mode The mode of new user.
 * @return {Promise}
 * Promise will return the json data with success and message 
 */
async function login(username, password, mode) {
    var data = {};
    if (mode === 'phone') data = { "phone": username, "password": password };else data = { "email": username, "password": password };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/login', data);

    // fetch("http://172.26.70.9:8080/login", {
    //     type:"cors",
    //     credentials:"include",
    //     method: "post",
    //     headers: {  
    //         "Content-Type": "application/json;charset=UTF-8"
    //       },
    //     body: JSON.stringify(data)
    // })
    // .then(response => {
    //     response.text().then(res => {
    //         //(res)
    //     })
    // })

    //('response:' + JSON.stringify(response))
    return response.data;
}

/**
 * Reserved API for new user's registration.
 * Register with a post to register url with the data {username, password}.
 * @param {string} username The username of new user.
 * Should be email or phone judged by frontend
 * @param {string} password The password of new user.
 * @param {string} mode The mode of new user.
 * @return {Promise}
 * Promise will return the json data with success and message
 */
async function userRegister(username, password, mode) {
    var data = {};
    if (mode === 'phone') data = { "phone": username, "password": password };else data = { "email": username, "password": password };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/register', data);
    //(response.data)
    return response.data;
}

// use in sign in
async function sendIndentify(username, mode) {
    var data = {};
    if (mode === 'phone') data = { "phone_or_email": 0, "target": username, "type": 0 };else data = { "phone_or_email": 1, "target": username, "type": 0 };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/code', data);
    //(response.data)
    return response.data;
}

async function checkIndentify(username, mode, inputCode) {
    var data = {};
    if (mode === 'phone') data = { "phone_or_email": 0, "target": username, "code": inputCode //code is string
    };else data = { "phone_or_email": 1, "target": username, "code": inputCode };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/code/verify', data);
    //(response.data)
    return response.data;
}

// use in find pass 

async function sendIndentify2(username, mode) {
    var data = {};
    if (mode === 'phone') data = { "phone_or_email": 0, "target": username, "type": 1 };else data = { "phone_or_email": 1, "target": username, "type": 1 };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/code', data);
    //(response.data)
    return response.data;
}

async function checkIndentify2(username, mode, inputCode) {
    var data = {};
    if (mode === 'phone') data = { "phone_or_email": 0, "target": username, "code": inputCode //code is string
    };else data = { "phone_or_email": 1, "target": username, "code": inputCode };
    var response = await __WEBPACK_IMPORTED_MODULE_1__util_service_js__["a" /* default */].post('/code/verify', data);
    //(response.data)
    return response.data;
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iview__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_iview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_router__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_util__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_vue__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_animate_css__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_animate_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_animate_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__store_index_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_cookies__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_vue_cookies___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_vue_cookies__);













__WEBPACK_IMPORTED_MODULE_0_vue__["default"].prototype.$http = __WEBPACK_IMPORTED_MODULE_10_axios___default.a;
__WEBPACK_IMPORTED_MODULE_10_axios___default.a.defaults.withCredentials = true;

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_8_vuex__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_iview___default.a);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_11_vue_cookies___default.a);
__webpack_require__(30);

// 路由配置
var RouterConfig = {
    mode: 'history',
    routes: __WEBPACK_IMPORTED_MODULE_3__router_router__["a" /* default */],
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
        // return { x: 0, y: 0 }
    }
};
var router = new __WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */](RouterConfig);

router.beforeEach(function (to, from, next) {
    __WEBPACK_IMPORTED_MODULE_1_iview___default.a.LoadingBar.start();
    __WEBPACK_IMPORTED_MODULE_4__libs_util__["a" /* default */].title(to.meta.title);
    next();
});

router.afterEach(function (to, from, next) {
    __WEBPACK_IMPORTED_MODULE_1_iview___default.a.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new __WEBPACK_IMPORTED_MODULE_0_vue__["default"]({
    el: '#app',
    router: router,
    store: __WEBPACK_IMPORTED_MODULE_9__store_index_js__["a" /* default */],
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_5__app_vue___default.a);
    }
});

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SIGN_IN */
/* unused harmony export SIGN_UP */
/* unused harmony export MESSAGE */
/* unused harmony export SEND_IDENTIFY */
/* unused harmony export CHECK_IDENTIFY */
/* unused harmony export SEND_IDENTIFY2 */
/* unused harmony export CHECK_IDENTIFY2 */
/* unused harmony export DELETE_CACHE */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_user__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_system__ = __webpack_require__(17);
var _SIGN_IN$SIGN_UP$MESS;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SIGN_IN = 'SIGN_IN';
var SIGN_UP = 'SIGN_UP';
var MESSAGE = 'MESSAGE';
var SEND_IDENTIFY = 'SEND_IDENTIFY';
var CHECK_IDENTIFY = 'CHECK_IDENTIFY';
var SEND_IDENTIFY2 = 'SEND_IDENTIFY2';
var CHECK_IDENTIFY2 = 'CHECK_IDENTIFY2';
var DELETE_CACHE = 'DELETE_CACHE';

/* harmony default export */ __webpack_exports__["a"] = (_SIGN_IN$SIGN_UP$MESS = {}, _defineProperty(_SIGN_IN$SIGN_UP$MESS, SIGN_IN, function (_ref, info) {
    var commit = _ref.commit,
        state = _ref.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["a" /* login */](info.username, info.password, info.mode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, SIGN_UP, function (_ref2, info) {
    var commit = _ref2.commit,
        state = _ref2.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["b" /* userRegister */](info.username, info.password, info.mode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, MESSAGE, function (_ref3, data) {
    var commit = _ref3.commit,
        state = _ref3.state;

    var send = [{
        toId: data.toId,
        fromId: data.fromId,
        hasRead: false,
        title: '',
        content: ''
    }];
    //('消息：' + data.type)
    if (data.type === 'fill') {
        send[0].title = '有人填你的问卷啦！';
        send[0].content = '<' + data.fromName + '>已填写问卷' + '《' + data.quesTitle + '》';
        //('消息：' + JSON.stringify(send))
    }
    //('消息：' + JSON.stringify(send))
    return __WEBPACK_IMPORTED_MODULE_2__api_system__["b" /* sendMessage */](send);
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, SEND_IDENTIFY, function (_ref4, info) {
    var commit = _ref4.commit,
        state = _ref4.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["c" /* sendIndentify */](info.username, info.mode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, CHECK_IDENTIFY, function (_ref5, info) {
    var commit = _ref5.commit,
        state = _ref5.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["d" /* checkIndentify */](info.username, info.mode, info.inputCode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, SEND_IDENTIFY2, function (_ref6, info) {
    var commit = _ref6.commit,
        state = _ref6.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["e" /* sendIndentify2 */](info.username, info.mode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, CHECK_IDENTIFY2, function (_ref7, info) {
    var commit = _ref7.commit,
        state = _ref7.state;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_user__["f" /* checkIndentify2 */](info.username, info.mode, info.inputCode);
    return res;
}), _defineProperty(_SIGN_IN$SIGN_UP$MESS, DELETE_CACHE, function (_ref8) {
    var commit = _ref8.commit,
        state = _ref8.state;

    return __WEBPACK_IMPORTED_MODULE_2__api_system__["c" /* deleteCache */]();
}), _SIGN_IN$SIGN_UP$MESS);

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// let subsystemNameMap = {
//   ques: '问卷',
//   run: '跑腿'
// }

/* harmony default export */ __webpack_exports__["a"] = ({});

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GET_RANKLIST */
/* unused harmony export GET_ADVERTISES */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_system_js__ = __webpack_require__(17);
var _GET_RANKLIST$GET_ADV;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var GET_RANKLIST = 'GET_RANKLIST';
var GET_ADVERTISES = 'GET_ADVERTISES';
// export const GET_RANKLIST = 'GET_RANKLIST'

/* harmony default export */ __webpack_exports__["a"] = (_GET_RANKLIST$GET_ADV = {}, _defineProperty(_GET_RANKLIST$GET_ADV, GET_RANKLIST, function (_ref) {
  var commit = _ref.commit;

  // let data = [
  //     {name: '问卷问卷1问卷问卷问卷', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'},
  //     {name: '问卷1', price: "￥12", url:'www.baidu.com'}
  // ]  
  return __WEBPACK_IMPORTED_MODULE_1__api_system_js__["a" /* getTopTen */]().then(function (data) {
    commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["b" /* SET_RANKLIST */], data);
  });
  commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["b" /* SET_RANKLIST */], data);
}), _defineProperty(_GET_RANKLIST$GET_ADV, GET_ADVERTISES, function (_ref2) {
  var commit = _ref2.commit;

  var data = [{ name: 'adver1', src: '../../static/home/adver1.jpg' }, { name: 'adver2', src: '../../static/home/adver2.jpg' }, { name: 'adver3', src: '../../static/home/adver3.jpg' }, { name: 'adver4', src: '../../static/home/adver4.jpg' }];
  commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["c" /* SET_ADVERTISES */], data);
  // systemAPI.getTopTen().then((data) =>{
  //     commit(mutations.SET_ADVERTISES, data)
  // })
}), _GET_RANKLIST$GET_ADV);

/***/ }),
/* 63 */
/***/ (function(module, exports) {



/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GET_INFO */
/* unused harmony export UPDATE_INFO */
/* unused harmony export GET_PUBLISH */
/* unused harmony export GET_ATTEND */
/* unused harmony export GET_STAR */
/* unused harmony export GET_ALERTS */
/* unused harmony export GET_DETAIL */
/* unused harmony export CHANGE_STATUS */
/* unused harmony export CHANGE_ALL_STATUS */
/* unused harmony export DELETE_ALERT */
/* unused harmony export DELETE_ALL_ALERTS */
/* unused harmony export RECHARGE_ASSET */
/* unused harmony export WITHDRAW_ASSET */
/* unused harmony export GET_ASSET */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations_js__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_personal_js__ = __webpack_require__(57);
var _GET_INFO$UPDATE_INFO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var GET_INFO = 'GET_INFO';
var UPDATE_INFO = 'UPDATE_INFO';
var GET_PUBLISH = 'GET_PUBLISH';
var GET_ATTEND = 'GET_ATTEND';
var GET_STAR = 'GET_STAR';
var GET_ALERTS = 'GET_ALERTS';
var GET_DETAIL = 'GET_DETAIL';
var CHANGE_STATUS = 'CHANGE_STATUS';
var CHANGE_ALL_STATUS = 'CHANGE_ALL_STATUS';
var DELETE_ALERT = 'DELETE_ALERT';
var DELETE_ALL_ALERTS = 'DELETE_ALL_ALERTS';
var RECHARGE_ASSET = 'RECHARGE_ASSET';
var WITHDRAW_ASSET = 'WITHDRAW_ASSET';
var GET_ASSET = 'GET_ASSET';

/* harmony default export */ __webpack_exports__["a"] = (_GET_INFO$UPDATE_INFO = {}, _defineProperty(_GET_INFO$UPDATE_INFO, GET_INFO, function (_ref) {
    var commit = _ref.commit;

    return __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["a" /* getPersonalInfo */]().then(function (info) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["b" /* SET_PER_INFO */], info.data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, UPDATE_INFO, function (_ref2) {
    var state = _ref2.state,
        commit = _ref2.commit;

    var data = state.personalInfo;
    //("data in actions:" + data);
    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["b" /* setPersonalInfo */](data).then(function (info) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["b" /* SET_PER_INFO */], data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_PUBLISH, function (_ref3) {
    var commit = _ref3.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["c" /* getPublishing */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["c" /* SET_PUBLISHING */], response.data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_ATTEND, function (_ref4) {
    var commit = _ref4.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["d" /* getAttending */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["d" /* SET_ATTENDING */], response.data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_STAR, function (_ref5) {
    var commit = _ref5.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["e" /* getStarring */]().then(function (response) {
        // //('噢噢'+JSON.stringify(response.data))
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["e" /* SET_STARRING */], response.data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_DETAIL, function (_ref6, id) {
    var commit = _ref6.commit;

    // //('123456789')
    quesAPI.getDetail(id).then(function (info) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["f" /* SET_DETAIL */], info.data);
    });
    // //(data)
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_ALERTS, function (_ref7, id) {
    var commit = _ref7.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["f" /* getAlerts */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["g" /* SET_RECEIVE */], response.data);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, CHANGE_STATUS, function (_ref8, index) {
    var state = _ref8.state,
        commit = _ref8.commit;

    var data = [{
        id: state.mailReceive[index].id,
        toId: state.mailReceive[index].toId,
        fromId: state.mailReceive[index].fromId,
        date: state.mailReceive[index].date,
        hasRead: !state.mailReceive[index].hasRead,
        title: state.mailReceive[index].title,
        content: state.mailReceive[index].content
    }];
    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["g" /* changeAlertStatusById */](data).then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["h" /* CHANGE_LOCAL_STATUS */], index);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, CHANGE_ALL_STATUS, function (_ref9) {
    var state = _ref9.state,
        commit = _ref9.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["h" /* changeAllAlertStatus */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["i" /* CHANGE_ALL_LOCAL_STATUS */]);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, DELETE_ALERT, function (_ref10, index) {
    var state = _ref10.state,
        commit = _ref10.commit;

    var data = [{
        id: state.mailReceive[index].id,
        toId: state.mailReceive[index].toId
    }];
    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["i" /* deleteAlertById */](data).then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["j" /* DELETE_LOCAL_ALERT */], index);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, DELETE_ALL_ALERTS, function (_ref11) {
    var state = _ref11.state,
        commit = _ref11.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["j" /* deleteAllAlerts */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["k" /* DELETE_ALL_LOCAL_ALERT */]);
    });
}), _defineProperty(_GET_INFO$UPDATE_INFO, RECHARGE_ASSET, function (_ref12, paymentAbout) {
    var state = _ref12.state,
        commit = _ref12.commit;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["k" /* rechargeAsset */](paymentAbout);
    //(res);
    return res;
}), _defineProperty(_GET_INFO$UPDATE_INFO, WITHDRAW_ASSET, function (_ref13, paymentAbout) {
    var state = _ref13.state,
        commit = _ref13.commit;

    var res = __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["l" /* withdrawAsset */](paymentAbout);
    //(res);
    return res;
}), _defineProperty(_GET_INFO$UPDATE_INFO, GET_ASSET, function (_ref14) {
    var state = _ref14.state,
        commit = _ref14.commit;

    __WEBPACK_IMPORTED_MODULE_1__api_personal_js__["m" /* getAllDeals */]().then(function (response) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations_js__["l" /* UPDATE_ASSET */], response.data);
    });
}), _GET_INFO$UPDATE_INFO);

/***/ }),
/* 65 */
/***/ (function(module, exports) {



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GET_QUESLIST */
/* unused harmony export GET_COLLECT_QUESLIST */
/* unused harmony export GET_ATTEND_QUESLIST */
/* unused harmony export GET_PUBLISH_QUESLIST */
/* unused harmony export GET_DETAIL */
/* unused harmony export CREATE_QUES */
/* unused harmony export CLOSE_QUES */
/* unused harmony export DELETE_QUES */
/* unused harmony export CHANGE_COLLECT */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_date_js__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_question_js__ = __webpack_require__(7);
var _GET_QUESLIST$GET_COL;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var GET_QUESLIST = 'GET_QUESLIST';
var GET_COLLECT_QUESLIST = 'GET_COLLECT_QUESLIST';
var GET_ATTEND_QUESLIST = 'GET_ATTEND_QUESLIST';
var GET_PUBLISH_QUESLIST = 'GET_PUBLISH_QUESLIST';
var GET_DETAIL = 'GET_DETAIL';
var CREATE_QUES = 'CREATE_QUES';
var CLOSE_QUES = 'CLOSE_QUES';
var DELETE_QUES = 'DELETE_QUES';
var CHANGE_COLLECT = 'CHANGE_COLLECT';
// export const GET_RANKLIST = 'GET_RANKLIST'


function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp + 8 * 60 * 60;
    //(timestamp)
    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
}

/* harmony default export */ __webpack_exports__["a"] = (_GET_QUESLIST$GET_COL = {}, _defineProperty(_GET_QUESLIST$GET_COL, GET_QUESLIST, function (_ref) {
    var commit = _ref.commit;

    __WEBPACK_IMPORTED_MODULE_2__api_question_js__["e" /* getQuesList */]().then(function (info) {
        if (info.success) commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["b" /* SET_QUESLIST */], info.data);
    });
}), _defineProperty(_GET_QUESLIST$GET_COL, GET_COLLECT_QUESLIST, function (_ref2) {
    var commit = _ref2.commit;

    __WEBPACK_IMPORTED_MODULE_2__api_question_js__["f" /* getCollectQuesList */]().then(function (info) {
        if (info.success) {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["c" /* SET_COLLECT_QUESLIST */], info.data);
        }
        // console.error(JSON.stringify(info))
    });
}), _defineProperty(_GET_QUESLIST$GET_COL, GET_ATTEND_QUESLIST, function (_ref3) {
    var commit = _ref3.commit;

    __WEBPACK_IMPORTED_MODULE_2__api_question_js__["g" /* getAttendQuesList */]().then(function (info) {
        if (info.success) {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["d" /* SET_ATTEND_QUESLIST */], info.data);
        }
        // console.error(JSON.stringify(info))
    });
}), _defineProperty(_GET_QUESLIST$GET_COL, GET_PUBLISH_QUESLIST, function (_ref4) {
    var commit = _ref4.commit;

    __WEBPACK_IMPORTED_MODULE_2__api_question_js__["h" /* getPublishQuesList */]().then(function (info) {
        if (info.success) {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["e" /* SET_PUBLISH_QUESLIST */], info.data);
        }
        // console.error(JSON.stringify(info))
    });
}), _defineProperty(_GET_QUESLIST$GET_COL, GET_DETAIL, function (_ref5, id) {
    var commit = _ref5.commit;

    // //('123456789')
    __WEBPACK_IMPORTED_MODULE_2__api_question_js__["i" /* getDetail */](id).then(function (info) {
        commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["f" /* SET_DETAIL */], info.data);
    });
    // //(data)
}), _defineProperty(_GET_QUESLIST$GET_COL, CREATE_QUES, function (_ref6, data) {
    var commit = _ref6.commit;


    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();

    var start = new Date(data.formValidate.startdate).toLocaleDateString().replace(/\//g, '-') + " " + data.formValidate.starttime;
    var end = new Date(data.formValidate.enddate).toLocaleDateString().replace(/\//g, '-') + " " + data.formValidate.endtime;

    var format = {
        "title": data.formContent.title,
        "detail": data.formValidate.detail,
        "publisher": JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
        "reward": data.formValidate.reward,
        "command": data.formValidate.command,
        "number": data.formContent.number,
        "Infos": {
            "total": data.formValidate.quantity,
            "attend": 0,
            "createTime": currentdate,
            // "startTime":data.formValidate.startdate.slice(0, data.formValidate.startdate.indexOf('T'))+' '+data.formValidate.starttime,
            // "endTime": data.formValidate.enddate.slice(0, data.formValidate.enddate.indexOf('T'))+' '+data.formValidate.endtime
            "startTime": start,
            "endTime": end
        },
        "tians": data.formContent.tians,
        "xuans": data.formContent.xuans
        //(format)
    };__WEBPACK_IMPORTED_MODULE_2__api_question_js__["j" /* createQues */](format).then(function (info) {});
}), _defineProperty(_GET_QUESLIST$GET_COL, CHANGE_COLLECT, function (_ref7, id) {
    var state = _ref7.state,
        commit = _ref7.commit;

    if (state.collectQuesList.indexOf(id) != -1) {
        __WEBPACK_IMPORTED_MODULE_2__api_question_js__["k" /* cancelCollectQues */](id).then(function (info) {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["g" /* SET_LOCAL_COLLECTLIST */], id);
        });
    } else {
        __WEBPACK_IMPORTED_MODULE_2__api_question_js__["l" /* collectQues */](id).then(function (info) {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["g" /* SET_LOCAL_COLLECTLIST */], id);
        });
    }
}), _defineProperty(_GET_QUESLIST$GET_COL, CLOSE_QUES, function (_ref8, data) {
    var state = _ref8.state,
        commit = _ref8.commit;

    return __WEBPACK_IMPORTED_MODULE_2__api_question_js__["m" /* closeQues */](data.id).then(function (info) {
        if (data.source == 'ques') {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["h" /* DELETE_QUES_BY_INDEX */], data.index);
        }
    });
}), _defineProperty(_GET_QUESLIST$GET_COL, DELETE_QUES, function (_ref9, data) {
    var state = _ref9.state,
        commit = _ref9.commit;

    return __WEBPACK_IMPORTED_MODULE_2__api_question_js__["n" /* deleteQues */](data.id).then(function (info) {
        if (data.source == 'ques') {
            commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["h" /* DELETE_QUES_BY_INDEX */], data.index);
        }
    });
}), _GET_QUESLIST$GET_COL);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_question_js__ = __webpack_require__(7);




__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
var checkQues = {
    namespaced: true,
    state: {
        formContent: {
            title: '',
            questions: []
        },
        answers: {},
        rules: {},
        anslist: []
    },
    mutations: {
        SET_QUES_CONTENT: function SET_QUES_CONTENT(state, content) {
            state.formContent = content;
        },
        SET_ANS_LIST: function SET_ANS_LIST(state, list) {
            state.anslist = list;
            // console.error(state.anslist)
        },
        SET_ANS: function SET_ANS(state, data) {
            var t = 0;
            var x = 0;
            for (var key in state.answers) {
                if (typeof state.answers[key] == 'string') {
                    state.answers[key] = data.tiankong[t];
                    t++;
                } else {
                    state.answers[key] = data.xuanze[x].split(',');
                    x++;
                }
            }
        },
        SET_QUES_ANSWERS: function SET_QUES_ANSWERS(state, formContent) {
            var answers = {};
            for (var i = 0; i < formContent.questions.length; ++i) {
                var name = 'answer' + String(i + 1);
                if (formContent.questions[i].mode === 1) {
                    answers[name] = '';
                } else {
                    answers[name] = [];
                }
            }
            state.answers = answers;
        }
    },
    actions: {
        GET_QUES: function GET_QUES(_ref, id) {
            var commit = _ref.commit;


            __WEBPACK_IMPORTED_MODULE_2__api_question_js__["a" /* getQuesContent */](id).then(function (response) {
                if (response.success) {
                    commit('SET_QUES_CONTENT', response.formContent);
                    commit('SET_QUES_ANSWERS', response.formContent);
                } else {
                    alert("获取问卷失败请稍后重试");
                }
            });
        },
        GET_ANS_LIST: function GET_ANS_LIST(_ref2, quesid) {
            var commit = _ref2.commit;


            __WEBPACK_IMPORTED_MODULE_2__api_question_js__["b" /* getAnsListByQuesId */](quesid).then(function (response) {
                if (response.success) {
                    commit('SET_ANS_LIST', response.data);
                } else {
                    alert("获取填写情况失败请稍后重试");
                }
            });
        },
        GET_ANS: function GET_ANS(_ref3, data) {
            var commit = _ref3.commit;

            __WEBPACK_IMPORTED_MODULE_2__api_question_js__["c" /* getAnsByQUId */](data.quesid, data.userid).then(function (response) {
                if (response.success) {
                    commit('SET_ANS', response.data);
                } else {
                    alert("获取填写情况失败请稍后重试");
                }
            });
        }
    },
    getters: {
        formContent: function formContent(state, getters) {
            return state.formContent;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (checkQues);

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__api_question_js__ = __webpack_require__(7);




function getTime() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
var fillQues = {
    namespaced: true,
    state: {
        formContent: {
            title: '',
            questions: []
        },
        answers: {},
        rules: {}
    },
    mutations: {
        SET_QUES_CONTENT: function SET_QUES_CONTENT(state, content) {
            state.formContent = content;
        },
        SET_QUES_ANSWERS: function SET_QUES_ANSWERS(state, formContent) {
            var answers = {};
            for (var i = 0; i < formContent.questions.length; ++i) {
                var name = 'answer' + String(i + 1);
                if (formContent.questions[i].mode === 1) {
                    answers[name] = '';
                } else {
                    answers[name] = [];
                }
            }
            state.answers = answers;
        },
        SET_QUES_RULES: function SET_QUES_RULES(state, formContent) {
            var rules = {};
            for (var i = 0; i < formContent.questions.length; ++i) {
                var key = 'answer' + String(i + 1);
                if (formContent.questions[i].mode === 1) {
                    rules[key] = [{ required: formContent.questions[i].fill, message: 'Please fill in', trigger: 'change' }];
                } else {
                    rules[key] = [{ required: formContent.questions[i].fill, type: 'array', min: 1, message: 'Choose at least one option', trigger: 'blur' }, { type: 'array', max: formContent.questions[i].choose, message: 'You can choose ' + String(formContent.questions[i].choose) + 'at most', trigger: 'blur' }];
                }
            }
            console.error(rules);
            state.rules = rules;
        }
    },
    actions: {
        SET_FILL_QUES: function SET_FILL_QUES(_ref, id) {
            var commit = _ref.commit;

            __WEBPACK_IMPORTED_MODULE_2__api_question_js__["a" /* getQuesContent */](id).then(function (response) {
                // console.error(response)
                if (response.success) {
                    commit('SET_QUES_CONTENT', response.formContent);
                    commit('SET_QUES_ANSWERS', response.formContent);
                    commit('SET_QUES_RULES', response.formContent);
                } else {
                    alert("获取失败请稍后重试");
                }
            });
        },
        POST_QUES: function POST_QUES(_ref2, data) {
            var commit = _ref2.commit;

            var com = {
                quesID: data.quesid,
                userID: data.userid,
                createTime: getTime(),
                tiankong: [],
                xuanze: []
            };
            for (var i = 0; i < data.number; ++i) {
                if (typeof data.answer['answer' + String(i + 1)] == 'string') {
                    com.tiankong.push(data.answer['answer' + String(i + 1)]);
                } else {
                    com.xuanze.push(data.answer['answer' + String(i + 1)].join(','));
                }
            }
            var response = __WEBPACK_IMPORTED_MODULE_2__api_question_js__["d" /* commitAns */](com);
            return response;
        }
    },
    getters: {
        formContent: function formContent(state, getters) {
            return state.formContent;
        }
    }
};
/* harmony default export */ __webpack_exports__["a"] = (fillQues);

/***/ }),
/* 69 */
/***/ (function(module, exports) {



/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export GET_ERRANDLIST */
/* unused harmony export GET_ATTEND_LIST */
/* unused harmony export CREATE_FAVOR */
/* unused harmony export ATTEND_ERRAND */
/* unused harmony export CLOSE_ERRAND */
/* unused harmony export DELETE_ERRAND */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__mutations__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api_errands_js__ = __webpack_require__(56);
var _GET_ERRANDLIST$CREAT;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var GET_ERRANDLIST = 'GET_ERRANDLIST';
var GET_ATTEND_LIST = 'GET_ATTEND_LIST';
var CREATE_FAVOR = 'CREATE_FAVOR';
var ATTEND_ERRAND = 'ATTEND_ERRAND';
var CLOSE_ERRAND = 'CLOSE_ERRAND';
var DELETE_ERRAND = 'DELETE_ERRAND';
// export const GET_RANKLIST = 'GET_RANKLIST'

/* harmony default export */ __webpack_exports__["a"] = (_GET_ERRANDLIST$CREAT = {}, _defineProperty(_GET_ERRANDLIST$CREAT, GET_ERRANDLIST, function (_ref) {
  var commit = _ref.commit;

  __WEBPACK_IMPORTED_MODULE_1__api_errands_js__["a" /* getErrandList */]().then(function (info) {
    if (info.success) commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["b" /* SET_ERRANDLIST */], info.data);
  });
}), _defineProperty(_GET_ERRANDLIST$CREAT, CREATE_FAVOR, function (_ref2, data) {
  var commit = _ref2.commit;

  return __WEBPACK_IMPORTED_MODULE_1__api_errands_js__["b" /* createErrand */](data).then(function (info) {
    return info.success;
    // commit(mutations.SET_ERRANDLIST, info.data)
  });
}), _defineProperty(_GET_ERRANDLIST$CREAT, GET_ATTEND_LIST, function (_ref3, id) {
  var commit = _ref3.commit;

  __WEBPACK_IMPORTED_MODULE_1__api_errands_js__["c" /* getAttendUserList */](id).then(function (info) {
    if (info.success) commit(__WEBPACK_IMPORTED_MODULE_0__mutations__["c" /* SET_ATTEND_LIST */], info.data);
  });
}), _defineProperty(_GET_ERRANDLIST$CREAT, ATTEND_ERRAND, function (_ref4, data) {
  var commit = _ref4.commit;

  return __WEBPACK_IMPORTED_MODULE_1__api_errands_js__["d" /* attendErrand */](data.eid, data.uid).then(function (info) {
    // console.log('aaa')
    return info.success;
  });
}), _defineProperty(_GET_ERRANDLIST$CREAT, CLOSE_ERRAND, function (_ref5, data) {
  var commit = _ref5.commit;

  __WEBPACK_IMPORTED_MODULE_1__api_errands_js__["e" /* closeErrand */](data.id);
}), _defineProperty(_GET_ERRANDLIST$CREAT, DELETE_ERRAND, function (_ref6, data) {
  // errandAPI.deleteErrand(data.id)

  var commit = _ref6.commit;
}), _GET_ERRANDLIST$CREAT);

/***/ }),
/* 71 */
/***/ (function(module, exports) {



/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
function changeUTCtoLocal(data) {
    var date = new Date(data);
    var local = date.toLocaleString();
    var date = new Date(local);
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes() + seperator2 + date.getSeconds();
    return currentdate;
}

/***/ }),
/* 73 */,
/* 74 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(77);
var parse = __webpack_require__(76);
var formats = __webpack_require__(24);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(25);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(25);
var formats = __webpack_require__(24);
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),
/* 78 */,
/* 79 */,
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [(_vm.isRouterAlive) ? _c('router-view') : _vm._e()], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-cf2b295c", module.exports)
  }
}

/***/ })
],[59]);