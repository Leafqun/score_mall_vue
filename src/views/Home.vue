<template>
  <div>
    <div>
      <HomeHeader />
    </div>
    <v-layout style="background-color: #ea0404;" align-end column fill-height>
      <v-toolbar height="60" color="#ea0404">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field
            style="margin-top: 5px; width: 300px;"
            label="Regular"
            solo
            append-icon="search"
          ></v-text-field>
        </v-toolbar-items>
      </v-toolbar>
    </v-layout>
    <div :style="{ padding }">
      <v-carousel :style="{ height: x > 800 ? '400px' : '200px' }">
        <v-carousel-item
          lazy
          v-for="(item, i) in items"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
      </v-carousel>

      <!-- 内容 -->
      <div style="margin-top: 20px;">
        <GoodBlock
          :id="type"
          :title="type"
          v-for="(type, index) in typeList"
          :key="type"
          :list="list[index] ? list[index] : goodList"
        />
      </div>

      <!-- 导航栏 -->
      <div
        style="position: fixed; top: 100px; left: 20px; z-index: 100"
        v-if="this.x > 1200 && $store.state.scrollTop > 400"
      >
        <div
          class="achor"
          @click="goto(type)"
          v-for="type in typeList"
          :key="type"
        >
          {{ type }}
        </div>
      </div>
    </div>
    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from "../components/header/HomeHeader";
import GoodBlock from "../components/main/GoodBlock";
import HomeFooter from "../components/footer/HomeFooter";
export default {
  components: {
    HomeFooter,
    GoodBlock,
    HomeHeader
  },
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
        }
      ],
      goodList: [
        { id: 1, goodName: "蚊香", price: "199" },
        { id: 2, goodName: "糖果", price: "12" },
        { id: 3, goodName: "苹果", price: "112" },
        { id: 4, goodName: "梨", price: "9" },
        { id: 5, goodName: "蚊香", price: "199" },
        { id: 6, goodName: "糖果", price: "12" },
        { id: 7, goodName: "苹果", price: "112" },
        { id: 8, goodName: "梨", price: "9" },
        { id: 9, goodName: "蚊香", price: "199" },
        { id: 10, goodName: "糖果", price: "12" }
      ],
      list: [],
      typeList: [
        "金融",
        "手机家电",
        "食品茶酒",
        "居家生活",
        "黄金珠宝",
        "服饰配包",
        "个护化妆",
        "图书文化",
        "其它"
      ],
      isClick: false,
      userList: []
    };
  },
  created() {
    //this.getGoodList(1, 10);
    for (let i = 0; i < this.typeList.length; i++) {
      this.getGoodListByTag(1, 10, this.typeList[i], i);
    }
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
        return "0 100px";
      } else if (this.x > 800) {
        return "0 50px";
      } else {
        return "0 15px";
      }
    }
  },
  methods: {
    async getGoodList(currentPage, pageSize) {
      const { data } = await this.$axios.get(`${this.$goodUrl}/getGoodList`, {
        params: { currentPage, pageSize }
      });
      this.userList = data.page.records;
    },
    async getGoodListByTag(currentPage, pageSize, bigClassify, i) {
      const { data } = await this.$axios.get(
        `${this.$goodUrl}/getGoodListByType`,
        { params: { currentPage, pageSize, bigClassify } }
      );
      this.list[i] = data.page.records;
    },
    async getGoodListByTag1(currentPage, pageSize, bigClassify) {
      const { data } = await this.$axios.get(
        `${this.$goodUrl}/getGoodListByType`,
        { params: { currentPage, pageSize, bigClassify } }
      );
      return data.page.records;
    },
    goto(id) {
      const dom = document.querySelector(`#${id}`);
      this.$vuetify.goTo(dom, {
        duration: 300,
        offset: 10
      });
    }
  }
};
</script>
<style scoped>
.achor {
  width: 40px;
  height: 40px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: rgb(245, 245, 245);
  margin-bottom: 5px;
}
.achor:hover {
  background-color: rgb(255, 99, 71);
  cursor: pointer;
}
</style>
