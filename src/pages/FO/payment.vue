<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar>
      <template #left></template>
    </FOMenubar>
    <!-- payment slot -->
    <div
      style="
        width: fit-content;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 50px;
        box-shadow: 20px 30px 30px 20px rgba(0, 0, 0, 0.057), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      "
      class="shadowBox"
    >
      <div style="display: flex">
        <div style="display: block; margin-top: auto; margin-bottom: auto" class="q-ma-md">
          <!-- Kartu Kredit -->
          <div style="width: 100%" class="shadowBox">
            <div
              style="
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                font-size: 18px;
              "
            >
              <span class="centerComponent" style="width: 350px; font-weight: 600"
                >Kartu Kredit/ Debit</span
              >

              <div
                style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
              >

              <!-- <PaymentImage v-for="(option, i) in dropdownOptions" :key="i" :imageUrl="option.imageUrl" /> -->
              <PaymentImage :showDebit="true"></PaymentImage>
                <q-icon
                  :name="iconName2"
                  size="2rem"
                  color="green"
                  class="centerComponent"
                  @click="toggleBank"
                />
              </div>
            </div>
            <div v-if="showDebit" style="width: fit-content">
              <div class="row" style="width: 700px">
                <div class="col q-mx-sm">
                  <label for="nameCard">Name on card</label>
                  <q-input standout v-model="NameCard" dense outlined />
                </div>

                <div class="col q-mx-sm">
                  <label for="dateCard">Date on card</label>
                  <q-input standout v-model="dateCard" dense outlined />
                </div>

                <div class="col q-mx-sm">
                  <label for="securityCode">Security code</label>
                  <q-input standout v-model="securityCode" dense outlined />
                </div>
              </div>
              <div class="row" style="width: 700px">
                <div class="col q-mx-sm">
                  <label for="numberCard">Card number</label>
                  <q-input
                    standout
                    v-model="numberCard"
                    dense
                    outlined
                    mask="#### #### #### ####"
                    fill-mask="#"
                  />
                </div>

                <div class="col q-mx-sm">
                  <label for="postalCode">ZIP/Postal Code</label>
                  <q-input standout v-model="postalCode" dense outlined />
                </div>
              </div>
            </div>
          </div>
          <!-- Bank Transfer -->
          <div style="width: 100%" class="shadowBox">
            <div
              style="
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                font-size: 18px;
              "
            >
              <span class="centerComponent" style="width: 350px; font-weight: 600"
                >Bank Transfer</span
              >

              <div
                style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
              >
               <PaymentImage :showBank="true" ></PaymentImage>
                <q-icon
                  :name="iconName1"
                  size="2rem"
                  color="green"
                  class="centerComponent"
                  @click="toggleDropdown"
                />
              </div>
            </div>

            <div v-if="showDropdown">
              <div v-for="(option, index) in dropdownOptions" :key="index">
                <div style="display: flex" class="q-py-md">
                  <div style="display: flex; justify-content: space-between; width: 100%">
                    <div>
                      <input
                        type="radio"
                        :id="'option_' + index"
                        :value="option.value"
                        v-model="selectedOption"
                      />
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent"
                        >{{ ' Transfer ' + option.value }}</label
                      >
                    </div>
                    <div style="width: 60px">
                      <q-img
                        :src="'./../assets/img/payment/' + option.imageUrl"
                        loading="lazy"
                        spinner-color="black"
                        style="max-width: 60px; margin: auto; justify-content: flex-end"
                        :alt="'Image ' + index"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- E-Wallet -->
          <div style="width: 100%" class="shadowBox">
            <div
              style="
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                font-size: 18px;
              "
            >
              <span class="centerComponent" style="width: 350px; font-weight: 600">E-Wallet</span>

              <div
                style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
              >
               <PaymentImage :showEWallet="true" ></PaymentImage>
                <q-icon
                  :name="iconName3"
                  size="2rem"
                  color="green"
                  class="centerComponent"
                  @click="toggleEwallet"
                />
              </div>
            </div>
            <div v-if="showEwallet">
              <div v-for="(option, index) in dropdownOptions2" :key="index">
                <div style="display: flex" class="q-py-md">
                  <div style="display: flex; justify-content: space-between; width: 100%">
                    <div>
                      <input
                        type="radio"
                        :id="'option_' + index"
                        :value="' Transfer ' + option.value"
                        v-model="selectedOption"
                      />
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent"
                        >{{ ' Transfer ' + option.value }}</label
                      >
                    </div>
                    <div style="width: 60px">
                      <q-img
                        :src="'./../assets/img/payment/' + option.imageUrl"
                        loading="lazy"
                        spinner-color="black"
                        style="max-width: 60px; margin: auto; justify-content: flex-end"
                        :alt="'Image ' + index"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Virtual Account -->
          <div style="width: 100%" class="shadowBox">
            <div
              style="
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                font-size: 18px;
              "
            >
              <span class="centerComponent" style="width: 350px; font-weight: 600"
                >Virtual Account</span
              >

              <div
                style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
              >
              <PaymentImage :showVirtual="true" ></PaymentImage>
                <q-icon
                  :name="iconName4"
                  size="2rem"
                  color="green"
                  class="centerComponent"
                  @click="toggleVirtual"
                />
              </div>
            </div>
            <div v-if="showVirtual">
              <div v-for="(option, index) in dropdownOptions3" :key="index">
                <div style="display: flex" class="q-py-md">
                  <div style="display: flex; justify-content: space-between; width: 100%">
                    <div>
                      <input
                        type="radio"
                        :id="'option_' + index"
                        :value="' Transfer ' + option.value"
                        v-model="selectedOption"
                      />
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent"
                        >{{ ' Transfer ' + option.value }}</label
                      >
                    </div>
                    <div style="width: 60px">
                      <q-img
                        :src="'../../assets/img/payment/' + option.imageUrl"
                        loading="lazy"
                        spinner-color="black"
                        style="max-width: 60px; margin: auto; justify-content: flex-end"
                        :alt="'Image ' + index"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- cash -->
          <div style="width: 100%" class="shadowBox">
            <div
              style="
                display: flex;
                justify-content: space-between;
                cursor: pointer;
                font-size: 18px;
              "
            >
              <span class="centerComponent" style="width: 350px; font-weight: 600">Cash</span>

              <div
                style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
              >
                <q-icon
                  :name="showCase ? arrowBottom : iconName1"
                  size="2rem"
                  color="green"
                  class="centerComponent"
                  @click="toggleCash"
                />
              </div>
            </div>
            <div v-if="showCase">
              <div v-for="(option, index) in dropdownOptions5" :key="index">
                <div style="display: flex" class="q-py-md">
                  <div style="display: flex; justify-content: space-between; width: 100%">
                    <div>
                      <input
                        type="radio"
                        :id="'option_' + index"
                        :value="option.value"
                        v-model="selectedOption"
                      />
                      <label
                        :for="'option_' + index"
                        style="font-weight: 600"
                        class="centerComponent"
                        >{{ option.value }}</label
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- row 1 col 2 -->

        <div
          class="no-padding"
          style="
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            border-radius: 10px;
          "
        >
          <div
            style="
              display: block;
              justify-content: space-between;
              cursor: pointer;
              font-size: 16px;
              width: fit-content;
            "
          >
            <div class="centerComponent" style="font-weight: 600; width: 350px">
              <div class="row q-px-md">
                <div class="col-9">
                  <label for="noPesanan" style="color: grey; font-size: small">NO. PESANAN</label>
                  <div style="padding: 5px">{{ this.user.billNumber }}</div>
                </div>
              </div>
              <q-separator horizontal class="q-ma-md" />
              <div style="background-color: #f1f5f9">
                <div style="text-transform: uppercase; padding: 10px; margin: 10px">
                  {{
                    selectedBank
                      ? selectedBank + ' ' + this.user.guestName
                      : selectedMethod + ' ' + this.user.guestName
                  }}
                </div>
              </div>
            </div>

            <q-separator horizontal class="q-ma-md" />
            <div class="centerComponent" style="width: 350px; font-weight: 600">
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
                      class="centerComponent q-px-sm"
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
                    <label
                      :for="'option_' + index"
                      style="font-weight: 600"
                      class="centerComponent"
                    >
                      {{ formating(total) }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="q-pa-md">
            <q-btn
              style="width: 100%; padding-right: 5px; padding-left: 5px"
              @click="redirectdetailpayment"
              color="primary"
              :label="selectedMethod || 'Select Payment'"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import { defineComponent, ref } from 'vue'
import PaymentImage from './fragments/bankimage.vue'
export default defineComponent({
  name: 'payment',
  components: { FOMenubar,PaymentImage },
  data() {
    return {
      showCase: false,
      showEwallet: false,
      showDropdown: false,
      showDebit: false,
      showVirtual: false,
      bankOption: true,
      iconName1: 'expand_more',
      iconName2: 'expand_more',
      iconName3: 'expand_more',
      iconName4: 'expand_more',
      arrowBottom: 'expand_less',
      arrowUp: 'expand_more',
      DPP: ref(),
      includeTax: false,
      dropdownOptions: [
        { value: 'BCA', imageUrl: '../../../assets/img/payment/Bank_Central_Asia.svg.webp' },
        { value: 'Mandiri', imageUrl: '../../../assets/img/payment/2560px-Bank_Mandiri_logo.svg.png' },
        { value: 'BRI', imageUrl: '../../../assets/img/payment/1280px-BANK_BRI_logo.svg.webp' },
        // Add other options...
      ],
      dropdownOptions2: [
        {
          value: 'Qris',
          imageUrl: 'quick-response-code-indonesia-standard-qris-logo-F300D5EB32-seeklogo.com.png'
        },
        { value: 'Gopay', imageUrl: 'Gopay_logo.svg.png' },
        { value: 'ShopeePay', imageUrl: 'logo-shopeepay.png' }
      ],
      dropdownOptions3: [
        { value: 'BCA', imageUrl: 'Bank_Central_Asia.svg.webp' },
        { value: 'BNI', imageUrl: '1200px-BNI_logo.svg.png' }
      ],
      dropdownOptions4: [
        { value: 'Visa', imageUrl: '../../assets/img/payment/Visa_Inc._logo.svg.png' },
        { value: 'Master', imageUrl: '../../assets/img/payment/mastercard-og-image.png' },
        { value: 'JCB', imageUrl: '../../assets/img/payment/JCB_logo.svg.png' }
      ],
      dropdownOptions5: [
        {
          value: 'Cash'
        }
      ],
      selectedBank: '',
      selectedOption: null,
      selectedMethod: '',
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
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
      this.iconName1 = this.showDropdown ? this.arrowBottom : this.arrowUp
      this.iconName2 = this.showDropdown ? this.arrowUp : this.arrowUp
      this.iconName3 = this.showDropdown ? this.arrowUp : this.arrowUp
      this.iconName4 = this.showDropdown ? this.arrowUp : this.arrowUp
      this.showDebit = false
      this.showEwallet = false
      this.showVirtual = false
      this.showCase = false
      this.selectedMethod = this.showDropdown ? (find(1) ? 'Bank Transfer' : '') : ''
    },
    toggleBank() {
      this.showDebit = !this.showDebit
      this.iconName2 = this.showDebit ? this.arrowBottom : this.arrowUp
      this.iconName1 = this.showDebit ? this.arrowUp : this.arrowUp
      this.iconName3 = this.showDebit ? this.arrowUp : this.arrowUp
      this.iconName4 = this.showDebit ? this.arrowUp : this.arrowUp
      this.showDropdown = false
      this.showCase = false
      this.showVirtual = false
      this.showEwallet = false
      if (this.showDebit) {
        this.selectedBank = 'Kartu Kredit'
        this.selectedMethod = 'Debit'
      } else {
        this.selectedBank = ''
        this.selectedMethod = ''
      }
    },
    toggleEwallet() {
      this.showEwallet = !this.showEwallet
      this.iconName3 = this.showEwallet ? this.arrowBottom : this.arrowUp
      this.iconName1 = this.showEwallet ? this.arrowUp : this.arrowUp
      this.iconName2 = this.showEwallet ? this.arrowUp : this.arrowUp
      this.iconName4 = this.showEwallet ? this.arrowUp : this.arrowUp
      this.showDropdown = false
      this.showDebit = false
      this.showVirtual = false
      if (this.showEwallet) {
        this.selectedMethod = 'E-Wallet'
      } else {
        this.selectedMethod = ''
      }
    },
    toggleVirtual() {
      this.showVirtual = !this.showVirtual
      this.iconName4 = this.showVirtual ? this.arrowBottom : this.arrowUp
      this.iconName1 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.iconName2 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.iconName3 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.showDropdown = false
      this.showDebit = false
      this.showCase = false
      this.showEwallet = false
      this.selectedMethod = this.showVirtual ? (find(3) ? 'Virtual Account' : '') : ''
    },
    toggleCash() {
      this.showCase = !this.showCase
      this.iconName4 = this.showVirtual ? this.arrowBottom : this.arrowUp
      this.iconName1 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.iconName2 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.iconName3 = this.showVirtual ? this.arrowUp : this.arrowUp
      this.showDropdown = false
      this.showDebit = false
      this.showEwallet = false
      this.showVirtual = false
      this.selectedMethod = this.showCase ? (find(3) ? 'Cash' : '') : ''
    },
    redirectdetailpayment() {
      if (this.selectedBank !== '' && this.selectedBank !== null) {
        const { resvId, resvRoomId } = this.$route.params
        this.$ResvStore.selectedbank = this.selectedBank
        this.$ResvStore.selectedmethod = this.selectedMethod

        this.$router.push({
          name: 'detail-payment',
          params: { resvId: resvId, resvRoomId: resvRoomId }
        })
      } else {
        this.trigger('warning','select your method')
      }
    },

    calculateTotal() {
      this.total = this.priceBook.reduce((accumulator, currentValue) => {
        return accumulator + parseFloat(currentValue.amount) // Mengonversi ke float sebelum penambahan
      }, 0)
      console.log(this.total)

      // Add tax if includeTax is true
      if (this.includeTax) {
        // this.total += this.calculateTax(this.total)
        this.total += this.DPP
      }
    },
    calculateTax(subtotal) {
      return subtotal + this.DPP // Assuming tax is 10%
    },
    find(value) {
      if (value == 1) {
        return this.dropdownOptions.find((option) => option.value === this.selectedBank)
      } else if (value == 2) {
        return this.dropdownOptions2.find((option) => option.value === this.selectedBank)
      } else if (value == 3) {
        return this.dropdownOptions3.find((option) => option.value === this.selectedBank)
      }
    },
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
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
    },
    fetchcart() {
      // const { currentResvId, currentRoomResvId } = this.$ResvStore
      const { resvId, resvRoomId } = this.$route.params

      try {
        this.api.get(`invoice/payment/${resvId}/${resvRoomId}`, ({ status, message, data }) => {
          if (status === 200) {
            const { invoices, add } = data
            this.user = { ...add }
            this.priceBook = invoices
            console.log(this.user)
            this.DPP = data.tax
            // this.user = data.add
            this.calculateTotal()
            this.data = invoices.rate
            // this.formatData(data.invoices)
          }
        })
      } catch (error) {
        console.error(error)
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
          RoomBoy: { data: 'Asep', style: {} },
          VoucherNumber: { data: 101111, style: {} },
          BillDate: { data: inv.billDate, style: {} },
          uniqueId: { data: inv.uniqueId, style: {} }
        })
      })
      console.log(list)
      this.data = list
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
}
.buttonPayment {
  width: 100%;

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
