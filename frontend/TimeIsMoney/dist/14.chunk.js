webpackJsonp([14],{

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "margin": "0px 15%"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "overflow": "hidden",
      "height": "50px",
      "position": "relative"
    }
  }, [_c('Icon', {
    staticStyle: {
      "float": "left",
      "width": "2%",
      "position": "absolute",
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
  }), _vm._v(" "), _c('h1', {
    staticStyle: {
      "width": "98%",
      "float": "right",
      "position": "absolute",
      "bottom": "0",
      "left": "3%"
    }
  }, [_vm._v("发布问卷")])], 1), _vm._v(" "), _c('br'), _vm._v(" "), _c('div', {
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
      "placeholder": "输入问卷标题"
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
  })], 1)], 1), _vm._v(" "), _c('FormItem', [_c('Button', {
    attrs: {
      "type": "primary"
    },
    on: {
      "click": function($event) {
        _vm.handleSubmit('formValidate')
      }
    }
  }, [_vm._v("Submit")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-left": "8px"
    },
    on: {
      "click": function($event) {
        _vm.handleReset('formValidate')
      }
    }
  }, [_vm._v("Reset")])], 1)], 1), _vm._v(" "), _c('Modal', {
    attrs: {
      "title": "提示",
      "styles": {
        top: '20px'
      }
    },
    on: {
      "on-ok": _vm.back
    },
    model: {
      value: (_vm.alert),
      callback: function($$v) {
        _vm.alert = $$v
      },
      expression: "alert"
    }
  }, [_c('p', [_vm._v("此时返回系统不会保存已经填写的内容。确认返回？")])])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-416107ee", module.exports)
  }
}

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(84)

var Component = __webpack_require__(16)(
  /* script */
  __webpack_require__(66),
  /* template */
  __webpack_require__(107),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\CreateQues.vue"
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


/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(17);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            // formValidate: {
            //     title: '',
            //     detail: '',
            //     command:'',
            //     reward: '',
            //     // gender: '',
            //     quantity:'',
            //     info:[],
            //     startdate: '',
            //     starttime: '',
            //     enddate: '',
            //     endtime: '',
            //     // desc: ''
            // },
            ruleValidate: {
                title: [{ required: true, message: '标题不能为空', trigger: 'blur' }],
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
            }
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques/createQues', {
        formValidate: 'formValidate'
    }),
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
        handleReset: function handleReset(name) {
            this.$refs[name].resetFields();
        },
        back: function back() {
            this.$router.push('questionnaire');
        }
    }
});

/***/ }),

/***/ 84:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

});
//# sourceMappingURL=14.chunk.js.map