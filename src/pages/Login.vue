<template>
  <q-page class="flex q-pa-md">
    <div class="q-my-auto q-mx-auto rounded-borders shadow-3 q-pt-lg q-pb-xl q-px-xl bg-white">
      <div class="flex">
        <q-img
          src="../assets/img/lingian-logo-colored.png"
          class="q-my-md q-mx-auto"
          style="width: 150px"
        />
      </div>
      <h6 class="text-bold q-ma-none text-center">Welcome to <br />Management System</h6>
      <p class="text-center">Lingian Hotel & Convention</p>
      <q-form @submit.prevent="login" class="column q-mt-md q-gutter-sm" style="min-width: 280px">
        <q-input
          outlined
          type="email"
          dense
          v-model="dataModel.email"
          label="Email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'
          ]"
        />

        <q-input
          outlined
          dense
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

        <a href="" class="self-end q-mb-sm">Forgot password?</a>
        <q-btn label="login" type="submit" class="width-full" color="primary" :loading="loading" />
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',

  setup() {
    return {
      showPwd: ref(false)
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
            console.log(data)
            this.$AuthStore.setUser(data['user'])
            this.$AuthStore.setAccessToken(data['accessToken'])
            this.$AuthStore.setMainPath(data['path'])
            this.$router.go(data['path'])
          }else{
            this.$Helper.showNotif(message, '', 'negative')
          }

          this.loading = false
        }
      )
    }
  }
})
</script>
