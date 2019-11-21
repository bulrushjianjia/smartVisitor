<template>
  <div>
    <PrevStep></PrevStep>
    <div class="weui-cells margin-top-0">
      <router-link
        to="PersonalCenterInfo"
        class="weui-cell weui-cell_access"
        href="javascript:;"
      >
        <div class="weui-cell__bd">
          <div class="photo-cont">
            <img :src="userInfo.photo" />
          </div>
          <div class="name-cont">
            <h3>{{userInfo.userName}}</h3>
            <small>企业：{{userInfo.enterpriseName}}</small>
          </div>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
    <div class="weui-cells">
      <router-link to="VisitForm/invite" class="weui-cell weui-cell_access">
        <div class="weui-cell__bd">
          <p>
            <i class="fa fa-group"></i>邀请访问
          </p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <router-link to="VisitList/invite" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>
            <i class="fa fa-file-text-o"></i>邀请记录
          </p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
      <router-link to="VisitList/request" class="weui-cell weui-cell_access" href="javascript:;">
        <div class="weui-cell__bd">
          <p>
            <i class="fa fa-user-circle-o"></i>来访申请
          </p>
        </div>
        <div class="weui-cell__ft"></div>
      </router-link>
    </div>
  </div>
</template>

<script>
import personInfo from "../../api/personInfo.js";

export default {
  name: "PersonalCenter",
  created() {
    personInfo.query().then(res => {
      this.userInfo = res;
      sessionStorage.setItem("userId", res.userId);
    });
  },
  data() {
    return {
      userInfo: {}
    };
  }
};
</script>

<style lang="less" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  .photo-cont {
    float: left;
    margin-right: 15px;
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
