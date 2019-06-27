<template>
    <div style="width: 100%; text-align: center">
        <!-- <img src="../../../static/pay.png"></img> -->
        <p style="font-size: 20px; margin-top: 20px">你需要支付<span style="font-size: 20px; color: #ce4545">￥{{formValidate.reward*formValidate.quantity}}</span>M币，确认支付？</p>
        <p>支付作为押金及填写酬金，未使用部分可退回</p>
        <Button @click="changeStep(1)">确认支付</Button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
import { Personal } from '../../store/personal/index.js'
export default {
    data() {
        return {

        }

    },
    computed: mapState({
        formValidate: state => state.Ques.createQues.formValidate,
        formContent: state => state.Ques.createQues.formContent,
        personDetail: state => state.Personal.personalInfo
    }),
    methods: {
        changeStep(step) {
            this.$store.dispatch('Personal/GET_INFO').then((res) => {
                let data = {
                    log: JSON.parse(window.sessionStorage.getItem('LogInfo')).log,
                    userID: JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                    username: this.personDetail.nickname,
                    money: this.personDetail.asset
                }
                window.sessionStorage.setItem('LogInfo', JSON.stringify(data))
                //console.error(data)
                let asset = this.personDetail.asset
                if (asset >= this.formValidate.reward * this.formValidate.quantity) {
                    let s = '{"formValidate":' + JSON.stringify(this.formValidate) + ',"formContent":' + JSON.stringify(this.formContent) + '}'
                    //(s)
                    let ques = JSON.parse(s)
                    // //('data')
                    // //(data)
                    this.$store.dispatch('Ques/CREATE_QUES', ques)
                    this.$emit('changeStep', step)
                } else {
                    this.$Message.error('M币不足，请修改后重新发布！')
                }
            })

        }
    }
}
</script>
<style>
</style>