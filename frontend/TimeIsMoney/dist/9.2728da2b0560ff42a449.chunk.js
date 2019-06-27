webpackJsonp([9],{

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_runFavor_index_js__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createFavor_SetFavor_vue__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__createFavor_SetFavor_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__createFavor_SetFavor_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createFavor_Pay_vue__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__createFavor_Pay_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__createFavor_Pay_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createFavor_Success_vue__ = __webpack_require__(207);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__createFavor_Success_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__createFavor_Success_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
        SetFavor: __WEBPACK_IMPORTED_MODULE_2__createFavor_SetFavor_vue___default.a,
        Pay: __WEBPACK_IMPORTED_MODULE_3__createFavor_Pay_vue___default.a,
        Success: __WEBPACK_IMPORTED_MODULE_4__createFavor_Success_vue___default.a
    },
    methods: {
        showStep: function showStep(step) {
            if (step === this.currentStep) return true;else return false;
        },
        handleReset: function handleReset(name) {
            this.$refs[name].resetFields();
        },
        back: function back() {
            this.alert = false;
            this.$store.commit('Favor/createFavor/CLEAR');
            this.$router.go(-1);
        },

        nextStep: function nextStep(data) {
            this.currentStep = this.currentStep + data;
        }
    }
});

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_runFavor_index_js__ = __webpack_require__(37);
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

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Favor/createFavor', {
        formContent: 'favorContent'
    }),
    methods: {
        changeStep: function changeStep(step) {
            var _this = this;

            var time = new Date(this.formContent.date).toLocaleDateString().replace(/\//g, '-') + " " + this.formContent.time;
            var data = {
                title: this.formContent.title,
                time: time,
                place: this.formContent.place,
                event: this.formContent.event,
                publisher: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                reward: this.formContent.reward,
                deposit: this.formContent.deposit,
                total: this.formContent.quantity
            };
            this.$store.dispatch('Favor/CREATE_FAVOR', data).then(function (info) {
                if (info) {
                    _this.$emit('changeStep', step);
                } else {
                    _this.$Message.error('错误');
                }
            });
        }
    }
});

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_runFavor_index_js__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
                title: [{ required: true, trigger: 'blur' }],
                date: [{ required: true, type: 'date', message: 'Please select the date', trigger: 'change' }],
                time: [{ required: true, type: 'string', message: 'Please select time', trigger: 'change' }],
                place: [{ required: true, trigger: 'blur' }],
                event: [{ required: true, trigger: 'blur' }],
                quantity: [{ required: false, trigger: 'blur' }, { type: 'number', message: '输入必须为整数', trigger: 'change', transform: function transform(value) {
                        return Number(value);
                    }
                }],
                deposit: [{ required: false, trigger: 'blur' }, { type: 'number', message: '输入必须为整数', trigger: 'change', transform: function transform(value) {
                        return Number(value);
                    }
                }],
                reward: [{ required: true, message: '报酬不能为空', trigger: 'blur' }, { type: 'number', message: '输入必须为整数', trigger: 'blur', transform: function transform(value) {
                        return Number(value);
                    }
                }],
                info: [{ required: true, type: 'array', min: 1, message: '至少选择显示一个联系方式', trigger: 'change' }, { type: 'array', trigger: 'change' }]
                // desc: [
                //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                // ]
            },
            formValidate: {
                title: '1111',
                date: '',
                time: '',
                place: '',
                event: 0,
                // gender: '',
                quantity: 1,
                info: [],
                deposit: 0
                // desc: ''
            }
        };
    },

    methods: {
        handleSubmit: function handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    _this.$store.commit('Favor/createFavor/SET_CONTENT', _this.formValidate);
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
            // //()
            this.$emit('changeStep', step);
        }
    }
});

/***/ }),

/***/ 145:
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
            _this.$router.push('/favor');
        }, 3000);
    }
});

/***/ }),

/***/ 158:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 163:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 164:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 167:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 198:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b5da1528fa80f29a03b2139fd9943148.png";

