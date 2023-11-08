<script>
import productService from "@/services/product.service";
import serieService from "@/services/serie.service";

import dataTable from "@/components/admin/product/dataTable.vue";

import productFormAdd from "@/components/admin/product/productFormAdd.vue";
import productFormEdit from "@/components/admin/product/productFormEdit.vue";

export default {
  async setup() {
    var series = await serieService.getAll();
    return {
      series
    }
  },

  props: {
    route: { type: Array, default: [] },
  },

  components: {
    dataTable,
    productFormAdd,
    productFormEdit,
  },

  computed: {
    getProducts() {
      return this.$store.state.products;
    },
  },
  methods: {

    async retrieveSerie() {
      this.$store.state.series = this.series;
    },

    async addProduct() {
      var data = this.$store.state.data;
      var colorImg = this.$store.state.colorImg;
      var formdata = new FormData();
      
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
      }
      
      formdata.append('productImages', colorImg, colorImg.name);
      for (const image of this.$store.state.images) {
        formdata.append('productImages', image, image.name);
      }

      var res = await productService.create(formdata);
      if (res)
        alert("Add success");
      else
        alert("Can not add item");
    },
  },

  mounted() {
    this.retrieveSerie();
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Add Product</h2>
      </div>
    </div>

    <productFormAdd :route="route" @add:item="addProduct" />
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