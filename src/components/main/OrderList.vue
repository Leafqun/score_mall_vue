<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div style="margin-top: 20px">
    <div v-if="x > 800">
      <v-card
        v-for="order in list"
        :key="order.id"
        style="margin-bottom: 20px;"
      >
        <v-layout align-center row fill-height>
          <!-- 商品图片 -->
          <v-flex style="margin-right: 10px">
            <img
              :src="
                order.goodPic
                  ? `${$picUrl}/${order.goodPic}.png`
                  : 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
              "
              style="width: 100px; height: 100px"
            />
          </v-flex>

          <!-- 商品名 -->
          <v-flex style="margin-right: 10px; width: 100px">
            {{ order.goodName }}
          </v-flex>

          <!-- 下单时间和订单号 -->
          <v-flex style="margin-right: 10px; width: 250px">
            <div>
              <span>下单时间：</span>
              <span>{{ order.createTime | dateFilter}}</span>
            </div>
            <div>
              <span>订单号：</span>
              <span>{{ order.id }}</span>
            </div>
          </v-flex>

          <!-- 价格 -->
          <v-flex style="text-align: center;"> {{ order.integral }}积分 </v-flex>

          <div>
            <v-divider vertical />
          </div>

          <!-- 操作 -->
          <v-flex>
            <div style="text-align: center;">
              <a @click="del(order.id)">删除</a>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </div>

    <!-- 表格 -->
    <!--<v-data-table
      style="margin-top: 20px; margin-bottom: 20px"
      :headers="headers"
      hide-actions
      :items="desserts"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.calories }}</td>
        <td class="text-xs-left">{{ props.item.fat }}</td>
        <td class="justify-center layout px-0 align-center">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>-->

    <div v-else>
      <v-expansion-panel>
        <v-expansion-panel-content v-for="(item, i) in orderList" :key="i">
          <template v-slot:header>
            <v-layout align-center justify-start row fill-height>
              <v-flex style="margin-right: 10px">
                <img
                  :src="
                    order.goodPic
                      ? `${$picUrl}/${order.goodPic}.png`
                      : 'https://cdn.vuetifyjs.com/images/cards/desert.jpg'
                  "
                  style="width: 50px; height: 50px"
                />
              </v-flex>

              <!-- 商品名 -->
              <v-flex style="margin-right: 10px">
                {{ order.goodName }}
              </v-flex>
              <!-- 价格 -->
              <v-flex style="text-align: center">
                {{ order.integral }}
              </v-flex>
            </v-layout>
          </template>
          <v-card>
            <v-card-text>
              <!-- 下单时间和订单号 -->
              <div style="margin-right: 10px;">
                <div>
                  <span>下单时间：</span>
                  <span>{{ order.createTime | dateFilter }}</span>
                </div>
                <div>
                  <span>订单号：</span>
                  <span>{{ order.id }}</span>
                  <span style="margin-left: 10px">
                    <a><v-icon>delete</v-icon></a>
                  </span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </div>

    <!-- 分页 -->
    <div style="margin-top: 15px;" v-if="total > pageSize">
      <v-pagination
        v-model="currentPage"
        :length="Math.floor(total / pageSize) + 1"
        circle
        color="blue"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderList",
  data() {
    return {
      order: {
        id: 1,
        goodName: "鲜脆每日坚果",
        price: "39.00",
        num: 1,
        priceMinus: 37.05,
        createTime: "2019-08-07"
      },
      orderList: [
        {
          id: 1,
          goodName: "鲜脆每日坚果",
          price: "39.00",
          num: 1,
          priceMinus: 37.05,
          createTime: "2019-08-07"
        },
        {
          id: 2,
          goodName: "鲜脆每日坚果",
          price: "39.00",
          num: 1,
          priceMinus: 37.05,
          createTime: "2019-08-07"
        },
        {
          id: 3,
          goodName: "鲜脆每日坚果",
          price: "39.00",
          num: 1,
          priceMinus: 37.05,
          createTime: "2019-08-07"
        }
      ],
      currentPage: 1,
      headers: [
        {
          text: "订单",
          align: "left",
          sortable: false,
          value: "name"
        },
        { text: "详情", value: "calories", sortable: false },
        { text: "价格", value: "fat", sortable: false },
        { text: "操作", value: "carbs", sortable: false, align: "center" }
      ],
      pageSize: 10
    };
  },
  props: {
    list: Array,
    total: Number
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    }
  },
  filters: {
    dateFilter(date) {
      let num = date.substring(11, 13);
      let n = parseInt(num) + 13;
      return date.substring(0, 11) + n + date.substring(13);
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit("change", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    getDate(date) {
      let num = date.substring(11, 13);
      let n = parseInt(num) + 13;
      return date.substring(0, 11) + n + date.substring(13);
    },
    del(id) {
      this.delete(id);
    },
    async delete(id) {
      const { data } = await this.$axios.get(
        `${this.$orderUrl}/deleteOrdersById`,
        {
          params: { id }
        }
      );
      if (data.msg === "success") {
        this.$emit("change", {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
      }
    }
  }
};
</script>

<style scoped>
a {
}
a:hover {
  cursor: pointer;
  color: #ea0404;
}
</style>
