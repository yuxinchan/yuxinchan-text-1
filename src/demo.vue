<template>
    <div>
        <div style="padding: 20px;">
            <g-cascader
                    :source.sync="source"
                    popover-height="200px"
                    :selected.sync="selected"
                    :load-data="loadData"
            ></g-cascader>
        </div>
    </div>
</template>
<script>
    import Cascader from './cascader'
    import db from './db'
    import Popover from './popover'
    import {removeListener} from './click-outside'


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
            }, 3000)
        })
    }

    export default {
        name: 'demo',
        components: {
            'g-cascader': Cascader,
            'g-popover': Popover
        },
        data(){
            return {
                selected: [],
                source: []
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
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    img {
        max-width: 100%;
    }

    html {
        --font-size: 14px;
    }

    body {
        font-size: var(--font-size);
    }
</style>