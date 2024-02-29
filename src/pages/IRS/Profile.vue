<template>
  <q-page>
    <div style="height: 160px">
      <div style="height: 160px" class="bg-primary">
        <q-btn icon="arrow_back" flat color="white" rounded @click="backPage" style="margin-top:10px;"/>
        <q-card
          class="my-card text-black center-container"
          style="background: radial-gradient(circle, #ffffff 0%, #fdfdfd 100%); width: 80%"
        >
          <!-- style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" -->
          <q-card-section>
            <div
              :class="classname + 'row items-center q-gutter-md'"
              style="display: flex; width: 100%; padding-inline: auto; justify-content: center"
            >
              <img
                :src="this.picture"
                style="width: 80px; height: 80px; border-radius: 100%"
                class="cropped-image"
              />
              <div
                style="
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  white-space: nowrap;
                "
              >
                <div class="text-weight-bold text-h7">Hello, {{ user.name }}</div>
                <div class="">{{ user.email }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-pt-xl q-px-lg">
        <q-form
          @submit.prevent="postProfile"
          class="column q-pt-lg"
          style="text-overflow: ellipsis; gap: 10px; overflow: hidden; white-space: nowrap"
        >
          <div class="col" style="display: flex; gap: 10px">
            <q-input
              color="dark"
              class="col-10"
              style="width: 60%"
              v-model="username"
              label="Name"
              standout
            />
            <q-input color="dark" style="width: 40%" v-model="gender" label="Gender" standout />
          </div>
          <q-input
            color="dark"
            style="width: 100%"
            v-model="phone"
            label="Phone Number"
            stack-label
            standout
          />
          <q-input
            color="dark"
            style="width: 100%"
            v-model="formattedDate"
            label="Birthday"
            standout
          >
            <q-btn icon="event" flat>
              <q-popup-proxy
                @before-show="updateProxy"
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="proxyDate">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="Cancel" color="primary" flat v-close-popup />
                    <q-btn label="OK" color="primary" flat @click="formatDate" v-close-popup />
                  </div>
                </q-date>
              </q-popup-proxy> </q-btn
          ></q-input>
          <div style="justify-content: center; width: 100%; display: flex; margin-top: 15px">
            <q-btn
              label="Upload Profile"
              type="submit"
              no-caps
              class="width-full q-px-xl"
              color="primary"
              :loading="loading"
            />
          </div>
        </q-form>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { formatDate } from 'src/utils/time'

export default defineComponent({
  data() {
    return {
      user: this.$AuthStore.getUser(),
      api: new this.$Api('inroomservice')
    }
  },
  setup() {
    return {
      picture: ref(),
      date: ref(),
      gender: ref(),
      proxyDate: ref(),
      formattedDate: ref(),
      username: ref(),
      phone: ref()
    }
  },
  mounted() {
    this.helperProfile()
  },
  // watch: {
  //   proxyDate() {
  //     this.formatDate()
  //   }
  // },
  methods: {
    helperProfile() {
      this.api.get(`profile`, ({ data, message, status }) => {
        if (status == 200) {
          this.picture = data.picture
          this.username = data.username
          this.formattedDate = data.birthday
          this.gender = data.gender
          this.phone = data.phone
          console.log(data)
        }
      })
    },
    updateProxy() {
      this.proxyDate = new Date()
    },
    formatDate() {
      this.formattedDate = this.proxyDate.replace(/\//g, '-')
    },
    postProfile() {
      this.loading = true
      this.api.put(
        `profile`,
        { birthday: this.formattedDate, phone: this.phone },
        ({ data, message, status }) => {
          if (status == 200) {
            this.loading = false
            this.helperProfile()
            this.notify('positive', message)
          }
        }
      )
    },
    notify(type, msg) {
      this.$q.notify(
        {
          type: type,
          message: msg,
          timeout: 30
        },
        50
      )
    },
    backPage(){
      this.$router.go(-1)
    }
  }
})
</script>

<style>
.center-container {
  position: absolute;
  top: 150px;
  left: 50%;
  transform: translate(-50%, -50%);
}

.cropped-image {
  width: 70px;
  height: 70px;
  border-radius: 1px;
  object-fit: cover;
}
</style>
