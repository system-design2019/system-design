<template>
    <div style="width: 100%">
        <div style="overflow:hidden">  
            <div style="float: left; width: 10%; position: relative； border: 2px">
                <Button style="margin-bottom: 10px" @click="addQues(1)">+填空题</Button>
                <Button @click="addQues(2)">+选择题</Button>
            </div>
            <div style="float: right; width: 90%">
                <div style="float: left; width: 70%; position: relative; border: 2px #000000;">
                    <Input v-model="title" placeholder="问卷标题" style="font-size: 28px; height: 40px; width: 100%"/>
                    <Divider />
                    <div>
                        <Card v-for="(q, index) in questions" :key="index" style="margin: 5px 0" @click.native="curr=index">
                            <span v-show="q.fill" style="color: #ce4545">* </span><span style="margin: 5px 5px 10px 0">{{index+1}}.{{q.title}}</span>
                            <div v-if="q.mode === 1"><Input></Input></div>
                            <div v-else><Checkbox v-for="(c,index) in q.choices" style="width: 100%; margin: 5px 0">{{c}}</Checkbox></div>
                        </Card>
                    </div>
                </div>
                <div style="float: left; width: 30%; position: relative; padding: 0 1%">
                    <Card>
                        <p>类型：{{getMode(questions[curr].mode)}}</p><Divider />
                        <p>标题</p><Input v-model="questions[curr].title"></Input><Divider />
                        <div v-if="questions[curr].mode === 2" >
                            <div v-for="(op,index) in questions[curr].choices" style="margin: 15px 0">
                                <span>选项{{index+1}}:</span><Input v-model="questions[curr].choices[index]"></Input>
                            </div>
                            <Button @click="addOption()">添加选项</Button>
                            <Button @click="deleteOption()">移除选项</Button>
                            <div style="margin-top: 10px">
                                <span>最多可选：</span><InputNumber :max="questions[curr].choices.length" :min="1" v-model="questions[curr].maxchoose"></InputNumber>
                                <Button @click="changeOrder()">确定</Button>
                            </div>
                            <Divider/>
                        </div>
                        <div>
                            <span>修改顺序：</span><InputNumber :max="questions.length" :min="1" v-model="pos"></InputNumber>
                            <Button @click="changeOrder()">确定</Button><Divider />
                        </div>
                        <div>
                            <span>必填：</span><Switch v-model="questions[curr].fill"/><Divider />
                        </div>
                        <div>
                            <Button @click="deleteQues()">删除此问题</Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div> 
        <div style="width: 100%; text-align: center; margin-top: 20px">
            <Button @click="goahead()">下一步</Button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default {
    data() {
        return {
            title: '',
            curr: 0,
            pos: 0,
            // questions:[{mode: 1, order: 1, title:'试试', fill:false}]
        }
    },
    computed:mapState('Ques/createQues', {
        formContent: 'formContent',
        questions: 'questions'
    }),
    mounted(){
    },
    methods: {
        addQues(mode){
            let trans = parseInt(mode);
            let title = '题目'+ String(this.questions.length+1);
            if(mode === 1){
                let data = {
                    mode: trans,
                    order: 0,
                    title: title,
                    fill: false
                };
                this.questions.push(data);
            }
            else {
                let data = {
                    mode: trans,
                    order: 0,
                    title: title,
                    maxchoose:1,
                    choices:['选项1', '选项2'],
                    fill:false
                };
                this.questions.push(data);
            }            
        },
        getMode(mode){
            if(mode === 1)
                return '填空题'
            else
                return '选择题'
        },
        addOption(){
            let op = '选项' + String(this.questions[this.curr].choices.length+1)
            this.questions[this.curr].choices.push(op)
        },
        deleteOption(){
            if(this.questions[this.curr].choices.length > 2)
                this.questions[this.curr].choices.pop()
            else{
                this.$Message.info('已经无法删除选项了~');
            }
        },
        changeOrder(){
            let temp = this.questions[this.curr]
            let t = this.curr
            this.curr = this.pos-1
            this.questions.splice(t,1)
            if(this.pos === 1){
                this.questions.unshift(temp)
            }
            else if(this.pos === this.questions.length+1){
                this.questions.push(temp)
            }
            else{
                let i = this.questions.length
                while(i != this.pos-1){
                    this.questions[i] = this.questions[i-1]
                    i--
                }
                this.questions[i] = temp
            }
        },
        deleteQues(){
            let temp = this.curr
            this.curr = 0
            this.questions.splice(temp,1)
        },
        goahead: function(){
           
           var data = {
                title: this.title,
                number: this.questions.length,
                fillings:[],
                chooses: []
            }
             for(var i = 0; i < this.questions.length; ++i){
                this.questions[i].order = i+1
                if(this.questions[i].mode === 1){
                    data.fillings.push(this.questions[i])
                }
                else if(this.questions[i].mode === 2){
                    data.chooses.push(this.questions[i])
                }
            }
            this.$store.commit('Ques/createQues/SET_CONTENT', data)
            // console.log('data'+JSON.stringify(data))
            this.$emit('changeStep', 1)
        }
    },
}
</script>
<style>
</style>