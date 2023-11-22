<script>
import orderService from "@/services/order.service";

import dataTable from "@/components/admin/order/dataTable.vue";

export default {
  props: {
    route: { type: Array, default: [] },
  },

  components: {
    dataTable,
  },

  computed: {

    getCompleteOrders() {
      var orders = this.$store.state.orders;
      if (orders) {
        var news = orders.filter(order => order.od_status == 'complete');
        return news;
      }
    },
  },
  methods: {

    async retrieveOrderData() {
      var orders = await orderService.getAll();
      this.$store.state.orders = orders;
    },

    async cancelOrder() {
      var id = this.$store.state.id
      var res = await orderService.update(id, { od_status: 'cancel' });
      if (res) {
        this.retrieveOrderData();
        alert("Canceled order");
      }
      else
        alert("Can not cancel order");
    },

    async approveOrder(e) {
      var id = this.$store.state.id
      var res = await orderService.update(id, { od_status: 'prepare' });
      if (res) {
        this.retrieveOrderData(id);
        alert("Approved order");
      }
      else
        alert("Can not approve order");
    },

    async shipOrder(e) {
      var id = this.$store.state.id
      var res = await orderService.update(id, { od_status: 'ship' });
      if (res) {
        this.retrieveOrderData(id);
        alert("Ship order");
      }
      else
        alert("Can not ship order");
    },

    async completeOrder(e) {
      var id = this.$store.state.id
      var res = await orderService.update(id, { od_status: 'complete' });
      if (res) {
        this.retrieveOrderData(id);
        alert("Complete order");
      }
      else
        alert("Can not complete order");
    },
  },

  mounted() {
    this.retrieveOrderData();
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Completed Orders</h2>
      </div>
    </div>

    <dataTable :back="'admin.order.completes'" v-if="this.route[3] == null" :route="this.route" @cancel:item="cancelOrder" @approve:item="approveOrder" @ship:item="shipOrder" @complete:item="completeOrder" :dataArr="getCompleteOrders" />

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
</style>