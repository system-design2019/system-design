<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" active-name="1" style="background: #ce4545">
                    <div class="layout-logo" style="width: 200px;">
                        <img src="../images/redNav/logoname.png" style="height: 30px;" @click="backtoindex()">
                    </div>
                    <div class="layout-nav" style="float: left">
                        <MenuItem v-for="(tag, index) in navLeftTags" :name="tag.name" :key="index" @click.native="changePageByLink(tag.link)">
                            <Icon :type="tag.icon" size=20></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                    <div class="layout-nav" style="width: 20%; float: right; text-align: right" @click.native="changePageByLink(tag.link)">
                        <MenuItem v-for="(tag, index) in navRightTags":name="tag.name" :key="index" @click.native="changePageByLink(tag.link)" style="float: right">
                            <Icon :type="tag.icon"></Icon>
                            <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content style="padding: '30px 150px'; min-height: 700px;">
                <router-view></router-view>
            </Content>
            <signCom :signInFromMain="signInFromMain"></signCom>
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
        components: { 
            signCom 
        },
        data(){
            return{
                signInFromMain: false
            }
        },
        computed: mapState({
            Logged:'isAuthenticated',
            userID: 'userID',
            activeNav: 'activeNav',
            navRightTags: 'navRightTags',
            navLeftTags: 'navLeftTags'
        }),
        methods: {
            changePageByLink(link) {
                if(link === 'in')
                    this.signInFromMain = !this.signInFromMain
                else
                    this.$router.push(link)
                
            },
            backtoindex(){
                this.$router.push('/')
            },
            showRightTags(){
                this.$store.commit('setRightNavs')
            }
        },
        mounted: function() {
            this.showRightTags()
            // console.log(this.navRightTags)
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