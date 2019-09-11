const expect = chai.expect;
import Vue from 'vue'
import Popover from '../src/popover'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Popover', () => {
    //BDD 行为驱动测试
    it('存在', () => {
        expect(Popover).to.exist
    })
    it('可以设置 position', (done) => {
        Vue.component('g-popover', Popover)
        const div = document.createElement('div')
        document.body.appendChild(div)
        div.innerHTML = `
            <g-popover position="bottom" ref="test">
                <template slot="content">
                    Content
                </template>
                <button>Click</button>
            </g-popover>
        `

        const vm = new Vue({
            el:div
        })

        vm.$el.querySelector('button').click()
        vm.$nextTick(() => {
            const {contentWrapper} = vm.$refs.test.$refs
            expect(contentWrapper.classList.contains('position-bottom')).to.be.true
            done()
        })
    })
})