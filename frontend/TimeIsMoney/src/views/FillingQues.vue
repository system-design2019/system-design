<template>
    <div style="margin: 20px 15%; min-height: 800px">
        <p style="font-size: 32px; font-weight: 700; text-align: center">{{form.title}}</p>
        <Button @click="test"> fdafdsaf</Button>
        <Divider />
        <Form ref="formFill" :model="answers" :rules="rules" :label-width="80" label-position="top">
            <Card v-for="(q, index) in form.questions" :key="index" style="margin: 5px 0; padding: 30px 10px 10px 10px" >
                <FormItem  :prop="getKey(index)">
                    <p>{{index+1}}. {{q.title}}</p>
                    <Input v-if="q.mode === 1" v-model="answers['answer'+String(index+1)]"></Input>
                    <CheckboxGroup v-else-if="q.mode === 2" v-model="answers['answer'+String(index+1)]">
                        <Checkbox v-for="(c, index_c) in form.questions[index].choices" :label="c" :key="index_c" style="width: 100%;"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Card>
        </Form>
        <div style="text-align: center">
            <Button @click="handleSubmit('formFill')" style="margin: 20px 0">提交</Button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
    export default {
        computed: mapState('Ques/fillQues',{
            form: 'formContent',
            answers: 'answers',
            rules: 'rules'
        }),
        methods:{
            getKey(index){
                return 'answer' + String(index+1)
            },
            test(){
                let data = {
                    fromId: parseInt(JSON.parse(window.sessionStorage.getItem('LogInfo')).userID),
                    fromName: JSON.parse(window.sessionStorage.getItem('LogInfo')).username,
                    toId: parseInt(window.sessionStorage.getItem('fillQuesUserId')),
                    quesTitle: this.form.title,
                    type: 'fill'
                }
                console.error(window.sessionStorage.getItem('LogInfo'))
                this.$store.dispatch('MESSAGE', data).then(
                    (response) => {
                        if(response.success){
                            console.error('111')
                        }
                    })
            },
            handleSubmit(name){
                
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let data = {
                            userid: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                            quesid: window.sessionStorage.getItem('fillQuesId'),
                            number: this.form.questions.length,
                            answer: this.answers
                        }
                        console.log(this.answers)
                        console.log(data)
                        this.$store.dispatch('Ques/fillQues/POST_QUES',data).then(
                            (response) => {
                                if(response.success){
                                    this.$Message.success('提交成功');
                                    let data = {
                                        fromId: parseInt(JSON.parse(window.sessionStorage.getItem('LogInfo')).userID),
                                        fromName: JSON.parse(window.sessionStorage.getItem('LogInfo')).username,
                                        toId: parseInt(window.sessionStorage.getItem('fillQuesUserId')),
                                        quesTitle: this.form.title,
                                        type: 'fill'
                                    }
                                    // this.$store.dispatch('MESSAGE', data).then(
                                    //     (response) => {
                                    //         if(response.success){
                                    //             console.error('111')
                                    //         }
                                    //     })
                                    this.$router.push('/questionnaire')
                                }
                                else{
                                    this.$Message.error(response.msg);
                                }
                            }
                        )
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
                
            }
        },
        created: function(){
            let id = parseInt(window.sessionStorage.getItem('fillQuesId'))
            this.$store.dispatch('Ques/fillQues/SET_FILL_QUES', id)
        }
    }
</script>
<style scoped lang="less">
    
</style>
