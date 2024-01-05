<template>
  <div class="q-my-lg row no-wrap q-gutter-md">
    <div class="">
      <q-img
        :src="roomImage || '/src/assets/img/thumbnaul-form.png'"
        class="width-image rounded-borders"
      />
    </div>

    <div class="col-grow">
      <div class="row q-gutter-xs">
        <!-- create new reservation  -->
        <q-btn flat square color="primary" class="border-button rounded-borders">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H16V20H14V17H11V15H14V12H16V15H19Z"
              fill="#008444"
            />
          </svg>
        </q-btn>

        <!-- edit reservation  -->
        <q-btn flat square color="primary" class="border-button rounded-borders">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M8 13.5C8.8 13.5 9.57 13.43 10.31 13.32L13.22 10.41C11.89 11.09 10 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.63L15.39 8.24C15.57 8.06 15.78 7.92 16 7.8V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.54 3.06 18.22 7 18.47V16.63L7.17 16.46C3.84 16.26 2 14.96 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5ZM8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5ZM15.13 11.33L17.17 13.37L11.04 19.5H9V17.46L15.13 11.33ZM18.85 11.69L17.87 12.67L15.83 10.63L16.81 9.65C17 9.45 17.33 9.45 17.53 9.65L18.85 10.97C19.05 11.17 19.05 11.5 18.85 11.69Z"
              fill="#008444"
            />
          </svg>
        </q-btn>

        <!-- remove reservation  -->
        <q-btn
          @click="removeRoomResv"
          flat
          square
          color="primary"
          class="border-button rounded-borders"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
          >
            <path
              d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H11V15H19Z"
              fill="#008444"
            />
          </svg>
        </q-btn>

        <q-space />

        <q-btn
          flat
          square
          color="primary"
          icon="o_add_home"
          class="border-button rounded-borders"
          style="padding-top: 0; padding-bottom: 0"
        />

        <!-- show modal to create card's credential: KTP, SIM, address  -->
        <q-btn
          flat
          square
          color="primary"
          icon="o_badge"
          class="border-button rounded-borders"
          style="padding-top: 0; padding-bottom: 0"
          @click="dialogpayment = true"
        />

        <q-dialog v-model="dialogpayment">
          <q-card>
            <q-card-section class="items-center q-pb-none">
              <div class="row items-center">
                <div class="text-sm text-bold">Input Your Id Card Number KTP/SIM</div>
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
              <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
            </q-card-section>

            <q-card-section>
              <div class="row items-center" style="justify-content: space-between">
                <div>Name on Id card</div>
                <div style="display: flex">
                  <q-btn
                    flat
                    v-model="isKtpSelected"
                    square
                    dense
                    class="q-px-sm"
                    :class="{ 'background-primary': isKtpSelected }"
                    style="
                      border: 1.5px #eeeeee solid;
                      height: fit-content;
                      border-radius: 10px 0px 0px 10px;
                    "
                    @click="toggleKtpSelected"
                  >
                    KTP
                  </q-btn>
                  <q-btn
                    flat
                    square
                    v-model="isSimSelected"
                    dense
                    class="q-px-sm"
                    :class="{ 'background-primary': isSimSelected }"
                    style="
                      border: 1.5px #eeeeee solid;
                      height: fit-content;
                      border-radius: 0px 10px 10px 0px;
                    "
                    @click="toggleSimSelected"
                  >
                    SIM
                  </q-btn>
                </div>
              </div>
              <q-input dense outlined v-model="nameidcard" class="q-mt-sm" style="width: " />
              <div class="q-mt-sm">Id Card Number</div>
              <q-input dense outlined v-model="idcardnumber" class="q-mt-sm" style="width: 360px" />

              <div class="q-mt-sm">Address</div>
              <q-input dense outlined v-model="address" class="q-mt-sm" style="width: 360px" />

              <div class="row q-mt-sm" style="justify-content: space-between">
                <q-btn
                  outline
                  square
                  color="black"
                  dense
                  class="rounded-borders text-capitalize text-black"
                  style="width: 60px"
                >
                  Cancel
                </q-btn>
                <q-btn
                  flat
                  square
                  dense
                  class="rounded-borders text-capitalize"
                  style="background-color: #069550; color: white; width: 50px"
                >
                  Add
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </q-dialog>
      </div>

      <q-input
        dense
        outlined
        v-model="guestName"
        label="Guest Name/ No Handphone"
        class="q-mt-sm width-full"
      />

      <div style="gap: 8px" class="row no-wrap items-center q-mt-sm">
        <div class="bg-primary-tint text-primary text-bold q-px-sm rounded-borders">
          {{ resvNo || '#ResNo' }}
        </div>

        <q-select
          outlined
          dense
          v-model="resvResource"
          :options="resvResourceOpts"
          label="Reservation Resource"
          dropdown-icon="expand_more"
          class="col-grow"
        />
      </div>

      <div style="gap: 8px" class="row no-wrap q-mt-sm">
        <q-select
          outlined
          dense
          v-model="roomType"
          :options="roomTypeOpts"
          label="RmType"
          dropdown-icon="expand_more"
          class="full-width"
        />

        <q-select
          outlined
          dense
          v-model="roomNo"
          :options="roomNoOpts"
          label="Room No"
          dropdown-icon="expand_more"
          class="full-width"
        />

        <q-select
          outlined
          dense
          v-model="roomBed"
          :options="roomBedOpts"
          label="Type Bed"
          dropdown-icon="expand_more"
          class="full-width"
        >
          <template v-slot:option="roomBedOpts">
            <q-item v-bind="roomBedOpts.itemProps">
              <q-item-section avatar>
                <div class="flex justify-center">
                  <q-icon size="24px" :name="roomBedOpts.opt.icon" />
                  <q-icon
                    size="24px"
                    :name="roomBedOpts.opt.icon"
                    v-if="roomBedOpts.opt.label === 'TWIN'"
                  />
                </div>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ roomBedOpts.opt.label }}</q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>

      <q-separator class="q-my-sm bg-grey" size="1px" />

      <div class="text-bold q-mt-sm">Arrival &nbsp;&nbsp;&nbsp;Depart &nbsp;&nbsp;&nbsp;Night</div>

      <q-btn-dropdown
        flat
        outlined
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="arrivalDepartLabel"
        icon="o_calendar_today"
        dropdown-icon="o_expand_more"
      >
        <q-date v-model="arrivalDepart" range />
      </q-btn-dropdown>

      <div class="text-bold q-mt-sm">Adult &nbsp;&nbsp;&nbsp;Child &nbsp;&nbsp;&nbsp;Baby</div>

      <q-btn-dropdown
        flat
        outlined
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="guestsLabel"
        icon="meeting_room"
        dropdown-icon="o_expand_more"
      >
        <q-list style="width: 200px">
          <q-item>
            <q-item-section>
              <div style="display: flex; align-items: center; justify-content: space-between">
                <div>Adult</div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('adult', -1)"
                    :disable="guests.adult <= 1"
                  >
                    <q-icon name="remove" color="white" size="16px" />
                  </q-btn>

                  <div>{{ guests.adult }}</div>

                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('adult', 1)"
                    ><q-icon name="add" color="white" size="16px" />
                  </q-btn>
                </div>
              </div>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              ><div style="display: flex; align-items: center; justify-content: space-between">
                <div>Child</div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('child', -1)"
                    :disable="guests.child < 1"
                  >
                    <q-icon name="remove" color="white" size="16px" />
                  </q-btn>

                  <div>{{ guests.child }}</div>

                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('child', 1)"
                    ><q-icon name="add" color="white" size="16px" />
                  </q-btn>
                </div></div
            ></q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              ><div style="display: flex; align-items: center; justify-content: space-between">
                <div>Baby</div>
                <div style="display: flex; align-items: center; gap: 10px">
                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('baby', -1)"
                    :disable="guests.baby < 1"
                  >
                    <q-icon name="remove" color="white" size="16px" />
                  </q-btn>

                  <div>{{ guests.baby }}</div>

                  <q-btn
                    flat
                    dense
                    square
                    style="background-color: #069550"
                    @click="updateGuestsCount('baby', 1)"
                    ><q-icon name="add" color="white" size="16px" />
                  </q-btn>
                </div></div
            ></q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>

    <div class="col-grow">
      <div class="row no-wrap items-center" style="gap: 8px">
        <div class="text-bold">Res Status:</div>
        <q-select
          outlined
          dense
          v-model="resvStatus"
          :options="resvStatusOpts"
          label="Status"
          dropdown-icon="expand_more"
          style="width: 100px"
        />

        <q-space />

        <div style="display: flex">
          <q-btn
            flat
            square
            v-model="isRbSelected"
            dense
            class="q-px-sm"
            :class="{ 'background-primary': isRbSelected }"
            style="
              border: 1.5px #eeeeee solid;
              height: fit-content;
              border-radius: 10px 0px 0px 10px;
            "
            @click="toggleRbSelected"
          >
            RB
          </q-btn>
          <q-btn
            flat
            square
            v-model="isRoSelected"
            dense
            class="q-px-sm"
            :class="{ 'background-primary': isRoSelected }"
            style="
              border: 1.5px #eeeeee solid;
              height: fit-content;
              border-radius: 0px 10px 10px 0px;
            "
            @click="toggleRoSelected"
          >
            RO
          </q-btn>
        </div>
      </div>

      <q-separator class="q-my-sm bg-grey" size="1px" />

      <q-expansion-item
        label="Room Rate: Rp 0.00"
        class="padding-expansion q-pa-none"
        dense
        style="font-weight: bold"
      >
        <q-card>
          <q-table
            style="height: 140px"
            dense
            :rows-per-page-options="[0]"
            virtual-scroll
            :rows="rows"
            hide-pagination
            selection="multiple"
            class="rows-table q-px-none"
            :columns="columns"
            row-key="date"
            v-model:selected.sync="selected"
          />
        </q-card>
        <q-btn
          unelevated
          dense
          to="/fo/guest-invoice"
          class="q-mt-sm text-capitalize q-px-sm"
          color="primary"
          label="Invoice"
        />
      </q-expansion-item>

      <div style="display: flex; justify-content: space-between" class="q-mt-sm">
        <p class="text-bold q-ma-none">Balance:</p>
        <p class="text-bold q-ma-none">Rp {{ balance }}</p>
      </div>

      <q-separator class="q-mt-sm bg-grey" size="1px" />
    </div>

    <div class="col-grow">
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Reservation Remarks"
        class="padding-expansion"
      >
        <q-card>
          <q-input v-model="resvRemark" label="Note..." dense outlined type="textarea" />
        </q-card>
      </q-expansion-item>

      <div style="gap: 8px" class="q-mt-sm row no-wrap items-center">
        <q-btn label="Reservation" outline color="primary" dense class="text-capitalize col-grow" />
        <q-btn label="Check-In" unelevated color="primary" dense class="text-capitalize col-grow" />
        <q-btn label="Check-Out" outline color="grey" dense class="text-capitalize col-grow" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'GuestForm',
  setup() {
    const isRbSelected = ref(false)
    const isRoSelected = ref(false)
    const isKtpSelected = ref(false)
    const isSimSelected = ref(false)

    const columns = [
      {
        required: true,
        name: 'date',
        label: 'Date',
        align: 'center',
        field: 'date'
      },
      { required: true, name: 'rate', align: 'center', label: 'Rate', field: 'rate' },
      { required: true, name: 'arrangement', label: 'Arrangement', field: 'arrangement' }
    ]

    const rows = [
      {
        date: '12/02/2023',
        rate: '530,00.00',
        arrangement: 'RB'
      },
      {
        date: '12/02/2024',
        rate: '540,00.00',
        arrangement: 'RO'
      },
      {
        date: '12/02/2025',
        rate: '530,00.00',
        arrangement: 'RB'
      },
      {
        date: '13/02/2023',
        rate: '550,00.00',
        arrangement: 'RB'
      }
    ]

    function toggleRbSelected() {
      isRbSelected.value = !isRbSelected.value
      isRoSelected.value = false // Reset the state of RO button
    }

    function toggleRoSelected() {
      isRoSelected.value = !isRoSelected.value
      isRbSelected.value = false // Reset the state of RB button
    }

    function toggleKtpSelected() {
      isKtpSelected.value = !isKtpSelected.value
      isSimSelected.value = false // Reset the state of SIM button
    }

    function toggleSimSelected() {
      isSimSelected.value = !isSimSelected.value
      isKtpSelected.value = false // Reset the state of KTP button
    }

    return {
      roomImage: ref(''),
      guestName: ref(''),
      resvNo: ref(''),
      resvResource: ref(null),
      resvResourceOpts: ['Individual reservation', 'Walk In'],
      arrivalDepart: ref({ from: null, to: null }),
      arrivalDepartLabel: ref('Arrival - Depature, 1 Nights'),
      guests: ref({ adult: 1, child: 0, baby: 0 }),
      guestsLabel: ref('1 Adult, 0 Child, 0 Baby'),
      resvStatus: ref(null),
      resvStatusOpts: ref([]),
      balance: ref(0),
      resvRemark: ref(''),
      roomNo: ref(null),
      roomType: ref(null),
      roomBed: ref(null),
      roomNoOpts: ref([]),
      roomTypeOpts: ref([]),
      roomBedOpts: ref([]),
      loading: ref(false),

      isRbSelected,
      isRoSelected,
      toggleRbSelected,
      toggleRoSelected,
      isKtpSelected,
      isSimSelected,
      toggleKtpSelected,
      toggleSimSelected,
      dialogpayment: ref(false),
      columns,
      rows,
      nameidcard: ref(''),
      idcardnumber: ref(''),
      address: ref(''),
      selected: ref([])
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      availRooms: []
    }
  },
  mounted() {
    this.getResvProps()

    if (this.$ResvStore.currentRoomResvId) {
      this.getDetailResvRoom()
    }

    watch(
      () => this.$ResvStore.currentRoomResvId,
      () => {
        this.getDetailResvRoom()
        this.getResvProps()
      }
    )
    watch(
      () => [this.roomNo, this.roomBed, this.roomType],
      () => {
        this.isRoomExist()
      }
    )
  },
  watch: {
    availRooms: {
      handler() {
        this.formatAvailableRoom()
      }
    },
    'arrivalDepart.from': {
      immediate: true,
      handler() {
        this.formatArrivalDepart()
      }
    },
    'arrivalDepart.to': {
      immediate: true,
      handler() {
        this.formatArrivalDepart()
      }
    },
    guests: {
      handler() {
        this.updateGuestsCountLabel()
      },
      deep: true
    }
  },
  methods: {
    isRoomExist() {
      if (this.roomType == null || this.roomNo == null || this.roomBed == null) return

      this.availRooms.filter(
        (r) =>
          r.roomType == this.roomType && r.id == this.roomNo && r.bedSetup == this.roomBed.value
      ).length < 1
        ? this.$Helper.showNotif('Room Unavailable', '', 'warning')
        : this.$Helper.showNotif('Room Available', '', 'positive')
    },
    roomBedMapper(bed) {
      let obj = {
        label: bed,
        value: bed
      }

      if (bed == 'KING') obj['icon'] = 'o_king_bed'
      if (bed == 'TWIN') obj['icon'] = 'o_single_bed'
      if (bed == 'SINGLE') obj['icon'] = 'o_single_bed'

      return obj
    },
    formatAvailableRoom() {
      function getUniqueValues(data, key) {
        const uniqueValues = [...new Set(data.map((item) => item[key]))]
        return uniqueValues
      }

      const room = this.availRooms
      this.roomNoOpts = getUniqueValues(room, 'id')
      this.roomTypeOpts = getUniqueValues(room, 'roomType')
      this.roomBedOpts = getUniqueValues(room, 'bedSetup').map(this.roomBedMapper)
    },
    formatArrivalDepart() {
      if (this.arrivalDepart.from && this.arrivalDepart.to) {
        const fromDate = new Date(this.arrivalDepart.from)
        const toDate = new Date(this.arrivalDepart.to)

        const options = {
          month: 'numeric',
          day: 'numeric'
        }

        const formattedFromDate = fromDate.toLocaleDateString('en-gb', options)
        const formattedToDate = toDate.toLocaleDateString('en-gb', options)

        const diffTime = Math.abs(toDate - fromDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        this.arrivalDepartLabel = `${formattedFromDate} - ${formattedToDate}, ${diffDays} Nights`
      }
    },
    updateGuestsCount(type, value) {
      this.guests[type] = Math.max(0, this.guests[type] + value)
    },
    updateGuestsCountLabel() {
      this.guestsLabel = `${this.guests['adult']} Adult, ${this.guests['child']} Child, ${this.guests['baby']} Baby`
    },
    removeRoomResv() {
      this.$ResvStore.clearData()

      this.resvNo = ''
      this.guestName = ''
      this.resvResource = null
      this.arrivalDepart = { from: null, to: null }
      this.arrivalDepartLabel = 'Arrival - Depature, 1 Nights'
      this.guests = { adult: 1, baby: 0, child: 0 }
      this.resvStatus = null
      this.resvRemark = ''
      this.roomImage = ''
      this.roomNo = null
      this.roomType = null
      this.roomBed = null
    },
    getResvProps() {
      this.api.get('/page/detail/reservation/0/0/create', ({ status, data }) => {
        if (status == 200) {
          const { reservationStatus, availableRooms } = data

          this.resvStatusOpts = reservationStatus.map((st) => {
            return {
              label: st.description,
              value: st.id
            }
          })
          this.availRooms = [...this.availRooms, ...availableRooms]
        }
      })
    },
    getDetailResvRoom() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore

      if (currentResvId == 0 || currentRoomResvId == 0) return

      this.loading = true
      this.resvNo = currentResvId

      this.api.get(
        `/page/detail/reservation/${currentResvId}/${currentRoomResvId}`,
        ({ status, data }) => {
          this.loading = false

          if (status == 200) {
            const { reservation, room, arrangment, balance } = data

            this.guestName = reservation.reserver.guest.name
            this.resvResource = reservation.reserver.resourceName
            this.arrivalDepart = { from: reservation.arrivalDate, to: reservation.departureDate }
            this.guests = {
              adult: reservation.manyAdult,
              child: reservation.manyChild,
              baby: reservation.manyBaby
            }
            this.resvStatus = {
              value: reservation.resvStatus.id,
              label: reservation.resvStatus.description
            }
            this.resvRemark = reservation.reservationRemarks
            this.roomImage = room.roomImage
            this.roomNo = room.id
            this.roomType = room.roomType
            this.roomBed = [room.bedSetup].map(this.roomBedMapper)[0]
            this.availRooms = [
              ...this.availRooms,
              { id: room.id, roomType: room.roomType, bedSetup: room.bedSetup }
            ]
          }
        }
      )
    }
  }
})
</script>

<style scoped>
.background-primary {
  background-color: #069550 !important;
  color: white;
}
</style>
