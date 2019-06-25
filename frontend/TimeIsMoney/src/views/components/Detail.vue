<template>
    <div>
        <Modal v-model="detail" width="800px" class-name="vertical-center-modal d" :mask-closable="false">
            <img src="./../../../static/ques/detail.png" style="position:relative; float: left; left: -50px; top: -50px; height:500px"></img>
            <p style="font-size:24px; font-weight: 500px;margin-top:15px;">{{detailContent.title}}</p>
            <div style="overflow: hidden; width: 400px; height: 7%; margin-top: 10px">
                <div style="min-width: 200px; max-width: 90%; float:left">
                    <div style="min-width: 100px; max-width: 300px;float:left; margin: 0 10px 10px 0px">
                        <img src="./../../../static/task/publisher.png" style="width:30px;vertical-align: middle"></img>
                        <span style="font-size: 22px; vertical-align: middle;">{{detailContent.publisherName}}</span>
                    </div>
                    <div style="min-width: 100px; max-width: 150px;float:right; margin-bottom: 10px">
                        <img src="./../../../static/task/reward.png" style="width:30px;vertical-align: middle"></img>
                        <span class="hint" style="font-size: 22px; color: #ce4545;vertical-align: middle">{{detailContent.reward}}</span>
                    </div>
                </div>
                <div style="float:right;width: 10%; text-align: right; margin-bottom: 10px">
                    <!-- <span class="hint" >{{detailContent.Infos.endTime}}</span> -->
                    <img :src="isCollect(detailContent.quesID)" style="width:30px" @click="changeCollectStatus(detailContent.quesID)"></img>
                </div>
                <Divider class="detail"></Divider>
            </div>
            <div>
                <h3 style="margin: 0px 0 5px 0">简介</h3>
                <p class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 9%;margin-right:10px;">{{detailContent.detail}}</p>
                <h3 style="margin: 15px 0 5px 0">要求</h3>
                <p class="hint" style="text-indent: 2em; margin: 5px 0 0 0; height: 4%;margin-right:10px;">{{detailContent.command}}</p>
            </div>
            <div style="margin-top: 20px; width: 50%;position: relative; overflow: hidden; float:left; text-align: left; height: 37%">
                <div style="width: 100%; overflow: hidden; position: relative">
                    <div style="width: 100%;margin-top:10px;">
                        <img src="./../../../static/task/quesNum.png" style="width:25px;vertical-align: middle;"></img>
                        <span class="hint">题目数量 {{detailContent.number}}</span>
                    </div>
                    <div style="width: 100%;margin-top:10px;">
                        <img src="./../../../static/task/peopleNum.png" style="width:25px;vertical-align: middle;"></img>
                        <span class="hint">招募人数 {{detailContent.Infos.total}}人 已有{{detailContent.Infos.attend}}人参加</span>
                    </div>
                    <div style="width: 100%;margin-top:10px;">
                        <img src="./../../../static/task/startTime.png" style="width:25px;vertical-align: middle;"></img>
                        <span class="hint">开始时间 {{detailContent.Infos.startTime}}</span>
                    </div>
                    <div style="width: 100%;margin-top:10px;">
                        <img src="./../../../static/task/startTime.png" style="width:25px;vertical-align: middle;"></img>
                        <span class="hint">截止时间 {{detailContent.Infos.endTime}}</span>
                    </div>
                    <div v-if="getStatus(this.detailContent.publisher)" style="width: 100%; text-align: center; margin-top: 20px">
                        <!--    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(detailContent.quesid)">立即填写</Button>-->
                        <Button id="fill" size="large" @click="fillIn(detailContent.quesID)">立即填写</Button>
                    </div>
                    <div v-else style="width: 100%; text-align: center; margin-top: 10px">
                        <!--    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px" @click="fillIn(detailContent.quesid)">立即填写</Button>-->
                        <div>
                            <Button id="check" size="large" @click="checkAns(detailContent.quesID)">查看填写情况</Button>
                        </div>
                        <div style="margin-top:5px;float:middle;">
                            <a id="close" size="large" style="margin-right:15px" @click="closeQues(detailContent.quesID)">关闭问卷</a>
                            <a id="delete" size="large" style="margin-left:15px" @click="deleteQues(detailContent.quesID)">删除问卷</a>
                        </div>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
            <div style="clear:both"></div>
        </Modal>
        <Modal v-model="confirm" @on-ok="deal()" <p>{{info}}</p>
        </Modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../../store/questionnaire/index.js'
