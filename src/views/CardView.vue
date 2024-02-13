<template>
  <b-container>
    <b-row class="mt-4">
      <!-- <b-col sm="12" lg="8" offset-lg="2"> -->
      <b-col lg="10" offset-lg="1">
        <b-form @submit="onSubmit" @reset="onReset" autocomplete="off">
          <b-form-row>
            <b-col>
              <b-form-group id="ig-fio1" label-for="inputFio1">
                <b-form-input
                  id="inputFio1"
                  v-model="form.person.surname"
                  placeholder="Фамилия"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-fio2" label-for="inputFio2">
                <b-form-input
                  id="inputFio2"
                  v-model="form.person.firstname"
                  placeholder="Имя"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-fio3" label-for="inputFio3">
                <b-form-input
                  id="inputFio3"
                  v-model="form.person.lastname"
                  placeholder="Отчество"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="3">
              <b-form-group id="ig-tabel" label-for="inputTabel">
                <b-form-input
                  id="inputTabel"
                  v-model="form.tabNumber"
                  placeholder="Табельный №"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="5">
              <b-form-group id="ig-dept" label-for="inputDept">
                <b-form-input
                  id="inputDept"
                  v-model="form.person.depart"
                  placeholder="Структурное подразделение"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col cols="4">
              <b-form-group id="ig-resp" label-for="inputRespons">
                <b-form-input
                  id="inputRespons"
                  v-model="form.responsible"
                  placeholder="Отв. лицо: Фамилия И. О."
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="ig-carier"
                label="Профессия (должность)"
                label-for="inputCarier"
              >
                <b-form-input
                  id="inputCarier"
                  v-model="form.person.career"
                  placeholder="профессия"
                  required
                >
                </b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="ig-dateEnroll"
                label="Дата приема"
                label-for="inputEnrollDate"
              >
                <b-form-input
                  id="inputEnrollDate"
                  v-model="form.person.enrollDate"
                  type="date"
                  required
                />
                <b-popover
                  target="inputEnrollDate"
                  variant="info"
                  triggers="hover"
                  placement="top"
                >
                  Дата поступления на работу
                </b-popover>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                id="ig-dateChange"
                label="Дата перевода"
                label-for="inputChangeDate"
              >
                <b-form-input
                  id="inputChangeDate"
                  type="date"
                  v-model="form.person.changeDate"
                  required
                />
                <b-popover
                  target="inputChangeDate"
                  variant="info"
                  triggers="hover"
                  placement="top"
                >
                  Дата изменения профессии (должности) или перевода в другое
                  структурное подразделение
                </b-popover>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group id="ig-mg" label-for="inputMG">
                <b-form-select
                  id="inputMG"
                  v-model="form.person.sex"
                  :options="mg"
                  required
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-height" label-for="inputHeight">
                <b-form-input
                  id="inputHeight"
                  v-model="form.person.height"
                  placeholder="укажите рост в см"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <b-form-group
                id="ig-clothes"
                label="Размеры"
                label-for="inputClothes"
              >
                <b-form-input
                  id="inputClothes"
                  v-model="form.person.sizes.clothes"
                  placeholder="одежды"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-shoes" label="." label-for="inputShoes">
                <b-form-input
                  id="inputShoes"
                  v-model="form.person.sizes.shoes"
                  placeholder="обуви"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-head" label="." label-for="inputHead">
                <b-form-input
                  id="inputHead"
                  v-model="form.person.sizes.headdress"
                  placeholder="головы"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-breath" label="." label-for="inputBreath">
                <b-form-input
                  id="inputBreath"
                  v-model="form.person.sizes.sizOD"
                  placeholder="СИЗ ОД"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group id="ig-hands" label="." label-for="inputHands">
                <b-form-input
                  id="inputHands"
                  v-model="form.person.sizes.hands"
                  placeholder="рук"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <TheAuto
                :items="dangers"
                filterby="d"
                labels="Опасность"
                :title="
                  form.dangerEv[0].danger === '' ? clk : form.dangerEv[0].danger
                "
                :shouldReset="true"
                @selected="dangerSelected"
              ></TheAuto>
            </b-col>
            <b-col>
              <TheAuto
                :items="events"
                filterby="ev"
                labels="Опасное событие"
                :title="
                  form.dangerEv[0].event === '' ? clk : form.dangerEv[0].event
                "
                :shouldReset="true"
                @selected="eventSelected"
              ></TheAuto>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <EditableTable
                v-model="items"
                :frontHeaders="frontHeaders"
                @changeItems="itemsChange"
                @deleteRow="rowDeleted"
              >
              </EditableTable>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <EditSecondTable v-model="items1" :frontHeaders="frontHeaders1">
              </EditSecondTable>
            </b-col>
          </b-form-row>
          <b-button type="submit" variant="primary">Обновить карточку</b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import EditableTable from '@/components/EditableTable.vue'
