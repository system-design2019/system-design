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
        <div class="personInformation">
            <Row id="personInfo">
                <Col span="8">
                <card style="height:270px;">
                    <Row>
                        <div id="headBox">
                            <img id="head" :src="personDetail.face" alt="头像" width="150px" height="150px" @click.stop="uploadHeadImg" />
                            <input :disabled="!editable" type="file" accept="image/*" @change="handleFile" class="hiddenInput" />
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
                        <Rate :disabled="true" show-text allow-half v-model="personDetail.credit"> </Rate>
                        <span style="color: #f5a623">{{ personDetail.credit }}</span>
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
                            <input v-model="personDetail.email" type="text" style="margin-left:8px" :disabled="!editEmail" v-bind:style="styleForText" />
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
                            <input v-model="personDetail.phone" type="text" style="margin-left:8px;" :disabled="!editPhone" v-bind:style="styleForText" />
                        </div>
                        </Col>
                        <Col span="12">
                        <div class="pInfo">
                            <img src="../images/personal/邮箱.png" width="30px" height="30px" style="margin-right:3px" />
                            <span>微信账号</span>
                            <input v-model="personDetail.weChatPay" type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
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
            buttonText: "编辑资料",
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
                this.buttonText = "保存资料";
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