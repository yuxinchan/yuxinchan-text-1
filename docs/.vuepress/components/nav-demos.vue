<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-nav :selected.sync="selected">
      <g-nav-item name="home">首页</g-nav-item>
      <g-nav-item name="edit">编辑</g-nav-item>
      <g-sub-nav name="about">
        <template slot="title">关于</template>
        <g-nav-item name="culture">企业文化</g-nav-item>
        <g-nav-item name="developers">开发团队</g-nav-item>
        <g-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <g-nav-item name="wechat">微信</g-nav-item>
          <g-nav-item name="qq">QQ</g-nav-item>
          <g-sub-nav name="phone">
            <template slot="title">手机</template>
            <g-nav-item name="cu">联通</g-nav-item>
            <g-nav-item name="cm">移动</g-nav-item>
            <g-nav-item name="cn">电信</g-nav-item>
          </g-sub-nav>
        </g-sub-nav>
      </g-sub-nav>
    </g-nav>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import GNav from '../../../src/nav/nav.vue'
  import GNavItem from '../../../src/nav/nav-item.vue'
  import GSubNav from '../../../src/nav/sub-nav.vue'
  import {removeListener} from '../../../src/click-outside'
  export default {
    components: {GNav, GNavItem, GSubNav},
    data() {
      return {
        selected: ['home'],
        content:
          `
            <g-nav :selected.sync="selected">
              <g-nav-item name="home">首页</g-nav-item>
              <g-nav-item name="edit">编辑</g-nav-item>
              <g-sub-nav name="about">
                <template slot="title">关于</template>
                <g-nav-item name="culture">企业文化</g-nav-item>
                <g-nav-item name="developers">开发团队</g-nav-item>
                <g-sub-nav name="contacts">
                  <template slot="title">联系方式</template>
                  <g-nav-item name="wechat">微信</g-nav-item>
                  <g-nav-item name="qq">QQ</g-nav-item>
                  <g-sub-nav name="phone">
                    <template slot="title">手机</template>
                    <g-nav-item name="cu">联通</g-nav-item>
                    <g-nav-item name="cm">移动</g-nav-item>
                    <g-nav-item name="cn">电信</g-nav-item>
                  </g-sub-nav>
                </g-sub-nav>
              </g-sub-nav>
            </g-nav>
          `.replace(/^ {8}/gm, '').trim()
      }
    },
    destroyed() {
      removeListener()
    }
  }
</script>