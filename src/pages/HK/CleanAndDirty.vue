<template>
  <q-page class="q-pa-md">
    <div class="q-pa-md">
      <div style="display: flex; gap: 15px; justify-content: center; align-items: center">
        <HKCard
          card_class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
          card_style="width:230px; height:330px;"
          radius="5px"
        >
          <div class="column">
            <div class="row">
              <q-card
                class="q-ml-sm flex justify-center items-center q-pa-none"
                style="background-color: #069550; width: 40px; height: 40px; border-radius: 100%"
              >
                <q-icon class="q-ma-auto" size="24px" color="white"
                  ><svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26 20H20V18H26V20ZM30 28H24V26H30V28ZM28 24H22V22H28V24Z"
                      fill="white"
                    />
                    <path
                      d="M17.0029 20C16.9958 19.1562 16.7708 18.3286 16.3496 17.5974C15.9284 16.8662 15.3253 16.2564 14.5989 15.827L21.9999 3L20.2699 2L12.6929 15.126C11.763 14.9183 10.7958 14.947 9.87992 15.2096C8.96399 15.4721 8.12851 15.9602 7.4499 16.629C3.7059 20.24 3.9959 28.682 4.0099 29.04C4.02023 29.2982 4.13014 29.5424 4.31656 29.7214C4.50299 29.9004 4.75147 30.0002 5.0099 30H20.0009C20.2108 30 20.4153 29.934 20.5856 29.8112C20.7559 29.6885 20.8832 29.5153 20.9496 29.3162C21.0159 29.1171 21.018 28.9022 20.9554 28.7018C20.8928 28.5015 20.7688 28.3259 20.6009 28.2C17.0609 25.544 17.0029 20.054 17.0029 20ZM11.9299 16.997C12.7303 17.0058 13.4964 17.3228 14.069 17.8822C14.6415 18.4415 14.9764 19.2001 15.0039 20C15.0039 20.038 15.0059 20.208 15.0209 20.469L9.1209 17.845C9.50953 17.5245 9.95801 17.2845 10.4402 17.1389C10.9225 16.9934 11.4288 16.9451 11.9299 16.997ZM15.4499 28C14.6506 27.1861 14.1411 26.132 13.9999 25H11.9999C12.0715 26.0643 12.404 27.0946 12.9679 28H10.7449C10.3336 26.7022 10.0834 25.3588 9.9999 24H7.9999C8.06438 25.3547 8.28757 26.6973 8.6649 28H5.9999C6.0309 26.164 6.2899 22.108 7.8029 19.447L15.3359 22.797C15.6978 24.6763 16.4695 26.4528 17.5959 28H15.4499Z"
                      fill="white"
                    />
                  </svg>
                </q-icon>
              </q-card>
              <q-btn-dropdown
                flat
                dropdown-icon="expand_more"
                rounded
                size="15px"
                class="q-ml-auto"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick('VC')">
                    <q-item-section>
                      <q-item-label>Vacant Clean Checked</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('VCU')">
                    <q-item-section>
                      <q-item-label>Vacant Clean Unchecked</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('VD')">
                    <q-item-section>
                      <q-item-label>Vacant Dirty</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div
              class="text-weight-bold flex items-center justify-center q-pt-sm"
              style="font-size: 110px"
            >
              {{ vacantNominal }}
            </div>
            <div class="text-weight-bold text-center text-h5">
              {{ vacantLabel }}
            </div>
          </div>
        </HKCard>

        <HKCard
          card_class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
          card_style="width:230px; height:330px;"
          radius="5px"
        >
          <div class="column flex">
            <div class="row">
              <q-card
                class="q-ml-sm flex justify-center items-center q-pa-none"
                style="background-color: #069550; width: 40px; height: 40px; border-radius: 100%"
              >
                <q-icon class="q-ma-auto" size="24px" color="white"
                  ><svg
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.9878 11.5722C12.1025 11.5722 11.3477 11.2602 10.7234 10.6361C10.1008 10.0129 9.7895 9.25742 9.7895 8.36958C9.7895 7.48345 10.1008 6.72836 10.7234 6.10431C11.3477 5.48112 12.1025 5.16952 12.9878 5.16952C13.8731 5.16952 14.628 5.48112 15.2523 6.10431C15.8749 6.72836 16.1862 7.48388 16.1862 8.37086C16.1862 9.25699 15.8749 10.0121 15.2523 10.6361C14.628 11.2593 13.8731 11.5709 12.9878 11.5709V11.5722ZM5.95148 18.2694V16.4767C5.95148 16.1113 6.03464 15.7843 6.20095 15.4958C6.36727 15.2081 6.60949 14.9712 6.92762 14.7851C7.83851 14.2472 8.80228 13.8396 9.81892 13.5622C10.8356 13.2856 11.8919 13.1473 12.9878 13.1473C14.0668 13.1473 15.1188 13.2856 16.144 13.5622C17.1692 13.8387 18.1372 14.2464 19.0481 14.7851C19.3491 14.9712 19.5871 15.2123 19.7619 15.5086C19.9368 15.8048 20.0242 16.1275 20.0242 16.4767V18.2694H5.95148ZM24.7897 8.06994C24.1288 6.49573 23.2025 5.11617 22.011 3.93125C20.8195 2.74718 19.4536 1.83245 17.9133 1.18706L18.4122 0C20.1905 0.785395 21.6942 1.78592 22.9232 3.00158C24.1531 4.21808 25.1787 5.74107 26 7.57053L24.7897 8.06994ZM1.18595 8.06994L0 7.57053C0.788926 5.75814 1.7979 4.24071 3.02692 3.01822C4.25679 1.79574 5.76896 0.789664 7.56345 0L8.06239 1.18706C6.50586 1.84867 5.13569 2.77193 3.95188 3.95686C2.76806 5.14178 1.84523 6.5128 1.18595 8.06994ZM7.53786 26C5.77664 25.2488 4.26489 24.2316 3.00261 22.9485C1.74033 21.6662 0.739458 20.1518 0 18.4051L1.18595 17.9301C1.84694 19.488 2.76934 20.8595 3.95316 22.0444C5.13697 23.2293 6.50672 24.1522 8.06239 24.8129L7.53786 26ZM18.3879 26L17.9133 24.8129C19.4698 24.1513 20.84 23.2281 22.0238 22.0431C23.2076 20.8582 24.1296 19.4872 24.7897 17.9301L25.9757 18.4295C25.191 20.2094 24.171 21.7269 22.9155 22.9818C21.6592 24.2367 20.15 25.2428 18.3879 26Z"
                      fill="white"
                    />
                  </svg>
                </q-icon>
              </q-card>
              <q-btn-dropdown
                flat
                dropdown-icon="expand_more"
                rounded
                size="15px"
                class="q-ml-auto"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick('OC')">
                    <q-item-section>
                      <q-item-label>Occupied Cleaned</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('OD')">
                    <q-item-section>
                      <q-item-label>Occupied Dirty</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div
              class="text-weight-bold flex items-center justify-center q-pt-sm"
              style="font-size: 110px"
            >
              {{ occupiedNominal }}
            </div>
            <div class="text-weight-bold text-center text-h5">{{ occupiedLabel }}</div>
          </div>
        </HKCard>

        <HKCard
          card_class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
          card_style="width:230px; height:330px;"
          radius="5px"
        >
          <div class="column flex">
            <div class="row">
              <q-card
                class="q-ml-sm flex justify-center items-center q-pa-none"
                style="background-color: #069550; width: 40px; height: 40px; border-radius: 100%"
              >
                <q-icon class="q-ma-auto" size="29px" color="white"
                  ><svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.9998 21.3599C17.4852 21.3599 18.7456 20.8421 19.7812 19.8065C20.8167 18.771 21.3341 17.5105 21.3332 16.0252C21.3332 14.5408 20.8158 13.2808 19.7812 12.2452C18.7465 11.2097 17.4861 10.6919 15.9998 10.6919C14.5145 10.6919 13.2541 11.2097 12.2185 12.2452C11.1829 13.2808 10.6656 14.5408 10.6665 16.0252C10.6665 17.5105 11.1838 18.771 12.2185 19.8065C13.2532 20.8421 14.5136 21.3594 15.9998 21.3585V21.3599ZM18.1998 18.9532L15.4865 16.2412V12.1799H16.5132V15.8105L18.9278 18.2252L18.1998 18.9532ZM15.9998 27.9492C13.3216 27.1536 11.0963 25.531 9.32384 23.0812C7.55228 20.6305 6.6665 17.8701 6.6665 14.7999V7.58921L15.9998 4.10254L25.3332 7.58921V14.7999C25.3332 17.8701 24.4474 20.6301 22.6758 23.0799C20.9034 25.5305 18.6781 27.1536 15.9998 27.9492ZM15.9998 26.5332C18.3109 25.7999 20.2221 24.3332 21.7332 22.1332C23.2443 19.9332 23.9998 17.4888 23.9998 14.7999V8.49987L15.9998 5.52654L7.99984 8.49987V14.7999C7.99984 17.4888 8.75539 19.9332 10.2665 22.1332C11.7776 24.3332 13.6887 25.7999 15.9998 26.5332Z"
                      fill="white"
                    />
                  </svg>
                </q-icon>
              </q-card>
              <q-btn-dropdown
                flat
                dropdown-icon="expand_more"
                rounded
                size="15px"
                class="q-ml-auto"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick('ED')">
                    <q-item-section>
                      <q-item-label>Expected Departure</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('DnD')">
                    <q-item-section>
                      <q-item-label>Do not Disturb</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div
              class="text-weight-bold flex items-center justify-center q-pt-sm"
              style="font-size: 110px"
            >
              {{ expectedNominal }}
            </div>
            <div class="text-weight-bold text-center text-h5">{{ expectedLabel }}</div>
          </div>
        </HKCard>

        <HKCard
          card_class="q-col-xs-12 q-col-sm-6 q-col-md-4 q-col-lg-3"
          card_style="width:230px; height:330px;"
          radius="5px"
        >
          <div class="column flex">
            <div class="row">
              <q-card
                class="q-ml-sm flex justify-center items-center q-pa-none"
                style="background-color: #069550; width: 40px; height: 40px; border-radius: 100%"
              >
                <q-icon class="q-ma-auto" size="28px" color="white"
                  ><svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6665 5.3335H9.33317C7.86041 5.3335 6.6665 6.5274 6.6665 8.00016V25.3335C6.6665 26.8063 7.86041 28.0002 9.33317 28.0002H22.6665C24.1393 28.0002 25.3332 26.8063 25.3332 25.3335V8.00016C25.3332 6.5274 24.1393 5.3335 22.6665 5.3335Z"
                      stroke="white"
                    />
                    <path
                      d="M12 12H20M12 17.3333H20M12 22.6667H17.3333"
                      stroke="white"
                      stroke-linecap="round"
                    />
                  </svg>
                </q-icon>
              </q-card>
              <q-btn-dropdown
                flat
                dropdown-icon="expand_more"
                rounded
                size="15px"
                class="q-ml-auto"
              >
                <q-list>
                  <q-item clickable v-close-popup @click="onItemClick('OO')">
                    <q-item-section>
                      <q-item-label>Out-of-Order</q-item-label>
                    </q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="onItemClick('OF')">
                    <q-item-section>
                      <q-item-label>Out Market Room</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>

            <div
              class="text-weight-bold flex items-center justify-center q-pt-sm"
              style="font-size: 110px"
            >
              {{ outNominal }}
            </div>
            <div class="text-weight-bold text-center text-h5">
              {{ outLabel }}
            </div>
          </div>
        </HKCard>
      </div>
      <div class="row col-grow q-py-md">
        <div class="row sorting" style="gap: 10px">
          <p class="text-weight-bold text-body1 q-mt-sm">Sorting :</p>
          <q-btn-dropdown
            flat
            square
            style="border: 1px #00000030 solid"
            class="text-capitalize text-black rounded-borders"
            :label="filterDisplayLabel"
            color="primary"
            dropdown-icon="o_expand_more"
          >
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="setFilterDisplay('roomId+desc', 'Room Number')"
              >
                <q-item-section>Room Number</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="setFilterDisplay('roomType+asc', 'Room Type')"
              >
                <q-item-section>Room Type</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="setFilterDisplay('guestName+asc', 'Guest Name')"
              >
                <q-item-section>Guest Name</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                @click="setFilterDisplay('pic+asc', 'Person In Charge')"
              >
                <q-item-section>Person In Charge</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
        <div class="row q-ml-auto">
          <div class="row q-pr-lg q-gutter-sm arrival">
            <div>
              <p class="text-weight-bold text-body1 q-mt-sm">Arrival :</p>
            </div>
            <div>
              <q-btn-dropdown
                flat
                square
                style="border: 1px #00000030 solid"
                class="text-capitalize date-btn text-black rounded-borders"
                :label="datePickerArrival?.replace(/\//g, '-')"
                icon="o_event"
                color="primary"
                dropdown-icon="o_expand_more"
              >
                <div>
                  <q-date v-model="datePickerArrival" color="green" today-btn />
                </div>
              </q-btn-dropdown>
            </div>
          </div>
          <div class="row q-gutter-sm">
            <div>
              <p class="text-weight-bold text-body1 q-mt-sm">Departure :</p>
            </div>
            <div>
              <q-btn-dropdown
                flat
                square
                style="border: 1px #00000030 solid"
                class="text-capitalize date-btn text-black rounded-borders"
                :label="datePickerDeparture?.replace(/\//g, '-')"
                icon="o_event"
                color="primary"
                dropdown-icon="o_expand_more"
              >
                <div>
                  <q-date v-model="datePickerDeparture" color="green" today-btn />
                </div>
              </q-btn-dropdown>
            </div>
          </div>
        </div>
      </div>
      <div class="tableComp q-mt-md">
        <q-table
          :rows="rows"
          :columns="columns"
          row-key="name"
          square
          class="q-px-md"
          :table-header-style="{
            backgroundColor: '#069550',
            color: '#ffffff',
            padding: '9px'
          }"
          :card-style="{ boxShadow: 'none' }"
          rows-per-page-label="Show"
          v-model:pagination="pagination"
          @request="onPaginationChange"
          :dense="$q.screen.lt.md"
        >
          <template v-slot:body="props">
            <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
              <q-td key="Roomno" :props="props">
                {{ props.row.Roomno }}
              </q-td>
              <q-td key="Roomstatus" :props="props">
                {{ props.row.Roomstatus }}
              </q-td>
              <q-td key="Guestname" :props="props">
                {{ props.row.Guestname }}
              </q-td>
              <q-td key="Arrival" :props="props">
                {{ props.row.Arrival }}
              </q-td>
              <q-td key="Departure" :props="props">
                {{ props.row.Departure }}
              </q-td>
              <q-td key="Personinchange" :props="props">
                {{ props.row.Personinchange }}
              </q-td>
              <!-- <q-td key="Action" :props="props" style="width: 10px">
                <q-btn flat rounded size="13px" style="color: #008444"
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
                <q-btn flat rounded size="13px" style="color: #269861"
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
              </q-td> -->
            </q-tr>
          </template>
        </q-table>
      </div>
    </div>
  </q-page>
