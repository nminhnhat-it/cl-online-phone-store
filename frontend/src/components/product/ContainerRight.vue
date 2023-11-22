<script>
import cartService from "@/services/cart.service";

import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  props: {
    product: { type: Object, default: {} },
    defaultSelectVersion: { type: Object, default: {} },
    cart: {}
  },
  components: {
    Carousel,
    Slide,
  },
  methods: {

    async addToCartAndRedirect() {
      this.addToCart(false);
      if (!this.$store.state.outStock) {
        this.$emit("reload:cart")
        this.$emit("reload:cart")
        this.$router.push({ name: "cart" });
      }
      this.$store.state.outStock = false;
      return;
    },

    checkQuantity(seletedVersion) {
      var stock = this.product.productVersions.filter(version => version._id == seletedVersion._id);
      var added = this.cart.cartInfos.filter(cartInfo => cartInfo.pv_id == seletedVersion._id);
      if (this.quantity > (stock[0].pv_quantity - added[0].ci_quantity)) {
        alert("Out of stock")
        this.$store.state.outStock = true;
        return false;
      }
      return true;
    },

    async addToCart(isAlert) {
      if (!this.$store.state.user) {
        this.$router.push({ name: 'signin' })
        return;
      }
      var version = {};
      if (!this.seletedVersion._id)
        version = this.defaultSelectVersion;
      else
        version = this.seletedVersion
      
      var data = {
        pv_id: version._id,
        ci_quantity: this.quantity
      }

      var cart = this.cart.cartInfos.filter(cartInfo => cartInfo.pv_id == version._id);
      if (cart[0]) {
        data.ci_id = cart[0]._id;
        this.updateCart(data, version, isAlert);
        return;
      }

      var res = await cartService.addCartInfoByUserId(data);
      if (res) {
        this.$emit("reload:cart")
        if (isAlert)
          alert("Added product to cart");
      }
      else alert("Can' not add product to cart");
    },

    async updateCart(data, version, isAlert) {

      if (this.checkQuantity(version)) {
        var res = await cartService.updateCartInfoById(data);
        if (res) {
          this.$emit("reload:cart")
          if (isAlert)
            alert("Added product to cart");
        }
        else alert("Can' not add product to cart");
      }
    },

    getKey(key) {
      this.index = key
    },

    setSelectedVersion(id) {
      $(".product-info-container .image-carousel .carousel-indicators .carousel__item").removeClass("active");
      $(`.product-info-container .image-carousel .carousel-indicators .carousel__item.${id}`).addClass("active");
      $(`.product-info-container .image-carousel .carousel-item`).removeClass("active");
      $(`.product-info-container .image-carousel .carousel-item.${id}`).addClass("active");

      this.quantity = 1;
      var versions = this.product.productVersions.filter(version => version._id == id)
      this.seletedVersion = versions[0];
    },

    chooseColor(e) {
      $(".product-color-container .box-item").removeClass("active");
      $(e.currentTarget).addClass("active");
      var cls = $(e.currentTarget).attr("cls");
      this.setSelectedVersion(cls);
    },

  },
  data: () => ({
    index: null,
    seletedVersion: {
      pv_quantity: 0
    },
    quantity: 1,
  }),
  emits: ["reload:cart"]
})
</script>

<template>
  <div class="col col-4 mb-3">
    <div class="mb-3" style="margin-top: 64px; color: #5a5d60; font-weight: 500;"><span>Select color to see price and quantity</span></div>
    <div class="product-color-container">
      <div class="box-color">
        <div :class="{ active: key == 0 }" @click="chooseColor" :cls="version._id" class="box-item p-1 mb-3" v-for="(version, key) in product.productVersions">
          <div class="row">
            <div class="col-3 box-item-image-ctn">
              <img :src="$store.state.apiUrl + version.pv_img" class="d-block box-item-image" alt="...">
            </div>
            <div class="col-9">
              <div class="color-title px-2"><span>{{ version.pv_title }}</span></div>
              <div class="color-price px-2"><span>${{ version.pv_price.toLocaleString() }}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="total-pricing mb-3">
        <div class="quantity-select mb-3">
          <label v-if="this.defaultSelectVersion.pv_quantity || this.seletedVersion.pv_quantity" for="quantity" class="form-label me-3" style="white-space: nowrap"><span>Choose Quantity</span></label>
          <select v-model="quantity" v-if="this.defaultSelectVersion && !this.seletedVersion.pv_quantity && this.defaultSelectVersion.pv_quantity" as="select" name="quantity" id="quantity" class="form-select form-control form-control-secondary">
            <option disabled value="">Choose Quantity</option>
            <option v-for="index in this.defaultSelectVersion.pv_quantity" :value="index">{{ index }}</option>
          </select>
          <select v-model="quantity" v-if="this.seletedVersion && this.seletedVersion.pv_quantity" as="select" name="quantity" id="quantity" class="form-select form-control form-control-secondary">
            <option disabled value="">Choose Quantity</option>
            <option v-for="index in this.seletedVersion.pv_quantity" :value="index">{{ index }}</option>
          </select>
        </div>
        <div v-if="this.defaultSelectVersion && !this.seletedVersion.pv_quantity && this.defaultSelectVersion.pv_quantity" class="total mb-3">
          <span>${{ (this.defaultSelectVersion.pv_price * quantity).toLocaleString() }}</span>
        </div>
        <div v-if="this.seletedVersion && this.seletedVersion.pv_quantity" class="total mb-3">
          <span>${{ (this.seletedVersion.pv_price * quantity).toLocaleString() }}</span>
        </div>
        <div class="row">
          <div class="col">
            <button v-if="!this.defaultSelectVersion.pv_quantity && !this.seletedVersion.pv_quantity" disabled class="out-stock-btn btn btn-lg w-100">Out Stock</button>
          </div>
          <div v-if="this.defaultSelectVersion.pv_quantity || this.seletedVersion.pv_quantity" class="col-9">
            <button @click="addToCartAndRedirect" type="button" class="buy-now-btn btn btn-danger btn-lg w-100">Buy Now</button>
          </div>
          <div v-if="this.defaultSelectVersion.pv_quantity || this.seletedVersion.pv_quantity" class="col-3 cart-ctn">
            <button @click="addToCart(true)" type="button" class="cart-btn btn btn-lg">
              <i class="fa-solid fa-cart-shopping"></i>
              <p>Add to card</p>
            </button>
          </div>
        </div>
      </div>
      <div v-if="this.product.productInfo" class="product-config">
        <div class="config-text mb-3" style="font-size: large;"><span>Specifications</span></div>
        <div class="configs-ctn">

          <div class="config-item row">
            <div class="col"><span>Screen</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_screen }} inches</span></div>
          </div>
          <div class="config-item row">
            <div class="col"><span>Camera</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_camera }}</span></div>
          </div>
          <div class="config-item row">
            <div class="col"><span>Chipset</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_chipset }}</span></div>
          </div>
          <div class="config-item row">
            <div class="col"><span>Ram Memory</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_ram }} GB</span></div>
          </div>
          <div class="config-item row">
            <div class="col"><span>Internal Memory</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_mem }} GB</span></div>
          </div>
          <div class="config-item row">
            <div class="col"><span>Battery</span></div>
            <div class="col"><span>{{ this.product.productInfo.pi_battery }} mAH</span></div>
          </div>
        </div>
      </div>
    </div>
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

