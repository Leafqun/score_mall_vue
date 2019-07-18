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
                style="font-size: 26px; font-weight: 800; text-align: center"
              >
                V{{ user.type }}会员
              </div>
              <div>每月一号可更新会员等级</div>
            </div>

            <!-- 会员积分 -->
            <div>
              <v-chip color="red" text-color="white" style="font-size: 18px;"
                >我的积分：{{ user.score }}</v-chip
              >
            </div>
          </v-layout>
        </div>

        <!-- 会员说明 -->
        <div style="padding: 0 35px; margin-top: 20px; max-width: 680px;letter-spacing:2px; line-height: 30px;" class="desc">
          <div style="font-size: 18px; margin-bottom: 10px;">
            积分说明

          </div>
          <div>
            1. 借记卡及信用卡用户可通过消费按照一定规则获取积分，在本行的合作商户进行消费可获得额外积分，具体规则请具体到店或参考 《浙商银行商户积分获取规则》。
          </div>
          <div>
            2. 可通过本行的每日签到获取积分，同时连续签到满30天可获得以此抽奖机会，每签到满60天可额外获得60积分。
          </div>
          <div>
            3. 本行将不定期推出获取积分的活动，详情请留意本行的活动通知页面。
          </div>
          <div>
            4. 会员等级由会员成长值决定，成长值根据过往一个月的消费水平会的，一年内会员成长值只增不减。
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
      user: {},
      data() {
        return {
          msg: ""
        }
      }
    };
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    width() {
      if (this.x > 1200) {
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
  .desc {
    font-family:仿宋, 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu；
  }
</style>
