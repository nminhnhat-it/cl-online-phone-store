<script>
import serieService from "@/services/serie.service";
import brandService from "@/services/brand.service";

import dataTable from "@/components/admin/serie/dataTable.vue";

import serieFormAdd from "@/components/admin/serie/serieFormAdd.vue";
import serieFormEdit from "@/components/admin/serie/serieFormEdit.vue";

export default {
  props: {
    route: { type: Array, default: [] },
  },

  components: {
    dataTable,
    serieFormAdd,
    serieFormEdit,
  },
  
  computed: {
    getSeries() {
      return this.$store.state.series;
    },
  },
  
  methods: {

    async retrieveSerieData() {
      var series = await serieService.getAll();
      this.$store.state.series = series;
    },

    async retrieveBrands() {
      var brands = await brandService.getAll();
      this.$store.state.brands = brands
    },

    async deleteSerie() {
      var id = this.$store.state.id;
      var result = await serieService.delete(id);
      if (result)
        alert("Delete success");
      else
        alert("Can not delete item");
      this.retrieveSerieData()
    },

    async updateSerie() {
      var data = this.$store.state.data;
      var id = this.$store.state.data._id;
      var result = await serieService.update(id, data)
      if (result)
        alert("Update success");
      else
        alert("Can not update item");
      this.retrieveSerieData()
    },

    async addSerie() {
      var data = this.$store.state.data;
      var result = await serieService.create(data);
      if (result)
        alert("Add success");
      else
        alert("Can not add item");
      this.retrieveSerieData()
    },
  },

  mounted() {
    this.retrieveSerieData();
    this.retrieveBrands();
  }
}
</script>

<template>
  <div class="content">
    <div class="row mt-3" style="display: inline-flex;">
      <div class="col">
        <h2 class="catefory-title">Series</h2>
      </div>
      <div class="col">
        <router-link :to="{ name: 'admin.category.series.add' }">
          <div v-if="this.route[3] != 'add' && this.route[3] != 'edit'" class="btn btn-success">Add +</div>
        </router-link>
      </div>
    </div>

    <serieFormAdd v-if="this.route[3] == 'add'" @add:item="addSerie" />
    <serieFormEdit v-if="this.route[3] == 'edit'" @update:item="updateSerie" />
    <dataTable v-if="this.route[3] == null" @delete:item="deleteSerie" :dataArr="getSeries" />
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