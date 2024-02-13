<template>
  <b-container>
    <b-row class="mt-4">
      <b-button-group>
        <!-- <div> -->
        <b-form-file
          class="mt-2 mb-2"
          plain
          accept=".json"
          ref="file-input"
          @change="pickLocal"
        ></b-form-file>
        <b-button
          v-if="isFile"
          size="sm"
          class="mx-2 my-sm-2"
          @click="importData"
          >Импорт</b-button
        >
      </b-button-group>
      <!-- <b-col sm="12" lg="10" offset-lg="1" style="background: orange"> -->
      <b-table striped hover :items="displayCards" :fields="fields" outlined>
        <template #head(tabNumber)="data">
          <div class="" style="width: 4rem">{{ data.label }}</div>
        </template>
        <template #head(fio)="data">
          <div class="text-center">{{ data.label }}</div>
        </template>
        <template #head(enrollDate)="data">
          <div class="" style="width: 5rem">
            {{ data.label }}
          </div>
        </template>
        <template v-slot:cell(actions)="{ item }">
          <div class="mx-auto" style="width: 156px">
            <b-button variant="info" @click="editItem(item)">
              <b-icon icon="pen"></b-icon>
            </b-button>
            <b-button
              class="ml-2"
              variant="outline-dark"
              @click="createPdf(item)"
              ><b-icon icon="printer-fill"></b-icon
            ></b-button>
            <b-button
              class="ml-2"
              variant="outline-dark"
              @click="createPdfImg(item)"
              ><b-icon icon="card-heading"></b-icon
            ></b-button>
          </div>
        </template>
      </b-table>
      <!-- </b-col> -->
    </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import { mapMutations, mapGetters, mapActions } from 'vuex'
