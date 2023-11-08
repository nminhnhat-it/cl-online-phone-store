<script>
export default {
  data() {
    return {
      focusProduct: [
        1, 2, 3, 4
      ],
    }
  },
  methods: {
    focusWrapperChange(e) {
      var focusWrapper = $(e.target);

      if (focusWrapper.hasClass("carousel-item-next")) {
        var direction = "left";
        var from = $(".active.carousel-item-start");
        var to = focusWrapper;
      }

      if (focusWrapper.hasClass("carousel-item-prev")) {
        var direction = "right";
        var from = $(".active.carousel-item-end");
        var to = focusWrapper;
      }

      from = from.find(".focus-img-character");
      to = to.find(".focus-img-character");

      var fromBgCss = from.css("background-image");
      var toBgCss = to.css("background-image");

      if (direction == "left") {
        to.attr("style", "animation: slide-right-in ; ; background-image: " + toBgCss);
        from.attr("style", "animation: slide-right-out ; background-image: " + fromBgCss);
      }
      else {
        to.attr("style", "animation: slide-left-in ; background-image: " + toBgCss);
        from.attr("style", "animation: slide-left-out ; background-image: " + fromBgCss);
      }
    },
  },
}
</script>

<template>
  <div class="focus-wrapper m-0 p-0">
    <div id="focus-carousel" class="carousel slide carousel-fade" data-bs-ride="true" data-bs-interval="6000">
      <div class="carousel-indicators px-5 mx-0">
        <button v-for="(slide, key) in this.focusProduct" :class="{ active: !key }" class="mx-0 ms-1" type="button" data-bs-target="#focus-carousel" :data-bs-slide-to="key" :aria-current="`${!key}`" :aria-label="`Slide ${key}`"></button>
      </div>
      <div class="carousel-inner">
        <a v-for="(slide, key) in this.focusProduct" v-on:transitionstart="focusWrapperChange" :class="{ active: key == 0 }" class="focus-item carousel-item">
          <a class="focus-img-link" target='_blank'></a>
          <div class="vertical-layer"></div>
          <div class="horizontal-layer"></div>
          <img :src="`http://localhost:3000/public/uploads/2023-11-08T05:38:19.923Zvn_iphone_15_black_pdp_image_position-1a_black_color_1_4.webp`" class="d-block focus-img" alt="...">
          <div class="focus-img-character" :style="{ backgroundImage: `url(http://localhost:3000/public/uploads/2023-11-08T05:38:19.923Zvn_iphone_15_black_pdp_image_position-1a_black_color_1_4.webp)` }"></div>
          <div class="focus-decs-wrapper">
            <div class="focus-item-name" :style="{ backgroundImage: `url(http://localhost:3000/public/uploads/2023-11-08T11:23:05.621Ziphone_15_128gb_-_1_1.webp)` }"></div>
            <div class="focus-item-desc text-black">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius animi neque molestias delectus, magnam quas unde ab vel in blanditiis ipsa, eos veritatis excepturi nemo iste ut autem praesentium accusamus.</div>
          </div>
        </a>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#focus-carousel" data-bs-slide="prev">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#focus-carousel" data-bs-slide="next">
        <i class="fa-solid fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<style>
@keyframes slide-right-in {
  0% {
    left: 120%;
  }

  100% {
    left: 70%;
  }
}

@keyframes slide-left-in {
  0% {
    left: -10%;
  }

  100% {
    left: 70%;
  }
}

@keyframes slide-left-out {
  0% {
    left: 70%;
  }

  100% {
    left: 120%;
  }
}

@keyframes slide-right-out {
  0% {
    left: 70%;
  }

  100% {
    left: -10%;
  }
}
</style>

<style scoped>
.focus-wrapper .focus-img {
  border-top: none !important;
  border: 1px solid #ffffff;
  width: 100%;
  height: 50rem;
  object-fit: cover;
}

.focus-wrapper>div {
  position: relative;
}

.focus-wrapper #focus-carousel .carousel-inner .vertical-layer {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 0), rgba(255, 255, 255, 1.2));
}

.focus-wrapper #focus-carousel .carousel-inner .horizontal-layer {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1));
}

.focus-wrapper #focus-carousel .carousel-control-prev,
.focus-wrapper #focus-carousel .carousel-control-next {
  color: #33a0cb !important;
  font-size: xx-large;
  width: 40px;
  z-index: 3;
  bottom: auto !important;
  top: 35% !important;
}

