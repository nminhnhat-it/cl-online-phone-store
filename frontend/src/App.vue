<script>
import accountService from "@/services/account.service";

export default {
  data() {
    return {
      user: {},
      isStaff: {}
    }
  },
  async mounted() {
    this.$store.state.apiUrl = "http://localhost:3000/";
    this.user = await accountService.get();
    this.isStaff = await accountService.verifyPermission();
  }
}
</script>

<template>
  <Suspense>
    <router-view :user="user" :isStaff="isStaff"/>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>