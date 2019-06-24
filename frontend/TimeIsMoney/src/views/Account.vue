<template>
    <div class="myAccount">
        <div style="margin-top:40px;">
            <input />
            <Button @click.native="chong">充值</Button>
            <Button @click.native="hua">提现</Button>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Personal } from '../store/personal/index.js'
import { Ques } from '../store/questionnaire/index.js'
import task from './components/Task.vue'
import detail from "./components/Detail.vue"
import service from './../util/service.js'

export default {
    data() {
        return {
            moneycount: 0
        }
    },
    methods: {
        chong() {
            alert("冲他一个亿！");
        },
        hua() {
            alert("提他一个亿！");
        }
    },
    mounted() {

    }
}
</script>
<style>
</style>