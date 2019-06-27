webpackJsonp([10],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IdentifyFromLocal__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_IdentifyFromLocal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_IdentifyFromLocal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_IdentifyFromAPI__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_IdentifyFromAPI___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_IdentifyFromAPI__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_personal_index_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_vuex__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    components: { SIdentify: __WEBPACK_IMPORTED_MODULE_0__components_IdentifyFromLocal___default.a, SIdentify1: __WEBPACK_IMPORTED_MODULE_1__components_IdentifyFromAPI___default.a },
    data: function data() {
        return {
            signIn: false,
            signUp: false,
            info: { username: "", password: "", mode: "", inputCode: "" },
            wrong: false,
            alert: '',
            identifyCode2: "",
            identifyCode1: "",
            //identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
            identifyCodes: "1234567890",
            checkNum: "",
            checkNum1: ""
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_vuex__["b" /* mapState */])('Personal', {
        personDetail: 'personalInfo'
    }),
    mounted: function mounted() {
        this.identifyCode2 = "";
        this.identifyCode1 = "";
        this.makeCode(this.indentifyCodes, 4);
    },

    methods: {
        //these 2 functions are used in the sign in
        sendIndentify: function sendIndentify() {
            //alert("Hi");
            var userMode = this.checkValid(this.info.username);
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('SEND_IDENTIFY', this.info).then(function (response) {
                    console.log('response');
                    console.log(response);
                });
            }
        },
        checkIndentify: function checkIndentify() {
            var userMode = this.checkValid(this.info.username);
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('CHECK_IDENTIFY', this.info).then(function (response) {
                    console.log(response);
                    if (response['success']) {
                        alert("Your verify done!");
                    }
                });
            }
        },

        //these 2 functions are used in the find the forgot password
        sendIndentify2: function sendIndentify2() {
            var userMode = this.checkValid(this.info.username);
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('SEND_IDENTIFY2', this.info).then(function (response) {
                    console.log('response');
                    console.log(response);
                });
            }
        },
        checkIndentify2: function checkIndentify2() {
            var userMode = this.checkValid(this.info.username);
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('CHECK_IDENTIFY2', this.info).then(function (response) {
                    console.log(response);
                    if (response['success']) {
                        alert("Your verify done!");
                    }
                });
            }
        },
        randomNum: function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode: function refreshCode() {
            this.identifyCode2 = "";
            this.identifyCode1 = "";
            this.makeCode(this.identifyCodes, 4);
            //alert(this.signIn)
            //alert(this.identifyCode2)
            // alert(this.identifyCode1)
        },
        makeCode: function makeCode(o, l) {
            for (var i = 0; i < l; i++) {
                this.identifyCode2 += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
            for (var _i = 0; _i < l; _i++) {
                this.identifyCode1 += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
            }
        },
        changeToSignUp: function changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
            this.info.username = "";
            this.info.password = "";
            this.checkNum = "";
            this.checkNum1 = "";
            // this.refreshCode();
        },
        changeToSignIn: function changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
            this.info.username = "";
            this.info.password = "";
            this.checkNum = "";
            this.checkNum1 = "";
            /// this.refreshCode();
        },
        doSignUp: function doSignUp() {
            var _this = this;

            var userMode = this.checkValid(this.info.username);
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('SIGN_UP', this.info).then(function (e) {
                    console.log('response');
                    console.log(response);
                    if (response['success']) {
                        _this.wrong = false;
                        _this.changeToSignIn();
                    } else {
                        _this.wrong = true;
                        _this.alert = response['msg'];
                    }
                });
            }
            this.refreshCode();
        },
        doSignIn: function doSignIn() {
            var _this2 = this;

            if (this.checkValid(this.info.username) !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username);
                this.$store.dispatch('SIGN_IN', this.info).then(function (response) {
                    if (response['success']) {
                        _this2.$emit("SignSuccess", true);
                        _this2.signIn = false;
                        var data = {
                            log: true,
                            userID: response.data,
                            username: "$"
                        };
                        window.sessionStorage.setItem('LogInfo', JSON.stringify(data));
                        _this2.$router.push({
                            path: '/main',
                            name: 'main'
                        });
                        _this2.wrong = false;
                        // console.log(this.$cookies.get('User'))
                        _this2.$store.dispatch('Ques/GET_COLLECT_QUESLIST');
                        _this2.$store.dispatch('Ques/GET_ATTEND_QUESLIST');
                        _this2.$store.dispatch('Ques/GET_PUBLISH_QUESLIST');
                    } else {
                        // console.log('??????????')
                        _this2.wrong = true;
                        _this2.alert = response['msg'];
                    }
                    _this2.$store.dispatch('Personal/GET_INFO').then(function (res) {
                        var data = {
                            log: JSON.parse(window.sessionStorage.getItem('LogInfo')).log,
                            userID: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                            username: _this2.personDetail.nickname,
                            money: _this2.personDetail.asset
                        };
                        window.sessionStorage.setItem('LogInfo', JSON.stringify(data));
                        //console.error(data)
                    });
                });
            }
        },
        checkValid: function checkValid(username) {
            var _this3 = this;

            var nameType = '';
            if (this.info.username === '' || this.info.password === '') {
                this.wrong = true;
                this.alert = '密码或用户名不能为空';
                return 'invalid';
            } else {
                var email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
                var phone = /^1[34578]\d{9}$/;
                if (phone.test(username)) {
                    nameType = 'phone';
                } else if (email.test(username)) {
                    nameType = 'email';
                } else {
                    this.wrong = true;
                    this.alert = '无效的用户名';
                    return 'invalid';
                }
            }
            if (this.signIn) {
                if (this.checkNum != this.identifyCode2) {
                    this.wrong = true;
                    this.alert = '验证码错误';
                    this.refreshCode();
                    return 'invalid';
                }
                return nameType;
            } else {
                this.$store.dispatch('CHECK_IDENTIFY', this.info).then(function (response) {
                    console.log(response);
                    if (response['success']) {
                        return nameType;
                    } else {
                        _this3.wrong = true;
                        _this3.alert = '验证码错误';
                        return 'invalid';
                    }
                });
            }
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

/***/ 113:
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

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            sdisabled: false,
            time: 60,
            btntxt: "获取验证码"
        };
    },

    methods: {
        sendcode: function sendcode() {
            this.time = 60;
            this.timer();
        },

        //发送验证码倒计时
        timer: function timer() {
            if (this.time > 0) {
                this.sdisabled = true;
                this.time--;
                this.btntxt = this.time + "S";
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.btntxt = "发送验证码";
                this.sdisabled = false;
            }
        }
    }
});

