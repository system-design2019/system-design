import * as mutations from './mutations'
import * as systemAPI from './../../api/system.js'

export const GET_RANKLIST = 'GET_RANKLIST'
export const GET_ADVERTISES = 'GET_ADVERTISES'
// export const GET_RANKLIST = 'GET_RANKLIST'

export default {
    [GET_RANKLIST] ({commit}) {
        let data = [
            {name: '问卷问卷1问卷问卷问卷', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'},
            {name: '问卷1', price: "￥12", url:'www.baidu.com'}
        ]  

        commit(mutations.SET_RANKLIST, data)
      },
    
      [GET_ADVERTISES] ({commit}) {
        let data = [
          {name:'adver1', src:'../../static/home/adver1.jpg'},
          {name:'adver2', src:'../../static/home/adver2.jpg'},
          {name:'adver3', src:'../../static/home/adver3.jpg'},
          {name:'adver4', src:'../../static/home/adver4.jpg'}
        ]  
        commit(mutations.SET_ADVERTISES, data)
        // systemAPI.getTopTen().then((data) =>{
        //     commit(mutations.SET_ADVERTISES, data)
        // })
        
      },

}