import * as mutations from './mutations'

export const GET_QUESLIST = 'GET_QUESLIST'
export const GET_ADVERTISES = 'GET_ADVERTISES'
export const GET_DETAIL = 'GET_DETAIL'
// export const GET_RANKLIST = 'GET_RANKLIST'

export default {

  [GET_QUESLIST] ({commit}) {
    let data = [{id:'1234', text: "songxt TQL", creator: "songxt", price: "￥10", attend: "5", total:"90", endtime: "2018-4-13"}]
    commit(mutations.SET_QUESLIST, data)
  },

  [GET_DETAIL] ({dispatch, commit}, id) {
    // console.log('123456789')
    let data = {
      infos:{"招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00'},
      creator:'suata', head:'../../static/jump/social.png', title:'大学生心理健康调查', text:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', command:'在校大学生', price: 10
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