export default {
    props: ['showDetail'],
    data() {
        return {
            detail: false,
            own: false,
            confirm: false,
            info: '',
            id: 0,
            type: 0
        }
    },
    methods: {
        fillIn(id) {

            this.detail = false
            let info = JSON.parse(window.sessionStorage.getItem('LogInfo'))
            if (!info.log)
                this.$Message.warning('您还未登录，请先登录后填写问卷。')
            else {
                if (this.attendQuesList.indexOf(id) != -1) {
                    this.$Message.warning('您已填写过此问卷，请勿重复填写')
                } else if (this.detailContent.Infos.total == this.detailContent.Infos.attend) {
                    this.$Message.warning('此问卷名额已满，请选择其他问卷')
                } else {
                    window.sessionStorage.setItem('fillQuesId', id)
                    //console.error('publisher:' + this.detailContent.publisher)
                    window.sessionStorage.setItem('fillQuesUserId', this.detailContent.publisher)
                    this.$router.push({ name: 'filling' })
                }
            }
        },
        checkAns(id) {
            this.detail = false
            window.sessionStorage.setItem('fillQuesId', id)
            window.sessionStorage.setItem('fillQuesTitle', this.detailContent.title)
            this.$router.push({ name: 'checkList', params: { type: 'questionnaire' } })
        },
        setInformation(i, t) {
            if (t == 1) {
                this.info = '关闭问卷将不会回收到该问卷且无法重新开启，确认关闭问卷？（未使用押金会退回到您的账户）'
            } else {
                this.info = '删除问卷将无法到该问卷相关信息，确认删除问卷？（未使用押金会退回到您的账户）'

            }
            this.id = i
            this.type = t
        },
        deal() {
            if (this.t == 1) {
                closeQues(this.id)
            } else {
                deleteQues(this.id)
            }
        },
        closeQues(id) {
            this.detail = false
            let data = {
                id: id,
                index: this.index
            }
            this.$store.dispatch('Ques/CLOSE_QUES', data).then((info) => {
                    this.$Message.success('关闭问卷成功！')
                    this.$emit('refresh', true)
            })

        },
        deleteQues(id) {
            this.detail = false
            let data = {
                id: id,
                index: this.index
            }
            this.$store.dispatch('Ques/DELETE_QUES', data).then((info) => {
                    this.$Message.success('删除问卷成功！')
                    this.$emit('refresh', true)
            })
        },
        isCollect(id) {
            if (this.collectQuesList.indexOf(id) != -1) {
                return './../../../static/task/collectTrue.png'
            } else {
                return './../../../static/task/collectFalse.png'
            }
        },
        changeCollectStatus(id) {
            this.$store.dispatch('Ques/CHANGE_COLLECT', id)
            // this.$store.dispatch('DELETE_CACHE')
        },
        getStatus(id) {
            if (this.detailContent.publisher == JSON.parse(window.sessionStorage.getItem('LogInfo')).userID) {
                return false
            } else {
                return true
            }
        }
    },
    computed: mapState('Ques', {
        collectQuesList: 'collectQuesList',
        attendQuesList: 'attendQuesList',
        detailContent: 'quesDetail'
    }),
    mounted() {
        // console.error(this.key)
    },
    watch: {
        showDetail: function(newdetail, olddetail) {
            this.detail = true;
            //console.error('watch!!!!!!!')
        }
    }
}
</script>
<style>
.vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
    /* height: 520px;
        border-radius: 0; */

    .ivu-modal {
        top: 0;
    }
}

/* .ivu-divider-horizontal{
        margin:0 0;
    } */
.hint {
    color: rgb(178, 178, 178);
    font-size: 14px;
    vertical-align: middle;
}

/* .ivu-divider-horizontal{
        margin: 0!important;
    } */
#fill {
    width: 200px;
    font-size: 18px;
    color: #52bdf0;
    background-color: #fff !important;
    border-color: #52bdf0 !important;
    padding: 5px 15px;
    border-radius: 25px !important;

}

#check {
    width: 250px;
    font-size: 15px;
    color: #52bdf0;
    background-color: #fff !important;
    border-color: #52bdf0 !important;
    padding: 5px 15px;
    border-radius: 25px !important;

}

#fill.ivu-btn:hover {
    color: #fff !important;
    background-color: #52bdf0 !important;
    background: #52bdf0;
    border-color: #52bdf0 !important;
}

.d .ivu-modal .ivu-modal-content .ivu-modal-body {
    padding: 20px !important;
}
</style>