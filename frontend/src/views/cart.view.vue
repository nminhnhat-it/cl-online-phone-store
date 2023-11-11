<script>
import accountService from "@/services/account.service";
import cartService from "@/services/cart.service";
import brandService from "@/services/brand.service";

import navbar from "@/components/navbar.vue";
import backToTopBtn from "@/components/backToTopBtn.vue";
import footerInfo from "@/components/footerInfo.vue";

import CartInfoContainer from "@/components/cart/CartInfoContainer.vue";
import OrderMessage from "@/components/cart/OrderMessage.vue";

export default {
  props: {
    slug: { type: String, default: "" },
  },
  components: {
    navbar,
    backToTopBtn,
    footerInfo,

    CartInfoContainer,
    OrderMessage
  },
  data() {
    return {
      cart: {},
      brands: [],
      user: {},
      isOrderSuccess: false,
    }
  },
  computed: {

    getUser() {
      return this.user;
    },

    getCart() {
      return this.cart;
    },

    getRoute() {
      return this.$route.name.split('.');
    },

    getBrands() {
      return this.brands;
    },
  },
  methods: {
    alertOder() {
      this.reloadCart()
      this.isOrderSuccess = true;
    },

    async retrieveUser() {
      var user = null;
      var isStaff = null;
      if (document.cookie) {
        user = await accountService.get();
        this.user = user;
        isStaff = await accountService.verifyPermission();
        if (user && !isStaff) this.retrieveCart();
      }
      this.$store.state.user = user;
      this.$store.state.isStaff = isStaff;
    },

    async retrieveBrands() {
      this.brands = await brandService.getAll();
    },

    async retrieveCart() {
      var cart = await cartService.getByUserid();
      this.cart = cart;
    },

    reloadCart() {
      this.retrieveCart();
    }
  },
  mounted() {
    this.retrieveUser();
    this.retrieveBrands();
  }
}
</script>
 
<template>
  <navbar :cart="getCart" :route="getRoute" :brands="getBrands" />
  <div class="content">

    <CartInfoContainer v-if="!isOrderSuccess" :cart="getCart" @reload:cart="reloadCart" @alert:order="alertOder" :user="getUser" :key="getUser" />
    <OrderMessage v-if="isOrderSuccess" />

    <footerInfo />
    <backToTopBtn />
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

:focus-visible {
  outline: none !important;
}

.bg-e8f3ee {
  --bs-bg-opacity: 1;
  background-color: rgba(232, 243, 238, var(--bs-bg-opacity));
}

.btn-6bc3e7 {
  --bs-btn-color: rgb(255, 255, 255);
  --bs-btn-bg: #5fb8db;
  --bs-btn-border-color: #66c1e6;
  --bs-btn-hover-color: rgb(255, 255, 255);
  --bs-btn-hover-bg: #20a9e4;
  --bs-btn-hover-border-color: #27a6dd;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #3dd5f3;
  --bs-btn-active-border-color: #25cff2;
  --bs-btn-active-shadow: inset 0 3px 5pxrgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #0dcaf0;
  --bs-btn-disabled-border-color: #0dcaf0;
}

.content {
  padding-top: 3rem;
  max-width: 1808px;
  min-width: 300px;
  margin: auto;
}
</style>