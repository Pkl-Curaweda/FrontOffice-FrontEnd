<template>
  <q-page
    class=""
    style="
      gap: 20px;
      display: flex;
      overflow-y: scroll;
      width: 100%;
      min-width: max-content;
      min-height: calc(100vh - 51.25px);
    "
  >
    <HKCard card_class="col-grow q-mt-xl" :style="`border-radius: 0 0 ${radius} ${radius}`">
      <div
        class="full-width flex-center absolute flex justify-center text-subtitle"
        style="top: -20px; left: 0; font-weight: 600; padding: 2px; background-color: #c2e7b9"
        :style="`border-radius: ${radius} ${radius} 0 0`"
      >
        List Existed Article
      </div>
      <!-- ==========Date=============== -->
      <div style="display: flex; justify-content: end; width: 100%">
        <!-- ====== -->
        <q-input
          outlined
          dense
          v-model="searchInput"
          class="input-border"
          label="Description"
          style="width: fit-content"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <div
        :class="`tableComp ${gapColorClass}`"
        class="my-table multi-panel q-py-md"
        style="width: 100%; flex-grow: 1"
      >
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          square
          :table-header-style="{
            backgroundColor: '#069550',
            color: '#ffffff',
            padding: '9px'
          }"
          hide-bottom
          :card-style="{ boxShadow: 'none' }"
          :rows-per-page-options="[0]"
          :dense="$q.screen.lt.md"
        >
          <template v-slot:body="props">
            <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
              <q-td key="Article Number" :props="props">
                {{ props.row.articleNumber }}
              </q-td>
              <q-td key="Description" :props="props">
                {{ props.row.description }}
              </q-td>
              <q-td key="Stock" :props="props">
                {{ props.row.stock }}
              </q-td>
              <q-td key="Remain" :props="props">
                {{ props.row.remain }}
              </q-td>
              <q-td key="Price" :props="props">
                {{ props.row.price }}
              </q-td>
              <q-td key="Action" :props="props" style="width: 10px">
                <q-btn flat rounded size="13px" style="color: #008444" @click="editArt(props.row)"
                  ><svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 13C8.8 13 9.57 12.93 10.31 12.82L13.22 9.91C11.89 10.59 10 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.13L15.39 7.74C15.57 7.56 15.78 7.42 16 7.3V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.04 3.06 17.72 7 17.97V16.13L7.17 15.96C3.84 15.76 2 14.46 2 14V11.77C3.61 12.55 5.72 13 8 13ZM8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2ZM15.13 10.83L17.17 12.87L11.04 19H9V16.96L15.13 10.83ZM18.85 11.19L17.87 12.17L15.83 10.13L16.81 9.15C17 8.95 17.33 8.95 17.53 9.15L18.85 10.47C19.05 10.67 19.05 11 18.85 11.19Z"
                      fill="#008444"
                    />
                  </svg>
                </q-btn>
                <q-btn flat rounded size="13px" style="color: #008444" @click="deleteArt(props.row)"
                  ><svg
                    width="19"
                    height="19"
                    viewBox="0 0 19 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 10.59V4.5C16 2.29 12.42 0.5 8 0.5C3.58 0.5 0 2.29 0 4.5V14.5C0 16.71 3.59 18.5 8 18.5C8.46 18.5 8.9 18.5 9.33 18.44C9.1129 17.8162 9.00137 17.1605 9 16.5V16.45C8.68 16.5 8.35 16.5 8 16.5C4.13 16.5 2 15 2 14.5V12.27C3.61 13.05 5.72 13.5 8 13.5C8.65 13.5 9.27 13.46 9.88 13.39C10.4127 12.5085 11.1638 11.7794 12.0607 11.2731C12.9577 10.7668 13.9701 10.5005 15 10.5C15.34 10.5 15.67 10.54 16 10.59ZM14 9.95C12.7 10.9 10.42 11.5 8 11.5C5.58 11.5 3.3 10.9 2 9.95V7.14C3.47 7.97 5.61 8.5 8 8.5C10.39 8.5 12.53 7.97 14 7.14V9.95ZM8 6.5C4.13 6.5 2 5 2 4.5C2 4 4.13 2.5 8 2.5C11.87 2.5 14 4 14 4.5C14 5 11.87 6.5 8 6.5ZM19 15.5V17.5H11V15.5H19Z"
                      fill="#269861"
                    />
                  </svg>
                </q-btn>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
    </HKCard>
    <HKCard :style="`border-radius: 0 0 ${radius} ${radius}`">
      <div class="text-h5 q-mt-md">{{ titleVoucher || 'Add Article' }}</div>
      <div style="gap: 10px; display: flex">
        <q-input
          dense
          outlined
          v-model="artNo"
          label="Art No"
          style="width: 80px"
          class="text-bold q-mt-sm"
        />
        <q-input dense outlined v-model="price" label="Price" class="q-mt-sm col-grow text-bold" />
      </div>
      <div class="q-mt-sm" style="display: flex; gap: 10px">
        <q-input dense outlined v-model="stock" label="Stock" class="col-grow text-bold">
          <template v-slot:append>
            <q-icon name="error">
              <q-tooltip> Ignore if unlimited </q-tooltip>
            </q-icon>
          </template>
        </q-input>

        <q-input
          dense
          outlined
          v-model="description"
          label="description"
          class="col-grow text-bold"
        />
      </div>
      <div class="q-py-sm flex q-mt-sm" style="gap: 5px; border-top: 1px solid green">
        <q-btn size="sm" no-caps outline v-if="!isEditing" @click="clearFields">Cancel</q-btn>
        <q-btn size="sm" no-caps color="primary" text-color="white" @click="saveArt">
          {{ labelButton || 'Submit' }}</q-btn
        >
      </div>
    </HKCard>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'

