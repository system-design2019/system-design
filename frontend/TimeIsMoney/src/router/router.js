//此处用于处理页间路由，不同后缀进入不同页面

const routers = [{
        path: '/', //跳转页面
        meta: {
            title: 'T.I.M'
        },
        component: (resolve) => require(['../views/Jump.vue'], resolve)
    },
    {
        path: '/sign', //登陆注册页面，登陆注册模块使用动态组件切换，参考知乎
        meta: {
            title: 'Sign'
        },
        component: (resolve) => require(['../views/Sign.vue'], resolve)
    },
    {
        path: '/findpass', //找回密码页面
        meta: {
            title: 'FindPass'
        },
        component: (resolve) => require(['../views/findpass.vue'], resolve)
    },
    {
        path: '/', 
        component: (resolve) => require(['../views/main.vue'], resolve),
        children: [
            {
                path: '/main',
                name: 'main',
                redirect: 'home'
            },
            {
                path: 'home',
                component: (resolve) => require(['../views/Home.vue'], resolve)
            },
            {
                path: 'questionnaire',
                component: (resolve) => require(['../views/QuestionShow.vue'], resolve)
            },
            {
                path: 'questionnaire/createQuestionnaire', //check the user's receiveBox
                component: (resolve) => require(['../views/CreateQues.vue'], resolve)
            },
            {
                path: 'favor',
                component: (resolve) => require(['../views/RunFavor.vue'], resolve)
            },
            {
                path: 'personal', //personal page
                component: (resolve) => require(['../views/Personal.vue'], resolve)
            },
            {
                path: 'receiveBox', //check the user's receiveBox
                component: (resolve) => require(['../views/ReceiveBox.vue'], resolve)
            }
        ]
    },
    {
        path: '/questionDesign', //问卷设计页面
        meta: {
            title: "QuestionDesign"
        },
        component: (resolve) => require(['../views/questionDesign.vue'], resolve)
    },
    {
        path: '/questionDetail', //问卷详情页面
        meta: {
            title: "QuestionDetail"
        },
        component: (resolve) => require(['../views/questionDetail.vue'], resolve)
    },
    {
        path: '/questionWrite', //问卷填写页面
        meta: {
            title: "QuestionWrite"
        },
        component: (resolve) => require(['../views/questionWrite.vue'], resolve)
    },
    
    {
        path: '/infoChange', //change the personal info
        meta: {
            title: "infoChange"
        },
        component: (resolve) => require(['../views/infoChange.vue'], resolve)
    },
    {
        path: '/historyCheck', //check the user's history deal
        meta: {
            title: "historyCheck"
        },
        component: (resolve) => require(['../views/historyCheck.vue'], resolve)
    }




];
export default routers;