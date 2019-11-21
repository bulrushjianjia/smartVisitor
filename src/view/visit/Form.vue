<!--这个页面有三种状态：来访预约的填写表单，邀请访问的填写表单，邀请访问的编辑-->
<template>
  <div class="weui-cells__group weui-cells__group_form margin-top-0" id="invite-visiting-form">
    <div v-if="visitType==='invite' || prev">
      <PrevStep>{{title}}</PrevStep>
    </div>

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
        <div class="weui-cell__bd">
          <input
            type="text"
            class="weui-input"
            placeholder="请输入访客姓名"
            v-model="visitData.visitor.personName"
            required
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">访客性别</label>
        </div>
        <div class="weui-cell__bd">
          <div>
            <input
              type="radio"
              value="0"
              name="sex"
              required
              tips="请选择性别"
              v-model="visitData.visitor.sex"
            />
            <span>男</span>
          </div>
          <div class="margin-left-10">
            <input type="radio" value="1" name="sex" v-model="visitData.visitor.sex" />
            <span>女</span>
          </div>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            class="weui-input"
            placeholder="请输入手机号"
            v-model="visitData.visitor.phoneNumber"
            required
            pattern="REG_PHONE"
            notMatchTips="请输入正确的手机号"
          />
        </div>
      </div>

      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">身份证号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            class="weui-input"
            placeholder="请输入身份证号码"
            v-model="visitData.visitor.IDCard"
            required
            pattern="REG_IDNUM"
            notMatchTips="请输入正确的身份证号码"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访单位</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            class="weui-input"
            placeholder="请输入来访单位"
            v-model="visitData.visitor.enterpriseName"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访时间</label>
        </div>
        <div class="weui-cell__bd position-relative">
          <DateRangePicker
            @timeStart="changeTimeStart"
            @timeEnd="changeTimeEnd"
            :start="visitData.visitor.visitTimeStart"
            :end="visitData.visitor.visitTimeEnd"
          ></DateRangePicker>
        </div>
      </div>
      <div class="remind-info background-gray">
        <p v-if="visitType === 'invite'">
          <i class="fa fa-info-circle"></i>来访时间为可通过闸机时间段，请合理设置
        </p>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">来访目的</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            name
            class="weui-input"
            placeholder="请输入来访目的"
            v-model="visitData.visitor.purpose"
          />
        </div>
      </div>
      <div v-if="visitType==='invite'">
        <div class="weui-cell">
          <div class="weui-cell_hd">
            <label class="weui-label">是否有照片</label>
          </div>
          <!-- <div class="weui-bd">
          <input class="weui-switch" type="checkbox" v-model="visitData.visitor.hasPhoto"/>
          </div>-->
          <div class="weui-cell__bd">
            <div>
              <input type="radio" value="1" name="hasphoto" v-model="visitData.visitor.hasPhoto" />
              <span>有</span>
            </div>
            <div class="margin-left-10">
              <input type="radio" value="0" name="hasphoto" v-model="visitData.visitor.hasPhoto" />
              <span>无</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="visitData.visitor.hasPhoto === '1'">
        <div class="weui-cell padding-bottom-0">
          <div class="weui-cell_hd">
            <label>请上传近期照片</label>
          </div>
        </div>
        <div class="weui-cell" style="border-top: none;">
          <UploadImg @imageUrl="changePhotoUrl" :photoUrl="visitData.visitor.photo"></UploadImg>
          <p
            class="margin-left-10 photo-direction"
          >请选择近期正脸照片（请勿出现他人头像），面部光线均匀，无遮挡，不能有长刘海、帽子、黑框眼镜等饰品，不要过度PS</p>
        </div>
      </div>
      <div v-if="visitData.visitor.hasPhoto === '0'">
        <div class="weui-cell padding-bottom-0">
          <div class="weui-cell_bd">
            <input
              type="radio"
              value="0"
              name="qrcodeType"
              required
              tips="请选择获取二维码方式"
              v-model="visitData.visitor.qrcodeType"
            />
            <span>短信发送取票码给访客，访客通过取票码获得访客凭条，使用凭条上二维码扫码入闸。</span>
          </div>
        </div>
        <div class="remind-info" v-if="visitData.visitor.qrcodeType == 0">
          <p>取票码有效期：</p>
          <div class="weui-cell padding-bottom-0">
            <p>
              预约来访开始时间前
              <input
                v-model="visitData.visitor.advanceTime"
                required
                emptyTips="请输入取票码有效时间"
                id="advance-time"
                notMatchTips="取票码有效时间必须为大于零的正数"
                pattern="REG_POSNUM"
              />
              小时——预约来访结束时间
            </p>
          </div>
        </div>
        <div class="weui-cell padding-bottom-0">
          <div class="weui-cell_bd">
            <input
              type="radio"
              value="1"
              name="qrcodeType"
              required
              tips="请选择获取二维码方式"
              v-model="visitData.visitor.qrcodeType"
            />
            <span>生成二维码，访客通过二维码直接扫码入闸。</span>
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
        <div class="weui-cell__bd">
          <input
            type="text"
            v-model="visitData.respondent.userName"
            class="weui-input"
            placeholder="请输入受访者姓名"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            v-model="visitData.respondent.phoneNumber"
            class="weui-input"
            placeholder="请输入受访者手机号"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">公司名称</label>
        </div>
        <div class="weui-cell__bd">
          <!-- <select
            class="weui-select"
            v-model="visitData.respondent.enterpriseId"
            :disabled="visitType === 'invite'"
            placeholder="请选择企业"
            required
            @change="enterpriseChange"
          > -->
          <select
            class="weui-select"
            v-model="visitData.respondent.enterpriseId"
            :disabled="visitType === 'invite'"
            placeholder="请选择企业"
            @change="enterpriseChange"
          >
            <option
              v-for="(entp, index) in enterpriseList"
              :key="index"
              :value="entp.enterpriseId"
            >{{entp.enterpriseName}}</option>
          </select>
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell_hd">
          <label class="weui-label">所属部门</label>
        </div>
        <div class="weui-cell__bd">
          <selectTree
            :dataList="departmentList"
            :dataId="visitData.respondent.departmentId"
            :nameList="'departmentId,departmentName,parentId'"
            :rootId="visitData.respondent.enterpriseId"
            @id="changeDepartmentId"
          ></selectTree>
        </div>
      </div>
    </div>
    <div class="btn-area">
      <button type="button" class="weui-btn weui-btn_primary" @click="submitInfo">提交</button>
    </div>
  </div>
