<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div class="header">
    <v-layout
      align-center
      justify-space-between
      row
      fill-height
      style="padding: 0 15px;"
    >
      <!-- icon -->
      <v-layout row align-center justify-start>
        <div
          class="icon"
          :style="{ width: x < 570 ? '160px' : '360px' }"
          @click="$router.push('/')"
        ></div>
        <div style="font-size: 18px; margin-left: 15px;" v-if="x > 300">
          <a @click="$router.push('/')">积分商城</a>
        </div>
      </v-layout>
      <!-- menu -->
      <v-layout v-if="x > 800" row align-center justify-end>
        <div class="menu-item" @click="$router.push('/home')">
          <v-icon>home</v-icon>商城首页
        </div>
        <v-menu open-on-hover offset-y>
          <template v-slot:activator="{ on }">
            <div
              class="menu-item"
              color="primary"
              dark
              v-on="on"
              @click="$router.push('/personal')"
            >
              <v-icon>person</v-icon>个人中心
            </div>
          </template>
          <v-list>
            <v-list-tile
              v-for="(item, index) in items"
              :key="index"
              @click="goto(item.title)"
            >
              <v-list-tile-title v-if="item.title === '注销' ? user : true">{{
                item.title
              }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <div style="margin-left: 10px;">
          <v-icon>lock</v-icon>
          <span v-if="$store.state.user">{{ $store.state.user.nickname }}</span>
          <span v-else>
            <a @click="$router.push('/login')">登录</a>
          </span>
        </div>
      </v-layout>

      <!-- 小尺寸 menu -->
      <div v-else>
        <div @click="drawer = true"><v-icon>list</v-icon></div>
      </div>
    </v-layout>
    <v-navigation-drawer v-model="drawer" absolute temporary width="200">
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img
              :src="
                user
                  ? `${this.$picUrl}/${user.avatar}`
                  : 'https://randomuser.me/api/portraits/men/85.jpg'
              "
            />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>
              <div v-if="user">{{ user.nickname }}</div>
              <div v-else><router-link to="/login">请登录</router-link></div>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          @click="goto(item.title)"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content v-if="item.title === '注销' ? user : true">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "HomeHeader",
  data: () => ({
    active: null,
    drawer: false,
    items: [
      { title: "我的账户" },
      { title: "我的资料" },
      { title: "我的会员" },
      { title: "注销" }
    ],
    dialog: false
  }),
  computed: {
    x() {
      return this.$store.state.windowSize.x;
    },
    user() {
      return this.$store.state.user;
    }
  },
  methods: {
    goto(item) {
      if (item === "注销") {
        sessionStorage.setItem("user", null);
        this.$store.dispatch("setUser", null);
        this.$router.push("/");
      }
      let temp = "info";
      if (item === "我的账户") {
        temp = "info";
      } else if (item === "我的资料") {
        temp = "material";
      } else if (item === "我的会员") {
        temp = "prime";
      }
      this.$router.push(`/personal/${temp}`);
    }
  }
};
</script>
<style scoped>
.header {
  height: 80px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px;
  padding: 0 20px;
}

.icon {
  background-image: url("../../assets/img/logo.png");
  height: 46px;
  width: 380px;
}
.menu-item {
  font-size: 16px;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);
  width: 100px;
  text-align: center;
}
.menu-item:hover {
  color: dimgrey;
  cursor: pointer;
}
a {
  color: rgba(0, 0, 0, 0.8);
}
a:hover {
  color: dimgrey;
  cursor: pointer;
}
</style>
