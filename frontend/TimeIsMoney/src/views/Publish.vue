<template>
    <div>
        <div style="margin: 0 10%;">
            <h2 style="font-size:40px; margin-top:20px; color:#CE4747;"> 我发布的问卷 </h2>
            <div style="width:100%;margin-top:10px;height:650px;">
                    <div v-for="(ques,index) in publishLists">
                        <div>
                            <span id="dynamicDate" style="font-size:20px;color:red;"> {{ques.Infos.startTime}} </span> <span style="font-size:15px;color:gray;">我发布了</span>
                        </div>
                        <task :data="ques" :key="index" type="1" mode="0" @click.native="getDetail(ques.quesID)"></task>
                    </div>
            </div>
        </div>
        <detail :showDetail="detailModel" :index="index"></detail>
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
    components: {
        task,
        detail
    },
    computed: mapState('Personal', {
        publishLists: 'publishing',
        attendLists: 'attending',
        collectLists: 'starring',
        detailContent: 'quesDetail'
    }),
    data() {
        return {
            detailModel: false,
            index: 0
        }

    },
    methods: {
        getDetail(id) {
            this.$store.dispatch('Ques/GET_DETAIL', id)
            this.detailModel = !this.detailModel
        }
    },
    mounted() {
        this.$store.dispatch('Personal/GET_PUBLISH'); //分发action
    }
}
</script>
<style>
h1 {
    height: 150px;

    img {
        height: 100%;
    }
}

h2 {
    color: #666;
    margin-bottom: 200px;

    p {
        margin: 0 0 50px;
    }
}

.ivu-row-flex {
    height: 100%;
}

.ivu-tabs-content,
.ivu-tabs-content-animated {
    height: 450px;
}

Row {
    margin: 30px;
}

.ivu-tabs-nav-container {
    font-size: 30px !important;
}

.personal .ivu-tabs-nav-container {
    font-size: 22px !important;
}
</style>