<style scoped>
    .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    /*position: relative;*/
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 35px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 10px;
    text-align: center;
    line-height: 35px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
#logoN{
  font-size:20px;
  color:white;
}

#signB{
  float:right;
  font-size:20px;
}

#headBox2{
}

#headBox{
   width:120px; 
   height:120px; 
   border-radius:50%; 
   overflow:hidden;
   text-align: center;
   margin: auto;
   margin-top: 10px;
   margin-bottom: 10px;
 }


#head{
  max-width:100%;
  max-height:100%;
  text-align: center;
  clear:both;
  display: block;
  margin:auto;
}

.allButton{
  float:right;
  margin:5px;
}







</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo">
                        <p id="logoN">M.I.T </p>
                    </div>
                    <div class="layout-nav">
                        <div id="signB">
                            <MenuItem name="signIn" @click.native="signIn = true">
                            <Icon type="ios-navigate"></Icon>
                            登陆
                            </MenuItem>
                            <MenuItem name="signUp" @click.native="signUp = true">
                            <Icon type="ios-keypad"></Icon>
                            注册
                            </MenuItem>
                        </div>
                    </div>
                </Menu>
            </Header>
            <Layout>
                <Sider hide-trigger :style="{background: '#fff'}">
                    <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                问卷服务
                            </template>
                            <MenuItem name="1-1" to="test1">查看所有问卷</MenuItem>
                            <MenuItem name="1-2" to="test2">我发布的</MenuItem>
                            <MenuItem name="1-3" to="/main">我参与的</MenuItem>
                        </Submenu>
                        <Submenu name="2">
                            <template slot="title">
                                <Icon type="ios-keypad"></Icon>
                                跑腿服务
                            </template>
                            <MenuItem name="2-1">拿快递</MenuItem>
                            <MenuItem name="2-2">拿外卖</MenuItem>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                约馆助手
                            </template>
                            <MenuItem name="3-1">我要约馆</MenuItem>
                            <MenuItem name="3-2">我要约球</MenuItem>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                <Icon type="ios-analytics"></Icon>
                                关于我们
                            </template>
                            <MenuItem name="4-1" @click.native="goToJump">产品概念</MenuItem>
                            <MenuItem name="4-2">我要加盟</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
                        <div id="changeBox">
                            <!--
                            这里使用切换componet实现局部的刷新
                            <keep-alive>
                                <component :is="tabView"></component>
                            </keep-alive>
                             -->
                            <router-view></router-view>
                        </div>
                    </Content>
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
                            <Input v-model="username" prefix="ios-contact" placeholder="请输入用户名" type="text" />
                            <Input v-model="password" prefix="ios-contact" placeholder="请输入密码" type="password" />
                            <Input prefix="ios-contact" placeholder="请输入验证码" />
                        </div>
                        <div class="allButton">
                            <Button id="findPass" size="small">找回密码</Button>
                            <Button id="signNow" size="small" @click="changeToSignUp">立即注册</Button>
                        </div>
                        <div slot="footer">
                            <Button size="large" long @click="Confirm">确定</Button>
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
                            <Input v-model="username" prefix="ios-contact" placeholder="请输入用户名" type="text" />
                            <Input v-model="password" prefix="ios-contact" placeholder="请输入密码" type="password" />
                            <Input prefix="ios-contact" placeholder="请输入验证码" />
                        </div>
                        <div class="allButton">
                            <Button id="signNow" size="small" @click="changeToSignIn">已有账号？</Button>
                        </div>
                        <div slot="footer">
                            <Button size="large" long @click="Confirm">确定</Button>
                        </div>
                    </Modal>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import simple1 from "./test1.vue";
import simple2 from "./test2.vue";

export default {
    data() {
        return {
            signIn: false,
            signUp: false,
            username: "",
            password: "",
            tabView: "simple1"
        }
    },
    methods: {
        alertsome() {
            alert("yes");
        },
        Confirm() {
            alert(this.username + this.password); //username
        },
        changeToSignUp() {
            this.signIn = false;
            this.signUp = true;
        },
        changeToSignIn() {
            this.signUp = false;
            this.signIn = true;
        },
        goToJump() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/'
            })
        },
        /*
        tosim(index) {
            this.tabView = `simple${index}`;
        }
        */
    },
    components: {
        simple1,
        simple2
    }

}
</script>