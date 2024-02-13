<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-4">
      <b-navbar-brand to="/"
        ><img src="@/assets/kaska.png" alt="logo" height="40"
      /></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/" @click="cleanCurrent">Реестр</b-nav-item>
          <b-nav-item to="/form"><div>Создать карточку</div></b-nav-item>
          <b-nav-item to="/test"
            ><b-icon icon="info-square-fill"></b-icon
          ></b-nav-item>
          <b-nav-item to="/info">
            <b-icon icon="question-square-fill"></b-icon>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button size="sm" class="mx-0 my-sm-0" @click="exportData"
              >Экспорт БД</b-button
            >
          </b-nav-item>

          <b-nav-form @submit.prevent="search">
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Удалить реестр"
              v-model="searchText"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Удалить</b-button
            >
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import api from '../api/idb.js'
import pdfMake from 'pdfmake/build/pdfmake.js'
import pdfFonts from 'pdfmake/build/vfs_fonts.js'
pdfMake.vfs = pdfFonts.pdfMake.vfs
export default {
  name: 'TopHeader',
  data() {
    return {
      file2: null,
      searchText: ''
    }
  },
  methods: {
    cleanCurrent() {
      if (this.$store.state.currentCard) {
        this.$store.commit('SET_CURRENT_CARD', null)
      }
    },
    search() {
      api.deleteBD()
      location.reload()
    },
    exportData() {
      let data = this.$store.getters.cards
      for (let d of data) {
        for (let dd of d.means) {
          dd.img = null
        }
      }
      // let resp = data[0].responsible
      let str = JSON.stringify(data)
      let file = new File([str], `card.json`, {
        type: 'application/json'
      })
      let url = URL.createObjectURL(file)
      let a = document.createElement('a')
      a.setAttribute('download', file.name)
      a.href = url
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar-dark .navbar-nav .nav-link {
  // color: white;
}

.navbar-dark .navbar-nav {
  :first-child a {
    color: wheat;
  }
  :nth-child(2) a {
    color: khaki;
  }
  :nth-child(3) a {
    color: khaki;
  }
  :nth-child(4) a {
    color: lightblue;
  }
}

// #file-input {
//   color: transparent;
// }

// input[type='file']::before {
//   content: 'Файл не выбран';
//   color: black;
//   margin-right: 10px;
// }
</style>
