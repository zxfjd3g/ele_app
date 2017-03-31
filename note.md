# day01
## 准备
* 项目描述
* 技术选型
* API接口相关概念
* 模块与组件
* 模块化/组件化/工程化
* 拆分组件

## 搭建项目骨架
* 使用vue-cli创建模板项目
  * npm install vue-cli -g
  * vue init webpack#1.0
  * vue + webpack + ES6 + ESlint
* 使用stylus编写样式
  * npm install stylus stylus-loader --save
  * 编写全局的stylus
  * 在vue中使用stylus编写样式
* 使用vue-router实现SPA
  * npm install vue-router@0.7.13
  * import-->use-->new-->map-->start-->go
  * v-link--><router-view>
* mock数据
  * 项目前后台分离
  * JSON数据结构
  * 使用express提供JSON数据接口
  * 使用postman测试接口
* 使用vue-resource实现ajax请求
  * npm install vue-resource
  * import-->use-->this.$http.get/post().then()

## header组件
  * 从组件外向组件内部传递数据
    * props
    * 标签属性
  * ajax请求在哪个组件的哪个方法中发送
  * 图片也是组件的一部分
  * 在模板中读取对象的属性, 有时需要先判断是否存在
  * 如何根据数据的不同显示不同效果
  * 控制UI的可见性

## star组件
  * 分析组件的props
  * 评分组件的显示逻辑

# day02
## goods组件
  * 使用better-scroll实现回弹滚动
    * 创建BScroll对象
    * 需要在界面更新后去创建: $nextTick(callback)
    * 如果scroll对象已存在, 需要refresh()
  * 滚动右侧列表, 左侧列表选中项跟随变化
    * 计算所有右侧列表项的top值: tops数组
    * 监视右侧列表的滚动, 得到scrollY: scroll.on('scroll', (pos)=> {pos.y})
    * 通过计算属性得到当前项的index
  * 选择左侧菜单项, 右侧滚动到对应位置
    * 通过点击的index来得到对应的列表项的element
    * scroll.scrollToElement(element, time)
  * 解决点击事件处理2次的问题
    * 移动端与PC的区别
    * 判断event._constructed
## cartcontrol组件
  * 给数据对象添加属性, 更新UI
    * Vue.set(obj, propName, value)
  * 控制显示/隐藏
    * v-show
    * v-if
  * 动画
    * transition="xxx"
    * class: xxx-transition, xxx-enter, xxx-leave

## shopcart组件
  * 标签的动态属性与静态属性
    * 动态数据/字符串
    * 数据类型
  * 标签属性的大小写问题
    * :my-name='xxx'
    * props: {myName:Object}
  * 向路由组件传递数据
    * <router-view xxx='yyy'>
  * 计算属性的使用
    * 不能传递参数
    * 根据其它数据计算得到一个新的数据
  * 购物车列表的显示隐藏
    * isShow
    * totalCount
  * 点击购物车列表之外区域隐藏购物车
    * 在列表div的后面添加一个阴影div
    * 给这个div加点击监听
  * 购物车列表的滚动
    * BScroll
  * 显示/隐藏动画
  * 通过v-ref/$refs实现父组件调用子组件的方法

## food组件
  * 使用better-scroll实现滚动: 初始化/刷新
  * 列表过滤显示
  * 通过events定义自定义事件监听, 接收子组件消息
  * 通过Vue给数据对象添加新属性, 更新UI
  * :class动态样式
  * 显示/隐藏控制

## ratingselect组件
  * 多个属性参数的设计
  * 动态样式的控制
  * array的reduce()使用
  * 通过$dispatch向父组件发送消息



