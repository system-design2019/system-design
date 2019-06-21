<style>

</style>
<template>
    <div style="min-height: 800px; margin: 30px 15%">
        <div>
            <Carousel autoplay loop v-model="value"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow"
            style="height: 300px">
                <CarouselItem v-for="(c, index) in carousel" :key="index">
                    <img :src="c.src" style="height: 300px; width:100%"></img>
                    <!-- object-fit: cover; -->
                </CarouselItem>
            </Carousel>
        </div>
        <div style="height: auto;">
        <!--    <div style="width: 100%; height: 50px; background: #ffffff; margin: 20px 0;text-align: center;border-radius:5px;">
            <p style="line-height: 30px;color: #ce4545; text-align: left; font-size: 20px; margin-top: 15px;">一夜暴富</p>
                <p style="line-height: 30px;color: #ce4545; text-align: right; font-size: 20px; margin-top: 15px;margin-right: 20px">今日问卷</p>
            </div>-->
            <div style="width: 100%; height: 50px;"></div>
            <div style="width: 24%; float: left; margin-left: 1%">
                <Card style="height: 420px; background: #ffffff;">
                    <p slot="title" style="color: #ce4545; font-size:20px;margin-top:5px;">一夜暴富</p>
                    <ul style="margin-left: 3px">
                        <li v-for="(item, index) in ranklist" :key="index" style="list-style: none; margin-top: 15px;">
                            <Icon type="ios-paper"  style="width: 7%;overflow: hidden;color:#ce4545"></Icon>
                            <a href="#" target="_blank" style="width: 65%; overflow: hidden;display:inline-block;word-break: keep-all;white-space: nowrap;text-overflow: ellipsis;vertical-align: middle;">{{ item.name }}</a>
                            <span  style=" float: right; width: 20%;color:#ce4545;overflow: hidden;display:inline-block;word-break: keep-all;white-space: nowrap;text-overflow: ellipsis;">{{ item.price }}</span>
                        </li>
                    </ul>
                </Card>
            </div>
            <div style="width: 74%; float: right">
                <Row style="width: 100%; height: 250px;" :gutter="10">
                    <i-col span="18"><img src='../../static/home/show1.jpg' style="width: 100%; height: 233.56px"></img></i-col>
                    <i-col span="6"><img src='../../static/home/show2.jpg'style="width: 100%; height: 233.56px"></img></i-col>
                </Row>
                <Row style="width: 100%; height: 100px;" :gutter="10">
                    <i-col span="8"><img src='../../static/home/show3.jpg' style="width: 100%; height: 163px"></img></i-col>
                    <i-col span="8"><img src='../../static/home/show4.jpg' style="width: 100%; height: 163px"></img></i-col>
                    <i-col span="8"><img src='../../static/home/show5.jpg' style="width: 100%; height: 163px"></img></i-col>
                </Row>
            </div>
            
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
// import { GET_RANKLIST } from '../store/home/actions.js'
// console.log(GET_RANKLIST)
export default {
    data() {
        return {
            value: 0,
            tabs: 2,
            setting: {
                autoplay: true,
                autoplaySpeed: 2000,
                dots: 'inside',
                radiusDot: false,
                trigger: 'hover',
                arrow: 'never',
            }
        }

    },
    computed:mapState('Home', {
        ranklist: state => state.rankList,
        carousel: state => state.advertises
    }),
    methods: mapActions('Home', {
        GET_RANKLIST: 'GET_RANKLIST',
        GET_ADVERTISES: 'GET_ADVERTISES',
         
    }),
    mounted () {
        this.GET_RANKLIST()
        this.GET_ADVERTISES()
    }
}
</script>
<style scoped>
a:link{
    color:#ce4545;
}
a:hover{
    color:blue;
}
</style>