/***/ }),

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'SIdentify',
    props: {
        identifyCode: {
            type: String,
            default: '555'
        },
        fontSizeMin: {
            type: Number,
            default: 16
        },
        fontSizeMax: {
            type: Number,
            default: 40
        },
        backgroundColorMin: {
            type: Number,
            default: 180
        },
        backgroundColorMax: {
            type: Number,
            default: 240
        },
        colorMin: {
            type: Number,
            default: 50
        },
        colorMax: {
            type: Number,
            default: 160
        },
        lineColorMin: {
            type: Number,
            default: 40
        },
        lineColorMax: {
            type: Number,
            default: 180
        },
        dotColorMin: {
            type: Number,
            default: 0
        },
        dotColorMax: {
            type: Number,
            default: 255
        },
        contentWidth: {
            type: Number,
            default: 112
        },
        contentHeight: {
            type: Number,
            default: 38
        }
    },
    methods: {
        // 生成一个随机数
        randomNum: function randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },

        // 生成一个随机的颜色
        randomColor: function randomColor(min, max) {
            var r = this.randomNum(min, max);
            var g = this.randomNum(min, max);
            var b = this.randomNum(min, max);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        drawPic: function drawPic() {
            var canvas = document.getElementById('s-canvas');
            var ctx = canvas.getContext('2d');
            ctx.textBaseline = 'bottom';
            // 绘制背景
            ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax);
            ctx.fillRect(0, 0, this.contentWidth, this.contentHeight);
            // 绘制文字
            for (var i = 0; i < this.identifyCode.length; i++) {
                this.drawText(ctx, this.identifyCode[i], i);
            }
            this.drawLine(ctx);
            this.drawDot(ctx);
        },
        drawText: function drawText(ctx, txt, i) {
            ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax);
            ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei';
            var x = (i + 1) * (this.contentWidth / (this.identifyCode.length + 1));
            var y = this.randomNum(this.fontSizeMax, this.contentHeight - 5);
            var deg = this.randomNum(-45, 45);
            // 修改坐标原点和旋转角度
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(txt, 0, 0);
            // 恢复坐标原点和旋转角度
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y);
        },
        drawLine: function drawLine(ctx) {
            // 绘制干扰线
            for (var i = 0; i < 8; i++) {
                ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax);
                ctx.beginPath();
                ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
                ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight));
                ctx.stroke();
            }
        },
        drawDot: function drawDot(ctx) {
            // 绘制干扰点
            for (var i = 0; i < 100; i++) {
                ctx.fillStyle = this.randomColor(0, 255);
                ctx.beginPath();
                ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    },
    watch: {
        identifyCode: function identifyCode() {
            this.drawPic();
        }
    },
    mounted: function mounted() {
        this.drawPic();
    }
});

