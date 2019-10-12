<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-popover>
      <g-button>上方弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="bottom">
      <g-button>下方弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="left">
      <g-button>左边弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="right">
      <g-button>右边弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content1}}</code></pre>



    <h2>将触发方式改为 hover</h2>
    <p>
      <strong>预览</strong>
    </p>

    <g-popover trigger="hover">
      <g-button>上方弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="bottom" trigger="hover">
      <g-button>下方弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="left" trigger="hover">
      <g-button>左边弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>
    <g-popover position="right" trigger="hover">
      <g-button>右边弹出</g-button>
      <template slot="content">
        弹出内容
      </template>
    </g-popover>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content2}}</code></pre>
  </div>
</template>
<style>
</style>
<style scoped>
</style>
<script>
  import GButton from '../../../src/button/button'
  import GPopover from '../../../src/popover'


  export default {
    components: {GButton, GPopover},
    data () {
      return {
        content1: `
          <g-popover>
            <g-button>上方弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="bottom">
            <g-button>下方弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="left">
            <g-button>左边弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="right">
            <g-button>右边弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
      `.replace(/^ {8}/gm, '').trim(),

        content2: `
          <g-popover trigger="hover">
            <g-button>上方弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="bottom" trigger="hover">
            <g-button>下方弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="left" trigger="hover">
            <g-button>左边弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
          <g-popover position="right" trigger="hover">
            <g-button>右边弹出</g-button>
            <template slot="content">
              弹出内容
            </template>
          </g-popover>
      `.replace(/^ {8}/gm, '').trim()
      }
    },
    methods: {
      onClickButton () {
        this.$toast('<strong style="color:red;">加粗的提示</strong>', {
          enableHtml: true
        })
      }
    },
  }
</script>