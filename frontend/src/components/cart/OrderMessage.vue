<script>
</script>

<template>
  <div class="nothing-cart-ctn">
    <div class="nothing-cart">
      <i class="fa-solid fa-circle-check me-1" style="color: green;"></i>
      <span>Order success </span>
      <router-link :to="{ name: 'landing' }">
        <a class="shop-more-btn">shop more?</a>
      </router-link>
    </div>
  </div>
</template>
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

.nothing-cart-ctn {
  display: flex;
  justify-content: center;
}

.nothing-cart {
  text-align: center;
  border-radius: 5px;
  margin-top: 1rem;
  width: 50%;
  background-color: #e8f3ee;
  padding: 1rem;
  color: #5a5d60;
  font-size: xx-large;
  font-weight: 500;
}

.shop-more-btn {
  color:#5fb8db
}

.shop-more-btn:hover {
  color: #27a6dd;
}
</style>