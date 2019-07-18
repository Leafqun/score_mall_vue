<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <HomeHeader />
    <RedToolBar />
    <!-- 订单信息 -->
    <div :style="{ padding, marginTop: '40px' }">
      <!-- 收货信息 -->
      <ToolbarCard title="收货信息">
        <div>
          <!-- 默认地址 -->
          <div>
            <span><v-icon>map</v-icon></span>
            <span style="margin-left: 10px">默认地址</span>
            <span style="margin-left: 10px"><v-btn small @click="$router.push('/personal/material')">修改</v-btn></span>
          </div>

          <!-- 收件人-->
          <div style="margin-top: 20px">
            <span class="user_label">收&nbsp;件&nbsp;&nbsp;人:</span>
            <span style="margin-left: 10px">{{ address.receiver }}</span>
          </div>

          <!-- 联系方式-->
          <div style="margin-top: 20px">
            <span class="user_label">联系方式:</span>
            <span style="margin-left: 10px">{{ address.phoneNum }}</span>
          </div>

          <!-- 收货地址-->
          <div style="margin-top: 20px; margin-bottom: 15px">
            <span class="user_label">收货地址:</span>
            <span style="margin-left: 10px">{{ address.place }}</span>
          </div>
        </div>
      </ToolbarCard>

      <!-- 商品信息 -->
      <v-data-table
        v-if="x > 800"
        :hide-actions="true"
        :headers="headers"
        :items="orderList"
        class="elevation-1"
        style="margin-top: 30px"
      >
        <template v-slot:items="props">
          <td>
            <v-layout
              align-center
              justify-start
              row
              fill-height
              style="height: 120px"
            >
              <div style="width: 100px; height: 100px">
                <v-img
                  :src="
                    order.good_pic
                      ? `${$picUrl}/${order.good_pic}.png`
                      : 'https://picsum.photos/500/300?image=20'
                  "
                  aspect-ratio="1"
                  class="grey lighten-2"
                >
                  <template v-slot:placeholder>
                    <v-layout fill-height align-center justify-center ma-0>
                      <v-progress-circular
                        indeterminate
                        color="grey lighten-5"
                      ></v-progress-circular>
                    </v-layout>
                  </template>
                </v-img>
              </div>
              <div style="margin-left: 10px">{{ props.item.goodName }}</div>
            </v-layout>
          </td>
          <td class="text-xs-left">
            <div>原价：￥{{ props.item.price }}</div>
            <div>积分兑换：{{ props.item.integral }}积分</div>
          </td>
          <td class="text-xs-left">{{ props.item.goodNum }}</td>
          <td class="text-xs-left">
            <div>原价：￥{{ props.item.price * props.item.goodNum }}</div>
            <div>
              积分兑换：{{ props.item.integral * props.item.goodNum }}积分
            </div>
          </td>
          <td class="text-xs-left">
            <div>原价：￥{{ props.item.price * props.item.goodNum }}</div>
            <div>
              积分兑换：{{ props.item.integral * props.item.goodNum }}积分
            </div>
          </td>
        </template>
      </v-data-table>

      <!-- 商品信息 小尺寸-->
      <v-expansion-panel v-else>
        <v-expansion-panel-content>
          <template v-slot:header>
            <div>
              <v-layout
                align-center
                justify-space-between
                row
                fill-height
                style="height: 100px; font-size: 12px;"
              >
                <div style="width: 60px; height: 60px">
                  <v-img
                    :src="
                      order.good_pic
                        ? `${$picUrl}/${order.good_pic}.png`
                        : 'https://picsum.photos/500/300?image=20'
                    "
                    aspect-ratio="1"
                    class="grey lighten-2"
                  >
                    <template v-slot:placeholder>
                      <v-layout fill-height align-center justify-center ma-0>
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-layout>
                    </template>
                  </v-img>
                </div>
                <div style="margin-left: 10px">{{ order.goodName }}</div>
                <div>
                  <div>原价：￥{{ order.price * order.goodNum }}</div>
                  <div>积分兑换：{{ order.integral * order.goodNum }}积分</div>
                </div>
              </v-layout>
            </div>
          </template>
          <v-card>
            <v-card-text>
              <div class="text-xs-left">
                <div>原价：￥{{ order.price }}</div>
                <div>积分兑换：{{ order.integral }}积分</div>
              </div>
              <div class="text-xs-left">数量{{ order.goodNum }}</div>
              <div class="text-xs-left">
                <div>原价：￥{{ order.price * order.goodNum }}</div>
                <div>积分兑换：{{ order.integral * order.goodNum }}积分</div>
              </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- 支付 -->
      <v-layout
        align-end
        justify-space-between
        row
        fill-height
        style="margin-top: 30px"
      >
        <!-- 返回上一级 -->
        <div>
          <v-btn color="orange darken-2" dark @click="cancel">
            <v-icon dark left>arrow_back</v-icon>Back
          </v-btn>
        </div>

        <!-- 确认支付 -->
        <div>
          <div style="font-size: 17px; font-weight: 700;">
            <span>应付总额：</span>
            <span style="margin-left: 15px">{{ reactPay }}</span>
          </div>

          <!-- 支付按钮 -->
          <div style="margin-top: 20px; text-align: right">
            <v-btn
              color="red"
              @click="
                dialog = true;
                isShow = true;
                disabled = false;
              "
              :disabled="!isEnough"
              ><span style="color: white">确认支付</span></v-btn
            >
          </div>
        </div>
      </v-layout>
    </div>

    <!-- 支付结果 -->
    <v-dialog
      v-model="dialog"
      width="400"
      :hide-overlay="false"
      :persistent="persistent"
    >
      <v-card color="white">
        <!-- 密码输入-->
        <v-layout align-center justify-center column v-if="isShow">
          <v-toolbar flat>
            <div
              style="font-size: 17px; font-weight: 700;text-align: center; height: 40px; line-height: 40px; margin-top: 5px"
            >
              请输入支付密码
            </div>
            <v-spacer></v-spacer>
            <v-btn icon @click="closeDialog">
              <v-icon>fas fa-times</v-icon>
            </v-btn>
          </v-toolbar>

          <v-divider style="margin-bottom: 15px;" />

          <!-- 输入框 -->
          <v-layout>
            <div
              style="border: 1px solid #999999; margin-left: 2px"
              v-for="i in [0, 1, 2, 3, 4, 5]"
              :key="i"
            >
              <input type="password"
                v-model="num[i]"
                style="width: 30px; height: 30px; text-align: center"
              />
            </div>
          </v-layout>

          <!-- 确认 -->
          <div style="margin-top: 15px; margin-bottom: 15px">
            <v-btn color="red" @click="submit" :disabled="disabled">确认</v-btn>
          </div>
        </v-layout>

        <!-- 正在支付动画结果 -->
        <v-card-text style="text-align: center" v-else>
          <div v-if="loading">
            <div class="remark">正在支付</div>
            <div style="margin-top: 15px">
              <v-progress-circular
                indeterminate
                color="red"
              ></v-progress-circular>
            </div>
          </div>

          <div v-else>
            <!-- 支付成功 -->
            <div v-if="checked">
              <div class="remark">支付成功</div>
              <div style="margin-top: 15px;">
                <v-icon color="green" :size="40">fas fa-check-circle</v-icon>
              </div>
            </div>

            <!-- 支付失败 -->
            <div v-else>
              <div class="remark">支付失败, {{ payStatus }}</div>
              <div style="margin-top: 15px;">
                <v-icon color="red" :size="40">fas fa-times-circle</v-icon>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from "../../components/footer/HomeFooter";
