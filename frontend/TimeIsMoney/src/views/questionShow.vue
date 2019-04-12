<template>
    <div class="qShow">
        <div class="upper" style="float:right">
            <Dropdown style="margin-left: 20px">
                <Button type="primary">
                    筛选顺序
                    <Icon type="ios-arrow-down"></Icon>
                </Button>
                <DropdownMenu slot="list">
                    <DropdownItem>按发布时间</DropdownItem>
                    <DropdownItem>按热度</DropdownItem>
                    <DropdownItem>按酬金</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Button type='primary'>
                发布问卷
            </Button>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        handleStart() {
            this.$router.push({ //跳转到不同后缀的页面，同理可以有多个子后缀，从而实现页面跳转
                path: '/index'
            })
        }
    }
}
</script>
<style scoped lang="less">
</style>