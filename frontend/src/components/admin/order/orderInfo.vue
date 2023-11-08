<script>
import orderService from "@/services/order.service";

export default {
  props: {
    id: { type: String, default: "" }
  },
  data() {
    return {
      data: {},
    }
  },
  methods: {
    async retrieveInfo(id) {
      var order = await orderService.get(id);
      this.data = order;
    },

    async cancelOrder(e) {
      var id = $(e.target).attr("id");
      var res = await orderService.update(id, { od_status: 'cancel' });
      if (res) {
        this.retrieveInfo(id);
        alert("Canceled order");
      }
      else
        alert("Can not cancel order");
    },

    async approveOrder(e) {
      var id = $(e.target).attr("id");
      var res = await orderService.update(id, { od_status: 'prepare' });
      if (res) {
        this.retrieveInfo(id);
        alert("Approved order");
      }
      else
        alert("Can not approve order");
    },

    async shipOrder(e) {
      var id = $(e.target).attr("id");
      var res = await orderService.update(id, { od_status: 'ship' });
      if (res) {
        this.retrieveInfo(id);
        alert("Ship order");
      }
      else
        alert("Can not ship order");
    },

    async completeOrder(e) {
      var id = $(e.target).attr("id");
      var res = await orderService.update(id, { od_status: 'complete' });
      if (res) {
        this.retrieveInfo(id);
        alert("Complete order");
      }
      else
        alert("Can not complete order");
    },
  },
  mounted() {
    this.retrieveInfo(this.id);
    if (!this.$store.state.back)
      this.$store.state.back = 'admin.order.news'
  },
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Order Info</h2>
      </div>
    </div>

    <hr>
    <div class="d-flex">
      <router-link :to="{ name: this.$store.state.back }">
        <button @click="displayNextForm" class="btn btn-6bc3e7" style="width: 76px;">Back</button>
      </router-link>
    </div>
    <table v-if="data" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col" style="min-width: 102px;">Customer Name</th>
        <th class="data-tb-col" style="min-width: 102px;">Total</th>
        <th class="data-tb-col" style="min-width: 102px;">Status</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Created</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Upadted</th>
        <th v-if="data.od_status != 'cancel'" class="data-tb-col" style="min-width: 102px;">Edit</th>
      </tr>

      <tr v-if="this.data.customer" class="data-tb-row">
        <td class="data-tb-col">{{ data.customer.name }}</td>
        <td class="data-tb-col">{{ data.od_total }}</td>
        <td class="data-tb-col text-primary">{{ data.od_status }}</td>
        <td class="data-tb-col">{{ data.createdAt }}</td>
        <td class="data-tb-col">{{ data.updatedAt }}</td>
        <td v-if="data.od_status != 'cancel' && data.od_status != 'complete'" class="data-tb-col modify">

          <a v-if="data.od_status == 'await'" :id="data._id" @click="approveOrder">Approve</a>
          <a v-if="data.od_status == 'prepare'" :id="data._id" @click="shipOrder">Ship</a>
          <a v-if="data.od_status == 'ship'" :id="data._id" @click="completeOrder">Complete</a>

          <a :id="data._id" @click="cancelOrder">Cancel</a>
        </td>
      </tr>
    </table>
    <hr>
    <h5>Products</h5>
    <table v-if="data.cartInfos" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col" style="min-width: 102px;">#</th>
        <th class="data-tb-col" style="min-width: 102px;">Product Name</th>
        <th class="data-tb-col" style="min-width: 102px;">Price</th>
        <th class="data-tb-col" style="min-width: 102px;">Quantity</th>
        <th class="data-tb-col" style="min-width: 102px;">Product Image</th>
      </tr>

      <tr v-for="(cartInfo, index) in data.cartInfos" v-if="this.data.cartInfos" class="data-tb-row">
        <td class="data-tb-col">{{ index + 1 }}</td>
        <td v-if="cartInfo.product" class="data-tb-col">{{ cartInfo.product.pd_title }}</td>
        <td v-if="cartInfo.productVersion" class="data-tb-col">{{ cartInfo.productVersion.pv_price }}</td>
        <td v-if="cartInfo.productVersion" class="data-tb-col">{{ cartInfo.ci_quantity }}</td>
        <td v-if="cartInfo.productVersion" class="data-tb-col">
          <img :src="this.$store.state.apiUrl + cartInfo.productVersion.pv_img" alt="" style="max-width: 300px;">
        </td>
      </tr>
    </table>

  </div>
</template>

<style scoped>
.content {
  max-width: 1808px;
  min-width: 600px;
  margin: auto;
  margin-top: 90px;
  margin-left: 200px;
  padding: 0 48px;
  overflow: auto;
  height: calc(100vh - 96px);
  width: calc(100% - 200px);
}

.category-title {
  color: #5a5d60;
  font-size: 32px;
  font-weight: 600;
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

.data-tb {
  border-collapse: unset;
}

.data-tb,
.data-tb .data-tb-col {
  border: 1px solid #5a5d60;
  text-align: center !important;
}

.data-tb .data-tb-col {
  padding: 5px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.data-tb .data-tb-col.modify a {
  cursor: pointer;
  text-decoration: none;
  color: #33a0cb;
}

.data-tb .data-tb-col.modify a:hover {
  color: rgb(206, 97, 97);
}

.data-tb .data-tb-col.modify a:nth-child(n+2)::before {
  display: inline-block;
  content: "";
  margin: 0px 6px;
  height: 0.72rem !important;
  width: 2px !important;
  background: #387c96;
}
</style>