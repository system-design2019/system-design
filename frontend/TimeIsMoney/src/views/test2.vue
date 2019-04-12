<style>
    .upper {
    margin-bottom: 5px;
    float:right;
}
.allQN{
  margin-top: 5px;
  clear:both;
}
</style>
<template>
    <div class="qShow">
        <div class="bigupper">
            <div class="upper">
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
        <div class="allQN">
            <Table border ref="selection" :columns="columns4" :data="data1"></Table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            columns4: [{
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '问卷标题',
                    key: 'title'
                },
                {
                    title: '简介',
                    key: 'summary'
                },
                {
                    title: '发布人',
                    key: 'author'
                },
                {
                    title: '薪酬',
                    key: 'pay'
                },
                {
                    title: '发布时间',
                    key: 'date'
                },
                {
                    title: 'Action',
                    slt: "action",
                    width: 100,
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'button',
                                    size: 'middle'
                                }
                            }, '查看详情')
                        ]);
                    }
                }
            ],
            data1: [{
                title: '为什么我们的产品经理这么牛逼',
                summary: '楷模人赢宋好强啊',
                author: '楷模人赢宋',
                pay: '1000W',
                date: '2016-10-03'
            }]
        }
    },
    methods: {
        handleSelectAll(status) {
            this.$refs.selection.selectAll(status);
        }
    }
}
</script>