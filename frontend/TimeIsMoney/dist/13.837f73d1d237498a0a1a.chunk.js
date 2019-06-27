webpackJsonp([13],{

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
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
    data: function data() {
        return {};
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Personal', {
        alerts: 'mailReceive'
    }),
    methods: {
        handleStart: function handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/index'
            });
        },
        getAction: function getAction(status) {
            if (status) {
                return '标为未读';
            } else {
                return '标为已读';
            }
        },
        getButtonText: function getButtonText(type) {
            if (type === 1) {
                return '标为已读';
            }
        },
        changeStatus: function changeStatus(index) {
            this.$store.dispatch('Personal/CHANGE_STATUS', index);
        },
        getNumber: function getNumber() {
            var number = 0;
            // console.log(this.alerts)
            for (var a in this.alerts) {
                if (!this.alerts[a].hasRead) {
                    number++;
                }
            }
            return number;
        },
        changeAllStatus: function changeAllStatus() {
            this.$store.dispatch('Personal/CHANGE_ALL_STATUS');
        },
        getStatus: function getStatus(status) {
            if (status) return 'default';else {
                return 'error';
            }
        },
        deleteAlert: function deleteAlert(index) {
            this.$store.dispatch('Personal/DELETE_ALERT', index);
        },
        deleteAllAlerts: function deleteAllAlerts() {
            this.$store.dispatch('Personal/DELETE_ALL_ALERTS');
        }
    },
    created: function created() {
        this.$store.dispatch('Personal/GET_ALERTS');
    }
});

/***/ }),

/***/ 174:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 234:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "margin": "20px 9%"
    }
  }, [_c('div', {
    staticStyle: {
      "padding": "10px",
      "background": "#f8f8f9"
    }
  }, [_c('Card', {
    staticStyle: {
      "width": "100%",
      "min-height": "600px"
    }
  }, [_c('div', [_c('div', {
    staticStyle: {
      "width": "60%",
      "float": "left"
    }
  }, [_c('p', {
    staticStyle: {
      "margin": "10px 0"
    }
  }, [_vm._v("您有" + _vm._s(_vm.getNumber()) + "条未读消息")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "40%",
      "float": "right",
      "text-align": "right",
      "margin": "10px 0"
    }
  }, [_c('a', {
    on: {
      "click": function($event) {
        _vm.changeAllStatus()
      }
    }
  }, [_vm._v("全部标记为已读")]), _vm._v(" "), _c('Divider', {
    attrs: {
      "type": "vertical"
    }
  }), _vm._v(" "), _c('a', {
    on: {
      "click": function($event) {
        _vm.deleteAllAlerts()
      }
    }
  }, [_vm._v("全部删除")])], 1)]), _vm._v(" "), _c('CellGroup', {
    staticStyle: {
      "width": "100%"
    }
  }, _vm._l((_vm.alerts), function(a, index) {
    return _c('Cell', {
      key: index,
      staticClass: "alert",
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "title": a.title
      }
    }, [_c('div', {
      staticStyle: {
        "float": "left",
        "width": "2%"
      }
    }, [_c('Badge', {
      staticStyle: {
        "float": "left"
      },
      attrs: {
        "status": _vm.getStatus(a.hasRead)
      }
    })], 1), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "98%"
      }
    }, [_c('span', {
      staticStyle: {
        "font-size": "17px",
        "font-weight": "700",
        "float": "left",
        "width": "70%"
      }
    }, [_vm._v("\n                            " + _vm._s(a.title) + "\n                            "), _c('span', {
      staticStyle: {
        "color": "rgb(174,174,174)",
        "font-weight": "100"
      }
    }, [_vm._v(_vm._s(a.content))])]), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "28%",
        "text-align": "right"
      }
    }, [_c('span', {
      staticStyle: {
        "float": "left",
        "width": "65%",
        "text-align": "right",
        "color": "rgb(174,174,174)"
      }
    }, [_vm._v(_vm._s(a.date))]), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "35%",
        "text-align": "right"
      }
    }, [_c('a', {
      staticStyle: {
        "float": "left",
        "width": "40%",
        "text-align": "right",
        "color": "#ce4545"
      },
      on: {
        "click": function($event) {
          _vm.deleteAlert(index)
        }
      }
    }, [_vm._v("删除")]), _vm._v(" "), _c('a', {
      staticStyle: {
        "float": "right",
        "width": "60%",
        "text-align": "right",
        "color": "#ce4545"
      },
      on: {
        "click": function($event) {
          _vm.changeStatus(index)
        }
      }
    }, [_vm._v(_vm._s(_vm.getAction(a.hasRead)))])])])])])
  }))], 1)], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-b947b430", module.exports)
  }
}

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(174)

var Component = __webpack_require__(32)(
  /* script */
  __webpack_require__(139),
  /* template */
  __webpack_require__(234),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\FILE_myself\\Learning\\juniorsecond\\system_design\\system-design\\frontend\\TimeIsMoney\\src\\views\\ReceiveBox.vue"
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


/***/ })

});