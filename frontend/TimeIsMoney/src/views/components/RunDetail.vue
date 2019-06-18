<template>
<div >
    <Modal v-model="detail" width="800px" class-name="vertical-center-modal d"  :mask-closable="false">
        <img src="./../../../static/ques/detail.png" style="position:relative; float: left; left: -50px; top: -50px; height:500px"></img>
        <p style="font-size:24px; font-weight: 500px;">{{errandDetail.title}}</p>
        <div style="overflow: hidden; width: 400px; height: 7%;margin-top: 10px">
            <div style="width: 400px; float:left">
                <div style="width: 50%; float:left; margin-bottom: 10px">
                    <img src="./../../../static/task/publisher.png" style="width:30px"></img>
                    <span style="font-size: 22px">{{errandDetail.publisher}}</span>
                </div>
                <div style="width: 50%; float:right; margin-bottom: 10px">
                    <img src="./../../../static/task/reward.png" style="width:30px"></img>
                    <span class="hint" style="font-size: 22px; color: #ce4545">{{errandDetail.reward}}</span>
                </div>
            </div>
            <!-- <div style="float:right;width: 180px; text-align: right; margin-bottom: 10px"> -->
                <!-- <span class="hint" >{{errandDetail.Infos.endTime}}</span> -->
                <!-- <img :src="isCollect(errandDetail.quesID)" style="width:30px" @click="changeCollectStatus(errandDetail.quesID)"></img> -->
            <!-- </div> -->
            <Divider class="detail"></Divider>
        </div>
        <div>
            <h3 style="margin: 15px 0 5px 0">事件</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 9%">{{errandDetail.event}}</p>
            <h3 style="margin: 15px 0 5px 0">需交押金</h3>
            <p  class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 4%">{{errandDetail.deposit}}</p>
        </div>
        <div style="margin-top: 30px; width: 50%;position: relative; overflow: hidden; float:left; text-align: left; height: 37%">
            <div style="width: 100%; overflow: hidden; position: relative">
                <div style="width: 100%;">
                    <img src="./../../../static/task/peopleNum.png" style="width:30px"></img>
                    <span class="hint" >招募人数 {{errandDetail.total}}人 已有{{errandDetail.attend}}人参加</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/startTime.png" style="width:30px"></img>
                    <span class="hint" >时间 {{errandDetail.time}}</span>
                </div>
                <div style="width: 100%;">
                    <img src="./../../../static/task/startTime.png" style="width:30px"></img>
                    <span class="hint" >地点 {{errandDetail.place}}</span>
                </div>
                <div v-if="getStatus(this.errandDetail.publisher)" style="width: 100%; text-align: center; margin-top: 20px">
                <!--    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(errandDetail.quesid)">立即填写</Button>-->
                    <Button id="fill" size="large" @click="attend(errandDetail.quesID)">立即参与</Button>
                </div>
                <div v-else style="width: 100%; text-align: center; margin-top: 20px">
                <!--    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(errandDetail.quesid)">立即填写</Button>-->
                    <div>
                        <Button id="check" size="large" @click="">查看参与情况</Button>
                    </div>
                    <div>
                        <a id="close" size="large" @click="">关闭跑腿</a>
                        <a id="delete" size="large" @click="">删除跑腿</a>
                    </div>
                    
                </div>
                
            </div>
        </div>
        <div style="clear:both"></div>
    </Modal>
</div>
</template>
<script>
import { mapState } from 'vuex'
import { Favor } from '../../store/runFavor/index.js'
export default{
    props:['detail'],
    data(){
        return {
            own: false
        }
    },
    methods:{
        attend(id){
            this.detail = false
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if(!info.log)
                this.$Message.warning('您还未登录，请先登录后参与跑腿。')
            else{
                if(this.errandDetail.Infos.total == this.errandDetail.Infos.attend){
                    this.$Message.warning('此跑腿名额已满，请选择其他跑腿')
                }
                else{
                    /*参与跑腿 */
                }
            }
        },
        /*isCollect(id){
            if(this.collectQuesList.indexOf(id) != -1){
                return './../../../static/task/collectTrue.png'
            }
            else{
                return './../../../static/task/collectFalse.png'
            }
        },
        changeCollectStatus(id){
            this.$store.dispatch('Ques/CHANGE_COLLECT', id)
        },*/
        getStatus(id){
            if(this.errandDetail.publisher == JSON.parse(window.sessionStorage.getItem('LogInfo')).userID){
                return false
            }
            else{
                return true
            }
        }
    },
    computed:mapState( 'Favor', {
        errandDetail: 'errandDetail'
    }),
    mounted(){
        // console.error(this.key)
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
    #fill {
        width: 200px;
        font-size:18px;
        color: #52bdf0;
        background-color: #fff!important;
        border-color: #52bdf0!important;
        padding: 5px 15px;
        border-radius: 25px!important;

    }
    #fill.ivu-btn:hover {
        color: #fff!important;
        background-color: #52bdf0!important;
        background: #52bdf0;
        border-color: #52bdf0!important;
    }
    .d .ivu-modal .ivu-modal-content .ivu-modal-body{
        padding: 20px!important;
    }
</style>