import  React  from 'react';
class Index extends React.Component{

  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }
  componentDidMount() {
    console.log("React componentDidMount！");
    this.parentRef.current?.addEventListener("click", () => {
      console.log("原生事件：父元素 DOM 事件监听！");
    });
    this.childRef.current?.addEventListener("click", () => {
      console.log("原生事件：子元素 DOM 事件监听！");
    });
    document.addEventListener("click", (e) => {
      console.log("原生事件：document DOM 事件监听！");
    });
    // 同步任务: 1/'1'/3/[p2.resolve1, p2.resolve2]
    // 微任务队列 [p1.then1, fn.then, fn.promise.then, p2.then1, finally1]
    // 宏任务队列 [timer1, timer2, timer3, timer4]
    // 1/p1 1/3/p2.then1 resovle1/p2.then1 .then/p2.finally1 undefined/p2.then2 undefined/p2.finally2 undefined/resolve2/timer1/p1.then1 promise1/timer2/resolve3/timer3/timer4
    console.log(1);
    let p1 = new Promise((resolve) => {
      const timer1 = setTimeout(() => {
        console.log('timer1');
      }, 0)
      resolve('promise1')
      console.log('p1 1');
    }).then(res => {
      console.log('p1.then1', res);
      // return Promise.resolve('11111')
    }).then(res => {
      console.log('p1.then2', res);
    })
    const timer2 = setTimeout(() => {
      console.log('timer2');
    }, 0)
    async function fn () {
      const a = await new Promise((resolve) => {
        console.log('fn promise');
        resolve('resolve')
      })
      // .then((res) => {console.log('fn.promise.then', res)})
      console.log(3, a);
      return 3
    }
    fn().then(res => {
      console.log('fn.then', res);
    })
    const p2 = new Promise((resolve) => {
      const timer3 = setTimeout(() => {
        resolve('resolve3');
        console.log('timer3')
      }, 0)
      // resolve('resovle1');
      // resolve('resolve2');
    }).then(res => {
      console.log('p2.then1', res)
      Promise.resolve().then(() => {
        console.log('p2.then1', '.then')
      }, 0)
      const timer4 = setTimeout(() => {
        console.log('timer4')
      }, 0)
    }).finally((res) => {
      console.log('p2.finally1', res)
    }).then((res) => {
      console.log('p2.then2', res);
    }).finally(res => {
      console.log('p2.finally2', res)
    }).then((res) => {
      console.log('p2.then3', res);
    })
    console.log('同步代码');
    const timer5 = setTimeout(() => {
      console.log('timer5');
    }, 0)
  }
  parentClickFun = (e) => {
    console.log("React 事件：父元素事件监听！");
  };
  childClickFun = (e) => {
    console.log("React 事件：子元素事件监听！");
    e.stopPropagation(); // 组织合成事件冒泡
    // e.nativeEvent.stopImmediatePropagation(); // 阻止document事件
  };
  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    );
  }
}
export default Index;