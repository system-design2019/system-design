webpackJsonp([4],{

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createQues_SetQues_vue__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createQues_SetQues_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__createQues_SetQues_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createQues_EditQues_vue__ = __webpack_require__(208);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createQues_EditQues_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__createQues_EditQues_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createQues_Pay_vue__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createQues_Pay_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__createQues_Pay_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createQues_Success_vue__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__createQues_Success_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__createQues_Success_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            alert: false,
            currentStep: 0
        };
    },

    components: {
        SetQues: __WEBPACK_IMPORTED_MODULE_2__createQues_SetQues_vue___default.a,
        EditQues: __WEBPACK_IMPORTED_MODULE_3__createQues_EditQues_vue___default.a,
        Pay: __WEBPACK_IMPORTED_MODULE_4__createQues_Pay_vue___default.a,
        Success: __WEBPACK_IMPORTED_MODULE_5__createQues_Success_vue___default.a
    },
    methods: {
        handleSubmit: function handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    console.log(1);
                    _this.$store.dispatch('Ques/createQues/POST_QUESTIONNAIRE', _this.formValidate);
                    _this.$Message.success('发布成功!');
                    _this.$router.push('questionnaire');
                } else {
                    _this.$Message.error('发布失败！请完善信息后再次尝试');
                }
            });
        },
        showStep: function showStep(step) {
            if (step === this.currentStep) return true;else return false;
        },
        handleReset: function handleReset(name) {
            this.$refs[name].resetFields();
        },
        back: function back() {
            this.alert = false;
            this.$store.commit('Ques/createQues/CLEAR');
            this.$router.go(-1);
        },

        nextStep: function nextStep(data) {
            this.currentStep = this.currentStep + data;
        }
    }
});

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            title: '',
            curr: 0,
            pos: 0
            // questions:[{mode: 1, order: 1, title:'试试', fill:false}]
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques/createQues', {
        formContent: 'formContent',
        questions: 'questions'
    }),
    mounted: function mounted() {},

    methods: {
        addQues: function addQues(mode) {
            var trans = parseInt(mode);
            var title = '题目' + String(this.questions.length + 1);
            if (mode === 1) {
                var data = {
                    mode: trans,
                    theorder: 0,
                    title: title,
                    fill: false
                };
                this.questions.push(data);
            } else {
                var _data = {
                    mode: trans,
                    theorder: 0,
                    title: title,
                    maxchoose: 1,
                    choices: ['选项1', '选项2'],
                    fill: false
                };
                this.questions.push(_data);
            }
        },
        getMode: function getMode(mode) {
            if (mode === 1) return '填空题';else return '选择题';
        },
        addOption: function addOption() {
            var op = '选项' + String(this.questions[this.curr].choices.length + 1);
            this.questions[this.curr].choices.push(op);
        },
        deleteOption: function deleteOption() {
            if (this.questions[this.curr].choices.length > 2) this.questions[this.curr].choices.pop();else {
                this.$Message.info('已经无法删除选项了~');
            }
        },
        changeOrder: function changeOrder() {
            var temp = this.questions[this.curr];
            var t = this.curr;
            this.curr = this.pos - 1;
            this.questions.splice(t, 1);
            if (this.pos === 1) {
                this.questions.unshift(temp);
            } else if (this.pos === this.questions.length + 1) {
                this.questions.push(temp);
            } else {
                var i = this.questions.length;
                while (i != this.pos - 1) {
                    this.questions[i] = this.questions[i - 1];
                    i--;
                }
                this.questions[i] = temp;
            }
        },
        deleteQues: function deleteQues() {
            var temp = this.curr;
            this.curr = 0;
            this.questions.splice(temp, 1);
        },

        goahead: function goahead() {

            var data = {
                title: this.title,
                number: this.questions.length,
                tians: [],
                xuans: []
            };
            var tianid = 0;
            var xuanid = 0;
            for (var i = 0; i < this.questions.length; ++i) {
                this.questions[i].theorder = i + 1;
                if (this.questions[i].mode === 1) {
                    this.questions[i].tianID = ++tianid;
                    data.tians.push(this.questions[i]);
                } else if (this.questions[i].mode === 2) {
                    this.questions[i].xuanID = ++xuanid;
                    data.xuans.push(this.questions[i]);
                }
            }
            this.$store.commit('Ques/createQues/SET_CONTENT', data);
            // console.log('data'+JSON.stringify(data))
            this.$emit('changeStep', 1);
        }
    }
});

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_personal_index_js__ = __webpack_require__(36);
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

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])({
        formValidate: function formValidate(state) {
            return state.Ques.createQues.formValidate;
        },
        formContent: function formContent(state) {
            return state.Ques.createQues.formContent;
        },
        personDetail: function personDetail(state) {
            return state.Personal.personalInfo;
        }
    }),
    methods: {
        changeStep: function changeStep(step) {
            var _this = this;

            this.$store.dispatch('Personal/GET_INFO').then(function (res) {
                var data = {
                    log: JSON.parse(window.sessionStorage.getItem('LogInfo')).log,
                    userID: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                    username: _this.personDetail.nickname,
                    money: _this.personDetail.asset
                };
                window.sessionStorage.setItem('LogInfo', JSON.stringify(data));
                //console.error(data)
                var asset = _this.personDetail.asset;
                if (asset >= _this.formValidate.reward * _this.formValidate.quantity) {
                    var s = '{"formValidate":' + JSON.stringify(_this.formValidate) + ',"formContent":' + JSON.stringify(_this.formContent) + '}';
                    console.log(s);
                    var ques = JSON.parse(s);
                    // console.log('data')
                    // console.log(data)
                    _this.$store.dispatch('Ques/CREATE_QUES', ques);
                    _this.$emit('changeStep', step);
                } else {
                    _this.$Message.error('M币不足，请修改后重新发布！');
                }
            });
        }
    }
});

