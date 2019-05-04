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
        此页面暂未开放，敬请期待
        <!-- <div style="height: 400px; background: white">
            <Button type="info" style="margin-top: 220px; margin-left: 15%">发布跑腿</Button>
        </div>
        <div style="margin: 30px 15%">
            <div class="bigupper">
                <div class="upper">
                    <Dropdown style="margin-left: 20px">
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
                    <Card :bordered="false" style="padding:23px">
                        <a href="#" slot="extra">
                            <Icon type="ios-loop-strong"></Icon>
                            未参与
                        </a>
                        <p slot="title" style="font-size:20px">title in here</p>
                        <div class="allupdate">
                            <div class="sum" style="font-size:15px">
                                <span class='info'> 简介:{{summary}} </span>
                            </div>
                            <div class="someInfo">
                                <span class='info'>发布人:{{author}}</span><span class='info'>薪酬:{{pay}}</span><span class='info'>参与情况:{{attend}}</span><span class='info'>事件:{{time}}</span>
                                <Button>查看详情</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
// export default {
//     data() {
//         return {
//             summary: "songxt TQL",
//             author: "songxt",
//             pay: "￥100",
//             attend: "5/90",
//             time: "2018-4-13"
//         }

//     },
//     methods: {
//         handleSelectAll(status) {
//             this.$refs.selection.selectAll(status);
//         }
//     }
// }
// </script>