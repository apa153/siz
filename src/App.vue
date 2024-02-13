<template>
  <div id="app" v-if="cardsLoaded">
    <div class="overlay faded" v-if="imageModal"></div>
    <!-- <div class="page" v-if="showSpinner">
      <b-spinner class="spinner" variant="primary" key="primary"></b-spinner>
    </div> -->
    <div v-if="!mobile">
      <nav>
        <top-header></top-header>
        <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
      </nav>
      <router-view />
    </div>
    <div v-else>
      <h2>
        Извините, это приложение на мобильных устройствах не поддерживается
      </h2>
      <p>
        Чтобы использовать это приложение, пожалуйста, используйте ПК или
        планшет
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TopHeader from '@/components/TopHeader'
export default {
  components: {
    TopHeader
  },
  data() {
    return {
      mobile: null
    }
  },
  created() {
    this.GET_CARDS()
    this.checkScreen()
    window.addEventListener('resize', this.checkScreen)
  },
  computed: {
    ...mapState(['cardsLoaded', 'imageModal']),
    ...mapGetters(['showSpinner'])
  },
  methods: {
    ...mapActions(['GET_CARDS']),
    checkScreen() {
      const windowWidth = window.innerWidth
      if (windowWidth <= 750) {
        this.mobile = true
      } else {
        this.mobile = false
      }
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
}

nav {
  padding: 0;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.page {
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  z-index: 25;
  width: 100%;
  height: 100%;
}

.overlay {
  display: block;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.56);
  transition: all 1.5s;
  z-index: 9;
}

.faded {
  animation-name: faded;
  animation-duration: 0.5s;
}

@keyframes faded {
  from {
    opacity: 0.1;
  }
  to {
    opacity: 1;
  }
}

.spinner {
  position: relative;
  top: 50%;
  left: 50%;
}
</style>
