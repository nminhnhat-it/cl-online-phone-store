<script></script>

<template>
  <div class="content">
    <h2 class="catefory-title mt-3">New Orders</h2>
    <table class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col">#</th>
        <th class="data-tb-col" style="min-width: 102px;">Modify</th>
      </tr>
      <tr class="data-tb-row">
        <td class="data-tb-col">attribute</td>
        <td class="data-tb-col modify"><a href="#">Edit</a> <a href="#">Delete</a></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.content {
  max-width: 1808px;
  min-width: 600px;
  margin: auto;
  margin-top: 90px;
  margin-left: 200px;
  padding: 0 48px;
  overflow: auto;
  height: calc(100vh - 96px);
  width: calc(100% - 200px);
}

.category-title {
  color: #5a5d60;
  font-size: 32px;
  font-weight: 600;
}

.data-tb {
  border-collapse: unset;
}

.data-tb,
.data-tb .data-tb-col {
  border: 1px solid #5a5d60;
}

.data-tb .data-tb-col {
  padding: 5px;
  width: auto;
}

.data-tb .data-tb-col.modify a {
  cursor: pointer;
  text-decoration: none;
  color: #33a0cb;
}

.data-tb .data-tb-col.modify a:hover {
  color: rgb(206, 97, 97);
}

.data-tb .data-tb-col.modify a:nth-child(n+2)::before {
  display: inline-block;
  content: "";
  margin: 0px 6px;
  height: 0.72rem !important;
  width: 2px !important;
  background: #387c96;
}
</style>