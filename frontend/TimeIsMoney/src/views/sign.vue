<template>
    <div>
        <Modal v-model="signIn" width="600px">
            <div id="headImg">
                <img id="img" src="../images/login.jpg" alt="正方形的原始图片" />
                <div style="clear:both"></div>
            </div>
            <div id="rightPart" style="float:right">
                <div id="headBox2">
                    <div id="headBox">
                        <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                    </div>
                </div>
                <div class="allInput">
                    <span v-if="wrong" style="color: #ce4545">*{{alert}}</span>
                    <Input v-model="info.username" prefix="ios-contact" placeholder="用户名/手机/邮箱" type="text" style="margin-top:15px" />
                    <Input v-model="info.password" prefix="ios-contact" placeholder="密码" type="password" style="margin-top:15px" @keyup.enter.native="doSignIn" />
                    <div>
                        <Input v-model="checkNum" prefix="ios-contact" placeholder="请输入验证码" style="margin-top:15px;width:150px;" @keyup.enter.native="doSignIn" />
                        <SIdentify :identifyCode="identifyCode2" @click.native="refreshCode" style="margin-top:15px;float:right;"></SIdentify>
                    </div>
                </div>
                <div class="allButton">
                    <div style="clear:both"></div>
                    <Button id="loginBt" size="large" long @click.native="doSignIn" style="margin-top:15px">登录</Button>
                    <div class="smallBt">
                        <Button id="findPass" size="small" style="color:#0066cc; border-color:#fff">找回密码</Button>
                        <Button id="signNow" size="small" @click="changeToSignUp" style="color:#0066cc; border-color:#fff">立即注册</Button>
                    </div>
                </div>
            </div>
            <div style="clear:both"></div>
            <!--
            <div class="allInput">
                <span v-if="wrong" style="color: #ce4545">*{{alert}}</span>
                <Input v-model="info.username" prefix="ios-contact" placeholder="请输入用户名" type="text" />
                <Input v-model="info.password" prefix="ios-contact" placeholder="请输入密码" type="password" />
                <Input prefix="ios-contact" placeholder="请输入验证码" />
            </div>
            <div class="allButton">
                <Button id="findPass" size="small">找回密码</Button>
                <Button id="signNow" size="small" @click="changeToSignUp">立即注册</Button>
            </div>
            <div slot="footer">
                <Button size="large" long  @click.native="doSignIn">确定</Button>
            </div>-->
        </Modal>
        <Modal v-model="signUp" width="600px">
            <div id="headImg">
                <img id="img" src="../images/signup.jpg" alt="正方形的原始图片" />
                <div style="clear:both"></div>
            </div>
            <!--<div id="headBox2">
                    <div id="headBox">
                        <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                    </div>
                </div>-->
            <div id="rightPart" style="float:right;padding-top:70px">
                <div class="allInput">
                    <span v-if="wrong" style="color: #ce4545">*{{alert}}</span>
                    <Input v-model="info.username" prefix="ios-contact" placeholder="请输入用户名/手机/邮箱" type="text" style="margin-top:25px" />
                    <Input v-model="info.password" prefix="ios-contact" placeholder="请输入密码" type="password" style="margin-top:25px" @keyup.enter.native="doSignUp" />
                    <div>
                        <Input v-model="info.inputCode" prefix="ios-contact" placeholder="请输入验证码" style="margin-top:25px;width:150px;" @keyup.enter.native="doSignUp" />
                        <SIdentify1 style="float:right;margin-top:25px;height:40px;" @click.native="sendIndentify"></SIdentify1>
                        <Button size="large" long @click="checkIndentify"> 测试用 </Button>
                    </div>
                </div>
                <div class="allButton">
                    <div style="clear:both"></div>
                    <Button id="signup" size="large" long @click="doSignUp" style="margin-top:25px">注册</Button>
                    <div class="smallBt">
                        <Button id="signNow" size="small" @click="changeToSignIn" style="color:#0066cc; border-color:#fff">已有账号？</Button>
                    </div>
                </div>
            </div>
            <div style="clear:both"></div>
            <!--       <div class="allInput">
                <span v-if="wrong" style="color: #ce4545">*{{alert}}</span>
                <Input v-model="info.username" prefix="ios-contact" placeholder="请输入用户名" type="text" />
                <Input v-model="info.password" prefix="ios-contact" placeholder="请输入密码" type="password" />
                <Input prefix="ios-contact" placeholder="请输入验证码" />
            </div>
            <div class="allButton">
                <Button id="signNow" size="small" @click="changeToSignIn">已有账号？</Button>
            </div>
            <div slot="footer">
                <Button size="large" long @click="doSignUp">确定</Button>
            </div>-->
        </Modal>
    </div>