</template>
<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'

const columns = [
  { name: 'Roomno', label: 'Room No', align: 'left', field: 'Roomno' },
  { name: 'Roomstatus', label: 'Room Status', align: 'left', field: 'Roomstatus' },
  { name: 'Guestname', label: 'Guest Name', align: 'left', field: 'Guestname' },
  { name: 'Arrival', label: 'Arrival', align: 'left', field: 'Arrival' },
  { name: 'Departure', label: 'Departure', align: 'left', field: 'Departure' },
  { name: 'Personinchange', label: 'Person In Change', align: 'left', field: 'Personinchange' }
  // { name: 'Action', label: 'Action', align: 'center', field: 'Action' }
]

const rows = ref([])

export default defineComponent({
  name: 'CleanDirtyPage',
  components: { HKCard },
  setup() {
    return {
      columns,
      rows,
      filterDisplay: ref('guestName+asc'),
      filterDisplayLabel: ref('Room Number'),
      vacantLabel: ref('Vacant Clean Checked'),
      occupiedLabel: ref('Occupied Clean'),
      occupiedNominal: ref(),
      vacantNominal: ref(),
      expectedLabel: ref('Expected Departure'),
      expectedNominal: ref(),
      outLabel: ref('Out of Order'),
      outNominal: ref(),
      datePickerArrival: ref(),
      datePickerDeparture: ref(),
      formattedArrivalDate: ref(), // Tambahkan variabel formattedArrivalDate
      formattedDepartureDate: ref(),
      mainData: {},
      selectedColumn: null
    }
  },
  data() {
    return {
      api: new this.$Api('housekeeping'),
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 20
      }
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    datePickerArrival: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    datePickerDeparture: {
      deep: true,
      handler(newDate) {
        this.fetchData()
      }
    },
    filterDisplay(newOption) {
      // Update the label based on the selected option
      this.updateFilterDisplayLabel(newOption)
    }
  },
  methods: {
    updateFilterDisplayLabel(option) {
      // Logic to update the label based on the selected option
      switch (option) {
        case 'roomId+desc':
          this.filterDisplayLabel = 'Room Number'
          break
        case 'roomType+asc':
          this.filterDisplayLabel = 'Room Type'
          break
        case 'guestName+asc':
          this.filterDisplayLabel = 'Guest Name'
          break
        case 'pic+asc':
          this.filterDisplayLabel = 'Person In Charge'
          break
        // Add other cases as needed
        default:
          this.filterDisplayLabel = 'Default Label'
      }
    },
    setFilterDisplay(option, label) {
      this.filterDisplay = option
      this.updateFilterDisplayLabel(option)
      this.fetchData()
    },
    onPaginationChange(props) {
      this.pagination = props.pagination
      this.fetchData()
    },
    onItemClick(label) {
      console.log(this.mainData)
      switch (label) {
        case 'VC':
          this.vacantLabel = 'Vacant Clean Checked'
          this.vacantNominal = this.mainData[label]
          break
        case 'VCU':
          this.vacantLabel = 'Vacant Clean Unchecked'
          this.vacantNominal = this.mainData[label]
          break
        case 'VD':
          this.vacantLabel = 'Vacant Dirty'
          this.vacantNominal = this.mainData[label]
          break
        case 'OC':
          this.occupiedLabel = 'Occupied Clean'
          this.occupiedNominal = this.mainData[label]
          break
        case 'OD':
          this.occupiedLabel = 'Occupied Dirty'
          this.occupiedNominal = this.mainData[label]
          break
        case 'ED':
          this.expectedLabel = 'Expected Departure'
          this.expectedNominal = this.mainData[label]
          break
        case 'DnD':
          this.expectedLabel = 'Do not Disturb'
          this.expectedNominal = this.mainData[label]
          break
        case 'OO':
          this.outLabel = 'Out of Order'
          this.outNominal = this.mainData[label]
          break
        case 'OF':
          this.outLabel = ' Out Market Room'
          this.outNominal = this.mainData[label]
          break
      }
    },
    fetchData() {
      this.loading = true

      let url = `clean-dirty?page=${this.pagination.page}&perPage=${this.pagination.rowsPerPage}`

      const DateArrival = this.datePickerArrival?.replace(/\//g, '-')
      if (DateArrival !== undefined && DateArrival !== '') {
        url += `&arrival=${DateArrival}`
      }

      const DateDeparture = this.datePickerDeparture?.replace(/\//g, '-')
      if (DateDeparture !== undefined && DateDeparture !== '') {
        url += `&depart=${DateDeparture}` // Ganti 'arrival' dengan 'departure'
      }

      if (this.filterDisplay !== null) {
        url += `&sortOrder=${this.filterDisplay}`
      }
      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { room } = data

          console.log(room)

          const arrivalDate = data.arr // Gantilah 'arrival.arr' dengan properti yang benar
          if (this.datePickerArrival == null) {
            this.datePickerArrival = arrivalDate
          }

          const departureDate = data.dep // Gantilah 'data.dep' dengan properti yang benar
          if (this.datePickerDeparture == null) {
            this.datePickerDeparture = departureDate
          }

          this.mainData = data.main
          this.vacantNominal = data.main.VC
          this.occupiedNominal = data.main.OC
          this.expectedNominal = data.main.ED
          this.outNominal = data.main.OO

          this.rows = room.map((rm) => ({
            Roomno: rm.roomNo,
            Roomstatus: rm.roomStatus,
            Guestname: rm.guestName,
            Arrival: rm.arrival,
            Departure: rm.departure,
            Personinchange: rm.pic
          }))
        }
      })
    }
  }
})
</script>

