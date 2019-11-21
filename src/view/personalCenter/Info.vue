<template>
  <div class="weui-cells__group weui-cells__group_form margin-top-0">
    <PrevStep>{{title}}</PrevStep>
    <div class="weui-cells weui-cells_form margin-top-0" id="personal-information-form">
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">公司名称</label>
        </div>
        <div class="weui-cell__bd">{{userInfo.enterpriseName}}</div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">所属部门</label>
        </div>
        <!--  -->
        <div class="weui-cell__bd">
          <selectTree
            :dataList="departmentList"
            :dataId="userInfo.departmentId"
            :nameList="'departmentId,departmentName,parentId'"
            :rootId="userInfo.enterpriseId"
            :disabled="disabledFlag"
            @id ="changeDepartmentId"
          ></selectTree>
          <!-- <vue-picker
            :dataList="departmentList"
            :dataValue="userInfo.departmentId"
            :dataLabel="userInfo.departmentName"
            :valueField="'departmentId'"
            :labelField="'departmentName'"
            @pickerValue="changeDepartmentId"
          ></vue-picker>-->
          <!-- <select
            class="weui-select"
            name="select2"
            v-model="userInfo.departmentId"
            :disabled="disabledFlag"
            placeholder="请选择部门"
            required
          >
            <option
              v-for="(dept, index) in departmentList"
              :key="index"
              :value="dept.departmentId"
            >{{dept.departmentName}}</option>
          </select> -->
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">姓名</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            name="userName"
            class="weui-input"
            placeholder="请填写个人姓名"
            v-model="userInfo.userName"
            :disabled="disabledFlag"
            required
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">手机号</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            name="phoneNumber"
            :disabled="disabledFlag"
            class="weui-input"
            placeholder="请输入手机号码"
            v-model="userInfo.phoneNumber"
            required
            pattern="REG_PHONE"
            notMatchTips="请输入正确的手机号码"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">身份证</label>
        </div>
        <div class="weui-cell__bd">
          <input
            type="text"
            class="weui-input"
            placeholder="请输入身份证号码"
            v-model="userInfo.IDCard"
            :disabled="disabledFlag"
            pattern="REG_IDNUM"
            notMatchTips="请输入正确的身份证号码"
          />
        </div>
      </div>
      <div class="weui-cell">
        <div class="weui-cell__hd">
          <label class="weui-label">照片</label>
        </div>
        <div class="weui-cell__bd">
          <div class="weui-uploader" id="uploader">
            <UploadImg
              :photoUrl="userInfo.photo"
              :disabled="disabledFlag"
              @imageUrl="changePhotoUrl"
            ></UploadImg>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      class="we-form-btn weui-btn weui-btn_primary"
      @click="changeEditStatus"
    >{{btnText}}</button>
  </div>
</template>
<script>
import personInfo from "../../api/personInfo.js";
import departmentList from "../../api/departmentList.js";
const UploadImg = () => import("../../components/UploadImg");
const SelectTree = () => import("../../components/SelectTree");

export default {
  name: "PersonalCenterInformation",
  created() {
    personInfo.query().then(res => {
      this.userInfo = res;
      departmentList.query({ enterpriseId: res.enterpriseId }).then(res => {
        this.departmentList = res;
      });
    });

    // this.$weui.form.checkIfBlur("#personal-information-form");
  },
  data: function() {
    return {
      departmentPickerShow: false,
      userInfo: {},
      departmentList: [],
      disabledFlag: true,
      btnText: "编辑",
      title: "个人信息"
    };
  },
  components: {
    UploadImg,
    SelectTree
  },
  methods: {

    changeDepartmentId: function(value) {
      console.info('-------')
      console.info(value)
      this.userInfo.departmentId = value;
    },
    changePhotoUrl: function(url) {
      this.userInfo.photo = url;
    },
    changeEditStatus: function() {
      if (this.disabledFlag) {
        //编辑表单
        this.disabledFlag = false;
        this.btnText = "提交";
        this.title = "员工绑定确认";
      } else {
        //提交表单
        var that = this;
        this.$weui.form.validate(
          "#personal-information-form",
          function(error) {
            if (!error) {
              delete that.userInfo['departmentName'];
              personInfo
                .edit(that.userInfo)
                .then(res => {
                  that.$weui.toast("修改成功", 1000);
                  that.$router.back(-1);
                })
                .catch(error => {
                });
            }
          },
          {
            regexp: {
              IDNUM: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
              PHONE: /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
            }
          }
        );
      }
    }
  }
};
</script>