/***/ }),

/***/ 115:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 116:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bd2f4356807ac29aa1f06e1da3a10040.jpg";

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1eaf7a0301f0553ec03a71cac5d2e068.png";

/***/ }),

/***/ 119:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "dc0d754ef4f0236e6d7fbb5f119ce873.jpg";

/***/ }),

/***/ 120:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(116)

var Component = __webpack_require__(32)(
  /* script */
  __webpack_require__(113),
  /* template */
  __webpack_require__(124),
  /* scopeId */
  "data-v-4a7498ab",
  /* cssModules */
  null
)
Component.options.__file = "E:\\FILE_myself\\Learning\\juniorsecond\\system_design\\system-design\\frontend\\TimeIsMoney\\src\\views\\components\\IdentifyFromAPI.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] IdentifyFromAPI.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4a7498ab", Component.options)
  } else {
    hotAPI.reload("data-v-4a7498ab", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 121:
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(32)(
  /* script */
  __webpack_require__(114),
  /* template */
  __webpack_require__(122),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\FILE_myself\\Learning\\juniorsecond\\system_design\\system-design\\frontend\\TimeIsMoney\\src\\views\\components\\IdentifyFromLocal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] IdentifyFromLocal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-28a2973c", Component.options)
  } else {
    hotAPI.reload("data-v-28a2973c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 122:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "s-canvas"
  }, [_c('canvas', {
    attrs: {
      "id": "s-canvas",
      "width": _vm.contentWidth,
      "height": _vm.contentHeight
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-28a2973c", module.exports)
  }
}

/***/ }),

/***/ 123:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Modal', {
    attrs: {
      "width": "600px"
    },
    model: {
      value: (_vm.signIn),
      callback: function($$v) {
        _vm.signIn = $$v
      },
      expression: "signIn"
    }
  }, [_c('div', {
    attrs: {
      "id": "headImg"
    }
  }, [_c('img', {
    attrs: {
      "id": "img",
      "src": __webpack_require__(117),
      "alt": "正方形的原始图片"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })]), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "right"
    },
    attrs: {
      "id": "rightPart"
    }
  }, [_c('div', {
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
      "src": __webpack_require__(118),
      "alt": "正方形的原始图片",
      "width": "150px",
      "height": "150px"
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "allInput"
  }, [(_vm.wrong) ? _c('span', {
    staticStyle: {
      "color": "#ce4545"
    }
  }, [_vm._v("*" + _vm._s(_vm.alert))]) : _vm._e(), _vm._v(" "), _c('Input', {
    staticStyle: {
      "margin-top": "15px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "用户名/手机/邮箱",
      "type": "text"
    },
    model: {
      value: (_vm.info.username),
      callback: function($$v) {
        _vm.$set(_vm.info, "username", $$v)
      },
      expression: "info.username"
    }
  }), _vm._v(" "), _c('Input', {
    staticStyle: {
      "margin-top": "15px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "密码",
      "type": "password"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.doSignIn($event)
      }
    },
    model: {
      value: (_vm.info.password),
      callback: function($$v) {
        _vm.$set(_vm.info, "password", $$v)
      },
      expression: "info.password"
    }
  }), _vm._v(" "), _c('div', [_c('Input', {
    staticStyle: {
      "margin-top": "15px",
      "width": "150px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入验证码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.doSignIn($event)
      }
    },
    model: {
      value: (_vm.checkNum),
      callback: function($$v) {
        _vm.checkNum = $$v
      },
      expression: "checkNum"
    }
  }), _vm._v(" "), _c('SIdentify', {
    staticStyle: {
      "margin-top": "15px",
      "float": "right"
    },
    attrs: {
      "identifyCode": _vm.identifyCode2
    },
    nativeOn: {
      "click": function($event) {
        return _vm.refreshCode($event)
      }
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "allButton"
  }, [_c('div', {
    staticStyle: {
      "clear": "both"
    }
  }), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-top": "15px"
    },
    attrs: {
      "id": "loginBt",
      "size": "large",
      "long": ""
    },
    nativeOn: {
      "click": function($event) {
        return _vm.doSignIn($event)
      }
    }
  }, [_vm._v("登录")]), _vm._v(" "), _c('div', {
    staticClass: "smallBt"
  }, [_c('Button', {
    staticStyle: {
      "color": "#0066cc",
      "border-color": "#fff"
    },
    attrs: {
      "id": "findPass",
      "size": "small"
    }
  }, [_vm._v("找回密码")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "color": "#0066cc",
      "border-color": "#fff"
    },
    attrs: {
      "id": "signNow",
      "size": "small"
    },
    on: {
      "click": _vm.changeToSignUp
    }
  }, [_vm._v("立即注册")])], 1)], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })]), _vm._v(" "), _c('Modal', {
    attrs: {
      "width": "600px"
    },
    model: {
      value: (_vm.signUp),
      callback: function($$v) {
        _vm.signUp = $$v
      },
      expression: "signUp"
    }
  }, [_c('div', {
    attrs: {
      "id": "headImg"
    }
  }, [_c('img', {
    attrs: {
      "id": "img",
      "src": __webpack_require__(119),
      "alt": "正方形的原始图片"
    }
  }), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })]), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "right",
      "padding-top": "70px"
    },
    attrs: {
      "id": "rightPart"
    }
  }, [_c('div', {
    staticClass: "allInput"
  }, [(_vm.wrong) ? _c('span', {
    staticStyle: {
      "color": "#ce4545"
    }
  }, [_vm._v("*" + _vm._s(_vm.alert))]) : _vm._e(), _vm._v(" "), _c('Input', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入用户名/手机/邮箱",
      "type": "text"
    },
    model: {
      value: (_vm.info.username),
      callback: function($$v) {
        _vm.$set(_vm.info, "username", $$v)
      },
      expression: "info.username"
    }
  }), _vm._v(" "), _c('Input', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入密码",
      "type": "password"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.doSignUp($event)
      }
    },
    model: {
      value: (_vm.info.password),
      callback: function($$v) {
        _vm.$set(_vm.info, "password", $$v)
      },
      expression: "info.password"
    }
  }), _vm._v(" "), _c('div', [_c('Input', {
    staticStyle: {
      "margin-top": "25px",
      "width": "150px"
    },
    attrs: {
      "prefix": "ios-contact",
      "placeholder": "请输入验证码"
    },
    nativeOn: {
      "keyup": function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")) { return null; }
        return _vm.doSignUp($event)
      }
    },
    model: {
      value: (_vm.info.inputCode),
      callback: function($$v) {
        _vm.$set(_vm.info, "inputCode", $$v)
      },
      expression: "info.inputCode"
    }
  }), _vm._v(" "), _c('SIdentify1', {
    staticStyle: {
      "float": "right",
      "margin-top": "25px",
      "height": "40px"
    },
    nativeOn: {
      "click": function($event) {
        return _vm.sendIndentify($event)
      }
    }
  })], 1)], 1), _vm._v(" "), _c('div', {
    staticClass: "allButton"
  }, [_c('div', {
    staticStyle: {
      "clear": "both"
    }
  }), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-top": "25px"
    },
    attrs: {
      "id": "signup",
      "size": "large",
      "long": ""
    },
    on: {
      "click": _vm.doSignUp
    }
  }, [_vm._v("注册")]), _vm._v(" "), _c('div', {
    staticClass: "smallBt"
  }, [_c('Button', {
    staticStyle: {
      "color": "#0066cc",
      "border-color": "#fff"
    },
    attrs: {
      "id": "signNow",
      "size": "small"
    },
    on: {
      "click": _vm.changeToSignIn
    }
  }, [_vm._v("已有账号？")])], 1)], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-35573b3d", module.exports)
  }
}

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "sendCheck"
    }
  }, [_c('Button', {
    staticClass: "sendcode",
    staticStyle: {
      "width": "110px"
    },
    attrs: {
      "disabled": _vm.sdisabled
    },
    on: {
      "click": _vm.sendcode
    }
  }, [_vm._v("\n        " + _vm._s(_vm.btntxt) + "\n    ")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4a7498ab", module.exports)
  }
}

/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(115)

var Component = __webpack_require__(32)(
  /* script */
  __webpack_require__(112),
  /* template */
  __webpack_require__(123),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\FILE_myself\\Learning\\juniorsecond\\system_design\\system-design\\frontend\\TimeIsMoney\\src\\views\\Sign.vue"
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


/***/ })

});