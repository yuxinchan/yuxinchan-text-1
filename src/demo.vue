<template>
    <div>
        <p>{{selected && selected[0] && selected[0].name || '未选择'}}</p>
        <p>{{selected && selected[1] && selected[1].name || '未选择'}}</p>
        <p>{{selected && selected[2] && selected[2].name || '未选择'}}</p>
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


    function ajax(parentId = 0) {
        return new Promise((success, fail) => {
            setTimeout(() => {
                let result = db.filter((item) => item.parent_id == parentId)
                success(result)
            }, 200)
        })
    }

    export default {
        name: 'demo',
        components: {
            'g-cascader': Cascader
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
        methods: {
            loadData({id}, updateSource) {
                ajax(id).then(result => {
                    updateSource(result)
                })
            },
            xxx() {
                ajax(this.selected[0].id).then(result => {
                    let lastLevelSelected = this.source.filter(item => item.id === this.selected[0].id)[0]
                    //
                    this.$set(lastLevelSelected, 'children', result)
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