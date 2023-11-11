<script>
// import vue-carousel
import { defineComponent } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'
import accountService from "@/services/account.service";


export default defineComponent({
  props: {
    route: { type: Array, default: [] },
    brands: { type: Array, default: [] },
    cart: {},
  },
  components: {
    // vue-carousel components
    Carousel,
    Slide,
  },
  data: () => ({
    // carousel settings
    settings: {
      itemsToShow: 20,
      itemsToScroll: 0,
      snapAlign: 'start',
    },
    isActiveOffcanvas: false,
    isHidingOffcanvas: false,
    adminOption: ["Order.News", "Category.Brands", "Product.All"],
  }),
  computed: {
    isSignedIn() {
      if (this.$store.state.user)
        return true;
      return false;
    },

    getCartQuantity() {
      var quantity = 0;
      for (const cartInfo of this.cart.cartInfos) {
        quantity += cartInfo.ci_quantity;
      }
      this.$store.state.cartQuantity = quantity;
      return quantity;
    }
  },
  methods: {

    async signOut() {
      await accountService.logout();
      this.$store.state.user = null;
      this.$store.state.isStaff = null;
    },

    showDropDown(e) {
      $(e.target).parent().find(".dropdown-menu").addClass("show");
      $(e.target).parent().find(".dropdown-toggle").addClass("open");
    },

    closeDropDown(e) {
      $(e.target).find(".dropdown-menu").removeClass("show");
      $(e.target).find(".dropdown-toggle").removeClass("open");
    },

    showDeleteSearchBtn(e) {
      if (e.target.value != "")
        $(".clear-btn").removeAttr("style");
      else
        $(".clear-btn").attr("style", "display : none !important");
    },

    closeDeleteSearchBtn: function (e) {
      $(".navbar .search-form .search-input-container").width("230px")
      $(e.target).attr("style", "display : none !important");
    },

    showOffcanvas(e) {
      this.isActiveOffcanvas = true;
      this.isHidingOffcanvas = false;
    },

    closeOffcanvas(e) {
      this.isActiveOffcanvas = false;
      this.isHidingOffcanvas = true;
    },

    scrolled() {
      const navbar = $(".navbar");
      if (navbar.length && window.pageYOffset > 50) {
        navbar.addClass("opaque");
      }
      else {
        navbar.removeClass("opaque");
      }
    }
  },
  async mounted() {
    if (this.route[0] != 'admin' && this.route[0] != 'products')
      window.addEventListener('scroll', this.scrolled);
  },
  unmounted() {
    if (this.route[0] != 'admin' && this.route[0] != 'products')
      window.removeEventListener('scroll', this.scrolled);
  }
})
</script>

