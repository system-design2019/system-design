import * as mutations from './mutations'

export const GET_QUESLIST = 'GET_QUESLIST'
export const GET_ADVERTISES = 'GET_ADVERTISES'
export const GET_DETAIL = 'GET_DETAIL'
// export const GET_RANKLIST = 'GET_RANKLIST'

export default {

  [GET_QUESLIST] ({commit}) {
    let data = [{quesid:1234, title:'aaaa', content: "songxt TQL", publisher: "songxt", reward: 10, attend: 5, total:90, endTime: "2018-4-13"}]
    commit(mutations.SET_QUESLIST, data)
  },

  [GET_DETAIL] ({dispatch, commit}, id) {
    // console.log('123456789')
    let data = {
      quesid: 1234,
      infos:{
        total: 90, 
        attend: 5, 
        startTime: '2019.5.3 18:00', 
        endTime: '2019.5.2.19:00'
      },
      publisher:'suata', 
      head:'../../static/jump/social.png', 
      title:'大学生心理健康调查', 
      content:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 
      command:'在校大学生', 
      reward: 10
    }
    // console.log(id)
    if(id === '1234'){
      // console.log(id)
      data.title = '大学生心理健康调查!!!'
    }
    // console.log(data)
    commit(mutations.SET_DETAIL, data)
  },

}