webpackJsonp([8],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "bf2874df999edabe4b4f4adbf2791a18.png";

/***/ }),

/***/ 101:
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
    props: ['showDetail'],
    data: function data() {
        return {
            detail: false,
            own: false,
            confirm: false,
            info: '',
            id: 0,
            type: 0
        };
    },

    methods: {
        fillIn: function fillIn(id) {

            this.detail = false;
            var info = JSON.parse(window.sessionStorage.getItem('LogInfo'));
            if (!info.log) this.$Message.warning('您还未登录，请先登录后填写问卷。');else {
                if (this.attendQuesList.indexOf(id) != -1) {
                    this.$Message.warning('您已填写过此问卷，请勿重复填写');
                } else if (this.detailContent.Infos.total == this.detailContent.Infos.attend) {
                    this.$Message.warning('此问卷名额已满，请选择其他问卷');
                } else {
                    window.sessionStorage.setItem('fillQuesId', id);
                    //console.error('publisher:' + this.detailContent.publisher)
                    window.sessionStorage.setItem('fillQuesUserId', this.detailContent.publisher);
                    this.$router.push({ name: 'filling' });
                }
            }
        },
        checkAns: function checkAns(id) {
            this.detail = false;
            window.sessionStorage.setItem('fillQuesId', id);
            window.sessionStorage.setItem('fillQuesTitle', this.detailContent.title);
            this.$router.push({ name: 'checkList', params: { type: 'questionnaire' } });
        },
        setInformation: function setInformation(i, t) {
            if (t == 1) {
                this.info = '关闭问卷将不会回收到该问卷且无法重新开启，确认关闭问卷？（未使用押金会退回到您的账户）';
            } else {
                this.info = '删除问卷将无法到该问卷相关信息，确认删除问卷？（未使用押金会退回到您的账户）';
            }
            this.id = i;
            this.type = t;
        },
        deal: function deal() {
            if (this.t == 1) {
                closeQues(this.id);
            } else {
                deleteQues(this.id);
            }
        },
        closeQues: function closeQues(id) {
            var _this = this;

            this.detail = false;
            var data = {
                id: id,
                index: this.index
            };
            this.$store.dispatch('Ques/CLOSE_QUES', data).then(function (info) {
                _this.$Message.success('关闭问卷成功！');
                _this.$emit('refresh', true);
            });
        },
        deleteQues: function deleteQues(id) {
            var _this2 = this;

            this.detail = false;
            var data = {
                id: id,
                index: this.index
            };
            this.$store.dispatch('Ques/DELETE_QUES', data).then(function (info) {
                _this2.$Message.success('删除问卷成功！');
                _this2.$emit('refresh', true);
            });
        },
        isCollect: function isCollect(id) {
            if (this.collectQuesList.indexOf(id) != -1) {
                return './../../../static/task/collectTrue.png';
            } else {
                return './../../../static/task/collectFalse.png';
            }
        },
        changeCollectStatus: function changeCollectStatus(id) {
            this.$store.dispatch('Ques/CHANGE_COLLECT', id);
            // this.$store.dispatch('DELETE_CACHE')
        },
        getStatus: function getStatus(id) {
            if (this.detailContent.publisher == JSON.parse(window.sessionStorage.getItem('LogInfo')).userID) {
                return false;
            } else {
                return true;
            }
        }
    },
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques', {
        collectQuesList: 'collectQuesList',
        attendQuesList: 'attendQuesList',
        detailContent: 'quesDetail'
    }),
    mounted: function mounted() {
        // console.error(this.key)
    },

    watch: {
        showDetail: function showDetail(newdetail, olddetail) {
            this.detail = true;
            //console.error('watch!!!!!!!')
        }
    }
});

/***/ }),

/***/ 102:
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



