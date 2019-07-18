<template>
  <div>
    <HomeHeader />
    <RedToolBar />

    <!-- 支付成功 -->
    <v-layout
      align-center
      justify-center
      column
      :style="{ minHeight: $store.state.windowSize.y - 80 - 95 - 60 + 'px' }"
    >
      <div style="margin-top: 40px;">
        <v-icon color="green" :size="70">fas fa-check-circle</v-icon>
      </div>
      <div style="margin-top: 20px; font-size: 18px; font-weight: 700;">
        支付成功 <span style="margin-left: 5px;">{{ count }}秒后返回首页</span>
      </div>
    </v-layout>
    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from "../../components/header/HomeHeader";
import HomeFooter from "../../components/footer/HomeFooter";
import RedToolBar from "../../components/main/RedToolBar";
export default {
  name: "Success",
  components: { RedToolBar, HomeFooter, HomeHeader },
  data() {
    return {
      count: 4
    };
  },
  created() {
    let that = this;
    setInterval(() => {
      this.count--;
      if (that.count === 0) {
        that.$router.push("/");
      }
    }, 1000);
  }
};
</script>

<style scoped></style>
