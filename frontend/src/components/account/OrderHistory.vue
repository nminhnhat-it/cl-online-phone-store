<script>
import orderService from "@/services/order.service";

export default {
  props: {
    orders: { type: Array, default: [] }
  },
  methods: {
    async cancelOrder(e) {
      var id = $(e.target).attr('id');
      if (confirm("Are you sure you want to cancel?")) {
        var res = await orderService.cancelByUserId(id);
        if (res) {
          this.$emit("reload:order");
          alert("Cancel order success");
        }
        else
          alert("Error orcur when cancel order");
      }
      return
    }
  },
  emits: ['reload:order'],
}
</script>

<template>
  <div style="display: flex; justify-content: center;">
    <div style="width: 70%;">
      <div class="order-text"><span>Order History</span></div>
    </div>
  </div>

  <div class="order-his-ctn">
    <div v-for="order in this.orders" class="order-info mb-4">
      <div class="row">
        <div class="col">
          <div class="time-order mb-3">Order time: <span> {{ order.createdAt }}</span></div>
        </div>
        <div class="col">
          <div class="order-status">Status:&nbsp<div style="color: #5fb8db;">{{ order.od_status.toUpperCase() }}</div>
          </div>
        </div>
      </div>
      <hr class="mb-3">
      <div v-for="cartInfo in order.cartInfos" class="row cart-info-ctn  mb-3">
        <div class="col-1">
          <img :src="$store.state.apiUrl + cartInfo.productVersion.pv_img" class="d-block cart-info-image" alt="...">
        </div>
        <div class="col-9">
          <router-link :to="{ name: 'products', params: { slug: cartInfo.product.pd_slug } }">
            <div class="product-title div"><span>{{ cartInfo.product.pd_title }}</span></div>
          </router-link>
          <div class="">
            <div class="info-item div"><span>Color {{ cartInfo.productVersion.pv_title }}</span></div>
            <div class="info-item div"><span>x {{ cartInfo.ci_quantity }}</span></div>
          </div>
        </div>
        <div class="col-2 d-flex p-3" style="align-items: center; justify-content: end;">
          <div class="item-price">
            <div><span>${{ cartInfo.ci_price }}</span></div>
          </div>
        </div>
      </div>
      <hr>
      <div class="bottom-ctn mt-3">
        <div class="row">
          <div class="col" style="display: flex; align-items: center;">
            <button :id="order._id" @click="cancelOrder" v-if="order.od_status == 'await'" class="btn-cancel btn btn-danger">Cancel Order</button>
          </div>
          <div class="col total-ctn">
            <div style="align-items: center; display: flex;">Total:&nbsp</div>
            <div class="total-order-price">${{ order.od_total }}</div>
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

.content {
  padding-top: 3rem;
  max-width: 1808px;
  min-width: 300px;
  margin: auto;
}

.order-his-ctn {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1rem !important;
}

.order-his-ctn .order-info {
  padding: 1rem;
  background-color: #e8f3ee;
  width: 70%;
  border-radius: 5px;
}

.order-his-ctn .order-info .user-image-ctn .user-image {
  height: 20rem;
  width: 20rem;
}

.order-text {
  color: #5a5d60;
  font-size: xx-large;
  font-weight: 500;
}

.cart-info-image {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
}

.product-title {
  color: #5a5d60;
  font-size: large;
  font-weight: 500;
}

.product-title:hover {
  cursor: pointer;
  color: #5fb8db;
}

.time-order {
  color: #5a5d60;
  font-size: large;
  font-weight: 500;
}

.cart-info-ctn {
  background-color: #fff;
  padding: 0.2rem;
}

.info-item {
  color: #5a5d60;
  font-size: small;
  font-weight: 500;
}

.item-price {
  display: flex;
  color: red;
  align-items: center;
  justify-content: end;
}

.total-ctn {
  display: flex;
  justify-content: end;
}

.order-status {
  display: flex;
  justify-content: end;
}

.total-ctn {
  color: #5a5d60;
  font-weight: 500;
  display: flex;
  align-content: center;
}

.total-order-price {
  color: red;
  font-size: x-large;
  font-weight: 500;
}

.btn-cancel {
  padding: 0.3rem;
  background-color: orange;
}
</style>