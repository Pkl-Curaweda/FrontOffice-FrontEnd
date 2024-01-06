<template>
  <FOMenubar>
    <template #left></template>
  </FOMenubar>
  <!-- payment slot -->
  <div
    style="
      width: fit-content;
      margin: auto;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    "
    class="shadowBox"
  >
    <div style="display: flex">
      <div
        style="display: block; margin-top: auto; margin-bottom: auto"
        class="q-ma-md"
        v-if="paymentDetail"
      >
        <!-- Kartu Kredit -->
        <div style="width: 100%" class="shadowBox">
          <div
            style="display: flex; justify-content: space-between; cursor: pointer; font-size: 18px"
          >
            <span class="centerComponent" style="width: 350px; font-weight: 600"
              >Kartu Kredit/ Debit</span
            >

            <div
              style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
            >
              <div style="width: 80px" class="q-px-sm">
                <q-img
                  src="../../assets/img/payment/pngfind.com-secure-checkout-png-1524515.png"
                  loading="lazy"
                  spinner-color="black"
                  style="max-width: 80px; margin: auto"
                />
              </div>
              <div v-for="(option, index) in dropdownOptions4" :key="index">
                <div style="width: 80px" class="q-px-sm">
                  <q-img
                    :src="'../../../public/images/' + option.imageUrl"
                    loading="lazy"
                    spinner-color="black"
                    style="max-width: 80px; margin: auto"
                  />
                </div>
              </div>
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
            style="display: flex; justify-content: space-between; cursor: pointer; font-size: 18px"
          >
            <span class="centerComponent" style="width: 350px; font-weight: 600"
              >Bank Transfer</span
            >

            <div
              style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
            >
              <div v-for="(option, index) in dropdownOptions" :key="index">
                <div style="width: 80px" class="q-px-sm">
                  <q-img
                    :src="'../../../public/images/' + option.imageUrl"
                    loading="lazy"
                    spinner-color="black"
                    style="max-width: 80px; margin: auto"
                  />
                </div>
              </div>
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
                      :src="'../../../public/images/' + option.imageUrl"
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
            style="display: flex; justify-content: space-between; cursor: pointer; font-size: 18px"
          >
            <span class="centerComponent" style="width: 350px; font-weight: 600">E-Wallet</span>

            <div
              style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
            >
              <div v-for="(option, index) in dropdownOptions2" :key="index">
                <div style="width: 80px" class="q-px-sm">
                  <q-img
                    :src="'../../../public/images/' + option.imageUrl"
                    loading="lazy"
                    spinner-color="black"
                    style="max-width: 80px; margin: auto"
                  />
                </div>
              </div>
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
                      :src="'../../../public/images/' + option.imageUrl"
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
            style="display: flex; justify-content: space-between; cursor: pointer; font-size: 18px"
          >
            <span class="centerComponent" style="width: 350px; font-weight: 600"
              >Virtual Account</span
            >

            <div
              style="display: flex; cursor: pointer; width: 100%; justify-content: end; gap: 2px"
            >
              <div v-for="(option, index) in dropdownOptions3" :key="index">
                <div style="width: 80px" class="q-px-sm">
                  <q-img
                    :src="'../../../public/images/' + option.imageUrl"
                    loading="lazy"
                    spinner-color="black"
                    style="max-width: 80px; margin: auto"
                  />
                </div>
              </div>
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
                      :src="'../../../public/images/' + option.imageUrl"
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
      </div>
      <!-- row 1 col 2 -->
      <div
        v-if="paymentDetail == false || true"
        :class="{ 'shadowBox q-pa-lg': paymentDetail == false }"
      >
        <div
          style="display: flex; justify-content: space-between; width: 100%"
          v-if="paymentDetail == false"
        >
          <div style="color: black; font-size: x-large; font-weight: 600" class="q-pa-sm">
            Total Pembayaran
          </div>
          <div style="width: fit-content; margin: 10px">
            <label
              :for="'option_' + index"
              style="font-weight: 600; font-size: large"
              class="centerComponent"
            >
              {{ total }}</label
            >
          </div>
        </div>
        <div
          v-if="paymentDetail == false || true"
          :class="!paymentDetail ? 'detailPayment' : 'shadowBox no-padding'"
        >
          <div
            style="display: block; justify-content: space-between; cursor: pointer; font-size: 16px"
          >
            <div
              class="centerComponent"
              style="font-weight: 600"
              :style="paymentDetail2 ? { 'width :': '1000px;' } : { 'width :': '350px;' }"
            >
              <div class="row q-px-md">
                <div class="col-9">
                  <label for="noPesanan" style="color: grey; font-size: small">NO. PESANAN</label>
                  <div style="padding: 5px">{{ noPesanan }}</div>
                </div>
                <div class="col" v-if="!paymentDetail">{{ selectedBank + '/ '+selectedMethod }}</div>
              </div>
              <q-separator horizontal class="q-ma-md" />
              <div style="background-color: #f1f5f9">
                <div style="text-transform: uppercase; padding: 10px; margin: 10px">
                  {{ namaUser + ', ' + namauserBank + ' - ' + telp }}
                </div>
              </div>
            </div>

            <q-separator horizontal class="q-ma-md" />
            <div
              class="centerComponent"
              style="font-weight: 600"
              :style="paymentDetail2 ? { 'width :': '1000px;' } : { 'width :': '350px;' }"
            >
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
                          >{{ ' Transfer ' + option.label }}</label
                        >
                      </div>
                      <div style="width: 60px">
                        <label
                          :for="'option_' + index"
                          style="font-weight: 600"
                          class="centerComponent"
                          >{{ option.price }}</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  style="
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    margin-right: 10px;
                  "
                >
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
                      >DPP</label
                    >
                  </div>
                  <label
                    :for="'option_' + index"
                    style="font-weight: 600"
                    class="centerComponent"
                    >{{ DPP }}</label
                  >
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
                      {{ total }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="paymentDetail ? 'q-pa-lg' : 'q-pa-lg buttonPayment'">
            <div style="display: flex; gap: 10px">
              <q-btn
                v-if="paymentDetail == false"
                align="left"
                class="btn-fixed-width q-ma-auto"
                style="width: 100%"
                color="primary"
                label="OK"
              />
              <q-btn
                align="left"
                class="btn-fixed-width q-ma-auto"
                style="width: 100%"
                @click="moveDetail()"
                color="primary"
                :outline="!paymentDetail"
                :label="paymentDetail ? selectedMethod || 'Select Method Payment' : 'Cancel'"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'payment',
  components: { FOMenubar },
  data() {
    return {
      showEwallet: false,
      showDropdown: false,
      showDebit: false,
      paymentDetail: true,
      paymentDetail2: false,
      bankOption: true,
      showVirtual: false,
      iconName1: 'expand_more',
      iconName2: 'expand_more',
      iconName3: 'expand_more',
      iconName4: 'expand_more',
      arrowBottom: 'expand_less',
      arrowUp: 'expand_more',
      NameCard: '',
      DPP: '10%',
      includeTax: false,
      // from user
      noPesanan: '25513515',
      namaUser: 'Rono Rustan',
      namauserBank: 'Henry',
      telp: '08977663660',
      priceBook: [
        { label: 'Condotel Room', qty: '1', price: '5000000' },
        { label: 'Nasi Goreng', qty: '1', price: '5000000' },
        { label: 'Breakfast', qty: '1', price: '5000000' }
      ],
      total: 0,

      dropdownOptions: [
        { value: 'BCA', imageUrl: 'Bank_Central_Asia.svg.webp' },
        { value: 'Mandiri', imageUrl: '2560px-Bank_Mandiri_logo.svg.png' },
        { value: 'BRI', imageUrl: '1280px-BANK_BRI_logo.svg.webp' },
        { value: 'BNI', imageUrl: '1200px-BNI_logo.svg.png' }
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
        { value: 'Visa', imageUrl: 'Visa_Inc._logo.svg.png' },
        { value: 'Master', imageUrl: 'mastercard-og-image.png' },
        { value: 'JCB', imageUrl: 'JCB_logo.svg.png' }
      ],
      selectedBank: '',
      selectedOption: null,
      selectedMethod: ''
    }
  },
  watch: {
    selectedOption(newVal) {
      this.selectedBank = newVal
      console.log('method payment' + this.selectedBank)
      console.log('method payment ' + this.selectedMethod)
    },
    includeTax() {
      this.calculateTotal() // Panggil method calculateTotal() saat status checkbox berubah
    }
  },
  created() {
    this.calculateTotal() // Panggil method calculateTotal() saat komponen dibuat
  },
  mounted() {
    console.log(this.NameCard)
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
      this.selectedMethod = this.showDropdown ? find(1) ? 'Bank Transfer' : '' : ''
    },
    toggleBank() {
      this.showDebit = !this.showDebit
      this.iconName2 = this.showDebit ? this.arrowBottom : this.arrowUp
      this.iconName1 = this.showDebit ? this.arrowUp : this.arrowUp
      this.iconName3 = this.showDebit ? this.arrowUp : this.arrowUp
      this.iconName4 = this.showDebit ? this.arrowUp : this.arrowUp
      this.showDropdown = false
      this.showEwallet = false
      this.showVirtual = false
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
      this.showEwallet = false
      this.selectedMethod = this.showVirtual ? find(3) ? 'Virtual Account' : '' : ''
    },
    calculateTotal() {
      // Menggunakan metode reduce() untuk menjumlahkan nilai properti 'price'
      this.total = this.priceBook.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue.price) // Mengonversi ke integer sebelum penambahan
      }, 0)
      console.log(this.total)
      if (this.includeTax) {
        this.total = this.total + this.calculateTax(this.total)
      }
    },
    calculateTax(subtotal) {
      // this.subtotal = this.DPP + this.total
      // console.log(this.subtotal)
      return subtotal * 0.1
    },
    moveDetail() {
      // this.$router.push('/fo/payment/detail')
      try {
        if (this.selectedBank == null || this.selectedBank == '') {
          console.log('required bank method')
        } else {
          this.paymentDetail = !this.paymentDetail
          this.bankOption = false
          paymentDetail2 = true
        }
      } catch (error) {
        console.error('Error: ' + error.massage)
      }
    },
    find(value) {
      if (value == 1) {
        return this.dropdownOptions.find((option) => option.value === this.selectedBank)
      } else if (value == 2){
        return this.dropdownOptions2.find((option) => option.value === this.selectedBank)
      } else if (value == 3){
        return this.dropdownOptions3.find((option) => option.value === this.selectedBank)
      }
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
