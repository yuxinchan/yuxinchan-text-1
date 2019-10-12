<template>
    <transition name="slide">
        <div class="sider" v-if="visiable" :foldable="foldable">
            <button v-if="foldable" @click="visiable=false">close</button>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'GuluSider',
        props: {
            foldable: {
                type: [Boolean, String],
                default: false
            }
        },
        data() {
            return {
                visiable: true
            }
        },
        methods: {

        }
    }
</script>

<style lang="scss" scoped>
    .sider {
        position: relative;
        > button {
            position: absolute;
            top: 0;
            right: 0;
        }
    }
    .slide-enter-active, .slide-leave-active {
        transition: all .5s;
    }
    .slide-enter, .slide-leave-to {
        margin-left: -100px;
    }
</style>