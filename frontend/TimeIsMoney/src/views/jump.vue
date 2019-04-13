<style>
    .hellopage{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;

        h1{
            font-size: 159px;
            color:#FFF;
        }
        h2{
            color: #FFF;
            margin-bottom:50px;
            font-size: 25px;
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
    #signButton{
        float:right;
        margin-top:20px;
        margin-right: 20px;
        font-size: 30px;
    }
    #mainButton{
        font-size:30px;
    }

</style>
<template>
    <div class="hellopage" :style="note">
        <div class="signIn">
            <Button id="signButton" type="success" @click="handleSign" size=large ghost>SignIn</Button>
        </div>
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <div>
                <h1 id="Logo"> T.I.M </h1>
            </div>
            <div>
                <h2>
                    <p>Time Is Money, you know？</p>
                </h2>
            </div>
            <Button id="mainButton" type="success" @click="handleStart" size="large">Know More</Button>
            </Col>
        </Row>
        <signCom :signInFromJump="signInFromJump"></signCom>
    </div>
</template>
<script>
import signCom from './sign.vue'
export default {
    name: 'helloPage',
    data() {
        return {
            signInFromJump: false,
            note: {
                backgroundImage: "url(" + require("../images/hellobg.jpg") + ")",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            }
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
        }
    },
    components: { signCom }
}
</script>