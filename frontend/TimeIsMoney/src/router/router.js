//此处用于处理页间路由，不同后缀进入不同页面

const routers = [
    {
        path: '/', //跳转页面
        meta: {
            title: 'T.I.M'
        },
        component: (resolve) => require(['../views/jump.vue'], resolve)
    },
    {
        path: '/sign',  //登陆注册页面，登陆注册模块使用动态组件切换，参考知乎
        meta: {
            title: 'Sign'
        },
        component: (resolve) => require(['../views/sign.vue'], resolve)
    },
    {
        path: '/findpass',  //找回密码页面
        meta: {
            title: 'FindPass'
        },
        component: (resolve) => require(['../views/findpass.vue'], resolve)
    },    
    {
        path: '/main',  //主页（分游客 & 登陆用户）
        meta: {
            title: 'Main'
        },
        component: (resolve) => require(['../views/main.vue'], resolve)
    },
    {
        path:'/questionShow', //问卷展示页面
        meta:{
            title:"QuestionMain"
        },
        component:(resolve) => require(['../views/questionShow.vue'],resolve)
    },
    {
        path:'/questionDesign', //问卷设计页面
        meta:{
            title:"QuestionDesign"
        },
        component:(resolve) => require(['../views/questionDesign.vue'],resolve)
    },
    {
        path:'/questionDetail', //问卷详情页面
        meta:{
            title:"QuestionDetail"
        },
        component:(resolve) => require(['../views/questionDetail.vue'],resolve)
    },
    {
        path:'/questionWrite', //问卷填写页面
        meta:{
            title:"QuestionWrite"
        },
        component:(resolve) => require(['../views/questionWrite.vue'],resolve)
    },
    {
        path:'/personal', //personal page
        meta:{
            title:"Personal Info"
        },
        component:(resolve) => require(['../views/personal.vue'],resolve)
    },
    {
        path:'/infoChange', //change the personal info
        meta:{
            title:"infoChange"
        },
        component:(resolve) => require(['../views/infoChange.vue'],resolve)
    },
    {
        path:'/historyCheck', //check the user's history deal
        meta:{
            title:"historyCheck"
        },
        component:(resolve) => require(['../views/historyCheck.vue'],resolve)
    },
    {
        path:'/receiveBox', //check the user's receiveBox
        meta:{
            title:"receiveBox"
        },
        component:(resolve) => require(['../views/receiveBox.vue'],resolve)
    }






];
export default routers;