</template>
<script>
import personInfo from "../../api/personInfo.js";
import departmentList from "../../api/departmentList.js";
import enterpriseList from "../../api/enterpriseList.js";
import visit from "../../api/visit.js";
const UploadImg = () =>
  import(/* webpackChunkName: "UploadImg" */ "../../components/UploadImg");
const DateRangePicker = () =>
  import(
    /* webpackChunkName: "DateRangePicker" */ "../../components/DateRangePicker"
  );
const SelectTree = () =>
  import(/* webpackChunkName: "SelectTree" */ "../../components/SelectTree");

export default {
  data() {
    return {
      title: "",
      visitType: "",
      enterpriseList: [],
      departmentList: [],
      prev: false,
      visitData: {
        respondent: {},
        visitId: "",
        visitor: {
          hasPhoto: "1",
          personName: "ee3e",
          sex: 1,
          phoneNumber: "18615161098",
          IDCard: "371082199203127865",
          enterpriseName: "",
          purpose: "1111",
          visitTimeStart: "",
          visitTimeEnd: "",
          photo: "",
          qrcodeType: "",
          advanceTime: ""
        }
      }
    };
  },
  components: {
    UploadImg,
    DateRangePicker,
    SelectTree
  },
  created() {
    let queryData = this.$route.query;
    console.info(this.$route.params.type);
    this.visitData.visitId = queryData.id;
    this.visitType = this.$route.params.type;
    this.prev = queryData.prev;

    if (this.visitType === "invite") {
      this.title = "邀请访问";
      if (!this.visitData.visitId) {
        personInfo.query().then(res => {
          this.visitData.respondent = res;
          this.enterpriseChange();
          this.initOneEnterpriseList();
        });
      } else {
        visit.query({ visitId: this.visitData.visitId }).then(res => {
          this.visitData = res[0];
        //  this.visitData.visitor.hasPhoto = res[0].visitor.photo ? '1': '0';
          this.enterpriseChange();
          this.initOneEnterpriseList();
        });
      }
    } else {
      this.title = "来访预约";
      //查询企业
      enterpriseList.query().then(res => {
        this.enterpriseList = res;
      });
      if (!this.visitType) {
        this.visitType = "request";
      }
    }
  },
  methods: {
    changeDepartmentId: function(value) {
      this.visitData.respondent.departmentId = value;
    },
    queryDepartment() {
      var that = this;
      departmentList
        .query({ enterpriseId: this.visitData.respondent.enterpriseId })
        .then(res => {
          that.departmentList = res;
        });
    },
    initOneEnterpriseList() {
      this.enterpriseList = [
        {
          enterpriseName: this.visitData.respondent.enterpriseName,
          enterpriseId: this.visitData.respondent.enterpriseId
        }
      ];
    },
    enterpriseChange() {
      this.queryDepartment();
    },
    changePhotoUrl(url) {
      this.visitData.visitor.photo = url;
    },
    changeTimeStart(time) {
      this.visitData.visitor.visitTimeStart = time;
    },
    changeTimeEnd(time) {
      this.visitData.visitor.visitTimeEnd = time;
    },
    submitInfo() {
      var that = this;
      // document.querySelectorAll('.weui-cell_warn').
      this.$weui.form.validate(
        "#invite-visiting-form",
        function(error) {
          if (!error) {
            //先校验受访人信息
            visit
              .checkInterviewer({
                deptId: that.visitData.respondent.departmentId,
                userName: that.visitData.respondent.userName,
                userPhone: that.visitData.respondent.phoneNumber
              })
              .then(res => {
                visit
                  .submit(
                    Object.assign(that.visitData.visitor, {
                      intervieweeId: res,
                      visitorSource: that.visitType === "invite" ? 1 : 3
                    })
                  )
                  .then(res => {
                    if (
                      that.visitData.visitor.hasPhoto == "0" &&
                      that.visitData.visitor.qrcodeType == "1" &&
                      res.guid
                    ) {
                      visit.getQRcode({ guid: res.guid }).then(res => {
                        that.$weui.alert(
                          `<div class="save-qrcode">
                    <p> 长按保存二维码</p>
                    <p>发送给访客扫码入闸</p>
                    <img src="${res.qrcodeImg}"></div>`,
                          function() {
                            that.$weui.toast("提交成功", 1000);
                            that.$router.push({ path: "/PersonalCenterIndex" });
                          }
                        );
                      });
                    } else {
                      that.$weui.toast("提交成功", 1000);
                      that.$router.push({ path: "/PersonalCenterIndex" });
                    }
                  });
              })
              .catch(msg => {
                // weui.alert(error, {
                //   title: "请求异常"
                // });
              });
          } else {
          }
        },
        {
          regexp: {
            POSNUM: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
            IDNUM: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            PHONE: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
          }
        }
      );
    }
  }
};
</script>
<style lang="less" scoped>
.weui-cells {
  overflow: inherit;
}
.remind-info {
  padding: 5px 15px;
  p {
    color: rgba(0, 0, 0, 0.5) !important;
  }

  .weui-cell {
    padding: 0;
    &:active {
      background: none !important;
    }
  }
  i {
    margin-right: 5px;
  }
}

.btn-area {
  height: 80px;
  padding: 30px 0 0 0;
}

#advance-time {
  border: none;
  border-bottom: 1px solid #aeaeae;
  width: 35px;
  text-align: center;
  outline: none;
  padding: 3px 0;
  background: none;
}

.weui-cell_warn {
  #advance-time {
    border-color: #fa5151 !important;
  }
}
</style>
<style lang="less">
.save-qrcode {
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    margin: 10px 0 0 0;
  }
}
</style>
