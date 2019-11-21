<template>
  <div class="date-picker">
    <i v-if="icon" :class="icon + ' float-left'"></i>
    <input
      type="text"
      class="weui-input"
      readonly
      @click="popupDatePicker"
      v-model="formatTime"
      placeholder="请选择来访时间"
    />
  </div>
</template>
<script>
function formatTime(dateArr) {
  return dateArr[0].value + "-" + changeTime(dateArr[1].value);
}

function changeTime(num) {
  return num >= 10 ? num : "0" + num;
}
let nextYear = new Date().getFullYear() + 1;
export default {
  data() {
    return {
      formatTime: ""
    };
  },
  props: ["icon"],
  methods: {
    popupDatePicker() {
      var that = this;
      this.$weui.datePicker({
        depth: 2,
        // start: new Date(),
        // end: nextYear,
        onConfirm(result) {
          that.formatTime = formatTime(result);
          that.$emit('time', that.formatTime);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.date-picker {
  color: rgba(0, 0, 0, 0.8);

  input,
  i {
    display: inline-block;
    line-height: inherit;
  }
  input {
    width: 120px !important;
  }

  i {
    margin-right: 5px;
  }
}
</style>