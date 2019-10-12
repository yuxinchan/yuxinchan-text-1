<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
    <g-row>
      <g-col span="2"
        :ipad="{span: 8}"
        :narrow-pc="{span: 4}"
        :pc="{span: 2}"
        :wide-pc="{span: 1}"
      >2</g-col>
      <g-col span="22"
             :ipad="{span: 16}"
             :narrow-pc="{span: 20}"
             :pc="{span: 22}"
             :wide-pc="{span: 23}"
      >22</g-col>
    </g-row>
    <g-row>
      <g-col span="4">2</g-col>
      <g-col span="18" offset="2">9</g-col>
    </g-row>
    <g-row>
      <g-col span="4">2</g-col>
      <g-col span="8" offset="2">4</g-col>
      <g-col span="6" offset="4">3</g-col>
    </g-row>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import GRow from '../../../src/grid/row'
  import GCol from '../../../src/grid/col'
  export default {
    components: {GRow, GCol},
    data() {
      return {
        content:
          `
            <g-row>
              <g-col span="2"
                :ipad="{span: 8}"
                :narrow-pc="{span: 4}"
                :pc="{span: 2}"
                :wide-pc="{span: 1}"
              >2</g-col>
              <g-col span="22"
                     :ipad="{span: 16}"
                     :narrow-pc="{span: 20}"
                     :pc="{span: 22}"
                     :wide-pc="{span: 23}"
              >22</g-col>
            </g-row>
            <g-row>
              <g-col span="4">2</g-col>
              <g-col span="18" offset="2">9</g-col>
            </g-row>
            <g-row>
              <g-col span="4">2</g-col>
              <g-col span="8" offset="2">4</g-col>
              <g-col span="6" offset="4">3</g-col>
            </g-row>


            //css样式
            <style lang="scss" scoped>
              .row {
                display: flex;
                margin: 10px 0;
                height: 50px;
                background: #eee;
                .col {
                  line-height: 50px;
                  text-align: center;
                  background: #333;
                  color: #fff;
                }
              }
            </style>
          `.replace(/^ {8}/gm, '').trim()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .row {
    display: flex;
    margin: 10px 0;
    height: 50px;
    background: #eee;
    .col {
      line-height: 50px;
      text-align: center;
      background: #333;
      color: #fff;
    }
  }
</style>