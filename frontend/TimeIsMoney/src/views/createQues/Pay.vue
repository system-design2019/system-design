<template>
    <div style="width: 100%; text-align: center">
        <img src="../../../static/pay.png"></img>
        <p style="font-size: 20px; margin-top: 20px">扫描二维码并支付<span style="font-size: 20px; color: #ce4545">￥{{formValidate.reward*formValidate.quantity}}</span></p>
        <p>支付作为押金及填写酬金，未使用部分可退回</p>
        <Button @click="changeStep(1)">手动下一步</Button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default {
    data() {
        return {
            
        }

    },
    computed: mapState('Ques/createQues',{
        formValidate: 'formValidate',
        formContent: 'formContent'
    }),
    methods: {
        changeStep(step){
            let data = JSON.parse('{"formValidate":'+JSON.stringify(this.formValidate)+',"formContent":'+JSON.stringify(this.formContent)+'}')
            this.$store.dispatch('Ques/CREATE_QUES', data)
            this.$emit('changeStep', step)
        }
    }
}
</script>
<style>
</style>