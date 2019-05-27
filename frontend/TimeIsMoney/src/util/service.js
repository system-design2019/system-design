import axios from 'axios'

// 创建axios实例
const service = axios.create({
    // baseURL: 'http://172.26.70.9:8080', 
    baseURL: 'http://api.timoney.xyz',
    timeout: 5000, // 请求的超时时间
    method: 'get',
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    },
    withCredentials: true // 允许携带cookie
})

// 发送请求前处理request的数据
axios.defaults.transformRequest = [function(data) {
    let newData = ''
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}]

// request拦截器
service.interceptors.request.use(
    config => {
        // 发送请求之前，要做的业务
        return config
    },
    error => {
        // 错误处理代码
        return Promise.reject(error)
    }
)

// response拦截器
service.interceptors.response.use(
    response => {
        // 数据响应之后，要做的业务
        //console.log('响应头：' + JSON.stringify(response));
        return response
    },
    error => {
        return Promise.reject(error)
    }
)

export default service


// 如下所示，如果需要调用ajax请求

// import fetch from '@/utils/fetch'
// fetch({
//   method: 'get',
//   url: '/users/list'
// })
//   .then(res => {
//   cosole.log(res)
// })