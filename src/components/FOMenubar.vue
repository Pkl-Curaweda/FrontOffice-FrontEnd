<template>
  <q-toolbar class="fo-menubar border bg-white items-stretch">
    <slot name="left"></slot>

    <q-separator vertical />
    <template v-for="(r, index) in frontoffice_routes" :key="index">
      <q-item
        clickable
        v-if="r.path != '/' && r.meta.main_route"
        :active="$route.meta.title === r.meta.title"
        v-ripple
        :to="r.path"
        :class="$route.meta.title == r.meta.title && 'menu-active'"
      >
        <q-item-section>
          {{ r.meta.title }}
        </q-item-section>
      </q-item>
      <q-separator vertical />
    </template>

    <q-space />

    <slot name="right"></slot>
  </q-toolbar>
</template>

<script>
import { defineComponent, ref } from 'vue'
import frontoffice_routes from 'src/router/frontoffice.router'

export default defineComponent({
  name: 'FOMenubar',
  data() {
    return { frontoffice_routes }
  }
})
</script>
