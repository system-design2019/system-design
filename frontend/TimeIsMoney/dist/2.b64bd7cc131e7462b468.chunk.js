webpackJsonp([2,9],{104:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"hellopage"},[i("div",{directives:[{name:"show",rawName:"v-show",value:t.show,expression:"show"}],attrs:{id:"block1"}},[i("Row",{attrs:{type:"flex",justify:"center",align:"middle"}},[i("div",{ref:"moveout",attrs:{id:"moveout"}},[i("h2",[i("p",{attrs:{id:"text1"}},[t._v("从未想过 琐碎时间更值钱？")])])]),t._v(" "),i("transition",[i("div",{ref:"showon",attrs:{id:"showon"}},[i("div",{attrs:{id:"signIn"}},[i("Button",{attrs:{id:"signButton",shape:"circle",size:"large",ghost:""},on:{click:t.handleSign}},[t._v("SignIn")])],1),t._v(" "),i("div",{staticClass:"animated bounce"},[i("div",{attrs:{id:"logoBox"}},[i("img",{attrs:{id:"logov2",src:s(94),alt:"正方形的原始图片"}})]),t._v(" "),i("p",{attrs:{id:"bigTitle"}},[t._v(" T.I.M ")]),t._v(" "),i("p",{attrs:{id:"title2"}},[t._v(" 让琐碎的时间更有价值 ")]),t._v(" "),i("div",{attrs:{id:"mainButton"}},[i("Button",{staticStyle:{"font-size":"30px",width:"200px"},attrs:{shape:"circle",size:"large",ghost:""},on:{click:t.handleStart}},[t._v("去赚钱")])],1)])])])],1),t._v(" "),i("Row",{staticStyle:{"text-align":"center","vertical-align":"middle",margin:"60px 0"}},[i("p",{staticStyle:{"font-size":"24px","font-weight":"300"}},[t._v("TIM是一个专为大学生建立的赚钱社区。")]),t._v(" "),i("p",{staticStyle:{"font-size":"24px","font-weight":"300"}},[t._v("在这里，你可以利用零碎时间换取收益，积少成多。")])]),t._v(" "),i("Row",{staticStyle:{background:"rgb(246,246,246)"}},[i("Row",{staticStyle:{"text-align":"center","vertical-align":"middle",margin:"40px 0"}},[i("p",{staticStyle:{"font-size":"34px","font-weight":"300",color:"#CE4545"}},[t._v("我们可以做什么？")])]),t._v(" "),i("Row",{staticStyle:{margin:"40px 80px"}},t._l(t.list1,function(e,s){return i("Col",{key:s,staticStyle:{"text-align":"center",align:"middle"},attrs:{span:"8"}},[i("img",{staticStyle:{width:"32%","border-radius":"50%",align:"middle"},attrs:{src:e.src}}),t._v(" "),i("p",{staticStyle:{width:"100%","font-size":"26px",color:"#CE4545",margin:"15px 0","font-weight":"300"}},[t._v(t._s(e.title))]),t._v(" "),i("p",{staticStyle:{"font-size":"20px",margin:"15px 10%","text-align":"left","font-weight":"300"}},[t._v(t._s(e.content))])])}))],1),t._v(" "),i("Row",t._l(t.list2,function(e,s){return i("Col",{key:s,staticStyle:{"text-align":"center",height:"340px",margin:"auto 0"},attrs:{span:"12"}},[i("img",{directives:[{name:"show",rawName:"v-show",value:!e.show,expression:"!things.show"}],staticStyle:{width:"100%",height:"100%"},attrs:{src:e.src}}),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"things.show"}],staticStyle:{margin:"13% 10% 20px 10%","font-size":"26px",color:"#CE4545","font-weight":"300"}},[t._v(t._s(e.title))]),t._v(" "),i("p",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"things.show"}],staticStyle:{margin:"20px 10% 13% 10%","font-size":"20px","text-align":"left","font-weight":"300"}},[t._v(t._s(e.text))])])})),t._v(" "),i("Footer",{staticClass:"layout-footer-center",staticStyle:{"text-align":"center",padding:"50px 20px 24px 20px"}},[i("span",{staticStyle:{"padding-top":"50px"}},[t._v("open source "),i("img",{staticStyle:{width:"2%"},attrs:{src:s(54)}}),i("a",{staticStyle:{margin:"0 3px"},attrs:{href:"https://github.com/system-design2019"}},[t._v("blog")]),t._v("here")]),t._v(" "),i("p",{staticStyle:{width:"100%"}},[t._v("2019-2020 © TalkingDataSystem Design & Anylasis Project")])]),t._v(" "),i("signCom",{attrs:{signInFromJump:t.signInFromJump}})],1)])},staticRenderFns:[]},t.exports.render._withStripped=!0},37:function(t,e,s){s(56);var i=s(15)(s(55),s(58),null,null);i.options.__file="E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\Sign.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] Sign.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},40:function(t,e,s){s(82);var i=s(15)(s(68),s(104),null,null);i.options.__file="E:\\learning\\大三下\\系分大项目\\system-design\\frontend\\TimeIsMoney\\src\\views\\Jump.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] Jump.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},53:function(t,e,s){t.exports=s.p+"ede2c9a6c99e708127987d148cea95f9.jpg"},54:function(t,e,s){t.exports=s.p+"c46441d2e9c3e95b694bd737c6418108.png"},55:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(1);e.default={props:["signInFromJump","signInFromMain","signUpFromMain"],data:function(){return{signIn:!1,signUp:!1,username:"",password:""}},compute:s.i(i.b)({Logged:"isAuthenticated"}),methods:{changeToSignUp:function(){this.signIn=!1,this.signUp=!0},changeToSignIn:function(){this.signUp=!1,this.signIn=!0},doSignUp:function(){this.changeToSignIn()},doSignIn:function(){this.$router.push({path:"/main",name:"main"}),this.signIn=!1,this.$store.commit("signIn"),this.$store.commit("setRightNavs")}},watch:{signInFromJump:function(t,e){this.signUp=!1,this.signIn=!0},signInFromMain:function(t,e){this.signUp=!1,this.signIn=!0}}}},56:function(t,e){},58:function(t,e,s){t.exports={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("Modal",{attrs:{width:"360"},model:{value:t.signIn,callback:function(e){t.signIn=e},expression:"signIn"}},[i("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[i("Icon",{attrs:{type:"ios-information-circle"}}),t._v(" "),i("span",[t._v("登陆页面")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("p",[t._v("如您已经注册了账号，请输入并登陆.")])]),t._v(" "),i("div",{attrs:{id:"headBox2"}},[i("div",{attrs:{id:"headBox"}},[i("img",{attrs:{id:"head",src:s(53),alt:"正方形的原始图片",width:"150px",height:"150px"}})])]),t._v(" "),i("div",{staticClass:"allInput"},[i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入用户名",type:"text"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入密码",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入验证码"}})],1),t._v(" "),i("div",{staticClass:"allButton"},[i("Button",{attrs:{id:"findPass",size:"small"}},[t._v("找回密码")]),t._v(" "),i("Button",{attrs:{id:"signNow",size:"small"},on:{click:t.changeToSignUp}},[t._v("立即注册")])],1),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("Button",{attrs:{size:"large",long:""},nativeOn:{click:function(e){return t.doSignIn(e)}}},[t._v("确定")])],1)]),t._v(" "),i("Modal",{attrs:{width:"360"},model:{value:t.signUp,callback:function(e){t.signUp=e},expression:"signUp"}},[i("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[i("Icon",{attrs:{type:"ios-information-circle"}}),t._v(" "),i("span",[t._v("注册页面")])],1),t._v(" "),i("div",{staticStyle:{"text-align":"center"}},[i("p",[t._v("清输入相关信息进行注册")])]),t._v(" "),i("div",{attrs:{id:"headBox2"}},[i("div",{attrs:{id:"headBox"}},[i("img",{attrs:{id:"head",src:s(53),alt:"正方形的原始图片",width:"150px",height:"150px"}})])]),t._v(" "),i("div",{staticClass:"allInput"},[i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入用户名",type:"text"},model:{value:t.username,callback:function(e){t.username=e},expression:"username"}}),t._v(" "),i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入密码",type:"password"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}}),t._v(" "),i("Input",{attrs:{prefix:"ios-contact",placeholder:"请输入验证码"}})],1),t._v(" "),i("div",{staticClass:"allButton"},[i("Button",{attrs:{id:"signNow",size:"small"},on:{click:t.changeToSignIn}},[t._v("已有账号？")])],1),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"},[i("Button",{attrs:{size:"large",long:""},on:{click:t.doSignUp}},[t._v("确定")])],1)])],1)},staticRenderFns:[]},t.exports.render._withStripped=!0},68:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s(37),n=s.n(i);e.default={name:"helloPage",mounted:function(){this.A()},data:function(){return{signInFromJump:!1,note:{backgroundRepeat:"no-repeat",backgroundSize:"100% 100%"},show:!0,list1:[{src:"../../static/jump/question.png",title:"问卷调查",content:"在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。"},{src:"../../static/jump/runfavor.png",title:"跑腿代购",content:"跑腿代购同样可以获得零用钱。代领快递、领外卖、购买商品……无论你是想赚钱还是想找个人替你跑腿，TIM无疑是你最优秀的选择。在这里，时间就是酬劳。"},{src:"../../static/jump/social.png",title:"聊天社交",content:"想要找到兴趣相同的朋友？想要和校内的同学搞好关系？来TIM就对了！问卷和跑腿不是全部，随时随地和附近的人聊天社交，有时间你就来，爱情与友情也是价值的体现！"}],list2:[{show:!0,src:"../../static/jump/image4.jpg",title:"在线交流，沟通更方便",text:"在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。"},{show:!1,src:"../../static/jump/image4.jpg",title:"",text:""},{show:!1,src:"../../static/jump/image5.jpg",title:"",text:""},{show:!0,src:"../../static/jump/image5.jpg",title:"问卷跑腿，收益双保障",text:"在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。"}]}},methods:{handleStart:function(){this.$router.push({path:"/main"})},handleSign:function(){this.signInFromJump=!this.signInFromJump},A:function(){setTimeout(this.disapper,2500)},disapper:function(){this.$refs.moveout.style.display="none",this.$refs.showon.style.display="block"}},components:{signCom:n.a}}},82:function(t,e){},94:function(t,e,s){t.exports=s.p+"29dc8f37544096fa7d02fd10416be0a7.png"}});