<template>
    <div class="run" style="margin: 20px 0;">
        <card style=" border-radius: 23px; height: 420px; overflow: hidden">
            <img :src="getStatus(contents.status)" style=" position:absolute; right: 0; top:0" width="100px" height="100px" />
            <img src="./../../../static/run/temp.png" style="width: 100%"></img>
            <Row style="margin-top: 15px; padding-left: 15px">
                <p style="font-size: 20px; font-weight: 700;padding:0 0;float:left;" class="oneline">{{contents.title}}</p>
            </Row>
            <Row>
                <p style="font-size:15px;padding:10px 40px;" class="oneline">{{contents.event}}</p>
            </Row>
            <Row type="flex" style="margin-top: 5px; padding-left: 20px">
                <Col span="12" v-for="(ele, key, i) in contents.info" class="iconInDy">
                <img :src="icon[i]" width="40px" height="40px" />
                <span style="margin-left: 5px;" class="oneline">{{ele}}</span>
                </Col>
            </Row>
        </card>
    </div>
</template>
<script>
export default {
    props: ['data', 'type', 'mode'],
    data() {
        return {
            contents: {
                id: 123,
                title: 'chaojichangdepaotuitimu',
                event: '这里是为了凑格式给上面题目进行的一些解释这里是为了凑格式给上面题目进行的一些解释',
                total: 100,
                attend: 100,
                info: { publisher: 'anonymous', reward: '10', time: '时间', place: '地点' }
            },
            showMode: 0,
            span: [3, 3, 3, 9, 3, 3],
            icon: ['./../../../static/task/publisher.png', './../../../static/task/reward.png', './../../../static/task/ques.png', './../../../static/task/time.png', './../../../static/task/date.png', './../../../static/task/attend.png']
        }
    },
    methods: {
        getStatus(status) {
            if (status === 1) {
                return './../../../static/run/on.png'
            }
            return './../../../static/run/on.png'
        }
    },
    mounted() {
        if (typeof(this.data) != 'undefined') {
            this.contents.id = this.data.errandsID
            this.contents.title = this.data.title
            this.contents.event = this.data.event
            this.contents.total = this.data.total
            this.contents.attend = this.data.attend
            this.contents.info.publisher = this.data.publisherName
            this.contents.info.time = this.data.time.split(' ')[0]
            this.contents.info.reward = this.data.reward
            this.contents.info.place = this.data.place
        }
    }
}
</script>
<style>
.iconInDy {
    float: left;
    margin-top: 10px;
}

.run .ivu-card-body {
    padding-right: 0 !important;
    padding-left: 0px !important;
    padding-top: 0 !important;
    padding-bottom: 16px !important;
}

p.oneline {
    width: 95%;
    padding: 0 20px 0 20px;
    overflow: hidden;
    display: inline-block;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}

span.oneline {
    overflow: hidden;
    display: inline-block;
    word-break: keep-all;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>