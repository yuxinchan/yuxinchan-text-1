<template>
    <div class="popover" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible"
        :class="{[`position-${position}`]: true}">
            <slot name="content"></slot>
        </div>
        <span ref="triggerWrapper" style="display: inline-block">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: 'GuluPopover',
        data() {
            return {visible: false}
        },
        props: {
            position: {
                type: String,
                default: 'top',
                validator(value) {
                    return ['top', 'left', 'bottom', 'right'].indexOf(value) >= 0
                }
            },
            trigger: {
                type: String,
                default: 'click',
                validator(value) {
                    return ['click', 'hover'].indexOf(value) >= 0
                }
            }
        },
        computed: {
            openEvent() {
                if (this.trigger === 'click') {
                    return 'click'
                } else {
                    return 'mouseenter'
                }
            },
            closeEvent() {
                if (this.trigger === 'click') {
                    return 'click'
                } else {
                    return 'mouseleave'
                }
            }
        },
        mounted() {
            if (this.trigger === 'click') {
                this.$refs.popover.addEventListener('click', this.onClick)
            } else {
                this.$refs.popover.addEventListener('mouseenter', this.open)
                this.$refs.popover.addEventListener('mouseleave', this.close)
            }
        },
        destroyed() {
            if (this.trigger === 'click') {
                this.$refs.popover.removeEventListener('click', this.onClick)
            } else {
                this.$refs.popover.removeEventListener('mouseenter', this.open)
                this.$refs.popover.removeEventListener('mouseleave', this.close)
            }
        },
        methods: {
            positionContent() {
                const {contentWrapper, triggerWrapper} = this.$refs
                document.body.appendChild(contentWrapper)
                const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
                const {height: height2} = contentWrapper.getBoundingClientRect()
                let positions = {
                    top: {
                        top: top + window.scrollY,
                        left: left + window.scrollX
                    },
                    bottom: {
                        top: top + height + window.scrollY,
                        left: left + window.scrollX
                    },
                    left: {
                        top: top + window.scrollY + (height - height2) / 2,
                        left: left + window.scrollX
                    },
                    right: {
                        top: top + window.scrollY + (height - height2) / 2,
                        left: left + width + window.scrollX
                    }
                }
                contentWrapper.style.left = positions[this.position].left + 'px'
                contentWrapper.style.top = positions[this.position].top + 'px'
                // if (this.position === 'top') {
                //     contentWrapper.style.left = left + window.scrollX + 'px'
                //     contentWrapper.style.top = top + window.scrollY + 'px'
                // } else if (this.position === 'bottom') {
                //     contentWrapper.style.left = left + window.scrollX + 'px'
                //     contentWrapper.style.top = top + height + window.scrollY + 'px'
                // } else if (this.position === 'left') {
                //     contentWrapper.style.left = left + window.scrollX + 'px'
                //     contentWrapper.style.top = top + window.scrollY +
                //         (height - height2) / 2 + 'px'
                // } else {
                //     contentWrapper.style.left = left + width + window.scrollX + 'px'
                //     contentWrapper.style.top = top + window.scrollY +
                //         (height - height2) / 2 + 'px'
                // }
            },
            onClickDocument(e) {
                if (this.$refs.popover  &&
                    (this.$refs.popover.contains(e.target) || this.$refs.popover === e.target)
                ) {return}
                if (this.$refs.contentWrapper  &&
                    (this.$refs.contentWrapper.contains(e.target) || this.$refs.contentWrapper === e.target)
                ) {return}
                this.close()
            },
            open() {
                this.visible = true
                this.$nextTick(() => {
                    this.positionContent()
                    document.addEventListener('click', this.onClickDocument)
                })
            },
            close() {
                this.visible = false
                document.removeEventListener('click', this.onClickDocument)
            },
            onClick(event) {
                if (this.$refs.triggerWrapper.contains(event.target)) {
                    if (this.visible === true) {
                        this.close()
                    } else {
                        this.open()
                    }
                }

                // this.visible = !this.visible
                // if (this.visible === true) {
                //     this.$nextTick(() =>{
                //         document.body.appendChild(this.$refs.contentWrapper)
                //         let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
                //         this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                //         this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
                //         let eventHandler = () => {
                //             this.visible = false
                //             document.removeEventListener('click', eventHandler)
                //         }
                //         document.addEventListener('click', eventHandler)
                //     })
                // } else {
                //
                // }
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-color: #333;
    $border-radius: 4px;
    .popover {
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper {
        position: absolute;
        border: 1px solid $border-color;
        border-radius: $border-radius;
        padding: .5em 1em;
        filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
        background: #fff;
        max-width: 20em;
        word-break: break-all;
        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            position: absolute;
        }
        &.position-top {
            margin-top: -13px;
            transform: translateY(-100%);
            &::before, &::after {
                width: 0;
                height: 5px;
                left: 10px;
            }
            &::before {
                border-bottom: none;
                border-top-color: #333;
                top: 100%;
            }
            &::after {
                border-bottom: none;
                border-top-color: #fff;
                top: calc(100% - 1px);
            }
        }
        &.position-bottom {
            margin-top: 13px;
            &::before, &::after {
                width: 0;
                height: 5px;
                left: 10px;
                border-top: none;
            }
            &::before {
                border-bottom-color: #333;
                bottom: 100%;
            }
            &::after {
                border-bottom-color: #fff;
                bottom: calc(100% - 1px);
            }
        }
        &.position-left {
            max-width: 5em;
            transform: translateX(-100%);
            margin-left: -13px;
            &::before, &::after {
                width: 5px;
                height: 0;
                transform: translateY(-50%);
                top: 50%;
                border-right: none;
            }
            &::before {
                border-left-color: #333;
                left: 100%;
            }
            &::after {
                border-left-color: #fff;
                left: calc(100% - 1px);
            }
        }
        &.position-right {
            max-width: 5em;
            margin-left: 13px;
            &::before, &::after {
                width: 5px;
                height: 0;
                transform: translateY(-50%);
                top: 50%;
                border-left: none;
            }
            &::before {
                border-right-color: #333;
                right: 100%;
            }
            &::after {
                border-right-color: #fff;
                right: calc(100% - 1px);
            }
        }
    }
</style>