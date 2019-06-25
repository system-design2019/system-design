<template>
    <div class="myAccount">
        <div style="margin-top:40px;">
            <input v-model="moneycount" type="text" style="margin-left:30px" />
            <Button @click.native="rechargeAsset">充值</Button>
            <Button @click.native="withdrawAsset">提现</Button>
            <Button @click.native="getLog">获取交易记录</Button>
        </div>
        <div id="The log">
            <span>{{logs}}</span>
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
            moneycount: 0,

        }
    },
    computed: mapState('Personal', {
        personDetail: 'personalInfo',
        logs: 'allDeals'
    }),
    methods: {
        rechargeAsset() {
            alert("冲他这么多： " + this.moneycount);
        },
        withdrawAsset() {
            alert("我用户【" + this.personDetail.id + "】充他个一个亿！");
        },
        getLog() {
            this.$store.dispatch('Personal/GET_ASSET');
            alert("获取交易记录");
        }

    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
    }
}
</script>
<style>
</style>