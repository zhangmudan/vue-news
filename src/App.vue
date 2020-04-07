<template>
  <div id="app">
    <!-- keep-alive 会缓存组件 ,如果不加include 会缓存所有页面,
    include 需要指定缓存那个页面 ,取的是页面组件的name值 不能使用空格-->
    <keep-alive include="index,search">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="less">
//引入字体图标
@import url("http://at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
//导入样式
@import url("../node_modules/vant/lib/index.css");
//公共样式
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
a {
  //inherit 继承父元素的样式
  color: inherit;
}
a:hover {
  color: inherit;
}
ul,
li,
ol {
  list-style: none;
}
i,
em {
  font-style: normal;
}
input,
button {
  outline: none;
}
</style>
