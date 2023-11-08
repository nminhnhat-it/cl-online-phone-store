<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import serieService from "@/services/serie.service";

export default {
  props: {
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: {},
      brandSelected: ''
    }
  },
  methods: {
    async submitForm() {
      this.data.br_id = this.brandSelected;
      this.$store.state.data = this.data;
      this.data = {};
      this.brandSelected = '';
      this.$emit("add:item", this.data);
    },
  }
}
</script>

<template>
  <div class="upload-form-ctn mt-3">
    <hr>
    <Form @submit="submitForm">
      <div class="position-relative mb-3">
        <label for="br_title" class="form-label">Serie Title</label>
        <Field v-model="this.data.sr_title" name="br_title" type="text" class="form-control form-control-secondary" id="br_title" />
      </div>
      <div class="category-chose mb-3">
        <label for="br_id" class="form-label">Brand</label>
        <select v-model="this.brandSelected" name="br_id" id="br_id" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Brand</option>
          <option v-for="brand in this.$store.state.brands" :value="brand._id">{{ brand.br_title }}</option>
        </select>
      </div>
      <hr>
      <button type="submit" class="btn btn-6bc3e7">Submit</button>
      <router-link :to="{ name: 'admin.category.series' }">
        <button class="btn btn-danger ms-3">Cancel</button>
      </router-link>
    </Form>
  </div>

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