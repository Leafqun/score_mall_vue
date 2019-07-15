<template>
  <div>
    <v-card>
      <v-layout row wrap style="height: 400px">
        <!-- 会员等级 -->
        <div :style="{ width }">
          <v-layout
            class="detail"
            align-center
            justify-space-between
            column
            fill-height
            style="padding: 20px 0"
          >
            <!-- 头像名字-->
            <div>
              <v-avatar :tile="false" :size="40" color="grey lighten-4">
                <img
                  :src="
                    user.avatar
                      ? `${$picUrl}/${user.avatar}`
                      : 'https://vuetifyjs.com/apple-touch-icon-180x180.png'
                  "
                  alt="avatar"
                />
              </v-avatar>
              <span style="margin-left: 20px"
                >{{ user.nickname }} #{{ user.id }}</span
              >
            </div>

            <!-- 会员等级 -->
            <div style="color: white">
              <div
                style="font-size: 20px; font-weight: 800; text-align: center"
              >
                V{{ user.type }}会员
              </div>
              <div>每月一号可更新会员等级</div>
            </div>

            <!-- 会员积分 -->
            <div>
              <v-chip color="red" text-color="white"
                >我的积分：{{ user.score }}</v-chip
              >
            </div>
          </v-layout>
        </div>

        <!-- 会员说明 -->
        <div style="margin-left: 30px; margin-top: 20px;">
          <div>
            积分说明
          </div>
          <div>
            1.
          </div>
        </div>
      </v-layout>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "Prime",
  data() {
    return {
      user: {}
    };
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    width() {
      if (this.x > 600) {
        return "300px";
      } else {
        return "100%";
      }
    }
  },
  created() {
    this.getGood();
  },
  methods: {
    async getGood() {
      const { data } = await this.$axios.get(`${this.$userUrl}/selectByID`, {
        params: { id: this.$store.state.user.id }
      });
      this.user = data.user;
    }
  }
};
</script>

<style scoped>
.detail {
  background-color: darkgray;
  color: white;
}
</style>
