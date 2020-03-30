<template>
  <div id="app">
    首页
    <router-view />
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
