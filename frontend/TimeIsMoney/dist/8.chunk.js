webpackJsonp([8],{

/***/ 20:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(43)

var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(34),
  /* template */
  __webpack_require__(55),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\system-design\\frontend\\TimeIsMoney\\src\\views\\jump.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] jump.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0fb64d0e", Component.options)
  } else {
    hotAPI.reload("data-v-0fb64d0e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ede2c9a6c99e708127987d148cea95f9.jpg";

/***/ }),

/***/ 34:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'helloPage',
    data: function data() {
        return {
            note: {
                backgroundImage: "url(" + __webpack_require__(30) + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            }
        };
    },

    methods: {
        handleStart: function handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/main'
            });
        },
        handleSign: function handleSign() {
            this.$router.push({
                path: '/sign'
            });
        }
    }
});

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hellopage",
    style: (_vm.note)
  }, [_c('div', {
    staticClass: "signIn"
  }, [_c('Button', {
    attrs: {
      "id": "signButton",
      "type": "success",
      "size": "large",
      "ghost": ""
    },
    on: {
      "click": _vm.handleSign
    }
  }, [_vm._v("SignIn")])], 1), _vm._v(" "), _c('Row', {
    attrs: {
      "type": "flex",
      "justify": "center",
      "align": "middle"
    }
  }, [_c('Col', {
    attrs: {
      "span": "24"
    }
  }, [_c('div', [_c('h1', {
    attrs: {
      "id": "Logo"
    }
  }, [_vm._v(" T.I.M ")])]), _vm._v(" "), _c('div', [_c('h2', [_c('p', [_vm._v("Time Is Money, you know？")])])]), _vm._v(" "), _c('Button', {
    attrs: {
      "id": "mainButton",
      "type": "success",
      "size": "large"
    },
    on: {
      "click": _vm.handleStart
    }
  }, [_vm._v("Know More")])], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-0fb64d0e", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=8.chunk.js.map