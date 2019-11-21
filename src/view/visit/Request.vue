<template>
  <div>
    <PrevStep></PrevStep>
    <div id="visit-request">
      <h2>欢迎使用访客系统</h2>

      <div class="center-container">
        <p>请先选择所要访问的位置</p>
        <select placeholder="请选择要访问的位置" v-model="addressLink" id="select-address">
          <option value>请选择</option>
          <option
            v-for="(address, index) in addressList"
            :key="index"
            :value="address.positonUrl + '/RequestPage'"
          >{{address.positionName}}</option>
        </select>
      </div>

      <!-- <router-link
        :to="{path: '/VisitForm/request', query: {}}"
      
      >下一步</router-link>-->
      <button type="button" class="weui-btn weui-btn_primary" @click="goToNextStep">下一步</button>
    </div>
  </div>
</template>
<script>
import visitRequestAddress from "../../api/visitRequestAddress.js";

export default {
  data() {
    return {
      addressLink: "",
      addressList: []
    };
  },
  created() {
    var that = this;
    visitRequestAddress.query().then(res => {
      that.addressList = res;
    });
  },
  watch: {
    addressLink(val) {
      document.getElementById("select-address").style.borderColor = "#ccc";
    }
  },
  methods: {
    goToNextStep() {
      if (!this.addressLink) {
        document.getElementById("select-address").style.borderColor = "#fa5151";
      } else {
        console.info(this.addressLink)
        this.$router.push({
          name: "RequestPage",
          params: { link: this.addressLink }
        });
        // window.location.href = this.addressLink;
      }
    },
  }
};
</script>
<style lang="less" scoped>
#visit-request {
  h2 {
    padding: 100px 0 60px 0;
    text-align: center;
  }

  .weui-btn {
    margin-top: 30px;
  }
  .center-container {
    width: 70%;
    margin: 10px auto;
  }

  select {
    border: 1px solid #ccc;
    height: 40px;
    line-height: 40px;
    background: #fff;
    -webkit-appearance: menulist;
    padding: 0 3px;
    margin-top: 10px;
    width: 100%;
  }
}
</style>