<template>
  <div class="code" @click="refreshCode">
    <SIdentify :identifyCode="identifyCode"></SIdentify>
  </div>
</template>

<script>
import SIdentify from "./SIdentify";
export default {
  name: "Code",
  components: { SIdentify },
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: ""
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      this.$emit("handleCodeChange", this.identifyCode);
    }
  }
};
</script>

<style>
.code {
  width: 114px;
  height: 40px;
  border: 1px solid red;
}
</style>
