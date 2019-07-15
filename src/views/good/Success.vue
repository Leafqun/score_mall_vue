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
        支付成功
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
  components: { RedToolBar, HomeFooter, HomeHeader }
};
</script>

<style scoped></style>
