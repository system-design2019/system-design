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
                    <img :src="c.src" style="height: 300px;object-fit: cover; width:100%"></img>
                </CarouselItem>
            </Carousel>
        </div>
        <div style="height: auto;">
            <div style="width: 100%; height: 30px; background: #CE5555; margin: 20px 0; border-radius: 10px; text-align: center;">
                <p style="line-height: 30px;color: #ffffff; text-align: right; margin-right: 20px">猜你喜欢</p>
            </div>
            <div style="width: 22%; float: left; margin-left: 1%">
                <Card style="height: 380px;">
                    <p slot="title">一夜暴富</p>
                    <ul style="margin-left: 3px">
                        <li v-for="(item, index) in ranklist" :key="index" style="list-style: none; margin-top: 10px;">
                            <Icon type="ios-paper"></Icon>
                            <a href="#" target="_blank">{{ item.name }}</a>
                            <span style="float: right">{{ item.price }}</span>
                        </li>
                    </ul>
                </Card>
            </div>
            <div style="width: 76%; float: right">
                <Row style="width: 100%; height: 250px;" :gutter="10">
                    <i-col span="18"><img src='../../static/home/adver1.jpg' style="width: 100%; height: 233.56px"></img></i-col>
                    <i-col span="6"><img src='../../static/home/adver1.jpg'style="width: 100%; height: 233.56px"></img></i-col>
                </Row>
                <Row style="width: 100%; height: 100px;" :gutter="10">
                    <i-col span="8"><img src='../../static/home/adver1.jpg' style="width: 100%"></img></i-col>
                    <i-col span="8"><img src='../../static/home/adver1.jpg' style="width: 100%"></img></i-col>
                    <i-col span="8"><img src='../../static/home/adver1.jpg' style="width: 100%"></img></i-col>
                </Row>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            value: 0,
            tabs: 2,
            carousel:[
                {name:'adver1', src:'../../static/home/adver1.jpg'},
                {name:'adver2', src:'../../static/home/adver2.jpg'},
                {name:'adver3', src:'../../static/home/adver3.jpg'},
                {name:'adver4', src:'../../static/home/adver4.jpg'}
            ],
            setting: {
                autoplay: true,
                autoplaySpeed: 2000,
                dots: 'inside',
                radiusDot: false,
                trigger: 'hover',
                arrow: 'never',
            },
            ranklist:[
                {name: '问卷问卷1问卷问卷问卷', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'},
                {name: '问卷1', price: "￥12", url:'www.baidu.com'}
            ]
        }

    },
    methods: {
        handleTabsAdd () {
            this.tabs ++;
        }
    }
}
</script>