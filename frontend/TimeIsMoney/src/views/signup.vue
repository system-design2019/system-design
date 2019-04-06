<template>
    <Button type="primary" @click="modal1 = true">Display dialog box</Button>
    <Modal v-model="modal1" title="Common Modal dialog box title" @on-ok="ok" @on-cancel="cancel">
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <p>Content of dialog</p>
        <input v-model="value" placeholder="Enter something..." style="width: 300px" />
    </Modal>
</template>
<script>
export default {
    data() {
        return {
            modal1: false
        }
    },
    methods: {
        ok() {
            this.$Message.info('Clicked ok');
        },
        cancel() {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>