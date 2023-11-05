<script>
import brandService from "@/services/brand.service";
import dataTable from "@/components/admin/dataTable.vue";
import brandFormAdd from "@/components/admin/brandFormAdd.vue";
import brandFormEdit from "@/components/admin/brandFormEdit.vue";

export default {
  props: {
    id: { type: String, default: "" },
    route: { type: Array, default: [] },
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
    <brandFormAdd v-if="this.route[3] == 'add'" />
    <brandFormEdit v-if="this.route[3] == 'edit'" />
    <dataTable v-if="this.route[3] != 'add' && this.route[3] != 'edit'" :route="this.route" @update:table="retrieveBrandData" :dataArr="getBrands" />
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