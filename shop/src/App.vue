<template>
  <router-view/>
</template>

<style lang="less">
// 样式初始化
body,html{
  padding: 0;
  margin: 0;
}
/* flex布局类名 */
.flex{
  display: flex;
  align-items: center;
}
.flex-flaot{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.page_content{
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  background: #fff;
}
</style>
