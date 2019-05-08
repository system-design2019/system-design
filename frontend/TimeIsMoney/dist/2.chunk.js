webpackJsonp([2,9],{

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "hellopage"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.show),
      expression: "show"
    }],
    attrs: {
      "id": "block1"
    }
  }, [_c('Row', {
    attrs: {
      "type": "flex",
      "justify": "center",
      "align": "middle"
    }
  }, [_c('div', {
    ref: "moveout",
    attrs: {
      "id": "moveout"
    }
  }, [_c('h2', [_c('p', {
    attrs: {
      "id": "text1"
    }
  }, [_vm._v("从未想过 琐碎时间更值钱？")])])]), _vm._v(" "), _c('transition', [_c('div', {
    ref: "showon",
    attrs: {
      "id": "showon"
    }
  }, [_c('div', {
    attrs: {
      "id": "signIn"
    }
  }, [_c('Button', {
    attrs: {
      "id": "signButton",
      "shape": "circle",
      "size": "large",
      "ghost": ""
    },
    on: {
      "click": _vm.handleSign
    }
  }, [_vm._v("SignIn")])], 1), _vm._v(" "), _c('div', {
    staticClass: "animated bounce"
  }, [_c('div', {
    attrs: {
      "id": "logoBox"
    }
  }, [_c('img', {
    attrs: {
      "id": "logov2",
      "src": __webpack_require__(94),
      "alt": "正方形的原始图片"
    }
  })]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "bigTitle"
    }
  }, [_vm._v(" T.I.M ")]), _vm._v(" "), _c('p', {
    attrs: {
      "id": "title2"
    }
  }, [_vm._v(" 让琐碎的时间更有价值 ")]), _vm._v(" "), _c('div', {
    attrs: {
      "id": "mainButton"
    }
  }, [_c('Button', {
    staticStyle: {
      "font-size": "30px",
      "width": "200px"
    },
    attrs: {
      "shape": "circle",
      "size": "large",
      "ghost": ""
    },
    on: {
      "click": _vm.handleStart
    }
  }, [_vm._v("去赚钱")])], 1)])])])], 1), _vm._v(" "), _c('Row', {
    staticStyle: {
      "text-align": "center",
      "vertical-align": "middle",
      "margin": "60px 0"
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "24px",
      "font-weight": "300"
    }
  }, [_vm._v("TIM是一个专为大学生建立的赚钱社区。")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "24px",
      "font-weight": "300"
    }
  }, [_vm._v("在这里，你可以利用零碎时间换取收益，积少成多。")])]), _vm._v(" "), _c('Row', {
    staticStyle: {
      "background": "rgb(246,246,246)"
    }
  }, [_c('Row', {
    staticStyle: {
      "text-align": "center",
      "vertical-align": "middle",
      "margin": "40px 0"
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "34px",
      "font-weight": "300",
      "color": "#CE4545"
    }
  }, [_vm._v("我们可以做什么？")])]), _vm._v(" "), _c('Row', {
    staticStyle: {
      "margin": "40px 80px"
    }
  }, _vm._l((_vm.list1), function(things, index) {
    return _c('Col', {
      key: index,
      staticStyle: {
        "text-align": "center",
        "align": "middle"
      },
      attrs: {
        "span": "8"
      }
    }, [_c('img', {
      staticStyle: {
        "width": "32%",
        "border-radius": "50%",
        "align": "middle"
      },
      attrs: {
        "src": things.src
      }
    }), _vm._v(" "), _c('p', {
      staticStyle: {
        "width": "100%",
        "font-size": "26px",
        "color": "#CE4545",
        "margin": "15px 0",
        "font-weight": "300"
      }
    }, [_vm._v(_vm._s(things.title))]), _vm._v(" "), _c('p', {
      staticStyle: {
        "font-size": "20px",
        "margin": "15px 10%",
        "text-align": "left",
        "font-weight": "300"
      }
    }, [_vm._v(_vm._s(things.content))])])
  }))], 1), _vm._v(" "), _c('Row', _vm._l((_vm.list2), function(things, index) {
    return _c('Col', {
      key: index,
      staticStyle: {
        "text-align": "center",
        "height": "340px",
        "margin": "auto 0"
      },
      attrs: {
        "span": "12"
      }
    }, [_c('img', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (!things.show),
        expression: "!things.show"
      }],
      staticStyle: {
        "width": "100%",
        "height": "100%"
      },
      attrs: {
        "src": things.src
      }
    }), _vm._v(" "), _c('p', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (things.show),
        expression: "things.show"
      }],
      staticStyle: {
        "margin": "13% 10% 20px 10%",
        "font-size": "26px",
        "color": "#CE4545",
        "font-weight": "300"
      }
    }, [_vm._v(_vm._s(things.title))]), _vm._v(" "), _c('p', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (things.show),
        expression: "things.show"
      }],
      staticStyle: {
        "margin": "20px 10% 13% 10%",
        "font-size": "20px",
        "text-align": "left",
        "font-weight": "300"
      }
    }, [_vm._v(_vm._s(things.text))])])
  })), _vm._v(" "), _c('Footer', {
    staticClass: "layout-footer-center",
    staticStyle: {
      "text-align": "center",
      "padding": "50px 20px 24px 20px"
    }
  }, [_c('span', {
    staticStyle: {
      "padding-top": "50px"
    }
  }, [_vm._v("open source "), _c('img', {
    staticStyle: {
      "width": "2%"
    },
    attrs: {
      "src": __webpack_require__(54)
    }
  }), _c('a', {
    staticStyle: {
      "margin": "0 3px"
    },
    attrs: {
      "href": "https://github.com/system-design2019"
    }
  }, [_vm._v("blog")]), _vm._v("here")]), _vm._v(" "), _c('p', {
    staticStyle: {
      "width": "100%"
    }
  }, [_vm._v("2019-2020 © TalkingDataSystem Design & Anylasis Project")])]), _vm._v(" "), _c('signCom', {
    attrs: {
      "signInFromJump": _vm.signInFromJump
    }
  })], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1390b12e", module.exports)
  }
}

