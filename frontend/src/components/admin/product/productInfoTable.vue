<script>
import productService from "@/services/product.service";

export default {
  props: {
    data: {
      type: Object, default: {
        productInfo: {},
        productVersions: []
      }
    },
  },
  methods: {

    editProduct(e) {
      var slug = $(e.target).attr("slug");
      this.$router.push({ name: "admin.product.info.edit", params: { slug: slug } });
    },

    deleteProduct(e) {
      this.$store.state.id = $(e.target).attr("id");
    },

    deleteImage(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("delete:image");
    },

    addImage(e) {
      this.$store.state.images = e.target.files;
      this.$emit("add:image");
    },

    addVersion(e) {
      var slug = $(e.target).attr("slug");
      this.$router.push({ name: 'admin.product.version.add', params: { slug: slug } });
    },

    deleteVersion(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("delete:version");
    },

    async editVersion(e) {
      var id = $(e.target).attr("id");
      var slug = $(e.target).attr("slug");
      this.$router.push({ name: "admin.product.version.edit", params: { id: id, slug: slug } });
    },

    async isFocusChange(e) {
      var data = {};
      if (e.target.value == 'true')
        data.pd_isFocusProduct = false;
      if (e.target.value == 'false')
        data.pd_isFocusProduct = true;

      await productService.isFocusProduct(this.data._id, data);
      this.$emit("reload:info");
    },

    changeFocusImage(e) {
      this.$store.state.image = e.target.files;
      this.$emit("change:focusImage");
    },

    changeFocusImageBg(e) {
      this.$store.state.focusImage = e.target.files;
      this.$emit("change:focusImageBg");
    }
  },
  emits: ["delete:image", "delete:version", "reload:info", "change:focusImage", "change:focusImageBg", "add:image"]
}
</script>