/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['data', 'type', 'mode', 'collect'],
    data: function data() {
        return {
            contents: {
                id: 123,
                title: '电子',
                detail: '这里是为了凑格式给上面题目进行的一些解释',
                status: 1,
                total: 100,
                info: { publisher: 'anonymous', type: '问卷', time: '5min', reward: '10', endTime: '2019.5.3', attend: '90' }
            },
            showMode: 0,
            span: [3, 3, 3, 9, 3, 3],
            icon: ['./../../../static/task/publisher.png', './../../../static/task/ques.png', './../../../static/task/time.png', './../../../static/task/reward.png', './../../../static/task/date.png', './../../../static/task/attend.png']
        };
    },

    methods: {
        getIconByStatus: function getIconByStatus(id) {
            if (this.publishQuesList.indexOf(id) != -1) {
                return './../../static/task/my.png';
            } else if (this.attendQuesList.indexOf(id) != -1) {
                return './../../static/task/run.png';
            } else {
                return './../../static/task/on.png';
            }
        },
        ifShow: function ifShow(i) {
            if (i === 1) {
                if (this.mode === '1') return false;else return true;
            } else if (i < 4) {
                return true;
            }
        }
    },
    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques', {
        attendQuesList: 'attendQuesList',
        publishQuesList: 'publishQuesList'
    }),
    mounted: function mounted() {
        //("The type of this.data: " + typeof(this.data) + " " + this.data);
        if (typeof this.data != 'undefined') {
            this.contents.id = this.data.quesID;
            this.contents.title = this.data.title;
            this.contents.detail = this.data.detail;
            this.contents.status = this.data.status === 'not done' ? 1 : 0;
            this.contents.total = this.data.Infos.total;
            this.contents.info.publisher = this.data.publisherName;
            this.contents.info.type = this.type === '1' ? '问卷' : '跑腿';
            this.contents.info.time = '0min';
            this.contents.info.reward = this.data.reward;
            this.contents.info.endTime = this.data.Infos.endTime;
            this.contents.info.attend = this.mode === 0 ? String(this.data.Infos.total) : String(this.data.Infos.attend) + '/' + String(this.data.Infos.total);
        }
        // //(this.mode)
    }
});

/***/ }),

/***/ 103:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 104:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 105:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ee1c02b5b4b323537e15c9a2c754627b.png";

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0c20b1caaff5b6abc606c83b5195890a.png";

/***/ }),

/***/ 107:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(104)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(101),
  /* template */
  __webpack_require__(110),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\components\\Detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6ab9ba4c", Component.options)
  } else {
    hotAPI.reload("data-v-6ab9ba4c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(103)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(102),
  /* template */
  __webpack_require__(109),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\components\\Task.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Task.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3946ee4e", Component.options)
  } else {
    hotAPI.reload("data-v-3946ee4e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 109:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "task",
    staticStyle: {
      "margin": "15px 0"
    }
  }, [_c('card', {
    staticStyle: {
      "padding-left": "10px",
      "border-radius": "15px"
    }
  }, [_c('img', {
    staticStyle: {
      "position": "absolute",
      "right": "0",
      "top": "0"
    },
    attrs: {
      "src": _vm.getIconByStatus(_vm.contents.id),
      "width": "60px",
      "height": "60px"
    }
  }), _vm._v(" "), _c('Row', {
    staticStyle: {
      "margin-top": "20px"
    }
  }, [_c('span', {
    staticStyle: {
      "font-size": "23px",
      "font-weight": "700",
      "margin": "5px",
      "float": "left",
      "margin-right": "20px"
    }
  }, [_vm._v(_vm._s(_vm.contents.title))])]), _vm._v(" "), _c('Row', [_c('span', {
    staticStyle: {
      "font-size": "15px",
      "margin": "5px",
      "float": "left",
      "margin-right": "20px"
    }
  }, [_vm._v(_vm._s(_vm.contents.detail))])]), _vm._v(" "), _c('Row', {
    staticStyle: {
      "margin-top": "10px"
    },
    attrs: {
      "type": "flex"
    }
  }, [_c('div', {
    staticStyle: {
      "float": "left",
      "width": "60%"
    }
  }, _vm._l((_vm.contents.info), function(ele, key, i) {
    return (_vm.ifShow(i)) ? _c('div', {
      staticClass: "iconInDy vercenter",
      staticStyle: {
        "margin-right": "30px"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.icon[i],
        "width": "30px",
        "height": "30px"
      }
    }), _vm._v(" "), _c('span', {
      staticStyle: {
        "margin-left": "5px"
      }
    }, [_vm._v(_vm._s(ele))])]) : _vm._e()
  })), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "right",
      "width": "40%",
      "text-align": "right"
    }
  }, _vm._l((_vm.contents.info), function(ele, key, i) {
    return (i > 3) ? _c('div', {
      staticClass: "iconInDy vercenter",
      staticStyle: {
        "margin-right": "30px",
        "float": "right"
      }
    }, [_c('img', {
      attrs: {
        "src": _vm.icon[i],
        "width": "30px",
        "height": "30px"
      }
    }), _vm._v(" "), _c('span', {
      staticStyle: {
        "margin-left": "5px"
      }
    }, [_vm._v(_vm._s(ele))])]) : _vm._e()
  }))])], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3946ee4e", module.exports)
  }
}

