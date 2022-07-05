import React, { Component } from 'react';
import MapApiLoaderHOC from 'react-bmapgl/Map/MapApiLoaderHOC'


// 异步加载JSAPI的高阶组件，在业务组件中使用，从而实现将JSAPI以异步形式插入
// 而不是提前放到`index.html`模板里。


export default function WithBaiDuMap (WrappedComponent) {
  class NewComponent extends Component {
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  NewComponent.displayName = "WithBaiDuMap"; // 给组件重命名
  return MapApiLoaderHOC({ ak: 'gIKfppDoOay3qLXTgbT2aZUprumFU2Cf' })(NewComponent)
}
