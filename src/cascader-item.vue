<template>
    <div class="cascaderItem">
        {{sourceItem.name}}
        <gulu-cascader-item
            v-if="sourceItem.children"
            v-for="item in sourceItem.children"
            :sourceItem="item"
        ></gulu-cascader-item>
    </div>
</template>

<script>
    export default {
        name: "GuluCascaderItem",
        props: {
            sourceItem: {
                type: Object
            }
        }
    }
</script>

<style scoped>
    .cascaderItem {
        border: 1px solid black;
        margin: 10px;
    }
</style>