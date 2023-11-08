<script>

export default {
  props: {
    dataArr: { type: Array, default: [] },
  },
  methods: {
    viewInfo(e) {
      this.$store.state.back = 'admin.order.news';
      this.$router.push({ name: 'admin.order.info', params: { id: $(e.target).attr("id") } })
    },

    cancelOrder(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("cancel:item");
    },
  },
  emits: ['cancel:item']
}
</script>

<template>
  <table v-if="dataArr[0]" class="data-tb mt-3">
    <tr class="data-tb-row">
      <th class="data-tb-col">#</th>
      <th class="data-tb-col" style="min-width: 102px;">Customer Name</th>
      <th class="data-tb-col" style="min-width: 102px;">Total</th>
      <th class="data-tb-col" style="min-width: 102px;">Date Created</th>
      <th class="data-tb-col" style="min-width: 102px;">Date Upadted</th>
      <th class="data-tb-col" style="min-width: 102px;">Edit</th>
    </tr>

    <tr v-for="(data, key) in this.dataArr" class="data-tb-row">
      <td class="data-tb-col">{{ key + 1 }}</td>
      <td class="data-tb-col">{{ data.customer.name }}</td>
      <td class="data-tb-col">{{ data.od_total }}</td>
      <td class="data-tb-col">{{ data.createdAt }}</td>
      <td class="data-tb-col">{{ data.updatedAt }}</td>
      <td class="data-tb-col modify">

        <a :id="data._id" @click="viewInfo">View Info</a>
        <a :id="data._id" @click="">Approve</a>
        <a :id="data.id" @click="cancelOrder">Cancel</a>
      </td>
    </tr>
  </table>
</template>

<style scoped>
.data-tb {
  border-collapse: unset;
}

.data-tb,
.data-tb .data-tb-col {
  border: 1px solid #5a5d60;
  text-align: center !important;
}

.data-tb .data-tb-col {
  padding: 5px;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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