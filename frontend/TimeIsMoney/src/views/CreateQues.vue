
<template>
    <div style="margin: 0px 15%;">
        <div style="width: 100%; overflow: hidden; height: 50px; position: relative; margin-top: 20px">
            <div style="width: 5%; float: left">
                <Icon type="ios-arrow-back" size="24" style="float: left; bottom: 5px" @click="alert=!alert"/>
            </div>
            <div style="width: 95%; float: right">
                <Steps :current="currentStep">
                    <Step title="问卷编辑" content="编辑问卷内容"></Step>
                    <Step title="问卷设置" content="设置问卷发布的相关参数"></Step>
                    <Step title="押金支付" content="支付押金"></Step>
                    <Step title="发布成功" content="发布成功"></Step>
                </Steps>
            </div>
        </div>
        <div style="margin-top: 40px;overflow: hidden;">
            <EditQues v-if="showStep(0)" @changeStep="nextStep"></EditQues>
            <SetQues v-else-if="showStep(1)" @changeStep="nextStep"></SetQues>
            <Pay v-else-if="showStep(2)" @changeStep="nextStep"></Pay>
            <Success v-else="showStep(3)"></Success>
        </div>
        
        <Modal
            title="提示"
            v-model="alert"
            :styles="{top: '20px'}"
            >
            <p>此时返回系统不会保存已经填写的内容。确认返回？</p>
            <button @click="back">确认</button>
        </Modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
import SetQues from './createQues/SetQues.vue'
import EditQues from './createQues/EditQues.vue'
import Pay from './createQues/Pay.vue'
import Success from './createQues/Success.vue'
export default {
    data() {
        return {
            alert: false,
            currentStep: 0
        }

    },
    components:{
        SetQues,
        EditQues,
        Pay,
        Success
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    console.log(1)
                    this.$store.dispatch('Ques/createQues/POST_QUESTIONNAIRE', this.formValidate)
                    this.$Message.success('发布成功!');
                    this.$router.push('questionnaire');
                } else {
                    this.$Message.error('发布失败！请完善信息后再次尝试');
                }
            })
        },
        showStep(step){
            if(step === this.currentStep)
                return true
            else
                return false
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        back(){
            this.$store.commit('Ques/createQues/CLEAR')
            this.$router.go(-1)
        },
        nextStep: function(data){
            this.currentStep = this.currentStep + data
        }
    }
}
</script>
<style>
</style>