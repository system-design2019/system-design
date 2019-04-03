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

#headBox{
   width:120px; 
   height:120px; 
   border-radius:50%; 
   overflow:hidden;
   margin:10px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center
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
                            <MenuItem name="signIn" @click.native="modal2 = true">
                            <Icon type="ios-navigate"></Icon>
                            登陆
                            </MenuItem>
                            <MenuItem name="signUp" @click.native="alertsome">
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
                            <MenuItem name="1-1">查看所有问卷</MenuItem>
                            <MenuItem name="1-2">发布问卷</MenuItem>
                            <MenuItem name="1-3">我的问卷</MenuItem>
                            <MenuItem name="1-4">问卷详情</MenuItem>
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
                            <MenuItem name="4-1">产品概念</MenuItem>
                            <MenuItem name="4-2">我要加盟</MenuItem>
                        </Submenu>
                    </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Content :style="{padding: '24px', minHeight: '500px', background: '#fff'}">
                        Content
                    </Content>
                    <Modal v-model="modal2" width="360">
                        <p slot="header" style="color:#f60;text-align:center">
                            <Icon type="ios-information-circle"></Icon>
                            <span>登陆页面</span>
                        </p>
                        <div style="text-align:center">
                            <p>如您已经注册了账号，请输入并登陆.</p>
                        </div>
                        <div id="headBox">
                            <img src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                        </div>
                        <input placeholder="用户名" style="width: 300px" />
                        <div slot="footer">
                            <Button type="error" size="large" long @click="del">Delete</Button>
                        </div>
                    </Modal>
                </Layout>
            </Layout>
        </Layout>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modal2: false
        }
    },
    methods: {
        alertsome() {
            alert("yes");
        },
        del() {
            modal2 = false;
        }
    }

}
</script>