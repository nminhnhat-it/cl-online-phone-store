<script>
import accountService from "@/services/account.service";

import navbar from "@/components/navbar.vue";
import optionBar from "@/components/admin/optionBar.vue";

import orderInfo from "@/components/admin/order/orderInfo.vue";
import order from "@/components/admin/order/order.vue";
import orderPrepare from "@/components/admin/order/orderPrepare.vue";
import orderShip from "@/components/admin/order/orderShip.vue";
import orderComplete from "@/components/admin/order/orderComplete.vue";
import orderCancel from "@/components/admin/order/orderCancel.vue";

import brand from "@/components/admin/brand/brand.vue";
import serie from "@/components/admin/serie/serie.vue";

import product from "@/components/admin/product/product.vue";
import productAdd from "@/components/admin/product/productAdd.vue";
import productInfo from "@/components/admin/product/productInfo.vue";

export default {
  props: {
    id: { type: String },
    slug: { type: String }
  },
  components: {
    navbar,
    optionBar,
    orderInfo,
    order,
    orderPrepare,
    orderShip,
    orderComplete,
    orderCancel,
    product,
    productAdd,
    productInfo,
    brand,
    serie,
  },
  computed: {
    getRoute() {
      return this.$route.name.split('.');
    },
  },
  methods: {
    async retrieveUser() {
      var user = await accountService.get();
      var isStaff = await accountService.verifyPermission();
      this.$store.state.user = user;
      this.$store.state.isStaff = isStaff;
    },
  },
  mounted() {
    this.retrieveUser();
  }
}
</script>

<template>
  <navbar :route="getRoute" style="padding-left: 16px; padding-right: 16px;" />
  <optionBar :route="getRoute" />

  <orderInfo :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'info'" :id="this.id" />
  <order :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'news'" />
  <orderPrepare :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'prepares'" :id="this.id" />
  <orderShip :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'ships'" :id="this.id" />
  <orderComplete :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'completes'" :id="this.id" />
  <orderCancel :route="getRoute" v-if="getRoute[1] == 'order' && getRoute[2] == 'cancels'" :id="this.id" />

  <brand :slug="slug" :route="getRoute" v-if="getRoute[1] == 'category' && getRoute[2] == 'brands'" />
  <serie :route="getRoute" v-if="getRoute[1] == 'category' && getRoute[2] == 'series'" />

  <product :route="getRoute" v-if="getRoute[1] == 'product' && getRoute[2] == 'all'" />
  <productInfo :route="getRoute" v-if="getRoute[1] == 'product' && (getRoute[2] == 'info' || getRoute[2] == 'version')" />
  <productAdd :route="getRoute" v-if="getRoute[1] == 'product' && getRoute[2] == 'add'" />
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  display: block;
  width: 100%;
  padding: .375rem 2.25rem .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-image: var(--bs-form-select-bg-img), var(--bs-form-select-bg-icon, none);
  background-repeat: no-repeat;
  background-position: right .75rem center;
  background-size: 16px 12px;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.form-error-span {
  color: red;
  font-size: 12px !important;
}

.form-success-span {
  color: green;
  font-size: 12px !important;
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

.upload-form-ctn #upload-form .form-label {
  cursor: pointer;
  color: #5a5d60;
  font-weight: 500;
}

.form-control-secondary {
  border: 1px solid #5a5d60;
  color: #5a5d60 !important;
}

.form-control-secondary:focus {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}

/* ##responsive <=767px */
@media only screen and (max-width: 767px) {

  .content {
    padding: 0 16px;
  }

  .navbar .offcanvas .user-side {
    display: none;
  }

  .navbar .offcanvas .menu-user {
    display: block;
  }

  .navbar .offcanvas .navbar-text {
    display: none;
  }
}

/* ##responsive <=575px */
@media only screen and (max-width: 575px) {

  .navbar {
    --bs-bg-opacity: 1 !important;
  }

  .navbar .container-fluid {
    margin: 0 1rem !important;
  }
}
</style>