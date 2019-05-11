export const SIGNIN = 'SIGNIN'

export default{
    [SIGNIN] (state, userid){
        var obj = {
            "log": true,
            "userID": userid
        }
        window.sessionStorage.setItem('LogInfo', JSON.stringify(obj))
        // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
    }
}