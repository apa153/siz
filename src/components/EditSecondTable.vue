<template>
  <article>
    <p>Оборотная сторона карточки</p>
    <b-table
      class="tableFont align-center"
      striped
      bordered
      hover
      :items="tableItems"
      fixed
      :fields="frontHeaders"
      table-variant="info"
    >
      <template
        v-for="(fth, index) in frontHeaders"
        #[`cell(${fth.key})`]="data"
      >
        <b-form-input
          :disabled="fth.type === 'textTitle'"
          v-if="fth.type === 'text' && tableItems[data.index].isEdit"
          :key="index"
          :type="fth.type"
          :value="tableItems[data.index][fth.key]"
          maxlength="50"
          @blur="(e) => inputHandler(e.target.value, data.index, fth.key)"
        >
        </b-form-input>
        <div
          :key="index"
          v-else-if="fth.type === 'edit'"
          style="width: 80px"
          class="mx-auto"
        >
          <b-button @click="editRowHandler(data)">
            <span v-if="!tableItems[data.index].isEdit"
              ><b-icon icon="pen"></b-icon
            ></span>
            <span v-else>OK</span>
          </b-button>
        </div>
        <span :key="index" v-else>{{ data.value }}</span>
      </template>
      <!-- <template #cell(title)="data">
      <b-form-input
        v-if="tableItems[data.index].isEdit"
        type="text"
        v-model="tableItems[data.index].title"
      ></b-form-input>
      <span v-else>{{ data.value }}</span>
    </template>
    <template #cell(clause)="data">
      <b-form-input
        v-if="tableItems[data.index].isEdit"
        type="text"
        v-model="tableItems[data.index].clause"
      ></b-form-input>
      <span v-else>{{ data.value }}</span>
    </template>
    <template #cell(unit)="data">
      <b-form-input
        v-if="tableItems[data.index].isEdit"
        type="text"
        v-model="tableItems[data.index].unit"
      ></b-form-input>
      <span v-else>{{ data.value }}</span>
    </template>
    <template #cell(qty)="data">
      <b-form-input
        v-if="tableItems[data.index].isEdit"
        type="text"
        v-model="tableItems[data.index].qty"
      ></b-form-input>
      <span v-else>{{ data.value }}</span>
    </template>
    <template #cell(edit)="data">
      <b-button @click="editRowHandler(data)">
        <span v-if="!tableItems[data.index].isEdit">Edit</span>
        <span v-else>Done</span>
      </b-button>
    </template> -->
    </b-table>
  </article>
</template>

<script>
export default {
  name: 'EditableTable',
  components: {},
  props: {
    value: Array,
    frontHeaders: Array
  },
  data() {
    return {
      items1Length: -1,
      tableItems: this.value.map((item) => ({ ...item, isEdit: false }))
    }
  },
  created() {
    this.items1Length = this.tableItems.length
  },
  computed: {},
  methods: {
    // относятся только к таблице
    editRowHandler(data) {
      this.tableItems[data.index].isEdit = !this.tableItems[data.index].isEdit
    },
    inputHandler(value, index, key) {
      this.tableItems[index][key] = value
      this.$set(this.tableItems, index, this.tableItems[index])
      this.$emit('input', this.tableItems)
    }
  },
  watch: {
    value(newVal) {
      if (this.items1Length !== newVal.length) {
        this.tableItems = newVal.map((item) => ({ ...item, isEdit: false }))
        this.items1Length++
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.noteCenter {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 100%;
  z-index: 10;
}
.card > img {
  border-radius: 10%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 20%;
  height: auto;
  object-fit: contain;
  // flex-direction: row;
}
.tableFont {
  font-size: 0.75rem;
}
input {
  font-size: 0.75rem;
}
button {
  font-size: 0.75rem;
}
</style>
