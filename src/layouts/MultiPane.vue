<template>
  <div ref="" class="multi-panel q-px-md q-py-sm" style="flex-grow: 1">
    <div class="upper-panel">
      <slot name="upper"></slot>
    </div>
    <div class="resizable-bar">
      <q-btn color="primary" round dense class="cursor-pointer" @click="closeForm">
        <q-icon :name="iconClose" size="40px"></q-icon>
      </q-btn>
    </div>
    <div
      class="lower-panel"
      :style="{
        minHeight: lowerMinHeight + 'px',
        height: lowerHeight + 'px',
        maxHeight: lowerMaxHeight + 'px'
      }"
    >
      <div class="wrap">
        <slot name="lower"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'MultiPane',

  data() {
    return {
      iconClose: ref('expand_more'),
      resizing: false,
      close: ref(false),
      startOffset: 0,
      lowerHeight: 200,
      lowerMinHeight: 200,
      lowerMaxHeight: 200
    }
  },
  mounted() {
    this.setLowerMinMax()
  },
  methods: {
    setLowerMinMax() {
      const wrapper = document.getElementsByClassName('multi-panel')[0]
      console.log(wrapper)

      this.lowerMinHeight = (40 * wrapper.offsetHeight) / 100
      this.lowerMaxHeight = (80 * wrapper.offsetHeight) / 100
    },
    startResize(event) {
      this.resizing = true
      this.startOffset = event.clientY
      this.setLowerMinMax()

      document.addEventListener('mousemove', this.resize)
      document.addEventListener('mouseup', this.stopResize)
    },
    resize(event) {
      if (this.resizing) {
        const deltaY = event.clientY - this.startOffset

        this.lowerHeight -= deltaY
        this.startOffset = event.clientY
      }
    },
    stopResize() {
      this.resizing = false
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.stopResize)
    },
    closeForm() {
      const wrapper = document.getElementsByClassName('multi-panel')[0]

      this.close = !this.close
      this.iconClose = this.close ? 'expand_less' : 'expand_more'
      this.lowerHeight = this.close ? 20 : (40 * wrapper.offsetHeight) / 100
      this.lowerMinHeight = this.close ? 20 : (40 * wrapper.offsetHeight) / 100
      this.lowerMaxHeight = this.close ? 20 : (80 * wrapper.offsetHeight) / 100
    }
  }
})
</script>
