//此处用于处理页间路由，不同后缀进入不同页面

const routers = [
    {
        path: '/',
        meta: {
            title: 'Begin'
        },
        component: (resolve) => require(['../views/begin.vue'], resolve)
    },
    {
        path: '/sign',
        meta: {
            title: 'signIn'
        },
        component: (resolve) => require(['../views/index.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: 'index'
        },
        component: (resolve) => require(['../views/hello.vue'], resolve)
    }

];
export default routers;