<script>
// import vue-carousel

import { defineComponent, reactive, ref } from 'vue'
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default defineComponent({
  setup() {
    const myCarousel = ref([]);
    return {
      myCarousel
    }
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
        itemsToShow: 3,
      },
      575: {
        itemsToShow: 4,
      },
      767: {
        itemsToShow: 5,
      },
      992: {
        itemsToShow: 6
      },
      1399: {
        itemsToShow: 7
      },
      1600: {
        itemsToShow: 8
      }
    },

    obj: null,
    h: null,
    w: null,
    isActive: false,
    styleObj: null,
    selectedMovie: null,

    movies: [1,2,3,4,5],
      kinds: [1,2,3,4,5]
  }),
  methods: {
    activeAnimeInfoPopup(e) {
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
    unActiveAnimeInfoPopup() {
      this.obj = null;
      this.h = null;
      this.w = null;
      this.isActive = false;
      this.styleObj = null;
    },
    calcCartSize() {
      if (this.myCarousel[0]) {
        $(".row-sliders-container .row-slider .carousel__item").width(($(".row-sliders-container .row-slider .carousel__track").width() / this.myCarousel[0].data.config.itemsToShow) - 15)
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
    <div v-for="kind in this.kinds" class="row-slider mb-2">
      <h2 class="title m-0 mb-2">Serie</h2>
      <Carousel @vue:updated="calcCartSize" ref="myCarousel" v-bind="settings" :breakpoints="breakpoints">
        <Slide v-for="slide in 20" :key="slide">
          <div class="carousel__item">
            <a v-bind:slug="slide" class="card" target='_blank' href="#">
              <img @mouseenter="activeAnimeInfoPopup" :src="`http://localhost:3000/public/uploads/2023-11-08T11:23:05.621Ziphone_15_128gb_-_1_1.webp`" class="card-img-top" alt="...">
              <div class="name-container p-1">
                <p class="card-text">1099</p>
              </div>
            </a>
          </div>
        </Slide>
        <template #addons>
          <Navigation />
        </template>
      </Carousel>
    </div>
  </div>
  <a v-if="isActive" @mouseleave="unActiveAnimeInfoPopup" class="anime-info-popup card" href="#" target="_blank" :style="styleObj">
    <img :src="`http://localhost:3000/public/uploads/2023-11-08T11:23:05.621Ziphone_15_128gb_-_1_1.webp`" class=" card-img-top" alt="...">
    <div class='info-container card-body'>
      <div class='info-name text-start'>{{ }}</div>
      <div class='d-flex text-black mb-1'>
        <div class='info-item-score'><i class='fa-solid fa-star'></i> 5.0</div>
        <div class='info-item-year'>{{ }}</div>
        <div class='info-item-update'>{{ }} Episode</div>
      </div>
      <div class='d-flex info-category mb-1'>
        <div v-for="slide in 3" class='info-item-category me-1 px-1'>{{ slide }}</div>
      </div>
      <div class='info-item-description text-black'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim ratione et neque quae, eaque voluptatem qui suscipit sit ab. Voluptas, reprehenderit. Possimus tenetur nam labore ipsa, sequi dolorem tempora iste..</div>
    </div>
  </a>
</template>

<style scoped>
.row-sliders-container {
  margin-top: -14% !important;
  position: relative;
  z-index: 4;
}

.row-sliders-container .row-slider {
  padding-left: 38px;
  padding-right: 38px;
}

.row-sliders-container .row-slider .title {
  padding-left: 10px;
  padding-right: 10px;
  color: #5a5d60;
  text-shadow: 0 0 10px #fff;
}

.row-sliders-container .row-slider .carousel .carousel__prev {
  right: 99% !important;
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

.row-sliders-container .row-slider .carousel .carousel__next {
  left: 99% !important;
  font-weight: 900 !important;
  font-family: "Font Awesome 6 Free";
  color: #33a0cb !important;
  font-size: xx-large !important;
  width: 40px;
  z-index: 3;
  transform: translateY(-100%) !important;
  opacity: 0.5;
}

.row-sliders-container .row-slider .carousel .carousel__next:hover {
  opacity: 1 !important;
}

.row-sliders-container .row-slider .carousel .carousel__viewport {
  padding-top: 2%;
  padding-bottom: 2%;
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
  object-fit: fill;
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
}

.anime-info-popup {
  transition: all 0.3s ease-in;
  background-color: #ffffff;
  color: #8d989a !important;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  overflow: hidden;
}

.anime-info-popup:hover {
  transform: scale(1.3);
  box-shadow: 0 0 20px 5px #0000001a;
}

.anime-info-popup .info-container {
  padding: 5px !important;
}

.anime-info-popup .info-name {
  font-size: small !important;
  color: #5a5d60;
  font-weight: 500 !important;
}

.anime-info-popup .info-name:hover {
  color: #33a0cb !important;
}

.anime-info-popup .info-container div {
  color: #5a5d60 !important;
  font-weight: 300;
  font-size: xx-small;
}

.anime-info-popup .info-container .info-item-description {
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

.anime-info-popup .info-container .info-category {
  text-overflow: ellipsis;
}

.anime-info-popup .info-container .info-item-category {
  background-color: #a3e5ff7c;
  border-radius: 4px;
}

.anime-info-popup .info-container .info-item-score {
  color: #33a0cb !important;
}

.anime-info-popup .info-container .info-item-year::before,
.anime-info-popup .info-container .info-item-update::before {
  display: inline-block;
  content: "";
  margin: 0px 4px;
  height: 0.45rem !important;
  width: 1px !important;
  background: #387c96;
}

/* responsive <=992px */
@media only screen and (max-width: 992px) {
  .anime-info-popup .info-container .info-item-description {
    -webkit-line-clamp: 4;
    line-height: 15px;
    height: 60px;
  }

  .anime-info-popup .info-container {
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