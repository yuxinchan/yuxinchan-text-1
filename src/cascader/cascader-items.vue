<template>
    <div class="cascaderItem" :style="{height: height}">
        <div class="left">
            <div class="label" v-for="item in items" @click="onClickLabel(item)">
                <span class="name">{{item.name}}</span>
                <span class="icons">
                    <template v-if="item.name === loadingItem.name">
                        <icon class="loading" name="loading"></icon>
                    </template>
                    <template v-else>
                        <icon v-if="rightArrowVisible(item)" name="right"></icon>
                    </template>
                </span>
            </div>
        </div>
        <div class="right" v-if="rightItems">
            <gulu-cascader-items
                    ref="right" :items="rightItems"
                    :height="height" :level="level+1"
                    :selected="selected"
                    :load-data="loadData"
                    :loading-item="loadingItem"
                    @update:selected="onUpdateSelected"
            ></gulu-cascader-items>
        </div>
    </div>
</template>

<script>
    import Icon from "../icon"
    export default {
        name: "GuluCascaderItems",
        components: {Icon},
        props: {
            items: {
                type: Array
            },
            height: {
                type: String
            },
            loadingItem: {
                type: Object,
                default: () => ({})
            },
            selected: {
                type: Array,
                default: () => {return []}
            },
            loadData: {
                type: Function
            },
            level: {
                type: Number,
                default: 0
            }
        },
        computed: {
            rightItems() {
                if (this.selected[this.level]) {
                    let selected = this.items.filter(item => item.name === this.selected[this.level].name)
                    if (selected && selected[0].children && selected[0].children.length > 0) {
                        return selected[0].children
                    }
                }
            }
        },
        methods: {
            rightArrowVisible(item) {
                return this.loadData ? !item.isLeaf : item.children
            },
            onClickLabel(item) {
                let copy = JSON.parse(JSON.stringify(this.selected))
                copy[this.level] = item
                copy.splice(this.level + 1)
                this.$emit('update:selected', copy)
            },
            onUpdateSelected(newSelected) {
                this.$emit('update:selected', newSelected)
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .cascaderItem {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        height: 100px;
        .left {
            padding: .3em 0;
            height: 100%;
            overflow: auto;
            /*-ms-overflow-style: none;           //IE 10+ 隐藏滚动条*/
            /*overflow: -moz-scrollbars-none;     //Firefox 隐藏滚动条*/
        }
        /*.left::-webkit-scrollbar {              //chrome 和 Safari 隐藏滚动条*/
            /*display: none;*/
        /*}*/
        .right {
            border-left: 1px solid $border-color-light;
            height: 100%;
        }
        .label {
            padding: .5em 1em;
            display: flex;
            align-items: center;
            white-space: nowrap;
            cursor: pointer;
            text-align: center;
            &:hover {
                background: $grey;
            }
            .name {
                margin-right: .5em;
                user-select: none;
            }
            > .icons {
                display: flex;
                align-items: center;
                margin-left: auto;
                transform: scale(0.8);
                .loading {
                    animation: spin 2s infinite linear;
                }
            }
        }
    }
</style>