<template>
  <nav :class="{ 'opaque': this.route[0] == 'admin' || this.route[0] == 'products' || this.route[0] == 'cart' }" class="navbar navbar-expand-md fixed-top bg-e8f3ee" style="padding-left: 2rem !important; padding-right: 2rem !important;">
    <div :class="{ 'm-0': this.route[0] == 'admin', 'mx-0': this.route[0] != 'admin' }" class="container-fluid p-0">
      <button class="navbar-toggler me-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span v-on:click="showOffcanvas" class="navbar-toggler-icon"></span>
      </button>
      <router-link :to="{ name: 'landing' }">
        <a :class="{ 'ms-3': this.route[0] == 'admin' }" class="navbar-brand m-0 me-3 p-0">
          <img class="brand-logo" src="@/assets/user/images/n-tech-high-resolution-logo-transparent.png" alt="">
        </a>
      </router-link>
      <div v-if="this.route[0] != 'admin' && this.brands[0]" class="nav me-auto">
        <div class="nav-item">
          <router-link :to="{ name: `landing.brands`, params: { slug: `${this.brands[0].br_slug}` } }">
            <a class="nav-link px-0 pe-3">{{ this.brands[0].br_title }}</a>
          </router-link>
        </div>
        <div class="nav-item">

          <router-link :to="{ name: `landing.brands`, params: { slug: `${this.brands[1].br_slug}` } }">
            <a class="nav-link px-0 pe-3">{{ this.brands[1].br_title }}</a>
          </router-link>
        </div>
        <div v-on:mouseover="showDropDown" v-on:mouseleave="closeDropDown" class="link-collapse nav-item dropdown-center me-3">
          <div class="nav-link dropdown-toggle px-0" aria-expanded="true"></div>
          <div class="dropdown-menu">
            <ul class="dropdown-container bg-e8f3ee">
              <li v-for=" brand in this.brands" class="dropdown-item p-0">
                <router-link :to="{ name: `landing.brands`, params: { slug: `${brand.br_slug}` } }">
                  <a class="nav-link" aria-current="page">{{ brand.br_title }}</a>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div :class="{ show: isActiveOffcanvas, hiding: isHidingOffcanvas }" class="offcanvas offcanvas-md offcanvas-start" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style="width: 300px;">
        <div class="offcanvas-header">
          <button v-on:click="closeOffcanvas" type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body bg-e8f3ee">
          <div v-on:mouseover="showDropDown" v-on:mouseleave="closeDropDown" class="user-side link-collapse nav-item dropdown-center me-3" v-bind:style="{ backgroundImage: `url( ${'/src/assets/user/images/3.png'})` }">
            <a class="nav-link dropdown-toggle" href="#" aria-expanded="false"></a>
            <div class="dropdown-menu p-0">
              <div class="card user-panel dropdown-container" style="width: 18rem;">
                <div class="user-info p-3 m-0">
                  <div class="user-img" v-bind:style="{ backgroundImage: `url( ${'/src/assets/user/images/3.png'})` }"></div>
                  <div class="d-flex align-items-center ms-2">
                    <span v-if="!isSignedIn" class="user-name">Guest</span>
                    <span v-if="isSignedIn" class="user-name">{{ this.$store.state.user.name }}</span>
                  </div>
                </div>
                <ul class="card-body p-0 m-0">
                  <li v-if="this.$store.state.user">
                    <a class="dropdown-item nav-link p-2 px-3" href="#">
                      <div class="row">
                        <div class="col-2"><i class="fa-solid fa-user"></i></div>
                        <div class="col"><span class="">My account</span></div>
                      </div>
                    </a>
                  </li>
                  <li v-if="this.$store.state.isStaff && this.route[0] != 'admin'">
                    <router-link :to="{ name: 'admin.order.news' }">
                      <a class="dropdown-item nav-link p-2 px-3" href="#">
                        <div class="row">
                          <div class="col-2"><i class="fa-solid fa-screwdriver-wrench"></i></div>
                          <div class="col"><span class="">Admin Page</span></div>
                        </div>
                      </a>
                    </router-link>
                  </li>
                  <li v-if="this.route[0] != 'admin' && this.$store.state.user && this.cart.cartInfos">
                    <router-link :to="{ name: 'cart' }">
                      <a class="dropdown-item nav-link p-2 px-3">
                        <div class="row" style="position: relative;">
                          <div v-if="this.cart.cartInfos[0]" class="cart-item-number">{{ this.getCartQuantity }}</div>
                          <div v-if="this.cart.cartInfos" :class="{ 'text-danger': this.cart.cartInfos[0] }" class="col-2"><i class="fa-solid fa-cart-shopping"></i></div>
                          <div v-if="this.cart.cartInfos" class="col"><span>Cart</span></div>
                        </div>
                      </a>
                    </router-link>
                  </li>
                  <li>
                    <router-link v-if="!isSignedIn" :to="{ name: 'signin' }">
                      <a @click="signOut" class="dropdown-item nav-link p-2 px-3" href="#">
                        <div class="row">
                          <div class="col-2"><i class="fa-solid fa-right-from-bracket"></i></div>
                          <div v-if="!isSignedIn" class="col"><span class="">Sign In</span></div>
                        </div>
                      </a>
                    </router-link>
                    <a v-if="isSignedIn" @click="signOut" class="dropdown-item nav-link p-2 px-3" href="#">
                      <div class="row">
                        <div class="col-2"><i class="fa-solid fa-right-from-bracket"></i></div>
                        <div v-if="isSignedIn" class="col"><span class="">Log Out</span></div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="menu-user">
            <div class="user-info p-4 m-0 mb-2">
              <div class="user-img" v-bind:style="{ backgroundImage: `url( ${'/src/assets/user/images/3.png'})` }"></div>
              <div class="d-flex align-items-center ms-3">
                <span class="user-name">Guest</span>
              </div>
            </div>
            <div class="p-0 m-0">
              <div>
                <a class="nav-link p-2 px-4" href="#">
                  <div class="row">
                    <div class="col-2"><i class="fa-solid fa-user"></i></div>
                    <div class="col"><span class="">My account</span></div>
                  </div>
                </a>
              </div>
              <div v-if="this.route[0] != 'admin'">
                <a class="nav-link p-2 px-4" href="#">
                  <div class="row">
                    <div class="col-2"><i class="fa-solid fa-cart-shopping"></i></div>
                    <div class="col"><span class="">Cart</span></div>
                  </div>
                </a>
              </div>
              <div>
                <router-link :to="{ name: 'signin' }">
                  <a class="nav-link p-2 px-4" href="#">
                    <div class="row">
                      <div class="col-2"><i class="fa-solid fa-right-from-bracket"></i></div>
                      <div class="col"><span class="">Sign In</span></div>
                    </div>
                  </a>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form class="d-flex search-form" role="search">
        <div class="input-group search-input-container input-group-sm border rounded bg-e8f3ee" style="--bs-bg-opacity: 0.5">
          <input @input="showDeleteSearchBtn" class="search-input form-control bg-opacity-10" placeholder="Search your favorite!" aria-label="Search">
          <button v-on:click="closeDeleteSearchBtn" class="clear-btn btn btn-close rounded-circle" type="reset" style="display: none !important;"></button>
          <a class="btn search-icon" type="submit"><i class="fa-solid fa-magnifying-glass"></i></a>
        </div>
      </form>
      <div v-if="this.route[0] == 'admin'" class="sub-nav nav">
        <Carousel v-bind="settings">
          <Slide v-for="                    option                     in                      adminOption                     " :key="option">
            <router-link :to="{ name: `admin.${option.toLowerCase()}` }">
              <div :class="{ active: option.split('.')[0].toLowerCase() == this.route[1] }" class="carousel__item">
                <a class="nav-link" href="#">{{ option.split('.')[0] }}</a>
              </div>
            </router-link>
          </Slide>
        </Carousel>
      </div>

      <div v-if="!this.route[0] == 'admin'" class="sub-nav nav">
        <Carousel v-bind="settings">
          <Slide v-for="                     slide                      in                      3                     " :key="slide">
            <div class="carousel__item">
              <a class="nav-link" href="#">{{ slide }}</a>
            </div>
          </Slide>
        </Carousel>
      </div>

      <div v-if="isActiveOffcanvas" class="offcanvas-backdrop fade show"></div>
    </div>
  </nav>