<template>
  <hr>
  <router-link :to="{ name: 'admin.product.all' }">
    <button class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Back</button>
  </router-link>
  <div style="overflow-x: scroll;">
    <table v-if="data" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col" style="min-width: 102px;">Title</th>
        <th class="data-tb-col" style="min-width: 102px;">Descriptions</th>
        <th class="data-tb-col" style="min-width: 102px;">Slug</th>
        <th class="data-tb-col" style="min-width: 102px;">Screen</th>
        <th class="data-tb-col" style="min-width: 102px;">Camera</th>
        <th class="data-tb-col" style="min-width: 102px;">Battery</th>
        <th class="data-tb-col" style="min-width: 102px;">Memory</th>
        <th class="data-tb-col" style="min-width: 102px;">Ram Memory</th>
        <th class="data-tb-col" style="min-width: 102px;">Chipset</th>
        <th class="data-tb-col" style="min-width: 102px;">Focus Product</th>
        <th class="data-tb-col" style="min-width: 102px;">Modify</th>
      </tr>

      <tr class="data-tb-row">
        <td class="data-tb-col">{{ data.pd_title }}</td>
        <td class="data-tb-col" style="text-overflow: ellipsis; max-width: 200px;">{{ data.pd_desc }}</td>
        <td class="data-tb-col">{{ data.pd_slug }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_screen }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_camera }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_battery }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_mem }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_ram }}</td>
        <td class="data-tb-col">{{ data.productInfo.pi_chipset }}</td>
        <td class="data-tb-col">
          <input @change="isFocusChange" :checked="data.pd_isFocusProduct" class="form-check-input" type="checkbox" :value="data.pd_isFocusProduct" style="cursor: pointer;">
        </td>

        <td class="data-tb-col modify">
          <a @click="editProduct" :slug="data.pd_slug">Edit</a>
        </td>
      </tr>
    </table>
  </div>

  <hr>
  <div v-if="data.pd_isFocusProduct" style="overflow-x: scroll;">
    <h5 class="mt-3">Focus Images</h5>
    <table class="data-tb">
      <tr class="data-tb-row">
        <th class="data-tb-col" style="min-width: 102px;">
          <div class="">Image</div>
        </th>
        <th class="data-tb-col" style="min-width: 102px;">
          <div class="">Background</div>
        </th>
      </tr>
      <tr class="data-tb-row">
        <td class="data-tb-col" style="min-width: 102px;">
          <img v-if="data.pd_focusImg" :src="this.$store.state.apiUrl + data.pd_focusImg" alt="" style=" width: 5rem; height: 5rem; object-fit: contain;">
          <div v-if="!data.pd_focusImg" class="">None</div>
        </td>
        <td class="data-tb-col" style="min-width: 102px;">
          <img v-if="data.pd_focusImgBg" :src="this.$store.state.apiUrl + data.pd_focusImgBg" alt="" style=" width: 5rem; height: 5rem; object-fit: contain;">
          <div v-if="!data.pd_focusImg" class="">None</div>
        </td>
      </tr>
      <tr class="data-tb-row">
        <td class="data-tb-col modify" style="min-width: 102px;">
          <label for="focusImage">Change</label>
          <input @change="changeFocusImage" id="focusImage" type="file" style="display: none;">
        </td>
        <td class="data-tb-col modify" style="min-width: 102px;">
          <label for="focusImageBg">Change</label>
          <input @change="changeFocusImageBg" id="focusImageBg" type="file" style="display: none;">
        </td>
      </tr>
    </table>
  </div>

  <hr>
  <div style="overflow-x: scroll;">
    <h5 class="mt-3">Images</h5>
    <table v-if="data" class="data-tb">
      <tr class="data-tb-row">
        <th v-for="image in data.productImages" class="data-tb-col" style="min-width: 102px;">
          <img :src="this.$store.state.apiUrl + image.im_path" alt="" style=" width: 5rem; height: 5rem; object-fit: contain;">
        </th>
        <td class="data-tb-col modify" style="text-align: center;">
          <label for="addImage"><i class="fa-solid fa-plus fa-2xl"></i></label>
          <input @change="addImage" multiple="true" id="addImage" type="file" style="display: none;">
        </td>

      </tr>
      <tr class="data-tb-row">
        <td v-for="image in data.productImages" class="data-tb-col modify" style="text-align: center;">
          <a @click="deleteImage" :id="image._id">Delete</a>
        </td>
        <th v-if="data.productImages" class="data-tb-col" style="min-width: 102px;"></th>
      </tr>
    </table>
  </div>

  <div>
    <hr>
    <h5 class="mt-3">Colors</h5>

    <table v-if="data.productVersions" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col" style="min-width: 102px;">Title</th>
        <th class="data-tb-col" style="min-width: 102px;">Price</th>
        <th class="data-tb-col" style="min-width: 102px;">Quantity</th>
        <th class="data-tb-col" style="min-width: 102px;">Image</th>
        <th class="data-tb-col" style="min-width: 102px;"></th>
      </tr>

      <tr v-for="productVersion in data.productVersions" class="data-tb-row">
        <td class="data-tb-col">{{ productVersion.pv_title }}</td>
        <td class="data-tb-col text-danger">${{ productVersion.pv_price.toLocaleString() }}</td>
        <td class="data-tb-col">{{ productVersion.pv_quantity }}</td>
        <td class="data-tb-col">
          <img :src="this.$store.state.apiUrl + productVersion.pv_img" alt="" style=" width: 5rem; height: 5rem; object-fit: contain;">
        </td>
        <td class="data-tb-col modify">
          <a @click="editVersion" :id="productVersion._id" :slug="data.pd_slug">Edit</a>
          <a @click="deleteVersion" :id="productVersion._id">Delete</a>
        </td>
      </tr>

      <tr class="data-tb-row">
        <td class="data-tb-col"></td>
        <td class="data-tb-col"></td>
        <td class="data-tb-col"></td>
        <td class="data-tb-col"></td>
        <td class="data-tb-col modify">
          <a @click="addVersion">Add More +</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.btn-6bc3e7 {
  --bs-btn-color: rgb(255, 255, 255);
  --bs-btn-bg: #5fb8db;
  --bs-btn-border-color: #66c1e6;
  --bs-btn-hover-color: rgb(255, 255, 255);
  --bs-btn-hover-bg: #20a9e4;
  --bs-btn-hover-border-color: #27a6dd;
  --bs-btn-focus-shadow-rgb: 11, 172, 204;
  --bs-btn-active-color: #000;
  --bs-btn-active-bg: #3dd5f3;
  --bs-btn-active-border-color: #25cff2;
  --bs-btn-active-shadow: inset 0 3px 5pxrgba(0, 0, 0, 0.125);
  --bs-btn-disabled-color: #000;
  --bs-btn-disabled-bg: #0dcaf0;
  --bs-btn-disabled-border-color: #0dcaf0;
}

.data-tb {
  border-collapse: unset;
}

.data-tb,
.data-tb .data-tb-col {
  border: 1px solid #5a5d60;
  text-align: center !important;
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

.data-tb .data-tb-col.modify label {
  cursor: pointer;
  text-decoration: none;
  color: #33a0cb;
}

.data-tb .data-tb-col.modify a:hover {
  color: rgb(206, 97, 97);
}

.data-tb .data-tb-col.modify label:hover {
  color: rgb(206, 97, 97);
}

.data-tb .data-tb-col.modify:hover {
  cursor: pointer;
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