<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-layout class="layout-demo" style="height: 300px">
      <g-sider class="demo">sider</g-sider>
      <g-layout>
        <g-header class="demo">header</g-header>
        <g-content class="demo">content</g-content>
        <g-footer class="demo">footer</g-footer>
      </g-layout>
    </g-layout>
    <g-layout class="layout-demo" style="height: 300px">
      <g-header class="demo">header</g-header>
      <g-layout>
        <g-sider class="demo">sider</g-sider>
        <g-content class="demo with-sider">
          content
        </g-content>
      </g-layout>
      <g-footer class="demo">footer</g-footer>
    </g-layout>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import GLayout from '../../../src/layout/layout'
  import GSider from '../../../src/layout/sider'
  import GHeader from '../../../src/layout/header'
  import GContent from '../../../src/layout/content'
  import GFooter from '../../../src/layout/footer'
  export default {
    components: {GLayout, GSider, GHeader, GContent, GFooter},
    data() {
      return {
        content:
          `
            <g-layout class="layout-demo" style="height: 300px">
              <g-sider class="demo">sider</g-sider>
              <g-layout>
                <g-header class="demo">header</g-header>
                <g-content class="demo">content</g-content>
                <g-footer class="demo">footer</g-footer>
              </g-layout>
            </g-layout>
            <g-layout class="layout-demo" style="height: 300px">
              <g-header class="demo">header</g-header>
              <g-layout>
                <g-sider class="demo">sider</g-sider>
                <g-content class="demo with-sider">
                  content
                </g-content>
              </g-layout>
              <g-footer class="demo">footer</g-footer>
            </g-layout>


            //css样式
            <style lang="scss" scoped>
              .layout-demo {
                margin: 10px 0;
                overflow: hidden;
              }
              .layout {
                display: flex;
                flex-grow: 1;
                flex-direction: column;
                background: #eee;
              }
              .demo {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100px;
                color: #fff;
              }
              .sider {
                width: 100px;
                background: #999;
              }
              .header {
                background: #555;
              }
              .content {
                background: #333;
              }
              .footer {
                background: #777;
              }
              .with-sider {
                flex-shrink: 1;
              }
          `.replace(/^ {8}/gm, '').trim()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .layout-demo {
    margin: 10px 0;
    overflow: hidden;
  }
  .layout {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: #eee;
  }
  .demo {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    color: #fff;
  }
  .sider {
    width: 100px;
    background: #999;
  }
  .header {
    background: #555;
  }
  .content {
    background: #333;
  }
  .footer {
    background: #777;
  }
  .with-sider {
    flex-shrink: 1;
  }
</style>