/***/ }),

/***/ 148:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            ruleValidate: {
                detail: [{ required: false, trigger: 'blur' }],
                command: [{ required: false, trigger: 'blur' }],
                quantity: [{ required: true, trigger: 'blur' }, { type: 'number', message: '输入必须为整数', trigger: 'change', transform: function transform(value) {
                        return Number(value);
                    }
                }],
                reward: [{ required: true, message: '报酬不能为空', trigger: 'blur' }, { type: 'number', message: '输入必须为整数', trigger: 'blur', transform: function transform(value) {
                        return Number(value);
                    }
                }],
                // gender: [
                //     { required: true, message: 'Please select gender', trigger: 'change' }
                // ],
                info: [{ required: true, type: 'array', min: 1, message: '至少选择显示一个联系方式', trigger: 'change' }, { type: 'array', trigger: 'change' }],
                startdate: [{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }],
                starttime: [{ required: true, type: 'string', message: 'Please select time', trigger: 'change' }],
                enddate: [{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }],
                endtime: [{ required: true, type: 'string', message: 'Please select time', trigger: 'change' }]
                // desc: [
                //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                // ]
            },
            formValidate: {
                title: '1111',
                detail: '',
                command: '',
                reward: 0,
                // gender: '',
                quantity: 0,
                info: [],
                startdate: '',
                starttime: '',
                enddate: '',
                endtime: '',
                number: 0
                // desc: ''
            }
        };
    },

    methods: {
        handleSubmit: function handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    _this.$store.commit('Ques/createQues/SET_VALIDATE', _this.formValidate);
                    // this.$Message.success('发布成功!');
                    // this.$router.push('questionnaire');
                    console.log("shezhi: " + JSON.stringify(_this.formValidate));
                    _this.$emit('changeStep', 1);
                } else {
                    _this.$Message.error('设置失败！请完善信息后再次尝试');
                }
            });
        },
        handleReset: function handleReset(name) {
            this.$refs[name].resetFields();
        },

        changeStep: function changeStep(step) {
            // console.log()
            this.$emit('changeStep', step);
        }
    }
});

/***/ }),

