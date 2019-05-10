webpackJsonp([9],{

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(56)

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(55),
  /* template */
  __webpack_require__(58),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\Sign.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Sign.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-35573b3d", Component.options)
  } else {
    hotAPI.reload("data-v-35573b3d", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ede2c9a6c99e708127987d148cea95f9.jpg";

/***/ }),

/***/ 55:
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    props: ['signInFromJump', 'signInFromMain', 'signUpFromMain'],
    data: function data() {
        return {
            signIn: false,
            signUp: false,
            username: "",
            password: ""
        };
    },

    compute: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])({
        Logged: 'isAuthenticated'
    }),
    methods: {
        changeToSignUp: function changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
        },
        changeToSignIn: function changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
        },
        doSignUp: function doSignUp() {
            this.changeToSignIn();
        },
        doSignIn: function doSignIn() {
            this.$router.push({
                path: '/main',
                name: 'main'
            });
            this.signIn = false;
            this.$store.commit('signIn');
            this.$store.commit('setRightNavs');
        }
    },
    watch: {
        signInFromJump: function signInFromJump(signIn, oldsignIn) {
            this.signUp = false;
            this.signIn = true;
        },
        signInFromMain: function signInFromMain(signIn, oldsignIn) {
            this.signUp = false;
            this.signIn = true;
        }
    }
});

/***/ }),

/***/ 56:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Modal', {
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
      "src": __webpack_require__(53),
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
    nativeOn: {
      "click": function($event) {
        return _vm.doSignIn($event)
      }
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
      "src": __webpack_require__(53),
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
      "click": _vm.doSignUp
    }
  }, [_vm._v("确定")])], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-35573b3d", module.exports)
  }
}

/***/ })

});
//# sourceMappingURL=9.chunk.js.map