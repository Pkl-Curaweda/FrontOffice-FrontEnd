<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container
      style="overflow-x: auto"
      :class="$route.name == 'Login' ? 'inroom' : 'bg-default'"
    >
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import routes from 'src/router/routes'
import { housekeeping_routes, hkreports_routes } from 'src/router/housekeeping.router'

export default defineComponent({
  name: 'BlankLayout'
})
</script>

<style>
.bg-default {
  background-color: #cfd8dd;
}
/* .my-bg {
  top: 0;
  left: 0;
  background-position-y: 30%;
  width: 100%;
  background-image: url('src/assets/img/login.png');
  background-size: cover;
  z-index: -20; /* Move the background behind other content
}

.my-bg::before {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('src/assets/img/login.png');
  background-size: cover;
  background-position-y: 50%;
  filter: brightness(50%); /* Apply the brightness filter
  z-index: -30;
}*/
.background-image {
  background-image: url('src/assets/img/login.png');
  background-size: cover;
  background-position: center;
  filter: brightness(90%);
  z-index: -30;
}
.inroom {
  background-color: #ffffff;
}
</style>
