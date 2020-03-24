<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
//引入字体图标
@import url("http://at.alicdn.com/t/font_1426139_jm7n2373nlh.css");
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
//媒体查询
@media screen and (min-width: 750px) {
  .w {
    width: 750px;
    margin: 0 auto;
  }
  html {
    font-size: 75px;
  }
}
@media screen and (min-width: 540px) and (max-width: 750px) {
  .w {
    width: 540px;
    margin: 0 auto;
  }
  html {
    font-size: 54px;
  }
}
@media screen and (min-width: 480px) and (max-width: 540px) {
  .w {
    width: 480px;
    margin: 0 auto;
  }
  html {
    font-size: 48px;
  }
}
@media screen and (max-width: 480px) {
  .w {
    width: 360px;
    margin: 0 auto;
  }
  html {
    font-size: 36px;
  }
}
</style>
