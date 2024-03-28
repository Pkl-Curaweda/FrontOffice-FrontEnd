<template>
  <div v-if="infoCheckout">
    <div class="full-width full-height text-center text-h2 q-mt-xl" style="z-index: 200">
      This Reservation already checkout
    </div>
    <div class="flex justify-center items-center q-mt-md">
      <q-btn outline color="primary" dense outlined no-caps @click="resetCheckIn"
        >Reset Check-In</q-btn
      >
    </div>
  </div>

  <div class="q-my-lg row no-wrap q-gutter-md" v-if="guestForm">
    <div class="">
      <q-img
        :src="roomImage || '../../../../src/assets/img/thumbnaul-form.png'"
        class="width-image rounded-borders"
      />
    </div>

    <div class="col-grow">
      <div class="row q-gutter-xs">
        <!-- create new reservation  -->
        <q-btn
          flat
          square
          dense
          color="primary"
          class="border-button rounded-borders q-px-md"
          @click="refreshData"
          no-caps
          v-if="!this.$ResvStore.fix && this.$ResvStore.currentRoomResvId"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="19"
            viewBox="0 0 18 19"
            fill="none"
          >
            <path
              d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H16V20H14V17H11V15H14V12H16V15H19Z"
              fill="#008444"
            />
          </svg>
          <div class="q-pl-sm">Add</div>
        </q-btn>

        <!-- edit reservation  -->
        <!-- <q-btn
          flat
          square
          color="primary"
          class="border-button rounded-borders"
          @click="updateData"
          :disabled="!this.$ResvStore.currentRoomResvId || this.$ResvStore.addroom"
          v-if="!this.$ResvStore.fix"
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
        </q-btn> -->

        <q-space />

        <q-btn
          flat
          square
          color="primary"
          icon="o_add_home"
          class="border-button rounded-borders"
          style="padding-top: 0; padding-bottom: 0"
          @click="newResvroom()"
          v-if="
            !this.$ResvStore.fix && this.$ResvStore.currentRoomResvId && this.$ResvStore.addroom
          "
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
          v-if="
            !this.$ResvStore.fix &&
            this.$ResvStore.currentRoomResvId &&
            !this.$ResvStore.addroom &&
            !this.$ResvStore.logc
          "
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
              <q-input
                dense
                type="number"
                outlined
                v-model="idcardnumber"
                class="q-mt-sm"
                style="width: 360px"
              />

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
        class="q-mt-sm width-full text-bold"
        :class="$ResvStore.fix ? 'q-my-sm text-bold' : 'q-mt-sm'"
        v-if="!$ResvStore.fix"
      />
      <div class="q-mt-sm width-full text-bold" v-if="$ResvStore.fix">{{ guestName }}</div>

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
          {{ roomType }}
        </div>
        <div class="">{{ roomNo?.value }}</div>
        <div class="">{{ roomBed + ' ' }} Bed</div>
      </div>
      <div v-if="!$ResvStore.fix" style="gap: 8px" class="row no-wrap q-mt-sm">
        <q-select
          dense
          v-model="roomType"
          :outlined="!$ResvStore.fix"
          :borderless="$ResvStore.fix"
          :readonly="$ResvStore.fix"
          :disable="true"
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
          :disable="$ResvStore.detail"
          label="Room No"
          dropdown-icon="expand_more"
          class="full-width"
        />
        <q-select
          outlined
          dense
          v-model="roomBed"
          :options="roomBedOpts"
          :disable="true"
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
        dropdown-icon="o_expand_more"
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
                </div>
              </div>
            </q-item-section>
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
            :disable="$ResvStore.logc || this.$ResvStore.fix"
            :label="resvStatus.label || resvStatus.description || dropdownOptions[0].description"
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
        ref="showRateExpansionItem"
        :label="selected.id ? 'Room Rate: ' + selected.id : 'Room Rate: '"
        class="padding-expansion q-pa-none"
        :hide-expand-icon="true"
        :default-opened="showRateExpansion"
        dense
        style="font-weight: bold"
      >
        <div v-if="$ResvStore.logc || !resvNo">
          <div v-for="row in resultRows" :key="row.id" clickable @click="selectRow(row)">
            <div style="display: flex; width: 100%">
              <q-radio selection="single" v-model="selected" :val="row" @click="checked(row.id)" />

              <div style="display: flex; justify-content: space-around; margin: auto; width: 100%">
                <div>{{ row.id.split('-')[0] }}</div>
                <div>{{ this.formating(row.rate) }}</div>
                <div>{{ row.id.split('-')[1] }}</div>
              </div>
            </div>
          </div>
          <q-separator horizontal class="q-ma-xs" />
        </div>
        <div style="display: flex" class="row">
          <q-btn
            unelevated
            dense
            class="q-mt-sm text-capitalize q-px-sm q-mx-sm"
            color="primary"
            @click="redirectToInvoice"
            label="Invoice"
            v-if="resvNo && !$ResvStore.fix"
            :disable="!resvNo || this.$ResvStore.addroom || this.$ResvStore.logc"
          />
          <q-input
            dense
            :outlined="!$ResvStore.fix"
            v-model="voucherId"
            label="Voucher"
            :disable="this.$ResvStore.addroom || this.$ResvStore.logc"
            class="q-mt-sm col-grow"
            :readonly="$ResvStore.fix"
            :borderless="$ResvStore.fix"
            :style="!resvNo ? 'width: 100%;' : 'width: 20%;'"
          />
        </div>
      </q-expansion-item>

      <div style="display: flex; justify-content: space-between" class="q-mt-sm">
        <p class="text-bold q-ma-none">Balance:</p>
        <p class="text-bold q-ma-none">{{ formating(balance) }}</p>
      </div>

      <q-separator class="q-mt-sm bg-grey" size="1px" />

      <q-btn
        color="primary"
        dense
        class="q-ma-sm q-px-md q-py-xs"
        @click="updateData"
        v-if="
          this.$ResvStore.detail ||
          (this.$ResvStore.logc && !this.$ResvStore.fix && !this.$ResvStore.addroom)
        "
        size="sm"
        outline
        no-caps
        label="Change"
        icon="edit"
      />
    </div>

    <div class="col-grow">
      <q-expansion-item
        dense
        default-opened="true"
        style="font-weight: bold"
        label="Reservation Remarks"
        class="padding-expansion"
      >
        <q-card>
          <q-input
            :disable="$ResvStore.logc || this.$ResvStore.addroom"
            v-model="resvRemark"
            label="Note..."
            dense
            outlined
            type="textarea"
          />
        </q-card>
      </q-expansion-item>

      <div style="gap: 8px" class="q-mt-sm row no-wrap items-center">
        <q-btn
          label="Reservation"
          outline
          color="primary"
          dense
          class="text-capitalize col-grow"
          @click="createData"
          v-if="!this.$ResvStore.fix && !this.$ResvStore.currentRoomResvId"
        />
        <q-btn
          label="Check-In"
          unelevated
          color="primary"
          dense
          class="text-capitalize col-grow"
          @click="postcheckin"
          v-if="!this.$ResvStore.fix && this.$ResvStore.currentRoomResvId && this.$ResvStore.detail"
        />
        <q-btn
          label="Check-Out"
          outline
          color="grey"
          dense
          class="text-capitalize col-grow"
          @click="handleCheckout"
          v-if="!this.$ResvStore.fix && this.$ResvStore.currentRoomResvId && this.$ResvStore.detail"
        />
      </div>
    </div>
  </div>

  <q-dialog v-model="dialogCheckout">
    <q-card style="width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Balance Still Left:</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <div class="text-h4">
          Rp. <span class="text-h4">{{ remainingBalance }}</span>
        </div>
        <p class="q-mt-md text-center text-h6">Please select next action</p>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Pay with Bill" color="primary" v-close-popup @click="makeSureCheckout" />
        <q-btn label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="dialogMakeSureCheckout">
    <q-card style="width: 300px">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Balance Still Left:</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-input
          dense
          outlined
          readonly
          v-model="nameReservation"
          label="Name Reservation"
          class="col-grow"
        />
        <q-input
          dense
          outlined
          readonly
          v-model="noReservation"
          label="No Reservation"
          class="col-grow q-mt-sm"
        />
        <div class="q-mt-md text-semibold">
          To confirm, type "{{ nameReservation }}" in the box below
        </div>
        <q-input dense outlined v-model="typeConfirm" class="col-grow q-mt-sm" />
      </q-card-section>

      <q-card-actions>
        <q-btn
          label="Checkout this reservation"
          color="primary"
          class="col-grow"
          @click="confirmCheckout"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent, ref, watch, provide, inject } from 'vue'
