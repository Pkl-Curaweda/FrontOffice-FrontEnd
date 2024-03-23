<template>
  <q-page
    style="
      overflow-y: hidden;
      width: 100%;
      min-width: max-content;
      min-height: calc(100vh - 51.25px);
    "
  >
    <FOMenubar>
      <template #left>
        <div style="height: 100%; justify-content: center">
          <q-input
            v-model="searchInput"
            borderless
            label="Name"
            type="search"
            style="display: flex; justify-content: center"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize date-btn text-black"
          :label="datePickerLabel"
          icon="o_event"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <div>
            <q-date v-model="datePicker" range />
          </div>
        </q-btn-dropdown>

        <q-separator vertical />

        <q-btn-dropdown
          flat
          square
          class="text-capitalize text-black"
          label="Display Option"
          color="primary"
          dropdown-icon="o_expand_more"
        >
          <q-option-group :options="filterDisplayOptions" type="radio" v-model="filterDisplay" />
        </q-btn-dropdown>
      </template>
      <template #right>
        <q-separator vertical />
        <q-btn flat square :color="historyColor" icon="pending_actions" @click="showhistory(!this.state)">
          <q-tooltip>History</q-tooltip>
        </q-btn>
      </template>
    </FOMenubar>

    <MultiPane>
      <template #upper>
        <div class="my-table">
          <q-table
            class="no-shadow"
            v-model:pagination="pagination"
            @request="onPaginationChange"
            :rows-per-page-options="[1, 5, 7, 10, 15, 20, 25, 30]"
            :rows="data"
            @row-click="setRoomResv()"
            :loading="loading"
            :columns="columns"
            row-key="name"
          >
            <template v-slot:header="props">
              <q-tr class="table-head" :props="props">
                <q-th
                  v-for="(col, i) in props.cols"
                  :key="i"
                  style="padding-top: 0px; padding-bottom: 0px"
                >
                  <q-select
                    v-if="filterColumns.hasOwnProperty(col.name)"
                    clearable
                    borderless
                    dark
                    label-color="white"
                    style="min-width: 90px"
                    v-model="filterColumns[col.name].data"
                    :options="filterColumns[col.name].options"
                    @update:model-value="(val) => filterColumns[col.name].onOptionChange(val)"
                    :label="col.label"
                  >
                    <template
                      v-if="allObjectsInArray(filterColumns[col.name].options)"
                      v-slot:option="scope"
                    >
                      <q-item v-bind="scope.itemProps">
                        <q-item-section>
                          <div class="flex">
                            <q-icon
                              size="20px"
                              v-for="(ic, k) in scope.opt.icons"
                              :key="k"
                              :name="ic"
                            />
                            <q-item-label class="q-ml-sm">{{ scope.opt.label }}</q-item-label>
                          </div>
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
                  <span v-else class="text-h6">{{ col.label }}</span>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <template v-for="(cell, key, i) in props.row" :key="i">
                  <q-td
                    v-if="!['ResRoomNo'].includes(key)"
                    :style="
                      cell.style.bordercolor
                        ? 'color:' +
                          cell.style.color +
                          ';background-color:' +
                          cell.style.backgroundColor +
                          ';border-width:' +
                          cell.style.borderwidth +
                          ';border-color:' +
                          cell.style.bordercolor
                        : cell.style
                    "
                  >
                    {{ cell.data }}
                    <q-popup-edit
                      v-if="!cell.style.color.includes('#808080')"
                      v-model="props.row.name"
                      title=""
                      style="width: fit-content; padding: 0; margin: 0"
                      auto-save
                    >
                      <q-list style="align-content: flex-end; width: 100%; padding: 10px">
                        <q-item
                          clickable
                          v-close-popup
                          @click="changeinc(props.row)"
                          class="q-px-md"
                          style="display: flex; background-color: red; border-radius: 100px"
                        >
                          <q-item-section>
                            <q-item-label
                              style="
                                color: black;
                                width: 100%;
                                font-weight: 600;
                                padding-left: auto;
                                padding-right: auto;
                              "
                              >INCOGNITO</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="changevip(props.row)"
                          style="display: flex"
                        >
                          <q-item-section>
                            <q-item-label style="color: red" class="font-bold">VIP</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          @click="dialog2 = true"
                          v-close-popup
                          style="display: flex"
                        >
                          <q-item-section>
                            <q-item-label class="font-bold" @click="handletoggle(props.row, false)"
                              >Waiting List</q-item-label
                            >
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="addnewextrabed(props.row)"
                          style="display: flex"
                        >
                          <q-item-section>
                            <q-item-label class="font-bold">Add Extra Bed</q-item-label>
                          </q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          v-close-popup
                          @click="changereset(props.row)"
                          style="display: flex"
                        >
                          <q-item-section>
                            <q-item-label class="font-bold">Reset Status</q-item-label>
                          </q-item-section>
                        </q-item>
                      </q-list>
                    </q-popup-edit>
                  </q-td>
                </template>
                <q-td key="" :props="props" style="width: 10px; background-color: white">
                  <div style="display: flex">
                    <div style="height: fit-content; width: fit-content">
                      <!-- <q-btn
                        size="2rem"
                        color="green"
                        :icon="iconName1"
                        class="centerComponent"
                        @click="toggleDropdown()"
                      />
                      <div v-if="showDropdown" style="backgroound-color: white" class="shadowBox">
                        test
                      </div> -->
                    </div>
                    <div>
                      <q-btn
                        auto-close
                        flat
                        round
                        :color="props.row.RmNo.style.color.includes('#808080') ? 'grey' : 'primary'"
                        icon="more_vert"
                      >
                        <q-menu>
                          <q-list
                            v-if="!props.row.RmNo.style.color.includes('#808080')"
                            style="align-content: flex-end; width: 100%"
                          >
                            <q-item
                              clickable
                              v-close-popup
                              @click="fixDetail(props.row)"
                              style="display: flex"
                            >
                              <q-btn
                                flat
                                rounded
                                size="13px"
                                @click="fixDetail(props.row)"
                                style="color: #008444"
                                icon="visibility_off"
                              />
                              <q-item-section>
                                <q-item-label>Fix</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              @click="redirectToInvoice(props.row)"
                              style="display: flex"
                            >
                              <q-btn
                                flat
                                rounded
                                size="13px"
                                @click="redirectToInvoice(props.row)"
                                style="color: #008444"
                                icon="description"
                              >
                              </q-btn>
                              <q-item-section>
                                <q-item-label>Invoice</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              @click="waitinglist(props.row, false, true)"
                              style="display: flex"
                            >
                              <q-btn
                                flat
                                rounded
                                size="13px"
                                @click="waitinglist(props.row, false, true)"
                                style="color: #008444"
                                icon="o_add_home"
                              />
                              <q-item-section>
                                <q-item-label>Add Room</q-item-label>
                              </q-item-section>
                            </q-item>
                            <q-item
                              clickable
                              v-close-popup
                              @click="handletoggle(props.row, true)"
                              style="display: flex"
                            >
                              <q-btn
                                flat
                                rounded
                                size="13px"
                                style="color: #008444"
                                icon="edit_note"
                              />
                              <q-item-section>
                                <q-item-label>Change Room</q-item-label>
                              </q-item-section>
                            </q-item>
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
                              @click="handleDelete(props.row)"
                              style="display: flex"
                            >
                              <q-btn
                                flat
                                rounded
                                size="14px"
                                style="color: #269861"
                                @click="handleDelete(props.row)"
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
          <q-dialog v-model="confirmDelete" key="" :props="props">
                          <q-card style="width: 350px; justify-content: center">
                            <div class="q-pa-sm col" style="display: block; width: 100%; gap: 5px">
                              <div style="width: 100%; text-align: center">
                                Do you want to delete reservation number data
                                {{ cacheData.ResNo.data }}
                              </div>
                              <div class="q-pa-sm col" style="display: flex; width: 100%; gap: 5px">
                                <q-btn
                                  dense
                                  noCaps
                                  color="primary"
                                  v-close-popup
                                  label="Close"
                                  class="q-px-md"
                                  style="width: 100%"
                                />
                                <q-btn
                                  dense
                                  noCaps
                                  color="red"
                                  @click="deleteResv"
                                  label="Delete"
                                  class="q-px-md"
                                  style="width: 100%"
                                />
                              </div>
                            </div>
                          </q-card>
                        </q-dialog>
                        <q-dialog v-model="dialogeditroom" ref="editRoomDialog">
                          <q-card>
                            <q-card-section>
                              <div class="text-h6">Change Room</div>
                              <q-separator horizontal class="q-ma-xs" />
                              <div class="q-mt-sm">
                                Do you want to request something for room number {{ this.roomno
                                }}<br />Please Give Us Your Request
                              </div>
                              <q-input
                                v-model="waitingnote"
                                class="q-my-md"
                                label="Note..."
                                dense
                                outlined
                                type="textarea"
                              />
                              <div
                                class="row items-center"
                                style="width: 100%; justify-content: space-between"
                              >
                                <q-btn v-close-popup label="Cancel" outline color="primary" />
                                <q-btn
                                  v-close-popup="this.waitingnote != null"
                                  label="accept"
                                  @click="changeRoom"
                                  color="primary"
                                />
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-dialog>
                        <q-dialog v-model="dialog2">
                          <q-card>
                            <q-card-section>
                              <div class="text-h6">Waiting List</div>
                              <q-separator horizontal class="q-ma-xs" />
                              <div class="q-mt-sm">
                                Do you want to request something for room number {{ this.roomno
                                }}<br />Please Give Us Your Request
                              </div>
                              <q-input
                                v-model="waitingnote"
                                class="q-my-md"
                                label="Note..."
                                dense
                                outlined
                                type="textarea"
                              />
                              <div
                                class="row items-center"
                                style="width: 100%; justify-content: space-between"
                              >
                                <q-btn v-close-popup label="Cancel" outline color="primary" />
                                <q-btn
                                  v-close-popup
                                  label="accept"
                                  @click="postwaiting(props.row)"
                                  color="primary"
                                />
                              </div>
                            </q-card-section>
                          </q-card>
                        </q-dialog>
        </div>
      </template>
      <template #lower>
        <GuestForm />
      </template>
    </MultiPane>
  </q-page>
