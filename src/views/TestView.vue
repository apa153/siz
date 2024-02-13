<template>
  <b-container>
    <section class="containerr">
      <div class="questionBox">
        <div
          class="questionContainer"
          v-if="questionIndex < questions.length"
          :key="questionIndex"
        >
          <header>
            <h1 class="title is-6" @click="defineQty">Проверка знаний</h1>
            <div class="progressContainer">
              <progress
                class="progress is-info is-small"
                :value="(questionIndex / questions.length) * 100"
                max="100"
              >
                {{ (questionIndex / questions.length) * 100 }}%
              </progress>
              <p>
                {{ Math.round((questionIndex / questions.length) * 100) }}%
                завершено
              </p>
            </div>
          </header>

          <h2 class="titleContainer title">
            {{ questions[questionIndex].text }}
          </h2>
          <div class="optionContainer">
            <div
              class="option"
              v-for="(response, index) in questions[questionIndex].responses"
              @click="selectOption(index)"
              :class="{
                'is-selected':
                  userResponses[questionIndex] === index && ans === 't',
                'is-wselected':
                  userResponses[questionIndex] === index && ans === 'f'
              }"
              :key="index"
            >
              <span style="font-weight: normal">{{ index + 1 }}. </span>
              {{ response[0] }}
            </div>
          </div>

          <footer class="questionFooter">
            <nav class="pagination" role="navigation" aria-label="pagination">
              <b-button
                class="button"
                @click="prev"
                :disabled="questionIndex < 1"
                >Назад</b-button
              >
              <b-button
                class="button"
                :variant="
                  userResponses[questionIndex] == null ? 'primary' : 'success'
                "
                @click="next"
                :disabled="questionIndex >= questions.length"
              >
                {{
                  userResponses[questionIndex] == null ? 'Думаю...' : 'Далее'
                }}
              </b-button>
            </nav>
          </footer>
        </div>
        <div
          v-if="questionIndex >= questions.length"
          :key="questionIndex"
          class="quizCompleted has-text-centered"
        >
          <b-icon
            class="mt-5 mb-5"
            icon="check-square"
            scale="4"
            variant="success"
            animation="throb"
          ></b-icon>
          <p class="subtitle">
            Результат:<br /><span style="color: brown">{{ score() }}</span>
          </p>
          <br />
          <a
            class="button"
            style="font-size: 1.5rem; color: darkgreen"
            @click="restart"
            >Повторить &#x21bb;<i class="fa fa-refresh"></i
          ></a>
        </div>
      </div>
    </section>
  </b-container>
</template>

<script>
export default {
  name: 'TestView',
  data() {
    return {
      ans: '',
      qSize: 30,
      allQ: [],
      questions: [],
      questionIndex: 0,
      userResponses: null,
      isActive: false
    }
  },
  created() {
    this.allQ = this.$store.getters['quize/questions']
    this.init(this.allQ.length)
  },
  computed: {},
  methods: {
    defineQty() {
      if (localStorage.getItem('key') === '7') {
        let age = prompt('Установите количество вопросов, min=5', 5)
        if (+age > 3 && +age < 71) {
          this.qSize = +age
          this.questions = []
          this.init(this.allQ.length)
        }
      }
    },
    init(size) {
      let array = this.getRandomArr(this.qSize, size)
      for (let el of array) {
        this.questions.push(this.allQ[el])
      }
      this.userResponses = Array(this.questions.length).fill(null)
    },
    restart() {
      this.questionIndex = 0
      this.questions = []
      this.qSize = 30
      this.init(this.allQ.length)
      //this.userResponses = Array(this.questions.length).fill(null)
    },
    selectOption(index) {
      this.ans = this.questions[this.questionIndex].responses[index][1]
      this.userResponses.splice(this.questionIndex, 1, index) // изначально
      // this.$set(this.userResponses, this.questionIndex, index)
    },
    next() {
      let answ = this.userResponses.some(
        (elem, index) => elem === null && index === this.questionIndex
      )
      if (answ) return
      if (this.questionIndex < this.questions.length) {
        this.questionIndex++
      }
    },
    prev() {
      // if (!this.userResponses.includes(1)) return
      if (this.questions.length > 0) {
        this.questionIndex--
      }
    },
    // Return "true" count in userResponses
    score() {
      // let score = 0
      let score = ''
      let yes = 0
      let no = 0
      for (let i = 0; i < this.userResponses.length; i++) {
        let ans = this.questions[i].responses[this.userResponses[i]][1]
        let tipeOf = this.questions[i].responses[this.userResponses[i]]
        if (typeof tipeOf !== 'undefined' && ans === 't') {
          // score = score + 1
          yes++
        }
        // else if (typeof tipeOf !== 'undefined' && this.ans === 'f') {
        //   no++
        // }
      }
      no = this.qSize - yes
      score = `Верных: ${yes}; Ошибочных: ${no}`
      return score
    },
    getRandomArr(size, max) {
      let randArr = []
      while (randArr.length < size) {
        let random = this.getRandomInt(max)
        if (!randArr.includes(random)) {
          randArr.push(random)
        }
      }
      return randArr
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * max)
    }
  }
}
</script>

<style lang="scss" scoped>
$trans_duration: 0.3s;
$primary_color: #3d5afe;
.containerr {
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  align-self: center;
  // height: 100vh;
  user-select: none;
  margin: 0 0.5rem;
  .nav-link {
    margin-bottom: 32px;
    align-items: center;
    margin-left: 10.5rem;
    color: black;
    font-size: 1rem;
    align-self: flex-start;
    img {
      margin-right: 16px;
      width: 7px;
      height: 10px;
    }
  }
}

.button {
  transition: $trans_duration;
}

.title,
.subtitle {
  font-family: 'Poppins', sans-serif;
  font-weight: normal;
  font-size: 1.5rem;
  margin-bottom: 3rem;
}

.animated {
  transition-duration: $trans_duration/2;
}
.questionBox {
  max-width: 36rem;
  width: 36rem;
  min-height: 30rem;
  border: 1px solid #909090;
  background: #fafafa;
  position: relative;
  display: flex;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  header {
    // background: rgba(0, 0, 0, 0.025);
    background: Bisque;
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      font-weight: bold;
      margin-bottom: 1rem !important;
    }
    .progressContainer {
      width: 60%;
      margin: 0 auto;
      > progress {
        margin: 0;
        border-radius: 5rem;
        overflow: hidden;
        border: none;

        color: $primary_color;
        &::-moz-progress-bar {
          background: $primary_color;
        }
        &::-webkit-progress-value {
          background: $primary_color;
        }
      }
      > p {
        margin: 0;
        margin-top: 0.5rem;
      }
    }
  }
  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 1rem;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        // color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;
        font-weight: bold;
        font-size: 1rem;

        &.is-selected {
          border-color: rgba(black, 0.5);
          background-color: lightgreen;
        }
        &.is-wselected {
          border-color: rgba(black, 0.5);
          background-color: #ffd580;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }
      }
    }
    .questionFooter {
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      align-self: flex-end;

      .pagination {
        //padding: 10px 15px;
        margin: 15px 25px;
      }
    }
  }
}

.pagination {
  display: flex;
  justify-content: space-between;
}

.button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  margin: 0 0.25rem;
  transition: 0.3s;
  width: 8rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
    background: #eceff1;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &.is-active {
    background: $primary_color;
    color: white;
    border-color: transparent;

    &:hover {
      background: darken($primary_color, 10%);
    }
  }
}
</style>