import HomeHeader from "../../components/header/HomeHeader";
import RedToolBar from "../../components/main/RedToolBar";
import ToolbarCard from "../../components/main/ToolbarCard";
export default {
  name: "Order",
  components: { ToolbarCard, RedToolBar, HomeHeader, HomeFooter },
  data() {
    return {
      address: {},
      passNum: [],
      dialog: false,
      isShow: true,
      loading: false,
      checked: true,
      persistent: true,
      disabled: false,
      num: [1, 2, 3, 4, 5, 6],
      headers: [
        {
          text: "商品名称",
          align: "left",
          sortable: false,
          value: "goodName"
        },
        { text: "单价", value: "", sortable: false },
        { text: "数量", value: "goodNum", sortable: false },
        { text: "小计", value: "", sortable: false },
        { text: "实付", value: "", sortable: false }
      ],
      orderList: [this.$store.state.order],
      payStatus: "",
      orderStatus: "",
      minusStatus: "",
      score: {}
    };
  },
  created() {
    this.getAddress();
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    padding() {
      if (this.x > 1200) {
        return "0 200px";
      } else if (this.x > 800) {
        return "0 100px";
      } else if (this.x > 500) {
        return "0 40px";
      } else {
        return "0 15px";
      }
    },
    order() {
      return this.$store.state.order;
    },
    reactPay() {
      const score = this.$store.state.user.score;
      if (score >= this.order.integral) {
        return this.order.integral * this.order.goodNum + "积分";
      } else {
        return "积分不足";
      }
    },
    isEnough() {
      const score = this.$store.state.user.score;
      if (score >= this.order.integral) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    async getAddress() {
      const { data } = await this.$axios.get(
        `${this.$userUrl}/getFirstAddress`,
        {
          params: { userid: this.$store.state.user.id }
        }
      );
      this.address = data.address;
    },
    submit() {
      this.persistent = true;
      this.isShow = false;
      this.loading = true;
      this.disabled = true;
      // 支付
      this.pay(this.num.join(""));
      this.insetOrders();
      this.minus();
      setTimeout(() => {
        this.loading = false;
        if (this.payStatus) {
          this.checked = false;
          this.num = [];
        } else {
          this.checked = true;
        }
      }, 2000);

      setTimeout(() => {
        this.persistent = false;
        if (!this.payStatus) {
          this.clearOrder();
          this.$router.push(
            `/good/${this.$route.params.type}/${
              this.$route.params.id
            }/order/success`
          );
        }
      }, 3000);
    },
    async minus() {
      const { data } = await this.$axios.get(
        `${this.$goodUrl}/minusNumber`,
        {
          params: { goodid: this.$route.params.id, goodnumber: this.$store.state.order.goodNum }
        }
      );
      this.minusStatus = data.msg;
    },
    getAll(price, num) {
      return price * num;
    },
    clearOrder() {
      this.$store.dispatch("setOrder", null);
      sessionStorage.setItem("order", null);
    },
    closeDialog() {
      this.dialog = false;
      this.num = [];
    },
    cancel() {
      /* 回到商品详情界面，清空订单信息*/
      this.clearOrder();
      this.$router.push(
        "/good/" + this.$route.params.type + "/" + this.$route.params.id
      );
    },
    async pay(password) {
      const { data } = await this.$axios.get(`${this.$userUrl}/pay1`, {
        params: {
          userid: this.$store.state.user.id,
          goodid: this.$route.params.id,
          password,
          goodScore: this.$store.state.order.integral,
          goodnumber: this.$store.state.order.goodNum
        }
      });
      this.payStatus = data.msg;
      this.score = data.score;
    },
    async insetOrders() {
      let order = this.order;
      order["goodPic"] = order["good_pic"];
      const { data } = await this.$axios.get(`${this.$orderUrl}/insertOrders`, {
        params: order
      });
      this.orderStatus = data.msg;
    }
  }
};
</script>

<style scoped>
.user_label {
  color: darkgray;
}
.remark {
  font-weight: 700;
  font-size: 17px;
}
</style>
