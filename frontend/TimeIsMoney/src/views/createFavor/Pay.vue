<template>
    <div style="width: 100%; text-align: center">
        <img src="../../../static/pay.png"></img>
        <p style="font-size: 20px; margin-top: 20px">扫描二维码并支付<span style="font-size: 20px; color: #ce4545">￥{{formContent.reward*formContent.quantity}}</span></p>
        <p>支付作为押金及填写酬金，未使用部分可退回</p>
        <Button @click="changeStep(1)">手动下一步</Button>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Favor } from '../../store/runFavor/index.js'
export default {
    data() {
        return {
            
        }

    },
    computed: mapState('Favor/createFavor',{
        formContent: 'favorContent'
    }),
    methods: {
        changeStep(step){
            var time = new Date(this.formContent.date).toLocaleDateString().replace(/\//g, '-')+" "+this.formContent.time;
            let data = {
                title: this.formContent.title,
                time: time,
                place:this.formContent.place,
                event:this.formContent.event,
                publisher:JSON.parse(window.sessionStorage.getItem('LogInfo')).userID,
                reward:this.formContent.reward,
                deposit:this.formContent.deposit,
                total:this.formContent.quantity
            }
            this.$store.dispatch('Favor/CREATE_FAVOR', data).then((info)=>{
                if(info){
                    this.$emit('changeStep', step)
                }
                else{
                    this.$Message.error('错误')
                }
            })
            
        }
    }
}
</script>
<style>
</style>