.product-color-container .box-color {
  display: flex;
  flex-wrap: wrap;
  margin-right: 1rem;
}

.product-color-container .box-item {
  flex: 0 0 30.333333%;
  background-color: #fff;
  border-radius: 5px;
  margin: 0px;
  border: solid 1px #5a5d60;
  cursor: pointer;
}

.product-color-container .color-title {
  color: #5a5d60;
  font-weight: 500;
  font-size: 14px;
  -webkit-line-clamp: 2;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: left;
}

.product-color-container .box-item .box-item-image-ctn {
  display: flex;
  align-items: center;
}

.product-color-container .box-item .box-item-image-ctn .box-item-image {
  width: 2rem;
  height: 2rem;
}

.product-color-container .box-item.active {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}

.product-color-container .box-item:nth-child(n+1) {
  margin-right: 4.5%;
}

.product-color-container .box-item:nth-child(3n) {
  margin-right: 0;
}

.total-pricing {
  margin-right: 1rem;
  padding: 1rem;
  background-color: #fcfcfc;
  border-radius: 5px;
}

.total-pricing .total {
  background-color: #fff;
  padding: 0.5rem;
  border: 1px solid red;
  border-radius: 5px;
  text-align: center;
  font-size: x-large;
  font-weight: 500;
  color: red;
}

.total-pricing .buy-now-btn {
  border-radius: 5px;
  padding: 1rem;
}

.total-pricing .out-stock-btn {
  border-radius: 5px;
  padding: 1rem;
  background-color: #e6e6e6;
  margin-bottom: 1rem;
}

.total-pricing .buy-now-btn:hover {
  color: #fff !important;
  background-color: red !important;
}

.total-pricing .cart-ctn {
  justify-content: end;
  display: flex;
}

.total-pricing .cart-ctn {
  justify-content: end;
  display: flex;
}

.total-pricing .cart-ctn .cart-btn {
  background-color: #fff;
  border: solid 1px red;
  color: red !important;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.total-pricing .cart-ctn .cart-btn:hover {
  background-color: red;
  border: solid 1px red;
  color: #fff !important;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.total-pricing .cart-ctn .cart-btn p {
  font-size: x-small;
}

.form-label {
  cursor: pointer;
  color: #5a5d60;
  font-weight: 500;
}

.form-control-secondary {
  border: 1px solid #5a5d60;
  color: #5a5d60 !important;
  border-radius: 5px;
}

.form-control-secondary:focus {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
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

.quantity-select {
  align-items: center;
  display: flex;
}

.product-config {
  color: rgb(90, 93, 96);
  font-weight: 500;
  margin-right: 1rem;
  margin-right: 1rem;
  padding: 1rem;
  background-color: #fcfcfc;
  border-radius: 5px;
  border: 5px;
}

.product-config .configs-ctn {
  padding: 0.5rem;
  border: #5a5d60 solid 1px;
  border-radius: 5px;
}

.product-config .configs-ctn .config-item:nth-child(odd) {
  padding: 0.5rem !important;
  background-color: #e6e6e6 !important;
}

.product-config .configs-ctn .config-item:nth-child(even) {
  padding: 0.5rem;
  background-color: #fff;
}

.config-item {
  color: #5a5d60 !important;
  font-size: medium;
}

.form-error-span {
  color: red;
  font-size: 12px !important;
}
</style>