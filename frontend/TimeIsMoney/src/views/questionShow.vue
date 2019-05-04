<style>
    .upper {
    margin-bottom: 5px;
    float:right;
}
.allQN{
  margin-top: 5px;
  clear:both;

  .info{
    margin-right: 15px;
    margin-bottom: 2px;
  }
  
  .someInfo{
    float:right;
    display: table-cell;
    vertical-align: middle;
    text-align: center;      
  }
}

</style>
<template>
    <div class="qShow">
        <div style="height: 400px; background: white">
            <Button type="info" style="margin-top: 220px; margin-left: 15%" @click="create()">发布问卷</Button>
        </div>
        <div style="margin: 30px 15%">
            <div class="bigupper">
                <div class="upper">
                    <Dropdown style="margin-left: 20px" trigger="click">
                        <Button type="primary">
                            按发布时间排序
                            <Icon type="ios-arrow-down"></Icon>
                        </Button>
                        <DropdownMenu slot="list">
                            <DropdownItem>按发布时间</DropdownItem>
                            <DropdownItem>按热度</DropdownItem>
                            <DropdownItem>按酬金</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div class="allQN">
                <div style="background:#eee;padding: 20px;">
                    <Card :bordered="false" style="padding:23px" v-for="q in quesList">
                        <a href="#" slot="extra">
                            <Icon type="ios-loop-strong"></Icon>
                            未参与
                        </a>
                        <p slot="title" style="font-size:20px">title in here</p>
                        <div class="allupdate">
                            <div class="sum" style="font-size:15px">
                                <span class='info'> 简介:{{q.text}} </span>
                            </div>
                            <div class="someInfo">
                                <span class='info'>发布人:{{q.creator}}</span><span class='info'>薪酬:{{q.price}}</span><span class='info'>参与情况:{{q.attend}}/{{q.total}}</span><span class='info'>截止时间:{{q.endtime}}</span>
                                <Button @click="getDetail(q.id)">查看详情</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        <Modal v-model="detail" width="550px" style="position: relative" :mask-closable="false">
            <p slot="header" style="text-align:center;">{{detailContent.title}}<p>
            <div style="margin: 0 30px">
                <h3 style="margin: 15px 0 5px 0">简介</h3>
                <p style="text-indent: 2em; margin: 5px 0 0 0; ">{{detailContent.text}}</p>
                <h3 style="margin: 15px 0 5px 0">要求</h3>
                <p style="text-indent: 2em; margin: 5px 0 0 0">{{detailContent.command}}</p>
                <h3 style="margin: 15px 0 5px 0">薪酬</h3>
                <p style="text-indent: 2em; margin: 5px 0 0 0">￥{{detailContent.price}}/人</p>
            </div>
            <div slot="footer" style="position: relative; overflow: hidden; margin: 5px 20px 15px 20px">
                <div style="width: 75%; float: left; overflow: hidden; position: relative">
                    <div style="width: 15%; float: left">
                        <img :src='detailContent.head' style="width: 100%; height: 80%"></img>
                        <p style="width:100%; text-align: center; font-weight: 700">{{detailContent.creator}}</p>
                    </div>
                    <div style="width: 80%; float: right; bottom: 0; position: absolute; margin-left: 20%">
                        <Col v-for="(info, index) in detailContent.infos" :key="index" span="12" style="text-align: left; margin: 5px 0">{{index}}:{{info}}</Col>
                    </div>
                </div>
                <div style="width: 20%; float: right; position: absolute; bottom: 0; right: 10px">
                    <Button type="error" size="large" long style="padding: 5px 4px; font-size: 10px">立即填写</Button>
                    <a style="width: 100%; text-align: center; right: 25%; position:relative">点此收藏</a>
                </div>
            </div>
        </Modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { Ques } from '../store/questionnaire/index.js'
export default {
    data() {
        return {
            detail: false  
        }

    },
    computed:mapState( 'Ques', {
        quesList: 'quesList',
        detailContent: 'quesDetail'
    }),
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status)
        },
        create(){
            this.$router.push('createQuestionnaire')
        },
        getDetail(id){
            this.$store.dispatch('Ques/GET_DETAIL', id)
            this.detail = !this.detail
            // console.log(this.detailContent)
        }
    },
    mounted(){
        this.$store.dispatch('Ques/GET_QUESLIST')
    }
}
</script>