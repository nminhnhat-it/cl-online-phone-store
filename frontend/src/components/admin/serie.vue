<script>
import serieService from "@/services/serie.service";
import dataTable from "@/components/admin/dataTable.vue";

export default {
  props: {
    route: { type: Array, default: [] },
  },
  components: {
    dataTable,
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
  },
  mounted() {
    this.retrieveSerieData();
  }
}
</script>

<template>
  <div class="content">
    <h2 class="catefory-title mt-3">Series</h2>
    <dataTable :route="this.route" @update:table="retrieveSerieData" :dataArr="getSeries" />
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