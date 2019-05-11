<template>
    <div class="hellopage">
        <div id="block1" v-show="show">
            <Row type="flex" justify="center" align="middle" >
                <div id="moveout" ref="moveout">
                    <h2>
                        <p id="text1">从未想过 琐碎时间更值钱？</p>
                    </h2>
                </div>
                <transition>
                    <div id="showon" ref="showon">
                        <div id="signIn">
                            <Button id="signButton" shape="circle" @click="handleSign" size=large ghost>SignIn</Button>
                        </div>
                        <div class="animated bounce">
                            <div id="logoBox">
                                <img id="logov2" src="../images/logov2big.png" alt="正方形的原始图片" />
                            </div>
                            <p id="bigTitle"> T.I.M </p>
                            <p id="title2"> 让琐碎的时间更有价值 </p>
                            <div id="mainButton">
                                <Button @click="handleStart" shape="circle" size=large ghost style="font-size:30px;width:200px">去赚钱</Button>
                            </div>
                        </div>
                    </div>
                </transition>
            </Row>
            <Row style="text-align: center; vertical-align: middle; margin: 60px 0;">
                <p style="font-size: 24px; font-weight: 300">TIM是一个专为大学生建立的赚钱社区。</p>
                <p style="font-size: 24px; font-weight: 300">在这里，你可以利用零碎时间换取收益，积少成多。</p>
            </Row>
            <Row style="background: rgb(246,246,246)">
                <Row style="text-align: center; vertical-align: middle; margin: 40px 0;">
                    <p style="font-size: 34px; font-weight: 300; color: #CE4545">我们可以做什么？</p>
                </Row>
                <Row style="margin: 40px 80px;">
                    <Col v-for="(things, index) in list1" :key="index" span="8" style="text-align: center; align: middle;">
                        <img :src='things.src' style="width: 32%; border-radius: 50%; align: middle">
                        <p style="width:100%; font-size: 26px; color: #CE4545; margin: 15px 0; font-weight: 300;">{{things.title}}</p>
                        <p style="font-size: 20px; margin: 15px 10%; text-align: left; font-weight: 300;">{{things.content}}</p>
                    </Col>
                </Row>
            </Row>
            <Row >
                <Col v-for="(things, index) in list2" :key="index" span="12" style="text-align: center; height: 340px; margin: auto 0;">
                    <img v-show="!things.show" :src='things.src' style="width: 100%; height: 100%">
                    <p v-show="things.show" style=" margin: 13% 10% 20px 10%; font-size: 26px; color: #CE4545; font-weight: 300;">{{things.title}}</p>
                    <p v-show="things.show" style=" margin: 20px 10% 13% 10%; font-size: 20px;text-align: left; font-weight: 300;">{{things.text}}</p>
                </Col>
            </Row>
            <Footer class="layout-footer-center" style="text-align: center; padding: 50px 20px 24px 20px">
                <!-- <img src='../images/github.png' style="width: 2%;"></img> -->
                <span style="padding-top: 50px">open source <img src='../images/github.png' style="width: 2%;"></img><a href='https://github.com/system-design2019' style="margin:0 3px;">blog</a>here</span>
                <p style="width: 100%">2019-2020 &copy; TalkingDataSystem Design & Anylasis Project</p>
            </Footer>
            <signCom :signInFromJump="signInFromJump"></signCom>
        </div>
    </div>
</template>
<script>
import signCom from './Sign.vue'



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
            show: true,
            list1:[
                {src:'../../static/jump/question.png', title:'问卷调查', content:'在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。'},
                {src:'../../static/jump/runfavor.png', title:'跑腿代购', content:'跑腿代购同样可以获得零用钱。代领快递、领外卖、购买商品……无论你是想赚钱还是想找个人替你跑腿，TIM无疑是你最优秀的选择。在这里，时间就是酬劳。'},
                {src:'../../static/jump/social.png', title:'聊天社交', content:'想要找到兴趣相同的朋友？想要和校内的同学搞好关系？来TIM就对了！问卷和跑腿不是全部，随时随地和附近的人聊天社交，有时间你就来，爱情与友情也是价值的体现！'}
            ],
            list2:[
                {show: true, src:'../../static/jump/image4.jpg', title:'在线交流，沟通更方便', text:'在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。'},
                {show: false, src:'../../static/jump/image4.jpg', title:'', text:''},
                {show: false, src:'../../static/jump/image5.jpg', title:'', text:''},
                {show: true, src:'../../static/jump/image5.jpg', title:'问卷跑腿，收益双保障', text:'在这里，你可以完成带有悬赏的问卷，提交有效问卷后既可以获得对应的金额，积少成多。如果你是问卷发布者，这里同样欢迎你提交需要调查的问卷和资金，我们会帮你保管好你的资金和问卷，为你的调查助力。'}
            ]
        }
    },
    methods: {
        handleStart() {
            let id = JSON.parse(window.sessionStorage.getItem('LogInfo')).userID
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/main'
            })
        },
        handleSign() {
            this.signInFromJump = !this.signInFromJump;
            //需要切换属性才能实现更新，不然会导致只有第一次点击会弹出注册框
        },
        A() {
            setTimeout(this.disapper, 2500); //记得加this。否则会找不到元素/方法
            var obj = {
                "log": false,
                "userID": 0
            }
            window.sessionStorage.setItem('LogInfo', JSON.stringify(obj))
        },
        disapper() {
            this.$refs.moveout.style.display = "none"; //html元素中插入ref钩子，然后就可以在js中调用 
            this.$refs.showon.style.display = "block";
        }

    },
    components: { signCom }
}
</script>
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
    #mainButton .ivu-btn-ghost.ivu-btn-dashed:hover, .ivu-btn-ghost.ivu-btn-default:hover{
        text-align: center;
        color: rgb(206, 69, 69);
        border-color: rgb(255,255,255)!important;
        background: rgb(255,255,255)!important;
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

    #showon{
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