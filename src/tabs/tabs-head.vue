<template>
    <div class="tabs-head" id="tabs-head">
        <slot></slot>
        <div class="line" ref="line" ></div>
        <div class="actions-wrapper">
            <slot name="actions"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GuluTabsHead',
        inject: ['eventBus'],
        mounted() {
            const HLeft = document.getElementById('tabs-head').getBoundingClientRect().left
            const HTop = document.getElementById('tabs-head').getBoundingClientRect().top
            this.eventBus.$on('update:selected', (item, vm) => {
                let {width, height, top, left} = vm.$el.getBoundingClientRect()
                this.$refs.line.style.width = `${width}px`
                this.$refs.line.style.left = `${left - HLeft}px`
            })
        }
    }
</script>

<style lang="scss" scoped>
    $tab-height: 40px;
    $blue: dodgerblue;
    $border-color: #ddd;
    .tabs-head {
        display: flex;
        height: $tab-height;
        justify-content: flex-start;
        position: relative;
        border-bottom: 1px solid $border-color;
        > .line {
            position: absolute;
            bottom: 0;
            border-bottom: 1px solid $blue;
            transition: all 350ms;
        }
        > .actions-wrapper {
            margin-left: auto;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 1em;
        }
    }
</style>