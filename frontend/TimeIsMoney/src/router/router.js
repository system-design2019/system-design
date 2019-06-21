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
        path: '/',
        component: (resolve) => require(['../views/Main.vue'], resolve),
        children: [{
                path: '/main',
                name: 'main',
                redirect: function(to) {
                    let id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID
                    return 'home'
                }
            },
            {
                path: 'home',
                name: 'home',
                component: (resolve) => require(['../views/Home.vue'], resolve)
            },
            {
                path: 'questionnaire',
                name: 'questionnaire',
                component: (resolve) => require(['../views/Questionnaire.vue'], resolve),
            },
            {
                path: 'checkList/:type',
                name: 'checkList',
                component: (resolve) => require(['../views/CheckList.vue'], resolve),
            },
            {
                path: 'questionnaire/createQuestionnaire', //check the user's receiveBox
                name: 'createQuestionnaire',
                component: (resolve) => require(['../views/CreateQues.vue'], resolve),
            },
            {
                path: 'questionnaire/filling', //check the user's receiveBox
                name: 'filling',
                component: (resolve) => require(['../views/FillingQues.vue'], resolve)
            },
            {
                path: 'favor',
                name: 'favor',
                component: (resolve) => require(['../views/RunFavor.vue'], resolve)
            },
            {
                path: 'favor/createFavor',
                name: 'createFavor',
                component: (resolve) => require(['../views/CreateFavor.vue'], resolve),
            },
            {
                path: 'personal', //personal page
                name: 'personal',
                component: (resolve) => require(['../views/Personal.vue'], resolve)
            },
            {
                path: 'personal/attend', //personal page
                name: 'attend',
                component: (resolve) => require(['../views/Attend.vue'], resolve)
            },
            {
                path: 'personal/publish', //personal page
                name: 'publish',
                component: (resolve) => require(['../views/Publish.vue'], resolve)
            },
            {
                path: 'personal/collect', //personal page
                name: 'collect',
                component: (resolve) => require(['../views/Collect.vue'], resolve)
            },
            {
                path: 'personal/account', //personal page
                name: 'account',
                component: (resolve) => require(['../views/Account.vue'], resolve)
            },
            {
                path: 'receiveBox', //check the user's receiveBox
                name: 'receiveBox',
                component: (resolve) => require(['../views/ReceiveBox.vue'], resolve)
            }
        ]
    }



];
export default routers;