webpackJsonp([15],{

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__store_runFavor_index_js__ = __webpack_require__(37);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
            title: '烤肉拌饭',
            id: 1,
            showAns: false,
            type: 'questionnaire'
        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])({
        form: function form(state) {
            return state.Ques.checkQues.formContent;
        },
        answers: function answers(state) {
            return state.Ques.checkQues.answers;
        },
        rules: function rules(state) {
            return state.Ques.checkQues.rules;
        },
        anslist: function anslist(state) {
            return state.Ques.checkQues.anslist;
        },
        attendlist: function attendlist(state) {
            return state.Favor.attendErrandList;
        }
    }),
    methods: {
        getKey: function getKey(index) {
            return 'answer' + String(index + 1);
        },
        back: function back() {
            this.$store.commit('Favor/createFavor/CLEAR');
            this.$router.go(-1);
        },
        checkAnsByUserId: function checkAnsByUserId(userid) {
            this.showAns = !this.showAns;
            var data = {
                quesid: this.id,
                userid: userid
            };
            this.$store.dispatch('Ques/checkQues/GET_ANS', data);
        }
    },
    created: function created() {
        this.type = this.$route.params.type;
        if (this.type == 'questionnaire') {
            this.id = parseInt(window.sessionStorage.getItem('fillQuesId'));
            this.title = window.sessionStorage.getItem('fillQuesTitle');
            this.$store.dispatch('Ques/checkQues/GET_QUES', this.id);
            this.$store.dispatch('Ques/checkQues/GET_ANS_LIST', this.id);
        } else {
            this.id = parseInt(window.sessionStorage.getItem('errandId'));
            this.title = window.sessionStorage.getItem('errandTitle');
            this.$store.dispatch('Favor/GET_ATTEND_LIST', this.id);
        }
    }
});

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 218:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "margin": "20px 9%"
    }
  }, [_c('div', {
    staticStyle: {
      "padding": "10px",
      "background": "#f8f8f9"
    }
  }, [_c('Card', {
    staticStyle: {
      "width": "100%",
      "min-height": "600px"
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
      "click": _vm.back
    }
  })], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "95%",
      "float": "right"
    }
  }, [_c('Breadcrumb', [_c('BreadcrumbItem', [_vm._v("参与详情")]), _vm._v(" "), _c('BreadcrumbItem', [_vm._v(_vm._s(_vm.title))])], 1)], 1)]), _vm._v(" "), (_vm.type == 'questionnaire') ? _c('CellGroup', {
    staticStyle: {
      "width": "100%"
    }
  }, _vm._l((_vm.anslist), function(a, index) {
    return _c('Cell', {
      key: index,
      staticClass: "alert",
      staticStyle: {
        "width": "100%"
      }
    }, [_c('span', {
      staticStyle: {
        "font-size": "17px",
        "font-weight": "700",
        "float": "left",
        "width": "78%"
      }
    }, [_vm._v("\n                        " + _vm._s(index + 1) + "\n                        "), _c('span', {
      staticStyle: {
        "color": "rgb(174,174,174)",
        "font-weight": "100",
        "padding-left": "10px"
      }
    }, [_vm._v(_vm._s(a.userName))])]), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "20%",
        "text-align": "right",
        "margin-right": "20px"
      }
    }, [_c('span', {
      staticStyle: {
        "float": "left",
        "width": "86%",
        "text-align": "right",
        "color": "rgb(174,174,174)"
      }
    }, [_vm._v(_vm._s(a.createTime))]), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "10%",
        "text-align": "right"
      }
    }, [_c('a', {
      staticStyle: {
        "text-align": "left",
        "color": "#ce4545"
      },
      on: {
        "click": function($event) {
          _vm.checkAnsByUserId(a.userID)
        }
      }
    }, [_vm._v("查看答案")])])])])
  })) : _c('CellGroup', {
    staticStyle: {
      "width": "100%"
    }
  }, _vm._l((_vm.attendlist), function(a, index) {
    return _c('Cell', {
      key: index,
      staticClass: "alert",
      staticStyle: {
        "width": "100%"
      }
    }, [_c('span', {
      staticStyle: {
        "font-size": "17px",
        "font-weight": "700",
        "float": "left",
        "width": "78%"
      }
    }, [_vm._v("\n                        " + _vm._s(index + 1) + "\n                        "), _c('span', {
      staticStyle: {
        "color": "rgb(174,174,174)",
        "font-weight": "100",
        "padding-left": "10px"
      }
    }, [_vm._v(_vm._s(a.partName))])]), _vm._v(" "), _c('div', {
      staticStyle: {
        "float": "right",
        "width": "20%",
        "text-align": "right",
        "margin-right": "20px"
      }
    }, [_c('span', {
      staticStyle: {
        "float": "left",
        "width": "86%",
        "text-align": "right",
        "color": "rgb(174,174,174)"
      }
    }, [_vm._v(_vm._s(a.partTime))])])])
  }))], 1)], 1), _vm._v(" "), _c('Modal', {
    attrs: {
      "fullscreen": "",
      "title": _vm.title
    },
    model: {
      value: (_vm.showAns),
      callback: function($$v) {
        _vm.showAns = $$v
      },
      expression: "showAns"
    }
  }, [_c('div', {
    staticStyle: {
      "margin": "20px 15%"
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
        "label": q.title,
        "prop": _vm.getKey(index)
      }
    }, [(q.mode === 1) ? _c('Input', {
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
  }))], 1)])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-19ad1614", module.exports)
  }
}

/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(172)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(128),
  /* template */
  __webpack_require__(218),
  /* scopeId */
  "data-v-19ad1614",
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\CheckList.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] CheckList.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-19ad1614", Component.options)
  } else {
    hotAPI.reload("data-v-19ad1614", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

});