<style>
.tableComp .q-table th {
  border-top-width: 0;
  border-right-width: 4px;
  border-bottom-width: 0;
  border-left-width: 0;
  border-color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tableComp .q-table tbody td {
  font-size: 14px;
  border-right: 4px solid white;
}
.tableComp .q-table tbody tr:nth-child(even) {
  background-color: #fafafa;
}
.tableComp .q-table__bottom {
  display: inline-flex;
  justify-content: space-between;
  position: relative;
  border-width: 2px;
  border-right-width: 0;
  border-bottom-width: 0;
  border-left-width: 0;
  font-size: 0.875rem;
  line-height: 1.25rem;
  border-color: #069550;
  background: #fafafa;
}
.tableComp .q-table__control:nth-child(2) {
  position: absolute;
}
.tableComp .q-table__bottom .q-btn .q-icon {
  font-size: 1.875rem;
  line-height: 2.25rem;
  color: #069550;
}
.tableComp .disabled * {
  opacity: 0;
}

@media (max-width: 949px) {
  .q-ml-auto {
    margin-right: auto !important;
  }
}

@media (max-width: 687px) {
  .q-ml-auto {
    margin-left: 5px !important;
  }
}
@media (max-width: 391px) {
  .sorting {
    flex-direction: column;
  }
}
</style>
