<script>
import productService from "@/services/product.service";

import dataTable from "@/components/admin/product/dataTable.vue";
import productFormEdit from "@/components/admin/product/productFormEdit.vue";
import productInfoTable from "@/components/admin/product/productInfoTable.vue";

export default {
  props: {
    route: { type: Array, default: [] },
  },

  components: {
    dataTable,
    productFormEdit,
    productInfoTable,
  },

  computed: {
    getProducts() {
      return this.$store.state.products;
    },
  },
  methods: {

    async retrieveProductData() {
      var products = await productService.getAll();
      this.$store.state.products = products;
    },

    async deleteProduct() {
      var id = this.$store.state.id;
      var result = await productService.delete(id);
      if (result)
        alert("Delete success");
      else
        alert("Can not delete item");
      this.retrieveProductData()
    },
  },
  mounted() {
    this.retrieveProductData();
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">All Product</h2>
      </div>
    </div>

    <dataTable v-if="this.route[3] == null" @delete:item="deleteProduct" :dataArr="getProducts" />
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