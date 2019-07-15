<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <!-- 备注 -->
    <v-layout align-center justify-space-between row fill-height>
      <div>已保存收货地址（地址最多20条）</div>
      <div @click="dialog = true">+新增地址</div>
    </v-layout>

    <!-- 表格 -->
    <v-data-table
      style="margin-top: 20px; margin-bottom: 20px; width: 100%"
      :headers="headers"
      :items="list"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ props.item.receiver }}</td>
        <td class="text-xs-left">{{ props.item.phoneNum }}</td>
        <td class="text-xs-left">{{ props.item.place }}</td>
        <td class="justify-center layout px-0 align-center">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
          <v-btn small :disabled="props.item.first === 1">{{
            props.item.first === 1 ? "默认地址" : "设为默认地址"
          }}</v-btn>
        </td>
      </template>
    </v-data-table>

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
          <v-toolbar-title>添加地址</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-text-field
            ref="receiver"
            v-model="receiver"
            :rules="[() => !!receiver || 'This field is required']"
            label="收件人"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="address"
            v-model="address"
            :rules="[
              () => !!address || 'This field is required',
              () =>
                (!!address && address.length <= 25) ||
                'Address must be less than 25 characters'
            ]"
            label="地址"
            placeholder="Snowy Rock Pl"
            counter="25"
            required
          ></v-text-field>
          <v-text-field
            ref="phone"
            v-model="phone"
            :rules="[() => !!phone || 'This field is required']"
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

      address: "",
      receiver: "",
      phone: "",
      headers: [
        {
          text: "收货人",
          align: "left",
          sortable: false,
          value: "receiver"
        },
        { text: "联系方式", value: "phoneNum", sortable: false },
        { text: "地址", value: "place", sortable: false },
        { text: "操作", value: "carbs", sortable: false, align: "center" }
      ]
    };
  },
  props: {
    list: Array,
    total: Number
  }
};
</script>

<style scoped></style>
