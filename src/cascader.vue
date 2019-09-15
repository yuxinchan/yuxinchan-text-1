<template>
    <div class="cascader">
        <div class="trigger" @click="popoverVisible = !popoverVisible">
            {{result}}
        </div>
        <div class="popover-wrapper" v-if="popoverVisible">
            <cascader-items
                    :items="source" class="popover"
                    :height="popoverHeight"
                    :selected="selected"
                    @update:selected="onUpdateSelected"
            ></cascader-items>
        </div>
    </div>
</template>

<script>
    import CascaderItems from './cascader-items'
    export default {
        name: "GuluCascader",
        components: {CascaderItems},
        props: {
            source: {
                type: Array
            },
            popoverHeight: {
                type: String
            },
            selected: {
                type: Array,
                default: () => {return []}
            }
        },
        data() {
            return {
                popoverVisible: false
            }
        },
        methods: {
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            }
        },
        computed: {
            result() {
                return this.selected.map((item) => item.name).join('/')
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascader {
        position: relative;
        display: flex;
        .trigger {
            height: $input-height;
            display: flex;
            align-items: center;
            padding: 0 1em;
            min-width: 9em;
            border: 1px solid $border-color;
            border-radius: $border-radius;
        }
        .popover-wrapper {
            position: absolute; top: 100%; left: 0;
            margin-top: 5px;
            background: #fff;
            display: flex;
            @extend .box-shadow;
        }
    }
</style>