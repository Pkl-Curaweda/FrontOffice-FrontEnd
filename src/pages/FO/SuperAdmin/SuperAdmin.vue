<template>
  <q-page>
    <div class="q-pa-md">
      <div style="display: flex; gap: 5px; width: 100%">
        <div class="q-pa-md" style="width: 80%">
          <div
            style="justify-content: space-between; display: flex; width: 95%; margin-inline: auto"
          >
            <div class="q-my-auto" style="font-size: larger">List Room</div>
            <q-btn
              size="xs"
              color="primary"
              dense
              class="q-my-auto q-px-sm"
              @click="addroom = true"
              :icon="'add'"
            />
          </div>
          <div class="my-table q-mt-md">
            <q-table
              class="no-shadow my-sticky-dynamic"
              flat
              bordered
              virtual-scroll
              v-model:pagination="pagination"
              @request="onPaginationChange"
              :rows="rows"
              :loading="loading"
              :columns="columns"
              hide-bottom
              row-key="name"
            >
              <template>
                <q-tr class="table-head">
                  <q-th style="padding-top: 0px; padding-bottom: 0px">
                    <template v-slot:header="props">
                      <q-tr class="table-head" :props="props">
                        <q-th
                          v-for="(col, i) in props.cols"
                          :key="i"
                          style="padding-top: 0px; padding-bottom: 0px"
                        >
                        </q-th>
                      </q-tr>
                    </template>
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <template v-for="(cell, key, i) in props.row" :key="i">
                    <q-td :style="cell.style" @click="dialogalert(props.row)">
                      {{ cell }}
                      <!-- style="border-bottom-width: 2px; border-color:rgba(128, 128, 128, 0.568);" -->
                    </q-td>
                  </template>
                  <q-td key="" :props="props" style="width: 10px">
                    <div style="display: flex">
                      <div style="height: fit-content; width: fit-content"></div>
                      <div>
                        <q-btn auto-close flat round :color="'primary'" icon="more_vert">
                          <q-menu>
                            <q-list style="align-content: flex-end; width: 100%">
                              <q-item
                                clickable
                                v-close-popup
                                @click="setRoomResv(props.row)"
                                style="display: flex"
                              >
                                <q-btn
                                  flat
                                  rounded
                                  size="13px"
                                  @click="setRoomResv(props.row)"
                                  style="color: #008444"
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
                                <q-item-section>
                                  <q-item-label>Edit</q-item-label>
                                </q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                v-close-popup
                                @click="deleteResv(props.row)"
                                style="display: flex"
                              >
                                <q-btn
                                  flat
                                  rounded
                                  size="14px"
                                  style="color: #269861"
                                  @click="deleteResv(props.row)"
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
                                <q-item-section>
                                  <q-item-label>Delete</q-item-label>
                                </q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn>
                      </div>
                    </div>
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </div>
        <q-dialog v-model="addroom">
          <q-card class="q-pa-lg" style="width: 9000px">
            <q-form class="q-mt-lg q-mx-auto">
              <div>Create Room</div>
              <div style="width: 100%; display: flex">
                <div style="width: 50%">
                  <div style="display: block">
                    <div style="display: flex; gap: 10px; width: 100%" class="col">
                      <q-select
                        outlined
                        v-model="roomTypeSelect"
                        :options="options"
                        dense
                        style="width: 100%"
                        :label="'Select Room Type'"
                        dropdown-icon="expand_more"
                      >
                      </q-select>
                      <q-input
                        type="number"
                        v-model="rmNoSelect"
                        dense
                        outlined
                        style="width: 100%"
                        placeholder="Room No..."
                      />
                    </div>
                    <q-input
                      v-model="descriptionSelect"
                      class="q-my-md"
                      label="Description..."
                      dense
                      outlined
                      type="textarea"
                    />
                  </div>
                  <q-card-section class="row items-center q-gutter-sm">
                    <q-btn
                      dense
                      color="primary"
                      @click="fetchData()"
                      no-caps
                      style="border-radius: 8px"
                      class="q-px-xl"
                      :v-close-popup="this.img"
                      >Create</q-btn
                    >
                  </q-card-section>
                </div>
                <div
                  style="
                    width: max-content;
                    margin: 1.2rem;
                    background-color: rgb(227, 227, 227);
                    height: 200px;
                    width: 200px;
                    border-radius: 3px;
                    padding: 20px;
                  "
                >
                  <div class="text-caption">Upload File</div>
                  <q-file
                    clearable
                    borderless
                    v-model="img"
                    type="file"
                    style="height: 100%"
                    color="black"
                    @update:model-value="handleUpload()"
                  >
                    <template v-slot:append>
                      <q-icon v-if="img == null" name="add_a_photo" color="gray" />
                    </template>
                  </q-file>
                  <q-img
                    :src="imgURL"
                    v-if="img"
                    style="height: 200px; width: 200px; border-radius: 3px"
                  />
                </div>
              </div>
            </q-form>
          </q-card>
        </q-dialog>
        <div style="width: 50%">
          <q-card flat bordered class="my-card" style="width: 100%">
            <q-card-section>
              <div class="text-h6">Room Type</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-btn
                size="xs"
                color="primary"
                dense
                class="q-my-auto q-px-sm"
                :icon="'add'"
                @click="addtype = true"
              />
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Arrangement</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-btn
                size="xs"
                color="primary"
                dense
                class="q-my-auto q-px-sm"
                :icon="'add'"
                @click="addtype = true"
              />
            </q-card-section>
          </q-card>
        </div>
        <q-dialog v-model="addtype">
          <q-card class="q-pa-md">
            <q-form class="q-mt-lg q-mx-auto">
              <div>Add Room Type</div>
              <div style="display: flex; gap: 10px" class="row">
                <q-input
                  type="text"
                  autogrow
                  v-model="longDesc"
                  dense
                  class="q-my-md"
                  outlined
                  placeholder="Long Description"
                />
                <q-input
                  v-model="shortDesc"
                  type="arrangement"
                  autogrow
                  dense
                  class="q-my-md"
                  outlined
                  placeholder="Short Desc"
                />
              </div>
              <q-select
                outlined
                v-model="bedSetup"
                :options="bedOption"
                Label="Bed Setup"
                dense
                dropdown-icon="expand_more"
              >
              </q-select>
              <q-checkbox v-model="selectionRbRo" label="Auto generate RB & RO" color="primary" />
              <div v-if="this.selectionOptRbRo" class="row" style="width: 100%; gap: 10px">
                <q-btn
                  dense
                  :outline="!isRoSelected"
                  color="primary"
                  no-caps
                  style="border-radius: 5px"
                  class="q-px-md"
                  v-model="isRbSelected"
                  @click="checkedCode('RO')"
                  >RB Price</q-btn
                >
                <q-btn
                  dense
                  :outline="!isRbSelected"
                  color="primary"
                  no-caps
                  style="border-radius: 5px"
                  class="q-px-md"
                  v-model="isRoSelected"
                  @click="checkedCode('RB')"
                  >RO Price</q-btn
                >
              </div>
              <q-card-section class="items-center" style="width: 100%">
                <q-btn
                  dense
                  color="primary"
                  no-caps
                  style="border-radius: 8px; width: 100%"
                  class="q-px-xl"
                  >Create</q-btn
                >
              </q-card-section>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useQuasar } from 'quasar'

