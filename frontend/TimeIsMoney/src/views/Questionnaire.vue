<template>
    <div>
        <div style="height: 350px">
            <div style="width: 43%; float: left; height:350px; background: #52BDF0">
                <img src="./../../static/ques/create.jpg" style="float: right; height: 300px; margin-top: 25px"></img>
            </div>
            <div id="grad" style="width: 57%; float: right; height:350px; padding-left: 6%;display: flex;align-items:Center;">
                <div class="showPage" style="min-height: 150px">
                    <p style="width: 100%"><span style="font-size: 33px; font-weight:100; color: #fff">问卷调查</span> <span style="font-size: 20px; font-weight:100;  color: #fff">Questionnaire</span></p>
                    <p style="font-size: 20px; color: #fff; width: 100%;margin-top: 20px; font-weight:100; ">问卷调查，收集意见，随时随地为你提供最丰富的信息！</p>
                    <Button type="info" style="margin-top: 30px; font-size: 22px" @click="create()">发布问卷</Button>
                </div>
            </div>
        </div>
        <div style="margin: 30px 15%">
            <!--div style="width: 100%; min-height: 20px;">
                <div style="overflow: hidden">
                    <Dropdown style="margin-left: 20px; float: right;" trigger="click">
                        <Button type="primary">
                            按发布时间排序
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem @click.native="sortByCreateTime">按发布时间</DropdownItem>
                            <DropdownItem @click.native="sortByAttend">按热度</DropdownItem>
                            <DropdownItem @click.native="sortByReward">按酬金</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div-->
            <div style="width: 100%; ">
                <task v-for="(ques,index) in currentList" :data="ques" :key="index" type="1" mode="1" @click.native="getDetail(ques.quesID)"></task>
            </div>
        </div>
        <detail :showDetail="detailModel" @refresh="refresh"></detail>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
import task from "./components/Task.vue"
import detail from "./components/Detail.vue"
export default {
    inject: ['reload'],
    components: {
        task,
        detail
    },
    data() {
        return {
            detailModel: false,
            index: 0,
            currentList: this.quesList

        }

    },
    computed: mapState('Ques', {
        quesList: 'quesList',
        detailContent: 'quesDetail',
        /*  需要setter 和 getter
        currentList() {
            return this.currentLists
        }
        */
    }),
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status)
        },
        create() {
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if (info.log)
                this.$router.push({ name: 'createQuestionnaire' })
            else
                this.$Message.warning('您还未登录，请先登录后发布问卷。')
        },
        getDetail(id) {
            this.$store.dispatch('Ques/GET_DETAIL', id)
            this.detailModel = !this.detailModel
        },
        refresh: function(data) {
            if (data) {
                this.reload()
            }
        },
        sortBy1key(ary, key1) {
            return ary.sort(function(a, b) {
                let x = a[key1]
                let y = b[key1]
                return ((x > y) ? -1 : (x < y) ? 1 : 0)
            })
        },
        sortBy2key(ary, key1, key2) {
            return ary.sort(function(a, b) {
                let x = a[key1][key2]
                let y = b[key1][key2]
                return ((x < y) ? -1 : (x > y) ? 1 : 0)
            })
        },
        sortByCreateTime() {
            //alert("Hi");
            console.log(this.quesList)
            this.currentList = this.sortBy2key(this.quesList, 'Infos', 'createTime')
            console.log(this.currentList)
            //this.$forceUpdate()
        },
        compare(property) {
            return function(obj1, obj2) {
                var value1 = obj1[property];
                var value2 = obj2[property];
                return (value2 - value1)
            }
        },
        sortByReward() {
            //alert("Hi");
            this.currentList.sort(this.compare('reward'))
            //this.currentList = this.sortBy1key(this.quesList, 'reward')
            console.log(this.currentList[0].reward)
        },
        sortByHeat() {
            this.currentList = this.sortBy2key(this.quesList, 'Infos', 'attend') //后面可以考虑用attend/total作为比较直 暂时没有时间写
        }
    },
    mounted() {
        // this.$store.dispatch('DELETE_CACHE').then((info) => {
            this.$store.dispatch('Ques/GET_QUESLIST')
            if(JSON.parse(window.sessionStorage.getItem('LogInfo')).log){
                this.$store.dispatch('Ques/GET_COLLECT_QUESLIST')
                this.$store.dispatch('Ques/GET_ATTEND_QUESLIST')
                this.$store.dispatch('Ques/GET_PUBLISH_QUESLIST')
            }
            
            var _this = this;
            setTimeout(function() {
                _this.currentList = _this.quesList
                // _this.currentList = _this.quesList.sort(_this.compare('reward'))
            }, 1000)
        // })
        
    }
}
</script>
<style scoped>
#grad {
    background: linear-gradient(to right, #52BDF0, rgb(102, 255, 255));
}

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
        font-size: 24px !important;
    }

    .ivu-btn-info:hover {
        color: #2db7f5 !important;
        background-color: #2db7f5;
        border-color: #2db7f5 !important;
    }

    .ivu-btn {
        border-radius: 30px !important;
        background: rgba(255, 255, 255, 0) !important;
        width: 180px;
        height: 50px;
    }

    .ivu-btn:hover {
        border-radius: 30px !important;
        background: #fff !important;
    }
}
</style>