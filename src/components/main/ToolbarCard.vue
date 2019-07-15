<template>
  <v-card>
    <v-toolbar :height="45" color="#F8F9FA" style="width: 100%" flat>
      <div>{{ title }}</div>
    </v-toolbar>
    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ToolbarCard",
  props: {
    title: String
  }
};
</script>

<style scoped></style>
