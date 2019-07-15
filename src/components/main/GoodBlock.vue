<template>
  <div>
    <!-- 标题 -->
    <div style="font-size: 24px; color: #333; margin-top: 15px;">
      {{ title }}
    </div>

    <v-divider style="margin: 15px 0 0 0" />

    <!-- 商品列表pc -->
    <v-layout
      v-if="x > 800"
      row
      style="height: 380px;border: 1px solid rgba(0, 0, 0, 0.2);"
      class="goodCardList"
    >
      <v-flex
        style="width: 150px; border-right: 1px solid rgba(0, 0, 0, 0.2);background-color: #F2F4F3"
        shrink
      >
        <div>
          <v-img
            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
            height="200px"
          ></v-img>
        </div>
        <div style="margin-top: 15px;">
          <div
            v-for="(item, index) in slice"
            :key="index"
            style="margin-bottom: 10px; padding: 0 15px"
          >
            <v-layout align-center justify-space-between row fill-height>
              <div>
                <a>{{ item[0] }}</a>
              </div>
              <div>
                <a>{{ item[1] }}</a>
              </div>
            </v-layout>
          </div>
        </div>
      </v-flex>

      <v-flex>
        <v-layout column style="height: 100%">
          <v-flex>
            <CardList :list="list.slice(0, 5)" />
          </v-flex>

          <v-flex>
            <CardList :list="list.slice(5)" />
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <!-- 商品列表mobile -->
    <div style="margin-top: 15px;" v-else>
      <v-layout column style="height: 100%">
        <v-flex>
          <CardList :list="list.slice(0, 2)" />
        </v-flex>

        <v-flex>
          <CardList :list="list.slice(2, 4)" />
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import CardList from "./CardList";
import typeList from "../../config/type";
export default {
  name: "GoodBlock",
  data() {
    return {
      typeList
    };
  },
  components: { CardList },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    slice() {
      if (!this.title || !this.typeList) {
        return;
      }
      let arr = [];
      let list = this.typeList[this.title];
      if (list) {
        for (let i = 0; i < list.length; i += 2) {
          arr.push(list.slice(i, i + 2));
        }
      }
      return arr;
    },
    slice2() {
      if (!this.title || !this.typeList) {
        return;
      }
      let arr = [];
      let list = this.typeList[this.title];
      if (list) {
        for (let i = 0; i < list.length; i += 2) {
          arr.push(list.slice(i, i + 2));
        }
      }
      return arr;
    }
  },
  props: {
    title: {
      type: String,
      default: "活动"
    },
    list: Array
  }
};
</script>

<style scoped>
.card-item {
}
.card-item:hover {
  transform: scale(1.03);
}
a {
  font-size: 12px;
}
a:hover {
  color: orangered;
  cursor: pointer;
}
</style>
