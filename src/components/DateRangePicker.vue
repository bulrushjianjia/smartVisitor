<template>
  <div class="we-daterange-container">
    <div class="we-daterange-start">
      <input
        type="text"
        class="weui-input"
        placeholder="请选择开始时间"
        readonly
        @click="popupDatePicker('start')"
        v-model="strTimeStart"
      />
    </div>
    <div class="we-daterange-end">
      <input
        type="text"
        class="weui-input"
        placeholder="请选择结束时间"
        readonly
        @click="popupDatePicker('end')"
        v-model="strTimeEnd"
      />
    </div>
  </div>
</template>
<script>
let curTime = new Date();
let nextYear = curTime.getFullYear() + 1,
  hours = [],
  minutes = [],
  confirmTime;

if (!hours.length) {
  for (let i = 0; i < 24; i++) {
    var hours_item = {};
    hours_item.label = ("" + i).length === 1 ? "0" + i : "" + i;
    hours_item.value = i;
    hours.push(hours_item);
  }
}
if (!minutes.length) {
  for (let j = 0; j < 60; j++) {
    var minutes_item = {};
    minutes_item.label = ("" + j).length === 1 ? "0" + j : "" + j;
    minutes_item.value = j;
    minutes.push(minutes_item);
  }
}

export default {
  data() {
    return {
      strTimeStart: "",
      strTimeEnd: "",
      arrTimeStart: "",
      arrTimeEnd: "",
      limitTimeStart: curTime,
      limitTimeEnd: nextYear,
      arrCurDate: []
    };
  },
  props: ["start", "end"],
  watch: {
    start(val) {
      this.strTimeStart = val;
    },
    end(val) {
      this.strTimeEnd = val;
    },
    strTimeStart(val) {
      if (val) {
        this.arrTimeStart = this.convertStrTimeToArray(val);
        this.limitTimeStart = val.slice(0, 10);
      }
    },
    StrTimeEnd(val) {
      if (val) {
        this.arrTimeEnd = this.convertStrTimeToArray(val);
        this.limitTimeEnd = val.slice(0, 10);
      }
    }
  },
  created() {
    this.arrCurDate = [
      curTime.getFullYear(),
      curTime.getMonth() + 1,
      curTime.getDate()
    ];
  },
  methods: {
    popupDatePicker(status) {
      var mask = document.createElement("div");
      mask.className = "weui-mask weui-animate-fade-in";
      document.body.append(mask);

      var that = this;
      if (status === "start") {
        var start = new Date(),
          end = this.limitTimeEnd,
          defaultValue = this.arrTimeStart || this.arrCurDate;
      } else {
        var start = this.strTimeStart || new Date(),
          end = nextYear,
          defaultValue =
            this.arrTimeEnd || this.arrTimeStart || this.arrCurDate;
      }
      this.$weui.datePicker({
        start,
        end,
        defaultValue,
        className: "date-range-picker",
        onConfirm(result) {
          confirmTime = result;
        },
        onClose(a) {
          that.show_expect_time_picker(confirmTime, status, mask);
        }
      });
    },
    convertStrTimeToArray(str) {
      if (!str) return [];
      var dateArr = [];
      dateArr[0] = parseInt(str.slice(0, 4));
      dateArr[1] = parseInt(str.slice(6, 8));
      dateArr[2] = parseInt(str.slice(10));
      return dateArr;
    },
    formatTime(dateArr) {
      if (!dateArr) return;
      return (
        dateArr[0].value +
        "-" +
        this.changeTimeToTwoBits(dateArr[1].value) +
        "-" +
        this.changeTimeToTwoBits(dateArr[2].value)
      );
    },
    changeTimeToTwoBits(num) {
      if (num >= 10) return num;
      return "0" + num;
    },
    show_expect_time_picker(date, status, mask) {
      if (!date) {
        mask.remove();
        return;
      }
      var that = this;
      var date = this.formatTime(date);

      this.$weui.picker(hours, [{ label: ":", value: 0 }], minutes, {
        defaultValue: [0, 0, 0],
        className: "time-range-picker",
        onConfirm: function(result) {
          var expect_date =
            date + " " + result[0].label + ":" + result[2].label;
          if (status === "start") {
            that.strTimeStart = expect_date;
            that.$emit("timeStart", that.strTimeStart);
          } else {
            that.strTimeEnd = expect_date;
            that.$emit("timeEnd", that.strTimeEnd);
          }
        },
        onClose: function() {
          mask.className = "weui-mask weui-animate-fade-out";
          mask.addEventListener("webkitAnimationEnd", function() {
            mask.remove();
          });
        }
      });
    }
  }
};
</script>
<style lang="less">
.date-range-picker {
  // .weui-animate-slide-down {
  //   -webkit-animation: slideDown 0s forwards;
  //   animation: slideDown 0s forwards;
  // }
  .weui-mask {
    background: none;
  }
}
.time-range-picker {
  // .weui-picker.weui-animate-slide-up {
  //   -webkit-animation: slideUp 0s forwards;
  //   animation: slideUp 0s forwards;

  //   &.weui-animate-slide-down {
  //     -webkit-animation: slideDown ease 0.3s forwards;
  //     animation: slideDown ease 0.3s forwards;
  //   }
  // }
  .weui-mask {
    background: none;
  }
}
</style>