/***/ }),

/***/ 205:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(164)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(143),
  /* template */
  __webpack_require__(226),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createFavor\\Pay.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Pay.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52fe7b2a", Component.options)
  } else {
    hotAPI.reload("data-v-52fe7b2a", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 206:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(163)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(144),
  /* template */
  __webpack_require__(225),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createFavor\\SetFavor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] SetFavor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4ebd2349", Component.options)
  } else {
    hotAPI.reload("data-v-4ebd2349", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 207:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(167)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(145),
  /* template */
  __webpack_require__(229),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\createFavor\\Success.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Success.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5c839ec6", Component.options)
  } else {
    hotAPI.reload("data-v-5c839ec6", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 220:
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
      "height": "50px",
      "position": "relative",
      "margin-top": "20px"
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
      "float": "right"
    }
  }, [_c('Steps', {
    attrs: {
      "current": _vm.currentStep
    }
  }, [_c('Step', {
    attrs: {
      "title": "跑腿设置",
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
  }, [(_vm.showStep(0)) ? _c('SetFavor', {
    on: {
      "changeStep": _vm.nextStep
    }
  }) : (_vm.showStep(1)) ? _c('Pay', {
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-2368745c", module.exports)
  }
}

/***/ }),

/***/ 225:
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
      "label": "标题",
      "prop": "title"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入跑腿任务标题"
    },
    model: {
      value: (_vm.formValidate.title),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "title", $$v)
      },
      expression: "formValidate.title"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "事件",
      "prop": "event"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入跑腿任务具体内容"
    },
    model: {
      value: (_vm.formValidate.event),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "event", $$v)
      },
      expression: "formValidate.event"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "时间",
      "prop": "time"
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
      value: (_vm.formValidate.date),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "date", $$v)
      },
      expression: "formValidate.date"
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
      value: (_vm.formValidate.time),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "time", $$v)
      },
      expression: "formValidate.time"
    }
  })], 1)], 1)], 1)], 1), _vm._v(" "), _c('FormItem', {
    attrs: {
      "label": "地点",
      "prop": "place"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入跑腿任务标题"
    },
    model: {
      value: (_vm.formValidate.place),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "place", $$v)
      },
      expression: "formValidate.place"
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
      "placeholder": "输入召集数量"
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
      "label": "押金",
      "prop": "deposit"
    }
  }, [_c('Input', {
    attrs: {
      "placeholder": "输入本次任务价值"
    },
    model: {
      value: (_vm.formValidate.deposit),
      callback: function($$v) {
        _vm.$set(_vm.formValidate, "deposit", $$v)
      },
      expression: "formValidate.deposit"
    }
  })], 1), _vm._v(" "), _c('FormItem', {
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
      "margin-top": "40px"
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-4ebd2349", module.exports)
  }
}

/***/ }),

/***/ 226:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center"
    }
  }, [_c('img', {
    attrs: {
      "src": __webpack_require__(198)
    }
  }), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "20px",
      "margin-top": "20px"
    }
  }, [_vm._v("扫描二维码并支付"), _c('span', {
    staticStyle: {
      "font-size": "20px",
      "color": "#ce4545"
    }
  }, [_vm._v("￥" + _vm._s(_vm.formContent.reward * _vm.formContent.quantity))])]), _vm._v(" "), _c('p', [_vm._v("支付作为押金及填写酬金，未使用部分可退回")]), _vm._v(" "), _c('Button', {
    on: {
      "click": function($event) {
        _vm.changeStep(1)
      }
    }
  }, [_vm._v("手动下一步")])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-52fe7b2a", module.exports)
  }
}

/***/ }),

/***/ 229:
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
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5c839ec6", module.exports)
  }
}

/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(158)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(130),
  /* template */
  __webpack_require__(220),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\CreateFavor.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CreateFavor.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2368745c", Component.options)
  } else {
    hotAPI.reload("data-v-2368745c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});