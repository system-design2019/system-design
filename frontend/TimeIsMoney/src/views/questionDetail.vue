<style>
    .index{
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
        h1{
            height: 150px;
            img{
                height: 100%;
            }
        }
        h2{
            color: #666;
            margin-bottom: 200px;
            p{
                margin: 0 0 50px;
            }
        }
        .ivu-row-flex{
            height: 100%;
        }
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
            <h1>
                <img src="../images/logo.png">
            </h1>
            <h2>
                <p>This is detail page of question Wrting</p>
                <button @click="returnMain"> 回去首页 </button>
            </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
export default {
    methods: {
        returnMain() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/main'
            })
        }
    }
}
</script>