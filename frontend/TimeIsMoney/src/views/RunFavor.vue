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
        <task style="margin: 0 15%"></task>
    </div>
</template>
<script>
import task from './components/Task.vue'
export default {
    components:{
        task
    }
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
}
</script>