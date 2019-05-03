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
                    <Card :bordered="false" style="padding:23px" v-for="q in ques">
                        <a href="#" slot="extra">
                            <Icon type="ios-loop-strong"></Icon>
                            未参与
                        </a>
                        <p slot="title" style="font-size:20px">title in here</p>
                        <div class="allupdate">
                            <div class="sum" style="font-size:15px">
                                <span class='info'> 简介:{{q.summary}} </span>
                            </div>
                            <div class="someInfo">
                                <span class='info'>发布人:{{q.author}}</span><span class='info'>薪酬:{{q.pay}}</span><span class='info'>参与情况:{{q.attend}}/{{q.total}}</span><span class='info'>事件:{{q.time}}</span>
                                <Button @click="detail = !detail">查看详情</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
        <Modal v-model="detail" width="550px" style="position: relative" :mask-closable="false">
            <p slot="header" style="text-align:center;">大学生心理健康调查<p>
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
                                <img src='../../static/jump/social.png' style="width: 100%; height: 80%"></img>
                                <p style="width:100%; text-align: center; font-weight: 700">suata</p>
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
export default {
    data() {
        return {
            ques: [{ summary: "songxt TQL", author: "songxt", pay: "￥10", attend: "5", total: "90", time: "2018-4-13", detail: true }],
            detail: false,
            detailContent: {
                infos: { "招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00' },
                title: '大学生心理健康调查',
                text: '关于大学生心理健康的相关调查，目前比较需要男孩子哦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊',
                command: '在校大学生',
                price: 10
            },
            infos: { "招募人数": 90, "填写人数": 5, "发布时间": '2019.5.3 18:00', "截止时间": '2019.5.2.19:00' }
        }

    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status)
        },
        create() {
            this.$router.push('createQuestionnaire')
        }
    }
}
</script>