<template>
  <q-page class="flex q-pa-xs">
    <div
      class="q-my-auto q-mx-auto rounded-borders shadow-3 q-pt-md q-pb-xl q-px-xl bg-white container"
    >
      <div class="flex">
        <q-img
          src="../assets/img/lingian-logo-colored.png"
          class="q-my-md q-mx-auto"
          style="width: 150px"
        />
      </div>
      <h6 class="text-bold q-ma-none text-center">Welcome to <br />Management System</h6>
      <p class="text-center">Lingian Hotel & Convention</p>
      <q-form @submit.prevent="login" class="column q-mt-md q-gutter-xs" style="min-width: 230px">
        <q-input
          outlined
          dense
          v-model="dataModel.email"
          class="q-mt-md"
          label="Email"
          lazy-rules
        />
        <div v-if="dataModel.email === ''" style="color: rgb(208, 2, 2)">
          <q-icon name="error" />
          Email is required
        </div>

        <q-input
          outlined
          dense
          :type="showPwd ? 'text' : 'password'"
          v-model="dataModel.password"
          label="Password"
          lazy-rules
        >
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
        <div v-if="dataModel.password === ''" style="color: rgb(208, 2, 2)">
          <q-icon name="error" />
          Password is required
        </div>

        <!-- <a href="" class="self-end q-mb-sm">Forgot password?</a> -->
        <!-- <div
          style="cursor: pointer; transition: all 0.2s"
          @click="moveChange"
          to="/auth/login/InRoom"
          onmouseover="this.style.color='#45a049'"
          onmouseout="this.style.color='#000000'"
        >
          Move to In Room Page
        </div> -->
        <q-btn
          label="login"
          type="submit"
          color="primary"
          class="q-mt-md width-full"
          :loading="loading"
        />
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
            if (data['path'] != '/irs/home') {
              this.$AuthStore.setUser(data['user'])
              this.$AuthStore.setAccessToken(data['accessToken'])
              this.$AuthStore.setMainPath(data['path'])
              this.$router.push({ path: data['path'] })
            } else {
              this.$Helper.showNotif("You don't have access", '', 'negative')
            }
          } else {
            console.log(status, data, message)
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
    }
  }
})
</script>
<style>
@media (min-width: 640px) {
  .container {
    width: 350px;
    margin-inline: auto;
  }
}
</style>
