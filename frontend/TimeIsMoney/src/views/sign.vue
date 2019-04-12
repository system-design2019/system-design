<template>
    <div>
        <slot></slot>
        <slot name="wise" class="demo"></slot>
        <button @click="toSim(1)">页面一</button>
        <button@click="toSim(2)">页面二</button>
            <keep-alive>
                <component :is="tabView"></component>
            </keep-alive>
    </div>
</template>
<style>
</style>
<script>
import simple1 from "./test1.vue";
import simple2 from "./test2.vue";
export default {
    data() {
        return {
            tabView: "simple1"
        }
    },
    methods: {
        toSim(index) {
            this.tabView = `simple${index}`;
        }
    },
    components: {
        simple1,
        simple2
    }
}
</script>