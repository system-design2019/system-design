import * as mutations from './mutations'
import * as DateSet from './../../util/date.js'
import * as quesAPI from './../../api/question.js'

export const GET_QUESLIST = 'GET_QUESLIST'
export const GET_COLLECT_QUESLIST = 'GET_COLLECT_QUESLIST'
export const GET_ATTEND_QUESLIST = 'GET_ATTEND_QUESLIST'
export const GET_PUBLISH_QUESLIST = 'GET_PUBLISH_QUESLIST'
export const GET_DETAIL = 'GET_DETAIL'
export const CREATE_QUES = 'CREATE_QUES'
export const CHANGE_COLLECT = 'CHANGE_COLLECT'
// export const GET_RANKLIST = 'GET_RANKLIST'



function utc2beijing(utc_datetime) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0,T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos+1,Z_pos-T_pos-1);
    var new_datetime = year_month_day+" "+hour_minute_second; // 2017-03-31 08:02:06

    // 增加8个小时，北京时间比utc时间多八个时区
    var timestamp = timestamp+8*60*60;
    console.log(timestamp)
    // 时间戳转为时间
    var beijing_datetime = new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
    return beijing_datetime; // 2017-03-31 16:02:06
} 

export default {

  [GET_QUESLIST] ({commit}) {
    quesAPI.getQuesList().then((info) => {
        if(info.success)
          commit(mutations.SET_QUESLIST, info.data)
      }
    ) 
  },
  [GET_COLLECT_QUESLIST] ({commit}) {
    quesAPI.getCollectQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_COLLECT_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_ATTEND_QUESLIST] ({commit}) {
    quesAPI.getAttendQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_ATTEND_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_PUBLISH_QUESLIST] ({commit}) {
    quesAPI.getPublishQuesList().then((info) => {
        if(info.success){
          commit(mutations.SET_PUBLISH_QUESLIST, info.data)
        }
        // console.error(JSON.stringify(info))
      }
    ) 
  },
  [GET_DETAIL] ({commit}, id) {
    // console.log('123456789')
    quesAPI.getDetail(id).then((info)=>{
      commit(mutations.SET_DETAIL, info.data)
    })
    // console.log(data)
  },
  [CREATE_QUES] ({commit}, data) {
    
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1<10? "0"+(date.getMonth() + 1):date.getMonth() + 1;
    var strDate = date.getDate()<10? "0" + date.getDate():date.getDate();
    var currentdate = date.getFullYear() + seperator1  + month  + seperator1  + strDate
        + " "  + date.getHours()  + seperator2  + date.getMinutes()
        + seperator2 + date.getSeconds();

    var start = new Date(data.formValidate.startdate).toLocaleDateString().replace(/\//g, '-')+" "+data.formValidate.starttime;
    var end = new Date(data.formValidate.enddate).toLocaleDateString().replace(/\//g, '-')+" "+data.formValidate.endtime;

    let format = {
      "title":data.formContent.title,
      "detail":data.formValidate.detail,
      "publisher":JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
      "reward":data.formValidate.reward,
      "command":data.formValidate.command,
      "number":data.formContent.number,
      "Infos":{
        "total":data.formValidate.quantity,
        "attend":0,
        "createTime":currentdate,
        // "startTime":data.formValidate.startdate.slice(0, data.formValidate.startdate.indexOf('T'))+' '+data.formValidate.starttime,
        // "endTime": data.formValidate.enddate.slice(0, data.formValidate.enddate.indexOf('T'))+' '+data.formValidate.endtime
        "startTime":start,
        "endTime": end
      },
      "tians":data.formContent.tians,
      "xuans":data.formContent.xuans
      }
      console.log(format)
    quesAPI.createQues(format).then((info)=>{
      
    })
  },
  [CHANGE_COLLECT]({state, commit}, id){
    if(state.collectQuesList.indexOf(id) != -1){
      quesAPI.cancelCollectQues(id).then((info)=>{
        commit(mutations.SET_LOCAL_COLLECTLIST, id)
      })
    }
    else{
      quesAPI.collectQues(id).then((info)=>{
        commit(mutations.SET_LOCAL_COLLECTLIST, id)
      })
    }
    
  }

}


