<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import productService from "@/services/product.service";

export default {
  props: {
    route: { type: Array, default: [] },
  },
  data() {
    const FormSchema1 = yup.object().shape({
      pd_title: yup
        .string()
        .required("Title cannot be blank.")
        .max(255, "Title maximum 255 characters."),
      pd_desc: yup
        .string()
        .max(255, "Descriptions maximum 255 characters."),
      sr_id: yup
        .string()
        .required("Serie cannot be blank."),
      productImages: yup
        .mixed()
        .required("Images cannot be blank."),
      pi_camera: yup
        .string()
        .max(255, "Camera info maximum 255 characters."),
      pi_battery: yup
        .string()
        .max(255, "Battery info maximum 255 characters."),
      pi_chipset: yup
        .string()
        .max(255, "Chipset info maximum 255 characters."),
    });

    const FormSchema2 = yup.object().shape({
      pv_title: yup
        .string()
        .required("Title cannot be blank.")
        .max(255, "Title maximum 255 characters."),
      pv_price: yup
        .number()
        .required("Number cannot be blank."),
      pv_quantity: yup
        .number()
        .required("Title cannot be blank."),
      productVerionImage: yup
        .mixed()
        .required("Images cannot be blank."),
    });
    return {
      FormSchema1,
      FormSchema2,
      screenSizes: [5.4, 6.1, 6.7],
      rams: [2, 4, 6, 8, 12, 16],
      mems: [16, 32, 64, 128, 256, 512, 1024],
      data: {
        sr_id: "",

        pi_screen: "",
        pi_camera: "",
        pi_battery: "",
        pi_mem: "",
        pi_ram: "",
        pi_chipset: "",

        pv_title: "",
        pv_price: "",
        pv_quantity: 1,
      },
      images: [],
      colorImg: [],
      currentVers: 1,
      imageUrl: null,
      colorImageUrl: null,
      URL: URL
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {

    displayNextForm() {
      this.$router.push({ name: 'admin.product.add.version' });
    },

    async submitForm() {
      this.$store.state.data = this.data;
      this.$store.state.images = this.images;
      this.$store.state.colorImg = this.colorImg[0];
      this.images = []
      this.colorImg = []

      this.$emit("add:item");
    },

    getImages(e) {
      this.images = e.target.files;
    },

    getColorImg(e) {
      this.colorImg = e.target.files;
      this.colorImageUrl = URL.createObjectURL(e.target.files[0]);
    }
  },
  emits: ["add:item"]
}
</script>

<template>
  <Form @submit="displayNextForm" :validation-schema="FormSchema1">
    <div v-if="!this.route[3]" class="upload-form-ctn">
      <hr>
      <h5>Product Infomations</h5>
      <div class="position-relative mb-3">
        <label for="pd_title" class="form-label">Title</label>
        <Field v-model="this.data.pd_title" name="pd_title" type="text" class="form-control form-control-secondary" id="pd_title" />
        <ErrorMessage name="pd_title" class="form-error-span" />
      </div>
      <div class="position-relative mb-3">
        <label for="pd_desc" class="form-label">Descriptions</label>
        <Field v-model="this.data.pd_desc" name="pd_desc" type="text" class="form-control form-control-secondary" id="pd_desc" />
        <ErrorMessage name="pd_desc" class="form-error-span" />
      </div>
      <div class="category-chose mb-3">
        <label for="sr_id" class="form-label">Serie</label>
        <Field as="select" v-model="this.data.sr_id" name="sr_id" id="sr_id" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Serie</option>
          <option v-for="serie in this.$store.state.series" :value="serie._id">{{ serie.sr_title }}</option>
        </Field>
        <ErrorMessage name="sr_id" class="form-error-span" />
      </div>
      <div class="position-relative">
        <label for="" class="form-label">Images</label>
      </div>
      <div class="position-relative mb-3">
        <img v-for="image in this.images" class="me-3" v-if="this.images.length != 0" :src="URL.createObjectURL(image)" alt="" style="width: 6rem; height: 6rem; object-fit: contain;   border: 1px solid #5a5d60; padding: 1rem;">
        <img class="me-3" v-if="this.images.length == 0" alt="" style="width: 6rem; height: 6rem; object-fit: contain;   border: 1px solid #5a5d60; padding: 1rem;">
        <Field @change="getImages" tabindex="-1" multiple name="productImages" type="file" class="form-control form-control-secondary" id="productImages" accept="image/*" style="display:  none;" />
        <ErrorMessage name="productImages" class="form-error-span" />
        <label for="productImages" class="form-label change-image-btn">Change</label>
      </div>
      <div class="position-relative mb-3">
        <label for="pi_camera" class="form-label">Camera Info</label>
        <Field v-model="this.data.pi_camera" name="pi_camera" type="text" class="form-control form-control-secondary" id="pi_camera" />
        <ErrorMessage name="pi_camera" class="form-error-span" />
      </div>
      <div class="position-relative mb-3">
        <label for="pi_battery" class="form-label">Battery Info</label>
        <Field v-model="this.data.pi_battery" name="pi_battery" type="text" class="form-control form-control-secondary" id="pi_battery" />
        <ErrorMessage name="pi_battery" class="form-error-span" />
      </div>
      <div class="category-chose mb-3">
        <label for="pi_screen" class="form-label">Screen Size</label>
        <Field as="select" v-model="this.data.pi_screen" name="pi_screen" id="pi_screen" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Screen Size</option>
          <option v-for="size in this.screenSizes" :value="size">{{ size }} inch</option>
        </Field>
        <ErrorMessage name="pi_screen" class="form-error-span" />
      </div>
      <div class="category-chose mb-3">
        <label for="pi_mem" class="form-label">Memory Info</label>
        <Field as="select" v-model="this.data.pi_mem" name="pi_mem" id="pi_mem" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Memory</option>
          <option v-for="mem in this.mems" :value="mem">{{ mem }} GB</option>
        </Field>
        <ErrorMessage name="pi_mem" class="form-error-span" />
      </div>
      <div class="category-chose mb-3">
        <label for="pi_ram" class="form-label">Ram Memory</label>
        <Field as="select" v-model="this.data.pi_ram" name="pi_ram" id="pi_ram" class="form-select form-control form-control-secondary">
          <option disabled value="">Choose Ram Memory</option>
          <option v-for="ram in this.rams" :value="ram">{{ ram }} GB</option>
        </Field>
        <ErrorMessage name="pi_ram" class="form-error-span" />
      </div>
      <div class="position-relative mb-3">
        <label for="pi_chipset" class="form-label">Chipset Info</label>
        <Field v-model="this.data.pi_chipset" name="pi_chipset" type="text" class="form-control form-control-secondary" id="pi_chipset" />
        <ErrorMessage name="pi_chipset" class="form-error-span" />
      </div>
      <hr>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Next</button>
      </div>
    </div>
  </Form>

  <Form @submit="submitForm" :validation-schema="FormSchema2">
    <div class="row">
      <div v-if="this.route[3] == 'version'">
        <div class="upload-form-ctn">
          <hr>
          <h5>Add Color</h5>
          <div class="position-relative mb-3">
            <label for="pv_title" class="form-label">Title</label>
            <Field v-model="this.data.pv_title" name="pv_title" type="text" class="form-control form-control-secondary" id="pv_title" />
            <ErrorMessage name="pv_title" class="form-error-span" />
          </div>
          <div class="position-relative mb-3">
            <label for="pv_price" class="form-label">Prices</label>
            <Field v-model="this.data.pv_price" name="pv_price" type="text" class="form-control form-control-secondary" id="pv_price" />
            <ErrorMessage name="pv_price" class="form-error-span" />
          </div>
          <div class="category-chose mb-3">
            <label for="pv_quantity" class="form-label">Quantity</label>
            <Field as="select" v-model="this.data.pv_quantity" name="pv_quantity" id="pv_quantity" class="form-select form-control form-control-secondary">
              <option disabled value="">Choose Quantity</option>
              <option v-for="n in 100" :value="n">{{ n }}</option>
            </Field>
            <ErrorMessage name="pv_quantity" class="form-error-span" />
          </div>
          <div class="position-relative">
            <label for="" class="form-label">Images</label>
          </div>
          <div class="position-relative mb-3">
            <img class="me-3" v-if="this.colorImg" :src="this.colorImageUrl" alt="" style="width: 6rem; height: 6rem; object-fit: contain;   border: 1px solid #5a5d60; padding: 1rem;">
            <Field @change="getColorImg" tabindex="-1" multiple name="productVerionImage" type="file" class="form-control form-control-secondary" id="productVerionImage" accept="image/*" style="display:  none;" />
            <ErrorMessage name="productVerionImage" class="form-error-span" />
            <label for="productVerionImage" class="form-label change-image-btn">Change</label>
          </div>
        </div>
        <hr>
      </div>
      <div v-if="this.route[3] == 'version'" class="d-flex justify-content-end">
        <router-link :to="{ name: 'admin.product.add' }">
          <button class="btn btn-danger ms-auto" style="width: 76px;">Back</button>
        </router-link>
        <button type="submit" class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Submit</button>
      </div>
    </div>
  </Form>
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