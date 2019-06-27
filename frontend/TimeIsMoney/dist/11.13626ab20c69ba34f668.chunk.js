webpackJsonp([11],{

/***/ 133:
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



// import { GET_RANKLIST } from '../store/home/actions.js'
// console.log(GET_RANKLIST)
/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            value: 0,
            tabs: 2,
            setting: {
                autoplay: true,
                autoplaySpeed: 3500,
                dots: 'inside',
                radiusDot: false,
                trigger: 'hover',
                arrow: 'never'
            }
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Home', {
        ranklist: function ranklist(state) {
            return state.rankList;
        },
        carousel: function carousel(state) {
            return state.advertises;
        }
    }),
    methods: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["c" /* mapActions */])('Home', {
        GET_RANKLIST: 'GET_RANKLIST',
        GET_ADVERTISES: 'GET_ADVERTISES'

    }),
    mounted: function mounted() {
        this.GET_RANKLIST();
        this.GET_ADVERTISES();
    }
});

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 151:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ba99bc0cca32037ca74b607551df1f8c.jpg";

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "675ca0308badbd1f058821b179fe3b71.jpg";

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f904c68eeb0ddc992dc55c2503e0a479.jpg";

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f7d72768c96413d2c0ef79e599743da1.jpg";

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a540490a2dd02ca47282d69d67f23cd5.jpg";

/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "min-height": "800px",
      "margin": "30px 15%"
    }
  }, [_c('div', [_c('Carousel', {
    staticStyle: {
      "height": "300px"
    },
    attrs: {
      "autoplay": "",
      "loop": "",
      "autoplay": _vm.setting.autoplay,
      "autoplay-speed": _vm.setting.autoplaySpeed,
      "dots": _vm.setting.dots,
      "radius-dot": _vm.setting.radiusDot,
      "trigger": _vm.setting.trigger,
      "arrow": _vm.setting.arrow
    },
    model: {
      value: (_vm.value),
      callback: function($$v) {
        _vm.value = $$v
      },
      expression: "value"
    }
  }, _vm._l((_vm.carousel), function(c, index) {
    return _c('CarouselItem', {
      key: index
    }, [_c('img', {
      staticStyle: {
        "height": "300px",
        "width": "100%"
      },
      attrs: {
        "src": c.src
      }
    })])
  }))], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "auto"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "height": "50px"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "24%",
      "float": "left",
      "margin-left": "1%"
    }
  }, [_c('Card', {
    staticStyle: {
      "height": "420px",
      "background": "#ffffff"
    }
  }, [_c('p', {
    staticStyle: {
      "color": "#ce4545",
      "font-size": "20px",
      "margin-top": "5px"
    },
    attrs: {
      "slot": "title"
    },
    slot: "title"
  }, [_vm._v("一夜暴富")]), _vm._v(" "), _c('ul', {
    staticStyle: {
      "margin-left": "3px"
    }
  }, _vm._l((_vm.ranklist), function(item, index) {
    return _c('li', {
      key: index,
      staticStyle: {
        "list-style": "none",
        "margin-top": "15px"
      }
    }, [_c('Icon', {
      staticStyle: {
        "width": "7%",
        "overflow": "hidden",
        "color": "#ce4545"
      },
      attrs: {
        "type": "ios-paper"
      }
    }), _vm._v(" "), _c('a', {
      staticStyle: {
        "width": "65%",
        "overflow": "hidden",
        "display": "inline-block",
        "word-break": "keep-all",
        "white-space": "nowrap",
        "text-overflow": "ellipsis",
        "vertical-align": "middle"
      },
      attrs: {
        "href": "#",
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right",
        "width": "20%",
        "color": "#ce4545",
        "overflow": "hidden",
        "display": "inline-block",
        "word-break": "keep-all",
        "white-space": "nowrap",
        "text-overflow": "ellipsis"
      }
    }, [_vm._v(_vm._s(item.price))])], 1)
  }))])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "74%",
      "float": "right"
    }
  }, [_c('Row', {
    staticStyle: {
      "width": "100%",
      "height": "250px"
    },
    attrs: {
      "gutter": 10
    }
  }, [_c('i-col', {
    attrs: {
      "span": "18"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "233.56px"
    },
    attrs: {
      "src": __webpack_require__(190)
    }
  })]), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": "6"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "233.56px"
    },
    attrs: {
      "src": __webpack_require__(191)
    }
  })])], 1), _vm._v(" "), _c('Row', {
    staticStyle: {
      "width": "100%",
      "height": "100px"
    },
    attrs: {
      "gutter": 10
    }
  }, [_c('i-col', {
    attrs: {
      "span": "8"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "163px"
    },
    attrs: {
      "src": __webpack_require__(192)
    }
  })]), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": "8"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "163px"
    },
    attrs: {
      "src": __webpack_require__(193)
    }
  })]), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": "8"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%",
      "height": "163px"
    },
    attrs: {
      "src": __webpack_require__(194)
    }
  })])], 1)], 1)])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-05cdf15f", module.exports)
  }
}

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(150)
__webpack_require__(151)

var Component = __webpack_require__(32)(
  /* script */
  __webpack_require__(133),
  /* template */
  __webpack_require__(212),
  /* scopeId */
  "data-v-05cdf15f",
  /* cssModules */
  null
)
Component.options.__file = "E:\\FILE_myself\\Learning\\juniorsecond\\system_design\\system-design\\frontend\\TimeIsMoney\\src\\views\\Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-05cdf15f", Component.options)
  } else {
    hotAPI.reload("data-v-05cdf15f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});