<template>
  <v-toolbar height="45" :color="color" :flat="flat"> </v-toolbar>
</template>

<script>
export default {
  name: "RedToolBar",
  props: {
    color: {
      type: String,
      default: "#ea0404"
    },
    flat: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
