<template>
    <div class="g-slides"
         @mouseenter="onMouseEnter"
         @mouseleave="onMouseLeave"
         @touchstart="onTouchStart"
         @touchmove="onTouchMove"
         @touchend="onTouchEnd"
    >
        <div class="g-slides-window" ref="window">
            <div class="g-slides-wrapper">
                <slot></slot>
            </div>
        </div>
        <div class="g-slides-dots">
            <span v-for="n in childrenLength"
                  :class="{active: selectedIndex === n-1}"
                  @click="select(n-1)"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            selected: {
                type: String
            },
            autoPlay: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                childrenLength: 0,
                lastSelectedIndex: undefined,
                timerId: undefined,
                startTouch: undefined,
                touchMoving: false
            }
        },
        mounted() {
            this.updateChildren()
            this.playAutomatically()
            this.childrenLength = this.$children.length
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
                return this.$children.map(vm => vm.name)
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
                this.touchMoving = true
                if (e.touches.length > 1) {return}
                this.startTouch = e.touches[0]
            },
            onTouchMove() {

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
            playAutomatically() {
                if (this.timerId) {return}
                let run = () => {
                    let index = this.names.indexOf(this.getSelected())
                    let newIndex = index + 1
                    this.select(newIndex)
                    this.timerId = setTimeout(run, 2000)
                }
                this.timerId = setTimeout(run, 2000)
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
                let first = this.$children[0]
                return this.selected || first.name
            },
            updateChildren() {
                let selected = this.getSelected()
                this.$children.forEach((vm) => {
                    let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
                    if (this.timerId || this.touchMoving) {
                        if (this.lastSelectedIndex === this.$children.length - 1 && this.selectedIndex === 0) {
                            reverse = false
                        }
                        if (this.lastSelectedIndex === 0 && this.selectedIndex === this.$children.length - 1) {
                            reverse = true
                        }
                    }
                    vm.reverse = reverse
                    this.$nextTick(() => {
                        vm.selected = selected
                    })
                })
                this.touchMoving = false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .g-slides {
        position: relative;
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
            > span {
                display: inline-block;
                margin: 0 0.5em;
                width: 1.5em;
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
    }
</style>