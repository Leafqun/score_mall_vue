<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <HomeHeader />
    <RedToolBar />
    <!-- 订单信息 -->
    <div :style="{ padding: '0 200px', marginTop: '40px' }">
      <!-- 收货信息 -->
      <ToolbarCard title="收货信息">
        <div>
          <!-- 默认地址 -->
          <div>
            <span><v-icon>map</v-icon></span>
            <span style="margin-left: 10px">默认地址</span>
            <span style="margin-left: 10px"><v-btn small>修改</v-btn></span>
          </div>

          <!-- 收件人-->
          <div style="margin-top: 20px">
            <span class="user_label">收&nbsp;件&nbsp;&nbsp;人:</span>
            <span style="margin-left: 10px">{{ user.name }}</span>
          </div>

          <!-- 联系方式-->
          <div style="margin-top: 20px">
            <span class="user_label">联系方式:</span>
            <span style="margin-left: 10px">{{ user.phone }}</span>
          </div>

          <!-- 收货地址-->
          <div style="margin-top: 20px; margin-bottom: 15px">
            <span class="user_label">收货地址:</span>
            <span style="margin-left: 10px">{{ user.address }}</span>
          </div>
        </div>
      </ToolbarCard>

      <!-- 商品信息 -->
      <v-data-table
        :hide-actions="true"
        :headers="headers"
        :items="desserts"
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
                  src="https://picsum.photos/500/300?image=20"
                  lazy-src="https://picsum.photos/10/6?image=20"
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
              <div style="margin-left: 10px">{{ props.item.name }}</div>
            </v-layout>
          </td>
          <td class="text-xs-left">{{ props.item.calories }}</td>
          <td class="text-xs-left">{{ props.item.fat }}</td>
          <td class="text-xs-left">{{ props.item.carbs }}</td>
          <td class="text-xs-left">{{ props.item.protein }}</td>
        </template>
      </v-data-table>

      <!-- 支付 -->
      <v-layout
        align-start
        justify-space-between
        row
        fill-height
        style="margin-top: 30px"
      >
        <!-- 返回上一级 -->
        <div>
          <v-btn color="orange darken-2" dark>
            <v-icon dark left>arrow_back</v-icon>Back
          </v-btn>
        </div>

        <!-- 确认支付 -->
        <div>
          <div style="font-size: 17px; font-weight: 700;">
            <span>应付总额：</span>
            <span style="margin-left: 15px">￥23432</span>
          </div>

          <!-- 支付按钮 -->
          <div style="margin-top: 20px; text-align: right">
            <v-btn color="red" @click="dialog = true"
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
          <div
            style="font-size: 17px; font-weight: 700;text-align: center; height: 40px; line-height: 40px; margin-top: 5px"
          >
            请输入支付密码
          </div>

          <v-divider style="margin-bottom: 15px;" />

          <!-- 输入框 -->
          <v-layout>
            <div
              style="border: 1px solid #999999; margin-left: 2px"
              v-for="i in [0, 1, 2, 3, 4, 5]"
              :key="i"
            >
              <input
                v-model="num"
                style="width: 30px; height: 30px; text-align: center"
              />
            </div>
          </v-layout>

          <!-- 确认 -->
          <div style="margin-top: 15px; margin-bottom: 15px">
            <v-btn color="red" @click="submit" :disabled="disabled">确认</v-btn>
          </div>
        </v-layout>

        <!-- 正在支付 -->
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
              <div class="remark">支付失败</div>
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
      user: {
        address: "浙江省杭州市西湖区西溪街道浙江大学西溪校区9幢",
        name: "陈卓",
        phone: "183445676377",
        id: 1
      },
      passNum: [],
      dialog: false,
      isShow: true,
      loading: false,
      checked: true,
      persistent: true,
      disabled: false,
      headers: [
        {
          text: "商品名称",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "单价", value: "calories", sortable: false },
        { text: "数量", value: "fat", sortable: false },
        { text: "小计", value: "carbs", sortable: false },
        { text: "实付", value: "protein", sortable: false }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0
        }
      ]
    };
  },
  methods: {
    submit() {
      this.persistent = true;
      this.isShow = false;
      this.loading = true;
      this.disabled = true;
      setTimeout(() => {
        //this.dialog = false;
        this.loading = false;
        this.persistent = false;
      }, 2000);
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
