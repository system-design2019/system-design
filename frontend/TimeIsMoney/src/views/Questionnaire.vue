<template>
    <div class="qShow">
        <div style="height: 400px">
            <div style="width: 40%; float: left; height:400px; background: #52BDF0">
                <img src="./../../static/ques/create.jpg" style="float: right; height: 250px; margin-top: 75px"></img>
            </div>
            <div id="grad"  style="width: 60%; float: right; height:400px; padding-left: 6%;display: flex;align-items:Center;">
                <div style="min-height: 150px">
                    <p style="width: 100%"><span style="font-size: 32px; color: #fff">问卷调查</span> <span style="font-size: 20px; color: #fff">Questionnaire</span></p>
                    <p style="font-size: 18px; color: #fff; width: 100%">问卷调查，收集意见，随时随地为你提供最丰富的信息！</p>
                    <Button type="info" style="margin-top: 20px; " @click="create()">发布问卷</Button>
                </div>
            </div>
            
        </div>
        <div style="margin: 30px 15%">
            <div style="width: 100%; min-height: 20px;">
                <div style="overflow: hidden">
                    <Dropdown style="margin-left: 20px; float: right;" trigger="click">
                        <Button type="primary">
                            按发布时间排序
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>按发布时间</DropdownItem>
                            <DropdownItem>按热度</DropdownItem>
                            <DropdownItem>按酬金</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div style="width: 100%; ">
                <task></task>
            </div>
        </div>
        <Modal v-model="detail" width="550px" style="position: relative" :mask-closable="false">
            <p slot="header" style="text-align:center;">{{detailContent.title}}<p>
                    <div style="margin: 0 30px">
                        <h3 style="margin: 15px 0 5px 0">简介</h3>
                        <p style="text-indent: 2em; margin: 5px 0 0 0; ">{{detailContent.content}}</p>
                        <h3 style="margin: 15px 0 5px 0">要求</h3>
                        <p style="text-indent: 2em; margin: 5px 0 0 0">{{detailContent.command}}</p>
                        <h3 style="margin: 15px 0 5px 0">薪酬</h3>
                        <p style="text-indent: 2em; margin: 5px 0 0 0">￥{{detailContent.reward}}/人</p>
                    </div>
                    <div slot="footer" style="position: relative; overflow: hidden; margin: 5px 20px 15px 20px">
                        <div style="width: 75%; float: left; overflow: hidden; position: relative">
                            <div style="width: 15%; float: left">
                                <img src='../../static/jump/social.png' style="width: 100%; height: 80%"></img>
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
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
import task from "./components/Task.vue"
export default {
    components:{
        task
    },
    data() {
        return {
            detail: false  
        }

    },
    computed:mapState( 'Ques', {
        quesList: 'quesList',
        detailContent: 'quesDetail'
    }),
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status)
        },
        create() {
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if(info.log)
                this.$router.push({name: 'createQuestionnaire', params: {id: info.userID}})
            else
                this.$Message.warning('您还未登录，请先登录后发布问卷。')
        },
        getDetail(id){
            this.$store.dispatch('Ques/GET_DETAIL', id)
            this.detail = !this.detail
            // console.log(this.detailContent)
        },
        fillIn(id){
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if(!info.log)
                this.$Message.warning('您还未登录，请先登录后填写问卷。')
            else{
                window.sessionStorage.setItem('fillQuesId', id)
                this.$router.push({name: 'filling', params: {id: info.userID}})
            }
        }
    },
    mounted(){
        this.$store.dispatch('Ques/GET_QUESLIST')
    }
}
</script>
<style>
    #grad {
        background: linear-gradient(to right, #52BDF0 , rgb(102,255,255));
    }
    .upper {
    margin-bottom: 5px;
    float:right;

}
.allQN{
  margin-top: 5px;
  clear:both;

  .info{
    margin-right: 15px;
    margin-bottom: 2px;
  }
  
  .someInfo{
    float:right;
    display: table-cell;
    vertical-align: middle;
    text-align: center;      
  }
}

</style>