</template>

<style scoped>
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

.content {
  max-width: 1808px;
  min-width: 300px;
  margin: auto;
}

a {
  text-decoration: none;
}

.navbar {
  transition: all 0.5s linear;
  box-shadow: #000;
  --bs-bg-opacity: 0 !important;
  box-shadow: none !important;
}

.navbar.opaque {
  --bs-bg-opacity: 1 !important;
  box-shadow: 0px 2px 20px 10px #00000014 !important;
}

.navbar .navbar-toggler {
  transition: all;
  border: none;
  padding: 0;
}

.navbar .navbar-toggler:focus {
  box-shadow: none;
}

.navbar-brand .brand-logo {
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.navbar .nav-link.active {
  color: #5fb8db !important;
  font-weight: 500 !important;
}

.navbar .nav-link {
  transition: color 0.1s linear !important;
  text-decoration: none !important;
  color: #5a5d60 !important;
}

.navbar .nav-link:hover {
  color: #5fb8db !important;
  cursor: pointer;
}

.navbar .nav .nav-item:last-child {
  display: block !important;
}

.navbar .nav .nav-item:nth-child(n+3) {
  display: none;
}

.cart-item-number {
  text-align: center;
  align-items: center;
  position: absolute;
  width: 10px;
  height: 10px;
  z-index: 100;
  color: red;
  padding: 6px;
  border-radius: 50%;
  background-color: #fff;
  font-size: 60%;
  text-align: center;
  display: flex;
  justify-content: center;
  border: 1px red solid;
  margin-left: 24px;
  top: -2px;
}

.navbar .nav .dropdown-center .dropdown-menu .dropdown-container .dropdown-item:nth-child(n-2) {
  display: none;
}

.navbar .nav .dropdown-center .dropdown-menu .dropdown-container .dropdown-item:nth-child(n+3) {
  display: block;
}

.navbar .nav .dropdown-center .dropdown-toggle {
  cursor: pointer;
}

.navbar .nav .dropdown-center .dropdown-toggle::before {
  content: "More";
  padding-right: 5px;
}

.navbar .offcanvas .menu-user {
  display: none;
}

.navbar .nav .dropdown-center .dropdown-toggle::after {
  vertical-align: 0.15em !important;
}

.navbar .dropdown-center .dropdown-menu {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 13%);
  --bs-bg-opacity: 0;
  background-color: rgba(232, 243, 238, var(--bs-bg-opacity));
  border: none;
  height: 100px;
  padding: 0;
  margin: 0;
}

