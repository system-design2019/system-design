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
.ivu-rate-star-full{
    margin-right:0px!important;
    padding:0px;
}
.ivu-rate-star-zero{
    margin-right:0px!important;
    padding:0px;
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

    .ivu-tabs-content,.ivu-tabs-content-animated{
        height:450px;
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
        <Row id="background" type="flex" justify="center">
            <img style="width:100%; height:180px;" src="../images/personal/background.png"/>
        </Row>
        <div class="personInformation">
            <Row id="personInfo">
                <Col span="8">
                <card style="height:265px;width:280px;float:right;">
                    <div style="position:relative;top:-100px;">
                        <Row>
                            <div id="headBox" style="width:150px; height:150px;">
                                <img id="head" :src="personDetail.face" alt="头像" style="width:150px; height:150px;" @click.stop="uploadHeadImg" />
                                <input :disabled="!editable" type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
                            </div>
                        </Row>
                        <Row>
                             <input v-model="personDetail.nickname" type="text" style="font-size:25px;text-align:center;" :disabled="!editable" v-bind:style="styleForText" />
                        </Row>
                        <Row>
                            <span>ID:{{personDetail.id}}</span>
                        </Row>
                         <Row  style="margin-top:20px;">
                            <img src="../images/personal/价格.png" style="width:25px;vertical-align: middle;margin-right:5px;"></img>
                            <span style="vertical-align: middle"> M币： </span>
                            <span style="color: #ce4545;vertical-align: middle">{{ personDetail.asset }}</span>
                        </Row>
                        <Row style="margin-top:5px;">
                            <span> 信用：</span>
                            <Rate :disabled="true" show-text allow-half v-model="personDetail.credit"> </Rate>
                            <span style="color: #f5a623">{{ personDetail.credit }}</span>
                        </Row>
                    </div>    
                </card>
                <card style="height:230px;width:280px;float:right;margin-top:5px;padding-top:20px;">
                    <img src="../images/name.png" style="width: 150px; float:left;"></img>
                    <span style="color: #ce4545; font-weight: bold; font-size: 20px; float: right;position:relative; left: -10px; top: 13px;">联系我们</span>
                    <Col style="margin-left:10px;">
                        <Row><span style="color: #ce4545; float: left; margin-top:10px;">微信：MBL1228e</span></Row>
                        <Row><span style="color: #ce4545; float: left; margin-top:5px;">手机：18746615405</span></Row>
                        <Row><span style="color: #ce4545; float: left; margin-top:5px;">邮箱：1252418308@qq.com </span></Row>
                    </Col>
                </card>
                </Col>
                
                <Col span="16">
                <card id="bigPInfo" style="height:600px;white-space:nowrap;right:-3px;">
                    <Row style="margin:15px;">
                        <Col span="24">
                        <span style="float:left; font-color: black;font-size:18px; font-weight: bold;">基本信息</span>
                        <Button ghost size=small style="float:right;color:blue;font-size:15px;vertical-align:middle;" @click="editInfo">
                            <span>{{this.buttonText}}</span>
                        </Button>
                        <div style="height: 1px; width: 100%; background-color: #bebebe; overflow:hidden;"></div>
                        </Col>
                    </Row>
                    <Row style="margin:15px;margin-top:1px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/性别.png" width="25px" height="25px" style="margin-right:3px; vertical-align:middle;" />
                            <span style="font-size:15px;">性别</span>
                            <input v-model="personDetail.gender" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editable" v-bind:style="styleForText" size="small" />
                        </div>
                        </Col>
                    <!--    -->
                    </Row>
                    <Row style="margin:15px;margin-top:1px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/头像2.png" width="20px" height="20px" style="margin-left:15px; margin-right:3px; vertical-align:middle;" />
                            <span style="font-size:15px;">当前id</span>
                            <span style="vertical-align: middle;font-size:15px;margin-left:8px">{{ personDetail.id }}</span>
                            <a style="vertical-align: middle;font-size:15px;margin-left:15px">修改密码</a>
                        </div>
                        </Col>
                    </Row>

                    <Row style="margin:15px; margin-top:20px;">
                        <Col span="24">
                        <span style="float:left; font-color: black;font-size:18px; font-weight: bold;">联系信息</span>
                        <Button ghost size=small style="float:right;color:blue;font-size:15px;vertical-align:middle;" @click="editInfo">
                            <span>{{this.buttonText}}</span>
                        </Button>
                        <div style="height: 1px; width: 100%; background-color: #bebebe; overflow:hidden;"></div>
                        </Col>
                    </Row>
                    <Row style="margin-left:15px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/邮箱.png" width="20px" height="20px" style="vertical-align:middle;margin-right:3px; margin-left:5px;" />
                            <span style="font-size:15px;">邮箱</span>
                            <input v-model="personDetail.email" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editEmail" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:10px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/qq.png" width="30px" height="30px" style="vertical-align:middle; margin-left:8px" />
                            <span style="font-size:15px;"> Q Q</span>
                            <input v-model="personDetail.qq" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                      
                    </Row>
                    <Row style="margin:10px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/手机.png" width="25px" height="25px" style="vertical-align:middle;margin-right:3px; margin-left:8px" />
                            <span style="font-size:15px;">手机</span>
                            <input v-model="personDetail.phone" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editPhone" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:10px;">  
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/微信.png" width="25px" height="25px" style="vertical-align:middle; margin-left:10px" />
                            <span style="font-size:15px; margin-left:2px;">微信</span>
                            <input v-model="personDetail.weChatPay" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>

                    <Row style="margin:15px; margin-top:20px;">
                        <Col span="24">
                        <span style="float:left; font-color: black;font-size:18px; font-weight: bold;">教育信息</span>
                        <Button ghost size=small style="float:right;color:blue;font-size:15px;vertical-align:middle;" @click="editInfo">
                            <span>{{this.buttonText}}</span>
                        </Button>
                        <div style="height: 1px; width: 100%; background-color: #bebebe; overflow:hidden;"></div>
                        </Col>
                    </Row>
                    <Row style="margin:10px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/学校.png" width="20px" height="20px" style="vertical-align:middle;margin-right:3px; margin-left:20px" />
                            <span style="font-size:15px; margin-left:2px;">就读院校</span>
                            <input v-model="personDetail.university" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:10px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/年级专业.png" width="20px" height="20px" style="vertical-align:middle;margin-right:3px; margin-left:20px" />
                            <span style="font-size:15px; margin-left:2px;">专业年级</span>
                            <input v-model="personDetail.major" type="text" style="margin-left:8px; font-size:15px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                    <Row style="margin:10px;">
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/学号.png" width="20px" height="20px" style="vertical-align:middle;margin-right:3px; margin-left:20px" />
                            <span style="font-size:15px; margin-left:2px;">学生卡号</span>
                            <input v-model="personDetail.studentId" type="text" style="margin-left:8px;font-size:15px;" :disabled="!editable" v-bind:style="styleForText" />
                        </div>
                        </Col>
                    </Row>
                </card>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Personal } from '../store/personal/index.js'
import { Ques } from '../store/questionnaire/index.js'
import task from './components/Task.vue'
import detail from "./components/Detail.vue"
import service from './../util/service.js'

export default {
    components: {
        task,
        detail
    },
    data() {
        return {
            borderSize: 0,
            editable: false,
            styleForText: 'border:' + this.borderSize + 'px',
            creditRate: 5,
            buttonText: "编辑",
            useForSign: 1, //1 means phone and 2 means email
            editPhone: false,
            editEmail: false,
            detailModel: false,
            zeroId: "",
            userInfo: {
                avatar: ""
            },
            SignByPhone: false
        }
    },
    computed: mapState('Personal', {
            personDetail: 'personalInfo',
            publishLists: 'publishing',
            attendLists: 'attending',
            collectLists: 'starring',
            detailContent: 'quesDetail'
        }
        /*
        ,
         ['Ques', {
            publishLists: 'publishQuesList',
            attendLists: 'attendQuesList',
            collectLists: 'collectQuesList'
        }]
        */
    ),
    methods: {
        editInfo() { //修改个人信息
            // alert(this.editable
            let emailFormat = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            let phoneFormat = /^1[34578]\d{9}$/;

            this.editable = !this.editable;
            if (this.editable == true) {
                this.styleForText = 'border:1px solid';
                this.buttonText = "保存";
                if (this.personDetail.email[0] == '$') {
                    //alert(this.personDetail.email[0]);
                    this.editEmail = true;
                    this.SignByPhone = false;
                    alert("邮箱只能修改一次，修改后不能再在本页面被修改，请谨慎输入正确的邮箱!");

                }
                if (this.personDetail.phone[0] == '$') {
                    this.editPhone = true;
                    this.SignByPhone = true;
                    alert("手机号只能修改一次，修改后不能再在本页面被修改，请谨慎输入正确的手机号!");
                }
            } else {
                if (this.SignByPhone) {
                    if (!phoneFormat.test(this.personDetail.phone)) {
                        alert("手机号格式错误");
                        this.personDetail.phone = "$";
                    }
                } else {
                    if (!emailFormat.test(this.personDetail.email)) {
                        alert("邮箱格式错误");
                        this.personDetail.email = "$";
                    }
                }
                //没有选择的时候 avatar = ""  空串
                this.editEmail = false;
                this.editPhone = false;

                if (this.userInfo.avatar != "") {
                    let formData = new FormData();
                    formData.append("file", this.userInfo.avatar);
                    var _this = this;
                    let response = service.post('/upload', formData)
                        .then(function(response) {
                            //alert(response.data);
                            console.log("the response:" + JSON.stringify(response));
                            console.log("the data.data:" + response.data.data);
                            _this.personDetail.face = response.data.data;
                            _this.$store.dispatch('Personal/UPDATE_INFO');

                            //window.location.reload();
                        })
                        .catch(function(error) {
                            alert("上传失败");
                            console.log(error);
                            // window.location.reload();
                        });
                } else {
                    this.$store.dispatch('Personal/UPDATE_INFO');
                }

                console.log("what is this:?" + this.personDetail.face);

                //this.$store.dispatch('Personal/UPDATE_INFO');

                this.styleForText = 'border:0px;';
                this.buttonText = "编辑资料";

            }
        },
        getDetail(id) {
            this.$store.dispatch('Ques/GET_DETAIL', id)
            this.detailModel = !this.detailModel
        },
        uploadHeadImg: function() {
            this.$el.querySelector('.hiddenInput').click()
        },
        // 将头像显示
        handleFile: function(e) {
            let $target = e.target || e.srcElement
            let file = $target.files[0]
            this.userInfo.avatar = file
            var reader = new FileReader()
            reader.onload = (data) => {
                let res = data.target || data.srcElement
                // console.log("before:" + this.personDetail.face);
                //post

                this.personDetail.face = res.result
                //this.userInfo.avatar = this.personDetail.face
                //console.log(this.personDetail.face)
                //console.log("after:" + this.personDetail.face);
            }
            reader.readAsDataURL(file)
        }


    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
        this.$store.dispatch('Personal/GET_PUBLISH'); //分发action
        this.$store.dispatch('Personal/GET_ATTEND'); //分发action
        this.$store.dispatch('Personal/GET_STAR'); //分发action

        //id前面补0   一共5位
        this.zeroId = (this.personDetail.id).toString();
        //alert(this.zeroId);
        for (var len = this.zeroId.length; len < 5; len = this.zeroId.length) {
            this.zeroId = "0" + this.zeroId;
        }
        //alert(this.zeroId);
    }
}
</script>