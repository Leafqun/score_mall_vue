<template>
  <v-card>
    <v-tabs
      v-model="active"
      color="#F8F9FA"
      dark
      slider-color="red"
      @change="handleTabsChange"
    >
      <v-tab style="width: 150px; color: black" ripple>我的订单</v-tab>
      <v-tab style="width: 150px; color: black" ripple>我的地址</v-tab>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <OrderList
              :list="orderList"
              :total="orderTotal"
              @change="handleOrdersListChange"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <AddressList
              @change="handlePageChange"
              :loading="loading"
              :list="addressList"
              :total="addressTotal"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import OrderList from "../../components/main/OrderList";
import AddressList from "../../components/main/AddressList";
export default {
  name: "Material",
  components: { AddressList, OrderList },
  data() {
    return {
      active: null,
      first: 0,
      user: {},
      addressList: [],
      orderList: [],
      orderTotal: 0,
      orderCurrentPgae: 1,
      addressTotal: 0,
      addressCurrentPage: 1,
      loading: true
    };
  },
  created() {
    this.getOrderList(1, 10);
  },
  methods: {
    async getOrderList(currentPage, pageSize) {
      const { data } = await this.$axios.get(
        `${this.$orderUrl}/getOrdersListByUserId`,
        {
          params: { currentPage, pageSize, userId: this.$store.state.user.id }
        }
      );
      this.orderList = data.page.records;
      this.orderTotal = data.page.total;
    },
    async getAddressList(currentPage, pageSize) {
      this.loading = true;
      const { data } = await this.$axios.get(
        `${this.$userUrl}/getAddressListByUserId`,
        {
          params: { currentPage, pageSize, userid: this.$store.state.user.id }
        }
      );
      this.loading = false;
      this.addressList = data.page.records.reverse();
      this.addressTotal = data.page.total;
    },
    handleTabsChange(item) {
      if (this.first === 0) {
        this.getAddressList(1, 10);
      }
      this.active = item;
    },
    handleOrdersListChange(data) {
      this.getOrderList(data.currentPage, data.pageSize);
    },
    handlePageChange(data) {
      this.getAddressList(data.currentPage, data.pageSize);
    }
  }
};
</script>

<style scoped></style>
