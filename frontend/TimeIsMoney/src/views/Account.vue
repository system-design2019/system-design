<template>
    <div class="myAccount">
        <div style="margin-top:40px;">
            <input type='text' @input="handleInput" :value="moneycount" placeholder="enter your price" style="margin-left:30px" />
            <Button @click.native="rechargeAsset">充值</Button>
            <Button @click.native="withdrawAsset">提现</Button>
            <input v-model="infos" type="text" style="margin-left:30px" placeholder="enter your price" />
            <Button @click.native="getLog">获取交易记录</Button>
        </div>
        <div id="The log" style="margin-left:30px">
            <span> 用户【{{personDetail.nickname}}】(id:{{personDetail.id}})的交易记录如下: </span>
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
            infos: ""
        }
    },
    computed: mapState('Personal', {
        personDetail: 'personalInfo',
        logs: 'allDeals'
    }),
    methods: {
        rechargeAsset() {
            let paymentAbout = { "userId": this.personDetail.id, "money": this.moneycount, "infos": this.infos, "payType": 0 };
            console.log(paymentAbout);
            this.$store.dispatch("Personal/RECHARGE_ASSET", paymentAbout);
            alert("冲他这么多： " + this.moneycount);
        },
        withdrawAsset() {
            alert("我用户【" + this.personDetail.id + "】充他个一个亿！");
        },
        getLog() {
            this.$store.dispatch('Personal/GET_ASSET');
            alert("获取交易记录");
        },

        handleInput(e) {
            this.moneycount = e.target.value.replace(/[^\d]/g, '');
        }

    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
    }
}
</script>
<style>
</style>