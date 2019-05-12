<template>
<div >
    <Modal v-model="detail"  width="800px" class-name="vertical-center-modal d"   :mask-closable="false">
        <img src="./../../../static/ques/detail.png" style="position:relative; float: left; left: -50px; top: -50px; height:500px"></img>
        <p style="font-size:24px; font-weight: 500px; margin: 20px 0 10px 0">{{detailContent.title}}</p>
        <div style="overflow: hidden; width: 400px; height: 7%">
            <div style="width: 200px; float:left">
                <div style="width: 100px; float:left; margin-bottom: 10px">
                    <img src="./../../../static/task/publisher.png" style="width:30px"></img>
                    <span style="font-size: 22px">{{detailContent.publisher}}</span>
                </div>
                <div style="width: 100px; float:right; margin-bottom: 10px">
                    <img src="./../../../static/task/reward.png" style="width:30px"></img>
                    <span class="hint" style="font-size: 22px; color: #ce4545">{{detailContent.reward}}</span>
                </div>
            </div>
            <div style="float:right;width: 180px; text-align: right; margin-bottom: 10px">
                <span class="hint" >{{detailContent.endTime}}</span>
                <img src="./../../../static/task/collect.png" style="width:30px"></img>
            </div>
            <Divider class="detail"></Divider>
        </div>
        <div>
            <h3 style="margin: 15px 0 5px 0">简介</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 9%">{{detailContent.detail}}</p>
            <h3 style="margin: 15px 0 5px 0">要求</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 4%">{{detailContent.command}}</p>
        </div>
        

        <div slot="footer" style=" width: 50%;position: relative; overflow: hidden; float:left; text-align: left; height: 37%">
            <div style="width: 100%; overflow: hidden; position: relative">
                <div style="width: 100%;">
                    <img src="./../../../static/task/collect.png" style="width:30px"></img>
                    <span  class="hint" >题目数量 {{detailContent.number}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/collect.png" style="width:30px"></img>
                    <span class="hint" >参与情况 {{detailContent.attend}}/{{detailContent.total}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/collect.png" style="width:30px"></img>
                    <span class="hint" >开始时间 {{detailContent.startTime}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/collect.png" style="width:30px"></img>
                    <span class="hint" >截止时间 {{detailContent.endTime}}</span>
                </div>
                <div style="width: 100%; text-align: center; margin-top: 20px">
                    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(detailContent.quesid)">立即填写</Button>
                </div>
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
<style scoped>
    .vertical-center-modal{
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal{
            top: 0;
        }
    }
    .ivu-modal-content{
        height: 520px!important;
        border-radius: 0!important;
    }
    .ivu-divider-horizontal{
        margin:0 0;
    }
    .hint{
        color: rgb(178,178,178);
        font-size: 14px;
    }
    .ivu-divider-horizontal{
        margin: 0!important;
    }
</style>