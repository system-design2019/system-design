# iView-project

This project is build for Vue.js 2 + vue-router + webpack2 + iView 3, just install and run.

## Install

iview环境安装

	npm install iview --save


进入到timeIsMoney的文件夹目录下

// install dependencies

	npm install

引入animate库

	npm install animate.css --save

### 修改样式库

1. 把当前文件夹内的iview.css和node_modules->ivew->dist->styles下ivew.css替换·
2. 将fonts文件夹中的【ionicons.woff2】文件放入node_modules->ivew->dist->styles->fonts文件夹中（也可以整个文件夹直接替换）


## Run

### Development
```bush
// For the first time, run init to create index.html

	npm run init

	npm run dev
```
### Production(Build)
```bush

	npm run build
<<<<<<< HEAD:frontend/README.md

```
### 2019年4月1日更新
1. 搭建了简单的路由框架（未完成）
2. router文件夹中的router.js中实现页间路由，通过修改后缀名完成，逻辑见代码，很简单
3. begin.vue中写了一个简单的索引到别的页面中的写法，在method里面

### 2019年4月17日 更新by宋晓彤

1. npm install iview-theme，但是最后没有使用，直接修改了ivew.css，将主题色调红
   颜色修改：#57a3f3->#CE4545 | #2b85e4->#CE4747 | #2d8cf0 -> #CE3535
2. 修改主界面sider样式为不可下拉可以收缩
3. 当前问题：没有静态文件夹，读取不到图片，直接写在html里，以及没有研究toggle的使用

### 2019年4月18日 更新by宋晓彤

1. 引入静态文件夹存放静态元素