<template>
    <div class="task" style="margin: 20px 0;">
        <card style="padding-left: 10px; border-radius: 15px">
            <img :src="getIconByStatus(contents.id)" style=" position:absolute; right: 0; top:0" width="60px" height="60px" />
            <Row style="margin-top: 20px">
                <span style="font-size: 23px; font-weight: 700;margin:5px;float:left;">{{contents.title}}</span>
            </Row>
            <Row><span style="font-size:15px;margin:5px;float:left;">{{contents.detail}}</span></Row>
            <Row type="flex" style="margin-top: 10px">
                <div style="float: left; width: 70%">
                    <div v-if="ifShow(i)" v-for="(ele, key, i) in contents.info" style="margin-right: 30px;" class="iconInDy vercenter">
                        <img :src="icon[i]" width="30px" height="30px" />
                        <span style="margin-left: 5px; ">{{ele}}</span>
                    </div>
                </div>
                <div style="float: right; width: 30%; text-align: right">
                    <div v-if="i>3" v-for="(ele, key, i) in contents.info" style="margin-right: 30px;float: right" class="iconInDy vercenter">
                        <img :src="icon[i]" width="30px" height="30px" />
                        <span style="margin-left: 5px; ">{{ele}}</span>
                    </div>
                </div>
            </Row>
        </card>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default {
    props: ['data', 'type', 'mode', 'collect'],
    data() {
        return {
            contents: {
                id: 123,
                title: '电子',
                detail: '这里是为了凑格式给上面题目进行的一些解释',
                status: 1,
                total: 100,
                info: { publisher: 'anonymous', type: '问卷', time: '5min', reward: '10', endTime: '2019.5.3', attend: '90' }
            },
            showMode: 0,
            span: [3, 3, 3, 9, 3, 3],
            icon: ['./../../../static/task/publisher.png', './../../../static/task/ques.png', './../../../static/task/time.png', './../../../static/task/reward.png', './../../../static/task/date.png', './../../../static/task/attend.png']
        }
    },
    methods: {
        getIconByStatus(id) {
            if (this.publishQuesList.indexOf(id) != -1) {
                return './../../static/task/reward.png'
            } else if (this.attendQuesList.indexOf(id) != -1) {
                return './../../static/task/run.png'
            } else {
                return './../../static/task/on.png'
            }

        },
        ifShow(i) {
            if (i === 1) {
                if (this.mode === '0')
                    return true
                else
                    return false
            } else if (i < 4) {
                return true
            }
        },
    },
    computed: mapState('Ques', {
        attendQuesList: 'attendQuesList',
        publishQuesList: 'publishQuesList'
    }),
    mounted() {
        console.log("The type of this.data: " + typeof(this.data) + " " + this.data);
        if (typeof(this.data) != 'undefined') {
            this.contents.id = this.data.quesID
            this.contents.title = this.data.title
            this.contents.detail = this.data.detail
            this.contents.status = this.data.status === 'not done' ? 1 : 0
            this.contents.total = this.data.infos.total
            this.contents.info.publisher = this.data.publisher
            this.contents.info.type = this.type === '1' ? '问卷' : '跑腿'
            this.contents.info.time = '0min'
            this.contents.info.reward = this.data.reward
            this.contents.info.endTime = this.data.infos.endTime
            this.contents.info.attend = this.mode === 0 ? String(this.data.infos.total) : String(this.data.infos.attend) + '/' + String(this.data.infos.total)
        }
        // console.log(this.mode)
    }
}
</script>
<style>
.iconInDy {
    float: left;
    margin-top: 10px;
}

.task .ivu-card-body {
    padding-right: 0 !important;
    padding-left: 26px !important;
    padding-top: 0 !important;
    padding-bottom: 16px !important;
}

.vercenter {
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
}
</style>