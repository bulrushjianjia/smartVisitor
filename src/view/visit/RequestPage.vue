<template>
  <div>
    <PrevStep>来访预约</PrevStep>
    <iframe src="about:blank" ref="requestPage"></iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      requestLink: ""
    };
  },
  created() {
    let requestLink = this.$route.params.link;
    if (requestLink) {
      localStorage.setItem("requestLink", requestLink);
    }
    this.requestLink = localStorage.getItem("requestLink");
  },
  watch: {
    requestLink(val) {
      console.info(this.$refs);
      this.$refs.requestPage.src = val;
    }
  }
};
</script>
<style lang="less" scoped>
iframe {
  border: none;
  position: fixed;
  width: 100%;
  top: 35px;
  display: block;
  height: 100%;
}
</style>