import { useQuasar } from 'quasar'
import socket from '../../../services/socket/socket'

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
        name: 'date',
        label: 'Date',
        align: 'center',
        field: 'date'
      },
      { name: 'rate', align: 'center', label: 'Rate', field: 'rate' },
      { name: 'arrangement', label: 'Arrangement', field: 'arrangement' }
    ]

    const rows = []
    const resultRows = ref([])
    const status = []
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
      dialogMakeSureCheckout: ref(false),
      showRateExpansion: ref(false),
      dialogCheckout: ref(false),
      forceCheckout: ref(false),
      dialogpayment: ref(false),
      infoCheckout: ref(false),
      loading: ref(false),
      showDropdown: false,
      includeTax: false,
      fix: false,
      guestForm: ref(true),
      arrivalDepart: ref({ from: null, to: null }),
      arrivalDepartLabel: ref('Arrival - Depature, 1 Nights'),
      guests: ref({ adult: 1, child: 0, baby: 0 }),
      guestsLabel: ref('1 Adult, 0 Child, 0 Baby'),
      resvStatusOpts: ref([['DLX', 'FML', 'STD']]),
      resvRecource: ref(null),
      selectedOption: null,
      roomType: ref(null),
      roomBed: ref(null),
      roomNo: ref(null),
      balance: ref(0),
      storeReservationData: ref(),
      remainingBalance: ref(''),
      nameReservation: ref(''),
      arrangmentCode: ref(''),
      selectedstatus: ref(),
      CardIdselect: ref(''),
      indexReference: ref(),
      resultStatus: ref(''),
      idcardnumber: ref(''),
      typeConfirm: ref(''),
      noReservation: ref(),
      shownRoomType: ref(),
      optionValue: ref(''),
      resvRemark: ref(''),
      nameidcard: ref(''),
      descSelect: ref(''),
      shownBedOpts: ref(),
      voucherId: ref(''),
      roomImage: ref(''),
      guestName: ref(''),
      address: ref(''),
      newSetRow: ref(),
      resvNo: ref(''),
      detail: ref(),
      setRow: ref(),
      arrangmentValue: ref([]),
      roomTypeOpts: ref([]),
      roomBedOpts: ref([]),
      resvStatus: ref([]),
      roomNoOpts: ref([]),
      selected: ref([]),
      isRbSelected,
      isRoSelected,
      toggleRbSelected,
      toggleRoSelected,
      isKtpSelected,
      isSimSelected,
      toggleKtpSelected,
      toggleSimSelected,
      resultRows,
      columns,
      status,
      rows,
      dropdownOptions: [
        { value: '1', description: 'Guaranted' },
        { value: '2', description: '6 PM' },
        { value: '3', description: 'Tentative' }
      ],
      resvRecourceOpts: ['Individual reservation', 'Walk In']
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      availRooms: []
    }
  },
  mounted() {
    socket.connect()
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
  watch: {
    roomType: {
      handler(oldval, newval) {
        this.resultRows = this.rows.filter((r) => {
          return r.date == oldval
        })
      }
    },
    roomNo: {
      handler(newVal, oldVal) {
        this.toggleRoomRate('show')
        this.roomType = this.roomTypeOpts[newVal.index].value
        this.roomBed = this.roomBedOpts[newVal.index].label
        if (
          this.arrivalDepart.from &&
          this.arrivalDepart.to &&
          newVal != oldVal &&
          newVal.value != this.storeReservationData?.room.id
        )
          this.checkRoomAvailability()
      }
    },
    'arrivalDepart.from': {
      immediate: true,
      handler(newVal, oldVal) {
        this.formatArrivalDepart()
        console.log(newVal, oldVal)
        if (
          this.roomNo &&
          this.arrivalDepart?.from &&
          oldVal != newVal &&
          newVal != this.storeReservationData?.reservation.arrivalDate
        )
          this.checkRoomAvailability()
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
    resetCheckIn() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      if (currentResvId == 0 || currentRoomResvId == 0) return

      let url = `detail/reservation/${currentResvId}/${currentRoomResvId}/reset-checkin`
      this.api.get(url, ({ status, message }) => {
        if (status === 200) {
          socket.emit('refreshTask', { message: 'Nigas' })
          this.trigger('positive', message)
          this.infoCheckout = !this.infoCheckout
          this.guestForm = !this.guestForm
        }
      })
    },
    confirmCheckout() {
      if (this.typeConfirm != this.nameReservation)
        return this.trigger('negative', 'Please type it correctly')
      this.postcheckout()
    },
    makeSureCheckout() {
      this.dialogMakeSureCheckout = true
      this.forceCheckout = true
    },
    handleCheckout() {
      if (!this.storeReservationData.reservation.checkInDate)
        return this.trigger('negative', "Reservation hasn't Check In yet")
      if (this.remainingBalance != 0) {
        this.dialogCheckout = true
      } else this.dialogMakeSureCheckout = true
    },
    toggleRoomRate(act = 'show') {
      act != 'show'
        ? this.$refs.showRateExpansionItem.hide()
        : this.$refs.showRateExpansionItem.show()
    },
    refreshData() {
      window.location.reload()
    },
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
        roomId: this.roomNo.value,
        roomType: this.roomType.label,
        roomBed: this.roomBed.label,
        voucher: this.voucherId,
        arrangmentCode: this.selected && this.selected.id ? this.selected.id : ''
      }
    },
    checkRoomAvailability() {
      const arrivalDate = this.arrivalDepart.from.split('T')[1]
        ? this.arrivalDepart.from.split('T')[0]
        : this.arrivalDepart.from
      const departureDate = this.arrivalDepart.to.split('T')[1]
        ? this.arrivalDepart.to.split('T')[0]
        : this.arrivalDepart.to

      let url = `detail/checker/room?roomId=${this.roomNo.value}&range=${arrivalDate}T${departureDate}`
      if (this.$ResvStore.currentRoomResvId) url += `&id=${this.$ResvStore.currentRoomResvId}`
      this.api.get(url, ({ status, message }) => {
        if (status != 200) {
          this.trigger('negative', message)
        } else {
          this.trigger('positive', message)
        }
      })
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
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    formatArrivalDepart() {
      console.log(this.arrivalDepart)
      if (this.arrivalDepart?.from && this.arrivalDepart?.to) {
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
    // removeRoomResv() {
    //   try {
    //     const { currentResvId, currentRoomResvId } = this.$ResvStore
    //     this.api.delete(`detail/reservation/${currentResvId}/${currentRoomResvId}/delete`)
    //     this.refreshData()
    //   } catch (error) {
    //     console.error(error)
    //   }
    // },
    getResvProps() {
      let checkoutDate
      this.api.get(`detail/reservation/1/1/create`, ({ status, data }) => {
        this.loading = false
        if (status === 200) {
          const { arrangmentCode, availableRooms } = data
          if (data.reservation) checkoutDate = data.reservation.reservation.checkoutDate
          const formattedRoomRates = this.formatRoomrate(arrangmentCode) // Menggunakan nilai dari arrangment
          if (checkoutDate != null) {
            this.infoCheckout = true
            this.guestForm = false
          } else {
            this.infoCheckout = false
            this.guestForm = true
          }
          this.rows = formattedRoomRates
          this.resultRows = formattedRoomRates
          let formatedType = {},
            indexOfReference = {},
            roomNos = [],
            roomTypes = []
          let index = 0

          for (let room of availableRooms) {
            roomNos.push({ index, label: room.id, value: room.id })
            this.roomTypeOpts.push({
              index,
              label: room.roomType.longDesc,
              value: room.roomType.id,
              bed: room.roomType.bedSetup
            })
            this.roomBedOpts.push({
              index,
              label: room.roomType.bedSetup,
              value: room.roomType.bedSetup
            })
            formatedType[room.roomType.id] = {}
            indexOfReference[room.id] = index
            index++
          }
          this.roomNoOpts = roomNos
          this.indexReference = indexOfReference
        }
      })
    },
    selectRow(row) {
      this.selected = row
      // this.calculateTotal()
    },
    // calculateTotal() {
    //   if (this.selected) {
    //     this.balance = this.selected.value

    //     if (this.includeTax) {
    //       this.balance += this.calculateTax(this.balance)
    //     }

    //   }
    // },
    trigger(type, txt) {
      if (txt != null) {
        this.$q.notify(
          {
            type: type,
            message: txt || 'data not found',
            timeout: 1000
          },
          1000
        )
      }
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
          roomId: this.roomNo.value,
          voucher: this.voucherId || ''
        }
        if (currentResvId == 0 || currentRoomResvId == 0) return
        this.loading = true
        await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/add-room`,
          data,
          ({ status, data, message }) => {
            if (status == 200) {
              this.loading = false
              this.trigger('positive', message)
              this.editroom()
            } else {
              this.trigger('negative', message)
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
          ({ status, data, message }) => {
            this.loading = false
            if (status == 200) {
              this.trigger('positive', message)
              this.editroom()
            } else {
              this.trigger('negative', message)
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
        let url = `detail/reservation/${currentResvId}/${currentRoomResvId}/change-progress/checkout`
        if (this.forceCheckout) url += '?force=true'

        await this.api.post(url, null, ({ status, data, message }) => {
          this.loading = false
          if (status == 200) {
            this.trigger('positive', message)
            this.editroom()
          } else {
            this.trigger('negative', message)
          }
        })
      } catch (error) {
        console.error('error : ' + error)
      }
    },
    getDetailResvRoom() {
      const { currentResvId, currentRoomResvId, fix, detail } = this.$ResvStore
      if (currentResvId == 0 || currentRoomResvId == 0) return
      this.fix = true ? (this.fix = fix) : false
      this.detail = true ? (this.detail = detail) : false
      this.loading = true
      this.resvNo = currentResvId
      this.api.get(
        `detail/reservation/${currentResvId}/${currentRoomResvId}/edit`,
        ({ status, data, message }) => {
          this.loading = false
          if (status == 200) {
            this.trigger('positive', message)

            const { reservation, room, arrangment, balance, voucherId } = data.reservation
            const { checkoutDate, reserver, id } = data.reservation.reservation
            this.storeReservationData = data.reservation
            // const { reservationStatus, arrangmentCode, availableRooms } = data.data

            if (checkoutDate != null) {
              this.infoCheckout = true
              this.guestForm = false
            } else {
              this.infoCheckout = false
              this.guestForm = true
            }
            this.noReservation = id
            this.nameReservation = reserver.guest.name
            this.remainingBalance = balance.balance
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
            console.log(this.roomNoOpts)
            this.roomNo = this.roomNoOpts[this.indexReference[room.id]]
            console.log(this.roomNoOpts)
            this.availRooms = [
              ...this.availRooms,
              { id: room.id, roomType: room.roomType, bedSetup: room.bedSetup }
            ]
            this.voucherId = voucherId
            this.balance = balance.balance
            // const formattedRoomRates = this.formatRoomrate(arrangmentCode) // Menggunakan nilai dari arrangment
            // this.rows = formattedRoomRates
            // this.resultRows = formattedRoomRates
            // const formattedStatus = this.formatedStatus(reservationStatus)
            // this.status = formattedStatus

            // this.resultStatus = this.checkData(reservation.description)
            // this.arrangmentCode = { id: arrangment.id, rate: arrangment.rate }
          }
          this.selectRow(this.arrangmentValue)
          this.checkedCode(this.arrangmentValue.id.split('-')[1])
        }
      )
    },
    formatRoomrate(map = []) {
      const rmt = []
      map.forEach((dt) => {
        const { id, rate } = dt
        rmt.push({
          id,
          date: id.split('-')[0],
          rate: rate,
          arrangement: id.split('-')[1]
        })
      })
      return rmt
    },
    formattedStatus(map = []) {
      const rms = []
      map.forEach((dt) => {
        const { id, rate } = dt
        rms.push({
          id,
          date: id.split('-')[0],
          rate: rate,
          arrangement: id.split('-')[1]
        })
      })
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
        this.api.get(`detail/reservation/${currentResvId}/idcard`, ({ status, data, message }) => {
          if (status === 200) {
            ;(this.nameidcard = data.name),
              (this.CardIdselect =
                data.carIdentifier && this.checkCardIdselect(data.carIdentifier)),
              (this.idcardnumber = data.cardId),
              (this.address = data.address)
            if (this.nameidcard != '') {
              this.trigger('positive', message)
            }
          }
        })
      } catch (error) {
        console.error('error' + error)
      }
    },
    async createData() {
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        this.resvNo = currentResvId

        this.validateInput(
          this.guestName,
          'Please send Guest Name and Phone Number',
          true,
          'include',
          '/',
          'Please send a correct format [Guest Name]/[Phone Number]'
        )
        this.validateInput(this.resvRecource, 'Please specify Reservation Resource', true)
        this.validateInput(this.roomNo, 'Please Specify Room Number', true)
        this.validateInput(this.selected.id, 'Please specify the Arrangment Code', true)
        this.validateInput(
          this.guests.adult + this.guests.baby + this.guests.child,
          'Atleast 1 Person is required',
          true,
          'count'
        )
        this.validateInput(this.arrivalDepart?.from, 'Please specify The Reservation Date', true)

        const dataToUpdate = {
          nameContact: this.guestName,
          resourceName: this.resvRecource,
          room: this.setRoww(this.roomNo.value, this.selected.id, this.voucherId), //row
          manyAdult: this.guests.adult,
          manyChild: this.guests.child,
          manyBaby: this.guests.baby,
          arrivalDate: this.formatDateWithoutTimezone(this.arrivalDepart.from),
          departureDate: this.formatDateWithoutTimezone(this.arrivalDepart.to),
          reservationRemarks: this.resvRemark,
          resvStatusId: parseInt(this.resvStatus.id || '1')
        }

        await this.api.post(
          `detail/reservation/${currentResvId}/${currentRoomResvId}/create`,
          dataToUpdate,
          ({ status, data, message }) => {
            this.loading = false
            if (status === 200) {
              this.trigger('positive', message)
              this.clearData()
              this.$store.resvStore.clearData()
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (error) {
        return this.trigger('negative', error.message)
      }
    },
    validateInput(modelValue, message, required, action, option, scndMessage) {
      if (required) if (!modelValue) throw Error(message)
      switch (action) {
        case 'count':
          if (modelValue === 0) throw Error(message)
          break
        case 'include':
          if (!modelValue.split(option)[1]) throw Error(scndMessage)
          break
      }
    },
    showNotification(message) {
      // Display notification message
      // Example logic:
      this.trigger('info', message) // Assuming 'trigger' method is available to display notifications
    },
    async updateData() {
      try {
        const { currentResvId, currentRoomResvId, waitingnote } = this.$ResvStore
        this.resvNo = currentResvId

        const dataToUpdate = {
          nameContact: this.guestName,
          resourceName: this.resvRecource,
          arrangmentCode: this.selected.id,
          manyAdult: this.guests.adult,
          manyChild: this.guests.child,
          manyBaby: this.guests.baby,
          // inHouseIndicator: true,
          arrivalDate: this.formatDateWithoutTimezone(this.arrivalDepart.from),
          departureDate: this.formatDateWithoutTimezone(this.arrivalDepart.to),
          reservationRemarks: this.resvRemark,
          voucher: this.voucherId || '',
          resvStatusId: this.resvStatus.value ? this.resvStatus.value : parseInt(this.resvStatus.id)
        }

        const datachangeroom = {
          roomId: this.roomNo.value,
          arrangmentCodeId: this.selected.id,
          note: waitingnote
        }

        if (this.$ResvStore.logc === true) {
          await this.api.post(
            `/detail/reservation/${currentResvId}/${currentRoomResvId}/change-room`,
            datachangeroom,
            ({ status, data, message }) => {
              this.loading = false

              if (status === 200) {
                this.trigger('positive', message)
                this.editroom()
              } else {
                console.error('Gagal memperbarui data')
                this.trigger('negative', message)
              }
            }
          )
        } else {
          this.validateInput(
            this.guestName,
            'Please send Guest Name and Phone Number',
            true,
            'include',
            '/',
            'Please send a correct format [Guest Name]/[Phone Number]'
          )
          this.validateInput(this.resvRecource, 'Please specify Reservation Resource', true)
          this.validateInput(this.roomNo, 'Please Specify Room Number', true)
          this.validateInput(this.selected.id, 'Please specify the Arrangment Code', true)
          this.validateInput(
            this.guests.adult + this.guests.baby + this.guests.child,
            'Atleast 1 Person is required',
            true,
            'count'
          )
          this.validateInput(this.arrivalDepart?.from, 'Please specify The Reservation Date', true)
          await this.api.put(
            `detail/reservation/${currentResvId}/${currentRoomResvId}/edit`,
            dataToUpdate,
            ({ status, data, message }) => {
              this.loading = false
              if (status === 200) {
                this.trigger('positive', message)
                // this.refreshData()
                // this.$ResvStore.clearData()
                // this.clearData()
              } else {
                this.trigger('negative', message)
              }
            }
          )
        }
      } catch (error) {
        return this.trigger('negative', error.message)
      }
    },
    formatDate(date) {
      return new Date(date)
    },
    formatDateWithoutTimezone(date) {
      if (date.split('T')[1]) date = date.split('T')[0]
      return date.replace(/\//g, '-')
    },
    onItemClick(optionValue, desc) {
      this.optionValue = optionValue
      this.resvStatus = { id: optionValue, description: desc }
    },
    getDropdownLabel() {
      if (this.resvStatus.label) {
        return this.resvStatus.label
      }
      return this.descSelect
    },
    refresh() {
      window.location.reload()
    },
    CardId() {
      try {
        const { currentResvId, currentRoomResvId } = this.$ResvStore
        this.validateInput(this.nameidcard, 'Please Specify Name On ID Card', true)
        this.validateInput(this.CardIdselect, 'Please Specify KTP or SIM', true)
        this.validateInput(this.idcardnumber, 'Please Specify ID Card Number', true)
        this.validateInput(this.address, 'Please Specify ID Card Address', true)

        const cardData = {
          name: this.nameidcard,
          cardIdentifier: this.CardIdselect,
          cardId: this.idcardnumber,
          address: this.address
        }
        if (this.nameidcard == '' && this.idcardnumber == '' && this.address == '') {
          this.trigger('warning', 'data is missing')
        } else {
          this.api.post(
            `detail/reservation/${currentResvId}/${currentRoomResvId}/add-idcard`,
            cardData,
            ({ status, data, message }) => {
              this.loading = false
              if (status === 200) {
                this.trigger(
                  'positive',
                  this.CardIdselect + ' added successfully' || 'Card not selected'
                )
                this.dialogpayment = false
              } else {
                console.error('Gagal memperbarui data')
                this.trigger('negative', message)
              }
            }
          )
        }
      } catch (error) {
        return this.trigger('negative', error.message)
      }
    },
    KTPSelected() {
      this.CardIdselect = 'KTP'
      this.isKtpSelected = !this.isKtpSelected
      this.isSimSelected = false
    },
    SIMSelected() {
      this.CardIdselect = 'SIM'
      this.isSimSelected = !this.isSimSelected
      this.isKtpSelected = false
    },
    checked(row) {
      if (row.split('-')[1] == 'RO') {
        this.isRoSelected = true
        this.isRbSelected = false
      } else if (row.split('-')[1] == 'RB') {
        this.isRbSelected = true
        this.isRoSelected = false
      } else {
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
      }
    },
    clearData() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      // const resvId = this.datares['ResNo'].data
      // const roomNo = this.datares['ResRoomNo'].data
      currentResvId = this.resvRecource = ''
      this.guestName = ''
      this.selected = null
      this.resvRemark = ''
      this.voucherId = ''
      this.resvStatus = { value: null, id: null }
      this.resvRecource = ''
      this.roomNo = '' // misalkan ini string kosong, pastikan sesuai dengan tipe datanya
      this.guests = { adult: 0, child: 0, baby: 0 }
      this.arrivalDepart = { from: null, to: null } // atau atur ke null jika ingin menghapus tanggal kedatangan dan keberangkatan
      // this.$store.resvStore.clearData()
      // this.$ResvStore.fix = false
      // this.$ResvStore.ds = false
      // this.$ResvStore.logc = false
      // this.$ResvStore.detail = false
      // this.$ResvStore.addroom = false
    },
    editroom() {
      const { currentResvId, currentRoomResvId } = this.$ResvStore
      this.$ResvStore.currentResvId = currentResvId
      this.$ResvStore.currentRoomResvId = currentRoomResvId
      this.$ResvStore.addroom = false
      this.$ResvStore.logc = false
      this.$ResvStore.fix = false
      this.$ResvStore.ds = true
      this.$ResvStore.detail = true

      console.log(data['ResNo'].data)
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
