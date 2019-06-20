import * as mutations from './mutations'
import * as userAPI from './../api/user'
import * as sysAPI from './../api/system'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'
export const MESSAGE = 'MESSAGE'

export default{
    [SIGN_IN] ({commit, state}, info) {
        let res = userAPI.login(info.username, info.password, info.mode)    
        return res       
        
    },
    [SIGN_UP] ({commit, state}, info){
        let res = userAPI.userRegister(info.username, info.password, info.mode)
        return res
    },
    [MESSAGE] ({commit,state}, data){
        let send = {
            toId: data.toId,
            fromId: data.fromId,
            hasRead: false,
            title: '',
            content: ''
        }
        if(data.type == 'fill'){
            send.title = '有人填你的问卷啦！'
            send.content = '<'+data.fromName+'>已填写问卷'+'《'+data.quesTitle+'》'
        }
        console.log('消息：'+JSON.stringify(send))
        return sysAPI.sendMessage(send)
    }
}
