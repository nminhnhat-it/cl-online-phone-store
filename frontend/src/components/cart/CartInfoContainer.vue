<script>
import cartService from "@/services/cart.service";
import orderService from "@/services/order.service";

import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  props: {
    cart: { type: Object, default: {} },
    user: { type: Object, default: {} }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const FormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Name cannot be blank.")
        .max(255, "Name maximum 255 characters."),
      phone: yup
        .string()
        .matches(/((09|03|07|08|05)+([0-9]{8})\b)/g, "Invalid phone number.")
        .required("Phone cannot be blank."),
      email: yup
        .string()
        .email("Invalid email."),
      address: yup
        .string()
        .required("Address cannot be blank.")
        .max(255, "Address maximum 500 characters."),
    });
    return {
      FormSchema,
      data: {
        name: "",
        phone: "",
        email: "",
        address: "",
      },
    }
  },
  methods: {

    setOrderData() {
      this.data = {
        name: this.user.name,
        phone: '0' + this.user.phone,
        email: this.user.email,
        address: this.user.address
      }
    },

    async createOrder() {
      var data = this.data;
      var res = await orderService.create(data);
      if (res) {
        this.$emit("alert:order");
      }
      else alert("Error when order");
    },

    async changeCartQuantity(e) {
      var id = $(e.target).attr("id");
      var pv_id = $(e.target).attr("pv_id");
      var quantity = $(e.target).val();

      var data = {
        ci_quantity: quantity,
        pv_id: pv_id,
      }
      var res = await cartService.updateCartInfoByCartId(id, data);
      if (res) {
        this.$emit("reload:cart")
      }
      else alert("Error when updating cart quantity");
    },

    async deleteCartItem(e) {
      if (confirm("Are you sure you want to delete?")) {
        var id = $(e.currentTarget).attr("id");
        var res = await cartService.deleteCartInfoById(id);
        if (res)
          this.$emit("reload:cart")
      }
      return;
    },
  },
  mounted() {
    this.setOrderData();
  },
  emits: ["reload:cart", "alert:order"],
}
</script>

