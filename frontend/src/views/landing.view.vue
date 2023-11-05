<script>
import navbar from "@/components/navbar.vue";
import backToTopBtn from "@/components/backToTopBtn.vue";
import footerInfo from "@/components/footerInfo.vue";
import accountService from "@/services/account.service";

export default {
  async setup() {
    var user = await accountService.get();
    var isStaff = await accountService.verifyPermission();
    return { user, isStaff }
  },
  components: {
    navbar,
    backToTopBtn,
    footerInfo
  },
  methods: {
    retrieveUserData() {
      if (!this.$store.state.user) {
        this.$store.state.user = this.user;
        this.$store.state.isStaff = this.isStaff;
      }
    },
  },
  mounted() {
    this.retrieveUserData();
  }
}
</script>
 
<template>
  <navbar :key="Math.random()" />
  <div class="content">

    <footerInfo />
    <backToTopBtn />
  </div>
</template>

<style>
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
</style>