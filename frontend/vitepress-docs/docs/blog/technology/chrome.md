---
isBlog: true
---

# Chrome debug

## <strong>Reference: </strong>
* https://juejin.cn/post/7085135692568723492


## 1#. 一键重新发起请求
在与后端接口联调或排查线上BUG时，你是不是也经常听到他们说这句话：你再发起一次请求试试，我这边看下为啥出错了！

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择要重新发送的请求
4. 右键选择`Replay XHR`

<lazy-img class="chrome-image" src="blog/chrome/1.gif" />

## 2#. 在控制台快速发起请求
联调或修BUG的场景，针对同样的请求，有时候需要修改入参重新发起，有啥快捷方式？

1. 选中`Network`
2. 点击`Fetch/XHR`
3. 选择`Copy as fetch`
4. 控制台粘贴代码
5. 修改参数，回车搞定

<lazy-img class="chrome-image" src="blog/chrome/2.gif" />



## 3#. 一键展开所有DOM元素
调试元素时，在层级比较深的情况下，你是不是也经常一个个展开去调试？有一种更加快捷的方式



1. 按住opt键 + click（需要展开的最外层元素）

<lazy-img class="chrome-image" src="blog/chrome/3.gif" />

## 4#.  控制台获取Elements面板选中的元素
调试网页时通过`Elements`面板选中元素后，如果想通过JS知道它的一些属性，如宽、高、位置等怎么办呢？

1. 通过Elements选择要调试的元素
2. 控制台直接用$0访问

<lazy-img class="chrome-image" src="blog/chrome/4.gif" />

## 5#.  控制台引用上一次执行的结果
对某个字符串进行了各种工序，然后我们想知道每一步执行的结果，该咋办？。

```javascript
'fatfish'.split('').reverse().join('') // hsiftaf
```

### 你可能会这样做

```javascript
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
['f', 'a', 't', 'f', 'i', 's', 'h'].reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
['h', 's', 'i', 'f', 't', 'a', 'f'].join('') // hsiftaf
```

### 更简单的方式
使用`$_`引用上一次操作的结果，不用每次都复制一遍

```javascript
// 第1步
'fatfish'.split('') // ['f', 'a', 't', 'f', 'i', 's', 'h']
// 第2步
$_.reverse() // ['h', 's', 'i', 'f', 't', 'a', 'f']
// 第3步
$_.join('') // hsiftaf
```

## 6#. "$"和"$$"选择器
在控制台使用`document.querySelector`和`document.querySelectorAll`选择当前页面的元素是最常见的需求了，不过着实有点太长了，咱们可以使用$和$$替代。

## 7.# $i直接在控制台安装npm包
有时候想使用比如`dayjs`或者`lodash`的某个`API`，但是又不想去官网查，如果可以在控制台直接试出来就好了。

[Console Importer](https://chrome.google.com/webstore/detail/console-importer/hgajpakhafplebkdljleajgbpdmplhie/related) 就是这么一个插件，用来在控制台直接安装`npm`包。

1. 安装Console Importer插件
2. $i('name')安装npm包

<lazy-img class="chrome-image" src="blog/chrome/7.gif" />

## 8.# Add conditional breakpoint条件断点的妙用

假设有下面这段代码，咱们希望食物名字是🍫时才触发断点，可以怎么弄？

```javascript
const foods = [
  {
    name: '🍔',
    price: 10
  },
  {
    name: '🍫',
    price: 15
  },
  {
    name: '🍵',
    price: 20
  },
]

foods.forEach((v) => {
  console.log(v.name, v.price)
})
```
这在大量数据下，只想对符合条件时打断点条件将会非常方便。试想如果没有条件断点咱们是不是要点n次debugger？

<lazy-img class="chrome-image" src="blog/chrome/8.gif" />
