<script>

export default {
  props: {
    dataArr: { type: Array, default: [] },
    back: { type: String }
  },
  methods: {
    viewInfo(e) {
      this.$store.state.back = this.back;
      this.$router.push({ name: 'admin.order.info', params: { id: $(e.target).attr("id") } })
    },

    cancelOrder(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("cancel:item");
    },

    approveOrder(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("approve:item");
    },

    shipOrder(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("ship:item");
    },

    completeOrder(e) {
      this.$store.state.id = $(e.target).attr("id");
      this.$emit("complete:item");
    },
  },
  emits: ['cancel:item', "approve:item", "ship:item", "complete:item"]
}
</script>

<template>
  <div style="overflow-x: scroll;">
    <table v-if="dataArr[0]" class="data-tb mt-3">
      <tr class="data-tb-row">
        <th class="data-tb-col">#</th>
        <th class="data-tb-col" style="min-width: 102px;">Name</th>
        <th class="data-tb-col" style="min-width: 102px;">Email</th>
        <th class="data-tb-col" style="min-width: 102px;">Phone</th>
        <th class="data-tb-col" style="min-width: 102px;">Address</th>
        <th class="data-tb-col text-center" style="min-width: 102px;">Total</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Created</th>
        <th class="data-tb-col" style="min-width: 102px;">Date Upadted</th>
        <th class="data-tb-col" style="min-width: 102px;">Edit</th>
      </tr>

      <tr v-for="(data, key) in this.dataArr" class="data-tb-row">
        <td class="data-tb-col">{{ key + 1 }}</td>
        <td class="data-tb-col">{{ data.od_name }}</td>
        <td class="data-tb-col">{{ data.od_email }}</td>
        <td class="data-tb-col">0{{ data.od_phone }}</td>
        <td class="data-tb-col" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{ data.od_address }}</td>
        <td class="data-tb-col text-center text-danger">${{ data.od_total }}</td>
        <td class="data-tb-col">{{ data.createdAt }}</td>
        <td class="data-tb-col">{{ data.updatedAt }}</td>
        <td class="data-tb-col modify">

          <a :id="data._id" @click="viewInfo">View Info</a>

          <a v-if="data.od_status == 'await'" :id="data._id" @click="approveOrder">Approve</a>
          <a v-if="data.od_status == 'prepare'" :id="data._id" @click="shipOrder">Ship</a>
          <a v-if="data.od_status == 'ship'" :id="data._id" @click="completeOrder">Complete</a>

          <a v-if="data.od_status != 'cancel' && data.od_status != 'complete'" :id="data._id" @click="cancelOrder">Cancel</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
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