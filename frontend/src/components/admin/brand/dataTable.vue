<script>

export default {
  props: {
    dataArr: { type: Array, default: [] },
  },
  methods: {

    editBrand(e) {
      var slug = $(e.target).attr("slug");
      this.$router.push({ name: "admin.category.brands.edit", params: { slug: slug } });
    },

    deleteBrand(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("delete:item");
    },
  },
  emits: ['delete:item']
}
</script>

<template>
  <div style="overflow-x: scroll;">
    <table v-if="dataArr[0]" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col">#</th>
        <th class="data-tb-col" style="min-width: 102px;">Title</th>
        <th class="data-tb-col" style="min-width: 102px;">Slug</th>
        <th class="data-tb-col" style="min-width: 102px;">Descriptions</th>
        <th class="data-tb-col text-center" style="min-width: 102px;">Logo</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Created</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Upadted</th>
        <th class="data-tb-col" style="min-width: 102px;">Edit</th>
      </tr>

      <tr v-for="(data, key) in this.dataArr" class="data-tb-row">
        <td class="data-tb-col">{{ key + 1 }}</td>
        <td class="data-tb-col">{{ data.br_title }}</td>
        <td class="data-tb-col">{{ data.br_slug }}</td>
        <td class="data-tb-col" style="text-overflow: ellipsis; max-width: 200px;">{{ data.br_desc }}</td>
        <td class="data-tb-col text-center">
          <img v-if="data.br_img" :src="this.$store.state.apiUrl + data.br_img" alt="" style="width: 4rem; height: 4rem; object-fit: contain;">
        </td>
        <td class="data-tb-col">{{ data.createdAt }}</td>
        <td class="data-tb-col">{{ data.updatedAt }}</td>

        <td class="data-tb-col modify">

          <a :slug="data.br_slug" @click="editBrand">Edit</a>
          <a :id="data._id" @click="deleteBrand">Delete</a>
        </td>
      </tr>
    </table>
  </div>
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