.navbar .dropdown-center .dropdown-menu .dropdown-container {
  box-shadow: 0 0 7px 4px #0000001a;
  padding: 10px 0;
  border-radius: 5px;
  list-style: none;
}

.navbar .dropdown-center .dropdown-menu::after {
  z-index: 1;
  height: 12px;
  width: 12px;
  content: "";
  top: 0;
  left: 50%;
  --bs-bg-opacity: 1;
  background-color: rgba(232, 243, 238);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%) rotate(45deg);
}

.navbar .dropdown-center .dropdown-menu::before {
  height: 20%;
  width: 100%;
  content: "";
  bottom: 100%;
  display: block;
  position: absolute;
}

.navbar .dropdown-center .dropdown-menu .dropdown-item:hover {
  background-color: #fff !important;
}

.navbar .dropdown-center .dropdown-toggle.open::after {
  transition: all 0.1s linear !important;
}

.navbar .dropdown-center .dropdown-toggle.open::after {
  transform: rotate(180deg);
}

.navbar .user-side {
  width: 38px;
  height: 38px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .user-side {
  align-self: center;
}

.navbar .user-side .dropdown-toggle::after {
  display: none;
}

.navbar .user-side .dropdown-menu {
  top: 103%;
}

.navbar .user-side .dropdown-menu .user-panel {
  border: none;
  overflow: hidden;
  background-color: rgba(232, 243, 238);
}

.navbar .user-side .dropdown-menu .user-panel .user-info {
  display: flex;
  background-color: #fff;
}

.navbar .user-side .dropdown-menu .user-panel .user-info .user-name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  vertical-align: middle;
  max-width: 124px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #5a5d60;
}

