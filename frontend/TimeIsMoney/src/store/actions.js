import * as mutations from './mutations'
import * as userAPI from './../api/user'
export const SIGN_IN = 'SIGN_IN'

export default{
    [SIGN_IN] ({commit, state}, info) {
        userAPI.login(info.username, info.password)
        if(info.username === 'admin' && info.password === '123456'){
            // console.log('yes')
            commit(mutations.SIGNIN, 123)
        }
        else(
            alert('用户名：admin 密码：123456')
        )
    }
}
