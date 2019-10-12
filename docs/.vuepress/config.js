module.exports = {
    base: '/yuxinchan-text-1/',
    title: 'UI Chan',
    description: '一个好用的UI框架',
    themeConfig: {
        sidebar: [
            {
                title: '入门',
                children:[
                    '/install/',
                    '/get-started/'
                ]
            },
            {
                title: '组件',
                children: [
                    '/components/button',
                    '/components/input',
                    '/components/grid',
                    '/components/layout',
                    '/components/toast',
                    '/components/tabs',
                    '/components/popover',
                    '/components/collapse',
                    '/components/cascader',
                    '/components/slides',
                    '/components/nav'
                ]
            }
        ]
    }
}