/***/ }),

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

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(82)

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(68),
  /* template */
  __webpack_require__(104),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\Jump.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Jump.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1390b12e", Component.options)
  } else {
    hotAPI.reload("data-v-1390b12e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ede2c9a6c99e708127987d148cea95f9.jpg";

/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c46441d2e9c3e95b694bd737c6418108.png";

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

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sign_vue__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Sign_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Sign_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    mounted: function mounted() {
        this.A(); //在dom元素渲染完成之后直接触发
    },
    data: function data() {
        return {
            signInFromJump: false,
            note: {
                //backgroundImage: "url(" + require("../images/hellobg.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%"
            },
            show: true,
            list1: [{ src: '../../static/jump/question.png', title: '问卷调查', content: '在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。' }, { src: '../../static/jump/runfavor.png', title: '跑腿代购', content: '跑腿代购同样可以获得零用钱。代领快递、领外卖、购买商品……无论你是想赚钱还是想找个人替你跑腿，TIM无疑是你最优秀的选择。在这里，时间就是酬劳。' }, { src: '../../static/jump/social.png', title: '聊天社交', content: '想要找到兴趣相同的朋友？想要和校内的同学搞好关系？来TIM就对了！问卷和跑腿不是全部，随时随地和附近的人聊天社交，有时间你就来，爱情与友情也是价值的体现！' }],
            list2: [{ show: true, src: '../../static/jump/image4.jpg', title: '在线交流，沟通更方便', text: '在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。' }, { show: false, src: '../../static/jump/image4.jpg', title: '', text: '' }, { show: false, src: '../../static/jump/image5.jpg', title: '', text: '' }, { show: true, src: '../../static/jump/image5.jpg', title: '问卷跑腿，收益双保障', text: '在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。' }]
        };
    },

    methods: {
        handleStart: function handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/main'
            });
        },
        handleSign: function handleSign() {
            this.signInFromJump = !this.signInFromJump;
            //需要切换属性才能实现更新，不然会导致只有第一次点击会弹出注册框
        },
        A: function A() {
            setTimeout(this.disapper, 2500); //记得加this。否则会找不到元素/方法
        },
        disapper: function disapper() {
            this.$refs.moveout.style.display = "none"; //html元素中插入ref钩子，然后就可以在js中调用 
            this.$refs.showon.style.display = "block";
        }
    },
    components: { signCom: __WEBPACK_IMPORTED_MODULE_0__Sign_vue___default.a }
});

/***/ }),

/***/ 82:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "29dc8f37544096fa7d02fd10416be0a7.png";

/***/ })

});
//# sourceMappingURL=2.chunk.js.map