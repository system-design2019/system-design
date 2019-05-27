<style>
    .personCenter{
    width: 100%;
    align-items: center;
    position: absolute;
}
    .personInformation{
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
}
    /* #qInformation{
    text-align: center;
    align-items: center;
    display: flex;
    justify-content: center;
    } */

    h1 {
        height: 150px;

        img {
            height: 100%;
        }
    }

    h2 {
        color: #666;
        margin-bottom: 200px;

        p {
            margin: 0 0 50px;
        }
    }

    .ivu-row-flex {
        height: 100%;
    }

    #personInfo {
        width: 80%;
    }

    .pInfo {
        font-size: 20px;
        float:left;

    }

    Row {
        margin: 30px;
    }

    input{
        width:60%;
    }

    input[disabled],input:disabled,input.disabled{  
    background-color: #fff;  
    -webkit-text-fill-color:#333;  
    -webkit-opacity:1;  
    opacity: 1;  
    border:0px;
    } 

    .ivu-tabs-nav-container{
     font-size:30px!important;
    }

    .iconInDy{
        float:left;
        margin-top:10px;
    }
    .personal .ivu-tabs-nav-container{
        font-size: 22px!important;
    }


</style>
<template>
    <div class="personCenter">
        <div class="personInformation">
            <Row id="personInfo">
                <Col span="8">
                <card style="height:270px;">
                    <Row>
                        <div id="headBox">
                            <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                        </div>
                    </Row>
                    <Row>
                        <input v-model="personDetail.nickname" type="text" style="font-size:25px;text-align:center;" :disabled="!editable" v-bind:style="styleForText" />
                    </Row>
                    <Row>
                        <span>ID:{{personDetail.id}}</span>
                    </Row>
                    <Row>
                        <span> 信用： </span>
                        <Rate disabled="true" v-model="personDetail.credit"> </Rate>
                    </Row>
                </card>
                </Col>
                <Col span="16">
                <card id="bigPInfo" style="height:270px;white-space:nowrap;">
                    <Row>
                        <Button ghost size=small style="float:right;color:blue;font-size:15px;" @click="editInfo">
                            <span>{{this.buttonText}}</span>
                        </Button>
                    </Row>
                    <Row style="margin:15px;margin-top:1px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/性别.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>性别</span>
                            <input v-model="personDetail.gender" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" size="small" />
                        </div>
                        </Col>
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/学校.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>就读院校</span>
                            <input v-model="personDetail.university" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:15px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/邮箱.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>邮箱</span>
                            <input v-model="personDetail.email" type="text" style="margin-left:8px" disabled v-bind:style="styleForText" />
                        </div>
                        </Col>
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/年级专业.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>专业年级</span>
                            <input v-model="personDetail.major" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:15px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/微信.png" width="30px" height="30px" style="margin-right:3px" />
                            <span> Q Q</span>
                            <input v-model="personDetail.qq" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/学号.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>学生卡号</span>
                            <input v-model="personDetail.studentId" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:15px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/手机.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>手机</span>
                            <input v-model="personDetail.phone" type="text" style="margin-left:8px;" :disabled="true" v-bind:style="styleForText" />
                        </div>
                        </Col>
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/邮箱.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>微信账号</span>
                            <input v-model="personDetail.wechat" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                </card>
                </Col>
            </Row>
        </div>
        <div class="personal" style="margin: 0 10%">
            <Tabs value="credit" style="font-size: 20px">
                <TabPane label="我发布的" name="credit">
                    <div id="Dynamic">
                        <div>
                            <span id="dynamicDate" style="font-size:20px;color:red;"> 04.12 </span><span style="font-size:15px;color:gray;">我发布了</span>
                        </div>
                        <task type="3" mode="0"></task>
                    </div>
                </TabPane>
                <TabPane label="我参与的" name="history">
                    <div id="Dynamic">
                        <div>
                            <span id="dynamicDate" style="font-size:20px;color:red;"> 04.15 </span><span style="font-size:15px;color:gray;">我参与了</span>
                        </div>
                        <task type="2" mode="0"></task>
                    </div>
                </TabPane>
                <TabPane label="我的收藏" name="collect">
                    <div id="Dynamic">
                        <div>
                            <span id="dynamicDate" style="font-size:20px;color:red;"> 04.15 </span><span style="font-size:15px;color:gray;">我参与了</span>
                        </div>
                        <task type="1" mode="0"></task>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Personal } from '../store/personal/index.js'
import task from './components/Task.vue'
export default {
    components: {
        task
    },
    data() {
        return {
            borderSize: 0,
            editable: false,
            styleForText: 'border:' + this.borderSize + 'px',
            creditRate: 5,
            buttonText: "编辑资料"
            //clientHeight: document.body.clientHeight,
            //clientWidth: document.body.clientWidth
        }
    },
    computed: mapState('Personal', {
        personDetail: 'personalInfo'
    }),
    methods: {
        editInfo() { //修改个人信息
            // alert(this.editable);
            this.editable = !this.editable;
            if (this.editable == true) {
                this.styleForText = 'border:1px solid';
            } else {
                this.styleForText = 'border:0px';
            }
            if (this.buttonText == "编辑资料") {
                this.buttonText = "保存资料";
            } else {
                this.buttonText = "编辑资料";
                //console.log(this.personDetail)
                this.$store.dispatch('Personal/UPDATE_INFO');

            }
        }
    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
    }
}
</script>