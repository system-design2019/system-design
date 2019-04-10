webpackJsonp([7],{

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(44)

var Component = __webpack_require__(9)(
  /* script */
  __webpack_require__(35),
  /* template */
  __webpack_require__(56),
  /* scopeId */
  "data-v-1e6da119",
  /* cssModules */
  null
)
Component.options.__file = "D:\\system-design\\frontend\\TimeIsMoney\\src\\views\\main.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] main.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e6da119", Component.options)
  } else {
    hotAPI.reload("data-v-1e6da119", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ede2c9a6c99e708127987d148cea95f9.jpg";

/***/ }),

/***/ 35:
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
            signIn: false,
            signUp: false,
            username: "",
            password: ""
        };
    },

    methods: {
        alertsome: function alertsome() {
            alert("yes");
        },
        Confirm: function Confirm() {
            alert(this.username + this.password); //username
        },
        changeToSignUp: function changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
        },
        changeToSignIn: function changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
        },
        goToJump: function goToJump() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/'
            });
        }
    }

});

/***/ }),

/***/ 44:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 56:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "layout"
  }, [_c('Layout', [_c('Header', [_c('Menu', {
    attrs: {
      "mode": "horizontal",
      "theme": "dark",
      "active-name": "1"
    }
  }, [_c('div', {
    staticClass: "layout-logo"
  }, [_c('p', {
    attrs: {
      "id": "logoN"
    }
  }, [_vm._v("M.I.T ")])]), _vm._v(" "), _c('div', {
    staticClass: "layout-nav"
  }, [_c('div', {
    attrs: {
      "id": "signB"
    }
  }, [_c('MenuItem', {
    attrs: {
      "name": "signIn"
    },
    nativeOn: {
      "click": function($event) {
        _vm.signIn = true
      }
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-navigate"
    }
  }), _vm._v("\n                        登陆\n                        ")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "signUp"
    },
    nativeOn: {
      "click": function($event) {
        _vm.signUp = true
      }
    }
  }, [_c('Icon', {
    attrs: {
      "type": "ios-keypad"
    }
  }), _vm._v("\n                        注册\n                        ")], 1)], 1)])])], 1), _vm._v(" "), _c('Layout', [_c('Sider', {
    style: ({
      background: '#fff'
    }),
    attrs: {
      "hide-trigger": ""
    }
  }, [_c('Menu', {
    attrs: {
      "active-name": "1-2",
      "theme": "light",
      "width": "auto",
      "open-names": ['1']
    }
  }, [_c('Submenu', {
    attrs: {
      "name": "1"
    }
  }, [_c('template', {
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-navigate"
    }
  }), _vm._v("\n                            问卷服务\n                        ")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "1-1"
    }
  }, [_vm._v("查看所有问卷")]), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "1-2"
    }
  }, [_vm._v("我发布的")]), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "1-3"
    }
  }, [_vm._v("我参与的")])], 2), _vm._v(" "), _c('Submenu', {
    attrs: {
      "name": "2"
    }
  }, [_c('template', {
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-keypad"
    }
  }), _vm._v("\n                            跑腿服务\n                        ")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "2-1"
    }
  }, [_vm._v("拿快递")]), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "2-2"
    }
  }, [_vm._v("拿外卖")])], 2), _vm._v(" "), _c('Submenu', {
    attrs: {
      "name": "3"
    }
  }, [_c('template', {
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-analytics"
    }
  }), _vm._v("\n                            约馆助手\n                        ")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "3-1"
    }
  }, [_vm._v("我要约馆")]), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "3-2"
    }
  }, [_vm._v("我要约球")])], 2), _vm._v(" "), _c('Submenu', {
    attrs: {
      "name": "4"
    }
  }, [_c('template', {
    slot: "title"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-analytics"
    }
  }), _vm._v("\n                            关于我们\n                        ")], 1), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "4-1"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.goToJump($event)
      }
    }
  }, [_vm._v("产品概念")]), _vm._v(" "), _c('MenuItem', {
    attrs: {
      "name": "4-2"
    }
  }, [_vm._v("我要加盟")])], 2)], 1)], 1), _vm._v(" "), _c('Layout', {
    style: ({
      padding: '0 24px 24px'
    })
  }, [_c('Content', {
    style: ({
      padding: '24px',
      minHeight: '500px',
      background: '#fff'
    })
  }, [_vm._v("\n                    Content\n                ")]), _vm._v(" "), _c('Modal', {
    attrs: {
      "width": "360"
    },
    model: {
      value: (_vm.signIn),
      callback: function($$v) {
        _vm.signIn = $$v
      },
      expression: "signIn"
    }
  }, [_c('p', {
    staticStyle: {
      "color": "#f60",
      "text-align": "center"
    },
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-information-circle"
    }
  }), _vm._v(" "), _c('span', [_vm._v("登陆页面")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('p', [_vm._v("如您已经注册了账号，请输入并登陆.")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "headBox2"
    }
  }, [_c('div', {
    attrs: {
      "id": "headBox"
    }
  }, [_c('img', {
    attrs: {
      "id": "head",
      "src": __webpack_require__(30),
      "alt": "正方形的原始图片",
      "width": "150px",
      "height": "150px"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "allInput"
  }, [_c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入用户名",
      "type": "text"
    },
    model: {
      value: (_vm.username),
      callback: function($$v) {
        _vm.username = $$v
      },
      expression: "username"
    }
  }), _vm._v(" "), _c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入密码",
      "type": "password"
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入验证码"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "allButton"
  }, [_c('Button', {
    attrs: {
      "id": "findPass",
      "size": "small"
    }
  }, [_vm._v("找回密码")]), _vm._v(" "), _c('Button', {
    attrs: {
      "id": "signNow",
      "size": "small"
    },
    on: {
      "click": _vm.changeToSignUp
    }
  }, [_vm._v("立即注册")])], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('Button', {
    attrs: {
      "size": "large",
      "long": ""
    },
    on: {
      "click": _vm.Confirm
    }
  }, [_vm._v("确定")])], 1)]), _vm._v(" "), _c('Modal', {
    attrs: {
      "width": "360"
    },
    model: {
      value: (_vm.signUp),
      callback: function($$v) {
        _vm.signUp = $$v
      },
      expression: "signUp"
    }
  }, [_c('p', {
    staticStyle: {
      "color": "#f60",
      "text-align": "center"
    },
    attrs: {
      "slot": "header"
    },
    slot: "header"
  }, [_c('Icon', {
    attrs: {
      "type": "ios-information-circle"
    }
  }), _vm._v(" "), _c('span', [_vm._v("注册页面")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('p', [_vm._v("清输入相关信息进行注册")])]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "headBox2"
    }
  }, [_c('div', {
    attrs: {
      "id": "headBox"
    }
  }, [_c('img', {
    attrs: {
      "id": "head",
      "src": __webpack_require__(30),
      "alt": "正方形的原始图片",
      "width": "150px",
      "height": "150px"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "allInput"
  }, [_c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入用户名",
      "type": "text"
    },
    model: {
      value: (_vm.username),
      callback: function($$v) {
        _vm.username = $$v
      },
      expression: "username"
    }
  }), _vm._v(" "), _c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入密码",
      "type": "password"
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  }), _vm._v(" "), _c('Input', {
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入验证码"
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "allButton"
  }, [_c('Button', {
    attrs: {
      "id": "signNow",
      "size": "small"
    },
    on: {
      "click": _vm.changeToSignIn
    }
  }, [_vm._v("已有账号？")])], 1), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "footer"
    },
    slot: "footer"
  }, [_c('Button', {
    attrs: {
      "size": "large",
      "long": ""
    },
    on: {
      "click": _vm.Confirm
    }
  }, [_vm._v("确定")])], 1)])], 1)], 1)], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1e6da119", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=7.chunk.js.map