import api from '../api/idb.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'HomeView',
  components: {},
  data() {
    return {
      isFile: false,
      file2: null
    }
  },
  computed: {
    ...mapGetters(['reestr', 'fields', 'cards', 'displayCards'])
  },
  methods: {
    ...mapMutations(['SET_CURRENT_CARD', 'CREATE_IMG_CURRENTMEANS']),
    ...mapActions(['GET_CARDS']),
    pickLocal(ev) {
      let input = ev.target
      let files = input.files
      this.file2 = files[0]
      this.isFile = true
    },
    importData() {
      this.$refs['file-input'].reset()
      if (this.file2.type === 'application/json') {
        this.file2.arrayBuffer().then(async (buffer) => {
          let txt = new TextDecoder('utf-8').decode(buffer)
          await api.addCard(JSON.parse(txt)) // сохранили карточку в indexedDb
          this.GET_CARDS()
        })
      }
      this.isFile = false
    },
    createPdf(item) {
      let card = this.cards.find((el) => el.id === item.id)
      let f = card.person.surname
      let im = card.person.firstname
      let ot = card.person.lastname
      let table1 = [
        [
          { text: 'Наименование СИЗ', style: 'table1Head' },
          { text: 'Пункт Норм', style: 'table1Head' },
          {
            text: 'Единица измерения, периодичность выдачи',
            style: 'table1Head'
          },
          { text: 'Количество на период', style: 'table1Head' }
        ]
      ]
      for (let el of card.means) {
        table1.push([`${el.title}`, `${el.clause}`, `${el.unit}`, `${el.qty}`])
      }
      let table2 = [
        [
          {
            rowSpan: 2,
            text: 'Наименование СИЗ',
            style: 'table2Head'
          },
          {
            rowSpan: 2,
            text: 'Модель, марка, артикул, класс защиты СИЗ, дерматологических СИЗ',
            style: 'table2Head'
          },
          { colSpan: 4, text: 'Выдано', style: 'table2Head' },
          '',
          '',
          '',
          { colSpan: 4, text: 'Возвращено**', style: 'table2Head' },
          '',
          '',
          ''
        ],
        [
          '',
          '',
          { text: 'дата', alignment: 'center' },
          { text: 'количество', alignment: 'center' },
          { text: 'Лично/дозатор*', alignment: 'center' },
          { text: 'подпись получившего СИЗ', alignment: 'center' },
          { text: 'дата', alignment: 'center' },
          { text: 'количество', alignment: 'center' },
          { text: 'подпись сдавшего СИЗ', alignment: 'center' },
          { text: 'Акт списания (дата, номер)', alignment: 'center' }
        ]
      ]
      for (let el of card.means) {
        table2.push([
          `${el.title}`,
          `${el.brand}`,
          `${el.deliveryDate}`,
          `${el.deliveryQty}`,
          `${el.personally}`,
          ' ',
          `${el.returnDate}`,
          `${el.returnQty}`,
          ' ',
          `${el.doc}`
        ])
      }

      let dd = {
        content: [
          // {
          //   text: 'Личная карточка учета выдачи СИЗ',
          //   style: 'header',
          //   alignment: 'center',
          //   margin: [0, 0, 0, 20]
          // },
          {
            text: [
              'ЛИЧНАЯ КАРТОЧКА № ',
              { text: ` ${card.id} `, decoration: 'underline' },
              { text: '\nучета выдачи СИЗ\n\n', fontSize: '14' }
            ],
            alignment: 'center',
            fontSize: '16'
          },
          {
            alignment: 'left',
            margin: [0, 20],
            columns: [
              [
                {
                  text: [
                    'Фамилия: ',
                    {
                      text: ` ${f}         `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Имя: ',
                    { text: ` ${im}         `, decoration: 'underline' }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Отчество: ',
                    { text: ` ${ot}         `, decoration: 'underline' }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Табельный номер: ',
                    {
                      text: ` ${card.tabNumber}         `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Структурное подразделение: ',
                    {
                      text: ` ${card.person.depart} `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Профессия (должность): ',
                    {
                      text: ` ${card.person.career} `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Дата поступления на работу: ',
                    {
                      text: ` ${card.person.enrollDate} `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Дата изменения профессии (должности)\n или перевода в другое структурное подразделение: ',
                    {
                      text: ` ${card.person.changeDate} `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                }
              ],
              [
                {
                  text: [
                    'Пол: ',
                    {
                      text: ` ${card.person.sex}         `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                {
                  text: [
                    'Рост: ',
                    {
                      text: ` ${card.person.height}         `,
                      decoration: 'underline'
                    }
                  ],
                  margin: [0, 0, 0, 5]
                },
                { text: 'Размер: \n', margin: [0, 0, 0, 5] },
                {
                  text: [
                    {
                      text: [
                        'одежды ',
                        {
                          text: ` ${card.person.sizes.clothes}         \n`,
                          decoration: 'underline'
                        }
                      ]
                    },
                    {
                      text: [
                        '      обуви ',
                        {
                          text: ` ${card.person.sizes.shoes}         \n`,
                          decoration: 'underline'
                        }
                      ]
                    },
                    {
                      text: [
                        'головного убора ',
                        {
                          text: ` ${card.person.sizes.headdress}         \n`,
                          decoration: 'underline'
                        }
                      ]
                    },
                    {
                      text: [
                        '  СИЗ ОД ',
                        {
                          text: ` ${card.person.sizes.sizOD}         \n`,
                          decoration: 'underline'
                        }
                      ]
                    },
                    {
                      text: [
                        'рук',
                        {
                          text: ` ${card.person.sizes.hands}         \n`,
                          decoration: 'underline'
                        }
                      ]
                    }
                  ],
                  margin: [20, 0, 0, 0]
                }
              ]
            ]
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              keepWithHeaderRows: 1,
              body: table1
            }
          },
          {
            style: 'tableExample',
            table: {
              headerRows: 1,
              widths: [200, '*', 'auto', '*'],
              body: [
                [
                  {
                    border: [false, false, false, false],
                    text: 'Ответственное лицо за ведение\n карточек учета выдачи СИЗ'
                  },
                  {
                    border: [false, false, false, true],
                    text: ' '
                  },
                  {
                    border: [false, false, false, false],
                    text: ' '
                  },
                  {
                    border: [false, false, false, true],
                    alignment: 'right',
                    text: `\n${card.responsible}`
                  }
                ],
                [
                  { border: [false, false, false, false], text: ' ' },
                  {
                    border: [false, false, false, false],
                    alignment: 'center',
                    fontSize: 10,
                    text: '(подпись)'
                  },
                  { border: [false, false, false, false], text: ' ' },
                  {
                    border: [false, false, false, false],
                    alignment: 'center',
                    fontSize: 10,
                    text: '(фамилия, инициалы)'
                  }
                ]
              ]
            }
          },
          {
            style: 'tableExample1',
            pageOrientation: 'landscape',
            pageBreak: 'before',
            table: {
              headerRows: 2,
              body: table2
            }
          },
          {
            text: '* - информация указывается только для дерматологических СИЗ',
            fontSize: 11,
            margin: [5, 0, 0, 5]
          },
          {
            text: '** - информация указывается для всех СИЗ, кроме дерматологических СИЗ и СИЗ однократного применения',
            fontSize: 11,
            margin: [5, 0, 0, 0]
          }
        ],
        styles: {
          header: {
            fontSize: 16,
            bold: true
          },
          tableExample: {
            fontSize: 11,
            margin: [0, 0, 0, 5]
          },
          tableExample1: {
            fontSize: 11,
            margin: [0, 0, 0, 5]
          },
          table1Head: {
            bold: true,
            fontSize: 11,
            color: 'black',
            alignment: 'center'
          },
          table2Head: {
            bold: true,
            color: 'black',
            alignment: 'center'
          }
        }
      }
      pdfMake.createPdf(dd).open()
    },
    createPdfImg(item) {
      let currentCard = this.cards.find((el) => el.id === item.id)
      let full = []
      for (let m of currentCard.means) {
        let pic = m.img
        if (pic === null) {
          pic =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mNk+M9Qz0AEYBxVSF+FAAhKDveksOjmAAAAAElFTkSuQmCC'
        }
        let oneImg = [
          {
            text: m.title,
            alignment: 'center',
            fontSize: 16,
            margin: [0, 0, 0, 10]
          },
          { image: pic, width: 150, alignment: 'center' },
          { text: m.note, fontSize: 14, margin: [0, 10] }
        ]
        for (let one of oneImg) {
          full.push(one)
        }
      }
      let docDef = {
        content: full
      }
      pdfMake.createPdf(docDef).open()
    },
    editItem(item) {
      let currCard = this.cards.find((ca) => ca.id === item.id)
      // перебираем и наполняем CREATE_IMG_CURRENTMEANS
      currCard.means.forEach((m) => {
        this.CREATE_IMG_CURRENTMEANS({ idd: m.id, d: m.img })
      })
      this.SET_CURRENT_CARD(currCard)
      this.$router.push({
        name: 'Invoice',
        params: { invoiceId: item.tabNumber }
      })
      // this.$router.push({ path: '/form', params: item })
    }
  }
}
</script>

<style lang="scss">
.table thead th {
  vertical-align: top;
}
.text-center {
  text-align: center !important;
}
</style>
