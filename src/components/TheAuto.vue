<template>
  <b-form-group class="autocomplete" :label="labels">
    <div class="input" @click="toggleVisible">
      {{ selectedItem ? selectedItem[filterby] : '' }}
    </div>
    <div class="placeholder" v-if="selectedItem == null">
      {{ title }}
    </div>
    <div class="popover" v-show="visible">
      <input
        type="text"
        ref="input"
        v-model="query"
        placeholder="Начните вводить..."
        @keydown.up="up"
        @keydown.down="down"
        @keydown.enter="enter"
      />
      <div class="options" ref="optionsList">
        <ul>
          <li
            v-for="(match, idx) in matches"
            :key="idx"
            :class="{ selected: selected === idx }"
            @click="itemClick(idx)"
          >
            {{ match[filterby] }}
          </li>
        </ul>
      </div>
    </div>
  </b-form-group>
</template>

<script>
export default {
  name: 'TheAuto',
  props: {
    labels: {
      type: String
    },
    items: {
      default: () => [],
      type: Array
    },
    filterby: {
      type: String
    },
    title: {
      default: 'Укажите одну..',
      type: String
    },
    shouldReset: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      itemHeight: 39,
      selectedItem: null,
      selected: 0,
      visible: false,
      query: ''
    }
  },

  emits: ['selected', 'change'],
  methods: {
    toggleVisible() {
      this.visible = !this.visible
      setTimeout(() => {
        this.$refs.input.focus()
      }, 50)
    },
    itemClick(idx) {
      this.selected = idx
      this.selectItem()
      // console.log(this.matches[idx])
    },
    selectItem() {
      this.selectedItem = this.matches[this.selected]
      this.visible = false

      if (this.shouldReset) {
        this.query = ''
        this.selected = 0
      }

      this.$emit('selected', JSON.parse(JSON.stringify(this.selectedItem)))
    },
    enter() {
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') event.preventDefault()
      })
    },
    up() {
      if (this.selected == 0) {
        return
      }
      this.selected -= 1
      this.scrollToItem()
    },
    down() {
      if (this.selected >= this.matches.length - 1) {
        return
      }
      this.selected += 1
      this.scrollToItem()
    },
    scrollToItem() {
      this.$refs.optionsList.scrollTop = this.selected * this.itemHeight
    }
  },
  computed: {
    matches() {
      this.$emit('change', this.query)
      if (this.query === '') {
        return []
      }
      return this.items.filter((item) =>
        item[this.filterby].toLowerCase().includes(this.query.toLowerCase())
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.autocomplete {
  width: 100%;
  position: relative;
  color: darkblue;
}
.input {
  height: 2.5rem;
  border-radius: 3px;
  border: 2px solid lightgrey;
  box-shadow: 0 0 10px #eceaea;
  padding-left: 0.625rem;
  padding-top: 0.625rem;
  font-size: 0.8rem;
  cursor: pointer;
}
.placeholder {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  color: darkblue;
  pointer-events: none;
  font-size: 0.8rem;
}
.popover {
  min-height: 3rem;
  min-width: 100%;
  border: 2px solid lightgrey;
  position: absolute;
  top: 3rem;
  left: 0;
  right: 0;
  background: #fff;
  border-radius: 3px;
  text-align: center;
}
.popover input {
  width: 95%;
  margin-top: 0.375rem;
  height: 2.5rem;
  font-size: 1rem;
  border-radius: 3px;
  border: 1px solid lightgrey;
  padding-left: 0.5rem;
}
.options {
  max-height: 10rem;
  overflow-y: scroll;
  margin-top: 0.5rem;
}
.options ul {
  list-style: none;
  text-align: left;
  padding-left: 0;
}

.options ul li {
  border-bottom: 1px solid lightgrey;
  padding: 0.625rem;
  cursor: pointer;
  background: #f1f1f1;
}

.options ul li.selected {
  background: #58bd4c;
  color: #fff;
  font-weight: 600;
}
</style>
