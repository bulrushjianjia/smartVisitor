<template>
  <div id="upload-image-container">
    <!-- 遮罩层 -->
    <div id="cut-container" v-show="panel">
      <div>
        <img id="image" :src="url" alt="Picture" ref="avator" />
      </div>
      <div class="btn-area">
        <button type="button" @click="commit" class="weui-btn weui-btn_primary float-left">确定</button>
        <button type="button" @click="cancel" class="weui-btn weui-btn_default float-right">取消</button>
      </div>
    </div>
    <div>
      <div class="photo-cont">
        <div class="picture" :style="'backgroundImage:url('+(headerImage || noImage)+')'"></div>
      </div>
      <input
        type="file"
        id="change-image"
        accept="image/*"
        @change="change"
        :disabled="disabledFlag"
      />
    </div>
  </div>
</template>

<script>
import Cropper from "cropperjs";
export default {
  data() {
    return {
      headerImage: "",
      noImage: "../static/img/no-photo.jpg",
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: "",
      imgCropperData: {
        accept: "image/jpeg, image/png, image/jpg"
      },
      disabledFlag: false
    };
  },
  props: ["photoUrl", "disabled"],
  created: function() {
    this.headerImage = this.photoUrl;
    this.disabledFlag = this.disabled;
  },
  watch: {
    photoUrl: function(val) {
      this.headerImage = val;
    },
    disabled: function(val) {
      this.disabledFlag = val;
    }
  },
  mounted() {
    //初始化这个裁剪框
    var self = this;
    var image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function() {
        self.croppable = true;
      }
    });
  },
  methods: {
    //取消上传
    cancel() {
      this.panel = false;
      var obj = document.getElementById("change-image");
      obj.outerHTML = obj.outerHTML;
    },
    //创建url路径
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    //input框change事件，获取到上传的文件
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) return;
      let type = files[0].type; //文件的类型，判断是否是图片
      let size = files[0].size; //文件的大小，判断图片的大小
      if (this.imgCropperData.accept.indexOf(type) == -1) {
        alert("不支持该图片格式！");
        return false;
      }
      if (size > 5242880) {
        alert("请选择5M以内的图片！");
        return false;
      }
      this.picValue = files[0];
      var that = this;
      var dataReader = new FileReader();
      dataReader.readAsDataURL(files[0]);
      dataReader.onload = function(e) {
        that.url = e.target.result;

        if (that.cropper) {
          that.cropper.replace(that.url);
        }
      };
      this.panel = true;
    },
    //确定提交
    commit() {
      this.panel = false;
      var croppedCanvas;
      var roundedCanvas;
      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);
      this.headerImage = roundedCanvas.toDataURL();
      //上传图片
      this.postImg();
    },
    //canvas画图
    getRoundedCanvas(sourceCanvas) {
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var width = sourceCanvas.width;
      var height = sourceCanvas.height;
      canvas.width = width;
      canvas.height = height;
      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();

      context.fill();
      return canvas;
    },
    //提交上传函数
    postImg() {
      this.$emit("imageUrl", this.headerImage);
    }
  }
};
</script> 
  
<style lang="less">
#upload-image-container {
  position: relative;
  .btn-area {
    position: absolute;
    bottom: 15px;
    left: 20px;
    right: 20px;
    button {
      width: 45%;
      margin-top: 0;
    }
  }

  .photo-cont {
    width: 100px;
    height: 100px;

    .picture {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
  #change-image {
    width: 100px;
    height: 100px;
    opacity: 0;
    position: absolute;
    top: 0;
  }
  #cut-container {
    z-index: 99;
    position: fixed;
    padding-top: 60px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 1);
  }
  #image {
    max-width: 100%;
  }
}

.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.cropper-container img {
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}
.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.cropper-wrap-box {
  overflow: hidden;
}
.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}
.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}
.cropper-view-box {
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}
.cropper-dashed {
  position: absolute;
  display: block;
  opacity: 0.5;
  border: 0 dashed #eee;
}
.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}
.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}
.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 0;
  height: 0;
  opacity: 0.75;
}
.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}
.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}
.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}
.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}
.cropper-face {
  top: 0;
  left: 0;
  background-color: #fff;
}
.cropper-line {
  background-color: #39f;
}
.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}
.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}
.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}
.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}
.cropper-point {
  width: 5px;
  height: 5px;
  opacity: 0.75;
  background-color: #39f;
}
.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}
.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}
.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}
.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}
.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}
.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}
.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}
.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}
@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}
@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}
@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}
.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}
.cropper-invisible {
  opacity: 0;
}
.cropper-bg {
  background: black;
}
.cropper-hide {
  position: absolute;
  display: block;
  width: 0;
  height: 0;
}
.cropper-hidden {
  display: none !important;
}
.cropper-move {
  cursor: move;
}
.cropper-crop {
  cursor: crosshair;
}
.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>