/***/ }),

/***/ 110:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('Modal', {
    attrs: {
      "width": "800px",
      "class-name": "vertical-center-modal d",
      "mask-closable": false
    },
    model: {
      value: (_vm.detail),
      callback: function($$v) {
        _vm.detail = $$v
      },
      expression: "detail"
    }
  }, [_c('img', {
    staticStyle: {
      "position": "relative",
      "float": "left",
      "left": "-50px",
      "top": "-50px",
      "height": "500px"
    },
    attrs: {
      "src": __webpack_require__(105)
    }
  }), _vm._v(" "), _c('p', {
    staticStyle: {
      "font-size": "24px",
      "font-weight": "500px",
      "margin-top": "15px"
    }
  }, [_vm._v(_vm._s(_vm.detailContent.title))]), _vm._v(" "), _c('div', {
    staticStyle: {
      "overflow": "hidden",
      "width": "400px",
      "height": "7%",
      "margin-top": "10px"
    }
  }, [_c('div', {
    staticStyle: {
      "min-width": "200px",
      "max-width": "90%",
      "float": "left"
    }
  }, [_c('div', {
    staticStyle: {
      "min-width": "100px",
      "max-width": "300px",
      "float": "left",
      "margin": "0 10px 10px 0px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "30px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(99)
    }
  }), _vm._v(" "), _c('span', {
    staticStyle: {
      "font-size": "22px",
      "vertical-align": "middle"
    }
  }, [_vm._v(_vm._s(_vm.detailContent.publisherName))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "min-width": "100px",
      "max-width": "150px",
      "float": "right",
      "margin-bottom": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "30px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(100)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "hint",
    staticStyle: {
      "font-size": "22px",
      "color": "#ce4545",
      "vertical-align": "middle"
    }
  }, [_vm._v(_vm._s(_vm.detailContent.reward))])])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "float": "right",
      "width": "10%",
      "text-align": "right",
      "margin-bottom": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "30px"
    },
    attrs: {
      "src": _vm.isCollect(_vm.detailContent.quesID)
    },
    on: {
      "click": function($event) {
        _vm.changeCollectStatus(_vm.detailContent.quesID)
      }
    }
  })]), _vm._v(" "), _c('Divider', {
    staticClass: "detail"
  })], 1), _vm._v(" "), _c('div', [_c('h3', {
    staticStyle: {
      "margin": "0px 0 5px 0"
    }
  }, [_vm._v("简介")]), _vm._v(" "), _c('p', {
    staticClass: "hint",
    staticStyle: {
      "text-indent": "2em",
      "margin": "5px 0 0 0",
      "height": "9%",
      "margin-right": "10px"
    }
  }, [_vm._v(_vm._s(_vm.detailContent.detail))]), _vm._v(" "), _c('h3', {
    staticStyle: {
      "margin": "15px 0 5px 0"
    }
  }, [_vm._v("要求")]), _vm._v(" "), _c('p', {
    staticClass: "hint",
    staticStyle: {
      "text-indent": "2em",
      "margin": "5px 0 0 0",
      "height": "4%",
      "margin-right": "10px"
    }
  }, [_vm._v(_vm._s(_vm.detailContent.command))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "20px",
      "width": "50%",
      "position": "relative",
      "overflow": "hidden",
      "float": "left",
      "text-align": "left",
      "height": "37%"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "overflow": "hidden",
      "position": "relative"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%",
      "margin-top": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "25px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(106)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "hint"
  }, [_vm._v("题目数量 " + _vm._s(_vm.detailContent.number))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "margin-top": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "25px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(98)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "hint"
  }, [_vm._v("招募人数 " + _vm._s(_vm.detailContent.Infos.total) + "人 已有" + _vm._s(_vm.detailContent.Infos.attend) + "人参加")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "margin-top": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "25px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(97)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "hint"
  }, [_vm._v("开始时间 " + _vm._s(_vm.detailContent.Infos.startTime))])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "100%",
      "margin-top": "10px"
    }
  }, [_c('img', {
    staticStyle: {
      "width": "25px",
      "vertical-align": "middle"
    },
    attrs: {
      "src": __webpack_require__(97)
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "hint"
  }, [_vm._v("截止时间 " + _vm._s(_vm.detailContent.Infos.endTime))])]), _vm._v(" "), (_vm.getStatus(this.detailContent.publisher)) ? _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center",
      "margin-top": "20px"
    }
  }, [_c('Button', {
    attrs: {
      "id": "fill",
      "size": "large"
    },
    on: {
      "click": function($event) {
        _vm.fillIn(_vm.detailContent.quesID)
      }
    }
  }, [_vm._v("立即填写")])], 1) : _c('div', {
    staticStyle: {
      "width": "100%",
      "text-align": "center",
      "margin-top": "10px"
    }
  }, [_c('div', [_c('Button', {
    attrs: {
      "id": "check",
      "size": "large"
    },
    on: {
      "click": function($event) {
        _vm.checkAns(_vm.detailContent.quesID)
      }
    }
  }, [_vm._v("查看填写情况")])], 1), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin-top": "5px",
      "float": "middle"
    }
  }, [_c('a', {
    staticStyle: {
      "margin-right": "15px"
    },
    attrs: {
      "id": "close",
      "size": "large"
    },
    on: {
      "click": function($event) {
        _vm.closeQues(_vm.detailContent.quesID)
      }
    }
  }, [_vm._v("关闭问卷")]), _vm._v(" "), _c('a', {
    staticStyle: {
      "margin-left": "15px"
    },
    attrs: {
      "id": "delete",
      "size": "large"
    },
    on: {
      "click": function($event) {
        _vm.deleteQues(_vm.detailContent.quesID)
      }
    }
  }, [_vm._v("删除问卷")])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })])])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "clear": "both"
    }
  })]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.info))])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-6ab9ba4c", module.exports)
  }
}

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vuex__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__store_questionnaire_index_js__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Task_vue__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Task_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Task_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Detail_vue__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Detail_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Detail_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
    inject: ['reload'],
    components: {
        task: __WEBPACK_IMPORTED_MODULE_2__components_Task_vue___default.a,
        detail: __WEBPACK_IMPORTED_MODULE_3__components_Detail_vue___default.a
    },
    data: function data() {
        return {
            detailModel: false,
            index: 0,
            currentList: this.quesList

        };
    },

    computed: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_vuex__["b" /* mapState */])('Ques', {
        quesList: 'quesList',
        detailContent: 'quesDetail'
        /*  需要setter 和 getter
        currentList() {
            return this.currentLists
        }
        */
    }),
    methods: {
        handleSelectAll: function handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        create: function create() {
            var info = JSON.parse(window.sessionStorage.getItem('LogInfo'));
            if (info.log) this.$router.push({ name: 'createQuestionnaire' });else this.$Message.warning('您还未登录，请先登录后发布问卷。');
        },
        getDetail: function getDetail(id) {
            this.$store.dispatch('Ques/GET_DETAIL', id);
            this.detailModel = !this.detailModel;
        },

        refresh: function refresh(data) {
            if (data) {
                this.reload();
            }
        },
        sortBy1key: function sortBy1key(ary, key1) {
            return ary.sort(function (a, b) {
                var x = a[key1];
                var y = b[key1];
                return x > y ? -1 : x < y ? 1 : 0;
            });
        },
        sortBy2key: function sortBy2key(ary, key1, key2) {
            return ary.sort(function (a, b) {
                var x = a[key1][key2];
                var y = b[key1][key2];
                return x < y ? -1 : x > y ? 1 : 0;
            });
        },
        sortByCreateTime: function sortByCreateTime() {
            //alert("Hi");
            //(this.quesList)
            this.currentList = this.sortBy2key(this.quesList, 'Infos', 'createTime');
            //(this.currentList)
            //this.$forceUpdate()
        },
        compare: function compare(property) {
            return function (obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return value2 - value1;
            };
        },
        sortByReward: function sortByReward() {
            //alert("Hi");
            this.currentList.sort(this.compare('reward'));
            //this.currentList = this.sortBy1key(this.quesList, 'reward')
            //(this.currentList[0].reward)
        },
        sortByHeat: function sortByHeat() {
            this.currentList = this.sortBy2key(this.quesList, 'Infos', 'attend'); //后面可以考虑用attend/total作为比较直 暂时没有时间写
        }
    },
    mounted: function mounted() {
        // this.$store.dispatch('DELETE_CACHE').then((info) => {
        this.$store.dispatch('Ques/GET_QUESLIST');
        if (JSON.parse(window.sessionStorage.getItem('LogInfo')).log) {
            this.$store.dispatch('Ques/GET_COLLECT_QUESLIST');
            this.$store.dispatch('Ques/GET_ATTEND_QUESLIST');
            this.$store.dispatch('Ques/GET_PUBLISH_QUESLIST');
        }

        var _this = this;
        setTimeout(function () {
            _this.currentList = _this.quesList;
            // _this.currentList = _this.quesList.sort(_this.compare('reward'))
        }, 1000);
        // })
    }
});