/***/ 149:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
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
    mounted: function mounted() {
        var _this = this;

        setTimeout(function () {
            _this.$router.push('/questionnaire');
        }, 3000);
    }
});

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 159:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 160:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 170:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 208:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(168)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(146),
  /* template */
  __webpack_require__(231),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createQues\\EditQues.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] EditQues.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7108bced", Component.options)
  } else {
    hotAPI.reload("data-v-7108bced", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 209:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(155)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(147),
  /* template */
  __webpack_require__(216),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createQues\\Pay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-179fa247", Component.options)
  } else {
    hotAPI.reload("data-v-179fa247", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 210:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(170)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(148),
  /* template */
  __webpack_require__(233),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createQues\\SetQues.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SetQues.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a4539d1a", Component.options)
  } else {
    hotAPI.reload("data-v-a4539d1a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 211:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(159)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(149),
  /* template */
  __webpack_require__(221),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createQues\\Success.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Success.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-313730a2", Component.options)
  } else {
    hotAPI.reload("data-v-313730a2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center"
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "20px",
      "margin-top": "20px"
    }
  }, [_vm._v("你需要支付"), _c('span', {
    staticStyle: {
      "font-size": "20px",
      "color": "#ce4545"
    }
  }, [_vm._v("￥" + _vm._s(_vm.formValidate.reward * _vm.formValidate.quantity))]), _vm._v("M币，确认支付？")]), _vm._v(" "), _c('p', [_vm._v("支付作为押金及填写酬金，未使用部分可退回")]), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.changeStep(1)
      }
    }
  }, [_vm._v("确认支付")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-179fa247", module.exports)
  }
}

/***/ }),

/***/ 221:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center"
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "30px",
      "font-weight": "700",
      "margin": "20px 0"
    }
  }, [_vm._v("发布成功")]), _vm._v(" "), _c('p', [_vm._v("3s后自动跳转")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-313730a2", module.exports)
  }
}

/***/ }),

