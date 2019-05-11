<template>
    <div>
        <Modal v-model="signIn" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>登陆页面</span>
            </p>
            <div style="text-align:center">
                <p>如您已经注册了账号，请输入并登陆.</p>
            </div>
            <div id="headBox2">
                <div id="headBox">
                    <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                </div>
            </div>
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
            </div>
        </Modal>
        <Modal v-model="signUp" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>注册页面</span>
            </p>
            <div style="text-align:center">
                <p>清输入相关信息进行注册</p>
            </div>
            <div id="headBox2">
                <div id="headBox">
                    <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                </div>
            </div>
            <div class="allInput">
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
            </div>
        </Modal>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {    
    props: ['signInFromJump', 'signInFromMain', 'signUpFromMain'],
    data() {
        return {
            signIn: false,
            signUp: false,
            info: {username: "", password: "", mode:""},
            wrong: false,
            alert: ''
        }
    },
    methods: {
        changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
        },
        changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
        },
        doSignUp(){
            if(this.checkValid(this.info.username) !== 'invalid'){
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('SIGN_UP', this.info).then(
                    (response) => {
                        if(response['success']){
                            this.wrong = false
                            this.changeToSignIn()
                        }
                        else{
                            this.wrong = true;
                            this.alert = response['msg']
                        }
                    }
                )
            }
            
        },
        doSignIn(){
            if(this.checkValid(this.info.username) !== 'invalid'){
                this.info.mode = this.checkValid(this.info.username)
                this.$store.dispatch('SIGN_IN', this.info).then(
                    (response) => {
                        if(response){
                            this.$emit("SignSuccess", true)
                            this.signIn = false
                            this.$router.push({
                                path:'/main',
                                name: 'main',
                            })
                            this.wrong = false
                        }
                        else{
                            this.wrong = true;
                            this.alert = '用户名或密码错误'
                        }
                    }
                )
            }
            
            
        },
        checkValid(username){
            if(this.info.usernmae === '' || this.info.password === ''){
                this.wrong = true
                this.alert = '密码或用户名不能为空'
                return 'invalid'
            }
            else {
                let email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
                let phone=/^1[34578]\d{9}$/
                if(phone.test(username)){
                    return 'phone'
                }
                else if(email.test(username)){
                    return 'email'
                }
                else{
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
</style>