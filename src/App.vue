<template>
  <div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleScroll() {
      this.$store.dispatch("setScrollTop", window.scrollY);
    },
    handleResize() {
      this.$store.dispatch("setWindowSize", {
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientHeight
      });
    }
  }
};
</script>
<style>
html {
  width: 100%;
  height: 100%;
}
body {
  width: 100%;
  height: 100%;
}
</style>
