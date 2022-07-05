## React v17.0.2
___
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
### 三、
















