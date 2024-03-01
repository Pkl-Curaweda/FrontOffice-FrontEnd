<template>
  <q-page class="flex q-pa-md">
    <q-header class="bg-transparent border-0 border-transparent">
      <q-toolbar class="flex items-center justify-end">
        <q-btn
          dense
          flat
          round
          @click="toggleCamera"
          v-if="!openCamera"
          icon="qr_code_scanner"
          class="text-white"
        />
        <q-btn
          dense
          flat
          round
          @click="toggleCamera"
          v-if="openCamera"
          icon="arrow_back"
          class="text-white"
        />
      </q-toolbar>
    </q-header>
    <!-- open -->
    <div v-if="openCamera" class="q-my-auto q-mx-auto" style="min-width: 280px">
      <h6 class="text-white font-extrabold text-sm">Scan the QR code to access Lingin Hotel</h6>

      <StreamBarcodeReader @decode="onDecode" @loaded="onLoad" v-if="openCamera"></StreamBarcodeReader>
      <!-- <ImageBarcodeReader @decode="onDecoded"></ImageBarcodeReader> -->

      <div class="flex flex-col items-center justify-center">
        <h8 class="text-white font-extrabold text-sm">Powered By:</h8>
        <q-img
          src="../assets/img/lingian-logo-colored.png"
          class="q-my-md q-mx-auto"
          style="width: 60px"
        />
      </div>
    </div>
    <q-page-container
      class="flex items-center justify-center h-fit py-10"
      :class="{ hidden: openCamera }"
    >
      <router-view />
    </q-page-container>
    <div class="q-my-auto q-mx-auto" v-if="!openCamera">
      <div class="flex">
        <q-img
          src="../assets/img/lingian-logo-colored.png"
          class="q-my-md q-mx-auto"
          style="width: 180px"
        />
      </div>
      <q-form @submit.prevent="login" class="column q-mt-md q-gutter-sm" style="min-width: 280px">
        <q-input
          dense
          outlined
          bg-color="white"
          color="dark"
          v-model="dataModel.email"
          label="Email"
          standout
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
          ]"
        />

        <q-input
          outlined
          dense
          bg-color="white"
          color="dark"
          :type="showPwd ? 'text' : 'password'"
          v-model="dataModel.password"
          label="Password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>

        <!-- <a href="" class="self-end q-mb-sm">Forgot password?</a> -->
        <q-btn label="login" type="submit" class="width-full" color="primary" :loading="loading" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { StreamBarcodeReader, ImageBarcodeReader } from 'vue-barcode-reader';

export default defineComponent({
  name: 'Login-InRoom',
  components: { StreamBarcodeReader },
  setup() {
    return {
      showPwd: ref(false),
      openCamera: ref(false)
    }
  },
  data() {
    return {
      api: new this.$Api('root'),
      loading: false,
      dataModel: {
        email: ref(null),
        password: ref(null)
      },
      barcodeValue: 'test'
    }
  },
  methods: {
    toggleCamera() {
      this.openCamera = !this.openCamera
      console.log(this.openCamera)
    },
    login() {
      this.loading = true

      this.api.post(
        'auth/user/login',
        {
          email: this.dataModel.email,
          password: this.dataModel.password
        },
        ({ status, data, message }) => {
          console.log(data)
          if (status == 200) {
            if (data['path'] === '/irs/home') {
              this.$AuthStore.setUser(data['user'])
              this.$AuthStore.setAccessToken(data['accessToken'])
              this.$AuthStore.setMainPath(data['path'])
              this.$router.push({
                path: data['path']
              })
            } else {
              this.$Helper.showNotif("You don't have access", '', 'negative')
            }
          } else {
            this.$Helper.showNotif(message, '', 'negative')
          }

          this.loading = false
        }
      )
    },
  onDecode(Text) {
    console.log(Text)
    // console.log(`Decode text from QR code is ${Text}`)
    tex = Text.value
    // window.location.replace(Text)
  },
 onLoad(Text) {
    console.log(`Ready to start scanning barcodes`)
  }
  }
})
</script>

<style></style>