/***/ }),

/***/ 156:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 200:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1bd0277a8ad29d05e21064a183920464.jpg";

/***/ }),

/***/ 219:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticStyle: {
      "height": "350px"
    }
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticStyle: {
      "width": "57%",
      "float": "right",
      "height": "350px",
      "padding-left": "6%",
      "display": "flex",
      "align-items": "Center"
    },
    attrs: {
      "id": "grad"
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
  }, [_vm._v("问卷调查，收集意见，随时随地为你提供最丰富的信息！")]), _vm._v(" "), _c('Button', {
    staticStyle: {
      "margin-top": "30px",
      "font-size": "22px"
    },
    attrs: {
      "type": "info"
    },
    on: {
      "click": function($event) {
        _vm.create()
      }
    }
  }, [_vm._v("发布问卷")])], 1)])]), _vm._v(" "), _c('div', {
    staticStyle: {
      "margin": "30px 15%"
    }
  }, [_c('div', {
    staticStyle: {
      "width": "100%"
    }
  }, _vm._l((_vm.currentList), function(ques, index) {
    return _c('task', {
      key: index,
      attrs: {
        "data": ques,
        "type": "1",
        "mode": "1"
      },
      nativeOn: {
        "click": function($event) {
          _vm.getDetail(ques.quesID)
        }
      }
    })
  }))]), _vm._v(" "), _c('detail', {
    attrs: {
      "showDetail": _vm.detailModel
    },
    on: {
      "refresh": _vm.refresh
    }
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticStyle: {
      "width": "43%",
      "float": "left",
      "height": "350px",
      "background": "#52BDF0"
    }
  }, [_c('img', {
    staticStyle: {
      "float": "right",
      "height": "300px",
      "margin-top": "25px"
    },
    attrs: {
      "src": __webpack_require__(200)
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
  }, [_vm._v("问卷调查")]), _vm._v(" "), _c('span', {
    staticStyle: {
      "font-size": "20px",
      "font-weight": "100",
      "color": "#fff"
    }
  }, [_vm._v("Questionnaire")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-1f997a53", module.exports)
  }
}

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(156)

var Component = __webpack_require__(34)(
  /* script */
  __webpack_require__(138),
  /* template */
  __webpack_require__(219),
  /* scopeId */
  "data-v-1f997a53",
  /* cssModules */
  null
)
Component.options.__file = "E:\\Git\\workspace\\system-design\\frontend\\TimeIsMoney\\src\\views\\Questionnaire.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Questionnaire.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1f997a53", Component.options)
  } else {
    hotAPI.reload("data-v-1f997a53", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 97:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c08f40c45b9c7639a334f434715c5f42.png";

/***/ }),

/***/ 98:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9bed53218a2ea3656d24794701a23cc2.png";

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c46441d2e9c3e95b694bd737c6418108.png";

/***/ })

});