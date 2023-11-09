<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import serieService from "@/services/serie.service";
import brandService from "@/services/brand.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const FormSchema = yup.object().shape({
      sr_title: yup
        .string()
        .required("Title cannot be blank.")
        .max(255, "Title maximum 255 characters."),
      br_id: yup
        .string()
        .required("Brand cannot be blank.")
    });
    return {
      FormSchema,
      data: {},
      brandSelected: ''
    }
  },
  methods: {
    async submitForm() {
      this.data.br_id = this.brandSelected;
      this.$store.state.data = this.data;
      this.$emit("update:item");
    },
    async retrieveData() {
      this.data = await serieService.get(this.$store.state.slug);
      var brand = this.$store.state.brands.filter((brand, index) => brand._id == this.data.br_id);
      this.brandSelected = brand[0]._id;
      if (!this.data)
        this.$router.push({ name: "admin.category.series" });
    },
  },
  mounted() {
    this.retrieveData();
  }
}
</script>

<template>
  <div class="upload-form-ctn mt-3">
    <hr>
    <Form @submit="submitForm" :validation-schema="FormSchema">
      <div class="position-relative mb-3">
        <label for="sr_title" class="form-label">Serie Title</label>
        <Field v-model="this.data.sr_title" name="sr_title" type="text" class="form-control form-control-secondary" id="sr_title" />
        <ErrorMessage name="sr_title" class="form-error-span" />
      </div>
      <div class="category-chose mb-3">
        <label for="br_id" class="form-label">Brand</label>
        <Field as="select" v-model="this.brandSelected" name="br_id" id="br_id" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Brand</option>
          <option v-for="brand in this.$store.state.brands" :value="brand._id">{{ brand.br_title }}</option>
        </Field>
        <ErrorMessage name="br_id" class="form-error-span" />
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