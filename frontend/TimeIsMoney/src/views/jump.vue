<style>
    .hellopage{
        width: 100%;
        position: relative;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center; 
        justify-content: center;

        h2{
            color: #FFF;
            margin-bottom:50px;
            font-size: 25px;
        }

        .ivu-row-flex{
        height: 100%;
        }
    }

    #signIn{
        width: 1200px;
        height: 70px;
    }
    #signButton{
        float:right;
        margin-right: 30px;
        font-size: 30px;
    }

    #block1{
        width:1200px;
        height: 650px;
        background-color: #ce4545;
    }



    #bigTitle{
        font-size:100px;
        color: #FFF;
        margin-top: 0px;
        text-align: center;
    }
    #title2{
        font-size:30px;
        color:#FFF;
        margin-bottom: 20px;
        text-align: center;
    }
    #logov2{
        width:200px;
        height:200px;
    }
    #logoBox{
       width:200px; 
       height:200px; 
       border-radius:50%; 
       overflow:hidden;
       text-align: center;
       margin: auto;
     }


    #mainButton{
        text-align: center;
    }
    #moveout{
    animation: in2out 2s;
    -moz-animation: in2out 2s; /* Firefox */
    -webkit-animation: in2out 2s;  /* Safari 和 Chrome */
    -o-animation: in2out 2s;   /* Opera */
    opacity: 0;   /*显示状态*/
    animation-fill-mode: forwards;
    font-size: 100px;
    justify-content: center;
    align-items:center;
    }

    #text1{
        font-size: 50px;
        text-align: center;
    }

    #jumpdown{
        animation:uptodown 3s;
        -moz-animation:uptodown 3s; /* Firefox */
        -webkit-animation:uptodown 3s; /* Safari and Chrome */
        -o-animation:uptodown 3s; /* Opera */
         animation-fill-mode: forwards;
         /*animation-delay: 2.5s;  /*用于延迟触发的函数*/  
         opacity: 0;
         display: none;
    }


/* make the move1*/
@keyframes in2out
{
from {opacity: 1;display: 1;top:30px;}
to {opacity: 0;display: none;}
}

@-moz-keyframes in2out /* Firefox */
{
from {opacity: 1;display: 1;top:30px;}
to {opacity: 0;display: none;}
}

@-webkit-keyframes in2out /* Safari and Chrome */
{
from {opacity: 1;display: 1;top:0px;}
to {opacity: 0;display: none;}
}

@-o-keyframes in2out /* Opera */
{
from {opacity: 1;display: 1;top:0px;}
to {opacity: 0;display: none;}
}


/* make the move2*/
@keyframes uptodown
{
0%   {opacity: 0;left:0px; top:-100px;}
50%  {opacity: 1;left:0px; top:0px;}
100% {opacity: 1;left:0px; top:-20px;}
}

@-moz-keyframes uptodown /* Firefox */
{
0%   {opacity: 0;left:0px; top:-100px;}
50%  {opacity: 1;left:0px; top:0px;}
100% {opacity: 1;left:0px; top:-20px;}
}


@-webkit-keyframes uptodown /* Safari and Chrome */
{
0%   {opacity: 0;left:0px; top:0px;}
50%  {opacity: 1;left:0px; top:200px;}
100% {opacity: 1;left:0px; top:100px;}
}

@-o-keyframes uptodown /* Opera */
{
0%   {opacity: 0;left:0px; top:0px;}
50%  {opacity: 1;left:0px; top:200px;}
100% {opacity: 1;left:0px; top:100px;}
}



</style>
<template>
    <div class="hellopage">
        <div id="block1">
            <Row type="flex" justify="center" align="middle">
                <div id="moveout" ref="moveout">
                    <h2>
                        <p id="text1">从未想过 琐碎时间更值钱？</p>
                    </h2>
                </div>
                <div id="jumpdown" ref="jumpdown">
                    <div id="signIn">
                        <Button id="signButton" shape="circle" @click="handleSign" size=large ghost>SignIn</Button>
                    </div>
                    <div id="logoBox">
                        <img id="logov2" src="../images/logov2big.png" alt="正方形的原始图片" />
                    </div>
                    <p id="bigTitle"> T.I.M </p>
                    <p id="title2"> 让琐碎的时间更有价值 </p>
                    <div id="mainButton">
                        <Button @click="handleStart" shape="circle" size=large ghost style="font-size:30px;width:200px">去赚钱</Button>
                    </div>
                </div>
            </Row>
            <signCom :signInFromJump="signInFromJump"></signCom>
        </div>
    </div>
</template>
<script>
import signCom from './sign.vue'



export default {
    name: 'helloPage',
    mounted() {
        this.A(); //在dom元素渲染完成之后直接触发
    },
    data() {
        return {
            signInFromJump: false,
            note: {
                //backgroundImage: "url(" + require("../images/hellobg.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            },
        }
    },
    methods: {
        handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/main'
            })
        },
        handleSign() {
            this.signInFromJump = !this.signInFromJump;
            //需要切换属性才能实现更新，不然会导致只有第一次点击会弹出注册框
        },
        A() {
            setTimeout(this.disapper, 2000); //记得加this。否则会找不到元素/方法
        },
        disapper() {
            this.$refs.moveout.style.display = "none"; //html元素中插入ref钩子，然后就可以在js中调用 
            this.$refs.jumpdown.style.display = "block";
        }

    },
    components: { signCom }
}
</script>