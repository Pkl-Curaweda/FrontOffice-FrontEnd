<template>
    <FOMenubar>
    <template #left></template>
  </FOMenubar>
  <!-- <div style="width:100%; height: 100%; background-color:black;"></div>
   -->
   <div
        style="width:fit-content; margin:auto;"
        :class="{ 'shadowBox q-pa-lg': paymentDetail == false }"
      >
        <div
          style="display: flex; justify-content: space-between; width: 100%"
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
                <div class="col">
                  {{ selectedBank + '/ ' + selectedMethod }}
                </div>
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
                      <div>
                        <label
                          :for="'option_' + index"
                          style="font-weight: 600"
                          class="centerComponent"
                          >{{ formating(option.price) }}</label
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
                      {{ formating(total) }}</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div :class="paymentDetail ? 'q-pa-lg' : 'q-pa-lg buttonPayment'">
            <div style="display: flex; gap: 10px">
              <q-btn
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
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'detail',
  props: ['selectedBank', 'selectedMethod'],
  data() {
    return {
      paymentDetail: false,
      paymentDetail2: false,
      arrowUp: 'expand_more',
      NameCard: '',
      DPP: '10%',
      includeTax: false,
      bank: this.selectedBank,
      metode: this.selectedMethod,
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
      selectedOption: null,
    }
  },
  watch: {
    includeTax() {
      this.calculateTotal() // Panggil method calculateTotal() saat status checkbox berubah
    }
  },
  created() {
    this.calculateTotal() // Panggil method calculateTotal() saat komponen dibuat
  },
  mounted() {
    console.log('Selected Bank:', this.selectedBank);
    console.log('Selected Method:', this.selectedMethod);
  },
  methods: {
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
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
  }
})
</script>
<style>.wrapchoose {
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
}</style>
