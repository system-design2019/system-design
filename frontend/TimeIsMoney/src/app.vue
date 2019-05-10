<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                isRouterAlive: true
            }
        },
        provide(){
            return {
                reload: this.reload
            }
        },
        mounted () {
            // console.log(window.sessionStorage.getItem('LogInfo'))
        },
        created(){
        },
        beforeDestroy () {

        },
        methods: {
            reload(){
                this.isRouterAlive = false
                this.$nextTick(function(){
                    this.isRouterAlive = true
                })
            }
        }
    }
</script>
