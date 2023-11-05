<script>
export default {
  props: {
    route: { type: Array, default: [] }
  },
  mounted() {
  }
}
</script>

<template>
  <div class="option-bar py-3">

    <div v-if="this.route[1] == 'order'" class="ctn">
      <router-link :to="{ name: `admin.${this.route[1]}.news` }">
        <a :class="{ 'active': this.route[2] == 'news' }" class="option-item"><span class="title">New Orders</span></a>
      </router-link>
      <router-link :to="{ name: `admin.${this.route[1]}.approves` }">
        <a :class="{ 'active': this.route[2] == 'approves' }" class="option-item"><span class="title">Approved Orders</span></a>
      </router-link>
    </div>

    <div v-if="this.route[1] == 'category'" class="ctn">
      <router-link :to="{ name: `admin.${this.route[1]}.brands` }">
        <a :class="{ 'active': this.route[2] == 'brands' }" class="option-item"><span class="title">Brands</span></a>
      </router-link>
      <router-link :to="{ name: `admin.${this.route[1]}.series` }">
        <a :class="{ 'active': this.route[2] == 'series' }" class="option-item"><span class="title">Series</span></a>
      </router-link>
    </div>

    <div v-if="this.route[1] == 'product'" class="ctn">
      <router-link :to="{ name: `admin.${this.route[1]}.all` }">
        <a :class="{ 'active': this.route[2] == 'all' }" class="option-item"><span class="title">All Products</span></a>
      </router-link>
      <a :class="{ 'active': this.route[2] == 'add' }" class="option-item"><span class="title">Add Product</span></a>
    </div>

  </div>
</template>

<style>
a {
  text-decoration: none;
}

.option-bar {
  z-index: 2;
  position: fixed;
  width: 200px;
  height: calc(100vh - 90px);
  background-color: #ffffff;
}

.option-bar .ctn {
  overflow-y: auto;
  height: calc(100vh - 122px);
}

.option-bar .option-item {
  text-decoration: none;
  display: block;
  padding: 5px 16px;
  cursor: pointer;
  color: #5a5d60;
}

.option-bar .option-item.active {
  background: rgba(232, 243, 238);
  color: #33a0cb;
}

.option-bar .option-item:hover {
  color: #5fb8db !important;
  background: rgba(232, 243, 238);
  ;
}

.option-bar .option-item .title {
  font-size: 16px;
  font-weight: 500;
}
</style>