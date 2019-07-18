<template>
  <v-layout align-center justify-start row fill-height style="height: 100%">
    <div style="font-size: 24px; color: rgba(0,0,0, 0.5)">
      <a @click="$router.push('/')">积分商城</a>
    </div>
    <div style="margin: 0 10px; height: 30px">
      <v-divider vertical />
    </div>
    <div>个人中心</div>
    <div style="margin: 0 10px; height: 30px">
      <v-divider vertical />
    </div>
    <div>{{ which }}</div>
  </v-layout>
</template>

<script>
export default {
  name: "SBreadcrumbs",
  computed: {
    which() {
      return this.$route.meta.info;
    }
  }
};
</script>

<style scoped>
a {
}
a:hover {
  cursor: pointer;
  color: dimgrey;
}
</style>
