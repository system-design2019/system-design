<template>
    <div class="s-canvas">
        <canvas id="s-canvas1" :width="contentWidth" :height="contentHeight"></canvas>
    </div>
</template>
<script>
export default {
    name: 'SIdentify1',
    props: {
        identifyCode1: {
            type: String,
            default: 'fuck'
        },
        fontSizeMin: {
            type: Number,
            default: 16
        },
        fontSizeMax: {
            type: Number,
            default: 40
        },
        backgroundColorMin: {
            type: Number,
            default: 180
        },
        backgroundColorMax: {
            type: Number,
            default: 240
        },
        colorMin: {
            type: Number,
            default: 50
        },
        colorMax: {
            type: Number,
            default: 160
        },
        lineColorMin: {
            type: Number,
            default: 40
        },
        lineColorMax: {
            type: Number,
            default: 180
        },
        dotColorMin: {
            type: Number,
            default: 0
        },
        dotColorMax: {
            type: Number,
            default: 255
        },
        contentWidth: {
            type: Number,
            default: 112
        },
        contentHeight: {
            type: Number,
            default: 38
        }
    },
    methods: {
        // 生成一个随机数
        randomNumber(min, max) {
            return Math.floor(Math.random() * (max - min) + min)
        },
        // 生成一个随机的颜色
        randomInColor(min, max) {
            let r = this.randomNumber(min, max)
            let g = this.randomNumber(min, max)
            let b = this.randomNumber(min, max)
            return 'rgb(' + r + ',' + g + ',' + b + ')'
        },
        drawPic1() {
            let canvas = document.getElementById('s-canvas1')
            let ctx1 = canvas.getContext('2d')
            ctx1.textBaseline = 'bottom'
            // 绘制背景
            ctx1.fillStyle = this.randomInColor(this.backgroundColorMin, this.backgroundColorMax)
            ctx1.fillRect(0, 0, this.contentWidth, this.contentHeight)
            // 绘制文字
            for (let i = 0; i < this.identifyCode1.length; i++) {
                this.drawText1(ctx1, this.identifyCode1[i], i)
            }
            this.drawLine1(ctx1)
            this.drawDot1(ctx1)
        },
        drawText1(ctx1, txt1, i1) {
            ctx1.fillStyle = this.randomInColor(this.colorMin, this.colorMax)
            ctx1.font = this.randomNumber(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
            let x = (i1 + 1) * (this.contentWidth / (this.identifyCode1.length + 1))
            let y = this.randomNumber(this.fontSizeMax, this.contentHeight - 5)
            var deg = this.randomNumber(-45, 45)
            // 修改坐标原点和旋转角度
            ctx1.translate(x, y)
            ctx1.rotate(deg * Math.PI / 180)
            ctx1.fillText(txt1, 0, 0)
            // 恢复坐标原点和旋转角度
            ctx1.rotate(-deg * Math.PI / 180)
            ctx1.translate(-x, -y)
        },
        drawLine1(ctx1) {
            // 绘制干扰线
            for (let i = 0; i < 8; i++) {
                ctx1.strokeStyle = this.randomInColor(this.lineColorMin, this.lineColorMax)
                ctx1.beginPath()
                ctx1.moveTo(this.randomNumber(0, this.contentWidth), this.randomNumber(0, this.contentHeight))
                ctx1.lineTo(this.randomNumber(0, this.contentWidth), this.randomNumber(0, this.contentHeight))
                ctx1.stroke()
            }
        },
        drawDot1(ctx1) {
            // 绘制干扰点
            for (let i = 0; i < 100; i++) {
                ctx1.fillStyle = this.randomInColor(0, 255)
                ctx1.beginPath()
                ctx1.arc(this.randomNumber(0, this.contentWidth), this.randomNumber(0, this.contentHeight), 1, 0, 2 * Math.PI)
                ctx1.fill()
            }
        }
    },
    watch: {
        identifyCode1() {
            this.drawPic1()
        }
    },
    mounted() {
        this.drawPic1()
    }
}
</script>