.navbar .user-side .dropdown-menu .user-panel .user-info .user-img {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .user-side .dropdown-menu .user-panel .card-body {
  padding-top: 10px !important;
  list-style: none;
}

.navbar .offcanvas .offcanvas-header {
  position: absolute;
  right: 0;
}

.navbar .offcanvas .offcanvas-body {
  justify-content: flex-end;
}

.navbar .offcanvas .offcanvas-body {
  padding: 0;
}

.navbar .offcanvas .btn-close:focus {
  box-shadow: none;
}

.navbar .offcanvas .menu-user .nav-link:hover {
  background-color: #ffffff;
}

.navbar .offcanvas .menu-user .user-info {
  display: flex;
  background-color: #ffffff;
}

.navbar .offcanvas .menu-user .user-img {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .offcanvas .menu-user .user-name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  vertical-align: middle;
  max-width: 124px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #5a5d60;
}

.navbar .search-form .search-input-container {
  width: 230px;
  transition: all 0.5s;
}

.navbar .search-form .search-input-container .search-input {
  background: rgb(255 255 255 / 0%);
  border-radius: 5.5px !important;
  border: 1px solid #dee2e6;
  color: #5a5d60 !important;
  z-index: 0 !important;
  padding-right: 55px !important;
  font-size: 100% !important;
  transition: all 0.3s linear !important;
  text-overflow: ellipsis;
  overflow: hidden;
}

.navbar .search-form .search-input-container .search-input:focus {
  background: rgb(255 255 255 / 0%);
  outline: 0;
  box-shadow: none !important;
  border-color: #5fb8db;
}

.navbar .search-form .search-input-container .search-icon {
  position: absolute !important;
  padding: 5px !important;
  cursor: pointer;
  right: 1%;
  z-index: 2 !important;
  transition: color 0.3s linear !important;
}

.navbar .search-form .search-input-container .search-icon:hover {
  color: #5fb8db;
}

.navbar .search-form .search-input-container .search-icon:active {
  border: 1px solid rgb(255 255 255 / 0%) !important;
  color: #5fb8db !important;
  cursor: pointer;
  right: 1%;
  z-index: 2 !important;
}

.navbar .search-form .search-input-container .clear-btn {
  position: absolute !important;
  font-size: xx-small;
  margin: 8.5px !important;
  padding: 4px 4px;
  right: 25px;
  background-color: #0000001c;
}

.navbar .sub-nav {
  display: none !important;
  width: 92vw;
}

.navbar .sub-nav .carousel {
  height: 40px;
}

.navbar .sub-nav .carousel .carousel__viewport {
  overflow: visible !important;
}

.navbar .sub-nav .carousel .carousel__viewport .carousel__track li {
  width: auto !important;
  padding-right: 5px;
}

/* responsive <=767px */
@media only screen and (max-width: 767px) {
  .navbar .container-fluid {
    margin: 0 1rem !important;
  }

  .navbar .nav .nav-item:last-child {
    display: block !important;
  }

  .navbar .nav .nav-item:nth-child(n+0) {
    display: none;
  }

  .navbar .nav .dropdown-center .dropdown-menu .dropdown-container .dropdown-item:nth-child(n-2) {
    display: block;
  }

  .navbar .nav .dropdown-center .dropdown-toggle::before {
    content: "Browse";
    padding-right: 5px;
  }

  .navbar .offcanvas .user-side {
    display: none;
  }

  .navbar .offcanvas .menu-user {
    display: block;
  }

  .navbar .search-form {
    flex: 1;
  }

  .navbar .search-input-container {
    width: 100% !important;
  }
}

/* responsive <=575px */
@media only screen and (max-width: 575px) {

  .navbar {
    --bs-bg-opacity: 1 !important;
  }

  .navbar .container-fluid {
    margin: 0 1rem !important;
  }

  .navbar .nav .nav-item:last-child {
    display: none !important;
  }

  .navbar .search-form {
    flex: 1;
  }

  .navbar .search-input-container {
    width: 100% !important;
  }

  .navbar .sub-nav {
    display: flex !important;
  }

  .navbar .sub-nav .nav-item {
    display: block !important;
  }

  .navbar .sub-nav .nav-item:last-child {
    display: block !important;
  }

  .navbar .sub-nav .nav-item .nav-link {
    padding-top: 0;
  }

  .navbar .sub-nav .nav-item:first-child .nav-link {
    padding-left: 0;
  }
}
</style>


<style v-if="this.route[0] =='admin'" scoped>
.navbar {
  padding: 0 16px !important;
  flex-wrap: wrap !important;
  transition: all 0.5s linear;
  --bs-bg-opacity: 0 !important;
  box-shadow: none !important;
}

.navbar.opaque {
  --bs-bg-opacity: 1 !important;
  box-shadow: none !important;
}

.navbar .navbar-toggler {
  transition: all;
  border: none;
  padding: 0;
}

.navbar .navbar-toggler:focus {
  box-shadow: none;
}

.navbar-brand .brand-logo {
  height: 50px;
}

.navbar .nav-link.active {
  color: #5a5d60 !important;
  font-weight: 500 !important;
}

.navbar .nav-link {
  transition: color 0.1s linear !important;
  text-decoration: none !important;
  color: #5a5d60 !important;
}

.navbar .nav-link:hover {
  color: #5fb8db !important;
}

.navbar .offcanvas .menu-user {
  display: none;
}

.navbar .dropdown-center .dropdown-menu {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 13%);
  --bs-bg-opacity: 0;
  background-color: rgba(232, 243, 238, var(--bs-bg-opacity));
  border: none;
  height: 100px;
  padding: 0;
  margin: 0;
}

