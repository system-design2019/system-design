<template>
    <div class="layout">
        <Layout>
            <Header style="background: #ffffff">
                <Menu mode="horizontal" active-name="1" style="background: #ffffff;">
                    <div class="layout-logo" style="width: 230px;">
                        <img src="../images/whiteNav/logonamered.png" style="height: 40px;" @click="backtoindex()">
                    </div>
                    <div class="layout-nav" style="float: left">
                        <MenuItem v-for="(tag, index) in navLeftTags" :name="tag.name" :key="index" @click.native="changePageByLink(tag.link, index)" :class="addClass(index)">
                        <Icon :type="tag.icon" size=27></Icon>
                        <span>{{tag.text}}</span>
                        </MenuItem>
                    </div>
                    <div class="layout-nav" style="float: right; text-align: right" @click.native="changePageByLink(tag.link)">
                        <div v-if="logged">
                            <MenuItem v-for="(tag, index) in navRightTags1" :name="tag.name" :key="index" @click.native="changePageByLink(tag.link, index+3)" style="float: right" :class="addClass(index+3)">
                            <Dropdown trigger="click">
                                <Icon :type="tag.icon" size=27></Icon>
                                <DropdownMenu v-if="index==1" slot="list">
                                    <DropdownItem v-for="(drop, op) in dropList" style="text-align: center; padding: 10px 5px; font-size: 15px!important;" @click.native="changePageByLink(drop.link, index+3)">{{drop.title}}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <!-- <span>{{tag.text}}</span> -->
                            </MenuItem>
                        </div>
                        <MenuItem v-else :name="navRightTags0.name" @click.native="changePageByLink(navRightTags0.link, 3)" :class="addClass(3)" style="float: right">
                        <Icon :type="navRightTags0.icon" size=27></Icon>
                        <span>{{navRightTags0.text}}</span>
                        </MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content style="padding: '30px 150px'; min-height: 800px; height: auto; overflow: hidden;">
                <router-view style="height: auto;"></router-view>
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
    data() {
        return {
            signInFromMain: false,
            navLeftTags: [
                { name: "1", icon: "md-home", text: "首页", link: "home" },
                { name: "2", icon: "md-paper", text: "问卷", link: "questionnaire" },
                { name: "3", icon: "md-walk", text: "跑腿", link: "favor" }
            ],
            navRightTags1: [
                { name: "6", icon: "md-exit", text: "个人中心", link: "out" },
                { name: "5", icon: "md-person", text: "个人中心", link: "no" },
                { name: "4", icon: "md-mail", text: "收件箱", link: "receiveBox" }
            ],
            navRightTags0: { name: "6", icon: "md-person", text: "登录/注册", link: "in" },
            dropList: [
                { name: 'personal', title: '我的M币', link: 'account' },
                { name: 'personal', title: '我参与的', link: 'attend' },
                { name: 'personal', title: '我发布的', link: 'publish' },
                { name: 'personal', title: '我收藏的', link: 'collect' },
                { name: 'personal', title: '信息管理', link: 'personal' }

            ]
        }
    },
    computed: mapState({
        logged() {
            // console.log(this.$route)
            return JSON.parse(window.sessionStorage.getItem('LogInfo')).log
        },
        activeNav() {
            let data = {
                home: 0,
                questionnaire: 1,
                favor: 2,
                receiveBox: 5,
                personal: 4,
            }
            return data[this.$route.path.split('/')[1]]
        }
    }),
    methods: {
        changePageByLink(link, index) {
            if (link === 'in') {
                this.signInFromMain = !this.signInFromMain
            } else if (link === 'out') {
                let data = {
                    log: false,
                    userID: ''
                }
                window.sessionStorage.setItem('LogInfo', JSON.stringify(data))
                this.reload()
            } else if (link !== 'no') {
                let id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID
                // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
                this.$router.push({ name: link })
            }


        },
        getSign: function(data) {
            if (data) {
                this.reload()
            }
        },
        backtoindex() {
            this.$router.push('/')
        },
        addClass(index) {
            // console.log(this.activeNav)
            if (index === this.activeNav) {
                return 'ivu-menu-item-active1'
            } else {
                return ''
            }
        }
    },
    mounted() {
        // console.log(JSON.parse(window.sessionStorage.getItem('LogInfo')))
    }
}
</script>
<style scoped>
.layout {
    /*border: 1px solid #d7dde4;*/
    /* background: #f5f7f9; */
    background: #ffffff;
    position: relative;
    /*border-radius: 4px;*/
}

.layout-logo {
    height: 40px;
    /* background: #5b6270; */
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}

.layout-nav {
    margin: 0 auto;
}

.layout-footer-center {
    text-align: center;
}

.ivu-menu-item span {
    font-size: 18px;
    font-weight: 200;
    position: relative;
    bottom: -4px;
}

.ivu-menu-horizontal {
    line-height: 57px;
}
</style>