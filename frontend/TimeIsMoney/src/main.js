import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
<<<<<<< HEAD
// import '../my-theme/dist/iview.css';
=======
import animate from 'animate.css';
>>>>>>> ca19d6c0662ef34328b664bb6c23f43b6648d251

Vue.use(VueRouter);
Vue.use(iView);
require('animate.css/animate.min.css');

// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    render: h => h(App)
});