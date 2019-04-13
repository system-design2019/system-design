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
        <div class="allQN">
            <div style="background:#eee;">
                <Card style="padding:23px">
                    <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        <span>{{myState}}</span>
                    </a>
                    <p slot="title" style="font-size:20px">title in here</p>
                    <div class="allupdate">
                        <div class="sum" style="font-size:15px">
                            <span> 简介:{{summary}} </span>
                        </div>
                        <div class="someInfo">
                            <span>发布人:{{author}}</span><span>薪酬:{{pay}}</span><span>参与情况:{{attend}}</span><span>事件:{{time}}</span>
                            <Button type="primary" style="float:right;" @click="showDetail">查看详情</Button>
                        </div>
                    </div>
                </Card>
            </div>
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
export default {
    data() {
        return {
            qDetail: false,
            summary: "songxt TQL",
            author: "songxt",
            pay: "￥100",
            attend: "5/90",
            time: "2018-4-13",
            myState: "未参与"
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