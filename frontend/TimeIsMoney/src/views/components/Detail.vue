<template>
<div>
<Modal v-model="detail" width="800px" class-name="vertical-center-modal" :mask-closable="false">
    <img src="./../../../static/ques/detail.png" style="position:relative; float: left; left: -60px; top: -60px; height:500px"></img>
    <p style="font-size:26px; margin: 20px 0 10px 0">{{detailContent.title}}</p>
    <div style="overflow: hidden; width: 400px">
    <div style="width: 200px; float:left">
        <div style="width: 100px; float:left">
            <img src="./../../../static/task/publisher.png" style="width:30px"></img>
            <span style="font-size: 22px">{{detailContent.publisher}}</span>
        </div>
        <div style="width: 100px; float:right">
            <img src="./../../../static/task/reward.png" style="width:30px"></img>
            <span style="font-size: 22px; color: #ce4545">{{detailContent.reward}}</span>
        </div>
    </div>
    <div style="float:right;width: 180px; text-align: right">
        <span>{{detailContent.endTime}}</span>
        <img src="./../../../static/task/collect.png" style="width:30px"></img>
    </div>
    </div>
    <div>
        <h3 style="margin: 15px 0 5px 0">简介</h3>
        <p style="text-indent: 2em; margin: 5px 0 0 0; ">{{detailContent.detail}}</p>
        <h3 style="margin: 15px 0 5px 0">要求</h3>
        <p style="text-indent: 2em; margin: 5px 0 0 0">{{detailContent.command}}</p>
        <h3 style="margin: 15px 0 5px 0">薪酬</h3>
        <p style="text-indent: 2em; margin: 5px 0 0 0">￥{{detailContent.reward}}/人</p>
    </div>
    

    <div slot="footer" style="position: relative; overflow: hidden; margin: 5px 20px 15px 20px">
        <div style="width: 75%; float: left; overflow: hidden; position: relative">
            <div style="width: 15%; float: left">
                <img src='../../../static/jump/social.png' style="width: 100%; height: 80%"></img>
                <p style="width:100%; text-align: center; font-weight: 700">{{detailContent.publisher}}</p>
            </div>
            <div style="width: 80%; float: right; bottom: 0; position: absolute; margin-left: 20%">
                <Col v-for="(info, index) in detailContent.infos" :key="index" span="12" style="text-align: left; margin: 5px 0">{{index}}:{{info}}</Col>
            </div>
        </div>
        <div style="width: 20%; float: right; position: absolute; bottom: 0; right: 10px">
            <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(detailContent.quesid)">立即填写</Button>
            <a style="width: 100%; text-align: center; right: 25%; position:relative">点此收藏</a>
        </div>
    </div>
</Modal>
</div>
</template>
<script>
export default{
    props:['detailContent', 'showDetail'],
    // detailContent = {
    //   quesid: 1234,
    //   infos:{
    //     total: 90, 
    //     attend: 5, 
    //     startTime: '2019.5.3 18:00', 
    //     endTime: '2019.5.2.19:00'
    //   },
    //   publisher:'suata', 
    //   head:'../../static/jump/social.png', 
    //   title:'大学生心理健康调查', 
    //   detail:'关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', 
    //   command:'在校大学生', 
    //   reward: 10
    // }
    data(){
        return {
            detail: false
        }
    },
    methods:{
        fillIn(id){
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if(!info.log)
                this.$Message.warning('您还未登录，请先登录后填写问卷。')
            else{
                window.sessionStorage.setItem('fillQuesId', id)
                this.$router.push({name: 'filling'})
            }
        }
    },
    mounted(){
    },
    watch:{
        showDetail: function(detail, olddetail) {
            this.detail = true;
        }
    }
}
</script>
<style>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .ivu-modal-content {
        height: 500px!important;
        border-radius: 0!important;
    }
</style>