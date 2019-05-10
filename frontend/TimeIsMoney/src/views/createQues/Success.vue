<template>
    <div style="width: 100%; text-align: center">
        <p style="font-size: 30px; font-weight: 700; margin: 20px 0">发布成功</p>
        <p>3s后自动跳转</p>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default {
    data() {
        return{

        }
    },
    mounted(){
        setTimeout(() => {
            this.$router.push('/questionnaire')
        }, 3000);
    }
}
</script>
<style>
</style>