<template>
  <div v-if="cart.cartInfos && cart.cartInfos.length" class="total-cart-price-ctn">
    <div class="total-info">
      <div>
        <span>Payment required ({{ this.$store.state.cartQuantity }} products)</span>
      </div>
      <div style="margin-left: auto;">
        <span class="text-danger">${{ cart.c_total }}</span>
      </div>
    </div>
    <div class="customer-info">
      <div class="booker-title mb-3"><span>Order information</span></div>
      <Form @submit="createOrder" :validation-schema="FormSchema">
        <div class="position-relative mb-3">
          <Field v-model="this.data.name" name="name" type="text" class="form-control form-control-secondary" id="name" placeholder="Full name" />
          <ErrorMessage name="name" class="form-error-span" />
        </div>
        <div class="position-relative mb-3">
          <Field v-model="this.data.phone" name="phone" type="text" class="form-control form-control-secondary" id="phone" placeholder="Phone number" />
          <ErrorMessage name="phone" class="form-error-span" />
        </div>
        <div class="position-relative mb-3">
          <Field v-model="this.data.email" name="email" type="text" class="form-control form-control-secondary" id="email" placeholder="Email (optional)" />
          <ErrorMessage name="email" class="form-error-span" />
        </div>
        <div class="position-relative mb-3">
          <Field v-model="this.data.address" name="address" type="text" class="form-control form-control-secondary" id="address" placeholder="Address" />
          <ErrorMessage name="address" class="form-error-span" />
        </div>
        <button type="submit" class="order-btn btn btn-6bc3e7">Order Now</button>
      </Form>
    </div>
  </div>
  <div v-if="cart.cartInfos && cart.cartInfos.length" class="cart-info-container row">
    <div class="cart-info col-8">
      <div class="cart-title pb-3"><span>Your Cart</span></div>
      <div class="cart-item-ctn">
        <div v-for="cartInfo in this.cart.cartInfos" class="cart-item row mb-3">
          <div class="cart-img-ctn col-3">
            <img :src="$store.state.apiUrl + cartInfo.productVersion.pv_img" class="d-block cart-info-image" alt="...">
          </div>
          <div class="col-7">
            <router-link :to="{ name: 'products', params: { slug: cartInfo.product.pd_slug } }">
              <div class="product-title mb-3"><span>{{ cartInfo.product.pd_title }}</span></div>
            </router-link>
            <div class="product-color" style="color: #5a5d60; font-weight: 500;"><span>Color:</span> <span>{{ cartInfo.productVersion.pv_title }}</span></div>
            <div class="product-quantity">
              <label :for="cartInfo._id" class="form-label me-3" style="color: #5a5d60; font-weight: 500;">Quantity</label>
              <select @change="changeCartQuantity" as="select" :name="cartInfo._id" :pv_id="cartInfo.productVersion._id" :id="cartInfo._id" class="form-select form-control form-control-secondary w-25">
                <option class="form-control" disabled value="">Choose Quantity</option>
                <option class="form-control" v-for="n in cartInfo.productVersion.pv_quantity" v-bind:selected="n == cartInfo.ci_quantity" :value="n">{{ n }}</option>
              </select>
            </div>
          </div>
          <div class="col-2">
            <div class="delete-btn mb-5">
              <div @click="deleteCartItem" :id="cartInfo._id" class="btn" style="width: 2rem;">
                <i class="fa-solid fa-trash"></i>
              </div>
            </div>
            <div class="total-product-price text-end">
              <span style="color: red;">${{ cartInfo.productVersion.pv_price * cartInfo.ci_quantity }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4"></div>
  </div>
  <div class="nothing-cart-ctn">
    <div v-if="!cart.cartInfos || !cart.cartInfos.length" class="nothing-cart">
      <span>Cart is empty </span>
      <router-link :to="{ name: 'landing' }">
        <a class="shop-more-btn">shop more?</a>
      </router-link>
    </div>
  </div>
</template>

<style>
.form-control-secondary {
  border: 1px solid #5a5d60;
  color: #5a5d60 !important;
}

.form-control-secondary:focus {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}
</style>

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

.cart-info-container {
  justify-content: center;
  display: flex;
  width: 100%;
  margin-top: 1rem !important;
}

.cart-info-container .cart-info .cart-item-ctn {
  margin-left: 2rem;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item {
  border-radius: 5px;
  background-color: #e8f3ee;
  padding: 1rem;
}

.cart-info-container .cart-info .cart-title {
  color: #5a5d60;
  background-color: #fff;
  font-size: xx-large;
  font-weight: 500;
  margin-left: 2rem;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .cart-img-ctn .cart-info-image {
  width: 10rem;
  height: 10rem;
  object-fit: contain;
  border: solid 1px #5a5d60;
  border-radius: 5px;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .product-title {
  color: #5a5d60;
  font-size: x-large;
  font-weight: 500;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .product-title:hover {
  cursor: pointer;
  color: #66c1e6;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .delete-btn {
  display: flex;
  justify-content: end;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .delete-btn:hover {
  color: red;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .total-product-price {
  color: #5a5d60;
  font-weight: 500;
  font-size: x-large;
}

.cart-info-container .cart-info .cart-item-ctn .cart-item .product-quantity {
  display: flex;
  align-items: center;
}

.form-control {
  color: #5a5d60 !important;
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
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

.form-select {
  --bs-form-select-bg-img: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
  display: block;
  width: 100%;
  padding: .375rem 2.25rem .375rem .75rem;
  font-size: 1rem !important;
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

.form-control::placeholder {
  color: #5a5d6093;
}

.total-cart-price-ctn {
  z-index: 2;
  color: #5a5d60;
  font-weight: 500;
  font-size: large;
  margin-top: 1rem;
  background-color: #e8f3ee;
  border-radius: 5px;
  margin-right: 2rem;
  margin-left: 1rem;
  position: fixed;
  right: 0;
  width: 27rem;
}

.total-cart-price-ctn .total-info {
  padding: 1rem;
  display: flex;
}

.total-cart-price-ctn .customer-info {
  margin: 1rem;
  padding: 1rem;
  background-color: #fff;
}

.total-cart-price-ctn .customer-info .booker-title {
  color: #5a5d60;
  font-size: medium;
  font-weight: 500;
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
  font-size: 1rem !important;
}

.form-control-secondary:focus {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}

.order-btn {
  padding: 0.5rem;
  width: 100%;
}

.nothing-cart-ctn {
  display: flex;
  justify-content: center;
}

.nothing-cart {
  text-align: center;
  border-radius: 5px;
  margin-top: 1rem;
  width: 50%;
  background-color: #e8f3ee;
  padding: 1rem;
  color: #5a5d60;
  font-size: xx-large;
  font-weight: 500;
}

.shop-more-btn {
  color: #5fb8db;
}

.shop-more-btn:hover {
  color: #27a6dd;
}
</style>