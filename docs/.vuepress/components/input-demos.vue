<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-input value="输入"></g-input>
    <g-input value="禁止输入" disabled></g-input>
    <g-input value="只读" readonly></g-input>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import GInput from '../../../src/input'
  export default {
    components: {GInput},
    data() {
      return {
        content:
          `
            <g-input value="输入">输入</g-input>
            <g-input value="禁止输入" disabled>输入</g-input>
            <g-input value="只读" readonly>输入</g-input>
          `.replace(/\t+| +/g, '').trim()
      }
    }
  }
</script>