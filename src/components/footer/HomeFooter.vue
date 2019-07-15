<template>
  <v-toolbar height="60" :color="color" style="margin-top: 50px;" :flat="flat">
    <v-layout align-center justify-space-between row fill-height>
      <div>
        <span>企业网银</span>
        <v-divider vertical style="margin: 0 7px; color: black" />
        <span>网点信息</span>
        <v-divider vertical style="margin: 0 7px;color: black" />
        <span>联系我们</span>
      </div>

      <div>
        <span style="margin-right: 10px;">全国统一服务电话：95527</span>
        <span style="margin-right: 10px;">浙商银行股份有限公司版权所有</span>
        <span style="margin-right: 10px;">浙ICP备</span>
        <span style="margin-right: 10px;">05008708号</span>
      </div>
    </v-layout>
  </v-toolbar>
</template>

<script>
export default {
  name: "HomeFooter",
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  }),
  props: {
    color: {
      type: String,
      default: "#ea0404"
    },
    flat: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped></style>
