<template>
  <article>
    <b-container id="noteCard" v-if="isNoteEdit" class="noteCenter">
      <b-col>
        <b-card
          :title="text.t"
          :img-src="urlImage"
          img-alt="Card image"
          img-left
          img-height="200"
          img-width="200"
          img-center="true"
          class="px-1 py-1"
        >
          <b-textarea
            id="textarea"
            v-model="text.v"
            placeholder="Добавляйте важное..."
            rows="6"
            max-rows="6"
          ></b-textarea>
          <div class="mt-2">
            <input
              type="file"
              id="inputImage"
              ref="imgBackground"
              accept="image/*, .png, .jpg, .jpeg, .webp"
              @click="onFileClicked($event)"
              @change="onFileSelected($event)"
            />
            <b-button variant="warning" class="ml-3" @click="okAtNote()"
              >OK</b-button
            >
          </div>
        </b-card>
      </b-col>
    </b-container>
    <b-button class="mb-2" variant="success" @click="addRowHandler"
      >Добавить строку к таблице</b-button
    >
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
          v-if="fth.type === 'text' && tableItems[data.index].isEdit"
          :key="index"
          :type="fth.type"
          :value="tableItems[data.index][fth.key]"
          maxlength="70"
          @blur="(e) => inputHandler(e.target.value, data.index, fth.key)"
        >
        </b-form-input>

        <div :key="index" v-else-if="fth.type === 'comment'">
          <b-button
            :disabled="!tableItems[data.index].isEdit"
            variant="primary"
            @click="editNote(data.value, data.index, fth.key, data)"
            ><b-icon icon="music-note-list"></b-icon>
          </b-button>
        </div>

        <div
          :key="index"
          v-else-if="fth.type === 'edit'"
          style="width: 100px"
          class="mx-auto"
        >
          <b-button @click="editRowHandler(data)">
            <span v-if="!tableItems[data.index].isEdit"
              ><b-icon icon="pen"></b-icon
            ></span>
            <span v-else>OK</span>
          </b-button>
          <b-button
            style="margin: auto"
            class="ml-2"
            variant="danger"
            @click="removeRowHandler(data.index)"
            ><b-icon icon="basket"></b-icon
          ></b-button>
        </div>
        <span :key="index" v-else>{{ data.value }}</span>
      </template>
    </b-table>
  </article>
</template>

