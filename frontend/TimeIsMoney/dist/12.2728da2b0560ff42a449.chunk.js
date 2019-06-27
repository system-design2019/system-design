webpackJsonp([12],{

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_personal_index_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_service_js__ = __webpack_require__(4);
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
        return {
            moneycount: 0,
            infos: ""
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Personal', {
        personDetail: 'personalInfo',
        logs: 'allDeals'
    }),
    methods: {
        rechargeAsset: function rechargeAsset() {
            var paymentAbout = { "userId": this.personDetail.id, "money": this.moneycount, "infos": this.infos, "payType": 0 };
            //(paymentAbout);
            this.$store.dispatch("Personal/RECHARGE_ASSET", paymentAbout);
            alert("冲他这么多： " + this.moneycount);
        },
        withdrawAsset: function withdrawAsset() {
            var moneyOut = this.moneycount * -1;
            var paymentAbout = { "userId": this.personDetail.id, "money": moneyOut, "infos": this.infos };
            //(paymentAbout);
            this.$store.dispatch("Personal/WITHDRAW_ASSET", paymentAbout);
            alert("我用户【" + this.personDetail.id + "】提他个一个亿！");
        },
        getLog: function getLog() {
            this.$store.dispatch('Personal/GET_ASSET');
            alert("获取交易记录");
        },
        handleInput: function handleInput(e) {
            this.moneycount = e.target.value.replace(/[^\d]/g, '');
        },
        getSrcByInfo: function getSrcByInfo(Info) {
            if (Info === '充值: ') {
                return './../../static/充值.png';
            } else if (Info == '提现: ') {
                return './../../static/提现.png';
            } else {
                return './../../static/其他.png';
            }
        },
        popBoxRe: function popBoxRe() {
            var popBoxRe = document.getElementById("popRe");
            var popLayer = document.getElementById("popLayer");
            popRe.style.display = "block";
            popLayer.style.display = "block";
        },
        closeBoxRe: function closeBoxRe() {
            var popBoxRe = document.getElementById("popRe");
            var popLayer = document.getElementById("popLayer");
            popRe.style.display = "none";
            popLayer.style.display = "none";
        },
        popBoxWd: function popBoxWd() {
            var popBoxWd = document.getElementById("popWd");
            var popLayer = document.getElementById("popLayer");
            popWd.style.display = "block";
            popLayer.style.display = "block";
        },
        closeBoxWd: function closeBoxWd() {
            var popBoxWd = document.getElementById("popWd");
            var popLayer = document.getElementById("popLayer");
            popWd.style.display = "none";
            popLayer.style.display = "none";
        }
    },
    mounted: function mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
        this.$store.dispatch('Personal/GET_ASSET');
    }
});

/***/ }),

