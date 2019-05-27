<template>
<div >
    <Modal v-model="detail" width="800px" class-name="vertical-center-modal d"  :mask-closable="false">
        <img src="./../../../static/ques/detail.png" style="position:relative; float: left; left: -50px; top: -50px; height:500px"></img>
        <p style="font-size:24px; font-weight: 500px;">{{detailContent.title}}</p>
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
                <span class="hint" >{{detailContent.infos.endtime}}</span>
                <img :src="isCollect(detailContent.quesID)" style="width:30px" @click="changeCollectStatus(detailContent.quesID)"></img>
            </div>
            <Divider class="detail"></Divider>
        </div>
        <div>
            <h3 style="margin: 15px 0 5px 0">简介</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 9%">{{detailContent.detail}}</p>
            <h3 style="margin: 15px 0 5px 0">要求</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 4%">{{detailContent.command}}</p>
        </div>
        <div style="margin-top: 30px; width: 50%;position: relative; overflow: hidden; float:left; text-align: left; height: 37%">
            <div style="width: 100%; overflow: hidden; position: relative">
                <div style="width: 100%;">
                    <img src="./../../../static/task/quesNum.png" style="width:30px"></img>
                    <span  class="hint" >题目数量 {{detailContent.number}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/peopleNum.png" style="width:30px"></img>
                    <span class="hint" >招募人数 {{detailContent.infos.total}}人 已有{{detailContent.infos.attend}}人参加</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/startTime.png" style="width:30px"></img>
                    <span class="hint" >开始时间 {{detailContent.infos.startTime}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/startTime.png" style="width:30px"></img>
                    <span class="hint" >截止时间 {{detailContent.infos.endTime}}</span>
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
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default{
    props:['detailContent', 'showDetail'],
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
        },
        isCollect(id){
            if(this.collectQuesList.indexOf(id) != -1){
                return './../../../static/task/collectTrue.png'
            }
            else{
                return './../../../static/task/collectFalse.png'
            }
        }
    },
    computed:mapState( 'Ques', {
        collectQuesList: 'collectQuesList'
    }),
    mounted(){
        console.log(this.collectQuesList)
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
        /* height: 520px;
        border-radius: 0; */

        .ivu-modal{
            top: 0;
        }
    }
    /* .ivu-divider-horizontal{
        margin:0 0;
    } */
    .hint{
        color: rgb(178,178,178);
        font-size: 14px;
    }
    /* .ivu-divider-horizontal{
        margin: 0!important;
    } */
    .d .ivu-modal .ivu-modal-content{
        height: 520px!important;
        border-radius: 0!important;
    }
    .d .ivu-modal .ivu-modal-content .ivu-modal-body{
        padding: 20px!important;
    }
</style>