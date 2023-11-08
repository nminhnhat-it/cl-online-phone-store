<script>

export default {
  mounted(){
    this.$store.state.apiUrl = "http://localhost:3000/";
  }
}
</script>

<template>
  <Suspense>
    <router-view/>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</template>