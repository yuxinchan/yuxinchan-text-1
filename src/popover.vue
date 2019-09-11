<template>
    <div class="popover" @click="onClick" ref="popover">
        <div ref="contentWrapper" class="content-wrapper" v-if="visible">
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
        methods: {
            positionContent() {
                document.body.appendChild(this.$refs.contentWrapper)
                let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
                this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
                this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
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
        transform: translateY(-100%);
        margin-top: -10px;
        max-width: 20em;
        word-break: break-all;
        &::before, &::after {
            content: '';
            display: block;
            border: 10px solid transparent;
            border-top-color: #333;
            width: 0;
            height: 5px;
            position: absolute;
            top: 100%;
            left: 10px;
        }
        &::before {
            border-top-color: #333;
            top: 100%;
        }
        &::after {
            border-top-color: #fff;
            top: calc(100% - 1px);
        }
    }
</style>