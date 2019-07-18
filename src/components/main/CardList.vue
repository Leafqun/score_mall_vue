<template>
  <v-layout row wrap justify-space-between style="height: 100%;">
    <v-flex v-for="item in list" :key="item.id" class="card-item">
      <v-layout
        column
        style="height: 100%"
        class="good_info"
        @click="$router.push(`/good/${title}/${item.id}`)"
      >
        <v-flex style="height: 60%">
          <v-img
            style="background-size: cover"
            contain
            :maxHeight="120"
            :src="
              item.picName
                ? `${$picUrl}/${item.picName}.png`
                : `${$picUrl}/timg.gif`
            "
          ></v-img>
          <!--<img :src="
              item.picName
                ? `${$picUrl}/${item.picName}.png`
                : 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'" />-->
        </v-flex>
        <v-flex>
          <div style="text-align: center; margin-bottom: 10px; margin-top: 5px">
            {{ item.goodName }}
          </div>
          <div class="grey--text" style="text-align: center">
            ￥{{ item.price ? item.price : 0 }}/{{
              item.scorePrice ? item.scorePrice : 0
            }}积分
          </div>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "CardList",
  props: {
    list: Array,
    title: {
      type: String,
      default: "其他"
    }
  }
};
</script>

<style scoped>
.good_info {
}
.good_info:hover {
  transform: scale(1.02);
  cursor: pointer;
}
</style>
