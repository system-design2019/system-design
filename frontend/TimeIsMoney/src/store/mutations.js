export const SIGNIN = 'SIGNIN'

export default{
    [SIGNIN] (state, username){
        var obj = {
            "log": true,
            "username": username
        }
        window.sessionStorage.setItem('LogInfo', JSON.stringify(obj))
        // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
    }
}