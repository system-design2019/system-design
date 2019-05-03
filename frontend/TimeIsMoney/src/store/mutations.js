export default{
    setRightNavs (state) {
        // console.log(rightNavs)
        let logged = state.isAuthenticated
        let rightNavs = []
        // console.log(rightNavs)
        let navs = [
            {name: "4", icon:"md-mail", text:"收件箱", link: "receiveBox"},
            {name: "5", icon:"md-person", text:"个人中心", link: "personal"},
            {name: "6", icon:"md-person", text:"登录/注册", link: "in"}
        ]
        if(logged){
            rightNavs.push(navs[1])
            rightNavs.push(navs[0])
        }
        else{
            rightNavs.push(navs[2])
        }
        state.navRightTags = rightNavs
        // console.log(rightNavs)
    },
    signIn (state){
        state.isAuthenticated = true
    }
}