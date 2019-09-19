<template>
    <div class="g-slides"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
         @touchstart="onTouchStart"
         @touchend="onTouchEnd"
    >
        <div class="g-slides-window" ref="window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <span class="g-slides-left" @click="onClickPrev">
            <g-icon name="left" fill="#fff"></g-icon>
        </span>
        <span class="g-slides-right" @click="onClickNext">
            <g-icon name="right" fill="#fff"></g-icon>
        </span>
        <div class="g-slides-dots">
            <span v-for="n in childrenLength"
                  class="tinyBlock"
                  :class="{active: selectedIndex === n-1}"
                  :key="n" :data-index="n-1"
                  @click="select(n-1)"
            ></span>
        </div>
    </div>
</template>

<script>
    import GIcon from '../icon'
    export default {
        components: {GIcon},
        props: {
            selected: {
                type: String
            },
            autoPlay: {
                type: Boolean,
                default: true
            },
            autoPlayDelay: {
                type: Number,
                default: 2000
            }
        },
        data() {
            return {
                childrenLength: 0,
                lastSelectedIndex: undefined,
                timerId: undefined,
                startTouch: undefined,
                letMoving: false
            }
        },
        mounted() {
            this.updateChildren()
            if (this.autoPlay) {
                this.playAutomatically()
            }
            this.childrenLength = this.items.length
        },
        updated() {
            this.updateChildren()
        },
        computed: {
            selectedIndex() {
                let index = this.names.indexOf(this.selected)
                return index === -1 ? 0 : index
            },
            names() {
                return this.items.map(vm => vm.name)
            },
            items() {
                return this.$children.filter(vm => vm.$options.name === 'GuluSlidesItem')
            }
        },
        methods: {
            onMouseEnter() {
                this.pause()
            },
            onMouseLeave() {
                this.playAutomatically()
            },
            onTouchStart(e) {
                this.pause()
                this.letMoving = true
                if (e.touches.length > 1) {return}
                this.startTouch = e.touches[0]
            },
            onTouchEnd(e) {
                let endTouch = e.changedTouches[0]
                let {clientX:x1, clientY: y1} = this.startTouch
                let {clientX:x2, clientY: y2} = endTouch
                let distant = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2))
                let daltaY = Math.abs(y2 - y1)
                let rate = distant / daltaY
                if (rate > 2) {
                    if (x2 > x1) {
                        this.select(this.selectedIndex - 1)
                    } else {
                        this.select(this.selectedIndex + 1)
                    }
                }
                this.$nextTick(() => {
                    this.playAutomatically()
                })
            },
            onClickPrev() {
                this.letMoving = true
                this.select(this.selectedIndex - 1)
            },
            onClickNext() {
                this.letMoving = true
                this.select(this.selectedIndex + 1)
            },
            playAutomatically() {
                if (this.timerId) {return}
                let run = () => {
                    let index = this.names.indexOf(this.getSelected())
                    let newIndex = index + 1
                    this.select(newIndex)
                    this.timerId = setTimeout(run, this.autoPlayDelay)
                }
                this.timerId = setTimeout(run, this.autoPlayDelay)
            },
            pause() {
                window.clearTimeout(this.timerId)
                this.timerId = undefined
            },
            select(newIndex) {
                this.lastSelectedIndex = this.selectedIndex
                if (newIndex === -1) {newIndex = this.names.length - 1}
                if (newIndex === this.names.length) {newIndex = 0}
                this.$emit('update:selected', this.names[newIndex])
            },
            getSelected() {
                let first = this.items[0]
                return this.selected || first.name
            },
            updateChildren() {
                let selected = this.getSelected()
                this.items.forEach((vm) => {
                    let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
                    if (this.timerId || this.letMoving) {
                        if (this.lastSelectedIndex === this.items.length - 1 && this.selectedIndex === 0) {
                            reverse = false
                        }
                        if (this.lastSelectedIndex === 0 && this.selectedIndex === this.items.length - 1) {
                            reverse = true
                        }
                    }
                    vm.reverse = reverse
                    this.$nextTick(() => {
                        vm.selected = selected
                    })
                })
                this.letMoving = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-slides {
        position: relative;
        min-width: 12em;
        &-window {
            overflow: hidden;
        }
        &-wrapper {
            position: relative;
        }
        &-dots {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 2em;
            > .tinyBlock {
                display: inline-block;
                margin: 0 0.5em;
                width: 1em;
                height: 0.5em;
                background: #666;
                &:hover {
                    cursor: pointer;
                }
                &.active {
                    background: #fff;
                    &:hover {
                        cursor: default;
                    }
                }
            }
        }
        &-left, &-right {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            > .g-icon {
                width: 2em;
                height: 2em;
            }
        }
        &-left {
            left: 1em;
        }
        &-right {
            right: 1em;
        }
    }
</style>