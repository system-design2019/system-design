import * as mutations from './mutations.js'
export const SIGN_IN = 'SIGN_IN'

export default{
    [SIGN_IN] ({commit, state}, info) {
        if(info.username === 'admin' && info.password === '123456'){
            // console.log('yes')
            commit(mutations.SIGNIN, info.username)
        }
        else(
            alert('用户名：admin 密码：123456')
        )
    }
}
