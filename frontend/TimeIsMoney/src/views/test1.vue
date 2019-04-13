<style>
    .upper {
    margin-bottom: 5px;
    float:right;
}
.allQN{
  margin-top: 5px;
  clear:both;

  span{
    margin-right:15px;
    margin-bottom: 2px;
  }
  
  .someInfo{
    float:right;
    margin:5px;
  }
  

}

</style>
<template>
    <div class="qShow">
        <div class="bigupper">
            <div class="upper">
                <Dropdown style="margin-left: 20px">
                    <Button type="primary">
                        筛选顺序
                        <Icon type="ios-arrow-down"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem>按发布时间</DropdownItem>
                        <DropdownItem>按热度</DropdownItem>
                        <DropdownItem>按酬金</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                <Button type="primary">
                    发布问卷
                </Button>
            </div>
        </div>
        <div class="allQN" style="background:#eee;height:400px;">
            <Scroll :height="380">
                <div>
                    <Row :xs="13" :sm="10" :md="10" :lg="7" v-for="allNaire in allNaires" :key="allNaire.id" style="margin-bottom:5px;">
                        <Card style="padding:23px" v-bind="allNaire">
                            <a href="#" slot="extra">
                                <Icon type="ios-loop-strong"></Icon>
                                <span>{{allNaire.myState}}</span>
                            </a>
                            <p slot="title" style="font-size:20px">title in here</p>
                            <div class="allupdate">
                                <div class="sum" style="font-size:15px">
                                    <span> 简介:{{allNaire.summary}} </span>
                                </div>
                                <div class="someInfo">
                                    <span>发布人:{{allNaire.author}}</span><span>薪酬:{{allNaire.pay}}</span><span>参与情况:{{allNaire.attend}}</span><span>事件:{{allNaire.time}}</span>
                                    <Button type="primary" style="float:right;" @click="showDetail">查看详情</Button>
                                </div>
                            </div>
                        </Card>
                    </Row>
                </div>
            </Scroll>
        </div>
        <Modal v-model="qDetail" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>问卷详情</span>
            </p>
            <div style="text-align:center">
                <p>这里需要显示问卷的详细信息.</p>
            </div>
            <div class="allButton">
            </div>
            <div slot="footer">
                <Button id="askOnline" size="small">在线咨询</Button>
                <Button id="writeNow" size="small" @click='goQD'>立即填写</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
//v-for中使用item作为key，会报warning，原因如下:
//这里的[Vue warn]是指不要用对象或是数组作为key，用string或value作为key
//你这里很明显item是对象，:key相当于是索引的作用，提高循环性能，如果循环量较小，不写也可以的

export default {
    data() {
        return {
            qDetail: false,
            summary: "songxt TQL",
            author: "songxt",
            pay: "￥100",
            attend: "5/90",
            time: "2018-4-13",
            myState: "未参与",
            'allNaires': [{
                    'id': 1,
                    'summary': "songxt TQL",
                    'author': "songxt",
                    'pay': "￥100",
                    'attend': "5/90",
                    'time': "2018-4-13",
                    'myState': "未参与"
                },
                {
                    'id': 2,
                    'summary': "songxt TQL",
                    'author': "songxt",
                    'pay': "￥100",
                    'attend': "5/90",
                    'time': "2018-4-13",
                    'myState': "未参与"
                },
                {
                    'id': 3,
                    'summary': "songxt TQL",
                    'author': "songxt",
                    'pay': "￥100",
                    'attend': "5/90",
                    'time': "2018-4-13",
                    'myState': "未参与"
                },
                {
                    'id': 4,
                    'summary': "songxt TQL",
                    'author': "songxt",
                    'pay': "￥100",
                    'attend': "5/90",
                    'time': "2018-4-13",
                    'myState': "未参与"
                },
                {
                    'id': 5,
                    'summary': "songxt TQL",
                    'author': "songxt",
                    'pay': "￥100",
                    'attend': "5/90",
                    'time': "2018-4-13",
                    'myState': "未参与"
                }

            ]
        }

    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        },
        showDetail() {
            this.qDetail = true;
        },
        goQD() {
            this.$router.push('/questionDetail');
        }
    }
}
</script>