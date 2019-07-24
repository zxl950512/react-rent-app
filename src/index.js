/**
 * 调整目录结构
 * src 结构下的静态资源放在assets文件夹中
 * components：放公共的组件，多个页面都需要的组件
 * pages:放页面组件，
 * utils：工具性的函数和方法
 *
 *
 *
 *
 * 配置基础路由\
 * 安装 yarn add react-router-dom
 * 在App.js中配置路由规则
 * 在pages目录中创建页面组件
 * 首页Home/index.js
 *
 * 组件库pc端
 * ant design
 * 组件库手机端
 * ant design mobile
 */

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
// 引入样式字体图标的
// import First from './pages/index/index'
import 'antd-mobile/dist/antd-mobile.css'

ReactDOM.render(<App />, document.getElementById('root'))