export default defineComponent({
  name: 'SuperAdminArticle',
  components: { HKCard },
  setup() {
    return {
      columns: [
        { name: 'Article Number', label: 'Article Number', align: 'left', field: 'articleNumber' },
        { name: 'Description', label: 'Description', align: 'left', field: 'description' },
        { name: 'Stock', label: 'Stock', align: 'left', field: 'stock' },
        { name: 'Remain', label: 'Remain', align: 'left', field: 'remain' },
        { name: 'Price', label: 'Price (Rp. )', align: 'left', field: 'price' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      titleVoucher: ref(),
      rows: ref(),
      searchInput: ref(''),
      artNo: ref(),
      price: ref(),
      stock: ref(),
      description: ref()
    }
  },
  data() {
    return {
      api: new this.$Api('superadmin')
    }
  },
  watch() {
    this.searchDescription(this.searchInput)
  },
  watch: {
    searchInput: {
      handler(newSearchInput) {
        this.searchDescription(newSearchInput)
      },
      immediate: true
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    trigger(type, txt) {
      this.$q.notify(
        {
          type: type,
          message: txt || 'error unknown action try again',
          timeout: 1000
        },
        1000
      )
    },
    searchDescription(searchInput) {
      this.searchData = searchInput
      this.fetchData()
    },
    saveArt() {
      if (this.titleVoucher === 'Edit Article') {
        this.updateArt()
      } else {
        this.postArt()
        this.clearFields()
      }
    },
    postArt() {
      const data = {
        artNo: parseInt(this.artNo),
        price: parseInt(this.price),
        stock: parseInt(this.stock),
        description: this.description
      }

      let url = `article/add`

      this.api.post(url, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    updateArt() {
      const data = {
        artNo: parseInt(this.artNo),
        price: parseInt(this.price),
        stock: parseInt(this.stock),
        description: this.description
      }

      let url = `article`

      this.api.post(url, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
          this.fetchData()
        } else {
          this.trigger('negative', message)
        }
      })
    },
    editArt(row) {
      this.titleVoucher = 'Edit Article'
      const artNo = row.articleNumber
      console.log(row.articleNumber)
      let url = `article?art=${artNo}`

      this.api.get(url, ({ status, data, message }) => {
        if (status == 200) {
          const { detail } = data

          this.artNo = detail.artNo
          this.price = detail.price
          this.stock = detail.stock
          this.description = detail.description
          this.trigger('possitve', message)
        }
      })
    },
    deleteArt(row) {
      const artNo = row.articleNumber

      let url = `article/${artNo}`

      this.api.delete(url, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
          this.fetchData()
        }
      })
    },
    clearFields() {
      this.titleVoucher = ''
      this.artNo = ''
      this.price = ''
      this.stock = ''
      this.description = ''
    },
    fetchData() {
      this.loading = true

      let url = `article?search=${this.searchData}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { table } = data

          this.rows = table.map((art) => ({
            articleNumber: art.artNo,
            description: art.description,
            stock: art.stock,
            remain: art.remain,
            price: art.price
          }))

          console.log(this.rows)
        }
      })
    }
  }
})
</script>

<style></style>
