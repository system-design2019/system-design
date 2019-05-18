<template>
    <div class="qShow">
        <div style="height: 350px">
            <div style="width: 43%; float: left; height:350px; background: #52BDF0">
                <img src="./../../static/ques/create.jpg" style="float: right; height: 300px; margin-top: 25px"></img>
            </div>
            <div id="grad"  style="width: 57%; float: right; height:350px; padding-left: 6%;display: flex;align-items:Center;">
                <div class="showPage" style="min-height: 150px">
                    <p style="width: 100%"><span style="font-size: 33px; font-weight:100; color: #fff">问卷调查</span> <span style="font-size: 20px; font-weight:100;  color: #fff">Questionnaire</span></p>
                    <p style="font-size: 20px; color: #fff; width: 100%;margin-top: 20px; font-weight:100; ">问卷调查，收集意见，随时随地为你提供最丰富的信息！</p>
                    <Button type="info" style="margin-top: 30px; " @click="create()">发布问卷</Button>
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
                <task v-for="ques in quesList" :data="ques" type="1" mode="1" @click.native="getDetail(ques.quesID)"></task>
            </div>
        </div>
        <detail :detailContent="detailContent" v-show="detailModel" :showDetail="detailModel"></detail>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
import task from "./components/Task.vue"
import detail from "./components/Detail.vue"
export default {
    components:{
        task,
        detail
    },
    data() {
        return {
            detailModel: false  
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
                this.$router.push({name: 'createQuestionnaire'})
            else
                this.$Message.warning('您还未登录，请先登录后发布问卷。')
        },
        getDetail(id){
            this.$store.dispatch('Ques/GET_DETAIL', id)
            console.log('aaaa')
            console.log('quesdetail!!'+this.detailContent)
            this.detailModel = !this.detailModel
        },
        
    },
    mounted(){
        this.$store.dispatch('Ques/GET_QUESLIST')
        // this.$store.dispatch('Ques/GET_DETAIL', 3)
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
.showPage {
    .ivu-btn-info {
        color: #fff;
        background-color: rgba(255,255,255,0)!important;
        border-color: #fff!important;
    }
    .ivu-btn-info span{
        font-size: 24px!important;
    }
    .ivu-btn-info:hover {
        color: #2db7f5!important;
        background-color: #2db7f5;
        border-color: #2db7f5!important;
    }
    .ivu-btn{
        border-radius: 30px!important;
        background: rgba(255,255,255,0)!important;
        width: 180px;
        height: 50px;
    }
    .ivu-btn:hover{
        border-radius: 30px!important;
        background: #fff!important;
    }
}

</style>