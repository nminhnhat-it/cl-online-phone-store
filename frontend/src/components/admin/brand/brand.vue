<script>
import brandService from "@/services/brand.service";

import dataTable from "@/components/admin/brand/dataTable.vue";

import brandFormAdd from "@/components/admin/brand/brandFormAdd.vue";
import brandFormEdit from "@/components/admin/brand/brandFormEdit.vue";

export default {
  props: {
    route: { type: Array, default: [] },
    slug:{ type: String },
  },

  components: {
    dataTable,
    brandFormAdd,
    brandFormEdit,
  },

  computed: {
    getBrands() {
      return this.$store.state.brands;
    },
  },
  methods: {

    async retrieveBrandData() {
      var brands = await brandService.getAll();
      this.$store.state.brands = brands;
    },

    async deleteBrand() {
      var id = this.$store.state.id;
      var result = await brandService.delete(id);
      if (result)
        alert("Delete success");
      else
        alert("Can not delete item");
      this.retrieveBrandData()
    },

    async updateBrand() {
      var data = this.$store.state.data;
      var id = this.$store.state.data._id;

      var formdata = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
      }
      if (this.$store.state.images)
        for (const image of this.$store.state.images) {
          formdata.append('brandImage', image, image.name);
        }

      var result = await brandService.update(id, formdata)
      if (result)
        alert("Update success");
      else
        alert("Can not update item");
      this.retrieveBrandData()
    },

    async addBrand() {
      var data = this.$store.state.data;
      var formdata = new FormData();
      for (const [key, value] of Object.entries(data)) {
        formdata.append(key, value);
      }
      if (this.$store.state.images)
        for (const image of this.$store.state.images) {
          formdata.append('brandImage', image, image.name);
        }

      var result = await brandService.create(formdata);
      if (result) {
        this.$store.state.data = {};
        alert("Add success");
        this.retrieveBrandData()
      }
      else
        alert("Can not add item");
    },
  },

  mounted() {
    this.retrieveBrandData();
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Brands</h2>
      </div>
      <div class="col">
        <router-link :to="{ name: 'admin.category.brands.add' }">
          <div v-if="this.route[3] != 'add' && this.route[3] != 'edit'" class="btn btn-success">Add +</div>
        </router-link>
      </div>
    </div>

    <brandFormAdd v-if="this.route[3] == 'add'" @add:item="addBrand" />
    <brandFormEdit :slug="slug" v-if="this.route[3] == 'edit'" @update:item="updateBrand" />
    <dataTable v-if="this.route[3] == null" :route="this.route" @delete:item="deleteBrand" :dataArr="getBrands" />
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