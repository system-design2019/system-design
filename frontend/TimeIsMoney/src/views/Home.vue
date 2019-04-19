<style>

</style>
<template>
    <div style="min-height: 800px;">
        <div>
            <Carousel autoplay v-model="value"
            :autoplay="setting.autoplay"
            :autoplay-speed="setting.autoplaySpeed"
            :dots="setting.dots"
            :radius-dot="setting.radiusDot"
            :trigger="setting.trigger"
            :arrow="setting.arrow"
            style="height: 300px">
                <CarouselItem v-for="c in carousel">
                    <img :src="c.src" style="height: 300px;object-fit: cover; width:1062px"></img>
                </CarouselItem>
            </Carousel>
        </div>
        <div style="height: auto;">
            <div style="width: 100%; height: 30px; background: #CE5555; margin: 20px 0; border-radius: 10px; text-align: center;">
                <p style="line-height: 30px;color: #ffffff; text-align: right; margin-right: 20px">猜你喜欢</p>
            </div>
            <div style="width: 10%; float: left">
                dfsafa
            </div>
            <div style="width: 80%; float: right">
                <Row style="width: 100%; height: 250spx;" gutter="20">
                    <i-col span="18"><img src='../../static/home/adver1.jpg' style="width: 100%; height: 233.56px"></img></i-col>
                    <i-col span="6"><img src='../../static/home/adver1.jpg'style="width: 100%; height: 233.56px"></img></i-col>
                </Row>
                <Row style="width: 100%" gutter="20">
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
            }
        }

    },
    methods: {
    }
}
</script>