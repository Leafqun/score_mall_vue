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
        <div style="margin-left: 30px; margin-top: 20px; max-width: 600px; font-size: 18px;">
          <div>
            积分说明
          </div>
          <div>
            1. 获取积分常规的方法，当然是消费，消费，消费，这个一定是必须的。在商场吃饭，买衣服什么的，尽可能刷信用卡。当然对于是有信用卡的朋友，这点非常重要。
          </div>
          <div>
            2.在浙商银行签到页面，签到成功，可以每天获取20积分，与其同时连续签到还可以获得抽奖机会，每7天签到可获得额外800交易积分大礼包。
          </div>
          <div>
            3. 参与报名快捷支付送积分活动。在首页找到《活动报名》，点击进入。
          </div>
          <div>
            4. 在活动界面，可以找到很多活动，比如快捷支付活动，京东8倍积分，女神节10倍积分。消费加上这些活动，立马可以让积分的获取速度加快。活动有时效性，但好在经常会有活动，所以需要在签到的时候，点一点，看一看最近有什么活动。
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
