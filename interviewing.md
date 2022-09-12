## React v17.0.2
___
### vue 和 react 的区别？
```js
1. 高效灵活
2. 声明式的设计，简单使用
3. 组件式开发，提高代码复用率
```
### 一、setState是同步还是异步？
1. 同步执行：原生事件和setTimeout setInterval等；
2. 异步执行：进入react的调度流程，比如：合成事件等；

>结论：只要你进入了 react 的调度流程，那就是异步的。只要你没有进入 react 的调度流程，那就是同步的。什么东西不会进入 react 的调度流程？ setTimeout setInterval ，直接在 DOM 上绑定原生事件等。这些都不会走 React 的调度流程，你在这种情况下调用 setState ，那这次 setState 就是同步的。 否则就是异步的。

>而 setState 同步执行的情况下， DOM 也会被同步更新，也就意味着如果你多次 setState ，会导致多次更新，这是毫无意义并且浪费性能的。

___
### 二、useState的setState
const [state, setState] = useState(0);
>注意：this.setState 的时候，它会自动帮我们做一个 state 的合并，而 hook 则不会。
* useState 的 set函数和this.setState 是没有区别的
* 函数组件中，setTimeout中 setState 是异步的
>结论：闭包问题。
>解决：setState((pre) => ({ state: ++pre })), 这样就可以同步获取更新的state;
___
### 三、事件机制

* React 所有事件都挂载在 document 对象上
* 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件
* 所以会先执行原生事件，然后处理 React 事件
* 最后真正执行 document 上挂载的事件

* 阻止合成事件间的冒泡，用e.stopPropagation()
* 阻止合成事件与最外层 document 上的事件间的冒泡，用e.nativeEvent.stopImmediatePropagation()
* 阻止合成事件与除最外层document上的原生事件上的冒泡，通过判断e.target来避免
```js
document.body.addEventListener('click', e => {   
  if (e.target && e.target.matches('div.code')) {  
    return;    
  }    
  this.setState({ active: false });
}); 

```
>结论:
1. React 上注册的事件最终会绑定在document这个 DOM 上，而不是 React 组件对应的 DOM
(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
2. React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
3. React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
4. React 有一套自己的合成事件 SyntheticEvent

### 四、函数组件和类组件的区别



### 五、类组件中为什么需要绑定this
>如果你使用了 ES6 的 class 语法，所有在 class 中声明的方法都会自动地使用严格模式
>当你使用 onClick={this.handleClick}来绑定事件监听函数的时候，handleClick 函数实际上会作为回调函数，传入 addEventListener() 。这就是为什么你在 React 的组件中添加事件处理函数为什么会得到 undefnied 而不是全局对象或者别的什么东西。
