const columns = [
  // {
  //   name: 'name',
  //   required: true,
  //   label: 'Average',
  //   align: 'left',
  //   field: (row) => row.name,
  //   format: (val) => `${val}`,
  //   sortable: true
  // },
  { name: 'RoomNo', label: 'Room No', align: 'center', field: 'RoomNo' },
  { name: 'RoomType', label: 'Room Type', align: 'center', field: 'RoomType' },
  { name: 'Arrangement', label: 'Arrangement', align: 'center', field: 'Arrangement' },
  { name: 'RoomStatus', label: 'Room Status', align: 'center', field: 'RoomStatus' },
  { name: 'BedSetup', label: 'Bed Setup', align: 'center', field: 'BedSetup' },
  { name: 'Image', label: 'Image', align: 'center', field: 'Image' },
  { name: '', label: 'Action', align: 'center', field: '' }
  // {
  //   name: 'calcium',
  //   label: 'Calcium (%)',
  //   field: 'calcium',
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
  // },
  // {
  //   name: 'iron',
  //   label: 'Iron (%)',
  //   field: 'iron',
  //   sortable: true,
  //   sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
  // }
]

const rows = [
  {
    RoomType: 'Frozen Yogurt',
    RoomNo: 159,
    Arrangement: 6.0,
    RoomStatus: 24,
    BedSetup: 4.0,
    Average: 87
  },
  {
    RoomType: 'Frozen Yogurt',
    RoomNo: 159,
    Arrangement: 6.0,
    RoomStatus: 24,
    BedSetup: 4.0,
    Average: 87
  },
  {
    RoomType: 'Frozen Yogurt',
    RoomNo: 159,
    Arrangement: 6.0,
    RoomStatus: 24,
    BedSetup: 4.0,
    Average: 87
  },
  {
    RoomType: 'Frozen Yogurt',
    RoomNo: 159,
    Arrangement: 6.0,
    RoomStatus: 24,
    BedSetup: 4.0,
    Average: 87
  }
]
export default defineComponent({
  setup() {
    return {
      columns,
      rows,
      // img: ref('../../../../src/assets/img/curaweda_logo.png'),
      img: ref(null),
      options: ['DLX', 'STD', 'FML'],
      imgURL: ref(''),
      addroom: ref(false),
      addtype: ref(false),
      roomTypeSelect: ref(),
      rmNoSelect: ref(),
      // selectionRbRo: ref(['RB', 'RO'])
      selectionRbRo: ref(false),
      selectionOptRbRo: ref(false),
      optionRR: ref(''),
      isRoSelected: ref(false),
      isRbSelected: ref(false)
    }
  },
  watch: {
    selectionRbRo() {
      this.selectionOptRbRo = !this.selectionOptRbRo
    }
  },
  methods: {
    handleUpload() {
      if (this.img) {
        this.imgURL = URL.createObjectURL(this.img)
        this.trigger('positive', this.imgURL)
      }
    },
    checkedCode(type) {
      if (type === 'RO') {
        this.isRoSelected = true
        this.isRbSelected = false
        console.log(type)
      } else if (type === 'RB') {
        this.isRbSelected = true
        this.isRoSelected = false
      }else{
        this.trigger('warning', 'select your type')
      }
    },
    trigger(type, txt) {
      if (txt != null) {
        this.$q.notify(
          {
            type: type,
            message: txt,
            timeout: 1000
          },
          1000
        )
      }
    }
  }
})
</script>

<style>
.q-file:not([data-has-value='true']) .file-name-container {
  display: none; /* Menyembunyikan nama file saat tidak ada file yang dipilih */
}
</style>
