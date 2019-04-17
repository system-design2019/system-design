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
        home
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