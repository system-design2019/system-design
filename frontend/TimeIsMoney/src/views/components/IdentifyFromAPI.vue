<template>
    <div id="sendCheck">
        <Button :disabled="sdisabled" @click="sendcode" class="sendcode" style="width:110px;">
            {{btntxt}}
        </Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            sdisabled: false,
            time: 60,
            btntxt: "获取验证码",
        };
    },
    methods: {
        sendcode() {
            this.time = 60;
            this.timer();
        },
        //发送验证码倒计时
        timer() {
            if (this.time > 0) {
                this.sdisabled = true;
                this.time--;
                this.btntxt = this.time + "S";
                setTimeout(this.timer, 1000);
            } else {
                this.time = 0;
                this.btntxt = "发送验证码";
                this.sdisabled = false;
            }
        },
    }
}
</script>
<style scoped>
</style>