/***/ 222:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "background": "#ffffff",
      "margin": "auto",
      "padding": "10px"
    }
  }, [_c('div', {
    staticStyle: {
      "margin": "0px 15%"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "overflow": "hidden",
      "height": "70px",
      "position": "relative",
      "margin-top": "20px",
      "padding-bottom": "10px"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "5%",
      "float": "left"
    }
  }, [_c('Icon', {
    staticStyle: {
      "float": "left",
      "bottom": "5px"
    },
    attrs: {
      "type": "ios-arrow-back",
      "size": "24"
    },
    on: {
      "click": function($event) {
        _vm.alert = !_vm.alert
      }
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "95%",
      "float": "right",
      "background": "#ffffff"
    }
  }, [_c('Steps', {
    attrs: {
      "current": _vm.currentStep
    }
  }, [_c('Step', {
    staticStyle: {
      "background": "#ffffff"
    },
    attrs: {
      "title": "问卷编辑",
      "content": "编辑问卷内容"
    }
  }), _vm._v(" "), _c('Step', {
    attrs: {
      "title": "问卷设置",
      "content": "设置问卷发布的相关参数"
    }
  }), _vm._v(" "), _c('Step', {
    attrs: {
      "title": "押金支付",
      "content": "支付押金"
    }
  }), _vm._v(" "), _c('Step', {
    attrs: {
      "title": "发布成功",
      "content": "发布成功"
    }
  })], 1)], 1)]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "40px",
      "overflow": "hidden"
    }
  }, [(_vm.showStep(0)) ? _c('EditQues', {
    on: {
      "changeStep": _vm.nextStep
    }
  }) : (_vm.showStep(1)) ? _c('SetQues', {
    on: {
      "changeStep": _vm.nextStep
    }
  }) : (_vm.showStep(2)) ? _c('Pay', {
    on: {
      "changeStep": _vm.nextStep
    }
  }) : _c('Success')], 1), _vm._v(" "), _c('Modal', {
    attrs: {
      "title": "提示",
      "styles": {
        top: '100px'
      }
    },
    model: {
      value: (_vm.alert),
      callback: function($$v) {
        _vm.alert = $$v
      },
      expression: "alert"
    }
  }, [_c('p', {
    staticStyle: {
      "text-align": "center",
      "margin": "10px",
      "font-size": "15px"
    }
  }, [_vm._v("此时返回系统不会保存已经填写的内容。确认返回？")]), _vm._v(" "), _c('button', {
    staticStyle: {
      "width": "100px",
      "font-size": "15px",
      "margin-bottom": "20px",
      "margin-left": "200px"
    },
    on: {
      "click": _vm.back
    }
  }, [_vm._v("确认")])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-416107ee", module.exports)
  }
}

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('div', {
    staticStyle: {
      "overflow": "hidden"
    }
  }, [_c('div', {
    staticStyle: {
      "float": "left",
      "width": "10%",
      "position": "relative； border: 2px"
    }
  }, [_c('Button', {
    staticStyle: {
      "margin-bottom": "10px"
    },
    on: {
      "click": function($event) {
        _vm.addQues(1)
      }
    }
  }, [_vm._v("+填空题")]), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.addQues(2)
      }
    }
  }, [_vm._v("+选择题")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "right",
      "width": "90%"
    }
  }, [_c('div', {
    staticStyle: {
      "float": "left",
      "width": "70%",
      "position": "relative",
      "border": "2px #000000"
    }
  }, [_c('Input', {
    staticStyle: {
      "font-size": "28px",
      "height": "40px",
      "width": "100%"
    },
    attrs: {
      "placeholder": "问卷标题"
    },
    model: {
      value: (_vm.title),
      callback: function($$v) {
        _vm.title = $$v
      },
      expression: "title"
    }
  }), _vm._v(" "), _c('Divider'), _vm._v(" "), _c('div', _vm._l((_vm.questions), function(q, index) {
    return _c('Card', {
      key: index,
      staticStyle: {
        "margin": "5px 0"
      },
      nativeOn: {
        "click": function($event) {
          _vm.curr = index
        }
      }
    }, [_c('span', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: (q.fill),
        expression: "q.fill"
      }],
      staticStyle: {
        "color": "#ce4545"
      }
    }, [_vm._v("* ")]), _c('span', {
      staticStyle: {
        "margin": "5px 5px 10px 0"
      }
    }, [_vm._v(_vm._s(index + 1) + "." + _vm._s(q.title))]), _vm._v(" "), (q.mode === 1) ? _c('div', [_c('Input')], 1) : _c('div', _vm._l((q.choices), function(c, index) {
      return _c('Checkbox', {
        staticStyle: {
          "width": "100%",
          "margin": "5px 0"
        }
      }, [_vm._v(_vm._s(c))])
    }))])
  }))], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "left",
      "width": "30%",
      "position": "relative",
      "padding": "0 1%"
    }
  }, [_c('Card', [_c('p', [_vm._v("类型：" + _vm._s(_vm.getMode(_vm.questions[_vm.curr].mode)))]), _c('Divider'), _vm._v(" "), _c('p', [_vm._v("标题")]), _c('Input', {
    model: {
      value: (_vm.questions[_vm.curr].title),
      callback: function($$v) {
        _vm.$set(_vm.questions[_vm.curr], "title", $$v)
      },
      expression: "questions[curr].title"
    }
  }), _c('Divider'), _vm._v(" "), (_vm.questions[_vm.curr].mode === 2) ? _c('div', [_vm._l((_vm.questions[_vm.curr].choices), function(op, index) {
    return _c('div', {
      staticStyle: {
        "margin": "15px 0"
      }
    }, [_c('span', [_vm._v("选项" + _vm._s(index + 1) + ":")]), _c('Input', {
      model: {
        value: (_vm.questions[_vm.curr].choices[index]),
        callback: function($$v) {
          _vm.$set(_vm.questions[_vm.curr].choices, index, $$v)
        },
        expression: "questions[curr].choices[index]"
      }
    })], 1)
  }), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.addOption()
      }
    }
  }, [_vm._v("添加选项")]), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.deleteOption()
      }
    }
  }, [_vm._v("移除选项")]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "10px"
    }
  }, [_c('span', [_vm._v("最多可选：")]), _c('InputNumber', {
    attrs: {
      "max": _vm.questions[_vm.curr].choices.length,
      "min": 1
    },
    model: {
      value: (_vm.questions[_vm.curr].choose),
      callback: function($$v) {
        _vm.$set(_vm.questions[_vm.curr], "choose", $$v)
      },
      expression: "questions[curr].choose"
    }
  })], 1), _vm._v(" "), _c('Divider')], 2) : _vm._e(), _vm._v(" "), _c('div', [_c('span', [_vm._v("修改顺序：")]), _c('InputNumber', {
    attrs: {
      "max": _vm.questions.length,
      "min": 1
    },
    model: {
      value: (_vm.pos),
      callback: function($$v) {
        _vm.pos = $$v
      },
      expression: "pos"
    }
  }), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.changeOrder()
      }
    }
  }, [_vm._v("确定")]), _c('Divider')], 1), _vm._v(" "), _c('div', [_c('span', [_vm._v("必填：")]), _c('i-switch', {
    model: {
      value: (_vm.questions[_vm.curr].fill),
      callback: function($$v) {
        _vm.$set(_vm.questions[_vm.curr], "fill", $$v)
      },
      expression: "questions[curr].fill"
    }
  }), _c('Divider')], 1), _vm._v(" "), _c('div', [_c('Button', {
    on: {
      "click": function($event) {
        _vm.deleteQues()
      }
    }
  }, [_vm._v("删除此问题")])], 1)], 1)], 1)])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center",
      "margin-top": "20px"
    }
  }, [_c('Button', {
    on: {
      "click": function($event) {
        _vm.goahead()
      }
    }
  }, [_vm._v("下一步")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-7108bced", module.exports)
  }
}

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%"
    }
  }, [_c('Form', {
    ref: "formValidate",
    attrs: {
      "model": _vm.formValidate,
      "rules": _vm.ruleValidate,
      "label-width": 100
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "简介",
      "prop": "detail"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入问卷简介"
    },
    model: {
      value: (_vm.formValidate.detail),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "detail", $$v)
      },
      expression: "formValidate.detail"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "要求",
      "prop": "command"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入问卷填写者限制，如：大学生"
    },
    model: {
      value: (_vm.formValidate.command),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "command", $$v)
      },
      expression: "formValidate.command"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "酬金",
      "prop": "reward"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入每份问卷填写报酬"
    },
    model: {
      value: (_vm.formValidate.reward),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "reward", $$v)
      },
      expression: "formValidate.reward"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "招募数量",
      "prop": "quantity"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入目标收集数量"
    },
    model: {
      value: (_vm.formValidate.quantity),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "quantity", $$v)
      },
      expression: "formValidate.quantity"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "开始时间"
    }
  }, [_c('Row', [_c('Col', {
    attrs: {
      "span": "6"
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "startdate"
    }
  }, [_c('DatePicker', {
    attrs: {
      "type": "date",
      "placeholder": "选择日期"
    },
    model: {
      value: (_vm.formValidate.startdate),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "startdate", $$v)
      },
      expression: "formValidate.startdate"
    }
  })], 1)], 1), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "6"
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "starttime"
    }
  }, [_c('TimePicker', {
    attrs: {
      "type": "time",
      "placeholder": "选择时间"
    },
    model: {
      value: (_vm.formValidate.starttime),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "starttime", $$v)
      },
      expression: "formValidate.starttime"
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "结束时间"
    }
  }, [_c('Row', [_c('Col', {
    attrs: {
      "span": "6"
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "enddate"
    }
  }, [_c('DatePicker', {
    attrs: {
      "type": "date",
      "placeholder": "选择日期"
    },
    model: {
      value: (_vm.formValidate.enddate),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "enddate", $$v)
      },
      expression: "formValidate.enddate"
    }
  })], 1)], 1), _vm._v(" "), _c('Col', {
    attrs: {
      "span": "6"
    }
  }, [_c('FormItem', {
    attrs: {
      "prop": "endtime"
    }
  }, [_c('TimePicker', {
    attrs: {
      "type": "time",
      "placeholder": "选择时间"
    },
    model: {
      value: (_vm.formValidate.endtime),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "endtime", $$v)
      },
      expression: "formValidate.endtime"
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "个人信息展示",
      "prop": "info"
    }
  }, [_c('CheckboxGroup', {
    model: {
      value: (_vm.formValidate.info),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "info", $$v)
      },
      expression: "formValidate.info"
    }
  }, [_c('Checkbox', {
    attrs: {
      "label": "微信"
    }
  }), _vm._v(" "), _c('Checkbox', {
    attrs: {
      "label": "电话"
    }
  }), _vm._v(" "), _c('Checkbox', {
    attrs: {
      "label": "QQ"
    }
  }), _vm._v(" "), _c('Checkbox', {
    attrs: {
      "label": "个性签名"
    }
  })], 1)], 1)], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center",
      "margin-top": "105px"
    }
  }, [_c('Button', {
    staticStyle: {
      "margin-right": "10px"
    },
    on: {
      "click": function($event) {
        _vm.changeStep(-1)
      }
    }
  }, [_vm._v("上一步")]), _c('Button', {
    on: {
      "click": function($event) {
        _vm.handleSubmit('formValidate')
      }
    }
  }, [_vm._v("下一步")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-a4539d1a", module.exports)
  }
}

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(160)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(131),
  /* template */
  __webpack_require__(222),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\CreateQues.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateQues.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-416107ee", Component.options)
  } else {
    hotAPI.reload("data-v-416107ee", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});