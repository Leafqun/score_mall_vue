<template>
  <div>
    <div>
      <HomeHeader />
    </div>
    <div>
      <v-layout style="background-color: #ea0404;" align-end column fill-height>
        <v-toolbar height="45" color="#ea0404"> </v-toolbar>
      </v-layout>
    </div>

    <div class="tab" :style="{ padding }">
      <SBreadcrumbs />
    </div>
    <v-divider />

    <div
      :style="{
        padding,
        marginTop: '45px',
        minHeight: this.y - 80 - 15 - 260 + 'px'
      }"
    >
      <router-view />
    </div>

    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from "../components/header/HomeHeader";
import HomeFooter from "../components/footer/HomeFooter";
import SBreadcrumbs from "../components/main/SBreadcrumbs";
export default {
  name: "Personal",
  components: { SBreadcrumbs, HomeFooter, HomeHeader },
  data() {
    return {
      active: null
    };
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    y() {
      return this.$store.state.windowSize.y;
    },
    padding() {
      if (this.x > 1200) {
        return "0 200px";
      } else if (this.x > 800) {
        return "0 100px";
      } else if (this.x > 500) {
        return "0 40px";
      } else {
        return "0 15px";
      }
    }
  }
};
</script>

<style scoped>
.tab {
  height: 75px;
}
</style>