</template>

<script>
import FOMenubar from 'src/components/FOMenubar.vue'
import MultiPane from 'src/layouts/MultiPane.vue'
import GuestForm from 'src/pages/FO/fragments/GuestForm.vue'
import { formatDate } from 'src/utils/time'
import { defineComponent, ref } from 'vue'
import { allObjectsInArray } from 'src/utils/datatype'

export default defineComponent({
  name: 'GuestList',
  components: { FOMenubar, MultiPane, GuestForm },
  setup() {
    return {
      dialogeditroom: ref(false),
      dialog2: ref(false),
      setcolor: ref(''),
      cancelEnabled: ref(true),
      iconName1: 'more_vert',
      datares: ref(),
      showDropdown: false,
      waitingnote: ref(),
      background: ref(),
      state: false,
      allObjectsInArray,
      arrowBottom: 'expand_less',
      arrowUp: 'expand_more',
      loading: ref(false),
      searchInput: ref(''),
      datePicker: ref({ from: '', to: '' }),
      filterDisplay: ref(null),
      confirmDelete: ref(false),
      cacheData: ref([]),

      filterDisplayOptions: [
        { label: 'All', value: null },
        { label: 'Reservation', value: 'reservation' },
        { label: 'In-House Guest', value: 'inhouse' },
        { label: 'Arrival-Today', value: 'arrival' },
        { label: 'Depart-Today', value: 'departure' }
      ],
      columns: [
        { name: 'ResNo', label: 'ResNo', align: 'left', field: 'ResNo' },
        { name: 'ResResource', label: 'ResResource', align: 'left', field: 'ResResource' },
        { name: 'RmNo', label: 'RmNo', align: 'left', field: 'RmNo' },
        { name: 'RType', label: 'RType', align: 'left', field: 'RType' },
        { name: 'BType', label: 'BType', align: 'left', field: 'BType' },
        { name: 'GuestName', label: 'GuestName', align: 'left', field: 'GuestName' },
        { name: 'Arr', label: 'Arr', field: 'Arr', align: 'left' },
        { name: 'Arrival', label: 'Arrival', align: 'left', field: 'Arrival' },
        { name: 'Depart', label: 'Depart', align: 'left', field: 'Depart' },
        { name: 'Night', label: 'Night', align: 'left', field: 'Night' },
        { name: 'RoomBoy', label: 'RoomBoy', align: 'left', field: 'RoomBoy' },
        { name: 'RoomRate', label: 'RoomRate', align: 'left', field: 'RoomRate' },
        { name: 'CreatedDate', label: 'CreatedDate', align: 'left', field: 'CreatedDate' },
        { name: '', label: 'Action', align: 'center', field: '' }
      ]
    }
  },
  data() {
    return {
      filterSortOrder: ref({ col: '', val: '' }),
      filterColumns: {
        ResNo: {
          data: '',
          options: ['Newest', 'Oldest'],
          onOptionChange: (val) => {
            if (val == 'Newest') this.filterSortOrder = { col: 'ResNo', val: 'resv+id+desc' }
            else if (val == 'Oldest') this.filterSortOrder = { col: 'ResNo', val: 'resv+id+asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        ResResource: {
          data: '',
          options: ['Individual Reservation', 'Walk-In'],
          onOptionChange: (val) => {
            if (val == 'Individual Reservation')
              this.filterSortOrder = { col: 'ResResource', val: 'rese+resourceName+individual' }
            else if (val == 'Walk-In')
              this.filterSortOrder = { col: 'ResResource', val: 'rese+resourceName+walk' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        RmNo: {
          data: '',
          options: [],
          actToDo: {},
          onOptionChange: (val) => {
            if (val) {
              this.filterSortOrder = this.filterColumns.RmNo.actToDo[val]
            } else this.filterSortOrder = { col: '', val: '' }
          }
        },
        RType: {
          data: '',
          options: [],
          actToDo: {},
          onOptionChange: (val) => {
            if (val) {
              this.filterSortOrder = this.filterColumns.RType.actToDo[val]
            } else this.filterSortOrder = { col: '', val: '' }
          }
        },
        BType: {
          data: '',
          options: [
            {
              icons: ['o_king_bed'],
              label: 'King bed',
              value: 'King bed'
            },
            {
              icons: ['o_single_bed', 'o_single_bed'],
              label: 'Twin bed',
              value: 'Twin bed'
            },
            {
              icons: ['o_single_bed'],
              label: 'Single bed',
              value: 'Single bed'
            }
          ],
          onOptionChange: (val) => {
            if (val?.value == 'King bed')
              this.filterSortOrder = { col: 'BType', val: 'room+bedSetup+KING' }
            else if (val?.value == 'Twin bed')
              this.filterSortOrder = { col: 'BType', val: 'room+bedSetup+TWIN' }
            else if (val?.value == 'Single bed')
              this.filterSortOrder = { col: 'BType', val: 'room+bedSetup+SINGLE' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        GuestName: {
          data: '',
          options: ['A-Z', 'Z-A'],
          onOptionChange: (val) => {
            if (val == 'A-Z') this.filterSortOrder = { col: 'GuestName', val: 'rese+name+asc' }
            else if (val == 'Z-A')
              this.filterSortOrder = { col: 'GuestName', val: 'rese+name+desc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Arr: {
          data: '',
          options: ['RB', 'RO'],
          onOptionChange: (val) => {
            if (val == 'RB') this.filterSortOrder = { col: 'Arr', val: 'resv+arrCode+RB' }
            else if (val == 'RO') this.filterSortOrder = { col: 'Arr', val: 'resv+arrCode+RO' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Arrival: {
          data: '',
          options: ['Newest', 'Oldest'],
          onOptionChange: (val) => {
            if (val == 'Newest')
              this.filterSortOrder = { col: 'Arrival', val: 'resv+arrivalDate+desc' }
            else if (val == 'Oldest')
              this.filterSortOrder = { col: 'Arrival', val: 'resv+arrivalDate+asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Depart: {
          data: '',
          options: ['Newest', 'Oldest'],
          onOptionChange: (val) => {
            if (val == 'Newest')
              this.filterSortOrder = { col: 'Depart', val: 'resv+departureDate+desc' }
            else if (val == 'Oldest')
              this.filterSortOrder = { col: 'Depart', val: 'resv+departureDate+asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        Night: {
          data: '',
          options: ['1', '>1'],
          onOptionChange: (val) => {
            if (val == '1') this.filterSortOrder = { col: 'Night', val: 'resv+night+asc' }
            else if (val == '>1') this.filterSortOrder = { col: 'Night', val: 'resv+night+desc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        RoomBoy: {
          data: '',
          options: [],
          onOptionChange: (val) => {
            if (val == null) this.filterSortOrder = { col: '', val: '' }
            else this.filterSortOrder = { col: 'RoomBoy', val: 'room+name+' + val }
          }
        },
        RoomRate: {
          data: '',
          options: ['High Price', 'Low Price'],
          onOptionChange: (val) => {
            if (val == 'High Price')
              this.filterSortOrder = { col: 'RoomRate', val: 'resv+rate+desc' }
            else if (val == 'Low Price')
              this.filterSortOrder = { col: 'RoomRate', val: 'resv+rate+asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        },
        CreatedDate: {
          data: '',
          options: ['Newest', 'Oldest'],
          onOptionChange: (val) => {
            if (val == 'Newest')
              this.filterSortOrder = { col: 'CreatedDate', val: 'resv+created_at+desc' }
            else if (val == 'Oldest')
              this.filterSortOrder = { col: 'CreatedDate', val: 'resv+created_at+asc' }
            else this.filterSortOrder = { col: '', val: '' }
          }
        }
      },
      api: new this.$Api('frontoffice'),
      historyColor: ref('primary'),
      datePickerLabel: ref('TDate - FDate'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      },
      data: []
    }
  },
  mounted() {
    this.fetchData()
  },
  watch() {
    searchName(this.searchInput)
  },
  watch: {
    filterSortOrder: {
      handler(oldFilter, newFilter) {
        Object.keys(this.filterColumns).forEach((key) => {
          if (oldFilter['col'] != key) this.filterColumns[key].data = null
        })
        this.fetchData()
      }
    },
    searchInput: {
      handler(newSearchInput) {
        this.searchName(newSearchInput)
      },
      immediate: true
    },
    datePicker: {
      deep: true,
      handler(newDateRange) {
        function formatDateRange() {
          const options = { day: 'numeric', month: 'long' };
          const fromDate = new Date(newDateRange.from);
          const toDate = new Date(newDateRange.to);
          const formattedFromDate = fromDate.toLocaleDateString('en-US', options);
          const formattedToDate = toDate.toLocaleDateString('en-US', options);
          return `${formattedFromDate} - ${formattedToDate}`;
        }
        this.datePickerLabel = formatDateRange()
        this.fetchData()
      }
    },
    filterDisplay: {
      handler(option) {
        this.fetchData()
      }
    }
  },
  methods: {
    handleDelete(data) {
      this.cacheData = data
      this.confirmDelete = true
    },
    handletoggle(data, state) {
      const roomNo = data['RmNo'].data
      this.datares = data
      this.roomno = roomNo

      if (state == true) {
        this.dialogeditroom = true
      } else {
        this.dialog2 = true
      }
    },
    changeRoom() {
      this.$ResvStore.fix = false
      this.$ResvStore.ds = false
      this.$ResvStore.logc = true
      this.$ResvStore.detail = false
      this.$ResvStore.addroom = false

      if (this.waitingnote != null && this.waitingnote != '') {
        // const statedata = true
        // this.$ResvStore.addroom = statedata
        this.$ResvStore.waitingnote = this.waitingnote
        this.$ResvStore.currentResvId = this.datares['ResNo'].data
        this.$ResvStore.currentRoomResvId = this.datares['ResRoomNo'].data
      } else {
        this.trigger('negative', 'note has not been filled in, data must be filled in')
      }
    },
    redirectToInvoice(data) {
      this.$router.push({
        name: 'guest-invoice',
        params: { resvId: data['ResNo'].data, resvRoomId: data['ResRoomNo'].data }
      })
    },
    postwaiting() {
      const resvId = this.datares['ResNo'].data
      const roomNo = this.datares['ResRoomNo'].data

      const note = {
        request: this.waitingnote
      }

      try {
        this.api.post(
          `/detail/reservation/${resvId}/${roomNo}/waiting-list`,
          note,
          ({ data, status, message }) => {
            if (status === 200) {
              this.trigger('positive', message)
              this.fetchData()
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    addnewextrabed(data) {
      const resvId = data['ResNo'].data
      const roomNo = data['ResRoomNo'].data
      const articledata = [
        {
          articleId: 110,
          qty: 1
        }
      ]
      try {
        this.api.post(
          `/invoice/${resvId}/${roomNo}/article`,
          articledata,
          ({ status, data, message }) => {
            if (status === 200) {
              this.trigger('positive', message)
              this.fetchData()
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (error) {
        console.error('error : ' + error)
      }
    },
    showhistory(state) {
      this.state = state
      this.historyColor = state ? "black" : "primary"
      this.fetchData()
    },
    waitinglist(data, log, state) {
      const roomNo = data['RmNo'].data
      this.roomno = roomNo
      this.$ResvStore.fix = false
      this.$ResvStore.ds = false
      this.$ResvStore.logc = true
      this.$ResvStore.detail = false

      if (state === true) {
        const statedata = true
        this.$ResvStore.addroom = statedata
        this.$ResvStore.currentResvId = data['ResNo'].data
        this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
      } else {
        if (log === true && this.waitingnote != null && this.waitingnote != '') {
          // this.$refs.editRoomDialog.hide();
          this.$ResvStore.addroom = false
          this.$ResvStore.waitingnote = this.waitingnote
          this.$ResvStore.currentResvId = data['ResNo'].data
          this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
        } else {
          this.trigger('negative', 'note has not been filled in, data must be filled in')
        }
      }
    },
    editroom(data) {
      this.$ResvStore.currentResvId = data['ResNo'].data
      this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
      this.$ResvStore.fix = false
      this.$ResvStore.ds = true
      this.$ResvStore.logc = false
      this.$ResvStore.detail = false
      this.$ResvStore.addroom = false
    },
    changereset(data) {
      const resvId = data['ResNo'].data
      const roomNo = data['ResRoomNo'].data
      this.api.put(`arrival?id=${resvId}-3`, null, ({ status, data, message }) => {
        this.loading = false
        if (status === 200) {
          this.trigger('positive', message)
          this.fetchData()
        }
      })
    },
    changevip(data) {
      try {
        const resvId = data['ResNo'].data
        const roomNo = data['ResRoomNo'].data
        this.api.put(`arrival?id=${resvId}-1`, null, ({ status, data, message }) => {
          this.loading = false
          if (status === 200) {
            this.trigger('positive', message)
            this.fetchData()
          } else {
            console.error('Gagal memperbarui data')
          }
        })
      } catch (error) {
        console.error('Terjadi kesalahan, mohon coba lagi')
      }
    },
    changeinc(data) {
      try {
        const resvId = data['ResNo'].data
        const roomNo = data['ResRoomNo'].data
        this.loading = true
        this.api.put(`arrival?id=${resvId}-2`, null, ({ status, data, message }) => {
          this.loading = false
          if (status === 200) {
            this.trigger('positive', message)
            this.fetchData()
          } else {
            console.error('Gagal memperbarui data')
          }
        })
        this.fetchData()
      } catch (error) {
        console.error('Terjadi kesalahan, mohon coba lagi')
      }
    },
    toggleDropdown() {
      this.showDropdown = !this.showDropdown
      this.iconName1 = this.showDropdown ? this.arrowBottom : this.arrowUp
    },
    setSortOrder(val = '') {
      this.filterSortOrder = null
    },
    searchName(searchInput) {
      this.searchData = searchInput
      this.fetchData()
    },
    setRoomResv(data) {
      this.$ResvStore.currentResvId = data['ResNo'].data
      this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
      this.$ResvStore.fix = false
      this.$ResvStore.ds = false
      this.$ResvStore.logc = false
      this.$ResvStore.addroom = false

      this.$ResvStore.detail = true
    },
    fixDetail(data) {
      this.$ResvStore.currentResvId = data['ResNo'].data
      this.$ResvStore.currentRoomResvId = data['ResRoomNo'].data
      this.$ResvStore.fix = true
      this.$ResvStore.detail = false
      this.$ResvStore.ds = false
      this.$ResvStore.addroom = false

      this.$ResvStore.logc = false
    },
    async deleteResv() {
      try {
        const resvId = this.cacheData['ResNo'].data
        const roomNo = this.cacheData['ResRoomNo'].data
        this.api.delete(`detail/reservation/${resvId}/${roomNo}/delete`, ({ data, message }) => {
          this.trigger('positive', message)
          this.fetchData()
          this.confirmDelete = false
        })
      } catch (error) {
        console.error('Terjadi kesalahan, mohon coba lagi')
      }
    },
    onPaginationChange(props) {
      props.pagination.rowsPerPage =
        props.pagination.rowsPerPage < 1 ? 50 : props.pagination.rowsPerPage
      this.pagination = props.pagination
      this.fetchData()
    },

    fetchData() {
      this.loading = true

      let url = `arrival?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}&history=${this.state}&name=${this.searchData}`

      if (this.filterDisplay !== null) url += `&disOpt=${this.filterDisplay}`

      if (this.filterSortOrder['col'] != '' && this.filterSortOrder['val'] != '')
        url += `&sortOrder=${this.filterSortOrder['val']}`

      const fromDate = this.datePicker != null ? this.datePicker.from.replace(/\//g, '-') : ''
      const toDate = this.datePicker != null ? this.datePicker.to.replace(/\//g, '-') : ''

      if (fromDate !== '' && toDate !== '') {
        url += `&date=${fromDate}+${toDate}`
      }

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          // const { reservations } = data.reservation
          const roomBoys = this.getUniqueRoomBoys(data.roomBoys)
          const { sortingRoomNo, sortingRoomType } = data
          this.filterColumns.RoomBoy.options = roomBoys
          this.filterColumns.RmNo.options = sortingRoomNo.options
          this.filterColumns.RmNo.actToDo = sortingRoomNo.toChange
          this.filterColumns.RType.options = sortingRoomType.options
          this.filterColumns.RType.actToDo = sortingRoomType.toChange
          // this.background = reservations.reservation.resvStatus.rowColor
          this.formatData(data.reservations)
          this.pagination = {
            page: data.meta?.currPage,
            rowsNumber: data.meta?.total,
            rowsPerPage: data.meta?.perPage
          }
        }
      })
    },

    getUniqueRoomBoys(roomBoys) {
      return roomBoys.map((boy) => boy.user.name)
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
    formating(value) {
      return parseFloat(value).toLocaleString('id-ID', {
        style: 'currency',
        currency: 'IDR'
      })
    },
    formatData(raw = []) {
      const list = []

      raw.forEach((rsrv) => {
        rsrv.reservation.forEach((rr) => {
          const [backgroundColor, color] = [
            rr.reservation.resvStatus.rowColor === '#f10000'
              ? rr.reservation.resvStatus.rowColor
              : '#ffffff',
            rr.reservation.resvStatus.textColor === '#f10000' ||
            rr.reservation.resvStatus.textColor === '#808080'
              ? rr.reservation.resvStatus.textColor
              : '#000000'
          ]
          this.setcolor =
            rr.reservation.resvStatus.textColor === '#808080'
              ? rr.reservation.resvStatus.textColor
              : 'primary'
          const { id } = rr.arrangment
          list.push({
            ResNo: { data: rsrv.reservationId, style: { backgroundColor, color } },
            ResRoomNo: { data: rr.id, style: { backgroundColor } },
            ResResource: {
              data: rr.reservation.reserver.resourceName,
              style: { backgroundColor, color }
            },
            RmNo: {
              data: rr.room.id,
              style: {
                backgroundColor: rr.reservation.resvStatus.rowColor,
                color: color,
                bordercolor: rr.reservation.borderColor,
                borderwidth: '4px'
              }
            },
            RType: { data: rr.room.roomType.id, style: { backgroundColor, color } },
            BType: { data: rr.room.roomType.bedSetup, style: { backgroundColor, color } },
            GuestName: {
              data: rr.reservation.reserver.guest.name,
              style: { backgroundColor, color }
            },
            Arr: { data: id.split('-')[1], style: { backgroundColor, color } },
            Arrival: {
              data: formatDate(rr.reservation.arrivalDate),
              style: { backgroundColor, color }
            },
            Depart: {
              data: formatDate(rr.reservation.departureDate),
              style: { backgroundColor, color }
            },
            Night: { data: rr.reservation.manyNight, style: { backgroundColor, color } },
            RoomBoy: { data: rr.roomMaids.user.name, style: { backgroundColor, color } },
            RoomRate: {
              data: this.formating(rr.arrangment.rate),
              style: { backgroundColor, color }
            },
            CreatedDate: {
              data: formatDate(rr.reservation.created_at),
              style: { backgroundColor, color }
            }
          })
        })
      })
      this.data = list
    }
  }
})
</script>

<style scoped>
.shadowBox {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 10px;
  height: fit-content;
  padding: 20px;
}
</style>
