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
        <q-btn flat square color="primary" class="border-button rounded-borders" @click="refresh()">
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
        <q-btn
          flat
          square
          color="primary"
          class="border-button rounded-borders"
          @click="updateData()"
        >
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
          @click="removeRoomResv()"
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
          @click="newResvroom()"
          :disabled="!this.$ResvStore.currentRoomResvId"
        />

        <!-- show modal to create card's credential: KTP, SIM, address  -->
        <q-btn
          flat
          square
          color="primary"
          icon="o_badge"
          class="border-button rounded-borders"
          style="padding-top: 0; padding-bottom: 0"
          @click="getdataCard(true)"
          :disabled="!this.$ResvStore.currentRoomResvId"
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
                    @click="toggleKtpSelected && KTPSelected()"
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
                    @click="toggleSimSelected && SIMSelected()"
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
                  @click="dialogpayment = false"
                >
                  Cancel
                </q-btn>
                <q-btn
                  flat
                  square
                  dense
                  @click="CardId()"
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
        :outlined="!$ResvStore.fix"
        :borderless="$ResvStore.fix"
        :readonly="$ResvStore.fix"
        :disable="$ResvStore.logc"
        v-model="guestName"
        :label="!$ResvStore.fix ? 'Guest Name/ No Handphone' : ''"
        class="q-mt-sm width-full"
        :class="$ResvStore.fix ? 'q-my-sm text-bold' : 'q-mt-sm'"
      />

      <div
        style="gap: 10px"
        class="row no-wrap items-center"
        :class="$ResvStore.fix ? 'q-my-sm' : 'q-mt-sm'"
      >
        <div
          style="margin-top: auto; margin-bottom: auto; display: flex; width: 100%; padding: auto"
          class="row text-bold"
        >
          <div
            class="bg-primary-tint text-primary text-bold q-px-md rounded-borders text-center q-my-auto q-mr-sm"
          >
            {{ resvNo || '#ResNo' }}
          </div>
          <q-select
            dense
            v-if="!$ResvStore.fix"
            :outlined="!$ResvStore.fix"
            v-model="resvRecource"
            :options="resvRecourceOpts"
            :borderless="$ResvStore.fix"
            :disable="$ResvStore.logc"
            :readonly="$ResvStore.fix"
            :dropdown-icon="!$ResvStore ? 'expand_more' : ''"
            :label="!$ResvStore.fix ? 'Reservation Resource' : ''"
            class="col-grow text-center q-my-auto"
          />

          <div v-if="$ResvStore.fix">{{ resvRecource }}</div>
        </div>
      </div>

      <div
        style="gap: 10px; width: 100%; display: flex"
        class="q-mt-sm text-bold row"
        v-if="$ResvStore.fix"
      >
        <div class="">
          {{ roomType + ' (' + selected.id.split('-')[0] + ')' }}
        </div>
        <div class="">{{ roomNo }}</div>
        <div class="">{{ roomBed.label + ' ' }} Bed</div>
      </div>
      <div v-if="!$ResvStore.fix" style="gap: 8px" class="row no-wrap q-mt-sm">
        <q-select
          dense
          v-model="roomType"
          :outlined="!$ResvStore.fix"
          :borderless="$ResvStore.fix"
          :readonly="$ResvStore.fix"
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
          dropdown-icon="expand_more"
          class="full-width"
          option-label="value"
          label="Type Bed"
        >
        </q-select>
      </div>

      <q-separator class="q-my-sm bg-grey" size="1px" />

      <div class="text-bold q-mt-sm">Arrival &nbsp;&nbsp;&nbsp;Depart &nbsp;&nbsp;&nbsp;Night</div>

      <q-btn
        v-if="$ResvStore.fix"
        flat
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="arrivalDepartLabel"
        icon="o_calendar_today"
        :disable="$ResvStore.logc"
        :outlined="!$ResvStore.fix"
        :borderless="!$ResvStore.fix"
        :readonly="$ResvStore.fix"
      >
      </q-btn>

      <q-btn-dropdown
        v-if="!$ResvStore.fix"
        flat
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="arrivalDepartLabel"
        icon="o_calendar_today"
        :disable="$ResvStore.logc"
        outlined
      >
        <q-date v-model="arrivalDepart" range />
      </q-btn-dropdown>

      <div class="text-bold q-mt-sm">Adult &nbsp;&nbsp;&nbsp;Child &nbsp;&nbsp;&nbsp;Baby</div>

      <q-btn
        v-if="$ResvStore.fix"
        flat
        outlined
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="guestsLabel"
        :readonly="$ResvStore.fix"
        :disable="$ResvStore.logc"
        icon="meeting_room"
        dropdown-icon="o_expand_more"
      ></q-btn>
      <q-btn-dropdown
        v-if="!$ResvStore.fix"
        flat
        outlined
        dense
        class="text-capitalize dropdown-date full-width"
        style="border: 1px #00000030 solid"
        :label="guestsLabel"
        icon="meeting_room"
        dropdown-icon="o_expand_more"
        :disable="$ResvStore.logc"
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
      <div class="row no-wrap items-center" style="gap: 2px">
        <div class="text-bold">Res Status:</div>
        <div class="q-pa-md">
          <q-btn-dropdown
            color="primary"
            :disable="$ResvStore.logc"
            :label="resvStatus.label || resvStatus.description || 'Status'"
            outline
          >
            <q-list>
              <q-item
                v-for="(option, index) in dropdownOptions"
                :key="index"
                clickable
                v-close-popup
                @click="onItemClick(option.value, option.description)"
              >
                <q-item-section>
                  <q-item-label>{{ option.description }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>

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
              pointer-events: none;
              border-radius: 10px 0px 0px 10px;
            "
            :disabled="this.$ResvStore.currentRoomResvId"
            @click="checkedCode('RB')"
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
            :disabled="this.$ResvStore.currentRoomResvId"
            style="
              border: 1.5px #eeeeee solid;
              height: fit-content;
              pointer-events: none;
              border-radius: 0px 10px 10px 0px;
            "
            @click="checkedCode('RO')"
          >
            RO
          </q-btn>
        </div>
      </div>

      <q-separator class="q-my-sm bg-grey" size="1px" />

      <q-expansion-item
        :label="selected.id ? 'Room Rate: ' + selected.id : 'Room Rate: '"
        class="padding-expansion q-pa-none"
        dense
        style="font-weight: bold"
      >
        <div v-for="row in resultRows" :key="row.id" clickable @click="selectRow(row)">
          <div style="display: flex; width: 100%">
            <q-radio selection="single" v-model="selected" :val="row" @click="checked(row.id)" />

            <div style="display: flex; justify-content: space-around; margin: auto; width: 100%">
              <div>{{ row.id.split('-')[0] }}</div>
              <div>{{ row.rate }}</div>
              <div>{{ row.id.split('-')[1] }}</div>
            </div>
          </div>
          <q-separator horizontal class="q-ma-xs" />
        </div>
        <q-btn
          unelevated
          dense
          class="q-mt-sm text-capitalize q-px-sm"
          color="primary"
          @click="redirectToInvoice"
          label="Invoice"
        />
      </q-expansion-item>

      <div style="display: flex; justify-content: space-between" class="q-mt-sm">
        <p class="text-bold q-ma-none">Balance:</p>
        <p class="text-bold q-ma-none">{{ selected.rate ? 'Rp ' + selected.rate : 'Rp 0' }}</p>
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
          <q-input :disable="$ResvStore.logc" v-model="resvRemark" label="Note..." dense outlined type="textarea" />
        </q-card>
      </q-expansion-item>

      <div style="gap: 8px" class="q-mt-sm row no-wrap items-center">
        <q-btn
          label="Reservation"
          outline
          color="primary"
          dense
          class="text-capitalize col-grow"
          @click="createData()"
        />
        <q-btn
          label="Check-In"
          unelevated
          color="primary"
          dense
          :disabled="!this.$ResvStore.currentRoomResvId"
          class="text-capitalize col-grow"
          @click="postcheckin()"
        />
        <q-btn
          label="Check-Out"
          outline
          color="grey"
          dense
          :disabled="!this.$ResvStore.currentRoomResvId"
          class="text-capitalize col-grow"
          @click="postcheckout()"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, watch, provide, inject } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'GuestForm',
  setup() {
    const data = 'Ini adalah data yang akan dikirim'
    const isRbSelected = ref(false)
    const isRoSelected = ref(false)
    const isKtpSelected = ref(false)
    const isSimSelected = ref(false)
    const $q = useQuasar()
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

    const rows = []
    const resultRows = ref([])
    const status = []

    const arrangmentList = [
      {
        id: 'DLX-RB',
        rate: 530000
      },
      {
        id: 'DLX-RO',
        rate: 500000
      },
      {
        id: 'FML-RB',
        rate: 530000
      },
      {
        id: 'FML-RO',
        rate: 530000
      },
      {
        id: 'STD-RB',
        rate: 330000
      },
      {
        id: 'STD-RO',
        rate: 300000
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
      fix: false,
      includeTax: false,
      roomImage: ref(''),
      guestName: ref(''),
      resvNo: ref(''),
      arrivalDepart: ref({ from: null, to: null }),
      arrivalDepartLabel: ref('Arrival - Depature, 1 Nights'),
      guests: ref({ adult: 1, child: 0, baby: 0 }),
      guestsLabel: ref('1 Adult, 0 Child, 0 Baby'),
      resvStatusOpts: ref([['DLX', 'FML', 'STD']]),
      balance: ref(0),
      resvRemark: ref(''),
      //
      roomNo: ref(null),
      roomType: ref(null),
      roomBed: ref(null),
      roomNoOpts: [],
      //
      roomTypeOpts: ref(['DLX', 'FML', 'STD']),
      roomBedOpts: [
        { label: 'K', value: 'KING' },
        { label: 'T', value: 'TWIN' },
        { label: 'S', value: 'SINGLE' }
      ],
      // roomBedOpts: [],
      loading: ref(false),
      isRbSelected,
      isRoSelected,
      toggleRbSelected,
      toggleRoSelected,
      isKtpSelected,
      isSimSelected,
      CardIdselect: ref(''),
      toggleKtpSelected,
      toggleSimSelected,
      dialogpayment: ref(false),
      setRow: ref(),
      columns,
      optionValue: ref(''),
      status,
      rows,
      resultRows,
      newSetRow: ref(),
      nameidcard: ref(''),
      idcardnumber: ref(''),
      address: ref(''),
      resultStatus: ref(''),
      showDropdown: false,
      dropdownOptions: [
        { value: '1', description: 'Guaranted' },
        { value: '2', description: '6 PM' },
        { value: '3', description: 'Tentative' }
      ],
      arrangmentList,
      selectedOption: null,
      resvRecource: ref(null),
      resvRecourceOpts: ['Individual reservation', 'Walk In'],
      arrangmentCode: ref(''),
      selected: ref([]),
      selectedstatus: ref(),
      resvStatus: ref([]),
      descSelect: ref(''),
      arrangmentValue: ref([])
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
  },
  created() {
    for (let i = 101; i <= 110; i++) {
      this.roomNoOpts.push(i)
    }
  },
  watch: {
    includeTax() {
      this.calculateTotal() // Panggil method calculateTotal() saat status checkbox berubah
    },
    roomType: {
      handler(oldval, newval) {
        this.resultRows = this.rows.filter((r) => {
          console.log(r)
          console.log(newval)
          console.log(oldval)
          return r.date == oldval
        })
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
    redirectToInvoice() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      this.$router.push({
        name: 'guest-invoice',
        params: { resvId: currentResvId, resvRoomId: currentRoomResvId }
      })
    },
    kirimData() {},
    setRoww() {
      return {
        roomId: this.roomNo ? this.roomNo : 1,
        roomType: this.roomType,
        roomBed: this.roomBed.label,
        arrangmentCode: this.selected && this.selected.id ? this.selected.id : ''
      }
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
    formatArrivalDepart() {
      if (this.arrivalDepart.from && this.arrivalDepart.to) {
        const fromDate = new Date(this.arrivalDepart.from)
        const toDate = new Date(this.arrivalDepart.to)
        console.log(this.arrivalDepart.to)
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
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        this.api.delete(`detail/reservation/${currentResvId}/${currentRoomResvId}/delete`)
        window.location.reload()
      } catch (error) {
        console.error(error)
      }
    },
    getResvProps() {
      this.api.get(`detail/reservation/1/1/create`, ({ status, data }) => {
        this.loading = false
        if (status === 200) {
          const { arrangmentCode } = data
          const formattedRoomRates = this.formatRoomrate(arrangmentCode) // Menggunakan nilai dari arrangment
          this.rows = formattedRoomRates
          this.resultRows = formattedRoomRates
          console.log(data)
        }
      })
    },
    selectRow(row) {
      this.selected = row
      console.log(this.selected)
      this.calculateTotal()
    },
    calculateTotal() {
      if (this.selected) {
        this.balance = this.selected.value

        if (this.includeTax) {
          this.balance += this.calculateTax(this.balance)
        }

        console.log(this.balance)
      }
    },
    triggerPositive(message) {
      this.$q.notify(
        {
          type: 'positive',
          message: message || 'Data Succesfully',
          timeout: 1000
        },
        4000
      )
    },
    triggerNegative(message) {
      this.$q.notify(
        {
          type: 'negative',
          message: message || 'No Data',
          timeout: 1000
        },
        4000
      )
    },
    calculateTax(subtotal) {
      return subtotal * 0.1
    },
    async newResvroom() {
      // create get date time for new reservation room
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        const data = {
          arrangmentCode: this.selected.id,
          roomId: this.roomNo
        }
        if (currentResvId == 0 || currentRoomResvId == 0) return
        this.loading = true
        await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/add-room`,
          data,
          ({ status, data }) => {
            if (status == 200) {
              console.log(data)
              this.loading = false
              this.triggerPositive('Create new room successfully')
              this.refresh()
            } else {
              console.error('Gagal mengirim data')
            }
          }
        )
      } catch (error) {
        console.error('error : ' + error)
      }
    },
    async postcheckin() {
      // create get date time for checkin reservation
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        if (currentResvId == 0 || currentRoomResvId == 0) return
        this.loading = true
        const response = await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/change-progress/checkin`,
          null,
          ({ status, data }) => {
            this.loading = false
            if (status == 200) {
              this.triggerPositive('Check-in Successfully')
              console.log(response.data)
            }
          }
        )
      } catch (error) {
        console.error('error : ' + error)
      }
    },
    async postcheckout() {
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        if (currentResvId == 0 || currentRoomResvId == 0) return

        this.loading = true
        await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/change-progress/checkout`,
          null,
          ({ status, data }) => {
            this.loading = false
            if (status == 200) {
              this.triggerPositive('Check-out successfully')
            }
          }
        )
      } catch (error) {
        console.error('error : ' + error)
      }
    },
    getDetailResvRoom() {
      const { currentResvId, currentRoomResvId, fix } = this.$ResvStore

      if (currentResvId == 0 || currentRoomResvId == 0) return
      this.fix = true ? (this.fix = fix) : false
      this.loading = true
      this.resvNo = currentResvId
      this.api.get(
        `detail/reservation/${currentResvId}/${currentRoomResvId}/edit`,
        ({ status, data, message }) => {
          this.loading = false
          console.log('test')
          if (status == 200) {
            this.triggerPositive(message)
            const { reservation, room, arrangment, balance } = data.reservation
            const { reservationStatus, arrangmentCode, availableRooms } = data.data

            this.guestName = `${reservation.reserver.guest.name}/${reservation.reserver.guest.contact}`
            this.resvRecource = reservation.reserver.resourceName
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
            this.arrangmentValue = { id: arrangment.id, rate: arrangment.rate }
            this.resvRemark = reservation.reservationRemarks
            this.roomImage = room.roomImage
            this.roomNo = room.id
            this.roomType = room.roomType
            this.roomBed = [room.bedSetup].map(this.roomBedMapper)[0]
            this.availRooms = [
              ...this.availRooms,
              { id: room.id, roomType: room.roomType, bedSetup: room.bedSetup }
            ]
            const formattedRoomRates = this.formatRoomrate(arrangmentCode) // Menggunakan nilai dari arrangment
            this.rows = formattedRoomRates
            this.resultRows = formattedRoomRates
            const formattedStatus = this.formatedStatus(reservationStatus)
            this.status = formattedStatus

            // this.resultStatus = this.checkData(reservation.description)
            // this.arrangmentCode = { id: arrangment.id, rate: arrangment.rate }
          }
          console.log(this.arrangmentValue.id.split('-')[1])
          this.selectRow(this.arrangmentValue)
          this.checkedCode(this.arrangmentValue.id.split('-')[1])
          // connsole.log(this.rows)
          console.log(this.resvStatus.label)
        }
      )
    },
    formatRoomrate(map = []) {
      const rmt = []
      map.forEach((dt) => {
        const { id, rate } = dt
        console.log(dt)
        rmt.push({
          id,
          date: id.split('-')[0],
          rate: rate,
          arrangement: id.split('-')[1]
        })
      })
      console.log(rmt)
      return rmt
    },
    formattedStatus(map = []) {
      const rms = []
      map.forEach((dt) => {
        const { id, rate } = dt
        console.log(dt)
        rms.push({
          id,
          date: id.split('-')[0],
          rate: rate,
          arrangement: id.split('-')[1]
        })
      })
      console.log(rms)
      return rms
    },
    checkCardIdselect(data) {
      if (data == 'KTP') {
        this.KTPSelected()
        this.isKtpSelected = true
        this.isSimSelected = false
      } else if (data == 'SIM') {
        this.SIMSelected()
        this.isKtpSelected = false
        this.isSimSelected = true
      }
    },
    getdataCard(condition) {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      this.dialogpayment = condition
      try {
        this.api.get(`detail/reservation/${currentResvId}/idcard`, ({ status, data }) => {
          if (status === 200) {
            ;(this.nameidcard = data.name),
              (this.CardIdselect =
                data.carIdentifier && this.checkCardIdselect(data.carIdentifier)),
              (this.idcardnumber = data.cardId),
              (this.address = data.address)
            console.log(data)
            if (this.nameidcard != '') {
              this.triggerPositive('get data succesfully')
            }
          }
        })
      } catch (error) {
        console.error('error' + error)
      }
    },
    async createData() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      this.resvNo = currentResvId
      console.log(this.setRoww(this.selected.id))
      const dataToUpdate = {
        nameContact: this.guestName,
        resourceName: this.resvRecource,
        room: this.setRoww(this.roomNo, this.selected.id), //row
        manyAdult: this.guests.adult,
        manyChild: this.guests.child,
        manyBaby: this.guests.baby,
        inHouseIndicator: true,
        arrivalDate: this.formatDateWithoutTimezone(this.arrivalDepart.from),
        departureDate: this.formatDateWithoutTimezone(this.arrivalDepart.to),
        reservationRemarks: this.resvRemark,
        resvStatusId: parseInt(this.resvStatus.id)
      }
      try {
        await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/create`,
          dataToUpdate,
          ({ status, data }) => {
            this.loading = false
            if (status === 200) {
              this.triggerPositive('Create new reservation successfully')
              console.log('Data berhasil diperbarui:', data)
              this.refresh()
            } else {
              console.error('Gagal memperbarui data')
            }
          }
        )
        // this.refresh()
      } catch (error) {
        console.error(error)
      }
    },
    async updateData() {
      const { currentResvId, currentRoomResvId, waitingnote } = this.$ResvStore
      this.resvNo = currentResvId
      const dataToUpdate = {
        nameContact: this.guestName,
        resourceName: this.resvRecource,
        arrangmentCode: this.selected.id,
        manyAdult: this.guests.adult,
        manyChild: this.guests.child,
        manyBaby: this.guests.baby,
        inHouseIndicator: true,
        arrivalDate: this.formatDateWithoutTimezone(this.arrivalDepart.from),
        departureDate: this.formatDateWithoutTimezone(this.arrivalDepart.to),
        reservationRemarks: this.resvRemark,
        resvStatusId: this.resvStatus.value ? this.resvStatus.value : parseInt(this.resvStatus.id),
      }

      const datachangeroom = {

        roomId: this.roomNo,
        arrangmentCodeId: this.selected.id,
        note: waitingnote
      }

      if(this.$ResvStore.logc === true){
        try {
          await this.api.post(
          `/detail/reservation/${currentResvId}/${currentRoomResvId}/change-room`,
          datachangeroom,
          ({ status, data,message }) => {
            this.loading = false
            console.log(this.resvStatus)

            if (status === 200) {
              this.triggerPositive('Update Successfully')
              console.log('Data berhasil diperbarui:', data)
            } else {
              console.error('Gagal memperbarui data')
              this.triggerNegative(   message)
            }
          }
        )
        // this.refresh()
      } catch (error) {
        console.error(error)
      }
      }else{
      try {
        await this.api.put(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/edit`,
          dataToUpdate,
          ({ status, data }) => {
            this.loading = false
            console.log(this.resvStatus)

            if (status === 200) {
              this.triggerPositive('Update Successfully')
              console.log('Data berhasil diperbarui:', data)
            } else {
              console.error('Gagal memperbarui data')
            }
          }
        )
        // this.refresh()
      } catch (error) {
        console.error(error)
      }}
    },
    formatDate(date) {
      return new Date(date)
    },
    formatDateWithoutTimezone(date) {
      const dateObject = new Date(date)
      const result = dateObject.toISOString().split('T')[0]
      console.log(result)

      return result
    },
    onItemClick(optionValue, desc) {
      this.optionValue = optionValue
      this.resvStatus = { id: optionValue, description: desc }
      console.log(this.resvStatus.id)
    },
    getDropdownLabel() {
      if (this.resvStatus.label) {
        console.log('berhasil')
        // if (!this.dropdownSelected && this.descSelect != null) {
        //   console.log('berhasil')
        //   return this.descSelect
        // }
        return this.resvStatus.label
      }
      return this.descSelect
    },
    refresh() {
      window.location.reload()
    },
    CardId() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      const cardData = {
        name: this.nameidcard,
        cardIdentifier: this.CardIdselect,
        cardId: this.idcardnumber,
        address: this.address
      }
      if (this.nameidcard == '' && this.idcardnumber == '' && this.address == '') {
        this.triggerNegative('data is missing')
      } else {
        try {
          this.api.post(
            `detail/reservation/${currentResvId}/${currentRoomResvId}/add-idcard`,
            cardData,
            ({ status, data }) => {
              this.loading = false
              if (status === 200) {
                console.log('Data berhasil diperbarui:', data)
                this.triggerPositive(
                  this.CardIdselect + ' added successfully' || 'Card not selected'
                )
                this.dialogpayment = false
              } else {
                console.error('Gagal memperbarui data')
                this.triggerNegative('data is missing')
              }
            }
          )
        } catch (error) {
          console.error('error:' + error)
        }
      }
    },
    KTPSelected() {
      this.CardIdselect = 'KTP'
      console.log(this.CardIdselect)
      this.isKtpSelected = !this.isKtpSelected
      this.isSimSelected = false
    },
    SIMSelected() {
      this.CardIdselect = 'SIM'
      console.log(this.CardIdselect)
      this.isSimSelected = !this.isSimSelected
      this.isKtpSelected = false
    },
    checked(row) {
      if (row.split('-')[1] == 'RO') {
        this.isRoSelected = true
        this.isRbSelected = false
        console.log(row)
      } else if (row.split('-')[1] == 'RB') {
        this.isRbSelected = true
        this.isRoSelected = false
      } else {
        console.log('data tidak sesuai')
      }
    },
    checkedCode(type) {
      if (type === 'RO') {
        this.isRoSelected = true
        this.isRbSelected = false
      } else if (type === 'RB') {
        this.isRbSelected = true
        this.isRoSelected = false
        this.selected.id.split('-')[1] = '-' + type
      } else {
        console.log('data tidak sesuai')
      }
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
