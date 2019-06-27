webpackJsonp([14],{

/***/ 132:
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



/* harmony default export */ __webpack_exports__["default"] = ({
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques/fillQues', {
        form: 'formContent',
        answers: 'answers',
        rules: 'rules'
    }),
    methods: {
        getKey: function getKey(index) {
            return 'answer' + String(index + 1);
        },
        handleSubmit: function handleSubmit(name) {
            var _this = this;

            this.$refs[name].validate(function (valid) {
                if (valid) {
                    var data = {
                        userid: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                        quesid: window.sessionStorage.getItem('fillQuesId'),
                        number: _this.form.questions.length,
                        answer: _this.answers
                    };
                    console.log(_this.answers);
                    console.log(data);
                    _this.$store.dispatch('Ques/fillQues/POST_QUES', data).then(function (response) {
                        if (response.success) {
                            _this.$Message.success('提交成功');
                            // let data = {
                            //     fromId: parseInt(JSON.parse(window.sessionStorage.getItem('LogInfo')).userID),
                            //     fromName: JSON.parse(window.sessionStorage.getItem('LogInfo')).username,
                            //     toId: parseInt(window.sessionStorage.getItem('fillQuesUserId')),
                            //     quesTitle: this.form.title,
                            //     type: 'fill'
                            // }
                            // this.$store.dispatch('MESSAGE', data).then(
                            //     (response) => {
                            //         if(response.success){
                            //             console.error('111')
                            //         }
                            //     })
                            _this.$router.push('/questionnaire');
                        } else {
                            _this.$Message.error(response.msg);
                        }
                    });
                } else {
                    _this.$Message.error('Fail!');
                }
            });
        }
    },
    created: function created() {
        var id = parseInt(window.sessionStorage.getItem('fillQuesId'));
        this.$store.dispatch('Ques/fillQues/SET_FILL_QUES', id);
    }
});

/***/ }),

/***/ 173:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "margin": "20px 15%",
      "min-height": "800px"
    }
  }, [_c('p', {
    staticStyle: {
      "font-size": "32px",
      "font-weight": "700",
      "text-align": "center"
    }
  }, [_vm._v(_vm._s(_vm.form.title))]), _vm._v(" "), _c('Divider'), _vm._v(" "), _c('Form', {
    ref: "formFill",
    attrs: {
      "model": _vm.answers,
      "rules": _vm.rules,
      "label-width": 80,
      "label-position": "top"
    }
  }, _vm._l((_vm.form.questions), function(q, index) {
    return _c('Card', {
      key: index,
      staticStyle: {
        "margin": "5px 0",
        "padding": "30px 10px 10px 10px"
      }
    }, [_c('FormItem', {
      attrs: {
        "prop": _vm.getKey(index)
      }
    }, [_c('p', [_vm._v(_vm._s(index + 1) + ". " + _vm._s(q.title))]), _vm._v(" "), (q.mode === 1) ? _c('Input', {
      model: {
        value: (_vm.answers['answer' + String(index + 1)]),
        callback: function($$v) {
          _vm.$set(_vm.answers, 'answer' + String(index + 1), $$v)
        },
        expression: "answers['answer'+String(index+1)]"
      }
    }) : (q.mode === 2) ? _c('CheckboxGroup', {
      model: {
        value: (_vm.answers['answer' + String(index + 1)]),
        callback: function($$v) {
          _vm.$set(_vm.answers, 'answer' + String(index + 1), $$v)
        },
        expression: "answers['answer'+String(index+1)]"
      }
    }, _vm._l((_vm.form.questions[index].choices), function(c, index_c) {
      return _c('Checkbox', {
        key: index_c,
        staticStyle: {
          "width": "100%"
        },
        attrs: {
          "label": c
        }
      })
    })) : _vm._e()], 1)], 1)
  })), _vm._v(" "), _c('div', {
    staticStyle: {
      "text-align": "center"
    }
  }, [_c('Button', {
    staticStyle: {
      "margin": "20px 0"
    },
    on: {
      "click": function($event) {
        _vm.handleSubmit('formFill')
      }
    }
  }, [_vm._v("提交")])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6ee169a1", module.exports)
  }
}

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(173)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(132),
  /* template */
  __webpack_require__(230),
  /* scopeId */
  "data-v-6ee169a1",
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\FillingQues.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] FillingQues.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ee169a1", Component.options)
  } else {
    hotAPI.reload("data-v-6ee169a1", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});