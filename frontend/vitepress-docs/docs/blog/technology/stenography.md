---
isBlog: true
---


## JavaScript 执行顺序：宏任务、微任务 和 事件循环
### 一、JavaScript 执行模型总览
JavaScript 是 `单线程`的，采用了 `事件循环机制（Event Loop）` 来实现异步处理。主要分为三部分：`宏任务（Macro Task）`、`微任务（Micro Task）`、`执行栈（Call Stack）`


### 二、宏任务（Macrotask）
`宏任务`是浏览器或 Node.js 提供的异步 API，它们会在 ·事件循环的每一轮`执行一次。
#### 常见宏任务
+ setTimeout
+ setInterval
+ setImmediate（Node.js）
+ MessageChannel（浏览器）
+ 整个 script 代码块（主任务）


### 三、微任务（Microtask）
`微任务`是在当前宏任务执行完之后、进入下一轮宏任务`之前`，执行的一批任务。
#### 常见微任务
+ Promise.then, catch, finally（async await是promise语法糖）
+ queueMicrotask
+ MutationObserver（浏览器）
+ process.nextTick（Node.js，优先级更高）
#### 微任务队列
+ 是一个队列（FIFO），按顺序执行
+ 每次宏任务执行完后，清空微任务队列
+ **新加入的微任务如果是当前轮产生的，也会立即执行**



### 四、事件循环（Event Loop）如何调度
#### 浏览器中的事件循环流程：
```
一个宏任务执行开始 →
   执行同步代码 →
   执行所有微任务（清空微任务队列） →
   浏览器渲染 →
进入下一轮事件循环
```
#### Node.js 中的事件循环流程：
```
timers → pending → idle → poll → check → close callbacks
          每个阶段执行完后都会清空微任务队列
```

### 五、经典例子
```

```

### 六、浏览器 vs Node.js 的事件循环差异
| 特性 | 浏览器 | Node.js |
|------|--------|---------|
| 宏任务结构 | 单一阶段 | 多阶段 (timers, check 等) |
| 微任务类型 | Promise, queueMicrotask | Promise, process.nextTick |
| 微任务清空时机 | 每个宏任务后 | 每个阶段后 |
| setTimeout vs setImmediate | setTimeout 总是先执行 | 顺序不确定 (取决于阶段) |

### 七、如何利用微任务优化代码
+ 在数据变化后通过 Promise.resolve().then(...) 代替 setTimeout(..., 0)，更快执行逻辑
+ 避免在微任务中产生无限递归微任务，可能导致主线程卡死
+ 使用 queueMicrotask 更加语义化地创建微任务（适用于 polyfill 或框架封装）

### 八、总结
> **微任务决定“快”，宏任务决定“先后”!**
>
> 理解事件循环，是写好异步 JavaScript 的核心。

| 关键词 | 概念简述 |
| ------ | -------- |
| 宏任务 | 整体任务的单元，事件循环一轮一个宏任务 |
| 微任务 | 更细粒度的异步任务，宏任务后立即执行 |
| 事件循环 | 控制宏任务与微任务调度的机制 |
| 浏览器 | 清晰：宏 → 微 → 渲染 |
| Node.js | 多阶段 + 特殊微任务（nextTick） |


## 参考链接
+ https://juejin.cn/post/7506038750398414900
+ 




