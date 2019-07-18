<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <HomeHeader />
    <v-layout style="background-color: #ea0404;" align-end column fill-height>
      <v-toolbar height="60" color="#ea0404">
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-text-field
            style="margin-top: 5px; width: 300px;"
            label="商品类型"
            solo
            v-model="search"
            append-icon="search"
            @click:append="$router.push(`list/${search}`)"
          ></v-text-field>
        </v-toolbar-items>
      </v-toolbar>
    </v-layout>

    <div :style="{ marginTop: '20px', padding }">
      <div style="margin-top: 15px;">
        <v-breadcrumbs :items="bread" divider=">"></v-breadcrumbs>
      </div>
      <v-layout style="margin-top: 20px">
        <!-- 导航栏 -->
        <v-card style="width: 200px" v-if="x > 1200">
          <div style="margin-top: 20px; margin-left: 10px">商品分类</div>
          <v-divider style="margin-top: 15px" />
          <div v-for="t in typeList" :key="t">
            <MenuList :title="t" :list="type[t]" />
          </div>
        </v-card>

        <div style="width: 100%">
          <!-- 商品列表 pc-->
          <div
            style="margin-left: 15px; width: 100%"
            v-if="goodList.length > 0 && x > 800"
          >
            <CardList
              :list="goodList.slice(0, 5)"
              :title="title"
              style="height: 280px;margin-bottom: 20px"
            />
            <CardList
              :list="goodList.slice(5)"
              :title="title"
              style="height: 280px;"
            />
          </div>

          <!-- 商品列表界面mobile -->
          <div
            style="margin-left: 15px; width: 100%"
            v-else-if="goodList.length > 0"
          >
            <div v-for="(item, index) in gList" :key="index">
              <CardList
                :list="item"
                :title="title"
                style="height: 280px;margin-bottom: 20px"
              />
            </div>
          </div>

          <div style="margin-left: 20px" v-else>
            无消息
          </div>
          <!-- 分页 -->
          <div style="margin-top: 15px; text-align: right">
            <v-pagination
              v-model="currentPage"
              :length="Math.floor(total / pageSize)"
              circle
              color="blue"
              @input="handlePageChange"
            ></v-pagination>
          </div>
        </div>
      </v-layout>
    </div>
    <div>
      <HomeFooter />
    </div>
  </div>
</template>

<script>
import HomeHeader from "../../components/header/HomeHeader";
import MenuList from "../../components/main/MenuList";
import type, { typeList } from "../../config/type";
import CardList from "../../components/main/CardList";
import HomeFooter from "../../components/footer/HomeFooter";
export default {
  name: "GoodList",
  components: { HomeFooter, CardList, MenuList, HomeHeader },
  data() {
    return {
      type,
      typeList,
      search: "",
      goodList: [],
      total: 1,
      currentPage: 1,
      pageSize: 10,
      title: this.$route.params.type
    };
  },
  created() {
    this.getGoodListByTag(1, 10, this.$route.params.type);
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
    },
    gList() {
      let goodList = this.goodList;
      let arr = [];
      for (let i = 0; i < goodList.length; i += 2) {
        arr.push(goodList.slice(i, i + 2));
      }
      return arr;
    },
    bread() {
      const type = this.$route.params.type;
      return [
        { text: "首页", disabled: false, href: "/score_mall/" },
        { text: type, disabled: true, href: "/score_mall/" }
      ];
    }
  },
  methods: {
    async getGoodListByTag(currentPage, pageSize, bigClassify) {
      const { data } = await this.$axios.get(
        `${this.$goodUrl}/getGoodListByType`,
        { params: { currentPage, pageSize, bigClassify } }
      );
      this.goodList = data.page.records;
      this.total = data.page.total;
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.getGoodListByTag(this.currentPage, 10, this.$route.params.type);
    }
  }
};
</script>

<style scoped></style>
