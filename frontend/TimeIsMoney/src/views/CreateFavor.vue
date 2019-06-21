
<template>
    <div style="margin: 0px 15%;">
        <div style="width: 100%; overflow: hidden; height: 50px; position: relative; margin-top: 20px">
            <div style="width: 5%; float: left">
                <Icon type="ios-arrow-back" size="24" style="float: left; bottom: 5px" @click="alert=!alert"/>
            </div>
            <div style="width: 95%; float: right">
                <Steps :current="currentStep">
                    <Step title="跑腿设置" content="设置问卷发布的相关参数"></Step>
                    <Step title="押金支付" content="支付押金"></Step>
                    <Step title="发布成功" content="发布成功"></Step>
                </Steps>
            </div>
        </div>
        <div style="margin-top: 40px;overflow: hidden;">
            <SetFavor v-if="showStep(0)" @changeStep="nextStep"></SetFavor>
            <Pay v-else-if="showStep(1)" @changeStep="nextStep"></Pay>
            <Success v-else="showStep(2)"></Success>
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
import { Favor } from '../store/runFavor/index.js'
import SetFavor from './createFavor/SetFavor.vue'
import Pay from './createFavor/Pay.vue'
import Success from './createFavor/Success.vue'
export default {
    data() {
        return {
            alert: false,
            currentStep: 0
        }
    },
    components:{
        SetFavor,
        Pay,
        Success
    },
    methods: {
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
            this.alert = false
            this.$store.commit('Favor/createFavor/CLEAR')
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