<template>
  <div>
    <div style="height: 350px">
        <div id="grad"  style="width: 57%; float: left; height:350px; padding-right: 6%;display: flex;align-items:Center;">
            <div class="showPage" style="min-height: 150px; width: 70%; position: absolute; right: 100px">
                <p style="width: 100%"><span style="font-size: 33px; font-weight:100; color: #fff">跑腿互助</span> <span style="font-size: 20px; font-weight:100;  color: #fff">Errand</span></p>
                <p style="font-size: 20px; color: #fff; width: 100%;margin-top: 20px; font-weight:100; ">互助互利，不费事不费力，不方便的时候为你解决小麻烦！</p>
                <Button type="info" style="margin-top: 30px; " @click="create()">发布跑腿</Button>
            </div>
        </div>
        <div style="width: 43%; float: right; height:350px; background: #FF4B3C">
            <img src="./../../static/run/create.png" style="float: leftt; height: 300px; margin-top: 25px"></img>
        </div> 
    </div>
    <div style="margin: 30px 13%">
        <Col span='8'>
            <run style="margin: 0 5%"></run>
        </Col>
        <Col span='8'>
            <run style="margin: 0 5%"></run>
        </Col>
        <Col span='8'>
            <run style="margin: 0 5%"></run>
        </Col>
      
    </div>
        
  </div>
</template>
<script>
import run from './components/Run.vue'
export default {
    components:{
        run
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
<style scoped>
#grad {
    background: linear-gradient(to right, #FF6699 , #FF4B3C);
}
.showPage {
    .ivu-btn-info {
        color: #fff;
        background-color: rgba(255,255,255,0)!important;
        border-color: #fff!important;
    }
    .ivu-btn-info span{
        font-size: 24px!important;
    }
    .ivu-btn-info:hover {
        color: #FF6699!important;
        background-color: #FF6699;
        border-color: #FF6699!important;
    }
    .ivu-btn{
        border-radius: 30px!important;
        background: rgba(255,255,255,0)!important;
        width: 180px;
        height: 50px;
    }
    .ivu-btn:hover{
        border-radius: 30px!important;
        background: #fff!important;
    }
}
</style>