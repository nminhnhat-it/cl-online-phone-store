<script>
import accountService from "@/services/account.service";
import cartService from "@/services/cart.service";
import brandService from "@/services/brand.service";
import productService from "@/services/product.service";

import navbar from "@/components/navbar.vue";
import backToTopBtn from "@/components/backToTopBtn.vue";
import footerInfo from "@/components/footerInfo.vue";

import ContainerLeft from "@/components/product/ContainerLeft.vue";
import ContainerRight from "@/components/product/ContainerRight.vue";

export default {
  props: {
    slug: { type: String, default: "" },
  },
  components: {
    navbar,
    backToTopBtn,
    footerInfo,

    ContainerLeft,
    ContainerRight
  },
  data() {
    return {
      cart: {},
      brands: [],
      product: {},
      defaultSelectVersion: {},
    }
  },
  computed: {

    getCart() {
      return this.cart;
    },

    getRoute() {
      return this.$route.name.split('.');
    },

    getBrands() {
      return this.brands;
    },

    getProduct() {
      return this.product;
    },

    getSelectVersion() {
      return this.defaultSelectVersion;
    },
  },
  methods: {

    async retrieveUser() {
      var user = null;
      var isStaff = null;
      if (document.cookie) {
        user = await accountService.get();
        isStaff = await accountService.verifyPermission();
        if (user && !isStaff) this.retrieveCart();
      }
      this.$store.state.user = user;
      this.$store.state.isStaff = isStaff;
    },

    async retrieveBrands() {
      this.brands = await brandService.getAll();
    },

    async retrieveProduct() {
      var product = await productService.get(this.slug);
      this.product = product;
      this.defaultSelectVersion = product.productVersions[0];
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
    this.retrieveProduct();
  }
}
</script>
 
<template>
  <navbar :cart="getCart" :route="getRoute" :brands="getBrands" />
  <div class="content">
    <div class="row product-info-container">
      <ContainerLeft :product="getProduct" />
      <ContainerRight :cart="this.cart" :product="getProduct" :defaultSelectVersion="getSelectVersion" @reload:cart="reloadCart" />
    </div>

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

.product-info-container {
  background-color: #e8f3ee;
  margin-top: 1rem;
  margin-left: 2rem;
  margin-right: 2rem;
  border-radius: 5px;
}
</style>