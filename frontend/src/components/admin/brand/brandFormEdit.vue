<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import brandService from "@/services/brand.service";

export default {
  props: {
    slug: { type: String, default: "" },
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const FormSchema = yup.object().shape({
      br_title: yup
        .string()
        .required("Title cannot be blank.")
        .max(255, "Title maximum 255 characters."),
      br_desc: yup
        .string()
        .max(255, "Descriptions maximum 255 characters."),
    });
    return {
      FormSchema,
      data: {},
      imageUrl: null
    }
  },
  methods: {

    async submitForm() {
      this.$store.state.data = this.data;
      this.$emit("update:item");
    },

    async retrieveData() {
      var brand = await brandService.get(this.slug);
      this.data = brand
    },

    getImages(e) {
      this.$store.state.images = e.target.files;
      this.imageUrl = URL.createObjectURL(e.target.files[0]);
    },
  },
  mounted() {
    this.retrieveData();
    this.$store.state.images = null;
  }
}
</script>

<template>
  <div class="upload-form-ctn mt-3">
    <Form @submit="submitForm" :validation-schema="FormSchema">
      <div class="position-relative mb-3">
        <label for="br_title" class="form-label">Brand Title</label>
        <Field v-model="this.data.br_title" name="br_title" type="text" class="form-control form-control-secondary" id="br_title" />
        <ErrorMessage name="br_title" class="form-error-span" />
      </div>
      <div class="position-relative mb-3">
        <label for="br_desc" class="form-label">Brand Descriptions</label>
        <Field v-model="this.data.br_desc" name="br_desc" type="text" class="form-control form-control-secondary" id="br_desc" />
        <ErrorMessage name="br_desc" class="form-error-span" />
      </div>
      <div class="position-relative">
        <label for="" class="form-label">Image</label>
      </div>
      <div class="position-relative mb-3">
        <img class="me-3" v-if="!$store.state.images && data.br_img" :src="this.$store.state.apiUrl + data.br_img" alt="" style="width: 6rem; height: 6rem; object-fit: contain;   border: 1px solid #5a5d60; padding: 1rem;">
        <img class="me-3" v-if="$store.state.images" :src="this.imageUrl" alt="" style="width: 6rem; height: 6rem; object-fit: contain;   border: 1px solid #5a5d60; padding: 1rem;">
        <Field @change="getImages" tabindex="-1" multiple name="brandImage" type="file" class="form-control form-control-secondary" id="brandImage" accept="image/*" style="display:  none;" />
        <ErrorMessage name="brandImage" class="form-error-span" />
        <label for="brandImage" class="form-label change-image-btn">Change</label>
      </div>
      <button type="submit" class="btn btn-6bc3e7">Submit</button>
      <router-link :to="{ name: 'admin.category.brands' }">
        <button class="btn btn-danger ms-3">Cancel</button>
      </router-link>
    </Form>
  </div>
</template>

<style scoped>
.change-image-btn:hover {
  color: #5fb8db;
  cursor: pointer;
}

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