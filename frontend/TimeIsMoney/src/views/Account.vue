<template>
    <div class="myAccount">
        <div style="margin-top:40px;">
            <input v-model="moneycount" type="text" style="margin-left:30px" />
            <Button @click.native="chong">充值</Button>
            <Button @click.native="hua">提现</Button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Personal } from '../store/personal/index.js'
import service from './../util/service.js'

export default {
    data() {
        return {
            moneycount: 0
        }
    },
    computed: mapState('Personal', {
        personDetail: 'personalInfo',
    }),
    methods: {
        chong() {
            alert("冲他这么多： " + this.moneycount);
        },
        hua() {
            alert("我用户【" + this.personDetail.id + "】充他个一个亿！");
        }
    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
    }
}
</script>
<style>
</style>