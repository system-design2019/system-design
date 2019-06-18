<template>
    <div style="margin: 20px 9%; ">
        <div style="padding: 10px;background: #f8f8f9">
            <Card style="width: 100%; min-height: 600px">
                <div style="width: 100%; overflow: hidden; height: 50px; position: relative; margin-top: 20px">
                    <div style="width: 5%; float: left">
                        <Icon type="ios-arrow-back" size="24" style="float: left; bottom: 5px" @click="back"/>
                    </div>
                    <div style="width: 95%; float: right">
                        <Breadcrumb>
                            <BreadcrumbItem>参与详情</BreadcrumbItem>
                            <BreadcrumbItem>{{title}}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <!-- {"id":23,"toId":7,"fromId":11,"date":"2019-05-22 19:50:43","hasRead":false,"title":"测试发送通知10","content":"测试发送通知详情10"} -->
                <CellGroup style="width: 100%">
                    <Cell class="alert" v-for="(a, index) in anslist" :key="index" :title="a.title" style="width: 100%" >
                        <span style="font-size: 17px; font-weight: 700; float: left; width: 78%">
                            {{index+1}}
                            <span style="color: rgb(174,174,174);font-weight: 100;padding-left: 10px">{{a.userName}}</span>
                        </span>
                        <div style="float:right;width: 20%; text-align: right; margin-right: 20px;">
                            <span style="float:left;width: 86%; text-align: right;color: rgb(174,174,174);">{{a.createTime}}</span>
                            <div style="float:right;width: 10%; text-align: right;">
                                <a style="text-align: left;color: #ce4545;" @click="checkAnsByUserId(a.userID)">查看答案</a>
                            </div>
                        </div>           
                    </Cell>
                </CellGroup>
            </Card>
        </div>
        <Modal v-model="showAns" fullscreen :title="title">
            <div style="margin: 20px 15%;">
                <p style="font-size: 32px; font-weight: 700; text-align: center">{{form.title}}</p>
                <Divider />
                <Form ref="formFill" :model="answers" :rules="rules" :label-width="80" label-position="top">
                    <Card v-for="(q, index) in form.questions" :key="index" style="margin: 5px 0; padding: 30px 10px 10px 10px" >
                        <FormItem  :label="q.title" :prop="getKey(index)">
                            <Input v-if="q.mode === 1" v-model="answers['answer'+String(index+1)]"></Input>
                            <CheckboxGroup v-else-if="q.mode === 2" v-model="answers['answer'+String(index+1)]">
                                <Checkbox v-for="(c, index_c) in form.questions[index].choices" :label="c" :key="index_c" style="width: 100%;"></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                    </Card>
                </Form>
            </div>
        </Modal>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
    export default {
        data(){
            return{
                title: '烤肉拌饭',
                quesid: 1,
                showAns: false,
            }
        },
        computed: mapState('Ques/checkQues',{
            form: 'formContent',
            answers: 'answers',
            rules: 'rules',
            anslist: 'anslist'
        }),
        methods:{
            getKey(index){
                return 'answer' + String(index+1)
            },
            back(){
                this.$store.commit('Favor/createFavor/CLEAR')
                this.$router.go(-1)
            },
            checkAnsByUserId(userid){
                this.showAns=!this.showAns
                let data = {
                    quesid: this.quesid,
                    userid: userid
                }
                this.$store.dispatch('Ques/checkQues/GET_ANS', data)
            }
        },
        created: function(){
            this.quesid = parseInt(window.sessionStorage.getItem('fillQuesId'))
            this.title = window.sessionStorage.getItem('fillQuesTitle')
            this.$store.dispatch('Ques/checkQues/GET_QUES', this.quesid)
            this.$store.dispatch('Ques/checkQues/GET_ANS_LIST', this.quesid)
            
        }
    }
</script>
<style scoped lang="less">
</style>
