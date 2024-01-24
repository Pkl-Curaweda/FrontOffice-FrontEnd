<template>
  <!-- With Title -->
  <q-card
    v-if="title"
    class="q-px-md q-py-md relative"
    :class="card_class"
    :style="`border-radius: 0 0 ${radius} ${radius};` + card_style"
  >
    <div
      class="full-width flex-center absolute flex justify-center text-subtitle"
      style="top: -20px; left: 0; font-weight: 600; padding: 2px; background-color: #c2e7b9"
      :style="`border-radius: ${radius} ${radius} 0 0`"
    >
      {{ title }}
    </div>
    <slot />
  </q-card>

  <!-- W/O Title -->
  <q-card
    v-else
    class="q-px-md q-py-md"
    :class="card_class"
    :style="`border-radius: ${radius};` + card_style"
  >
    <slot></slot>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HKCard',
  props: {
    title: String,
    card_class: String,
    card_style: String,
    radius: {
      type: String,
      default: '25px'
    }
  }
})
</script>
