<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import productService from "@/services/product.service";

export default {
  props: {
    route: { type: Array, default: [] },
    productInfo: { type: Object, default: {} }
  },
  data() {
    const FormSchema = yup.object().shape({
      pd_title: yup
        .string()
        .required("Title cannot be blank.")
        .max(255, "Title maximum 255 characters."),
      pd_desc: yup
        .string()
        .max(1024, "Descriptions maximum 1024 characters."),
      sr_id: yup
        .string()
        .required("Serie cannot be blank."),
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
    return {
      FormSchema,
      data: {},
      screenSizes: [5.4, 6.1, 6.7],
      rams: [2, 4, 6, 8, 12, 16],
      mems: [16, 32, 64, 128, 256, 512, 1024],
    }
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {

    toSlug(title) {
      if (title) {
        var slug = title.toLowerCase();

        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi, '');
        slug = slug.replace(/ /gi, "-");
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        return slug;
      }
      return null;
    },

    async submitForm() {
      this.$store.state.pddata = this.data;
      this.$store.state.slug = this.toSlug(this.data.pd_title);
      this.$emit("update:item");
    },

    setInfos() {
      if (this.productInfo.productInfo) {
        this.data._id = this.productInfo._id;
        this.data.pd_title = this.productInfo.pd_title;
        this.data.pd_desc = this.productInfo.pd_desc;

        this.data.sr_id = this.productInfo.sr_id;
        this.data.pi_screen = this.productInfo.productInfo.pi_screen;
        this.data.pi_camera = this.productInfo.productInfo.pi_camera;
        this.data.pi_ram = this.productInfo.productInfo.pi_ram;
        this.data.pi_mem = this.productInfo.productInfo.pi_mem;
        this.data.pi_battery = this.productInfo.productInfo.pi_battery;
        this.data.pi_chipset = this.productInfo.productInfo.pi_chipset;

        Object.keys(this.data).forEach(key => {
          if (this.data[key] == null) {
            this.data[key] = "";
          }
        });
      }
    }
  },
  mounted() {
    this.setInfos();
  },
  emits: ["update:item"],
}
</script>

<template>
  <Form @submit="submitForm" :validation-schema="FormSchema">
    <div class="row">
      <div v-if="!this.route[3]" class="upload-form-ctn">
        <hr>
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
          <router-link :to="{ name: 'admin.product.info' }">
            <button class="btn btn-danger ms-auto" style="width: 76px;">Back</button>
          </router-link>
          <button type="submit" class="btn btn-6bc3e7 ms-auto" style="width: 76px;">Submit</button>
        </div>
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