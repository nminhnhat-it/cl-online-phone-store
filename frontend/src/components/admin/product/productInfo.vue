<script>
import productService from "@/services/product.service";
import serieService from "@/services/serie.service";

import dataTable from "@/components/admin/product/dataTable.vue";
import productFormEdit from "@/components/admin/product/productFormEdit.vue";
import productImageFormAdd from "@/components/admin/product/productImageFormAdd.vue";
import productFocusImageForm from "@/components/admin/product/productFocusImageForm.vue";
import productInfoTable from "@/components/admin/product/productInfoTable.vue";
import productVersionFormAdd from "@/components/admin/product/productVersionFormAdd.vue";
import productVersionFormEdit from "@/components/admin/product/productVersionFormEdit.vue";

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
    productFormEdit,
    productInfoTable,
    productImageFormAdd,
    productVersionFormAdd,
    productVersionFormEdit,
    productFocusImageForm
  },

  computed: {
    getProductInfos() {
      return this.$store.state.productInfo;
    },
  },

  data() {
    return {
      data: {}
    }
  },

  methods: {

    reloadInfo() {
      this.getProductInfo();
    },

    async retrieveSerie() {
      this.$store.state.series = this.series;
    },

    async updateProductInfo() {
      var data = this.$store.state.pddata;
      var id = this.$store.state.pddata._id;
      var result = await productService.update(id, data)
      if (result) {
        this.getProductInfo();
        alert("Update success");
      }
      else
        alert("Can not update item");
    },

    async getProductInfo() {
      var slug = this.$store.state.slug;
      if (!slug)
        this.$router.push({ name: 'admin.product.all' })
      else
        return this.$store.state.productInfo = await productService.get(slug);
    },

    async deleteImage() {
      var id = this.$store.state.id;
      var result = await productService.deleteImage(id);
      if (result) {
        this.getProductInfo();
        alert("Deleted image");
      }
      else
        alert("Can not delete image");
    },

    async deleteVersion() {
      var id = this.$store.state.id;
      var result = await productService.deleteVersion(id);
      if (result) {
        this.getProductInfo();
        alert("Deleted color");
      }
      else
        alert("Can not delete color");
    },

    async addImage() {
      var formdata = new FormData();
      for (const image of this.$store.state.images) {
        formdata.append('productImages', image, image.name);
      }
      formdata.append('id', this.$store.state.productInfo._id);
      var res = await productService.addImage(formdata);
      if (res) {
        this.getProductInfo();
        alert("Add success");
      }
      else
        alert("Can not add image");
    },

    async addFocusImage() {
      var formdata = new FormData();
      if (this.$store.state.image)
        for (const image of this.$store.state.image) {
          formdata.append('productImages', image, image.name);
        }

      var res = await productService.addFocusImage(this.$store.state.productInfo._id,formdata);

      var formdata2 = new FormData();
      if (this.$store.state.focusImage)
        for (const image1 of this.$store.state.focusImage) {
          formdata2.append('productImages', image1, image1.name);
        }

      var res2 = await productService.addFocusImageBg(this.$store.state.productInfo._id,formdata2);

      if (res && res2) {
        this.getProductInfo();
        alert("Add success");
      }
      else
        alert("Can not add image");
    },

    async addVersion() {
      var formdata = new FormData();
      var data = this.$store.state.data;
      for (const image of this.$store.state.images) {
        formdata.append('productImages', image, image.name);
      }
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
      }
      var res = await productService.addVersion(formdata);
      if (res) {
        this.getProductInfo();
        alert("Add success");
      }
      else
        alert("Can not add color");
    },

    async updateVersion() {
      var formdata = new FormData();
      var data = this.$store.state.data;
      if (this.$store.state.images)
        for (const image of this.$store.state.images) {
          formdata.append('productImages', image, image.name);
        }
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
      }
      var res = await productService.updateVersion(data.id, formdata);
      if (res) {
        this.getProductInfo();
        alert("Update success");
      }
      else
        alert("Can not update color");
    }

  },
  mounted() {
    this.getProductInfo()
    this.retrieveSerie()
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Product Info</h2>
      </div>
    </div>

    <productImageFormAdd :route="route" v-if="this.route[3] == 'img'" @add:item="addImage" />
    <productFocusImageForm :route="route" v-if="this.route[3] == 'focus'" @add:item="addFocusImage" />
    <productInfoTable v-if="this.route[2] == 'info' && this.route[3] == null" :data="getProductInfos" @delete:image="deleteImage" @delete:version="deleteVersion" @reload:info="reloadInfo" />
    <productFormEdit v-if="this.route[2] == 'info' && this.route[3] == 'edit'" @update:item="updateProductInfo" :productInfo="getProductInfos" />
    <productVersionFormAdd :route="route" v-if="this.route[2] == 'version' && this.route[3] == 'add'" @add:item="addVersion" />
    <productVersionFormEdit :route="route" v-if="this.route[2] == 'version' && this.route[3] == 'edit'" @update:item="updateVersion" />

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