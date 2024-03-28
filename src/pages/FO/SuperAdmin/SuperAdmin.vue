<template>
    <div>
    <li v-for="(user, key, i) in users" :key="i">
      {{ user }}
    </li>
  </div>
  <q-page style="overflow-y: scroll; height: 100%">
    <div style="width: 100%; padding: 20px; justify-content: center">
      <q-card
        class="my-card text-white"
        style="background: radial-gradient(circle, #3fb22d 0%, #28a015 100%); padding: 10px"
      >
        <!-- style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)" -->
        <q-card-section>
          <div
            :class="classname + 'row items-center q-gutter-md'"
            style="display: flex; flex-wrap: wrap"
          >
            <img :src="user.picture" style="width: 100px; border-radius: 100%" />
            <div style="white-space: nowrap">
              <div>{{ time }}</div>
              <div>{{ date }}</div>
              <div class="text-weight-bold text-h6">Hello, {{ user.name }}</div>
              <div class="">{{ user.role.name }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <div class="container">
      <!-- style="
      overflow-x: auto;
      scrollbar-width: none;
      display: flex;
      width: fit-content;
      justify-content: left;
      margin-inline: auto;
      gap: 20px;
    " -->
      <q-btn class="child-card text-white" @click="changeroute('room')" to="/fo/super-admin/room">
        <div style="display: block; align: center; justify-content: center">
          <q-icon name="king_bed" size="xl" class="auto" />
          <div class="auto">Room</div>
        </div>
      </q-btn>
      <q-btn
        class="child-card text-white"
        @click="changeroute('access')"
        to="/fo/super-admin/access"
      >
        <div style="display: block; align: center; justify-content: center">
          <q-icon name="account_tree" size="xl" class="auto" />
          <div class="auto">Access</div>
        </div>
      </q-btn>
      <q-btn
        class="child-card text-white"
        @click="changeroute('article')"
        to="/fo/super-admin/article"
      >
        <div style="display: block; align: center; justify-content: center">
          <q-icon name="article" size="xl" class="auto" />
          <div class="auto">Article</div>
        </div>
      </q-btn>
    </div>
  </q-page>
</template>

<script>
import UserGreet from 'src/components/HK/IMPPS/General/UserGreet.vue'
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'
import socket from '../../../services/socket/socket'

export default defineComponent({
  name: 'super-admin',
  setup() {
    return {}
  },
  data() {
    return {
      api: new this.$Api('superadmin'),
      user: this.$AuthStore.getUser(),
      users: ref([])
    }
  },
  mounted(){
    socket.connect()
    socket.on('online', (onlineUsers) => {
      console.log(onlineUsers)
      this.users = onlineUsers
    })
  },
  watch: {},
  method: {
    changeroute(state) {
      if (state == 'room') {
        this.$router.push({
          name: 'super-admin',
          params: { resvId: resvId, resvRoomId: resvRoomId },
          query: { line: 'room' }
        })
      } else if (state == 'article') {
        this.$router.push({
          name: 'article-admin',
          params: { resvId: resvId, resvRoomId: resvRoomId },
          query: { line: 'room' }
        })
      } else if (state == 'access') {
        this.$router.push({
          name: 'access-admin',
          params: { resvId: resvId, resvRoomId: resvRoomId },
          query: { line: 'room' }
        })
      }
    }
  }
})
</script>

<style>
.my-card {
  width: 100%;
  max-width: 600px;
  margin-inline: auto;
}
.container {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.child-card {
  /* width: 100%;
  max-width: 200px; */
  /* margin-inline: auto; */
  background: radial-gradient(circle, #354b318e 0%, #3d5c3988 100%);
  padding: 80px 100px;
  margin-top: 50px;
}
.auto {
  width: 100%;
  margin: auto;
  text-align: center;
}

@media (max-width: 780px) {
  .container {
    display: block;
    text-align: center;
    width: 100%;
  }
  .child-card {
    width: 90%;
  }
}
</style>
