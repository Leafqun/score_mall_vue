<template>
  <div>
    <v-layout row>
      <div>
        <div class="user_avatar">用户头像:</div>
        <div class="user_id">用户ID:</div>
        <div class="user_account">邮箱:</div>
        <div class="user_nickname">昵称:</div>
        <div class="user_sex">性别:</div>
        <div class="user_phone">手机号码:</div>
        <div class="user_birthdate">出生日期:</div>
      </div>
      <div style="margin-left: 50px">
        <div class="user_avatar">
          <v-avatar :tile="false" :size="50" color="grey lighten-4">
            <img
              :src="
                user.avatar
                  ? `${this.$picUrl}/${user.avatar}`
                  : 'https://vuetifyjs.com/apple-touch-icon-180x180.png'
              "
              alt="avatar"
            />
          </v-avatar>
        </div>
        <div class="user_id">{{ user.id }}</div>
        <div class="user_account">{{ user.mail }}</div>
        <div
          class="user_nickname"
          :style="{ width: x < 400 ? x - 220 + 'px' : 'auto' }"
        >
          <v-text-field
            v-model="nickname"
            label="Solo"
            single-line
            solo
          ></v-text-field>
        </div>
        <div class="user_sex">
          <v-radio-group v-model="sex" row>
            <v-radio label="男" :value="0" color="blue" disabled></v-radio>
            <v-radio label="女" :value="1" color="red" disabled></v-radio>
          </v-radio-group>
        </div>
        <div class="user_phone">{{ user.phone }}</div>
        <div class="user_birthdate">{{ user.birthdate }}</div>
      </div>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: "Information",
  data() {
    return {
      nickname: this.user.nickname,
      sex: this.user.sex
    };
  },
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    }
  },
  props: {
    user: {
      type: Object
    }
  }
};
</script>

<style scoped>
.user_avatar {
  margin-top: 20px;
  margin-bottom: 20px;
  height: 50px;
}
.user_id {
  margin-bottom: 30px;
}
.user_account {
  margin-bottom: 20px;
  height: 40px;
}
.user_nickname {
  margin-bottom: 20px;
  height: 60px;
}
.user_sex {
  margin-bottom: 30px;
  height: 30px;
}
.user_phone {
  margin-bottom: 30px;
}
.user_birthdate {
  margin-bottom: 30px;
}
</style>
