<template>
    <div class="g-sub-nav" :class="{active}" v-click-outside="close">
        <span class="g-sub-nav-label" @mouseenter="onMouseEnter">
            <slot name="title"></slot>
            <span class="g-sub-nav-icon" :class="{open}">
                <g-icon name="right"></g-icon>
            </span>
        </span>
        <div class="g-sub-nav-popover" v-show="open">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import ClickOutside from '../click-outside'
    import GIcon from '../icon'
    export default {
        components: {GIcon},
        directives: {ClickOutside},
        name: "GuluSubNav",
        inject: ['root'],
        props: {
            name: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                open: false
            }
        },
        computed: {
            active() {
                return this.root.namePath.indexOf(this.name) >= 0 ? true : false
            }
        },
        methods: {
            onMouseEnter() {
                this.open = !this.open
            },
            close() {
                this.open = false
            },
            updateNamePath() {
                this.root.namePath.unshift(this.name)
                if (this.$parent.updateNamePath) {
                    this.$parent.updateNamePath()
                } else {

                }
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "var";
    .g-sub-nav {
        position: relative;
        &.active {
            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                border-bottom: 2px solid $blue;
                width: 100%;
            }
        }
        &-label {
            display: block;
            padding: 10px 20px;
        }
        &-icon {
            display: none;
        }
        &-popover {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: 4px;
            white-space: nowrap;
            background: #fff;
            box-shadow: 0 0 3px fade_out(black, 0.8);
            border-radius: $border-radius;
            color: $light-color;
            font-style: $font-size;
            min-width: 6em;
        }
    }
    .g-sub-nav .g-sub-nav{
        &.active {
            &::after {
                display: none;
            }
        }
        .g-sub-nav-popover {
            top: 0;
            left: 100%;
            margin-left: 4px;
        }
        .g-sub-nav-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .g-sub-nav-icon {
            transition: transform 200ms;
            display: inline-flex;
            margin-left: 1em;
            svg{fill: $light-color}
            &.open {
                transform: rotate(180deg);
            }
        }
    }
</style>