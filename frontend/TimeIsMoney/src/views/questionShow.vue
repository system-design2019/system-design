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
            <div style="background:#eee;padding: 20px;">
                <Card :bordered="false" style="padding:23px">
                    <a href="#" slot="extra">
                        <Icon type="ios-loop-strong"></Icon>
                        未参与
                    </a>
                    <p slot="title" style="font-size:20px">title in here</p>
                    <div class="allupdate">
                        <div class="sum" style="font-size:15px">
                            <span> 简介:{{summary}} </span>
                        </div>
                        <div class="someInfo">
                            <span>发布人:{{author}}</span><span>薪酬:{{pay}}</span><span>参与情况:{{attend}}</span><span>事件:{{time}}</span>
                            <Button> 查看详情 </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            summary: "songxt TQL",
            author: "songxt",
            pay: "￥100",
            attend: "5/90",
            time: "2018-4-13"
        }

    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        }
    }
}
</script>