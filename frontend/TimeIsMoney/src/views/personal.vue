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
                    <span style="font-size:25px;">宋主席</span>
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
                    <Button ghost style="float:right;color:blue;" @click="editInfo">编辑资料</Button>
                </Row>
                <Row style="margin:15px;">
                    <Col span="12">
                    <div class="pInfo">
                        <span>性别</span>
                        <input type="text" style="margin-left:8px; !editable? border:0px : border:1px;" :disabled="editable" />
                    </div>
                    </Col>
                    <Col span="12">
                    <span class="pInfo">就读院校</span>
                    </Col>
                </Row>
                <Row style="margin:15px">
                    <Col span="12">
                    <span class="pInfo">邮箱
                    </span>
                    </Col>
                    <Col span="12">
                    <span class="pInfo">年龄专业
                    </span>
                    </Col>
                </Row>
                <Row style="margin:15px">
                    <Col span="12">
                    <span class="pInfo">微信
                    </span>
                    </Col>
                    <Col span="12">
                    <span class="pInfo">学号
                    </span>
                    </Col>
                </Row>
                <Row style="margin:15px">
                    <Col span="12">
                    <span class="pInfo">手机
                    </span>
                    </Col>
                    <Col span="12">
                    <span class="pInfo">XX
                    </span>
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
            editable: true
        }
    },
    methods: {
        editInfo() { //修改个人信息
            // alert(this.editable);
            this.editable = !this.editable;
        }
    }
}
</script>