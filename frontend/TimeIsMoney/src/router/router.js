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
        children: [
            {
                path: '/main',
                name: 'main',
                redirect: function(to){
                    let id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID
                    return 'home/'+String(id)
                }
            },
            {
                path: 'home/:id',
                name: 'home',
                component: (resolve) => require(['../views/Home.vue'], resolve)
            },
            {
                path: 'questionnaire/:id',
                name: 'questionnaire',
                component: (resolve) => require(['../views/Questionnaire.vue'], resolve)
            },
            {
                path: 'questionnaire/:id/createQuestionnaire', //check the user's receiveBox
                name:'createQuestionnaire',
                component: (resolve) => require(['../views/CreateQues.vue'], resolve)
            },
            {
                path: 'questionnaire/:id/filling', //check the user's receiveBox
                name:'filling',
                component: (resolve) => require(['../views/FillingQues.vue'], resolve)
            },
            {
                path: 'favor/:id',
                name: 'favor',
                component: (resolve) => require(['../views/RunFavor.vue'], resolve)
            },
            {
                path: 'personal/:id', //personal page
                name: 'personal',
                component: (resolve) => require(['../views/Personal.vue'], resolve)
            },
            {
                path: 'receiveBox/:id', //check the user's receiveBox
                name:'receiveBox',
                component: (resolve) => require(['../views/ReceiveBox.vue'], resolve)
            }
        ]
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