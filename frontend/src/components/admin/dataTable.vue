<script>
import brandService from "@/services/brand.service";
import serieService from "@/services/serie.service";
import productService from "@/services/product.service";

export default {
  props: {
    route: { type: Array, default: [] },
    dataArr: { type: Array, default: [] },
  },
  methods: {
    async editBrand(e) {
      var slug = $(e.target).parent().parent().find(".slug").html();
      this.$store.state.slug = slug;
      this.$router.push({ name: "admin.category.brands.edit" });
    },
    async deleteBrand(e) {
      var id = $(e.target).parent().parent().find(".id").html();
      var result = await brandService.delete(id);
      if (result) this.$emit("update:table");
      else alert("Can't delete brand");
    },
    async deleteSerie(e) {
      var id = $(e.target).parent().parent().find(".id").html();
      var result = await serieService.delete(id);
      if (result) this.$emit("update:table");
      else alert("Can't delete serie");
    },
    async deleteProduct(e) {
      var id = $(e.target).parent().parent().find(".id").html();
      var result = await productService.delete(id);
      if (result) this.$emit("update:table");
      else alert("Can't delete product");
    }
  },
  mounted() {
  }
}
</script>

<template>
  <table class="data-tb mt-3">
    <tr class="data-tb-row">
      <th class="data-tb-col">#</th>
      <th v-for="(value, field) in this.dataArr[0]" class="data-tb-col" style="min-width: 102px;">{{ field }}</th>
      <th class="data-tb-col" style="min-width: 102px;">Edit</th>
    </tr>
    <tr v-for="(data, key) in this.dataArr" class="data-tb-row">
      <td class="data-tb-col">{{ key + 1 }}</td>
      <td v-for="(value, field) in data" :class="{
        'id': field == '_id',
        'slug': field == 'br_slug' || field == 'pd_slug' || field == 'sr_slug'
      }" class="data-tb-col">{{ value }}</td>
      <td class="data-tb-col modify">

        <a v-if="route[2] == 'brands'" @click="editBrand">Edit</a>
        <a v-if="route[2] == 'brands'" @click="deleteBrand">Delete</a>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.data-tb {
  border-collapse: unset;
}

.data-tb,
.data-tb .data-tb-col {
  border: 1px solid #5a5d60;
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