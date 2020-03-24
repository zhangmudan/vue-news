<template>
  <div id="app">
    <div id="nav"></div>
    <router-view />
  </div>
</template>

<style lang="less">
//公共样式
* {
  margin: 0;
  padding: 0;
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
</style>
