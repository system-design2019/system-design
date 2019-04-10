webpackJsonp([12],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var util = {};
util.title = function (title) {
    title = title ? title : 'iView project';
    window.document.title = title;
};

/* harmony default export */ __webpack_exports__["a"] = (util);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//此处用于处理页间路由，不同后缀进入不同页面

var routers = [{
    path: '/', //跳转页面
    meta: {
        title: 'T.I.M'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(8).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(20)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/sign', //登陆注册页面，登陆注册模块使用动态组件切换，参考知乎
    meta: {
        title: 'Sign'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(28)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/findpass', //找回密码页面
    meta: {
        title: 'FindPass'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(11).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(17)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/main', //主页（分游客 & 登陆用户）
    meta: {
        title: 'Main'
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(7).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(21)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/questionShow', //问卷展示页面
    meta: {
        title: "QuestionMain"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(25)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/questionDesign', //问卷设计页面
    meta: {
        title: "QuestionDesign"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(23)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/questionDetail', //问卷详情页面
    meta: {
        title: "QuestionDetail"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(24)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/questionWrite', //问卷填写页面
    meta: {
        title: "QuestionWrite"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(26)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/personal', //personal page
    meta: {
        title: "Personal Info"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(6).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(22)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/infoChange', //change the personal info
    meta: {
        title: "infoChange"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(9).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(19)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/historyCheck', //check the user's history deal
    meta: {
        title: "historyCheck"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(10).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(18)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}, {
    path: '/receiveBox', //check the user's receiveBox
    meta: {
        title: "receiveBox"
    },
    component: function component(resolve) {
        return __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(27)]; (resolve.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
    }
}];
/* harmony default export */ __webpack_exports__["a"] = (routers);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(13)

var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(10),
  /* template */
  __webpack_require__(16),
  /* scopeId */
  "data-v-cf2b295c",
  /* cssModules */
  null
)
Component.options.__file = "D:\\system-design\\frontend\\TimeIsMoney\\src\\app.vue"
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
/* 9 */
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
/* 10 */
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
        return {};
    },
    mounted: function mounted() {},
    beforeDestroy: function beforeDestroy() {},

    methods: {}
});

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iview__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_iview___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_iview__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_router__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__libs_util__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__app_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_iview_dist_styles_iview_css__);








__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_2_vue_router__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_0_vue__["default"].use(__WEBPACK_IMPORTED_MODULE_1_iview___default.a);

// 路由配置
var RouterConfig = {
    mode: 'history',
    routes: __WEBPACK_IMPORTED_MODULE_3__router_router__["a" /* default */]
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
    render: function render(h) {
        return h(__WEBPACK_IMPORTED_MODULE_5__app_vue___default.a);
    }
});

/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-cf2b295c", module.exports)
  }
}

/***/ })
],[11]);
//# sourceMappingURL=main.js.map