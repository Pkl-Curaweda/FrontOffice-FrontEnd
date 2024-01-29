<template>
  <div class="full-width">
    <div class="row q-pt-sm" style="gap: 5px">
      <div style="background-color: #008001; color: white; width: 700px" class="q-py-sm q-pl-sm">
        {{ backgroundedTotal || 0.0 }}
      </div>
      <div style="background-color: #008001; width: 20px"></div>
      <div style="background-color: #e4e4e4; color: #008444" class="q-pa-sm">
        <q-icon name="north_west" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-pa-sm">
        <q-icon name="north_east" size="20px" />
      </div>
      <div style="background-color: #fdfd06" class="q-py-sm col-grow q-pl-sm">
        {{ backgroundedBalance || 0.0 }}
      </div>
    </div>

    <div class="row items-center q-mt-md full-width" style="gap: 7px">
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Description:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ description || '-' }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Qty:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          <!-- <q-input borderless :dense="dense" v-model="updatedQtyWithDefault" /> -->
          {{ updatedQtyWithDefault }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Rate:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ rate || '-' }}
        </div>
      </div>
      <div class="row items-center">
        <div class="text-bold q-pr-sm">Amount:</div>
        <div
          style="border: 1.5px #00000080 solid"
          class="text-bold q-py-xs q-px-sm rounded-borders"
        >
          {{ amount || '-' }}
        </div>
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div>Payment</div>
          <div>Rp 0.00</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>
      <div class="items-center col-grow">
        <div class="text-bold row" style="justify-content: space-between">
          <div>Balance</div>
          <div>{{ balance || 'Rp 0.00' }}</div>
        </div>
        <q-separator class="" style="background: rgba(0, 0, 0, 0.5)" size="1.5px" />
      </div>

      <div class="row" style="gap: 7px">
        <q-btn
          unelevated
          dense
          class="text-capitalize q-px-sm"
          color="primary"
          label="Invoice"
          to="payment"
        />
        <q-btn
          flat
          square
          color="primary"
          icon="o_find_in_page"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
          @click="viewBill = true"
        />

        <!-- dialog view bill on form invoice -->
        <q-dialog v-model="viewBill">
          <q-card>
            <q-card-section class="items-center q-pb-none">
              <div class="row items-center">
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
              </div>
            </q-card-section>

            <q-card-section>
              <div>make table in here</div>
            </q-card-section>
          </q-card>
        </q-dialog>
        <q-btn
          flat
          square
          color="primary"
          to="/fo/guest-invoice/print"
          icon="o_print"
          class="border-button rounded-borders"
          style="padding: 6px 3px"
        />
      </div>
    </div>

    <div class="row q-mt-sm" style="gap: 7px">
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Bill Address"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="billAddress"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
      <q-expansion-item
        dense
        style="font-weight: bold"
        label="Comments"
        class="padding-expansion col-grow"
      >
        <q-card>
          <q-input
            v-model="comments"
            label="Note..."
            dense
            outlined
            style="max-height: 200px"
            type="textarea"
          />
        </q-card>
      </q-expansion-item>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'InvoiceForm',
  setup() {
    const $q = useQuasar()
    return {
      updateQty: ref(''),
      description: ref(''),
      billAdress: ref(''),
      comments: ref(''),
      viewBill: ref(false)
    }
  },
  data() {
    return {
      api: new this.$Api('frontoffice'),
      data: []
    }
  },
  computed: {
    updatedQtyWithDefault: {
      get() {
        return this.updateQty || '-'
      },
      set(value) {
        this.updateQty = value
      }
    }
  },
  mounted() {
    // this.getDetailForm()

    if (this.$ResvStore.UniqueId) {
      this.getDetailForm()
    }

    // watch(
    //   () => this.$ResvStore.UniqueId,
    //   () => {
    //     this.getDetailForm()
    //   }
    // )
  },
  watch: {
    // Watch for changes in specific properties and call the function when they change
    '$ResvStore.currentResvId': 'getDetailForm',
    '$ResvStore.currentRoomResvId': 'getDetailForm',
    '$ResvStore.dateBill': 'getDetailForm',
    '$ResvStore.Artlb': 'getDetailForm',
    '$ResvStore.UniqueId': 'getDetailForm'
  },
  methods: {
    formatCurrency(num = 0) {
      return num.toLocaleString()
    },
    triggerPositive(message) {
      this.$q.notify(
        {
          type: 'positive',
          message: message || 'This is a "positive" type notification.',
          timeout: 1000
        },
        4000
      )
    },
    getDetailForm() {
      const { resvId, resvRoomId, dateBill, Artlb, UniqueId } = this.$route.params
      this.loading = true
      this.api.get(
        `detail/invoice/${resvId}/${resvRoomId}/?ids=${UniqueId}`,
        ({ status, data }) => {
          this.loading = false

          if (status == 200) {
            const { detail } = data

            this.backgroundedTotal = this.formatCurrency(data.total)
            this.backgroundedBalance = this.formatCurrency(data.balance)
            this.description = detail.desc
            this.updateQty = detail.qty
            this.rate = this.formatCurrency(detail.rate)
            this.amount = this.formatCurrency(detail.amount)
            this.balance = `Rp ${this.formatCurrency(data.balance)}`
            this.billAddress = data.address
            this.comments = data.comment
            this.console.log('hallo')
          }
          this.triggerPositive('GET Data Successfully')
        }
      )
    },
    async editDataInv() {
      const { currentResvId, currentRoomResvId, dateBill, UniqueId } = this.$ResvStore
      const data = {
        qty: this.qty
      }
      try {
        await this.api.put(
          `detail/invoice/${currentResvId}/${currentRoomResvId}?ids=${UniqueId}`,
          data,
          ({ status, data }) => {
            this.loading = true

            if (status == 200) {
              this.loading = false
              console.log(data)
              this.triggerPositive('Update Data Successfully')
            }
          }
        )
      } catch (error) {
        console.log('Terjadi Kesalahan: ' + error)
      }
    }
  }
})
</script>
