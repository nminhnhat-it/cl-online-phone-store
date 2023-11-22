<script>
// import vue-carousel

import { defineComponent, reactive, ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default defineComponent({
  setup() {
    const product__slider = ref([]);
    return {
      product__slider
    }
  },
  props: {
    series: { type: Array, default: [] },
    products: { type: Array, default: [] },
  },
  components: {
    // vue-carousel components
    Carousel,
    Slide,
    Navigation,
  },
  data: () => ({
    // carousel settings
    settings: {
      snapAlign: 'start',
    },
    breakpoints: {
      0: {
        itemsToShow: 2,
      },
      575: {
        itemsToShow: 3,
      },
      767: {
        itemsToShow: 4,
      },
      992: {
        itemsToShow: 5
      },
      1399: {
        itemsToShow: 6
      },
      1600: {
        itemsToShow: 7
      }
    },

    obj: null,
    h: null,
    w: null,
    isActive: false,
    styleObj: null,
    popupProduct: null,
  }),
  methods: {

    getProductsOfSerie(serie) {
      var products = this.products.filter(product => product.serie._id == serie._id);
      return products
    },

    getPopupProduct(slug) {
      var product = this.products.filter(product => product.pd_slug == slug);
      return product[0];
    },

    activeProductPopup(e) {
      this.popupProduct = this.getPopupProduct($(e.target).parent().attr("slug"));
      if ($(window).width() >= 768)
        this.isActive = true;

      this.obj = $(e.target).offset();
      this.h = $(e.target).height();
      this.w = $(e.target).width();

      this.styleObj = reactive({
        position: "absolute",
        top: this.obj.top + "px",
        left: this.obj.left + "px",
        "z-index": "100",
        height: this.h + "px",
        width: this.w + "px",
      })
    },

    unActiveProductPopup() {
      this.obj = null;
      this.h = null;
      this.w = null;
      this.isActive = false;
      this.styleObj = null;
      this.popupProduct = null;
    },

    calcCartSize() {
      if (this.product__slider[0]) {
        $(".row-sliders-container .row-slider .carousel__item").width(($(".row-sliders-container .row-slider .carousel__track").width() / this.product__slider[0].data.config.itemsToShow) - 15)
        $(".row-sliders-container .row-slider .carousel__item .card-img-top").height(1.5 * $(".row-sliders-container .row-slider .carousel__item").width())
      }
    },
  },
  mounted() {
    this.calcCartSize()
  }
});
</script>

<template>
  <div class="row-sliders-container m-0">
    <div v-for="serie in this.series" class="row-slider mb-2 pt-2">
      <h2 class="title m-0 mb-2">{{ serie.sr_title }}</h2>
      <Carousel @vue:updated="calcCartSize" ref="product__slider" v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="(product, key) in getProductsOfSerie(serie).filter(product => product.productVersions.length != 0 && product.productImages.length)" :key="key">
          <div class="carousel__item">
            <router-link :to="{ name: 'products', params: { slug: product.pd_slug } }">
              <div v-bind:slug="product.pd_slug" class="card" target='_blank'>
                <img @mouseenter="activeProductPopup" :src="this.$store.state.apiUrl + product.productVersions[0].pv_img" class="card-img-top" alt="...">
                <div class="name-container p-1">
                  <p class="card-text m-0">{{ product.pd_title }}</p>
                  <p class="card-text text-danger" style="text-align: left;">${{ Number(product.pd_minPrice).toLocaleString() }}</p>
                </div>
              </div>
            </router-link>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>

  <router-link v-if="isActive" :to="{ name: 'products', params: { slug: this.popupProduct.pd_slug } }">
    <a @mouseleave="unActiveProductPopup" class="product-info-popup card" href="#" target="_blank" :style="styleObj">
      <img :src="$store.state.apiUrl + popupProduct.productImages[0].im_path" class=" card-img-top" alt="...">
      <div class='info-container card-body'>
        <div class='info-name text-start mb-1'>{{ popupProduct.pd_title }}</div>
        <div class='d-flex info-popup-product mb-2'>
          <div class='info-item-popup me-1 px-1'>{{ popupProduct.productInfo.pi_screen }} inches</div>
          <div class='info-item-popup me-1 px-1'>{{ popupProduct.productInfo.pi_ram }} GB</div>
          <div class='info-item-popup me-1 px-1'>{{ popupProduct.productInfo.pi_mem }} GB</div>
        </div>
        <div class='d-flex text-black mb-1'><span class="me-1">Prices:</span> <span class="text-danger">${{ popupProduct.pd_minPrice.toLocaleString() }}</span></div>
        <div class='info-item-description text-black'>{{ popupProduct.pd_desc }}.</div>
      </div>
    </a>
  </router-link>
</template>

<style>
.row-sliders-container .row-slider .carousel .carousel__viewport {
  padding-top: 10px;
  padding-bottom: 30px;
}

.row-sliders-container .row-slider .carousel .carousel__next {
  left: 100.5% !important;
  font-weight: 900 !important;
  font-family: "Font Awesome 6 Free";
  color: #33a0cb !important;
  font-size: xx-large !important;
  width: 40px;
  z-index: 3;
  transform: translateY(-100%) !important;
  opacity: 0.5;
}

.row-sliders-container .row-slider .carousel .carousel__prev {
  right: 100.5% !important;
  left: unset !important;
  font-weight: 900 !important;
  font-family: "Font Awesome 6 Free";
  color: #33a0cb !important;
  font-size: xx-large !important;
  width: 40px;
  z-index: 3;
  transform: translateY(-100%) !important;
  opacity: 0.5;
}

.row-sliders-container .row-slider .carousel .carousel__prev:hover {
  opacity: 1 !important;
}

.row-sliders-container .row-slider .carousel .carousel__next:hover {
  opacity: 1 !important;
}
</style>

<style scoped>
.row-sliders-container {
  margin-top: -14% !important;
  position: relative;
  z-index: 4;
}

.row-sliders-container .row-slider {
  padding-left: 18px;
  padding-right: 18px;
  margin: 48px;
  background-color: #e8f3ee;
  border-radius: 5px;
}

.row-sliders-container .row-slider .title {
  padding-left: 10px;
  padding-right: 10px;
  color: #5a5d60;
  text-shadow: 0 0 10px #fff;
}

.row-sliders-container .row-slider .carousel .carousel__viewport {
  padding-bottom: 20px;
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide {
  padding-bottom: 2%;
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .name-container {
  position: absolute;
  top: 100%
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .carousel__item .card {
  border: none !important;
  transition: all 500ms linear;
  text-decoration: none;
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .carousel__item .card .card-img-top {
  height: 280px;
  box-shadow: 0 0 7px 4px #0000001a;
  border-radius: 5px;
  object-fit: contain;
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .carousel__item .card .card-text:hover {
  color: #33a0cb !important;
}

.row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .carousel__item .card .card-text {
  color: #5a5d60;
  font-weight: 500;
  font-size: 14px;
  -webkit-line-clamp: 2;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: left;
}

.product-info-popup {
  transition: all 0.3s ease-in;
  background-color: #ffffff;
  color: #8d989a !important;
  border-radius: 4px;
  text-align: left;
  text-decoration: none;
  overflow: hidden;
}

.product-info-popup:hover {
  transform: scale(1.3);
  box-shadow: 0 0 20px 5px #0000001a;
}

.product-info-popup .info-container {
  padding: 5px !important;
}

.product-info-popup .info-name {
  font-size: small !important;
  color: #5a5d60;
  font-weight: 600 !important;
}

.product-info-popup .info-name:hover {
  color: #33a0cb !important;
}

.product-info-popup .info-container div {
  color: #5a5d60 !important;
  font-weight: 300;
  font-size: xx-small;
}

.product-info-popup .info-container .info-item-description {
  width: 100%;
  text-align: start;
  -webkit-line-clamp: 5;
  line-height: 16px;
  text-overflow: ellipsis;
  height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.product-info-popup .info-container .info-popup-product {
  text-overflow: ellipsis;
}

.product-info-popup .info-container .info-item-popup {
  background-color: #a3e5ff7c;
  border-radius: 3px;
}

/* responsive <=992px */
@media only screen and (max-width: 992px) {
  .product-info-popup .info-container .info-item-description {
    -webkit-line-clamp: 4;
    line-height: 15px;
    height: 60px;
  }

  .product-info-popup .info-container {
    color: #5a5d60 !important;
    font-weight: 100;
    font-size: 1px;
  }
}

/* responsive <=767px */
@media only screen and (max-width: 767px) {
  .row-sliders-container .row-slider {
    padding-left: 12px;
    padding-right: 12px;
  }

  .row-sliders-container .row-slider .title {
    padding-left: 5px;
    padding-right: 5px;
  }

  .row-sliders-container .row-slider .carousel .carousel__viewport .carousel__slide .carousel__item .card:hover {
    transform: scale(1.035);
  }
}

/* responsive <=575px */
@media only screen and (max-width: 575px) {

  .row-sliders-container {
    margin-top: 1rem !important;
  }
}
</style>