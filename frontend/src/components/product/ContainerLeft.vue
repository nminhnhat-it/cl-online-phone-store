<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default defineComponent({
  props: {
    product: { type: Object, default: {} }
  },
  components: {
    Carousel,
    Slide,
  },
  methods: {

    getKey(key) {
      this.index = key
    },

    setSelectedVersion(id) {
      $(" .image-carousel .carousel-indicators .carousel__item").removeClass("active");
      $(` .image-carousel .carousel-indicators .carousel__item.${id}`).addClass("active");
      $(` .image-carousel .carousel-item`).removeClass("active");
      $(` .image-carousel .carousel-item.${id}`).addClass("active");

      var versions = this.product.productVersions.filter(version => version._id == id)
      this.seletedVersion = versions[0];
    },

    chooseColor(e) {
      $(".product-color-container .box-item").removeClass("active");
      $(e.currentTarget).addClass("active");
      var cls = $(e.currentTarget).attr("cls");
      this.setSelectedVersion(cls);
    },

    activeImage(e) {
      $(".image-carousel .carousel-indicators .carousel__item").removeClass("active");
      $(e.currentTarget).parent().addClass("active")
    },

    changeActive() {
      var cls = $(".image-carousel .carousel-item.active").attr("cls")
      $(".image-carousel .carousel-indicators .carousel__item").removeClass("active");
      $(`.image-carousel .carousel-indicators .carousel__item.${cls}`).addClass("active")
      this.setSelectedVersion(cls)
    }
  },
  data: () => ({
    index: null,
    seletedVersion: null,
  }),
})
</script>

<template>
  <div class="col col-8 mb-3">
    <div class="product-name"><span>{{ this.product.pd_title }}</span></div>
    <div id="image-carousel" class="carousel carousel-fade image-carousel">
      <div class="carousel-inner mb-3">
        <div :cls="image._id" v-for="( image, key ) in  product.productImages " :class="{ active: key == 0 }, image._id" class="carousel-item" :getKey="this.getKey(key)">
          <img :src="$store.state.apiUrl + image.im_path" class="d-block w-100 product-image" alt="...">
        </div>
        <div v-for="( version, key2 ) in  product.productVersions" :cls="version._id" :class="version._id" class="carousel-item ">
          <img :src="$store.state.apiUrl + version.pv_img" class="d-block w-100 product-image" alt="...">
        </div>
      </div>
      <div class="carousel-indicators">
        <Carousel id="thumbnails" :wrap-around="true" :items-to-show="9" ref="carousel" style="width: 100%;">
          <Slide v-for="(image, key) in product.productImages" :key="key">
            <div class="carousel__item" :class="{ active: key == 0 }, image._id">
              <button @click="activeImage" type="button" data-bs-target="#image-carousel" :data-bs-slide-to="key" aria-label="Slide {{ key+1 }}" :getKey="this.getKey(key)">
                <img :src="$store.state.apiUrl + image.im_path" class="d-block w-100 indicators-image" alt="...">
              </button>
            </div>
          </Slide>
          <Slide v-for="( version, key2 ) in  product.productVersions" :key="key2">
            <div class="carousel__item" :class="version._id">
              <button @click="activeImage" type="button" data-bs-target="#image-carousel" :data-bs-slide-to="key2 + this.index + 1" aria-label="Slide {{ key+1this.index + this.index + 2 }}">
                <img :src="$store.state.apiUrl + version.pv_img" class="d-block w-100 indicators-image" alt="...">
              </button>
            </div>
          </Slide>
        </Carousel>
      </div>
      <button @click="changeActive" class="carousel-control-prev" type="button" data-bs-target="#image-carousel" data-bs-slide="prev">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button @click="changeActive" class="carousel-control-next" type="button" data-bs-target="#image-carousel" data-bs-slide="next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
    <div class="product-desc"><span>{{ product.pd_desc }}</span></div>
  </div>
</template>

<style>
.image-carousel .carousel-indicators .carousel__viewport {
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #fff !important;
  border-radius: 5px;
}
</style>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

a {
  text-decoration: none;
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

.product-name {
  padding-left: 1rem;
  padding-right: 1rem;
  color: #5a5d60;
  font-size: xx-large;
}

.image-carousel {
  margin: 1rem;
  height: 41rem !important;
}

.image-carousel .carousel-inner {
  border-radius: 5px;
  background-color: #fff;
}

.image-carousel .carousel-indicators {
  position: relative !important;
}

.image-carousel .carousel-indicators .carousel__item {
  border: solid 1px #5a5d60;
  border-radius: 5px;
  height: 5rem;
  width: 5rem;
  display: grid;
  align-items: center;
  justify-content: center;
}

.image-carousel .carousel-control-prev {
  border-radius: 0 5px 5px 0;
}

.image-carousel .carousel-control-next {
  border-radius: 5px 0 0 5px;
}

.image-carousel .carousel-control-prev:hover {
  transition: all 0.5s linear !important;
  background-color: #33a0cb !important;
  color: #fff;
}

.image-carousel .carousel-control-next:hover {
  transition: all 0.5s linear !important;
  background-color: #33a0cb !important;
  color: #fff;
}

.image-carousel .carousel-control-prev,
.image-carousel .carousel-control-next {
  border: none;
  opacity: 1;
  height: 4rem;
  width: 4rem;
  color: #20a9e4;
  position: absolute;
  height: 50px;
  background-color: #e8f3ee;
  top: 38%;
  width: 45px;
}

.image-carousel .carousel-indicators .carousel__item button {
  border: none;
  border-radius: 5px;
  opacity: 1;
  margin: 0.2rem;
  height: 4rem;
  width: 4rem;
}

.image-carousel .carousel-indicators .carousel__item.active {
  border-color: #ddddf5;
  outline: 0;
  box-shadow: 0 0 0 0.15rem rgb(107 195 231);
}

.image-carousel .carousel-indicators .carousel__item button .indicators-image {
  object-fit: cover;
  height: 100%;
}

.image-carousel .carousel-item {
  height: 35rem !important;
}

.image-carousel .carousel-item .product-image {
  height: 35rem !important;
  padding: 3rem;
  object-fit: contain;
  border-radius: 5px;
}

.product-desc {
  border-radius: 5px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1rem;
  color: #5a5d60;
  background-color: #fff;
  margin-top: 32px;
}
</style>