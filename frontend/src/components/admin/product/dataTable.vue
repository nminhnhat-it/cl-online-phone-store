<script>

export default {
  props: {
    dataArr: { type: Array, default: [] },
  },
  data() {
    return {
      filterProduct: [],
    }
  },
  methods: {

    editProduct(e) {
      this.$store.state.slug = $(e.target).attr("slug");
      this.$router.push({ name: "admin.category.brands.edit" });
    },

    deleteProduct(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("delete:item");
    },

    deleteProduct(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("delete:item");
    },

    viewInfo(e) {
      var slug = $(e.target).attr("slug");
      this.$router.push({ name: 'admin.product.info', params: { slug: slug } });
    },

    search(e) {
      var searchWords = e.target.value;
      this.filterProduct = this.dataArr.filter(product => product.pd_title.toLowerCase().includes(searchWords.toLowerCase()))
    }
  },
  emits: ['delete:item'],
}
</script>

<template>
  <hr>
  <div class="search">
    <div class="row">
      <div class="col">
        <div class="position-relative mb">
          <input @input="search" class="form-control me-2" type="search" placeholder="Search Products" aria-label="Search">
        </div>
      </div>
    </div>
  </div>
  <hr>
  <div style="overflow-x: scroll;">
    <table v-if="dataArr[0]" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col">#</th>
        <th class="data-tb-col" style="min-width: 102px;">Title</th>
        <th class="data-tb-col" style="min-width: 102px;">Descriptions</th>
        <th class="data-tb-col" style="min-width: 102px;">Slug</th>
        <th class="data-tb-col text-center" style="min-width: 102px;">Price</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Created</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Upadted</th>
        <th class="data-tb-col" style="min-width: 102px;"></th>
      </tr>

      <tr v-for="(data, key) in this.filterProduct.length == 0 ? this.dataArr : this.filterProduct" class="data-tb-row">
        <td class="data-tb-col">{{ key + 1 }}</td>
        <td class="data-tb-col">{{ data.pd_title }}</td>
        <td class="data-tb-col" style="text-overflow: ellipsis; max-width: 200px;">{{ data.pd_desc }}</td>
        <td class="data-tb-col">{{ data.pd_slug }}</td>
        <td class="data-tb-col text-center text-danger">${{ data.pd_minPrice.toLocaleString() }}</td>
        <td class="data-tb-col">{{ data.createdAt }}</td>
        <td class="data-tb-col">{{ data.updatedAt }}</td>
        <td class="data-tb-col modify">
          <a :slug="data.pd_slug" @click="viewInfo">More Info</a>
          <a :id="data._id" @click="deleteProduct">Delete</a>
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