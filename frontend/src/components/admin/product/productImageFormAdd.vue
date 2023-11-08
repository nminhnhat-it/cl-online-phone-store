<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import productService from "@/services/product.service";

export default {
  props: {
    route: { type: Array, default: [] },
  },
  data() {
    return {
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {

    async getImages(e) {
      this.$store.state.images = e.target.files;
    },

    async submitForm() {
      this.$emit("add:item");
    },
  },
  emits: ["add:item"]
}
</script>

<template>
  <Form @submit="submitForm">
    <hr>
    <div class="row">
      <div v-if="this.route[3] == 'img'" class="upload-form-ctn">
        <div class="position-relative mb-3">
          <label for="productImages" class="form-label">Images</label>
          <Field @change="getImages" tabindex="-1" multiple name="productImages" type="file" class="form-control form-control-secondary" id="productImages" accept="image/*" />
        </div>
      </div>
    </div>
    <hr>
    <div v-if="this.route[3] == 'img'" class="d-flex justify-content-end">
      <router-link :to="{ name: 'admin.product.info' }">
        <button class="btn btn-danger ms-auto" style="width: 76px;">Back</button>
      </router-link>
      <button type="submit" class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Submit</button>
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