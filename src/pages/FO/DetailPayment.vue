<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar>
      <template #left></template>
    </FOMenubar>
    <div style="width: fit-content; margin: auto" class="shadowBox q-pa-lg">
      <div style="display: flex; justify-content: space-between; width: 100%">
        <div style="color: black; font-size: x-large; font-weight: 600" class="q-pa-sm">
          Total Pembayaran
        </div>
        <div style="width: fit-content; margin: 10px">
          <label
            :for="'option_' + index"
            style="font-weight: 600; font-size: large"
            class="centerComponent"
          >
            {{ formating(total) }}</label
          >
        </div>
      </div>
      <div class="shadowBox no-padding">
        <div
          style="display: block; justify-content: space-between; cursor: pointer; font-size: 16px"
        >
          <div class="centerComponent" style="font-weight: 600; width 350px;">
            <div class="row q-px-md">
              <div class="col-9">
                <label for="noPesanan" style="color: grey; font-size: small">NO. PESANAN</label>
                <div style="padding: 5px">{{ this.user.billNumber }}</div>
              </div>
              <div class="col">
                {{ selectedBank ? selectedBank + '/ ' + selectedMethod : '' }}
              </div>
            </div>
            <q-separator horizontal class="q-ma-md" />
            <div style="background-color: #f1f5f9">
              <div style="text-transform: uppercase; padding: 10px; margin: 10px">
                {{ this.user.guestName }}{{ selectedBank ? ', ' + selectedBank : '' }}
              </div>
            </div>
          </div>

          <q-separator horizontal class="q-ma-md" />
          <div class="centerComponent" style="font-weight: 600; width: 100%">
            <label class="q-mx-md" style="color: grey; font-size: small">RINCIAN PESANAN</label>
            <div class="col q-px-md" style="background-color: #f1f5f9; margin-top: 10px">
              <div style="color: black; font-size: larger" class="q-pa-sm">Rincian Harga</div>
              <div v-for="(option, index) in priceBook" :key="index">
                <div style="display: flex" class="q-py-md">
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      width: 100%;
                      margin-right: 10px;
                    "
                  >
                    <div>
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent textwrap"
                        >{{ option.desc }}</label
                      >
                    </div>
                    <div>
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent"
                        >{{ formating(option.amount) }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; width: 100%">
                <div>
                  <input
                    type="checkbox"
                    :id="'option_' + index"
                    :value="DPP"
                    v-model="includeTax"
                  />
                  <label
                    :for="'option_' + index"
                    style="font-weight: 600"
                    class="centerComponent textwrap"
                    >Tax</label
                  >
                </div>
                <div style="width: fit-content; margin: 10px">
                  <label
                    :for="'option_' + index"
                    style="font-weight: 600"
                    class="centerComponent"
                    >{{ formating(DPP) }}</label
                  >
                </div>
              </div>
              <q-separator horizontal />
              <div style="display: flex; justify-content: space-between; width: 100%">
                <div style="color: black; font-size: large" class="q-pa-sm">Harga Total</div>
                <div style="width: fit-content; margin: 10px">
                  <label :for="'option_' + index" style="font-weight: 600" class="centerComponent">
                    {{ formating(total) }}</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="q-pa-lg buttonPayment">
          <div style="display: flex; gap: 10px">
            <q-btn
              align="left"
              class="btn-fixed-width q-ma-auto"
              style="width: 100%"
              @click="paymentpost"
              color="primary"
              label="OK"
            />
            <q-btn
              align="left"
              class="btn-fixed-width q-ma-auto"
              style="width: 100%"
              @click="backPayment"
              color="primary"
              outlined
              label="Cancel"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import FOMenubar from 'src/components/FOMenubar.vue'
import { defineComponent, ref } from 'vue'
import { trigger } from '../../services/helper/notify'

export default defineComponent({
  name: 'payment',
  components: { FOMenubar },
  data() {
    return {
      NameCard: '',
      DPP: ref(),
      includeTax: false,
      selectedBank: ref(''),
      selectedMethod: ref(''),
      api: new this.$Api('frontoffice'),
      data: [],
      total: 0,
      priceBook: [],
      user: ref({ billNumber: '', arrivalDate: '', departureDate: '', guestName: '' })
    }
  },
  watch: {
    selectedOption(newVal) {
      this.selectedBank = newVal
      console.log('method payment ' + this.selectedBank)
      console.log('method payment ' + this.selectedMethod)
    },
    includeTax() {
      this.calculateTotal()
    }
  },
  created() {
    this.calculateTotal()
  },
  mounted() {
    this.fetchcart()
  },
  methods: {
    async paymentpost() {
      const { resvId, resvRoomId } = this.$route.params
      const data = {
        paymentMethod: this.selectedMethod,
        invoices: this.priceBook,
        paidAmount: this.total,
        useTax: this.DPP
      }
      try {
        console.log(this.priceBook)
        if (this.priceBook != null && this.selectedMethod != '') {
          this.loading = true
          this.api.post(`invoice/payment/${resvId}/${resvRoomId}`, data, ({ status, data }) => {
            if (status === 200) {
              this.loading = false
              console.log(status)
              this.trigger('positive', 'payment successful')
              console.log('Data berhasil diperbarui:', data)
              this.$nextTick(() => {
                this.trigger('ongoing', 'loading')
                this.redirectpayment(true)
              })
            } else {
              this.trigger('warning', 'payment failed')
            }
          })
        } else {
          this.trigger('warning', 'data not found')
        }
      } catch (error) {
        console.error(error)
      }
    },
    redirectpayment(state) {
      const { resvId, resvRoomId } = this.$route.params

      if (state === true) {
        this.$router.push({
          name: 'guest-invoice'
        })
      } else {
        this.$router.push({
          name: 'guest-invoice',
          params: { resvId: resvId, resvRoomId: resvRoomId }
        })
      }
    },
    backPayment() {
      this.$router.go(-1)
      this.$nextTick(() => {
        this.trigger('ongoing', 'loading')
      })
    },
    calculateTotal() {
      this.total = this.priceBook.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.amount) // Mengonversi ke float sebelum penambahan
      }, 0)
      console.log(this.total)
      if (this.includeTax) {
        this.total += this.DPP
      }
    },
    calculateTax(subtotal) {
      return subtotal + this.DPP
    },

    find(value) {
      if (value == 1) {
        return this.dropdownOptions.find((option) => option.value === this.selectedBank)
      } else if (value == 2) {
        return this.dropdownOptions2.find((option) => option.value === this.selectedBank)
      } else if (value == 3) {
        return this.dropdownOptions3.find((option) => option.value === this.selectedBank)
      } else if (value == 4) {
        return this.dropdownOptions4.find((option) => option.value === this.selectedBank)
      }
    },
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    fetchcart() {
      // const { currentResvId, currentRoomResvId } = this.$ResvStore
      const { resvId, resvRoomId } = this.$route.params

      const { selectedbank, selectedmethod } = this.$ResvStore
      this.selectedBank = selectedbank
      console.log(this.selectedBank)
      this.selectedMethod = selectedmethod

      if (this.selectedBank != null && this.selectedBank != '') {
        try {
          this.api.get(`invoice/payment/${resvId}/${resvRoomId}`, ({ status, message, data }) => {
            if (status === 200) {
              const { invoices, add, total, tax } = data
              this.user = { ...add }
              this.priceBook = invoices

              this.total = total
              console.log(this.priceBook)
              this.DPP = data.tax
              this.calculateTotal()
              this.data = invoices.rate
            }
          })
        } catch (error) {
          console.error(error)
        }
      }
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((inv) => {
        list.push({
          Art: { data: inv.art.label ? inv.art.label : inv.art, style: {} },
          Qty: { data: inv.qty, style: {} },
          Description: { data: inv.desc, style: {} },
          Rate: { data: inv.rate, style: {} },
          Amount: { data: inv.amount, style: {} },
          RmNo: { data: 101, style: {} },
          RoomBoy: { data: '', style: {} },
          VoucherNumber: { data: 101111, style: {} },
          BillDate: { data: inv.billDate, style: {} },
          uniqueId: { data: inv.uniqueId, style: {} }
        })
      })
      console.log(list)
      this.data = list
    },
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'data not found',
          timeout: 1000
        },
        1000
      )
    }
  }
})
</script>
<style>
.wrapchoose {
  width: fit-content;
  padding-left: 20px;
  padding-right: 20px;
  background-color: aqua;
  border-radius: 6px;
}

.centerComponent {
  margin-top: auto;
  margin-bottom: auto;
  height: 100%;
  transition: transform 1s ease-in-out;
}

.centerPComponent {
  padding-top: auto;
  padding-bottom: auto;
  height: 100%;
}

.shadowBox {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 10px;
  height: fit-content;
  padding: 20px;
  width: 1000px;
}
.detailPayment {
  width: 1130px;
  height: fit-content;
}
.buttonPayment {
  width: 40%;
  margin-left: auto;
  margin-right: auto;
}
.textwrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 5px;
  padding-left: 5px;
}
</style>
