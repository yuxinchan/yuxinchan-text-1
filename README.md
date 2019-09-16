# 一个 Vue UI 组件

[![Build Status](https://www.travis-ci.org/yuxinchan/yuxinchan-text-1.svg?branch=master)](https://www.travis-ci.org/yuxinchan/yuxinchan-text-1)

## 介绍

这是一个 按钮 UI 框架

## 开始使用

1. 添加 CSS 样式

    使用本框架前，请在 CSS 中开启 border-box
    
    ```
    *,*::before,*::after{box-sizing: border-box;}
    ```
    IE 8 及以上的浏览器都支持以上样式
    
    另外你还需设置默认颜色等变量（后续会改为 SCSS 变量）
    ```
    html {
        --button-height: 32px;
        --font-size: 14px;
        --button-bg: white;
        --button-active-bg: #eee;
        --border-radius: 4px;
        --border-color: #999;
        --border-color-hover: #666;
        --color: #333;
    }
    ```
    IE 15 及以上的浏览器都支持以上样式
    
2. 安装
    ```
       npm i --save yuxinchan-gulu
    ```
 
3. 引入
    ```
    import {Button, ButtonGroup, Icon} from 'yuxinchan-gulu'
    import 'yuxinchan-gulu/dist/index.css'
    
    export default {
        name: 'app',
        components: {
            HelloWorld,
            'g-button': Button,
            'g-icon': Icon
        }
    }
    ```

## 文档

## 提问

## 变更记录

## 联系方式

## 贡献代码