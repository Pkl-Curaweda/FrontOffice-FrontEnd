<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <FOMenubar>
      <template #right>
        <q-btn
          flat
          square
          color="primary"
          icon="o_print"
        />
      </template>
    </FOMenubar>

    <div class="row justify-between content-between q-ma-md">
      <iframe src="../../assets/pdf/invoicePdf.pdf" frameborder="0" style="min-width: 50%;"></iframe>
      <div class="column justify-between" style="min-width: 50%; gap: 15px;">
        <div class="column" style="gap: 10px;">
          <div class="row justify-between" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Page</p>
            <p class="q-my-auto">2 Pages</p>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Forecast</p>
            <q-select
              outlined
              dense
              v-model="forecast"
              :options="forecastOpt"
              label="Per-"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="event" />
              </template>
            </q-select>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Destination</p>
            <q-select
              outlined
              dense
              v-model="destination"
              :options="destinationOpt"
              label="Save as"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            >
              <template v-slot:prepend>
                <q-icon name="note" />
              </template>
            </q-select>
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Pages</p>
            <q-select
              outlined
              dense
              v-model="pages"
              :options="pagesOpt"
              label="Pages"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Pages per sheet</p>
            <q-select
              outlined
              dense
              v-model="pagesper"
              :options="pagesperOpt"
              label="Pages per sheet"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
          <div class="row justify-around" style="overflow: auto; min-width: 100%; max-width: 100%;">
            <p class="q-my-auto" style="min-width: 60%; max-width: 60%;">Margin</p>
            <q-select
              outlined
              dense
              v-model="margin"
              :options="marginOpt"
              label="Margin"
              dropdown-icon="expand_more"
              class="col-grow"
              color="primary"
            />
          </div>
        </div>
        <div style="gap: 8px" class="q-mt-lg row no-wrap items-center justify-end">
          <q-btn label="Print" unelevated color="primary" dense class="text-capitalize q-px-md q-py-sm" />
          <q-btn label="Save" unelevated color="primary" dense class="text-capitalize q-px-md q-py-sm" />
          <q-btn label="Cancel" outline color="primary" dense class="text-capitalize q-px-md q-py-sm" />
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import FOMenubar from 'src/components/FOMenubar.vue'

export default defineComponent({
  name: 'Print',
  setup() {
    return {
      forecast: ref(null),
      forecastOpt: ['Per-Day', 'Per-Week', 'Per-Month'],
      destination: ref(null),
      destinationOpt: ['Save As PDF', 'Custom'],
      pages: ref(null),
      pagesOpt: ['All', 'Custom'],
      pagesper: ref(null),
      pagesperOpt: ['1', 'Custom'],
      margin: ref(null),
      marginOpt: ['Default', 'Custom'],
    }
  },
  components: { FOMenubar }
})
</script>
