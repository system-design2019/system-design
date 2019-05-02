<style scoped lang="less">
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div style="margin: 20px 15%; ">
        <div style="overflow: hidden"><Button style="width: 8%; margin-right: 10px; float: right">全部删除</Button></div>
        <Card v-for="(a, index) in alerts" :key="index" style="margin: 10px 10px; padding: 0 30px;" >
            <Row style="width: 100%;">
                <span style="font-size: 15px; font-weight: 700">{{a.title}}</span>
                <Badge :status="getStatus(a.status)" style="float: right" />
            </Row>
            <Row style="width: 100%; font-size: 13px; margin: 5px 0"><p style="margin-left: 2em;">{{a.content}}</p></Row>
            <Row style="width: 100%; margin: 3px 0; position: ralative">
                <Button style="float: right; position: relative; bottom: 0" @click="changeStatus(index)">{{getButtonText(a.type)}}</Button>
                <span style="position: absolute; bottom: 5%; right: 10%">时间：{{a.time}}</span>                
            </Row>
        </Card>
        
    </div>
</template>
<script>
    export default {
        data(){
            return{
                alerts:[
                    {title:'您的问卷有人参与填写！', content:'您的ID为27018的问卷已被填写，当前已收集5份，待收集85份', type: 1, time:'2019.5.2 16:00', status: 0},
                    {title:'标题', content:'详情', type: 1, time:'2019.5.2 16:00', status: 1}
                ],
                
            }
        },
        methods: {
            handleStart () {   
                this.$router.push({  //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                    path:'/index'
                })
            },
            getButtonText(type){
                if(type === 1){
                    return '标为已读'
                }
            },
            getStatus(status){
                if(status === 1)
                    return 'default'
                else
                    return 'error'
            },
            changeStatus(index){
                this.alerts[index].status = 1
            }
        }
    }
</script>
