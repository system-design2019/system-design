import * as mutations from './mutations'
import * as userAPI from './../api/user'
export const SIGN_IN = 'SIGN_IN'
export const SIGN_UP = 'SIGN_UP'

export default{
    [SIGN_IN] ({commit, state}, info) {
        userAPI.login(info.username, info.password, info.mode).then(
            (response) => {
                return response
            }
        )
    },
    [SIGN_UP] ({commit, state}, info){
        userAPI.userRegister(info.username, info.password, info.mode).then(
            (response) => {
                console.log(response)
                return response
            }
        )
    }
}
