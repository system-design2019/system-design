<template>
    <div style="width: 100%">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100" >
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" placeholder="输入跑腿任务标题"></Input>
            </FormItem>
            <FormItem label="事件" prop="event">
                <Input v-model="formValidate.event" placeholder="输入跑腿任务具体内容"></Input>
            </FormItem>
            <FormItem label="时间" prop="time">
                <Input v-model="formValidate.time" placeholder="输入跑腿任务标题"></Input>
            </FormItem>
            <FormItem label="地点" prop="place">
                <Input v-model="formValidate.place" placeholder="输入跑腿任务标题"></Input>
            </FormItem>
            <FormItem label="酬金" prop="reward">
                <Input v-model="formValidate.reward" placeholder="输入每份问卷填写报酬"></Input>
            </FormItem>
            <FormItem label="招募数量" prop="quantity">
                <Input v-model="formValidate.quantity" placeholder="输入召集数量"></Input>
            </FormItem>
            <FormItem label="押金" prop="deposit">
                <Input v-model="formValidate.deposit" placeholder="输入本次任务价值"></Input>
            </FormItem>
            <FormItem label="个人信息展示" prop="info">
                <CheckboxGroup v-model="formValidate.info">
                    <Checkbox label="微信"></Checkbox>
                    <Checkbox label="电话"></Checkbox>
                    <Checkbox label="QQ"></Checkbox>
                    <Checkbox label="个性签名"></Checkbox>
                </CheckboxGroup>
            </FormItem>
            <FormItem>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
        <div style="width: 100%; text-align: center; margin-top: 40px">
            <Button @click="changeStep(-1)" style="margin-right:10px">上一步</Button><Button @click="handleSubmit('formValidate')">下一步</Button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Favor } from '../../store/runFavor/index.js'
export default {
    data() {
        return {
            ruleValidate: {
                title: [
                    { required: true, trigger: 'blur' }
                ],
                time: [
                    { required: true, trigger: 'blur' }
                ],
                place: [
                    { required: true, trigger: 'blur' }
                ],
                event: [
                    { required: true, trigger: 'blur' }
                ],
                quantity: [
                    { required: true, trigger: 'blur' },
                    { type: 'number', message: '输入必须为整数', trigger: 'change', transform(value) {return Number(value);}}
                ],
                deposit: [
                    { required: false, trigger: 'blur' },
                    { type: 'number', message: '输入必须为整数', trigger: 'change', transform(value) {return Number(value);}}
                ],
                reward: [
                    { required: true, message: '报酬不能为空', trigger: 'blur' },
                    { type: 'number', message: '输入必须为整数', trigger: 'blur', transform(value) {return Number(value);}}
                ],
                info: [
                    { required: true, type: 'array', min: 1, message: '至少选择显示一个联系方式', trigger: 'change' },
                    { type: 'array', trigger: 'change' }
                ]
                // desc: [
                //     { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                //     { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                // ]
            },
            formValidate: {
                title: '1111',
                time: '',
                place:'',
                event: 0,
                // gender: '',
                quantity: 1,
                info:[],
                deposit: 0
                // desc: ''
            },
        }

    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$store.commit('Ques/createQues/SET_VALIDATE', this.formValidate)
                    this.$emit('changeStep',1)
                } else {
                    this.$Message.error('设置失败！请完善信息后再次尝试');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        changeStep: function(step){
            // console.log()
            this.$emit('changeStep',step)
        }
    }
}
</script>
<style>
</style>