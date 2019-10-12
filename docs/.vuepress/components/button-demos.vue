<template>
    <div style="padding-top: 16px">

        <p>
            <strong>预览</strong>
        </p>
        <g-button>默认按钮</g-button>
        <g-button icon="settings">默认按钮</g-button>
        <g-button :loading="true">默认按钮</g-button>
        <g-button disabled>默认按钮</g-button>

        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content}}</code></pre>
    </div>
</template>
<script>
    import GButton from '../../../src/button/button'
    export default {
        components: {GButton},
        data() {
            return {
                content:
                    `
                        <g-button>默认按钮</g-button>
                        <g-button icon="settings">默认按钮</g-button>
                        <g-button :loading="true">默认按钮</g-button>
                        <g-button disabled>默认按钮</g-button>
                    `.replace(/\t+| +/g, '').trim()
            }
        }
    }
</script>