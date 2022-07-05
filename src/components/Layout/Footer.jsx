import React from 'react'
import { Tag, Space } from 'antd'

export default function Footer() {
  return (
    <div className='szj-footer'>
      <Space size={16}>
        <a className='szj-href' href="http://www.beian.gov.cn/" target="_blank">豫ICP备18009561号</a>
        <a className='szj-email' href="mailto:958306134@qq.com">EMail-To</a>
        <Tag>个人博客V1.0.0</Tag>
      </Space>
    </div>
  )
}
