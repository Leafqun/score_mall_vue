<template>
  <div class="hello">
    <canvas id="msg"></canvas>
  </div>
</template>

<script>
// 引入qrcode
import QRCode from "qrcode";
export default {
  name: "QRCode",
  data() {
    return {
      message: "http://119.23.22.99/score_mall"
    };
  },
  mounted() {
    var msg = document.getElementById("msg");
    // 将获取到的数据（val）画到msg（canvas）上
    QRCode.toCanvas(msg, this.message, function(error) {
      console.log(error);
    });
  }
};
</script>

<style>
#msg {
  width: 200px;
  height: 200px;
}
</style>
