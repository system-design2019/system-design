import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router/router';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import animate from 'animate.css';
import Vuex from 'vuex'
import store from './store/index.js'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://api.timoney.xyz';
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

Vue.use(Vuex)
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
    store: store,
    render: h => h(App)
});