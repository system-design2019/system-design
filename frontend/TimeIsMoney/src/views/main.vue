<style scoped>
.layout{
    border: 1px solid #d7dde4;
    /* background: #f5f7f9; */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" active-name="1" style="background: #ce4545">
                    <div class="layout-logo" style="width: 200px;">
                        <img src="../images/redNav/logoname.png" style="height: 30px;">
                    </div>
                    <div class="layout-nav" style="float: left">
                        <MenuItem v-for="(tag, index) in navLeftTags" :name="tag.name" @click.native="changePageByLink(tag.link)">
                            <Icon :type="tag.icon" size=20></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                    <div class="layout-nav" style="width: 20%; float: right; text-align: right" @click.native="changePageByLink(tag.link)">
                        <MenuItem v-for="(tag, index) in navRightTags":name="tag.name" @click.native="changePageByLink(tag.link)" style="float: right">
                            <Icon :type="tag.icon"></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content style="padding: '30px 150px'; min-height: 800px;">
                <router-view style="margin: 30px 15%"></router-view>
            </Content>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</template>
<script>

    export default {
        data(){
            return{
                Logged: false,
                navLeftTags:[
                    {name: "1", icon:"md-home", text:"首页", link: "home"},
                    {name: "2", icon:"md-paper", text:"问卷", link: "questionnaire"},
                    {name: "3", icon:"md-walk", text:"跑腿", link: "home"}
                ],
                allRightTags:[
                    {name: "4", icon:"md-mail", text:"收件箱", link: "receiveBox"},
                    {name: "5", icon:"md-person", text:"个人中心", link: "personal"},
                    {name: "6", icon:"md-person", text:"登录/注册", link: "in"}
                ],
                navRightTags:[]
            }   
        },
        methods: {
            changePageByLink(link) {
                if(link === 'in'){
                    this.Logged = true
                    this.showRightTags()
                }
                else
                    this.$router.push(link)
                
            },
            showRightTags(){
                const temp_array = []
                if(this.Logged){
                    temp_array.push(this.allRightTags[0])
                    temp_array.push(this.allRightTags[1])
                }
                else{
                    temp_array.push(this.allRightTags[2])
                }
                console.log(temp_array)
                this.navRightTags = temp_array
            }
        },
        mounted () {
            this.showRightTags();
        }
    }
</script>