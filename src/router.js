import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/test",
      name: "test",
      component: import("./views/Test.vue")
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/personal",
      name: "personal",
      component: () => import("./views/Personal.vue"),
      redirect: "/personal/info",
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "info",
          name: "info",
          meta: {
            info: "我的账号"
          },
          component: () => import("./views/personal/PersonalInfo.vue")
        },
        {
          path: "material",
          name: "material",
          meta: {
            info: "我的资料"
          },
          component: () => import("./views/personal/Material.vue")
        },
        {
          path: "prime",
          name: "prime",
          meta: {
            info: "我的VIP"
          },
          component: () => import("./views/personal/Prime.vue")
        }
      ]
    },
    {
      path: "/list/:type",
      name: "goodList",
      component: () => import("./views/good/GoodList.vue")
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/good/:type/:id",
      name: "goodInfo",
      component: () => import("./views/good/GoodInfo.vue")
    },
    {
      path: "/good/:type/:id/order",
      name: "order",
      meta: {
        requireAuth: true
      },
      component: () => import("./views/good/Order.vue")
    },
    {
      path: "/good/:type/:id/order/success",
      name: "success",
      meta: {
        requireAuth: true
      },
      component: () => import("./views/good/Success.vue")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (store.state.user) {
    next();
  } else {
    if (to.path.indexOf("/personal") === 0 || to.path.indexOf("/order") > 0) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else {
      next();
    }
  }
});

export default router;
