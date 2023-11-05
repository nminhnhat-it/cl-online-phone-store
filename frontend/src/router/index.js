import { createWebHistory, createRouter } from "vue-router";
import accountService from "@/services/account.service";

function getCookie(name) {
  function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
  var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
  return match ? match[1] : null;
}

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
  {
    path: "/signin/",
    name: "signin",
    component: () => import("@/views/signin.view.vue"),
    props: true,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/register/",
    name: "register",
    component: () => import("@/views/register.view.vue"),
    props: true,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/admin/category/brands",
    name: "admin.category.brands",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/category/brands/add",
    name: "admin.category.brands.add",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/category/brands/edit",
    name: "admin.category.brands.edit",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/category/series",
    name: "admin.category.series",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/order/news",
    name: "admin.order.news",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/order/approves",
    name: "admin.order.approves",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/all",
    name: "admin.product.all",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/",
    name: "landing",
    component: () => import("@/views/landing.view.vue"),
    props: true,
    meta: {
      requiresAuth: false
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {

  var token = getCookie("token");

  if (to.meta.requiresAuth) {
    if (!token)
      return { name: "signin" };
    if (to.meta.requiresPermission) {
      var isStaff = await accountService.verifyPermission();
      if (!isStaff) {
        return { name: "landing" };
      }
    }
  }
  else if (!to.meta.requiresAuth) {
    if ((to.name == "register" || to.name == "signin") && token)
      return { name: "landing" };
  }
})

export default router;