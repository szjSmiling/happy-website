import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import "@/styles/index.less";

// import zhCN from 'antd/lib/locale/zh_CN'
// import en_US from 'antd/lib/locale/en_US'
import '@/locale/i18n'


ReactDOM.render(
  <BrowserRouter>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </BrowserRouter>
  , document.getElementById('root')
)