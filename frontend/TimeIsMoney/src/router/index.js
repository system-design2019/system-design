//index.js文件用于创建路由实例。router.js文件用于配置路由。

import Vue from 'vue'
import Router from 'vue-router'
// 引入router.js文件
import routes from './router'
 
Vue.use(Router);
 
export default new Router({
    routes
})