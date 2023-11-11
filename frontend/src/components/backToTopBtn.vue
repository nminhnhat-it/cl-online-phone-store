<script>
import { Tooltip } from 'bootstrap'

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

export default {
  methods: {
    backToTop(e) {
      $('html, body').animate({ scrollTop: 0 }, '300');
    },
    scrolled(event) {
      const back_To_Top_Btn = $(".back-to-top-btn");
      if (back_To_Top_Btn.length && window.pageYOffset > 300) {
        back_To_Top_Btn.addClass("show");
      }
      else {
        back_To_Top_Btn.removeClass("show");
      }

      const tooltip_Back_To_Top = $(".tooltip-back-to-top");
      if (tooltip_Back_To_Top.length) {
        tooltip_Back_To_Top.remove();
      }
    }
  },
  mounted() {
    new Tooltip(document.body, {
      selector: "[data-bs-toggle='tooltip']",
    })
    window.addEventListener('scroll', this.scrolled);
  }
  ,
  unmounted() {
    window.removeEventListener('scroll', this.scrolled);
  }
}
</script>

<template>
  <div title="Back to top" @click="backToTop" class="back-to-top-btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-custom-class="tooltip-back-to-top" data-bs-title="Back to top"><i class="fa-solid fa-chevron-up"></i></div>
</template>

<style>
.tooltip-back-to-top {
  --bs-tooltip-bg: #66c1e6;
  --bs-tooltip-padding-x: 1rem;
  --bs-tooltip-padding-y: 0.5rem;
  --bs-tooltip-opacity: .9;
  --bs-tooltip-font-size: font-size-s;
  --bs-tooltip-border-radius: 5px;
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

.content {
  max-width: 1808px;
  min-width: 300px;
  margin: auto;
}

.back-to-top-btn {
  display: none !important;
}

.back-to-top-btn {
  display: none !important;
  width: 50px;
  height: 50px;
  bottom: 80px;
  right: 25px;
  position: fixed;
  background: rgba(250, 250, 250, 0.671);
  box-shadow: 0 0 7px 4px #0000001a;
  border-radius: 32px;
  color: #5a5d60;
  z-index: 200;
  cursor: pointer;
  justify-content: center;
  display: flex;
  align-items: center;
  transition: all 0.2s ease-in;
}

.back-to-top-btn.show {
  display: flex !important;
}

.back-to-top-btn:hover {
  color: #33a0cb;
  background: rgb(250, 250, 250);
}

.back-to-top-btn:active {
  color: #ffffff;
  background: rgb(115, 115, 115);
  transition: all 0.1s ease-out;
}
</style>