<template>
  <b-container>
    <b-row class="mt-4">
      <!-- <b-col sm="12" lg="8" offset-lg="2"> -->
      <b-col lg="10" offset-lg="1">
        <b-form
          @submit="onSubmit"
          @reset="onReset"
          v-if="show"
          autocomplete="off"
        >
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
                :title="clk"
                :shouldReset="true"
                @selected="dangerSelected"
              ></TheAuto>
            </b-col>
            <b-col>
              <TheAuto
                :items="events"
                filterby="ev"
                labels="Опасное событие"
                :title="clk"
                :shouldReset="true"
                @selected="eventSelected"
              ></TheAuto>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col>
              <EditableTable v-model="items" :frontHeaders="frontHeaders">
              </EditableTable>
            </b-col>
          </b-form-row>
          <b-form-row class="mb-2" v-if="!secondTable">
            <b-col>
              <b-button variant="info" @click="openTable"
                >Добавить оборот карточки</b-button
              >
            </b-col>
          </b-form-row>
          <b-form-row v-if="secondTable">
            <b-col>
              <EditSecondTable v-model="items1" :frontHeaders="frontHeaders1">
              </EditSecondTable>
            </b-col>
          </b-form-row>
          <b-form-row v-else>
            <b-col>
              <b-alert show variant="warning"
                >Пожалуйста, добавьте все необходимые корректные строки к первой
                таблице</b-alert
              >
            </b-col>
          </b-form-row>
          <b-button type="submit" variant="primary">Сформировать</b-button>
          <!-- <b-button class="ml-5" type="reset" variant="danger"
            >Сбросить все</b-button
          > -->
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex'
import EditableTable from '@/components/EditableTable.vue'
import EditSecondTable from '@/components/EditSecondTable.vue'
import TheAuto from '@/components/TheAuto.vue'
import api from '../api/idb.js'
export default {
  name: 'FormView',
  components: { EditableTable, EditSecondTable, TheAuto },
  data() {
    return {
      clk: 'Кликните для ввода...',
      secondTable: false,
      items: [], // первая часть объектов массива means
      // items: [
      //   {
      //     id: 1,
      //     title:
      //       'Костюм сигнальный повышенной видимости для защиты от механических воздействий (истирания, порезов)',
      //     clause: '5322',
      //     unit: '1 шт.',
      //     qty: '1 шт. до износа'
      //   }
      items1: [], // вторая часть объектов массива means
      // items1: [
      //   {
      //     id: 1,
      //     title:
      //       'Костюм сигнальный повышенной видимости для защиты от механических воздействий (истирания, порезов)',
      //     brand: 'SVE',
      //     deliveryDate: '22.12.2023',
      //     deliveryQty: '1 шт.',
      //     personally: '1 шт.',
      //     returnDate: '20.04.2023',
      //     returnQty: '1 шт.',
      //     doc: '20.04.2023, № 6'
      //   }
      // ]
      form: {
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
      mg: [
        { value: null, text: 'Укажите пол' },
        { value: 'Мужской', text: 'Мужской' },
        { value: 'Женский', text: 'Женский' }
      ],
      show: true
    }
  },
  mounted() {
    this.items = this.items.map((item) => ({ ...item, isEdit: false }))
  },
  computed: {
    ...mapGetters(['cards', 'currentMeans']),
    ...mapState(['frontHeaders', 'frontHeaders1']),
    ...mapState({
      dangers: (state) => state.risks.dangers,
      events: (state) => state.risks.events
    })
  },
  methods: {
    ...mapMutations(['ADD_TO_REESTR']),
    ...mapActions(['GET_CARDS']),
    dangerSelected(danger) {
      //console.log(danger)
      this.form.dangerEv[0].danger = danger.d
    },
    eventSelected(event) {
      //console.log(event)
      this.form.dangerEv[0].event = event.ev
    },
    openTable() {
      // хотя бы одна строка и длина наименования СИЗ > 5
      if (
        this.items.length > 0 &&
        this.items[0].title &&
        this.items[0].title.length > 5
      ) {
        this.items.forEach((s) => {
          this.items1.push({
            id: s.id,
            title: s.title,
            brand: '',
            deliveryDate: '',
            deliveryQty: '',
            personally: '',
            returnDate: '',
            returnQty: '',
            doc: ''
          })
        })
        this.secondTable = true
      }
    },
    async onSubmit(event) {
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
      // нужно брать this.currentMeans, оттуда - изображения, и замещать img
      for (let mm of this.form.means) {
        // просматриваем СИЗ подаваемой формы
        let toUpdate = this.currentMeans.find((el) => el.idd === mm.id)
        // если undefined, то на этапе создания новой строки новой карточки, img даже не подгружали
        if (toUpdate) {
          mm.img = toUpdate.d
        }
      }
      this.form.id = this.cards.length + 1
      await api.addCard(this.form) // сохранили карточку в indexedDb
      // берем из базы все карточки и пополняем cards (в State) для обновления в CatalogView списка карточек
      this.GET_CARDS()
      this.$router.replace({ path: '/' })
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      this.form.checkedd = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  // text-align: center;
  color: black;
}
thead,
tbody tfoot,
tr,
td,
th {
  //font-size: 0.75rem;
  // width: 100px;
  text-align: left;
}
.table th,
.table td {
  padding: 0.1rem;
}
.table thead th {
  vertical-align: top;
}
button {
  font-size: 0.75rem;
}
.col1 {
  background: lightblue;
}
.col2 {
  background: lightgreen;
}
.col3 {
  background: wheat;
}
</style>
