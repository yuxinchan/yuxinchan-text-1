<template>
  <div style="padding-top: 16px">

    <p>
      <strong>预览</strong>
    </p>
      <div style="padding: 20px;">
        <g-cascader
            :source.sync="source"
            popover-height="200px"
            :selected.sync="selected"
            :load-data="loadData"
        ></g-cascader>
      </div>

    <p>
      <strong>代码</strong>
    </p>
    <pre><code>{{content}}</code></pre>
  </div>
</template>
<script>
  import GCascader from '../../../src/cascader/cascader'
  import db from '../../../tests/fixtures/db'
  import GPopover from '../../../src/popover'
  import {removeListener} from '../../../src/click-outside'


  function ajax(parentId = 0) {
    return new Promise((success, fail) => {
      setTimeout(() => {
        let result = db.filter((item) => item.parent_id == parentId)
        result.forEach(node => {
          if (db.filter(item => item.parent_id === node.id).length > 0) {
            node.isLeaf = false
          } else {
            node.isLeaf = true
          }
        })
        success(result)
      }, 0)
    })
  }

  export default {
    components: {GCascader, GPopover},
    data() {
      return {
        selected: [],
        source: [],
        content:
          `
            <g-cascader
               :source.sync="source"
                popover-height="200px"
                :selected.sync="selected"
                :load-data="loadData"
            ></g-cascader>
          `.replace(/^ {8}/gm, '').trim()
      }
    },
    created() {
      ajax(0).then(result => {
        this.source = result
      })
    },
    destroyed() {
      removeListener()
    },
    methods: {
      loadData({id}, updateSource) {
        ajax(id).then(result => {
          updateSource(result)
        })
      }
    }
  }
</script>