<script>
import { uid } from 'uid'
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'EditableTable',
  components: {},
  props: {
    // items: Array,
    value: Array,
    frontHeaders: Array
  },
  data() {
    return {
      currentSIZ_ID: '',
      board: {
        picture: {},
        downloadURL: ''
      },
      text: { v: '', i: null, k: null, t: 'Краткое наименование СИЗ' },
      isNoteEdit: false,
      qtyRow: 0,
      tableItems: this.value.map((item) => ({ ...item, isEdit: false }))
    }
  },
  computed: {
    ...mapGetters(['currentCard', 'currentMeans']),
    // :img-src="urlImage"
    // если картинка не выбрана, то ставится каска
    // если кликнуто на ноту и выбрана картинка, то она и ставится
    urlImage() {
      return this.board.downloadURL != ''
        ? `${this.board.downloadURL}`
        : require('../assets/kaska.png')
    },
    dialogg() {
      //const div = document.querySelector('#noteCard')
      // console.log(div)
      // let Mwidth = div.offsetWidth
      // let Mheight = div.offsetHeight
      // let Wwidth = window.innerWidth
      // let Wheight = window.innerHeight
      // div.style.position = 'absolute'
      // // let top = (Wheight - Mheight) / 2 + window.pageYOffset + 'px'
      // div.style.left = (Wwidth - Mwidth) / 2 + window.pageXOffset + 'px'
      // return `top:${(Wheight - Mheight) / 2 + window.pageYOffset}px`
      return this.top
    }
  },
  methods: {
    ...mapMutations(['CREATE_IMG_CURRENTMEANS', 'UPDATE_IMG_CURRENTMEANS']),
    onFileClicked(ev) {
      ev.target.value = ''
    },
    onFileSelected(ev) {
      let selectedImg = ev.target.files[0]
      let url = URL.createObjectURL(selectedImg)
      this.board.downloadURL = url
      const reader = new FileReader()
      reader.readAsBinaryString(selectedImg)
      reader.onload = (e) => {
        let bits = e.target.result
        let ob = {
          created: new Date(),
          data: 'data:image/jpeg;base64,' + btoa(bits)
        }
        this.board.picture = ob
        let im = document.querySelector('.card-img-left')
        im.src = ob.data
        // обновить изображение в currentMeans
        let imgForUpdate = { idd: this.currentSIZ_ID, d: ob.data }
        // в режиме редактирования карточки
        // idd уже существует - либо уже было, либо возникло при добавлении ряда
        let existed = this.currentMeans.findIndex(
          (el) => el.idd === imgForUpdate.idd
        )
        if (existed > -1) {
          // ?
          this.UPDATE_IMG_CURRENTMEANS({
            index: existed,
            img: imgForUpdate.d
          })
          // если только уже не записали, теперь заменяем на новое img
        } else {
          this.CREATE_IMG_CURRENTMEANS(imgForUpdate)
          // this.currentMeans.push(imgForUpdate)
        }
      }
    },
    okAtNote() {
      this.inputHandler(this.text.v, this.text.i, this.text.k)
      this.isNoteEdit = !this.isNoteEdit
      // если картинка поставлена, то после нажатия OK комментария
      // обнуление downloadURL, и если картинка не выбрана и не сохранена для другого,
      // то поставится каска
      this.board.downloadURL = ''
      this.$store.commit('setImageModal', false)
    },
    // push music btn
    editNote(val, index, key, data) {
      this.$store.commit('setImageModal', true)
      // сохраняем изображение в табельном номере, найти id СИЗ
      this.currentSIZ_ID = data.item.id // id в массиве СИЗ вида 2514e00, а не номер элемента в массиве
      this.isNoteEdit = !this.isNoteEdit
      this.text.v = val
      this.text.i = index
      this.text.k = key
      let currentSIZ_idx = -1
      currentSIZ_idx = this.currentMeans.findIndex(
        (s) => s.idd === this.currentSIZ_ID
      )
      if (currentSIZ_idx > -1 && this.currentMeans[currentSIZ_idx].d !== null) {
        this.placeImage(currentSIZ_idx)
      }
      // let b = 3
      // if (this.currentCard && b > 4) {
      //   // если редактирование карточки
      //   currentSIZ_idx = this.currentCard.means.findIndex(
      //     (s) => s.id === this.currentSIZ_ID
      //   )
      //   if (
      //     currentSIZ_idx > -1 &&
      //     this.currentCard.means[currentSIZ_idx].img != null
      //   ) {
      //     this.placeImage(currentSIZ_idx)
      //   }
      // } else if (!this.currentCard) {
      //   // значит, работаем через currentMeans
      //   currentSIZ_idx = this.currentMeans.findIndex(
      //     (s) => s.idd === this.currentSIZ_ID
      //   )
      //   if (currentSIZ_idx !== -1) {
      //     // img уже записан не нулевой
      //     this.placeImage(currentSIZ_idx)
      //   }
      // }
    },
    async placeImage(idx) {
      await this.waitForElm('.card-img-left')
      let im = document.querySelector('.card-img-left')
      if (this.currentCard) {
        // работаем в режиме редактирования карточки
        im.src = this.currentMeans[idx].d
        // im.src = this.currentCard.means[idx].img
      } else if (!this.currentCard) {
        // в режиме создания карточки
        im.src = this.currentMeans[idx].d
      }
    },
    waitForElm(selector) {
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector))
        }
        const observer = new MutationObserver(() => {
          if (document.querySelector(selector)) {
            observer.disconnect()
            resolve(document.querySelector(selector))
          }
        })
        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
      })
    },
    // относятся только к таблице
    editRowHandler(data) {
      this.tableItems[data.index].isEdit = !this.tableItems[data.index].isEdit
      // нажали на OK, добавив новую строку в items
      // нужно учитывать только нажатие на вновь введенную строку по id?
      if (this.qtyRow > 0 && !this.tableItems[data.index].isEdit) {
        this.$emit('changeItems', {
          aid: this.tableItems[0].id,
          t: this.tableItems[0].title
        }) // всегда первый элемент, его id и title нужно во 2 таблицу
      }
      let title = this.tableItems[data.index].title // полное введенное название СИЗ в первом столбце таблицы

      if (title && title.match(/(?:\S+\s\S+)(?=\s)/g)) {
        this.text.t = title.match(/(?:\S+\s\S+)(?=\s)/g)[0]
      } else this.text.t = 'СИЗ не включает минимум 3 слова'
    },
    inputHandler(value, index, key) {
      this.tableItems[index][key] = value
      this.$set(this.tableItems, index, this.tableItems[index])
      this.$emit('input', this.tableItems)
    },
    addRowHandler() {
      this.qtyRow++
      const newRow = this.frontHeaders.reduce(
        (a, c) => ({ ...a, [c.key]: null }),
        {}
      )
      newRow.isEdit = true
      newRow.id = uid(7)
      // добавим изображение к СИЗ
      newRow.img = null
      this.tableItems.unshift(newRow)
      this.$emit('input', this.tableItems)
    },
    removeRowHandler(index) {
      this.tableItems = this.tableItems.filter((item, i) => i !== index)
      this.$emit('input', this.tableItems)
      this.$emit('deleteRow', index)
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
