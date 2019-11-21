<template>
  <div>
    <PrevStep>{{title}}</PrevStep>
    <div class="weui-search-bar" id="searchBar">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input
            visitType="search"
            class="weui-search-bar__input"
            placeholder="请输入来访人姓名"
            required
            v-model="searchData.visitorName"
          />
          <a href="javascript:" class="weui-icon-clear"></a>
        </div>
        <label class="weui-search-bar__label">
          <i class="weui-icon-search"></i>
          <span>来访人姓名</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn">取消</a>
    </div>
    <div class="weui-cell query-condition">
      <div class="weui-cell__bd">
        <DatePicker :icon="'fa fa-calendar-check-o'" @time="changeTime"></DatePicker>
      </div>
      <div class="weui-cell__ft">
        <NormalPicker
          :dataList="visitStatusList"
          :defaultValue="'0'"
          :icon="'fa fa-filter'"
          @pickerValue="changeVisitStatus"
        ></NormalPicker>
      </div>
    </div>
    <!-- <router-link :to="{name: 'VisitRequestInformation'}"> -->

    <div class="weui-loadmore weui-loadmore_line we-no-data" v-if="!visitList.length">
      <span class="weui-loadmore__tips">暂无数据</span>
    </div>
    <div v-if="visitList.length">
      <div class="weui-form-preview" v-for="(item, index) in visitList" :key="index">
        <router-link :to="{path: '/VisitInfo/'+ visitType, query: {id: item.visitor.visitId} }" tag="div">
          <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">{{subTitle}}</label>
              <label
                class="weui-form-preview__value"
              >{{ item.visitor.visitTimeStart ? item.visitor.visitTimeStart.slice(5, 10):"" }}</label>
            </div>
          </div>
          <div class="weui-form-preview__bd">
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">来访人</label>
              <label class="weui-form-preview__value">{{item.visitor.personName}}</label>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">来访时间</label>
              <label
                class="weui-form-preview__value"
              >{{item.visitor.visitTimeStart}} ~ {{item.visitor.visitTimeEnd}}</label>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">来访目的</label>
              <label class="weui-form-preview__value text-ellipsis">{{item.visitor.purpose}}</label>
            </div>
            <div class="weui-form-preview__item">
              <label class="weui-form-preview__label">状态</label>
              <label class="weui-form-preview__value">
                <span v-html="getVisitStatus(item.visitStatus)"></span>
                <router-link
                  :to="{path: '/VisitForm/'+ visitType, query: {id: item.visitor.visitId}}"
                  v-if="visitType === 'invite' && item.visitStatus == 2"
                >
                  <span class="primary-color float-right">编辑</span>
                </router-link>
              </label>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import visit from "../../api/visit.js";
const NormalPicker = () => import("../../components//NormalPicker");
const DatePicker = () => import("../../components//DatePicker");
export default {
  data() {
    return {
      title: "",
      subTitle: "",
      visitType: false,
      searchData: {
        visitorName: "",
        visitTime: "",
        visitStatus: 0,
        visitType: ""
      },
      visitList: [],
      visitStatusList: [
        {
          label: "全部",
          value: ""
        },
        {
          label: "待来访",
          value: 2
        },
        {
          label: "已到访",
          value: 3
        },
        {
          label: "已失效",
          value: 4
        }
      ]
    };
  },
  components: {
    NormalPicker,
    DatePicker
  },
  created() {
    this.visitType = this.$route.params.type;
    if (this.visitType === "request") {
      this.title = "来访申请";
      this.subTitle = "来访预约申请";
      this.searchData.visitType = 0;
    } else if (this.visitType === "invite") {
      this.title = "邀请记录";
      this.subTitle = "邀请访问";
      this.searchData.visitType = 1;
    } else {
      console.info("visitType未传递");
    }

    var that = this;
    setTimeout(function() {
      that.$weui.searchBar("#searchBar");
    });
  },
  computed: {},

  methods: {
    changeTime(val) {
      this.searchData.visitTime = val;
    },
    changeVisitStatus(val) {
      this.searchData.visitStatus = val;
    },
    getVisitStatus(val) {
      switch (val) {
        case 1:
          return "<span class='danger-color'>拒绝来访</span>";
          break;
        case 2:
          return "<span class='success-color'>待来访</span>";
          break;
        case 3:
          return "<span class='success-color'>已到访</span>";
          break;
        case 4:
          return "<span class='danger-color'>已失效</span>";
          break;
        default:
          return "<span class='danger-color'>待审核</span>";
          break;
      }
    }
  },
  watch: {
    searchData: {
      handler(val) {
        visit.query(val).then(response => {
          this.visitList = response;
        });
      },
      deep: true
    }
  }
};
</script>
<style lang="less" scoped>
.weui-form-preview__label {
  color: rgba(0, 0, 0, 0.9);
}
.weui-form-preview__hd {
  font-weight: 600;
  padding: 0 16px;
  &:after {
    display: none;
  }

  .weui-form-preview__value {
    font-size: 14px;
    font-weight: normal;
    color: rgba(0, 0, 0, 0.5);
  }
}
.weui-form-preview__bd {
  text-align: left;
  padding-top: 0;
}

.query-condition {
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 14px;
}
</style>
