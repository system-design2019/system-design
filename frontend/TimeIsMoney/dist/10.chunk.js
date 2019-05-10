webpackJsonp([10],{

/***/ 102:
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
        "object-fit": "cover",
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
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "22%",
      "float": "left",
      "margin-left": "1%"
    }
  }, [_c('Card', {
    staticStyle: {
      "height": "380px"
    }
  }, [_c('p', {
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
        "margin-top": "10px"
      }
    }, [_c('Icon', {
      attrs: {
        "type": "ios-paper"
      }
    }), _vm._v(" "), _c('a', {
      attrs: {
        "href": "#",
        "target": "_blank"
      }
    }, [_vm._v(_vm._s(item.name))]), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "right"
      }
    }, [_vm._v(_vm._s(item.price))])], 1)
  }))])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "76%",
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
      "src": __webpack_require__(57)
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
      "src": __webpack_require__(57)
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
      "width": "100%"
    },
    attrs: {
      "src": __webpack_require__(57)
    }
  })]), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": "8"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "src": __webpack_require__(57)
    }
  })]), _vm._v(" "), _c('i-col', {
    attrs: {
      "span": "8"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "src": __webpack_require__(57)
    }
  })])], 1)], 1)])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "height": "30px",
      "background": "#CE5555",
      "margin": "20px 0",
      "border-radius": "10px",
      "text-align": "center"
    }
  }, [_c('p', {
    staticStyle: {
      "line-height": "30px",
      "color": "#ffffff",
      "text-align": "right",
      "margin-right": "20px"
    }
  }, [_vm._v("猜你喜欢")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-05cdf15f", module.exports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(80)

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(67),
  /* template */
  __webpack_require__(102),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\Home.vue"
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


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fce6509da588f71c46af9079b83c5469.jpg";

/***/ }),

/***/ 67:
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
                autoplaySpeed: 2000,
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

/***/ 80:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=10.chunk.js.map