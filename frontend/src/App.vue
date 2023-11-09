<script>
import accountService from "@/services/account.service";
import productService from "@/services/product.service";

export default {
  data() {
    return {
      user: {},
      isStaff: {},
      products: []
    }
  },
  async mounted() {
    this.$store.state.apiUrl = "http://localhost:3000/";
    this.user = await accountService.get();
    this.isStaff = await accountService.verifyPermission();
    this.products = await productService.getAll();
  }
}
</script>

<template>
  <Suspense>
    <router-view :user="user" :isStaff="isStaff" :products="products"/>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>