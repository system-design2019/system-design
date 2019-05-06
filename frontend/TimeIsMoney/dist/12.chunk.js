webpackJsonp([12],{

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "margin": "20px 15%"
    }
  }, [_c('div', {
    staticStyle: {
      "overflow": "hidden"
    }
  }, [_c('Button', {
    staticStyle: {
      "width": "8%",
      "margin-right": "10px",
      "float": "right"
    }
  }, [_vm._v("全部删除")])], 1), _vm._v(" "), _vm._l((_vm.$store.state.Personal.mailReceive), function(a, index) {
    return _c('Card', {
      key: index,
      staticStyle: {
        "margin": "10px 10px",
        "padding": "0 30px"
      }
    }, [_c('Row', {
      staticStyle: {
        "width": "100%"
      }
    }, [_c('span', {
      staticStyle: {
        "font-size": "15px",
        "font-weight": "700"
      }
    }, [_vm._v(_vm._s(a.title))]), _vm._v(" "), _c('Badge', {
      staticStyle: {
        "float": "right"
      },
      attrs: {
        "status": a.status
      }
    })], 1), _vm._v(" "), _c('Row', {
      staticStyle: {
        "width": "100%",
        "font-size": "13px",
        "margin": "5px 0"
      }
    }, [_c('p', {
      staticStyle: {
        "margin-left": "2em"
      }
    }, [_vm._v(_vm._s(a.content))])]), _vm._v(" "), _c('Row', {
      staticStyle: {
        "width": "100%",
        "margin": "3px 0",
        "position": "ralative"
      }
    }, [_c('Button', {
      staticStyle: {
        "float": "right",
        "position": "relative",
        "bottom": "0"
      },
      on: {
        "click": function($event) {
          _vm.changeStatus(index)
        }
      }
    }, [_vm._v(_vm._s(_vm.getButtonText(a.type)))]), _vm._v(" "), _c('span', {
      staticStyle: {
        "position": "absolute",
        "bottom": "5%",
        "right": "10%"
      }
    }, [_vm._v("时间：" + _vm._s(a.time))])], 1)], 1)
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b947b430", module.exports)
  }
}

/***/ }),

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(93)

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(71),
  /* template */
  __webpack_require__(113),
  /* scopeId */
  "data-v-b947b430",
  /* cssModules */
  null
)
Component.options.__file = "E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\ReceiveBox.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] ReceiveBox.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-b947b430", Component.options)
  } else {
    hotAPI.reload("data-v-b947b430", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 71:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(1);
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
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Personal', {
        alerts: 'mailReceive'
    }),
    methods: {
        handleStart: function handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/index'
            });
        },
        getButtonText: function getButtonText(type) {
            if (type === 1) {
                return '标为已读';
            }
        },
        changeStatus: function changeStatus(index) {
            this.$store.commit('Personal/CHANGE_STATUS', index);
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('Personal/GET_ALERTS');
        console.log(this.alerts);
        console.log(this.$store.state.Personal.mailReceive);
    }
});

/***/ }),

/***/ 93:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=12.chunk.js.map