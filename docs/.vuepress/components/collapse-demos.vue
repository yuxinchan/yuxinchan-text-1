<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-collapse :selected.sync="selectedTab" single>
      <g-collapse-item title="title1" name="1">content1</g-collapse-item>
      <g-collapse-item title="title2" name="2">content2</g-collapse-item>
      <g-collapse-item title="title3" name="3">content3</g-collapse-item>
    </g-collapse>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content1}}</code></pre>


    <h2>可多选</h2>
    <p>
      <strong>预览</strong>
    </p>
    <g-collapse :selected.sync="selectedTab">
      <g-collapse-item title="title1" name="1">content1</g-collapse-item>
      <g-collapse-item title="title2" name="2">content2</g-collapse-item>
      <g-collapse-item title="title3" name="3">content3</g-collapse-item>
    </g-collapse>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content2}}</code></pre>
  </div>
</template>
<script>
  import GCollapse from '../../../src/collapse/collapse'
  import GCollapseItem from '../../../src/collapse/collapse-item'
  export default {
    components: {GCollapse, GCollapseItem},
    data() {
      return {
        selectedTab: ['2'],
        content1:
          `
            <g-collapse :selected.sync="selectedTab" single>
              <g-collapse-item title="title1" name="1">content1</g-collapse-item>
              <g-collapse-item title="title2" name="2">content2</g-collapse-item>
              <g-collapse-item title="title3" name="3">content3</g-collapse-item>
            </g-collapse>
          `.replace(/^ {8}/gm, '').trim(),
        content2:
          `
            <g-collapse :selected.sync="selectedTab">
              <g-collapse-item title="title1" name="1">content1</g-collapse-item>
              <g-collapse-item title="title2" name="2">content2</g-collapse-item>
              <g-collapse-item title="title3" name="3">content3</g-collapse-item>
            </g-collapse>
          `.replace(/^ {8}/gm, '').trim()
      }
    }
  }
</script>