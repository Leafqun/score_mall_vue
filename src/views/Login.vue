<template>
  <div class="content">
    <v-layout class="header" align-center justify-start row fill-height>
      <div class="icon" :style="{ width: x < 570 ? '160px' : '360px' }"></div>
      <v-divider vertical dark />
      <div style="font-size: 16px; margin-left: 15px;" v-if="this.x > 300">
        登录
      </div>
    </v-layout>
    <v-layout
      row
      reverse
      :style="{
        padding,
        marginTop: y / 6 + 'px',
        minHeight: y - 80 - 50 - 60 + 'px'
      }"
    >
      <v-card ref="form" :width="width" style="height: 400px">
        <v-card-text>
          <div style="text-align: right">
            <v-icon
              :color="hover ? 'red' : 'black'"
              @mouseover="hover = true"
              @mouseout="hover = false"
              >fas fa-qrcode</v-icon
            >
          </div>
          <v-text-field
            ref="username"
            v-model="username"
            :rules="[() => !!username || '用户名不能为空']"
            :error-messages="userError"
            label="username/phone"
            placeholder="用户名/手机号"
            prepend-inner-icon="person"
            required
          ></v-text-field>
          <v-text-field
            ref="password"
            v-model="password"
            :rules="[
              () => !!password || '密码不能为空',
              () =>
                !!(password.length > 6 && password.length <= 25) ||
                '密码必须大于6位，小于25位'
            ]"
            label="password"
            :error-messages="passError"
            placeholder="密码"
            counter="25"
            prepend-inner-icon="lock"
            required
          ></v-text-field>
          <v-text-field
            v-model="code"
            :rules="[() => !!code || '验证码不能为空']"
            label="code"
            placeholder="验证码"
            :error-messages="codeError"
            prepend-inner-icon="chat"
            required
          ></v-text-field>
          <div>
            <Code @handleCodeChange="handleCodeChange" />
          </div>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions>
          <div style="text-align: center; width: 100%">
            <v-btn color="primary" flat @click="submit">登录</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-layout>
    <HomeFooter color="transparent" :flat="true" />
  </div>
</template>

<script>
import HomeFooter from "../components/footer/HomeFooter";
import Code from "../components/verification/Code";
export default {
  name: "login",
  components: { Code, HomeFooter },
  data() {
    return {
      username: "Leafqun",
      password: "123456",
      code: "",
      identifyCode: "",
      userError: "",
      passError: "",
      codeError: "",
      hover: false
    };
  },
  computed: {
    y() {
      return this.$store.state.windowSize.y;
    },
    x() {
      return this.$store.state.windowSize.x;
    },
    padding() {
      if (this.x > 1200) {
        return "0 100px";
      } else if (this.x > 800) {
        return "0 40px";
      } else if (this.x > 500) {
        return "0 30px";
      } else {
        return "0 15px";
      }
    },
    width() {
      if (this.x > 600) {
        return 300;
      } else {
        return "100%";
      }
    }
  },
  methods: {
    async submit() {
      if (this.code !== this.identifyCode) {
        this.error = "验证码错误";
        return false;
      }
      const { data } = await this.$axios.get(`${this.$userUrl}/login`, {
        params: { phone: this.username, password: this.password }
      });
      const msg = data.msg;
      if (msg === "success") {
        this.$store.dispatch("setUser", data.user);
        sessionStorage.setItem("user", JSON.stringify(data.user));
        const redirect = this.$route.query.redirect;
        if (redirect) {
          this.$router.push(redirect);
        } else {
          this.$router.push("/");
        }
      } else if (msg === "密码错误") {
        this.userError = msg;
      } else {
        this.passError = msg;
      }
    },
    handleCodeChange(code) {
      this.identifyCode = code;
    }
  }
};
</script>

<style scoped>
.header {
  height: 80px;
  width: 100%;
  /*box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;*/
  padding: 0 20px;
}
.icon {
  background-image: url("../assets/img/logo.png");
  height: 46px;
  width: 380px;
}
.content {
  background-image: url("../assets/img/login_bg.png");
  background-size: cover;
}
</style>
