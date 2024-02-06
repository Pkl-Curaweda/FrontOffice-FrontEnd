<template>
  <div class="rb-lostfound">
    <div class="text-h5 text-center q-mt-xl text-weight-bold">New Lost and Found</div>
    <q-form class="q-mt-lg q-mx-auto" style="width: fit-content">
      <div class="row items-center q-mt-sm" style="gap: 55px">
        <div class="text-caption text-weight-bold">Room No</div>
        <q-select outlined v-model="model" :options="options" dense dropdown-icon="expand_more">
          <template v-slot:prepend>
            <q-icon name="sensor_door" color="primary" />
          </template>
        </q-select>
      </div>
      <div class="row items-center q-mt-sm" style="gap: 13px">
        <div class="text-caption text-weight-bold">Item Description</div>
        <div>
          <q-input
            type="textarea"
            autogrow
            v-model="itemDesc"
            dense
            outlined
            placeholder="Fill Description"
          />
        </div>
      </div>
      <div class="row items-center q-mt-sm" style="gap: 58px">
        <div class="text-caption text-weight-bold">Location</div>
        <div>
          <q-input
            v-model="location"
            type="textarea"
            autogrow
            dense
            outlined
            placeholder="Fill Description"
          />
        </div>
      </div>
      <div class="row items-center q-mt-sm" style="gap: 42px">
        <div class="text-caption text-weight-bold">Upload File</div>
        <q-file
          dense
          outlined
          clearable
          :placeholder="img"
          v-model="img"
          bg-color="primary"
          label-color="white"
          label="Choose File"
          style="width: 150px"
          class="ellipsis"
          type="file"
          @update:model-value="handleUpload()"
        >
          <template v-slot:append> <q-icon name="o_file_upload" color="white" /></template>
        </q-file>
        <q-img :src="imgURL" v-if="imgURL"/>
      </div>
      <div class="row justify-center items-center q-mt-lg">
        <q-btn
          dense
          color="primary"
          @click="fetchData()"
          no-caps
          style="border-radius: 8px"
          class="q-px-xl q-mb-md"
          >Submit</q-btn
        >
      </div>
    </q-form>
    <div class="q-my-xl q-mx-auto" style="width: fit-content">
      <q-btn
        class="text-body1 rb-drop-shadow q-px-md q-py-none"
        label="Dashboard"
        icon="dashboard"
        color="primary"
        noCaps
        style="border-radius: 8px; height: 20px"
        @click="backdashboard"
      />
    </div>
  </div>
</template>

<script>
// import FormDate from 'src/components/general/Date.vue'
// import TimePicker from 'src/components/general/Time.vue'
import { ref } from 'vue'

export default {
  name: 'LostFound',
  setup() {
    return {
      model: ref('101'),
      options: ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110'],
      itemDesc: ref(''),
      location: ref(''),
      imgURL: ref(''),
      img: ref(null)
    }
  },
  data() {
    return {
      time: '',
      date: '',
      api: new this.$Api('impps')
    }
  },
  components: {
    // FormDate,
    // TimePicker
  },
  methods: {
    handleUpload() {
      if (this.img) {
        this.imgURL = URL.createObjectURL(this.img)
        this.trigger('positive', this.imgURL)
        console.log(this.img)
      }
    },
    getDate(d) {
      this.date = d
    },
    getTime(t) {
      this.time = `${this.date} ${t}`
    },
    backdashboard() {
      this.$router.go(-1)
      this.$nextTick(() => {
        this.trigger('ongoing', 'loading')
      })
    },
    fetchData() {
      const data = {
        reportDate: this.itemDesc,
        roomId: this.model,
        description: this.itemDesc,
        image: this.imgURL,
      }

      this.api.post(`lostfound`, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
        }
      })
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    }
  }
}
</script>

<style>
.rb-lostfound .q-field--outlined .q-field__control {
  border-radius: 8px;
}
.rb-lostfound .q-file .q-field__native {
  color: white;
}
.rb-lostfound .q-field__focusable-action {
  color: white;
}
</style>