.focus-wrapper #focus-carousel .carousel-inner {
  padding: 0;
}

.focus-wrapper #focus-carousel .carousel-indicators {
  top: 70% !important;
  justify-content: right !important;
  z-index: 3 !important;
}

.focus-wrapper #focus-carousel .carousel-indicators button {
  transition: all 0.5s linear !important;
  background-color: #33a0cb !important;
  width: 10px;
  height: 7px;
}

.focus-wrapper #focus-carousel .carousel-indicators>.active {
  width: 18px;
}

.focus-wrapper #focus-carousel .focus-item.active {
  z-index: 0 !important;
}

.focus-wrapper #focus-carousel .focus-img-character {
  position: absolute !important;
  z-index: 2 !important;
  top: 40% !important;
  left: 70%;
  transform: translate(-50%, -50%) !important;
  animation-duration: 1.5s !important;
  animation-timing-function: ease !important;
  background-size: contain;
  width: 45vw;
  min-width: 260px;
  max-width: 500px;
  height: 40vw;
  max-height: 350px;
  min-height: 260px;
  background-position: center center;
  background-repeat: no-repeat;
}

.focus-wrapper .focus-img-link {
  cursor: pointer;
  z-index: 3;
  position: absolute;
  width: 50%;
  height: 100%;
  text-decoration: none;
}

.focus-wrapper .focus-decs-wrapper {
  position: absolute !important;
  z-index: 2 !important;
  top: 45% !important;
  transform: translate(0%, -50%) !important;
  width: 100%;
  padding-left: 48px;
  padding-right: 48px;
}

.focus-wrapper .focus-decs-wrapper .focus-item-name {
  background-size: contain;
  width: 20.5vw;
  min-width: 180px;
  max-width: 360px;
  height: 13.67vw;
  max-height: 240px;
  min-height: 120px;
  background-position: left bottom;
  background-repeat: no-repeat;
}

.focus-wrapper .focus-decs-wrapper div {
  color: #5a5d60 !important;
  text-shadow: 0 0 10px #fff;
  font-weight: 600;
}

.focus-wrapper .focus-decs-wrapper .focus-item-desc {
  width: 60%;
  -webkit-line-clamp: 2;
  line-height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  text-align: left !important;
}

.focus-wrapper .focus-decs-wrapper .focus-item-score {
  color: #33a0cb !important;
}

.focus-wrapper .focus-decs-wrapper .focus-item-year::before,
.focus-wrapper .focus-decs-wrapper .focus-item-update::before {
  display: inline-block;
  content: "";
  margin: 0px 6px;
  height: 0.72rem !important;
  width: 2px !important;
  background: #387c96;
}

.focus-wrapper .focus-decs-wrapper .focus-item-desc {
  font-size: 14px !important;
}

/* responsive <=767px */
@media only screen and (max-width: 767px) {
  .focus-wrapper .focus-decs-wrapper {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .focus-wrapper #focus-carousel .carousel-control-prev,
  .focus-wrapper #focus-carousel .carousel-control-next {
    display: none !important;
  }

  .focus-wrapper .focus-decs-wrapper {
    top: 45% !important;
  }

  .focus-wrapper #focus-carousel .carousel-indicators {
    padding: 0 !important;
    margin: 0 1rem !important;
  }

  .focus-wrapper .focus-decs-wrapper .focus-item-desc {
    display: none !important;
  }

  .focus-wrapper #focus-carousel .focus-img-character {
    transform: translate(-55%, -50%) scale(0.8) !important;
  }
}

/* responsive <=575px */
@media only screen and (max-width: 575px) {
  .focus-wrapper .focus-img {
    border-left: none !important;
    border-right: none !important;
  }

  .focus-wrapper .focus-decs-wrapper {
    bottom: 0 !important;
    transform: translate(0%, -10%) !important;
    top: unset !important;
  }

  .focus-wrapper #focus-carousel .carousel-inner .horizontal-layer {
    background-image: none;
  }

  .focus-wrapper #focus-carousel .carousel-indicators {
    top: unset !important;
    bottom: 0% !important;
    transform: scale(0.8) translateX(12%);
  }

  .focus-wrapper #focus-carousel .focus-img-character {
    transform: translate(-60%, -50%) scale(0.7) !important;
  }
}
</style>