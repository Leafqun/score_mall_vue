<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <HomeHeader />
    <RedToolBar />
    <div :style="{ padding }">
      <!--面包屑-->
      <div>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
      </div>
      <!--商品详情 -->
      <div>
        <v-layout row wrap>
          <!-- 图片-->
          <div>
            <!-- 大图 -->
            <div>
              <img
                src="https://picsum.photos/500/300?image=15"
                :style="{
                  width: x > 600 ? '350px' : x - 45 + 'px',
                  height: x > 600 ? '400px' : '150px',
                  objectFit: 'cover'
                }"
              />
            </div>
          </div>

          <!-- 产品详情 -->
          <div style="margin-left: 30px;">
            <div class="good_name">{{ good.goodName }}</div>
            <div class="good_short">{{ good.descriptionShort }}</div>
            <div class="good_price" style="margin-top: 30px">
              <span>价格：</span>
              <span style="margin-left: 15px; font-size: 18px"
                >￥{{ good.price }}</span
              >
            </div>
            <div class="good_price" style="margin-top: 10px">
              <span>积分兑换：</span>
              <span style="margin-left: 15px; font-size: 18px; color: #ea0404"
                >{{ good.scorePrice }}积分</span
              >
            </div>
            <div style="margin-top: 15px;">
              <span>库存:</span>
              <span style="margin-left: 15px">{{ good.store }}</span>
            </div>
            <div style="margin-top: 15px;">
              <span>供应商:</span>
              <span style="margin-left: 15px">{{ good.supplier }}</span>
            </div>

            <!-- 购买数量 -->
            <v-layout style="margin-top: 15px;">
              <div>购买数量:</div>
              <v-layout style="margin-left: 15px">
                <div class="good_bt" @click="num > 1 ? num-- : 1">
                  <v-icon>remove</v-icon>
                </div>
                <div style="border: 1px solid #999999;">
                  <input
                    v-model="num"
                    style="width: 50px; height: 24px; text-align: center"
                  />
                </div>
                <div class="good_bt" @click="num++">
                  <v-icon>add</v-icon>
                </div>
              </v-layout>
            </v-layout>
            <div style="margin-top: 20px">
              <v-btn color="#ea0404"
                ><span style="color: white">购买</span></v-btn
              >
            </div>
          </div>
        </v-layout>
      </div>

      <!-- 商品介绍 -->
      <div style="margin-top: 20px;">
        <div>商品介绍</div>
        <v-divider style="margin-top: 15px; margin-bottom: 20px;" />
        <div>{{ good.descriptionLong }}</div>
      </div>
    </div>
    <HomeFooter />
  </div>
</template>

<script>
import HomeHeader from "../../components/header/HomeHeader";
import RedToolBar from "../../components/main/RedToolBar";
import HomeFooter from "../../components/footer/HomeFooter";
export default {
  name: "GoodInfo",
  components: { HomeFooter, RedToolBar, HomeHeader },
  created() {
    this.getGood();
  },
  data() {
    return {
      items: [
        { text: "首页", disabled: false, href: "/" },
        { text: "美食酒水", disabled: false, href: "/" },
        { text: "坚果炒货", disabled: false, href: "/" },
        { text: "鲜脆每日坚果 25克*7克", disabled: true, href: "" }
      ],
      good: {
        id: 1,
        goodName: "sfs"
      },
      num: 1
    };
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
    async getGood() {
      const { data } = await this.$axios.get(`${this.$goodUrl}/getGood`, {
        params: { id: this.$route.params.id }
      });
      this.good = data.good;
    }
  }
};
</script>

<style scoped>
.good_name {
  font-size: 18px;
  font-weight: 700;
}
.good_short {
  color: #999999;
  margin-top: 10px;
  font-size: 14px;
}
.good_price {
  font-weight: 600;
}
.good_bt {
  width: 26px;
  height: 26px;
  border: 1px solid #999999;
}
.good_bt:hover {
  background-color: red;
  cursor: pointer;
}
</style>
