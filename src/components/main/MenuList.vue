<template>
  <div>
    <v-list>
      <v-subheader>
        <a @click="show = !show">{{ title }}</a>
      </v-subheader>
      <template v-for="(item, index) in list">
        <v-list-tile @click="" :key="index" v-if="show">
          <v-list-tile-content>
            <v-list-tile-title>
              <div style="font-size: 12px; margin-left: 20px;">
                {{ item }}
              </div>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
  name: "MenuList",
  data() {
    return {
      show: false
    };
  },
  props: {
    list: Array,
    title: String
  }
};
</script>

<style scoped></style>
