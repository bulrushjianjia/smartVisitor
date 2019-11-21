<!--用作来访预约详情， 与用户可见的来访邀请详情（员工不可见）-->
<template>
  <div class="weui-cells__group weui-cells__group_form margin-top-0" id="invite-visiting-form">
    <PrevStep>{{title}}</PrevStep>
    <div class="weui-cells weui-cells_form margin-top-0">
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="we-title">访客信息</label>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">访客姓名</label>
        </div>
        <div class="weui-cell__bd">{{visitData.visitor.personName}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">访客性别</label>
        </div>
        <div class="weui-cell__bd">{{getSex(visitData.visitor.sex)}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">{{visitData.visitor.phoneNumber}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">身份证号</label>
        </div>
        <div class="weui-cell__bd">{{visitData.visitor.IDCard}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访单位</label>
        </div>
        <div class="weui-cell__bd">{{visitData.visitor.enterpriseName}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访时间</label>
        </div>
        <div
          class="weui-cell__bd position-relative"
          style="font-size: 13px;"
        >{{visitData.visitor.visitTimeStart}} ~ {{visitData.visitor.visitTimeEnd}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访目的</label>
        </div>
        <div class="weui-cell__bd">{{visitData.visitor.purpose}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">照片</label>
        </div>
        <div class="weui-cell__bd">
          <div class="photo-cont">
            <img :src="visitData.visitor.photo" />
          </div>
        </div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form">
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label we-title">受访信息</label>
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">受访者</label>
        </div>
        <div class="weui-cell__bd">{{visitData.respondent.personName}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">{{visitData.respondent.phoneNumber}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">公司名称</label>
        </div>
        <div class="weui-cell__bd">{{visitData.respondent.enterpriseName}}</div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">所属部门</label>
        </div>
        <div class="weui-cell__bd">{{visitData.respondent.departmentName}}</div>
      </div>
    </div>

    <div class="weui-cells weui-cells_form" v-if="visitType === 'request'">
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label we-title">审核意见</label>
        </div>
      </div>
      <div class="weui-cell" v-if="visitData.visitStatus !== 0">
        <div class="weui-cell__bd" v-html="getExamineStatus(visitData.visitStatus)"></div>
      </div>
      <div class="weui-cell" style="padding-bottom:0;">
        <div class="weui-cell__bd">
          <textarea
            class="weui-textarea"
            placeholder="拒绝来访时请输入拒绝原因，同意来访可不填写"
            id="examine-report"
            v-model="visitData.examineReport"
            :disabled="visitData.visitStatus !== 0"
          ></textarea>
        </div>
      </div>
      <div class="btn-area" v-if="visitData.visitStatus == 0">
        <button
          type="button"
          class="weui-btn weui-btn_default float-left"
          @click="examine(false)"
        >拒绝来访</button>
        <button
          type="button"
          class="weui-btn weui-btn_primary float-right"
          @click="examine(true)"
        >同意来访</button>
      </div>
    </div>

    <div
      class="weui-cells weui-cells_form"
      v-if="visitType === 'invite' && visitData.visitStatus == 2 && visitData.qrcodeImg"
    >
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label we-title">邀请二维码</label>
        </div>
      </div>
      <div class="qrcode-area">
        <img :src="visitData.qrcodeImg" />
        <p>长按保存二维码</p>
        <p>发送给访客扫码入闸</p>
      </div>
    </div>
  </div>
</template>
<script>

import personInfo from "../../api/personInfo.js";
import visit from "../../api/visit.js";
export default {
  data() {
    return {
      title: "",
      visitType: "",
      operate: "check",
      disabledFlag: true,
      visitData: {
        respondent: {},
        visitId: "",
        visitor: {
          personName: "",
          sex: 2,
          phoneNumber: "",
          IDCard: "",
          enterpriseName: "",
          purpose: "",
          visitTimeStart: "",
          visitTimeEnd: "",
          photo: ""
        },
        examineReport: "",
        examineResult: "",
        visitStatus: "",
        qrcodeImg: ""
      }
    };
  },
  // props: ["query"],
  methods: {
    getSex(val) {
      switch (val) {
        case 0:
          return "男";
          break;
        case 1:
          return "女";
        default:
          return "未知";
          break;
      }
    },
    getExamineStatus(val) {
      if (val == 1) {
        return "<span class='danger-color'>拒绝来访</span>";
      } else if (!val) {
        return "<span class='danger-color'>待审核</span>";
      } else {
        return "<span class='success-color'>审核通过</span>";
      }
    },
    examine(examineResult) {
      var that = this;
      if (examineResult === false && !this.visitData.examineReport) {
        this.$weui.form.showErrorTips({
          ele: document.getElementById("examine-report"),
          msg: "请输入拒绝原因"
        });
        return;
      }

      visit
        .examine({
          examineResult,
          examineReport: this.visitData.examineReport
        })
        .then(res => {
          that.$weui.toast("审核完成", 1000);
          that.$router.push({ path: "/PersonalCente`rIndex" });
        });
    }
  },

  beforeDestroyed() {
    localStorage.removeItem("query");
  },
  created() {
    let queryData = this.$route.query;
    console.info(queryData);
    console.info(this.$route.params)
    // debugger;
    this.visitData.visitId = queryData.id;
    this.operate = queryData.operate;
    console.info(this.operate);
    this.visitType = this.$route.params.type;
    console.info(this.visitType);
    if (this.visitType === "request") {
      this.title = "来访预约";
    } else if (this.visitType === "invite") {
      this.title = "邀请访问";
    } else {
      console.info("visitType未传递");
    }
    if (!this.visitData.visitId) {
      personInfo.query().then(res => {
        this.visitData.respondent = res;
      });
    } else {
      visit.query({ visitId: this.visitData.visitId }).then(res => {
        console.info(res)
        this.visitData = res[0];
      });
    }
  }
};
</script>
<style lang="less" scoped>
.qrcode-area {
  text-align: center;
  padding-bottom: 20px;
  img {
    display: block;
    margin: 10px auto;
  }
}

.weui-cell__bd {
  color: rgba(0, 0, 0, 0.6);
}
</style>
