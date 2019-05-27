<template>
    <div style="margin: 20px 9%; ">
        <div style="padding: 10px;background: #f8f8f9">
            <Card style="width: 100%; min-height: 600px">
                <div >
                    <div style="width: 60%; float:left"><p style="margin:10px 0">您有{{getNumber()}}条未读消息</p></div>
                    <div style="width: 40%; float:right; text-align: right; margin:10px 0">
                        <a @click="changeAllStatus()">全部标记为已读</a>
                        <Divider type="vertical"/>
                        <a>全部删除</a>
                    </div>
                </div>
                <!-- {"id":23,"toId":7,"fromId":11,"date":"2019-05-22 19:50:43","hasRead":false,"title":"测试发送通知10","content":"测试发送通知详情10"} -->
                <CellGroup style="width: 100%">
                    <Cell class="alert" v-for="(a, index) in alerts" :key="index" :title="a.title" style="width: 100%" >
                        <div style="float:left; width: 2%">
                            <Badge :status="getStatus(a.hasRead)" style="float: left;" />
                        </div>
                        <div style="float:right; width: 98%">
                            <span style="font-size: 17px; font-weight: 700; float: left; width: 78%">
                                {{a.title}}
                                <span style="color: rgb(174,174,174);font-weight: 100;">{{a.content}}</span>
                            </span>
                            <div style="float:right;width: 20%; text-align: right; margin-right: 20px;">
                                <span style="float:left;width: 65%; text-align: left;color: rgb(174,174,174);">{{a.date}}</span>
                                <div style="float:right;width: 35%; text-align: right;">
                                    <a style="float:left;width: 40%; text-align: left;color: #ce4545;" @click="deleteAlert(index)">删除</a>
                                    <a style="float:right;width: 60%; text-align: right;color: #ce4545;" @click="changeStatus(index)">{{getAction(a.hasRead)}}</a>
                                </div>
                            </div>
                        </div>               
                    </Cell>
                </CellGroup>
            </Card>
        </div>
        
    </div>
</template>
<script>
import {mapState} from 'vuex'
    export default {
        data(){
            return{
            }
        },
        computed:mapState('Personal', {
            alerts: 'mailReceive'
        }),
        methods: {
            handleStart () {   
                this.$router.push({  //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                    path:'/index'
                })
            },
            getAction(status){
                if(status){
                    return '标为未读'
                }
                else{
                    return '标为已读'
                }
            },
            getButtonText(type){
                if(type === 1){
                    return '标为已读'
                }
            },
            changeStatus(index){
                this.$store.dispatch('Personal/CHANGE_STATUS', index)
            },
            getNumber(){
                let number = 0
                // console.log(this.alerts)
                for(let a in this.alerts){
                    if(!this.alerts[a].hasRead){
                        number++;
                    }
                }
                return number;
            },
            changeAllStatus(){
                this.store.dispatch('Personal/')
            },
            getStatus(status){
                if(status)
                    return 'default'
                else{
                    return 'error'
                }
            },
            deleteAlert(index){
                this.$store.dispatch('Personal/DELETE_ALERT', index)
            }
        },
        created(){
            this.$store.dispatch('Personal/GET_ALERTS')
        }
    }
</script>
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
    .alert .ivu-cell-link .ivu-cell-item .ivu-cell-main{
        display: inherit!important;
        width: 100%
    }
</style>
