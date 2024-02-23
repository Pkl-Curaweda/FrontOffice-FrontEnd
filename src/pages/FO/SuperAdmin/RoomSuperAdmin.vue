<template>
  <q-page style="overflow-y: scroll; height: 100%">
    <div class="q-pa-md">
      <div style="display: flex; gap: 5px; width: 100%">
        <div class="q-pa-md" style="width: 75%">
          <div style="justify-content: start; display: flex; width: 100%; margin-inline: auto">
            <!-- <div class="q-my-auto" style="font-size: larger">List Room</div> -->
            <q-btn
              color="primary"
              dense
              no-caps
              label="Add Room"
              @click="addroom = true"
              icon="add"
              class="q-px-sm"
            />
          </div>
          <div class="my-table q-mt-md">
            <q-table
              class="no-shadow my-sticky-dynamic"
              flat
              bordered
              :rows="listroom"
              :loading="loading"
              :columns="columns"
              row-key="name"
              v-model:pagination="pagination"
              @request="onPaginationChange"
            >
              <!-- :rows-per-page-options="[0]" -->
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
                          {{ col.label }}
                        </q-th>
                      </q-tr>
                    </template>
                  </q-th>
                </q-tr>
              </template>
              <template v-slot:body="props">
                <q-tr :props="props">
                  <template v-for="(cell, key, i) in props.row" :key="i">
                    <q-td
                      :style="cell.style"
                      v-if="!['image'].includes(key) && !['floor'].includes(key)"
                    >
                      <!-- v-if="!['image'].includes(key) && !['arrangment'].includes(key)" -->
                      {{ cell.data }}
                      <!-- style="border-bottom-width: 2px; border-color:rgba(128, 128, 128, 0.568);" -->
                    </q-td>
                  </template>
                  <!-- <q-td key="" :props="props" style="width: fit-content">
                    <q-btn
                      dense
                      borderless
                      cleared
                      flat
                      no-caps
                      :label="props.row.arrangment.data"
                      style="border-radius: 2px"
                      class="q-px-md"
                    />
                     v-if="!['REMOVED'].includes(data.label)"
                  </q-td> -->
                  <q-td key="" :props="props" style="width: fit-content">
                    <img :src="props.row.image.data" class="cropped-image" v-if="props.row.image" />
                  </q-td>
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
                                @click="editRoom(props.row)"
                                style="display: flex"
                              >
                                <q-btn
                                  flat
                                  rounded
                                  size="13px"
                                  @click="editRoom(props.row)"
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
                                style="display: flex"
                                @click="handleConfirm(props.row)"
                              >
                                <!-- @click="show(true, 1, props.row)" -->
                                <q-btn
                                  flat
                                  rounded
                                  size="14px"
                                  style="color: #269861"
                                  @click="handleConfirm(props.row)"
                                >
                                  <!-- @click="show(true, 1, props.row)" -->
                                  <svg
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
              <!-- <template v-slot:top>
                <q-pagination
                  v-model="pagination.page"
                  :max="maxPages"
                  @input="getDataRoom"
                ></q-pagination>
              </template> -->
            </q-table>
          </div>
        </div>
        <div style="padding-inline: 10px; width: 20%">
          <q-card flat bordered class="my-card" style="width: 300px">
            <q-card-section>
              <div class="text-h6">Room Type</div>
            </q-card-section>

            <q-card-section class="q-pt-none horizontal-list">
              <div v-for="(data, key, i) in roomTypes" :key="i" style="text-wrap: balance">
                <q-btn
                  dense
                  color="primary"
                  outline
                  no-caps
                  :label="data.label"
                  @click="handleDialog(data.label, 'Edit Room Type')"
                  style="border-radius: 2px"
                  class="q-px-md"
                />
                <!-- v-if="!['REMOVED'].includes(data.label)" -->
              </div>
              <q-btn
                color="primary"
                dense
                size="xs"
                no-caps
                @click="handleDialog(null, 'Add Room Type')"
                icon="add"
                style="border-radius: 2px"
                class="q-px-md"
              />
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="text-h6">Arrangment</div>
            </q-card-section>

            <q-card-section class="q-pt-none horizontal-list">
              <div v-for="(data, key, i) in arrangment" :key="i" style="text-wrap: balance">
                <q-btn
                  dense
                  color="primary"
                  outline
                  no-caps
                  :label="data.label"
                  @click="handleDialog(data.label, 'Edit Arrangment')"
                  style="border-radius: 2px"
                  class="q-px-md"
                />
                <!-- v-if="!['REMOVED'].includes(data.label)" -->
              </div>
              <q-btn
                color="primary"
                dense
                size="xs"
                no-caps
                @click="handleDialog(null, 'Add Arrangment')"
                icon="add"
                style="border-radius: 2px"
                class="q-px-md"
              />
            </q-card-section>
          </q-card>
        </div>
        <q-dialog v-model="addroom">
          <q-card class="q-pa-md">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Create Room</div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
            </q-bar>
            <q-form class="q-pa-md q-mx-auto">
              <div style="width: 100%; display: block">
                <q-file
                  class="q-my-md"
                  label="upload file"
                  dense
                  v-model="img"
                  type="file"
                  outlined
                  color="black"
                  style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                  @update:model-value="handleUpload()"
                >
                </q-file>
                <q-img
                  :src="imgURL"
                  v-if="img"
                  class="cropped-image q-mb-md"
                  style="width: 100%; height: 200px; object-file: cover; border-radius: 3px"
                />
                <div style="display: block">
                  <div style="display: flex; gap: 10px; width: 100%" class="col">
                    <q-select
                      outlined
                      v-model="typeRoomSelect"
                      :options="roomTypes"
                      dense
                      style="width: 100%"
                      :label="'Select Room Type'"
                      dropdown-icon="expand_more"
                    >
                    </q-select>
                    <q-input
                      type="number"
                      v-model="floorInput"
                      dense
                      outlined
                      style="width: 100%"
                      placeholder="Floor Number"
                    />
                    <q-input
                      type="number"
                      v-model="roomNoInput"
                      dense
                      outlined
                      style="width: 100%"
                      placeholder="Room Number"
                    />
                  </div>
                  <q-input
                    v-model="descriptionInput"
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
                    @click="postAddRoom()"
                    no-caps
                    style="border-radius: 8px"
                    class="q-px-xl"
                    v-close-popup="this.typeRoomSelect"
                    >Create</q-btn
                  >
                </q-card-section>
              </div>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="addtype">
          <q-card class="q-pa-md">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">
                {{ this.title }}
              </div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
            </q-bar>
            <q-form class="q-px-sm q-mx-auto">
              <div class="col" style="width: 100%; gap: 10px; display: flex">
                <q-input
                  type="text"
                  autogrow
                  v-model="longDescInput"
                  dense
                  style="width: 50%"
                  class="q-my-md"
                  outlined
                  label="Long Description"
                />
                <q-input
                  v-model="shortDescInput"
                  type="text"
                  autogrow
                  style="width: 50%"
                  dense
                  class="q-my-md"
                  outlined
                  label="Short Desc"
                />
              </div>
              <div class="col" style="width: 100%; gap: 10px; display: flex">
              <q-select
                outlined
                v-model="bedSetupSelect"
                :options="bedlist"
                style="width: 30%"
                :label="'Bed Setup'"
                dropdown-icon="expand_more"
                dense
              >
            </q-select>
              <q-input
                  type="number"
                  v-model="standardTimeInput"
                  dense
                  outlined
                  class="col-grow"
                  label="Standard Time"
                />
          </div>
              <q-checkbox
                v-model="selectionRbRo"
                v-if="!this.editType"
                label="Auto generate RB & RO"
                color="primary"
              />
              <div
                v-if="this.selectionOptRbRo || this.editType"
                class="col q-py-sm"
                style="width: 100%; gap: 10px; display: flex"
              >
                <q-input
                  type="number"
                  v-model="priceRBInput"
                  dense
                  outlined
                  style="width: 50%"
                  label="Price RB"
                />
                <q-input
                  type="number"
                  v-model="priceROInput"
                  dense
                  outlined
                  style="width: 50%"
                  label="Price RO"
                />
                <!-- <q-btn
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
                > -->
              </div>
              <q-card-actions align="right">
                <q-btn
                  @click="postAddType(1)"
                  v-if="!this.editType"
                  no-caps
                  label="Submit"
                  color="primary"
                />

                <q-btn
                  @click="deleteDetail(1)"
                  v-if="this.editType"
                  no-caps
                  label="Delete"
                  outline
                  color="primary"
                />

                <q-btn
                  @click="postEditTypeRoom"
                  v-if="this.editType"
                  no-caps
                  label="Submit"
                  color="primary"
                />
              </q-card-actions>

              <!-- <q-card-section class="items-right" style="width: 100%">
                <q-btn
                  dense
                  color="primary"
                  @click="postAddType(1)"
                  no-caps
                  style="border-radius: 8px; width: 100%"
                  :label="'Submit'"
                  class="q-px-xl"
                  v-if="!this.editType"
                />
                <q-btn
                  dense
                  color="primary"
                  @click="postEditTypeRoom"
                  no-caps
                  style="border-radius: 8px; width: 100%"
                  :label="'Submit'"
                  class="q-px-xl"
                  v-if="this.editType"
                />
              </q-card-section> -->
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="confirmDelete">
          <q-card style="width: 300px; justify-content: center">
            <div class="q-pa-sm col" style="display: block; width: 100%; gap: 5px">
              <div style="width: 100%; text-align: center">
                do you want to delete data {{ this.cacheData.roomNo.data }}
              </div>
              <div class="q-pa-sm col" style="display: flex; width: 100%; gap: 5px">
                <q-btn
                  dense
                  noCaps
                  color="primary"
                  v-close-popup
                  @click="clearData"
                  label="Close"
                  class="q-px-md"
                  style="width: 100%"
                />
                <q-btn
                  dense
                  noCaps
                  color="red"
                  @click="deleteDataRoom"
                  label="Delete"
                  class="q-px-md"
                  style="width: 100%"
                />
              </div>
            </div>
          </q-card>
        </q-dialog>
        <q-dialog v-model="addArr">
          <q-card class="rounded-borders">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">
                {{ this.title }}
              </div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
            </q-bar>
            <q-form class="q-mx-auto q-pa-md">
              <div style="display: flex; width: 500px; gap: 10px" class="row">
                <q-select
                  outlined
                  style="width: 100%"
                  v-model="typeRoomSelect"
                  :options="roomTypes"
                  :label="'Select Room Type'"
                  dropdown-icon="expand_more"
                  dense
                />
                <div v-if="typeRoomSelect" class="col" style="width: 100%; display: flex; gap: 5px">
                  <div style="width: 50%">
                    <div class="q-px-auto" style="text-align: center">RO</div>
                    <!-- <div class="q-px-sm">Id : {{ typeRoomSelect.label + '-RO' }}</div> -->
                    <q-input
                      type="text"
                      autogrow
                      v-model="idArrRO"
                      dense
                      style="width: 100%"
                      class="q-my-md"
                      outlined
                      label="Id"
                    />

                    <q-input
                      type="number"
                      v-model="rateInputRO"
                      dense
                      style="width: 100%"
                      class="q-my-md"
                      outlined
                      label="Rate"
                    />
                  </div>
                  <div style="width: 50%">
                    <div class="q-px-auto" style="text-align: center">RB</div>
                    <!-- <div class="q-px-sm">Id : {{ typeRoomSelect.label + '-RB' }}</div> -->
                    <q-input
                      type="text"
                      autogrow
                      v-model="idArrRB"
                      dense
                      style="width: 100%"
                      class="q-my-md"
                      outlined
                      label="Id"
                    />
                    <q-input
                      v-model="rateInputRB"
                      type="number"
                      style="width: 100%"
                      dense
                      class="q-my-md"
                      outlined
                      label="Rate"
                    />
                  </div>
                </div>
              </div>
              <q-card-actions align="right">
                <!-- <q-btn v-close-popup label="Cancel" no-caps color="primary" outline="" /> -->

                <q-btn @click="postAddType(2)" no-caps label="Change Room" color="primary" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="editArr">
          <q-card class="rounded-borders">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">
                Edit Arrangment {{ this.detailSelect }}
              </div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
            </q-bar>
            <q-form class="q-mx-auto q-pa-md">
              <div style="display: flex; width: 500px; gap: 10px" class="row">
                <q-input
                  v-model="rateInput"
                  type="number"
                  style="width: 100%"
                  dense
                  class="q-my-md"
                  outlined
                  label="Rate"
                />
              </div>
              <q-card-actions align="right">
                <q-btn
                  @click="deleteDetail(2)"
                  v-if="this.editArr"
                  no-caps
                  label="Delete"
                  outline
                  color="primary"
                />
                <q-btn @click="postEditArr()" no-caps label="Change Room" color="primary" />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="editroom">
          <q-card class="rounded-borders">
            <q-bar style="min-width: 250px" class="bg-white text-grey rounded-borders q-pa-xs">
              <div class="cursor-pointer non-selectable q-px-md">Edit Room</div>
              <q-space />
              <q-btn
                dense
                flat
                color="grey"
                size="sm"
                outline
                icon="close"
                v-close-popup
                @click="clearData"
              />
            </q-bar>
            <q-form class="q-pa-md q-mx-auto">
              <div style="width: 100%; display: block">
                <div style="width: 100%; display: flex; gap: 5px" class="col">
                  <div style="width: 200px">
                    <q-file
                      label="upload new picture"
                      dense
                      v-model="img"
                      type="file"
                      outlined
                      class="q-mb-md"
                      style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap"
                      color="black"
                      @update:model-value="handleUpload()"
                    >
                    </q-file>
                    <q-img
                      :src="imgURL || this.rowdataSelect.image.data"
                      style="width: 100%; height: 75%; object-file: cover; border-radius: 3px"
                    />
                  </div>

                  <div>
                    <div style="display: block">
                      <div style="display: flex; gap: 10px; width: 100%" class="col">
                        <q-select
                          outlined
                          v-model="typeRoomSelect"
                          :options="roomTypes"
                          dense
                          style="width: 100%"
                          :label="'Select Room Type'"
                          dropdown-icon="expand_more"
                        />
                        <!-- <q-btn-dropdown :label="this.rowdataSelect.roomType.data" outline>
                          <q-list>
                            <q-item
                              v-for="(option, index) in roomTypes"
                              :key="index"
                              clickable
                              v-close-popup
                              @click="onItemClick(option)"
                            >
                              <q-item-section>
                                <q-item-label>{{ option.label }}</q-item-label>
                              </q-item-section>
                            </q-item>
                          </q-list>
                        </q-btn-dropdown> -->
                        <!-- </q-select
                        > -->
                        <q-input
                          type="number"
                          v-model="floorInput"
                          dense
                          outlined
                          style="width: 100%"
                          placeholder="Floor Number"
                        />
                        <q-input
                          type="number"
                          v-model="roomNoInput"
                          dense
                          disable
                          outlined
                          style="width: 100%"
                          placeholder="Room Number"
                        />
                      </div>
                      <q-input
                        v-model="descriptionInput"
                        class="q-my-md"
                        label="Description..."
                        dense
                        outlined
                        type="textarea"
                      />
                    </div>
                  </div>
                </div>
                <q-card-actions align="right">
                  <q-btn
                    @click="postEditRoom"
                    v-close-popup="this.roomSelect != null"
                    no-caps
                    label="Change Status"
                    color="primary"
                  />
                </q-card-actions>
              </div>
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
import { trigger } from 'src/services/helper/notify'

