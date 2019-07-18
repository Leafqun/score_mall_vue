<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- 备注 -->
    <v-layout align-center justify-space-between row fill-height>
      <div>已保存收货地址（地址最多20条）</div>
      <div
        @click="
          dialog = true;
          isEdit = false;
        "
      >
        <a>+新增地址</a>
      </div>
    </v-layout>

    <!-- 表格 -->
    <v-data-table
      :loading="loading"
      hide-actions
      style="margin-top: 20px; margin-bottom: 20px; width: 100%"
      :headers="headers"
      :total-items="total"
      :pagination.sync="pagination"
      :items="list"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.receiver }}</td>
        <td class="text-xs-left">{{ props.item.phoneNum }}</td>
        <td class="text-xs-left">
          <div style="text-overflow: ellipsis; min-width: 150px">
            {{ props.item.place }}
          </div>
        </td>
        <td class="justify-center layout px-0 align-center">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item.id)" :disabled="props.item.first === 1">
            delete
          </v-icon>
          <v-btn
            small
            :disabled="props.item.first === 1"
            @click="updateFirst(props.item)"
            >{{ props.item.first === 1 ? "默认地址" : "设为默认地址" }}</v-btn
          >
        </td>
      </template>
    </v-data-table>

    <v-snackbar v-model="snackbar" top :timeout="2000" vertical>
      输入信息不全！！！
    </v-snackbar>
    <!-- 分页 -->
    <div style="margin-top: 15px;" v-if="total > pageSize">
      <v-pagination
        v-model="currentPage"
        :length="Math.floor(total / pageSize) + 1"
        circle
        @input="handlePageChange"
      ></v-pagination>
    </div>

    <!-- dialog-->
    <v-dialog
      v-model="dialog"
      :fullscreen="$store.state.windowSize.x > 800 ? false : true"
      :width="$store.state.windowSize.x > 800 ? 400 : 'auto'"
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
    >
      <v-card tile>
        <v-toolbar card dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <div v-if="!isEdit">添加地址</div>
            <div v-else>修改地址</div>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="submit(address)">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            ref="receiver"
            v-model="address.receiver"
            :rules="[() => !!address.receiver || 'This field is required']"
            label="收件人"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="address.place"
            :rules="[
              () => !!address.place || 'This field is required',
              () =>
                (!!address.place && address.place.length <= 25) ||
                'Address must be less than 25 characters'
            ]"
            label="地址"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
          ></v-text-field>
          <v-text-field
            ref="phone"
            v-model="address.phoneNum"
            :rules="[() => !!address.phoneNum || 'This field is required']"
            label="电话"
            placeholder="El Paso"
            required
          ></v-text-field>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "AddressList",
  data() {
    return {
      dialog: false,
      snackbar: false,
      pagination: {
        sortBy: "first"
      },
      currentPage: 1,
      pageSize: 10,
      address: {
        place: "",
        receiver: "",
        phoneNum: ""
      },
      isEdit: false,
      headers: [
        {
          text: "收货人",
          align: "left",
          sortable: false,
          value: "receiver"
        },
        { text: "联系方式", value: "phoneNum", sortable: false },
        { text: "地址", value: "place", sortable: false },
        { text: "操作", value: "first", sortable: false, align: "center" }
      ]
    };
  },
  props: {
    list: Array,
    total: Number,
    loading: Boolean
  },
  methods: {
    async updateFirst(item) {
      item["first"] = 1;
      const { data } = await this.$axios.get(`${this.$userUrl}/updateAddress`, {
        params: item
      });
      if (data.msg === "success") {
        this.$emit("change", {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
      }
    },
    async insertAddress(item) {
      const { data } = await this.$axios.get(`${this.$userUrl}/insertAddress`, {
        params: item
      });
      if (data.msg === "success") {
        this.$emit("change", {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
        this.dialog = false;
        this.address = {};
      }
    },
    async updateAddress(item) {
      const { data } = await this.$axios.get(`${this.$userUrl}/updateAddress`, {
        params: item
      });
      if (data.msg === "success") {
        this.$emit("change", {
          currentPage: this.currentPage,
          pageSize: this.pageSize
        });
        this.dialog = false;
        this.address = {};
      }
    },
    submit(address) {
      if (
        address.place === "" ||
        address.phoneNum === "" ||
        address.receiver === ""
      ) {
        this.snackbar = true;
        return false;
      }
      address["userId"] = this.$store.state.user.id;
      if (!this.isEdit) {
        this.insertAddress(address);
      } else {
        this.updateAddress(address);
      }
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.$emit("change", {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
    },
    editItem(item) {
      this.address = item;
      this.isEdit = true;
      this.dialog = true;
    },
    deleteItem(id) {
      console.log(id);
    }
  }
};
</script>

<style scoped>
a {
}
a:hover {
  color: #0d47a1;
  cursor: pointer;
}
</style>
