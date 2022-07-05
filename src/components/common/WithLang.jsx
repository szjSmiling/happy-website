import React, { PureComponent } from 'react'
import { withTranslation } from 'react-i18next';
// 高阶组件三种方式
// 高阶组件, 如果有需要翻译的需要用此包裹

// 方式1 , 继承（extends）原组件后返回一个新的class component
/**
  √ 原组件所在位置（能否被包裹或包裹其他组件）
  √ 能否取到或操作原组件的props
  √ 能否取到或操作state
  √ 能否通过ref访问到原组件中的dom元素
  √ 是否影响原组件生命周期等方法
  √ 是否取到原组件static方法
  √ 能否劫持原组件生命周期
  √ 能否渲染劫持
 */
// export default function withLang(WrappedComponent) {
//   class NewComponent extends WrappedComponent {
//     render() {
//       console.log(this.props);
//       return super.render();
//     }
//   }
//   NewComponent.displayName = "WithLang"; // 给组件重命名
//   return withTranslation()(NewComponent)
// }

// 方式2, 在新组件的render函数中返回一个新的class component
/**
  √ 原组件所在位置（能否被包裹或包裹其他组件）
  √ 能否取到或操作原组件的props
  乄 能否取到或操作state
  乄 能否通过ref访问到原组件中的dom元素
  √ 是否影响原组件生命周期等方法（如：componentWillReceiveProps）
  √ 是否取到原组件static方法
  X 能否劫持原组件生命周期
  乄 能否渲染劫持
 */
export default function withLang(WrappedComponent) {
  class NewComponent extends PureComponent {
    render() {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }
  NewComponent.displayName = "WithLang"; // 给组件重命名
  return withTranslation()(NewComponent)
}

// 方式3, 直接返回一个无状态组件, stateless component 没有自己的内部state及生命周期，所以这种方式常用于对组件的props进行简单统一的逻辑处理。
/**
  √ 原组件所在位置（能否被包裹或包裹其他组件）
  √ 能否取到或操作原组件的props
  乄 能否取到或操作state
  乄 能否通过ref访问到原组件中的dom元素
  X 是否影响原组件生命周期等方法：props无法更改，所以也不会影响到componentWillReceiveProps方法。
  √ 是否取到原组件static方法
  X 能否劫持原组件生命周期：同5。
  乄 能否渲染劫持
 */
// export default function withLang(WrappedComponent) {
//   const NewComponent = props => (<WrappedComponent {...props} />)
//   NewComponent.displayName = "WithLang"; // 给组件重命名
//   return withTranslation()(NewComponent)
// }
