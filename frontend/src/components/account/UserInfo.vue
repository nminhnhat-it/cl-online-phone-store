<script>
export default {
  props: {
    user: { type: Object, default: {} },
  }
}
</script>

<template>
  <div class="user-info-ctn mb-5">
    <div class="user-info">
      <div class="row">
        <div class="col-5">
          <div class="user-image-ctn">
            <img src="@/assets/images/guest.png" class="d-block user-image" alt="...">
          </div>
        </div>
        <div class="col-7">
          <div class="row">
            <div class="col">
              <div class="info-container">
                <div class="info-text"><span>Account Informations</span></div>
                <div class="info-item-ctn">
                  <div class="info-item">
                    <div class="col-4"><span>Name:</span></div>
                    <div class="col-8"><span>{{ user.name }}</span></div>
                  </div>
                  <div class="info-item">
                    <div class="col-4"><span>Email:</span></div>
                    <div class="col-8"><span>{{ user.email }}</span></div>
                  </div>
                  <div class="info-item">
                    <div class="col-4"><span>Adress:</span></div>
                    <div class="col-8"><span>{{ user.address }}</span></div>
                  </div>
                  <div class="info-item">
                    <div class="col-4"><span>Phone:</span></div>
                    <div class="col-8"><span>0{{ user.phone }}</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  padding-top: 3rem;
  max-width: 1808px;
  min-width: 300px;
  margin: auto;
}

.user-info-ctn {
  display: flex;
  justify-content: center;
  margin-top: 1rem !important;
}

.user-info-ctn .user-info {
  padding: 1rem;
  background-color: #e8f3ee;
  width: 70%;
  border-radius: 5px;
}

.user-image-ctn {
  justify-content: center;
  display: flex;
}

.user-info-ctn .user-info .user-image-ctn .user-image {
  height: 20rem;
  width: 20rem;
}


.info-container {
  background-color: #fff;
  border-radius: 5px;
  border: #5a5d6013 solid 1px;
  margin: 1rem;
  padding: 1rem;
}

.info-item {
  color: #5a5d60;
  font-size: large;
  font-weight: 500;
  border: #5a5d6013 solid 1px;
  padding: 0.5rem;
  display: flex;
}

.info-text {
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border: #5a5d6013 solid 1px;
  padding: 1rem;
  color: #5a5d60;
  font-size: x-large;
  font-weight: 500;
  background-color: #f7f7f7;
}

.info-item-ctn:nth-last-child() {
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
}</style>