<style>
    .person {
    width: 100%;
    position: absolute;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

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
        width:200px;
    }

    input[disabled],input:disabled,input.disabled{  
    background-color: #fff;  
    -webkit-text-fill-color:#333;  
    -webkit-opacity:1;  
    opacity: 1;  
    border:0px;
    } 


}
</style>
<template>
    <div class="person">
        <Row id="personInfo">
            <Col span="8">
            <card style="height:260px;">
                <Row>
                    <div id="headBox">
                        <img id="head" src="../images/hellobg.jpg" alt="正方形的原始图片" width="150px" height="150px" />
                    </div>
                </Row>
                <Row>
                    <input type="text" style="font-size:25px;text-align:center;" :disabled="!editable" v-bind:style="styleForText" placeholder="宋主席" />
                </Row>
                <Row>
                    <span>ID:Suata</span>
                </Row>
                <Row>
                    <span> 信用： </span>
                    <Rate show-text />
                </Row>
            </card>
            </Col>
            <Col span="16">
            <card style="height:260px;">
                <Row>
                    <Button ghost size=small style="float:right;color:blue;font-size:15px;" @click="editInfo">编辑资料</Button>
                </Row>
                <Row style="margin:15px;margin-top:1px;">
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/性别.png" width="30px" height="30px" />
                        <span>性别</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="female" />
                    </div>
                    </Col>
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/学校.png" width="30px" height="30px" />
                        <span>就读院校</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="中山大学" />
                    </div>
                    </Col>
                </Row>
                <Row style="margin:15px;">
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/邮箱.png" width="30px" height="30px" />
                        <span>邮箱</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="123456789@qq.com" />
                    </div>
                    </Col>
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/年级专业.png" width="30px" height="30px" />
                        <span>专业年级</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="软件工程16级" />
                    </div>
                    </Col>
                </Row>
                <Row style="margin:15px;">
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/微信.png" width="30px" height="30px" />
                        <span>微信</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="sxt123568" />
                    </div>
                    </Col>
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/学号.png" width="30px" height="30px" />
                        <span style="width:80px;text-align:center;">学号</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="16340192" />
                    </div>
                    </Col>
                </Row>
                <Row style="margin:15px;">
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/手机.png" width="30px" height="30px" />
                        <span>手机</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" placeholder="123455678901" />
                    </div>
                    </Col>
                    <Col span="11">
                    <div class="pInfo">
                        <img src="../images/personal/邮箱.png" width="30px" height="30px" />
                        <span>XX</span>
                        <input type="text" style="margin-left:8px;" :disabled="!editable" v-bind:style="styleForText" />
                    </div>
                    </Col>
                </Row>
            </card>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            borderSize: 0,
            editable: false,
            styleForText: 'border:' + this.borderSize + 'px'
        }
    },
    methods: {
        editInfo() { //修改个人信息
            // alert(this.editable);
            this.editable = !this.editable;
            if (this.editable == true) {
                this.styleForText = 'border:1px solid';
            } else {
                this.styleForText = 'border:0px';
            }
        }
    }
}
</script>