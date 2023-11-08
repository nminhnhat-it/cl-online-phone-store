<script>
import orderService from "@/services/order.service";

import newsTable from "@/components/admin/order/newsTable.vue";

export default {
  props: {
    route: { type: Array, default: [] },
  },

  components: {
    newsTable,
  },

  computed: {

    getNewOrders() {
      var orders = this.$store.state.orders;
      if (orders) {
        var news = orders.filter(order => order.od_status == 'await');
        return news;
      }
    },

    getPrepareOrders() {
      var orders = this.$store.state.orders;
      if (orders) {
        var prepare = orders.filter(order => order.od_status == 'prepare');
        return prepare;
      }
    },
  },
  methods: {

    async retrieveOrderData() {
      var orders = await orderService.getAll();
      this.$store.state.orders = orders;
    },

    async cancelOrder() {
      // var id = this.$store.state.id;
      // var result = await orderService.delete(id);
      // if (result)
      //   alert("Cancel success");
      // else
      //   alert("Can not cancel item");
      // this.retrieveOrderData()
    },

    async updateOrder() {
      // var data = this.$store.state.data;
      // var id = this.$store.state.data._id;
      // var result = await orderService.update(id, data)
      // if (result)
      //   alert("Update success");
      // else
      //   alert("Can not update item");
      // this.retrieveOrderData()
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
        <h2 class="catefory-title">New Orders</h2>
      </div>
    </div>

    <newsTable v-if="this.route[3] == null" :route="this.route" @cancel:item="cancelOrder" :dataArr="getNewOrders" />
    <prepareTable v-if="this.route[3] == null" :route="this.route" @cancel:item="cancelOrder" :dataArr="getPrepareOrders" />

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