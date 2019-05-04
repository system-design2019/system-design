import * as mutations from './mutations'

export const GET_ALERTS = 'GET_ALERTS'

export default{
    [GET_ALERTS] ({commit}) {
        let data = [
            {title:'您的问卷有人参与填写！', content:'您的ID为27018的问卷已被填写，当前已收集5份，待收集85份', type: 1, time:'2019.5.2 16:00', status: 'error'},
            {title:'标题', content:'详情', type: 1, time:'2019.5.2 16:00', status: 'default'}
        ]
        commit(mutations.SET_ALERTS, data)
    },
}