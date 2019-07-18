<template>
  <div>
    sdfsfs
  </div>
</template>

<script>
export default {
  name: "Test",
  data() {
    return {
      msg: "sf"
    };
  },
  created() {
    this.test();
  },
  async test() {
    const { data } = await this.$axios.get("http://localhost:8001/test");
    this.msg = data;
  }
};
</script>

<style scoped></style>
