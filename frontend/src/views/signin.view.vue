<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import accountService from "@/services/account.service";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const loginFormSchema = yup.object().shape({
      email: yup
        .string()
        .required("Email cannot be blank.")
        .email("Invalid email.")
        .max(255, "Email maximum 255 characters."),
      password: yup
        .string()
        .required("Password cannot be blank.")
        .max(255, "Password maximum 255 characters.")
        .min(8, "Password at least 8 characters."),
    });
    return {
      loginFormSchema,
      credential: {},
      invalid_credential: false,
    }
  },
  methods: {
    async submitLogin() {
      var data = this.credential;
      try {
        var user = await accountService.login(data);
        var isStaff = await accountService.verifyPermission();

        if (isStaff) {
          this.$router.push({ name: "admin.order.news" });
        }
        else if (user) {
          this.$router.push({ name: "landing" });
        }
        else {
          this.invalid_credential = true;
        }
      } catch (error) {
      }
    },
  },
}
</script>

<template>
  <div class="container-fluid">
    <div class="row justify-content-end">

      <div class="signin-container-left col p-3" :style="{ backgroundImage: `url( ${'/src/assets/images/gradienta-faXXUrNbH1c-unsplash.jpg'} )` }">
        <div id="carousel" class="carousel carousel-fade position-relative translate-middle-y top-50" data-bs-ride="carousel">
          <h2 class="text-secondary text-center mb-3">Wellcome !!</h2>
          <h3 class="text-secondary text-center mb-3">Sign in to your account</h3>
          <div class="carousel-inner rounded">
            <div class="carousel-item active" data-bs-interval="10000">
              <img src="@/assets/images/smartphone-with-pumpkin-screen.jpg" class="d-block w-100" alt="...">
              <div class="carousel-caption carousel-caption-secondary d-none d-md-block">
                <h4>The best place to buy Phone.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="signin-container-right col-lg-4 col-12 bg-success bg-opacity-10 p-5 pt-0">
        <div class="container">
          <router-link :to="{ name: 'landing' }">
            <div class="row justify-content-center mb-3 mt-2">
              <img class="logo" src="@/assets/images/logo-with-brand.png" alt="">
            </div>
          </router-link>
          <div class="row mb-1">
            <Form @submit="submitLogin" :validation-schema="loginFormSchema">
              <div class="position-relative mb-3">
                <label for="email" class="form-label form-float-label">Email</label>
                <Field v-model="this.credential.email" name="email" type="email" class="form-control form-control-secondary" id="email" aria-describedby="emailHelp" />
                <ErrorMessage name="email" class="form-error-span" />
                <span v-if="invalid_credential" name="email" class="form-error-span">Invalid credential</span>
              </div>
              <div class="position-relative mb-0">
                <label for="password" class="form-label form-float-label">Password</label>
                <Field v-model="this.credential.password" name="password" type="password" class="form-control form-control-secondary" id="password" />
              </div>
              <ErrorMessage name="password" class=" form-error-span" />
              <div class="mb-2 text-end">
                <a href="" class="link-5a5d60 text-decoration-none fs-sml fw-semibold">Forgot password?</a>
              </div>
              <div class="d-grid">
                <button type="submit" class="btn btn-6bc3e7">Sign In</button>
              </div>
            </Form>
          </div>
          <div class="row">
            <div class="d-flex justify-content-center mb-2">
              <p class="fs-sm m-0 me-1">New here? </p>
              <router-link :to="{ name: 'register' }">
                <div class="link-5a5d60 text-decoration-none fs-sml fw-semibold">Sign up</div>
              </router-link>
            </div>
            <div>
              <p class="fw-semibold text-center">or sign in with</p>
            </div>
            <div class="d-grid mb-3">
              <a class="btn btn-primary" role="button"><i class="fa-brands fa-facebook-f pe-auto"></i> Facebook</a>
            </div>
            <div class="d-grid mb-3">
              <a class="btn btn-danger" role="button"><i class="fa-brands fa-google"></i> Google</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
}

/* responsive screen */
@media only screen and (max-width: 575px) {
  .signin-container-right>.container {
    width: 300px !important;
    padding: 0;
  }
}

@media only screen and (min-width: 576px) and (max-width: 991px) {
  .signin-container-right>.container {
    width: 450px !important;
  }
}

@media only screen and (max-width: 991px) {
  body {
    min-width: 300px;
  }

  .signin-container-right {
    transition: all 0.25s ease-in;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .signin-container-left {
    display: none;
  }
}

.carousel-caption-secondary {
  padding: 30px;
  padding-bottom: 5px;
  text-align: center;
  background: transparent;
  background-image: linear-gradient(transparent, rgba(0, 0, 0, .1), rgba(0, 0, 0, .3), rgba(0, 0, 0, .5));
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}

.btn {
  padding: var(--bs-btn-padding-y) var(--bs-btn-padding-x);
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

.link-5a5d60 {
  color: #5a5d60 !important;
}

.link-5a5d60:hover {
  color: #0a58ca !important;
  text-decoration: underline !important;
}

.fs-sml {
  font-size: smaller;
}

.fs-sm {
  font-size: small !important;
}

.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: var(--bs-body-color);
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: var(--bs-body-bg);
  background-clip: padding-box;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.form-control-secondary {
  background: #e8f3ee !important;
  border: 1px solid #5a5d60;
  color: #5a5d60 !important;
}

.form-control-secondary:focus {
  background-color: #e8f3ee;
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}

.form-float-label {
  background: #e8f3ee !important;
  left: 1rem;
  top: -0.85rem;
  position: absolute;
  padding: 0 0.5rem;
  font-size: smaller;
  color: #5a5d60;
}

.logo {
  width: 250px;
}

.signin-container-right {
  min-height: 100vh;
  box-shadow: 3px 0 28px rgb(116 116 116 / 50%);
}

.signin-container-left {
  background-position: center;
  background-size: cover;
}

.form-error-span {
  color: red;
  font-size: 12px !important;
}
</style>