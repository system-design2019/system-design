<template>
    <div style="margin: 20px 9%; ">
        <div style="padding: 10px;background: #f8f8f9">
            <Card style="width: 100%; min-height: 600px">
                <div >
                    <div style="width: 60%; float:left"><p style="margin:10px 0">您有{{getNumber()}}条未读消息</p></div>
                    <div style="width: 40%; float:right; text-align: right; margin:10px 0">
                        <a>全部标记为已读</a>
                        <Divider type="vertical"/>
                        <a>全部删除</a>
                    </div>
                </div>
                <CellGroup style="width: 100%">
                    <Cell class="alert" v-for="(a, index) in alerts" :key="index" :title="a.title" style="width: 100%" @click.native="changeStatus(index)">
                        <div style="float:left; width: 2%">
                            <Badge :status="a.status" style="float: left;" />
                        </div>
                        <div style="float:right; width: 98%">
                            <span style="font-size: 25px; font-weight: 700; float: left; width: 85%">
                                {{a.title}}
                                <span style="padding: 0 20px; color: rgb(174,174,174);font-weight: 100;">{{a.content}}</span>
                            </span>
                            <span style="float:right;width: 10%; text-align: right; margin-right: 20px;color: rgb(174,174,174);">{{a.time}}</span>   
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
            getButtonText(type){
                if(type === 1){
                    return '标为已读'
                }
            },
            changeStatus(index){
                this.$store.commit('Personal/CHANGE_STATUS', index)
            },
            getNumber(){
                let number = 0
                // console.log(this.alerts)
                for(let a in this.alerts){
                    if(this.alerts[a].status === 'error'){
                        number++;
                    }
                }
                return number;
            }
        },
        created(){
            console.log(document.cookie)
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