/***/ 165:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 175:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9f9c7d0b023b00606397a0ea8cfc62cb.png";

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "myAccount"
  }, [_c('div', {
    staticStyle: {
      "display": "none",
      "background-color": "#B3B3B3",
      "position": "absolute",
      "height": "100%",
      "width": "100%",
      "z-index": "10",
      "-moz-opacity": "0.8",
      "opacity": ".80"
    },
    attrs: {
      "id": "popLayer"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "height": "320px"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "57%",
      "float": "right",
      "height": "320px",
      "padding-left": "6%",
      "display": "flex",
      "align-items": "Center"
    },
    attrs: {
      "id": "gra"
    }
  }, [_c('div', {
    staticClass: "showPage",
    staticStyle: {
      "min-height": "150px"
    }
  }, [_vm._m(1), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "20px",
      "color": "#fff",
      "width": "100%",
      "margin-top": "20px",
      "font-weight": "100"
    }
  }, [_vm._v("1元=100M币，充值大优惠！")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-top": "30px",
      "margin-right": "20px",
      "font-size": "20px"
    },
    attrs: {
      "type": "info"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.popBoxRe($event)
      }
    }
  }, [_vm._v("充值")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-top": "30px",
      "font-size": "20px"
    },
    attrs: {
      "type": "info"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.popBoxWd($event)
      }
    }
  }, [_vm._v("提现")])], 1)])]), _vm._v(" "), _c('card', {
    staticStyle: {
      "width": "60%",
      "margin": "auto",
      "margin-top": "20px"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "80%",
      "margin": "auto"
    }
  }, [_c('span', {
    staticStyle: {
      "font-size": "15px",
      "margin-top": "20px",
      "vertical-align": "middle"
    }
  }, [_vm._v("我的余额: ")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "color": "#ce4545",
      "vertical-align": "middle"
    }
  }, [_vm._v(_vm._s(_vm.personDetail.asset))]), _vm._v(" "), _c('CellGroup', _vm._l((_vm.logs), function(a, index) {
    return _c('Cell', {
      key: index,
      staticClass: "history",
      staticStyle: {
        "width": "100%",
        "margin-top": "10px"
      },
      attrs: {
        "title": a.info
      }
    }, [_c('div', {
      staticStyle: {
        "width": "100%",
        "margin": "auto"
      }
    }, [_c('img', {
      staticStyle: {
        "height": "40px",
        "float": "left",
        "margin-right": "30px",
        "vertical-align": "middle"
      },
      attrs: {
        "src": _vm.getSrcByInfo(a.info)
      }
    }), _vm._v(" "), _c('span', {
      staticStyle: {
        "float": "left",
        "width": "60%",
        "vertical-align": "middle"
      }
    }, [_vm._v("\n                            " + _vm._s(a.info) + "\n                            "), _c('span', {
      staticStyle: {
        "color": "#ce4545",
        "font-weight": "100",
        "margin-left": "10px"
      }
    }, [_vm._v(_vm._s(a.money))])]), _vm._v(" "), _c('span', {
      staticStyle: {
        "text-align": "right",
        "color": "rgb(174,174,174)",
        "vertical-align": "middle"
      }
    }, [_vm._v(_vm._s(a.date))])])])
  }))], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "none",
      "position": "fixed",
      "top": "50%",
      "left": "50%",
      "transform": "translateX(-50%) translateY(-50%)",
      "z-index": "20"
    },
    attrs: {
      "id": "popRe"
    }
  }, [_c('card', {
    staticStyle: {
      "width": "500px",
      "height": "100px"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#ce4545"
    }
  }, [_vm._v("请输入需要充值的M币数（1RMB = 100M币）： ")]), _vm._v(" "), _c('input', {
    staticStyle: {
      "margin-left": "30px",
      "margin-top": "10px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.moneycount
    },
    on: {
      "input": _vm.handleInput
    }
  }), _vm._v(" "), _c('Button', {
    nativeOn: {
      "click": function($event) {
        return _vm.rechargeAsset($event)
      }
    }
  }, [_vm._v("充值")]), _vm._v(" "), _c('Button', {
    nativeOn: {
      "click": function($event) {
        return _vm.closeBoxRe($event)
      }
    }
  }, [_vm._v("取消")])], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "display": "none",
      "position": "fixed",
      "top": "50%",
      "left": "50%",
      "transform": "translateX(-50%) translateY(-50%)",
      "z-index": "20"
    },
    attrs: {
      "id": "popWd"
    }
  }, [_c('card', {
    staticStyle: {
      "width": "500px",
      "height": "100px"
    }
  }, [_c('span', {
    staticStyle: {
      "color": "#ce4545"
    }
  }, [_vm._v("请输入需要提现的M币数（1RMB = 100M币）： ")]), _vm._v(" "), _c('input', {
    staticStyle: {
      "margin-left": "30px",
      "margin-top": "10px"
    },
    attrs: {
      "type": "text"
    },
    domProps: {
      "value": _vm.moneycount
    },
    on: {
      "input": _vm.handleInput
    }
  }), _vm._v(" "), _c('Button', {
    nativeOn: {
      "click": function($event) {
        return _vm.withdrawAsset($event)
      }
    }
  }, [_vm._v("提现")]), _vm._v(" "), _c('Button', {
    nativeOn: {
      "click": function($event) {
        return _vm.closeBoxWd($event)
      }
    }
  }, [_vm._v("取消")])], 1)], 1)], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "43%",
      "float": "left",
      "height": "320px",
      "background": "#fc4a1a"
    }
  }, [_c('img', {
    staticStyle: {
      "float": "right",
      "height": "300px",
      "margin-top": "25px"
    },
    attrs: {
      "src": __webpack_require__(175)
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('span', {
    staticStyle: {
      "font-size": "33px",
      "font-weight": "100",
      "color": "#fff"
    }
  }, [_vm._v("我的M币")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "font-size": "20px",
      "font-weight": "100",
      "color": "#fff"
    }
  }, [_vm._v("My Coins")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-55719846", module.exports)
  }
}

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(165)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(126),
  /* template */
  __webpack_require__(227),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\Account.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Account.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55719846", Component.options)
  } else {
    hotAPI.reload("data-v-55719846", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});