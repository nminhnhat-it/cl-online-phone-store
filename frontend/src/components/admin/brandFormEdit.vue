<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import brandService from "@/services/brand.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      data: {}
    }
  },
  methods: {
    async submitBrand() {
      var data = this.data;
      console.log(this.data)
      var result = await brandService.update(this.data._id, this.data);
      if (result)
        alert("Updated brand");
      // else alert("Can't Update brand")
    },
    async retrieveData() {
      this.data = await brandService.get(this.$store.state.slug);

    }
  },
  mounted() {
    this.retrieveData();

  }
}
</script>

<template>
  <div class="upload-form-ctn mt-3">
    <form @submit="submitBrand">
      <div class="position-relative mb-3">
        <label for="br_title" class="form-label">Brand Title</label>
        <Field v-model="this.data.br_title" name="br_title" type="text" class="form-control form-control-secondary" id="br_title" />
      </div>
      <div class="position-relative mb-3">
        <label for="br_desc" class="form-label">Brand Descriptions</label>
        <Field v-model="this.data.br_desc" name="br_desc" type="text" class="form-control form-control-secondary" id="br_desc" />
      </div>
      <button class="btn btn-6bc3e7">Submit</button>
      <router-link :to="{ name: 'admin.category.brands' }">
        <button class="btn btn-danger ms-3">Cancel</button>
      </router-link>
    </form>
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