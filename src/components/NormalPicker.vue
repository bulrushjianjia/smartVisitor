<template>
  <div @click="showPicker" v-if="dataList && defaultValue" class="normal-picker">
    <i v-if="icon" :class="icon + ' picker-icon'"></i>
    <input v-model="value" type="hidden" />
    <p readonly>{{label}}</p>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      list: [],
      value: "",
      label: ""
    };
  },
  props: ["dataList", "defaultValue", "valueField", "labelField", "icon"],
  created() {
    this.list = this.formatPickerList(this.dataList);
    this.value = this.defaultValue;
    this.label = this.getDataByValue().label;
  },
  // watch: {
  //   dataList(val) {
  //     this.list = this.formatPickerList(val);
  //   },
  //   defaultValue(val) {
  //     this.value = val;
  //     this.label = this.getDataByValue().label;
  //   }
  // },
  methods: {
    showPicker() {
      var that = this;
      this.$weui.picker(this.list, {
        container: "body",
        defaultValue: [this.value],
        onConfirm: function(data) {
          that.label = data[0].label;
          that.value = data[0].value;

          that.$emit("pickerValue", that.value, that.label);
        }
      });
    },
    getDataByValue() {
      if (!this.list || !this.list.length) return {};
      var that = this;
      var data = {};
      Array.map(this.list, function(item) {
          if (item.value == that.value) {
            that.label = item.label;
            data = item;
          }
      }); 
      return data;
    },
    formatPickerList(list) {
      if (!list || !list.length) return [];
      var that = this;
      var arr = [];
      Array.map(list, function(item) {
        arr.push({
          value: that.valueField ? item[that.valueField] : item["value"],
          label: that.labelField ? item[that.labelField] : item["label"]
        });
      });
      return arr;
    }
  }
};
</script>
<style lang="less" scoped>
 .picker-icon {

 }
.normal-picker {
  p {
    display: inline-block;
  }
}
</style>