<template>
    <div class="myAccount">
        <div id="popLayer" style="display: none;background-color: #B3B3B3; position: absolute; height: 100%; width: 100%; z-index: 10; -moz-opacity: 0.8; opacity:.80;"></div>
        <div style="height: 320px">
            <div style="width: 43%; float: left; height:320px; background: #fc4a1a">
                <img src="../images/coins.png" style="float: right; height: 300px; margin-top: 25px"></img>
            </div>
            <div id="gra" style="width: 57%; float: right; height:320px; padding-left: 6%;display: flex;align-items:Center;">
                <div class="showPage" style="min-height: 150px">
                    <p style="width: 100%"><span style="font-size: 33px; font-weight:100; color: #fff">我的M币</span> <span style="font-size: 20px; font-weight:100;  color: #fff">My Coins</span></p>
                    <p style="font-size: 20px; color: #fff; width: 100%;margin-top: 20px; font-weight:100; ">1元=100M币，充值大优惠！</p>
                    <Button type="info" style="margin-top: 30px; margin-right:20px; font-size: 20px" @click.native="popBoxRe">充值</Button>
                    <Button type="info" style="margin-top: 30px; font-size: 20px" @click.native="popBoxWd">提现</Button>
                </div>
            </div>
        </div>
        <card style="width:60%; margin:auto; margin-top:20px;">
            <div style="width:80%; margin:auto;">
                <span style="font-size:15px; margin-top:20px; vertical-align:middle;">我的余额: </span>
                <span style="color:#ce4545; vertical-align:middle;">{{personDetail.asset}}</span>
                <CellGroup>
                    <Cell class="history" v-for="(a, index) in logs" :key="index" :title="a.info" style="width: 100%; margin-top:10px;">
                        <div style="width: 100%; margin:auto;">
                            <img :src="getSrcByInfo(a.info)" style="height: 40px; float:left;margin-right:30px; vertical-align:middle;" />
                            <span style=" float: left; width: 60%;vertical-align:middle;">
                                {{a.info}}
                                <span style="color: #ce4545; font-weight: 100; margin-left:10px;">{{a.money}}</span>
                            </span>
                            <span style="text-align: right; color: rgb(174,174,174); vertical-align:middle;">{{a.date}}</span>
                        </div>
                    </Cell>
                </CellGroup>
            </div>
        </card>
        <div id="popRe" style="display:none; position:fixed; top:50%; left:50%; transform:translateX(-50%) translateY(-50%); z-index:20;">
            <card style="width: 500px; height: 100px;">
                <span style="color:#ce4545;">请输入需要充值的M币数（1RMB = 100M币）： </span>
                <input type='text' @input="handleInput" :value="moneycount" style="margin-left:30px; margin-top:10px;" />
                <Button @click.native="rechargeAsset">充值</Button>
                <Button @click.native="closeBoxRe">取消</Button>
            </card>
        </div>
        <div id="popWd" style="display:none; position:fixed; top:50%; left:50%; transform:translateX(-50%) translateY(-50%); z-index:20;">
            <card style="width: 500px; height: 100px;">
                <span style="color:#ce4545;">请输入需要提现的M币数（1RMB = 100M币）： </span>
                <input type='text' @input="handleInput" :value="moneycount" style="margin-left:30px; margin-top:10px;" />
                <Button @click.native="withdrawAsset">提现</Button>
                <Button @click.native="closeBoxWd">取消</Button>
            </card>
        </div>
    </div>
    <!--    <div style="margin-top:40px;">
            <input type='text' @input="handleInput" :value="moneycount" placeholder="输入需要提现/充值的闲钱币数（1RMB = 100闲钱币）" style="margin-left:30px" />
            <Button @click.native="rechargeAsset">充值</Button>
            <Button @click.native="withdrawAsset">提现</Button>
            <input v-model="infos" type="text" style="margin-left:30px" placeholder="输入备注" />
            <Button @click.native="getLog">获取交易记录</Button>
        </div>
        <div id="The log" style="margin-left:30px">
            <span> 用户【{{personDetail.nickname}}】(id:{{personDetail.id}})的交易记录如下: </span>
            <span>{{logs}}</span>
        </div>
    </div>-->
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
            //(paymentAbout);
            this.$store.dispatch("Personal/RECHARGE_ASSET", paymentAbout);
            alert("冲他这么多： " + this.moneycount);
        },
        withdrawAsset() {
            let moneyOut = this.moneycount * (-1)
            let paymentAbout = { "userId": this.personDetail.id, "money": moneyOut, "infos": this.infos };
            //(paymentAbout);
            this.$store.dispatch("Personal/WITHDRAW_ASSET", paymentAbout);
            alert("我用户【" + this.personDetail.id + "】提他个一个亿！");
        },
        getLog() {
            this.$store.dispatch('Personal/GET_ASSET');
            alert("获取交易记录");
        },

        handleInput(e) {
            this.moneycount = e.target.value.replace(/[^\d]/g, '');
        },
        getSrcByInfo(Info) {
            if (Info === '充值: ') {
                return './../../static/充值.png'
            } else if (Info == '提现: ') {
                return './../../static/提现.png'
            } else {
                return './../../static/其他.png'
            }
        },
        popBoxRe() {
            var popBoxRe = document.getElementById("popRe");
            var popLayer = document.getElementById("popLayer");
            popRe.style.display = "block";
            popLayer.style.display = "block";
        },
        closeBoxRe() {
            var popBoxRe = document.getElementById("popRe");
            var popLayer = document.getElementById("popLayer");
            popRe.style.display = "none";
            popLayer.style.display = "none";
        },
        popBoxWd() {
            var popBoxWd = document.getElementById("popWd");
            var popLayer = document.getElementById("popLayer");
            popWd.style.display = "block";
            popLayer.style.display = "block";
        },
        closeBoxWd() {
            var popBoxWd = document.getElementById("popWd");
            var popLayer = document.getElementById("popLayer");
            popWd.style.display = "none";
            popLayer.style.display = "none";
        },

    },
    mounted() {
        this.$store.dispatch('Personal/GET_INFO'); //分发action
        this.$store.dispatch('Personal/GET_ASSET');
    }
}
</script>
<style>
#gra {
    background: linear-gradient(to right, #fc4a1a, #f7b733);
}

#popLayer {}

.upper {
    margin-bottom: 5px;
    float: right;

}

.allQN {
    margin-top: 5px;
    clear: both;

    .info {
        margin-right: 15px;
        margin-bottom: 2px;

    }

    .someInfo {
        float: right;
        display: table-cell;
        vertical-align: middle;
        text-align: center;
    }
}

.showPage {
    .ivu-btn-info {
        color: #fff;
        background-color: rgba(255, 255, 255, 0) !important;
        border-color: #fff !important;
    }

    .ivu-btn-info span {
        font-size: 20px !important;
    }

    .ivu-btn-info:hover {
        color: #fc5c7d !important;
        background-color: #fc5c7d;
        border-color: #fc5c7d !important;
    }

    .ivu-btn {
        border-radius: 30px !important;
        background: rgba(255, 255, 255, 0) !important;
        width: 150px;
        height: 40px;
    }

    .ivu-btn:hover {
        border-radius: 30px !important;
        background: #fff !important;
    }
}
</style>