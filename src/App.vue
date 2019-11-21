<template>
  <div id="app">
    <router-link
      to="VisitRequest"
      class="weui-cell weui-cell_access"
      href="javascript:;"
    >来访预约（公有公众号）</router-link>
    <router-link
      :to="{path: '/VisitForm/request', query: { prev: true} }"
      class="weui-cell weui-cell_access"
      href="javascript:;"
    >来访预约（私有公众号）</router-link>
    <router-link
      to="PersonalCenterIndex"
      class="weui-cell weui-cell_access"
      href="javascript:;"
    >个人中心</router-link>
  </div>
</template>

<script></script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .photo-cont {
    border-radius: 10px;
    width: 50px;
    height: 50px;
    float: left;
    margin-right: 15px;

    img {
      width: 100%;
    }
  }

  .weui-cells {
    .weui-cell {
      .fa {
        width: 20px;
        margin-right: 5px;
        color: #2868f0;
      }
    }
  }

  h3 {
    margin-bottom: 12px;
  }
}
</style>
