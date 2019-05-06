import * as mutations from './mutations.js'
export const SIGN_IN = 'SIGN_IN'

export default{
    [SIGN_IN] ({commit, state}, info) {
        console.log('check')
        console.log(info.username)
        console.log(info.password)
        if(info.username === 'admin' && info.password === '123456'){
            console.log('right')
            commit(mutations.SIGNIN, info.username)
        }
        else(
            console.log('wrong')
        )
    }
}
