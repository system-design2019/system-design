<template>
<div class="task" style="margin: 20px 0;">
    <card  v-for="(c,index) in contents" :key="index" style="padding-left: 10px; border-radius: 15px">
        <img :src="getStatus(c.status)" style=" position:absolute; right: 0; top:0" width="60px" height="60px" />
        <Row style="margin-top: 20px">
            <span style="font-size: 23px; font-weight: 700;margin:5px;float:left;">{{c.title}}</span>
        </Row>
        <Row><span style="font-size:15px;margin:5px;float:left;">{{c.detail}}</span></Row>
        <Row type="flex" style="margin-top: 10px">
            <div style="float: left; width: 70%">
                <div v-if="i<4" v-for="(ele, key, i) in c.info" style="margin-right: 30px;" class="iconInDy" >
                    <img :src="icon[i]" width="30px" height="30px" />
                    <span style="margin-left: 5px; ">{{ele}}</span>
                </div>
            </div>
            <div style="float: right; width: 30%; text-align: right">
                <div v-if="i>3" v-for="(ele, key, i) in c.info" style="margin-right: 30px;float: right" class="iconInDy" >
                    <img :src="icon[i]" width="30px" height="30px" />
                    <span style="margin-left: 5px; ">{{ele}}</span>
                </div>
            </div>
        </Row>
    </card>
</div>
</template>
<script>
export default{
    data(){
        return{
            contents:[
                {
                title: '电子竞技行业认知度市场调查',detail: '这里是为了凑格式给上面题目进行的一些解释',status: 1,
                info: {publisher: 'songxt',type:'问卷',time:'5min',reward: '10',endTime: '2019.5.3',total: '90'}
                }
            ],
            span:[3,3,3,9,3,3],
            icon:['./../../../static/task/publisher.png', './../../../static/task/ques.png', './../../../static/task/time.png', './../../../static/task/reward.png', './../../../static/task/attend.png', './../../../static/task/date.png']
        }
    },
    methods:{
        getStatus(status){
            if(status === 1){
                return './../../../static/task/on.png'
            }
        }
    }
}
</script>
<style>
    .iconInDy{
        float:left;
        margin-top:10px;
    }
    .task .ivu-card-body {
        padding-right: 0!important;
        padding-left: 26px!important;
        padding-top: 0!important;
        padding-bottom: 16px!important;
    }
</style>