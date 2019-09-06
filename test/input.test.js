const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    //BDD 行为驱动测试
    it('存在.', () => {
        expect(Input).to.be.ok
    })

    describe('props', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })

        it('接收 value', () => {
            vm = new Constructor({
                propsData: {
                    value: '1'
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('1')
        })

        it('接收 disabled', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
        })

        it('接收 readonly', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.readOnly).to.equal(true)
        })

        it('接收 error', () => {
            vm = new Constructor({
                propsData: {
                    error: 'error'
                }
            }).$mount()
            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-error')
            const errorElement = vm.$el.querySelector('.errorMessage')
            expect(errorElement.innerText).to.equal('error')
        })

        it('接收 success', () => {
            vm = new Constructor({
                propsData: {
                    success: 'success'
                }
            }).$mount()
            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-success')
            const successElement = vm.$el.querySelector('.successMessage')
            expect(successElement.innerText).to.equal('success')
        })
    })

    describe('事件', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })

        it('支持 change/input/focus/blur 事件', () => {
            ['change', 'input', 'focus', 'blur']
                .forEach((eventName) => {
                    vm = new Constructor({}).$mount()
                    const callback = sinon.fake()
                    vm.$on(eventName, callback)
                    let event = new Event(eventName)
                    let inputElement = vm.$el.querySelector('input')
                    inputElement.dispatchEvent(event)
                    expect(callback).to.have.been.calledWith(event)
                })
        })

        /*it('支持 change 事件', () => {
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('change', callback)
            //触发 input 的 change 事件
            let event = new Event('change')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持 input 事件', () => {
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('input', callback)
            //触发 input 的 input 事件
            let event = new Event('input')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持 focus 事件', () => {
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('focus', callback)
            //触发 input 的 focus 事件
            let event = new Event('focus')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })

        it('支持 blur 事件', () => {
            vm = new Constructor({}).$mount()
            const callback = sinon.fake()
            vm.$on('blur', callback)
            //触发 input 的 blur 事件
            let event = new Event('blur')
            let inputElement = vm.$el.querySelector('input')
            inputElement.dispatchEvent(event)
            expect(callback).to.have.been.calledWith(event)
        })*/
    })
})