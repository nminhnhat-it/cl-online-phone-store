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
    path: "/admin/category/series/add",
    name: "admin.category.series.add",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/category/series/edit",
    name: "admin.category.series.edit",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },

  {
    path: "/admin/order/info/:id",
    name: "admin.order.info",
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
    path: "/admin/order/prepares",
    name: "admin.order.prepares",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/order/ships",
    name: "admin.order.ships",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/order/completes",
    name: "admin.order.completes",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/order/cancels",
    name: "admin.order.cancels",
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
    path: "/admin/product/info",
    name: "admin.product.info",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/info/img",
    name: "admin.product.info.img",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/info/edit",
    name: "admin.product.info.edit",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/info/color/add",
    name: "admin.product.info.color.add",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/info/color/edit",
    name: "admin.product.info.color.edit",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/info/focus",
    name: "admin.product.info.focus",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/add",
    name: "admin.product.add",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/add/version",
    name: "admin.product.add.version",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/version/add",
    name: "admin.product.version.add",
    component: () => import("@/views/admin.view.vue"),
    props: true,
    meta: {
      requiresAuth: true,
      requiresPermission: true
    }
  },
  {
    path: "/admin/product/version/edit",
    name: "admin.product.version.edit",
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
  {
    path: "/:slug",
    name: "landing.brands",
    component: () => import("@/views/landing.view.vue"),
    props: true,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: "/products/:slug",
    name: "products",
    component: () => import("@/views/product.view.vue"),
    props: true,
    meta: {
      requiresAuth: false
    }
  },

  {
    path: "/cart",
    name: "cart",
    component: () => import("@/views/cart.view.vue"),
    props: true,
    meta: {
      requiresAuth: true
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