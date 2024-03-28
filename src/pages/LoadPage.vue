<template>
  <q-layout view="lHh LpR fFf">
    <q-page-container>
      <q-page
        class="q-pa-md"
        style="overflow-y: hidden; display: flex; justify-content: center; align-items: center"
      >
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center; /* Memposisikan konten secara vertikal ke tengah */
            padding: 40px;
            gap: 5px;
            width: 100%;
            text-align: center;
          "
        >
          <div class="flex flex-col" style="padding: auto">
            <q-img src="../assets/img/lingian-logo-colored.png" width="150px" class="img" />
          </div>
          <div
            class="flex flex-col"
            style="
              gap: 10px;
              padding: auto;
              display: block;
              left: 0px;
              right: 0px;
              position: absolute;
              bottom: 80px;
            "
          >
            <div style="font-weight: lighter; color: grey">from</div>
            <img src="../assets/img/ips.png" height="30px" />
          </div>
        </div>
        <!-- <q-img src="https://picsum.photos/500/300" width="200px" class="img" /> -->
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
export default defineComponent({
  data() {
    return {
      api: new this.$Api('root'),
      token: this.$AuthStore.getAccessToken(),
      mainPath: this.$AuthStore.getMainPath()
    }
  },
  mounted() {
    this.checkToken()
  },
  methods: {
    checkToken() {
      try {
        console.log(this.token)
        if (this.token === '') return this.$router.replace('/auth/login')
        this.api.get('auth/check-token', ({ status }) => {
          if (status != 200) return this.$router.replace('/auth/login')
          return this.$router.replace(this.mainPath)
        })
      } catch (err) {}
    }
  }
})
</script>

<style>
.q-date__view.q-date__calendar {
  padding-right: 0;
  padding-left: 0;
}
.img {
  margin: auto;
}
</style>
