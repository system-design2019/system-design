<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" active-name="1" style="background: #ce4545">
                    <div class="layout-logo" style="width: 200px;">
                        <img src="../images/redNav/logoname.png" style="height: 30px;" @click="backtoindex()">
                    </div>
                    <div class="layout-nav" style="float: left">
                        <MenuItem v-for="(tag, index) in navLeftTags" :name="tag.name" :key="index" @click.native="changePageByLink(tag.link, index)" :class="addClass(index)">
                            <Icon :type="tag.icon" size=20></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                    <div class="layout-nav" style="min-width: 10%; float: right; text-align: right" @click.native="changePageByLink(tag.link)">
                        <div v-if="logged">
                        <MenuItem v-for="(tag, index) in navRightTags1" :name="tag.name" :key="index" @click.native="changePageByLink(tag.link, index+3)" style="float: right" :class="addClass(index+3)">
                            <Icon :type="tag.icon"></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                        </div>
                        <MenuItem v-else :name="navRightTags0.name" @click.native="changePageByLink(navRightTags0.link, 3)" :class="addClass(3)" style="float: right">
                            <Icon :type="navRightTags0.icon"></Icon>
                            <span>{{navRightTags0.text}}</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content style="padding: '30px 150px'; min-height: 700px;">
                <router-view></router-view>
            </Content>
            <signCom :signInFromMain="signInFromMain" @SignSuccess="getSign"></signCom>
            <Footer class="layout-footer-center" style="text-align: center; padding: 50px 20px 24px 20px">
                <!-- <img src='../images/github.png' style="width: 2%;"></img> -->
                <span style="padding-top: 50px">open source <img src='../images/github.png' style="width: 2%;"></img><a href='https://github.com/system-design2019' style="margin:0 3px;">blog</a>here</span>
                <p style="width: 100%">2019-2020 &copy; TalkingDataSystem Design & Anylasis Project</p>
            </Footer>
        </Layout>
    </div>
</template>
<script>
    import signCom from './Sign.vue'
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    export default {
        inject: ['reload'],
        components: { 
            signCom 
        },
        data(){
            return{
                signInFromMain: false,
                navLeftTags:[
                    {name: "1", icon:"md-home", text:"首页", link: "home"},
                    {name: "2", icon:"md-paper", text:"问卷", link: "questionnaire"},
                    {name: "3", icon:"md-walk", text:"跑腿", link: "favor"}
                ],
                navRightTags1:[
                    {name: "5", icon:"md-person", text:"个人中心", link: "personal"},
                    {name: "4", icon:"md-mail", text:"收件箱", link: "receiveBox"}                    
                ],
                navRightTags0: {name: "6", icon:"md-person", text:"登录/注册", link: "in"},
            }
        },
        computed: mapState({
            logged(){
                // console.log(this.$route)
                return JSON.parse(window.sessionStorage.getItem('LogInfo')).log
            },
            activeNav(){
                let data = {
                    home:0, questionnaire: 1, favor: 2, receiveBox: 4, personal: 3,
                }
                return data[this.$route.path.split('/')[1]]
            }
        }),
        methods: {
            changePageByLink(link, index) {
                if(link === 'in'){
                    this.signInFromMain = !this.signInFromMain
                }
                    
                else{
                    let id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID
                    // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
                    this.$router.push({name:link, params: {id: id}})
                }
                    
                
            },
            getSign: function(data){
                if(data){
                    this.reload()
                }
            },
            backtoindex(){
                this.$router.push('/')
            },
            addClass(index){
                // console.log(this.activeNav)
                if(index === this.activeNav){
                    return 'ivu-menu-item-active1'
                }
                else{
                    return ''
                }
            }
        },
        mounted(){
            // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
        }
    }
</script>
<style scoped>
.layout{
    border: 1px solid #d7dde4;
    /* background: #f5f7f9; */
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
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