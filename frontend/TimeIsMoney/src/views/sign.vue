<template>
    <div>
        <Modal v-model="signIn" width="600px">

            <div id="headImg">
               <img id="img" src="../images/login.jpg" alt="正方形的原始图片"/>
               <div style="clear:both"></div>
            </div>
            <div id="rightPart" style="float:right">
                <div id="headBox2">
                    <div id="headBox">
                        <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                    </div>
                </div>
                <div class="allInput">
                    <Input v-model="info.username" prefix="ios-contact" placeholder="用户名/手机/邮箱" type="text" style="margin-top:15px"/>
                    <Input v-model="info.password" prefix="ios-contact" placeholder="密码" type="password" style="margin-top:15px"/>
                    <Input prefix="ios-contact" placeholder="验证码" style="margin-top:15px"/>
                </div>
                <div class="allButton">
                    <div style="clear:both"></div>
                    <Button id="loginBt" size="large" long  @click.native="doSignIn" style="margin-top:15px">登录</Button>
                    <div class="smallBt">
                        <Button id="findPass" size="small" style="color:#0066cc; border-color:#fff">找回密码</Button>
                        <Button id="signNow" size="small" @click="changeToSignUp" style="color:#0066cc; border-color:#fff">立即注册</Button>
                    </div>
                </div>
            </div>
            <div style="clear:both"></div>
        </Modal>


        <Modal v-model="signUp" width="600px">
            <div id="headImg">
               <img id="img" src="../images/signup.jpg" alt="正方形的原始图片"/>
               <div style="clear:both"></div>
            </div>  
                <!--<div id="headBox2">
                    <div id="headBox">
                        <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                    </div>
                </div>-->
            <div id="rightPart" style="float:right;padding-top:70px">
                <div class="allInput">
                    <Input v-model="info.username" prefix="ios-contact" placeholder="请输入用户名/手机/邮箱" type="text" style="margin-top:25px"/>
                    <Input v-model="info.password" prefix="ios-contact" placeholder="请输入密码" type="password" style="margin-top:25px"/>
                    <Input prefix="ios-contact" placeholder="请输入验证码" style="margin-top:25px"/>
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
        </Modal>
        
    </div>
</template>
<style>
#logoN {
    font-size: 20px;
    color: white;
}

#signB {
    float: right;
    font-size: 20px;
}
#headImg{
    width: 50%;
    height: 100%;
    position: relative;
    float:left;
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
    width:50%;
    padding:15px;
    position:relative;
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
    height:40px;
    border-radius: 30px; 
    background:linear-gradient(to right,rgb(206,53,53),rgb(255,51,102));
    color:#fff
}

#signup {
    height:40px;
    margin-top:15px; 
    border-radius: 30px; 
    background:linear-gradient(to right,#00cccc,#009966);
    color:#fff
}
.allButton {
    width:100%;
}
.smallBt{
    float:right;
    margin-top:10px;
}
.ivu-modal-footer {
    display: none;
}
.ivu-modal-body {
    padding: 1px;
}
.ivu-input-prefix{
    display: none;
}
.ivu-input.ivu-input-default.ivu-input-with-prefix{
    height: 40px;
    border-radius: 30px;
}
</style>
<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
export default {    
    props: ['signInFromJump', 'signInFromMain', 'signUpFromMain'],
    data() {
        return {
            signIn: false,
            signUp: false,
            info: {username: "", password: ""}
            
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
            if(this.info.usernmae === '' || this.info.password === '')
            this.store
            this.changeToSignIn()
        },
        doSignIn(){
            this.signIn = false
            this.$emit("SignSuccess", true)
            // console.log('password: ' + this.info.password)
            this.$store.dispatch('SIGN_IN', this.info).then(
                () => {
                    this.$router.push({
                        path:'/main',
                        name: 'main',
                    })
                }
            )
            
            
            
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