</template>
<script>
import SIdentify from "./components/Identify"
import SIdentify1 from "./components/Identify1"
import { Personal } from '../store/personal/index.js'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {
    props: ['signInFromJump', 'signInFromMain', 'signUpFromMain'],
    components: { SIdentify, SIdentify1 },
    data() {
        return {
            signIn: false,
            signUp: false,
            info: { username: "", password: "", mode: "", inputCode: "" },
            wrong: false,
            alert: '',
            identifyCode2: "",
            identifyCode1: "",
            //identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
            identifyCodes: "1234567890",
            checkNum: "",
            checkNum1: ""
        }
    },
    computed: mapState('Personal', {
        personDetail: 'personalInfo',
    }),
    mounted() {
        this.identifyCode2 = "";
        this.identifyCode1 = "";
        this.makeCode(this.indentifyCodes, 4);
    },
    methods: {
        sendIndentify() {
            //alert("Hi");
            var userMode = this.checkValid(this.info.username)
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('SEND_IDENTIFY', this.info).then(
                    (response) => {
                        console.log('response')
                        console.log(response)
                    }
                )
            }
        },
        checkIndentify() {
            var userMode = this.checkValid(this.info.username)
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('CHECK_IDENTIFY', this.info).then(
                    (response) => {
                        console.log(response)
                        if (response['success']) {
                            alert("Your verify done!")
                        }
                    }
                )
            }
        },
        randomNum(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
            this.identifyCode2 = "";
            this.identifyCode1 = "";
            this.makeCode(this.identifyCodes, 4);
            //alert(this.signIn)
            //alert(this.identifyCode2)
            // alert(this.identifyCode1)
        },
        makeCode(o, l) {
            for (let i = 0; i < l; i++) {
                this.identifyCode2 += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
            for (let i = 0; i < l; i++) {
                this.identifyCode1 += this.identifyCodes[
                    this.randomNum(0, this.identifyCodes.length)
                ];
            }
        },
        changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
            this.info.username = "";
            this.info.password = "";
            this.checkNum = "";
            this.checkNum1 = "";
            // this.refreshCode();
        },
        changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
            this.info.username = "";
            this.info.password = "";
            this.checkNum = "";
            this.checkNum1 = "";
            /// this.refreshCode();
        },
        doSignUp() {
            var userMode = this.checkValid(this.info.username)
            if (userMode !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('SIGN_UP', this.info).then(
                    (response) => {
                        console.log('response')
                        console.log(response)
                        if (response['success']) {
                            this.wrong = false
                            this.changeToSignIn()
                        } else {
                            this.wrong = true;
                            this.alert = response['msg']
                        }
                    }
                )
            }
            this.refreshCode();

        },
        doSignIn() {
            if (this.checkValid(this.info.username) !== 'invalid') {
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('SIGN_IN', this.info).then(
                    (response) => {
                        if (response['success']) {
                            this.$emit("SignSuccess", true)
                            this.signIn = false
                            let data = {
                                log: true,
                                userID: response.data,
                                username: "$"
                            }
                            window.sessionStorage.setItem('LogInfo', JSON.stringify(data))
                            this.$router.push({
                                path: '/main',
                                name: 'main',
                            })
                            this.wrong = false
                            // console.log(this.$cookies.get('User'))
                            this.$store.dispatch('Ques/GET_COLLECT_QUESLIST')
                            this.$store.dispatch('Ques/GET_ATTEND_QUESLIST')
                            this.$store.dispatch('Ques/GET_PUBLISH_QUESLIST')
                        } else {
                            // console.log('??????????')
                            this.wrong = true;
                            this.alert = response['msg']
                        }
                        this.$store.dispatch('Personal/GET_INFO').then((res) => {
                            let data = {
                                log: JSON.parse(window.sessionStorage.getItem('LogInfo')).log,
                                userID: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                                username: this.personDetail.nickname
                            }
                            window.sessionStorage.setItem('LogInfo', JSON.stringify(data))
                            console.error(data)
                        })
                    }
                )
            }


        },
        checkValid(username) {
            if (this.signIn) {
                if (this.checkNum != this.identifyCode2) {
                    this.wrong = true
                    this.alert = '验证码错误'
                    this.refreshCode();
                    return 'invalid'
                }
            }
            if (this.info.username === '' || this.info.password === '') {
                this.wrong = true
                this.alert = '密码或用户名不能为空'
                return 'invalid'
            } else {
                let email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                let phone = /^1[34578]\d{9}$/
                if (phone.test(username)) {
                    return 'phone'
                } else if (email.test(username)) {
                    return 'email'
                } else {
                    this.wrong = true
                    this.alert = '无效的用户名'
                    return 'invalid'
                }
            }
        }
    },
    watch: {
        signInFromJump: function(signIn, oldsignIn) {
            this.signUp = false;
            this.signIn = true;
        },
        signInFromMain: function(signIn, oldsignIn) {
            this.signUp = false;
            this.signIn = true;
        }
    }
}
</script>
<style>
#sendIndentify {
    margin-top: 25px;
    float: right;
    color: #fff;
    border-radius: 5px;
    background-color: #3cb175;
}

#logoN {
    font-size: 20px;
    color: white;
}

#signB {
    float: right;
    font-size: 20px;
}

#headImg {
    width: 50%;
    height: 100%;
    position: relative;
    float: left;
}

#img {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-table;
}


#headBox {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}

#rightPart {
    width: 50%;
    padding: 15px;
    position: relative;
}

#head {
    max-width: 100%;
    max-height: 100%;
    text-align: center;
    clear: both;
    display: block;
    margin: auto;
}

#loginBt {
    height: 40px;
    border-radius: 30px;
    background: linear-gradient(to right, rgb(206, 53, 53), rgb(255, 51, 102));
    color: #fff
}

#signup {
    height: 40px;
    margin-top: 15px;
    border-radius: 30px;
    background: linear-gradient(to right, #00cccc, #009966);
    color: #fff
}

.allButton {
    width: 100%;
}

.smallBt {
    float: right;
    margin-top: 10px;
}

.ivu-modal-footer {
    display: none;
}

.ivu-modal-body {
    padding: 1px;
}

.ivu-input-prefix {
    display: none;
}

.ivu-input.ivu-input-default.ivu-input-with-prefix {
    height: 40px;
    border-radius: 30px;
}
</style>
<!--<style>
#logoN {
    font-size: 20px;
    color: white;
}

#signB {
    float: right;
    font-size: 20px;
}

#headBox2 {}

#headBox {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    overflow: hidden;
    text-align: center;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
}


#head {
    max-width: 100%;
    max-height: 100%;
    text-align: center;
    clear: both;
    display: block;
    margin: auto;
}

.allButton {
    float: right;
    margin: 5px;
}
</style>-->