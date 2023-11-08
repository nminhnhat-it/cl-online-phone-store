<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  props: {
    route: { type: Array, default: [] },
  },
  data() {
    return {
      data: {
        pv_title: "",
        pv_price: "",
        pv_quantity: 1,
      }
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {

    async submitForm() {
      this.data.id = this.$store.state.id;
      this.$store.state.data = this.data;
      this.$store.state.images = this.images;
      this.$emit("update:item");
    },

    setInfos() {
      var productVersion = this.$store.state.productVersion;
      if (productVersion)
        this.data = {
          pv_title: productVersion.pv_title,
          pv_price: productVersion.pv_price,
          pv_quantity: productVersion.pv_quantity,
        }
    },

    getImages(e) {
      this.images = e.target.files;
    },
  },
  mounted() {
    this.setInfos();
  },
  emits: ["update:item"]
}
</script>

<template>
  <Form @submit="submitForm">
    <div class="row">
      <div>
        <div class="upload-form-ctn">
          <hr>
          <h5>Add Color</h5>
          <div class="position-relative mb-3">
            <label for="pv_title" class="form-label">Title</label>
            <Field v-model="this.data.pv_title" name="pv_title" type="text" class="form-control form-control-secondary" id="pv_title" />
          </div>
          <div class="position-relative mb-3">
            <label for="pv_price" class="form-label">Prices</label>
            <Field v-model="this.data.pv_price" name="pv_price" type="text" class="form-control form-control-secondary" id="pv_price" />
          </div>
          <div class="category-chose mb-3">
            <label for="br_id" class="form-label">Quantity</label>
            <select v-model="this.data.pv_quantity" name="sr_id" id="sr_id" class="form-select form-control form-control-secondary">
              <option disabled value="">Choose Quantity</option>
              <option v-for="n in 100" :value="n">{{ n }}</option>
            </select>
          </div>
          <div class="position-relative mb-3">
            <label for="productVerionImage" class="form-label">Image</label>
            <Field @change="getImages" tabindex="-1" name="productVerionImage" multiple type="file" class="form-control form-control-secondary" id="productVerionImage" accept="image/*" />
          </div>
        </div>
        <hr>
      </div>
      <div class="d-flex justify-content-end">
        <router-link :to="{ name: 'admin.product.info' }">
          <button class="btn btn-danger ms-auto" style="width: 76px;">Back</button>
        </router-link>
        <button type="submit" class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Submit</button>
      </div>
    </div>
  </Form>
</template>

<style scoped>
.form-error-span {
  color: red;
  font-size: 12px !important;
}

.form-success-span {
  color: green;
  font-size: 12px !important;
}

:focus-visible {
  outline: none !important;
}

.bg-e8f3ee {
  --bs-bg-opacity: 1;
  background-color: rgba(232, 243, 238, var(--bs-bg-opacity));
}

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

.upload-form-ctn #upload-form .form-label {
  cursor: pointer;
  color: #5a5d60;
  font-weight: 500;
}

.form-control-secondary {
  border: 1px solid #5a5d60;
  color: #5a5d60 !important;
}

.form-control-secondary:focus {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}
</style>