import EditSecondTable from '@/components/EditSecondTable.vue'
import TheAuto from '@/components/TheAuto.vue'
export default {
  name: 'InvoiceView',
  components: {
    EditableTable,
    EditSecondTable,
    TheAuto
  },
  data() {
    return {
      clk: 'Кликните для ввода...',
      mg: [
        { value: null, text: 'Укажите пол' },
        { value: 'Мужской', text: 'Мужской' },
        { value: 'Женский', text: 'Женский' }
      ],
      form: {
        id: null,
        tabNumber: null,
        responsible: '',
        person: {
          surname: '',
          firstname: '',
          lastname: '',
          depart: '',
          career: '',
          enrollDate: '',
          changeDate: '',
          sex: null,
          height: '',
          sizes: {
            clothes: '',
            shoes: '',
            headdress: '',
            sizOD: '',
            hands: ''
          }
        },
        dangerEv: [{ id: 0, danger: '', event: '' }],
        means: []
      },
      items: [],
      items1: []
    }
  },
  created() {
    // формируем верхнюю часть карточки
    if (!this.currentCard.dangerEv) {
      this.currentCard.dangerEv = this.form.dangerEv
    }
    for (let keyVal of Object.entries(this.form)) {
      // keyVal перебирается в виде [key, value], где key = keyVal[0]
      for (let [key1, val1] of Object.entries(this.currentCard)) {
        if (keyVal[0] === key1 && keyVal[0] !== 'means') {
          this.form[key1] = val1
        }
      }
    }
    // можно длиннее
    //this.form.tabNumber = this.currentCard.tabNumber
    //this.form.responsible = this.currentCard.responsible
    // и т.д.
    // формируем первую таблицу - массив items
    // let keysItems = ['id', 'title', 'clause', 'unit', 'qty']
    // let keysItems1 = [
    //   'brand',
    //   'deliveryDate',
    //   'deliveryQty',
    //   'personally',
    //   'returnDate',
    //   'returnQty',
    //   'doc'
    // ]
    this.currentCard.means.forEach((m) => {
      let mean = {
        id: m.id,
        title: m.title,
        clause: m.clause,
        unit: m.unit,
        qty: m.qty,
        note: m.note,
        img: m.img
        //isEdit: false // добавляется в EditableTable в data()
      }
      this.items.push(mean)
    })

    // формируем вторую таблицу - массив items1
    this.currentCard.means.forEach((m) => {
      let mean = {
        id: m.id,
        title: m.title,
        brand: m.brand,
        deliveryDate: m.deliveryDate,
        deliveryQty: m.deliveryQty,
        personally: m.personally,
        returnDate: m.returnDate,
        returnQty: m.returnQty,
        doc: m.doc
        // isEdit: false // добавляется в EditableTable
      }
      this.items1.push(mean)
    })
  },
  computed: {
    ...mapGetters(['currentCard']),
    ...mapState(['cards', 'frontHeaders', 'frontHeaders1']),
    ...mapState({
      dangers: (state) => state.risks.dangers,
      events: (state) => state.risks.events
    })
  },
  methods: {
    ...mapActions(['UPDATE_REESTR']),
    dangerSelected(danger) {
      //console.log(danger)
      this.form.dangerEv[0].danger = danger.d
    },
    eventSelected(event) {
      //console.log(event)
      this.form.dangerEv[0].event = event.ev
    },
    rowDeleted(index) {
      this.items1 = this.items1.filter((item, i) => i !== index)
    },
    itemsChange({ aid, t }) {
      // console.log(val)
      if (this.items.length > this.items1.length) {
        let newRow = {
          id: aid,
          title: t,
          isEdit: false,
          brand: '',
          deliveryDate: '',
          deliveryQty: '',
          personally: '',
          returnDate: '',
          returnQty: '',
          doc: ''
        }
        this.items1.unshift(newRow)
      }
    },
    onSubmit(event) {
      event.preventDefault()
      this.items.forEach((el) => {
        this.form.means.push(el)
      })
      this.items1.forEach((el) => {
        let idx = this.form.means.findIndex((d) => d.id === el.id)
        if (idx > -1) {
          Object.assign(this.form.means[idx], el)
        }
      })
      //this.form.id = this.cards.length + 1
      // обновить в реестре, все поля, кроме изображений в means
      this.UPDATE_REESTR(this.form)

      this.$router.replace({ path: '/' })
    },
    onReset(event) {
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped></style>