.navbar .dropdown-center .dropdown-menu .dropdown-container {
  box-shadow: 0 0 7px 4px #0000001a;
  padding: 10px 0;
  border-radius: 5px;
  list-style: none;
}

.navbar .dropdown-center .dropdown-menu::after {
  z-index: 1;
  height: 12px;
  width: 12px;
  content: "";
  top: 0;
  left: 50%;
  --bs-bg-opacity: 1;
  background-color: rgba(232, 243, 238);
  display: block;
  position: absolute;
  transform: translate(-50%, -50%) rotate(45deg);
}

.navbar .dropdown-center .dropdown-menu::before {
  height: 20%;
  width: 100%;
  content: "";
  bottom: 100%;
  display: block;
  position: absolute;
}

.navbar .dropdown-center .dropdown-menu .dropdown-item:hover {
  background-color: #fff !important;
}

.navbar .dropdown-center .dropdown-toggle.open::after {
  transition: all 0.1s linear !important;
}

.navbar .dropdown-center .dropdown-toggle.open::after {
  transform: rotate(180deg);
}

.navbar .user-side {
  width: 38px;
  height: 38px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .user-side {
  align-self: center;
}

.navbar .user-side .dropdown-toggle::after {
  display: none;
}

.navbar .user-side .dropdown-menu {
  top: 103%;
}

.navbar .user-side .dropdown-menu .user-panel {
  border: none;
  overflow: hidden;
  background-color: rgba(232, 243, 238);
}

.navbar .user-side .dropdown-menu .user-panel .user-info {
  display: flex;
  background-color: #fff;
}

.navbar .user-side .dropdown-menu .user-panel .user-info .user-name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  vertical-align: middle;
  max-width: 124px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #5a5d60;
}

.navbar .user-side .dropdown-menu .user-panel .user-info .user-img {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .user-side .dropdown-menu .user-panel .card-body {
  padding-top: 10px !important;
  list-style: none;
}

.navbar .offcanvas .offcanvas-header {
  position: absolute;
  right: 0;
}

.navbar .offcanvas .offcanvas-body {
  justify-content: flex-end;
}

.navbar .offcanvas .offcanvas-body {
  padding: 0;
}

.navbar .offcanvas .btn-close:focus {
  box-shadow: none;
}

.navbar .offcanvas .menu-user .nav-link:hover {
  background-color: #ffffff;
}

.navbar .offcanvas .menu-user .user-info {
  display: flex;
  background-color: #ffffff;
}

.navbar .offcanvas .menu-user .user-img {
  width: 50px;
  height: 50px;
  padding: 1px;
  border: 1px solid lavender;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
}

.navbar .offcanvas .menu-user .user-name {
  font-size: 16px;
  font-weight: bold;
  line-height: 18px;
  vertical-align: middle;
  max-width: 124px;
  text-overflow: ellipsis;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  color: #5a5d60;
}

.navbar .sub-nav {
  width: 100%;
  margin: 0;
  display: flex !important;
}

.navbar .sub-nav .carousel__item.active {
  background-color: #fff;
}

.navbar .sub-nav .carousel__item:hover {
  background-color: #fff;
}

.navbar .sub-nav .nav-item {
  display: block !important;
}

.navbar .sub-nav .nav-item .nav-link {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.navbar .sub-nav .nav-item .nav-link.active {
  background: #ffffff;
  color: #5fb8db !important;
}

.navbar .sub-nav .nav-item .nav-link:hover {
  background: #ffffff;
}
</style>