const columns = [
  { name: 'RoomNo', label: 'Room No', align: 'center', field: 'roomNo' },
  { name: 'RoomType', label: 'Room Type', align: 'center', field: 'roomType' },
  { name: 'Arrangment', label: 'Arrangment', align: 'center', field: 'arrangment' },
  { name: 'RoomStatus', label: 'Room Status', align: 'center', field: 'RoomStatus' },
  { name: 'BedSetup', label: 'Bed Setup', align: 'center', field: 'bedSetup' },
  { name: 'Description', label: 'Description', align: 'center', field: 'description' },
  { name: 'Image', label: 'Image', align: 'center', field: 'image' },
  { name: '', label: 'Action', align: 'center', field: '' }
]

const rows = []
export default defineComponent({
  name: 'room-admin',
  setup() {
    return {
      columns,
      rows,
      img: ref(null),
      imgInput: ref(''),
      imgURL: ref(''),
      optionRR: ref(''),
      options: ['DLX', 'STD', 'FML'],
      addroom: ref(false),
      addtype: ref(false),
      addArr: ref(false),
      selectionRbRo: ref(false),
      selectionOptRbRo: ref(false),
      isRoSelected: ref(false),
      isRbSelected: ref(false),
      editroom: ref(false),
      listroom: ref([]),
      roomTypes: ref([]),
      arrangment: ref([]),
      descriptionInput: ref(''),
      roomNoInput: ref(),
      floorInput: ref(),
      longDescInput: ref(),
      shortDescInput: ref(),
      bedlist: ref([{ label: 'SINGLE' }, { label: 'TWIN' }, { label: 'KING' }]),
      rmNoSelect: ref(),
      roomTypeSelect: ref(),
      typeRoomSelect: ref(''),
      bedSetupSelect: ref(''),
      title: ref(''),
      rateInputRO: ref(),
      rateInputRB: ref(),
      rateInput: ref(),
      detailSelect: ref(''),
      rowdataSelect: ref([]),
      idArrRB: ref(''),
      idArrRO: ref(''),
      detailArr: ref([]),
      editArr: ref(false),
      editType: ref(false),
      confirmDelete: ref(false),
      priceRBInput: ref(),
      priceROInput: ref(),
      cacheData: ref([]),
      confirmTypeDelete: ref(false),
      confirmArrDelete: ref(false),
      typeDelete: ref(0),
      standardTimeInput: ref(),
      standardTimePrev: ref(''),
    }
  },
  data() {
    return {
      api: new this.$Api('superadmin'),
      pagination: {
        page: 1,
        rowsPerPage: 5 // jumlah item per halaman
      }
    }
  },
  watch: {
    selectionRbRo() {
      this.selectionOptRbRo = !this.selectionOptRbRo
    },
    typeRoomSelect() {
      if (this.typeRoomSelect) {
        this.idArrRB = this.typeRoomSelect.label + '-RB'
        this.idArrRO = this.typeRoomSelect.label + '-RO'
      }
    }
  },
  computed: {
    pagedItems() {
      const start = (this.pagination.page - 1) * this.pagination.rowsPerPage
      return this.listroom.slice(start, start + this.pagination.rowsPerPage)
    },
    maxPages() {
      return Math.ceil(this.listroom.length / this.pagination.rowsPerPage)
    }
  },
  mounted() {
    this.getDataRoom()
  },
  methods: {
    // onItemClick(option) {
    //   this.typeRoomSelect = option
    // },
    clearData() {
      this.imgInput = null
      this.imgURL = null
      this.optionRR = null
      this.descriptionInput = null
      this.roomNoInput = null
      this.floorInput = null
      this.longDescInput = null
      this.shortDescInput = null
      this.rmNoSelect = null
      this.roomTypeSelect = null
      this.typeRoomSelect = null
      this.bedSetupSelect = null
      this.title = null
      this.rateInputRO = null
      this.rateInputRB = null
      this.rateInput = null
      this.detailSelect = null
      this.idArrRB = null
      this.idArrRO = null
      this.detailArr = null
      this.priceRBInput = null
      this.priceROInput = null
      this.standardTimeInput = null
    },
    handleConfirm(data) {
      this.cacheData = data
      console.log(this.cacheData)
      this.confirmDelete = true
    },
    handleConfirmDetail() {
      this.confirmDelete = true
    },
    handleDialog(value, state) {
      this.title = state
      this.detailSelect = value
      value != null ? this.trigger('positive', this.detailSelect) : ''

      if (state == 'Add Room Type') {
        this.addtype = true
        this.editType = false
      } else if (state == 'Edit Room Type') {
        this.addtype = true
        this.editType = true
        this.getDetailType()
      } else if (state == 'Add Arrangment') {
        this.addArr = true
      } else if (state == 'Edit Arrangment') {
        this.getDetailArr()
        this.editArr = true
      }
    },
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
      } else {
        this.trigger('warning', 'select your type')
      }
    },
    trigger(type, txt) {
      if (txt != null) {
        this.$q.notify(
          {
            type: type,
            message: txt,
            timeout: 30
          },
          50
        )
      }
    },
    getDetailType() {
      this.api.get(`room/helper/room-type/${this.detailSelect}`, ({ status, message, data }) => {
        if (status == 200) {
          this.longDescInput = data.longDescription
          this.shortDescInput = data.shortDesc
          this.bedSetupSelect = data.bedSetup
          this.priceRBInput = data.RBPrice
          this.priceROInput = data.ROPrice
          this.standardTimeInput = data.standardTime
         }
      })
    },
    getDetailArr() {
      this.api.get(`room/helper/arr/${this.detailSelect}/edit`, ({ status, message, data }) => {
        if (status == 200) {
          this.rateInput = data.rate
        }
      })
    },
    getDataRoom() {
      this.api.get(`/room`, ({ status, message, data }) => {
        if (status == 200) {
          const list = []
          const { rooms, roomTypes, arrangment } = data
          rooms.forEach((room) => {
            let arrangment = ''
            const styleArr = 'text-wrap: wrap; width: fit-content;'
            room.arrangment.forEach((arr, index) => {
              arrangment += `${arr.id}`
              if (index < room.arrangment.length - 1) {
                arrangment += ' '
              }
            })
            list.push({
              roomNo: { data: room.roomNo },
              roomType: { data: room.roomType },
              arrangment: { data: arrangment, style: styleArr },
              roomStatus: { data: room.roomStatus },
              bedSetup: { data: room.bedSetup },
              image: { data: room.image },
              floor: { data: room.floor },
              description: { data: room.description }
            })
          })
          this.roomTypes = roomTypes.map((item) => ({ label: item.id }))
          console.log(this.roomTypes)
          this.arrangment = arrangment.map((item) => ({ label: item.id }))
          this.listroom = list
          // const index = this.listroom.indexOf(0)
          // while (index !== -1) {
          //   this.listroom[index]--
          //   index = this.listroom.indexOf(0, index + 1)
          // }

          console.log(this.listroom.length)
          console.log(index)

          // console.log(this.listroom.length - index - 2)
        }
      })
    },
    editRoom(data) {
      this.rowdataSelect = data
      console.log(this.rowdataSelect)
      this.descriptionInput = this.rowdataSelect.description.data
      this.roomNoInput = this.rowdataSelect.roomNo.data
      this.typeRoomSelect = this.rowdataSelect.roomType.data
      // this.img = this.rowdataSelect.image.data
      // console.log(this.rowdataSelect.image.data)
      this.floorInput = this.rowdataSelect.floor.data
      this.editroom = true
    },
    postEditRoom() {
      try {
        console.log(this.typeRoomSelect)
        const pictureExist =
          this.img != null ? { image: this.img } : { picture: this.rowdataSelect.image.data }
        console.log(pictureExist)
        // if (this.img){}
        this.api.useMultipart(true).post(
          `room/room`,
          {
            type: this.typeRoomSelect.label || this.typeRoomSelect,
            floor: this.floorInput,
            roomNo: this.roomNoInput,
            ...pictureExist,
            description: this.descriptionInput
          },
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('positive', message)
              this.typeRoomSelect = null
              this.floorInput = null
              this.roomNoInput = null
              this.img = null
              this.descriptionInput = null
              window.location.reload()
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    postEditArr() {
      try {
        this.api.post(
          `room/arr`,
          [
            {
              id: this.detailSelect,
              rate: parseFloat(this.rateInput)
            }
          ],
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('positive', message)
              this.detailSelect = null
              this.rateInput = null
              window.location.reload()
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    postAddRoom() {
      try {
        this.api.useMultipart(true).post(
          `room/room/add`,
          {
            type: this.typeRoomSelect.label,
            floor: this.floorInput,
            roomNo: this.roomNoInput,
            image: this.img,
            description: this.descriptionInput
          },
          ({ status, message }) => {
            if (status == 200) {
              this.trigger('positive', message)
              this.typeRoomSelect = null
              this.floorInput = null
              this.roomNoInput = null
              this.img = null
              this.descriptionInput = null
            } else {
              this.trigger('negative', message)
            }
          }
        )
      } catch (error) {
        console.error(error)
      }
    },
    postAddType(state) {
      const checkStandard = {}

      this.standardTimeInput != this.standardTimePrev ? (checkStandard['standardTime'] = parseInt(this.standardTimeInput)): ''
      if (state == 1) {
        try {
          this.api.post(
            `/room/room-type/add`,
            {

              shortDesc: this.shortDescInput,
              longDesc: this.longDescInput,
              bedSetup: this.bedSetupSelect.label,
              generateArr: this.selectionRbRo,
              priceRB: parseInt(this.priceRBInput),
              priceRO: parseInt(this.priceROInput),
              ...checkStandard

            },
            ({ status, message }) => {
              if (status == 200) {
                this.trigger('positive', message)
                this.getDataRoom()
                this.clearData()
              }
            }
          )
        } catch (error) {
          console.error(error)
        }
      } else if (state == 2) {
        try {
          this.api.post(
            `/room/arr/add`,
            [
              {
                id: this.idArrRB,
                rate: parseFloat(this.rateInputRB),
                matchTypeId: this.typeRoomSelect.label
              },
              {
                id: this.idArrRO,
                rate: parseFloat(this.rateInputRO),
                matchTypeId: this.typeRoomSelect.label
              }
            ],
            ({ status, message }) => {
              if (status == 200) {
                this.getDataRoom()
                this.trigger('positive', message)
                this.clearData()
              }
            }
          )
        } catch (error) {
          console.error(error)
        }
      }
    },
    postEditTypeRoom() {
      const checkStandard = {}
      this.standardTimeInput != this.standardTimePrev ? (checkStandard['standardTime'] = parseInt(this.standardTimeInput)): ''

      this.api.post(
        `room/room-type`,
        {
          shortDesc: this.shortDescInput,
          longDesc: this.longDescInput,
          bedSetup: this.bedSetupSelect.label || this.bedSetupSelect,
          generateArr: false,
          ...checkStandard,
          priceRB: parseInt(this.priceRBInput),
              priceRO: parseInt(this.priceROInput),        },
        ({ message, status }) => {
          if (status == 200) {
            this.trigger('positive', message)
            this.getDataRoom()
          }
        }
      )
    },
    deleteDataRoom() {
      // console.log(data.roomNo.data)
      try {
        const url = `room/room/${this.cacheData.roomNo.data}`
        this.api.delete(url, ({ message, status }) => {
          if (status == 200) {
            this.getDataRoom()
            this.trigger('positive', message)
            this.cacheData = null
            window.location.reload()
          } else {
            this.trigger('negative', message)
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    deleteDetail(state) {
      let url

      if (state == 1) {
        url = `room/room-type/${this.detailSelect}`
      } else if (state == 2) {
        url = `room/arr/${this.detailSelect}`
      }

      try {
        this.api.delete(url, ({ status, message }) => {
          if (status == 200) {
            this.trigger('positive', message)
            window.location.reload()
          }
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style>
.q-file:not([data-has-value='true']) .file-name-container {
  display: none; /* Menyembunyikan nama file saat tidak ada file yang dipilih */
}
.cropped-image {
  width: 70px;
  height: 70px;
  border-radius: 1px;
  object-fit: cover;
}

.horizontal-list {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}
</style>
