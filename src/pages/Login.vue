<template>
  <q-page class="container">
    <!-- <div style="width: 100%; justify-content: center; padding: 40px; display: flex">
      <q-icon name="qr_code_scanner" size="xl" style="margin-top: auto; margin-bottom: auto" />
      <h4>Barcode</h4>
    </div> -->
    <div style="display: block; justify-content: center; gap: 10px; padding: 40px">
      <div style="font-weight: bolder">Pengingat!</div>
      <div>Pastikan scan barcode sesuai dengan posisinya dan pastikan koneksi internet lancar</div>
    </div>
    <div class="q-mx-auto q-my-auto items-center justify-center z-10 flex flex-col">
      <StreamBarcodeReader @decode="onDecode" @loaded="onLoad"></StreamBarcodeReader>
    </div>
    <q-page-container class="flex items-center justify-center" :class="{ hidden: openCamera }">
      <router-view />
    </q-page-container>

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
      <div style="font-weight: bolder">Powered By:</div>
      <div class="flex flex-col" style="gap: 5px; padding: auto">
        <img src="../assets/img/lingian-logo-colored.png" width="50" />
        <img src="../assets/img/ips.png" height="40" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import { StreamBarcodeReader } from 'vue-barcode-reader'
import { useQuasar, QSpinnerGears } from 'quasar'
export default defineComponent({
  name: 'LoginInroom',
  components: { StreamBarcodeReader },

  setup() {
    const $q = useQuasar()
    return {
      showPwd: ref(false),
      openCamera: ref(true)
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      loading: false,
      dataModel: {
        email: ref(null),
        password: ref(null)
      }
    }
  },
  methods: {
    login() {
      this.loading = true

      this.api.post(
        'auth/user/login',
        {
          email: this.dataModel.email,
          password: this.dataModel.password
        },
        ({ status, data, message }) => {
          if (status == 200) {
            // if (data['path'] === '/irs/home') {
            console.log(data['path'])
            this.$AuthStore.setUser(data['user'])
            this.$AuthStore.setAccessToken(data['accessToken'])
            this.$AuthStore.setMainPath(data['path'])
            // console.log(data)
            // this.$router.go({ path: data['path'] })
            // } else {
            //   this.$Helper.showNotif("You don't have access", '', 'negative')
            // }
          } else {
            console.log(this.api)
            this.$Helper.showNotif(message || 'Please try again', '', 'negative')
          }

          this.loading = false
        }
      )
    },
    moveChange() {
      this.$router.push({
        name: 'Login-InRoom'
      })
    },
    notify(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'data not found',
          timeout: 1000
        },
        1000
      )
    },
    onDecode(Text) {
      console.log(Text)
      this.$q.loading.show({
        // spinner: QSpinnerGears,
        delay: 400 // ms
      })
      this.api.post(`auth/user/login/${Text}`, null, ({ data, message, status }) => {
        if (status == 200) {
          this.notify('positive', message)
          this.$AuthStore.setUser(data['user'])
          this.$AuthStore.setAccessToken(data['accessToken'])
          this.$AuthStore.setMainPath(data['path'])
          this.$q.loading.hide()
          this.$router.push({
            path: data['path']
          })
        } else {
          this.$q.loading.hide()
          this.notify('warning', message)
        }
      })
    },
    onLoad(Text) {
      console.log(`Ready to start scanning barcodes`)
    }
  }
})
</script>
<style>
.full-height {
  height: 100vh;
  display: flex;
}

.container {
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
}

@media (min-width: 400px) {
  .container {
    width: 400px;
    margin-inline: auto;
  }
}
</style>
