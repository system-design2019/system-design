<template>
<div class="run" style="margin: 20px 0;">
    <card  style=" border-radius: 23px; height: 480px; overflow: hidden">
        <img :src="getStatus(contents.status)" style=" position:absolute; right: 0; top:0" width="100px" height="100px" />
        <img src="./../../../static/run/temp.png" style="width: 100%"></img>
        <Row style="margin-top: 20px; padding-left: 20px">
            <span style="font-size: 23px; font-weight: 700;margin:5px;float:left;">{{contents.title}}</span>
        </Row>
        <Row><span style="font-size:15px;margin:5px;float:left;padding: 0 20px 0 20px;">{{contents.detail}}</span></Row>
        <Row type="flex" style="margin-top: 5px; padding-left: 20px">
            <Col span="12" v-if="ifShow(i)" v-for="(ele, key, i) in contents.info" class="iconInDy" >
                <img :src="icon[i]" width="40px" height="40px" />
                <span style="margin-left: 5px; ">{{ele}}</span>
            </Col>
        </Row>
    </card>
</div>
</template>
<script>
export default{
    props:['data', 'type', 'mode'],
    data(){
        return{
            contents:{
                id: 123, title: '电子',detail: '这里是为了凑格式给上面题目进行的一些解释',status: 1,total: 100,
                info: {publisher: 'anonymous',type:'跑腿',reward: '10',time:'5min',endTime: '2019.5.3'}
            },
            showMode: 0,
            span:[3,3,3,9,3,3],
            icon:['./../../../static/task/publisher.png', './../../../static/task/ques.png','./../../../static/task/reward.png',  './../../../static/task/time.png', './../../../static/task/date.png', './../../../static/task/attend.png']
        }
    },
    methods:{
        getStatus(status){
            if(status === 1){
                return './../../../static/run/on.png'
            }
        },
        ifShow(i){
            if(i === 1){
                // if(this.mode === '1')
                //     return true
                // else
                return false
            }
            else if(i < 5){
                return true
            }
        }
    },
    mounted(){
        if(typeof(this.data) != 'undefined'){
            this.contents.title = this.data.title
            this.contents.detail = this.data.detail
            this.contents.status = this.data.status === 'not done' ? 1 : 0
            this.contents.total = this.data.infos.total
            this.contents.info.publisher = this.data.publisher
            this.contents.info.type = this.type === '1' ? '问卷' : '跑腿'
            this.contents.info.time = '0min'
            this.contents.info.reward = this.data.reward
            this.contents.info.endTime = this.data.infos.endTime
            this.contents.info.attend = this.mode===0 ? String(this.data.infos.total) : String(this.data.infos.attend)+'/'+String(this.data.infos.total)
        }
        // console.log(this.mode)
    }
}
</script>
<style>
    .iconInDy{
        float:left;
        margin-top:10px;
    }
    .run .ivu-card-body {
        padding-right: 0!important;
        padding-left: 0px!important;
        padding-top: 0!important;
        padding-bottom: 16px!important;
    }
</style>