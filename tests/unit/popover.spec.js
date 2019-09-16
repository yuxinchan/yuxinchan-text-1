import chai, { expect } from 'chai'
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
import { shallowMount, mount } from "@vue/test-utils";
import Popover from '@/popover.vue'
chai.use(sinonChai)

describe('Popover', () => {
    //BDD 行为驱动测试
    it('存在', () => {
        expect(Popover).to.exist
    })
    it('可以设置 position', () => {
        const wrapper = mount(Popover, {
            slots: {
                default: {template: `<button>click me</button>`},
                content: '<div>content</div>'
            },
            propsData: {
                position: 'bottom'
            }
        })
        wrapper.find('button').trigger('click')
        let classes = wrapper.find('.content-wrapper').classes()
        expect(classes).to.includes('position-bottom')
    })
    it('可以设置 trigger', () => {
        const wrapper = mount(Popover, {
            slots: {
                default: {template: `<button>click me</button>`},
                content: '<div>content</div>'
            },
            propsData: {
                position: 'bottom',
                trigger: 'hover'
            }
        })
        expect(wrapper.find('.content-wrapper').element).to.not.exist
        wrapper.find('.popover').trigger('mouseenter')
        expect(wrapper.find('.content-wrapper').element).to.exist
    })
})