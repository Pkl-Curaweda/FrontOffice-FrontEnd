<template>
  <q-page>
    <q-toolbar
      class="fo-menubar border bg-white items-stretch"
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div class="text-h5" style="height: 100%; width: fit-content">List Role</div>
      <q-btn color="primary" class="text-capitalize" @click="newRole = true">Add New Role</q-btn>
      <q-dialog v-model="newRole">
        <q-card style="max-width: 65vw">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Add New Role</div>
            <q-space />
            <div class="text-h6">Given Access</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="row" style="gap: 10px">
            <div
              class="col-grow"
              style="display: flex; flex-direction: column; justify-content: space-between"
            >
              <q-input
                dense
                outlined
                v-model="roleName"
                label="Role Name"
                class="q-mt-sm col-grow text-bold"
              />
              <q-btn class="text-capitalize" style="width: fit-content" color="primary"
                >Submit Role</q-btn
              >
            </div>

            <HKCard :style="`border-radius: 5px`">
              <div>
                <label class="text-bold">Super Admin Page</label>
                <div>
                  <q-checkbox v-model="checkboxReaderSuperAdmin" label="Reader" />
                  <q-checkbox v-model="checkboxEditorSuperAdmin" label="Editor" />
                </div>
              </div>

              <div class="q-mt-md">
                <label class="text-bold">Admin Page</label>
                <div>
                  <q-checkbox v-model="checkboxReaderAdmin" label="Reader" />
                  <q-checkbox v-model="checkboxEditorAdmin" label="Editor" />
                </div>
              </div>
            </HKCard>

            <HKCard :style="`border-radius: 5px`">
              <div>
                <label class="text-bold">Room Boy Page</label>
                <div>
                  <q-checkbox v-model="checkboxReaderRoomboy" label="Reader" />
                  <q-checkbox v-model="checkboxEditorRoomboy" label="Editor" />
                </div>
              </div>

              <div class="q-mt-md">
                <label class="text-bold">Supervisor Page</label>
                <div>
                  <q-checkbox v-model="checkboxReaderSupervisor" label="Reader" />
                  <q-checkbox v-model="checkboxEditorSupervisor" label="Editor" />
                </div>
              </div>
            </HKCard>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-btn flat square color="primary">
        <q-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
          >
            <path
              d="M16 10.09V4C16 1.79 12.42 0 8 0C3.58 0 0 1.79 0 4V14C0 16.21 3.59 18 8 18C8.46 18 8.9 18 9.33 17.94C9.1129 17.3162 9.00137 16.6605 9 16V15.95C8.68 16 8.35 16 8 16C4.13 16 2 14.5 2 14V11.77C3.61 12.55 5.72 13 8 13C8.65 13 9.27 12.96 9.88 12.89C10.4127 12.0085 11.1638 11.2794 12.0607 10.7731C12.9577 10.2668 13.9701 10.0005 15 10C15.34 10 15.67 10.04 16 10.09ZM14 9.45C12.7 10.4 10.42 11 8 11C5.58 11 3.3 10.4 2 9.45V6.64C3.47 7.47 5.61 8 8 8C10.39 8 12.53 7.47 14 6.64V9.45ZM8 6C4.13 6 2 4.5 2 4C2 3.5 4.13 2 8 2C11.87 2 14 3.5 14 4C14 4.5 11.87 6 8 6ZM19 15V17H16V20H14V17H11V15H14V12H16V15H19Z"
              fill="#008444"
            />
          </svg>
        </q-icon>
        <q-popup-proxy :offset="[10, 10]" v-model="isPopupOpen">
          <q-card style="width: 350px" class="q-px-sm q-py-sm">
            <div class="q-mt-md row items-center justify-between">
              <div class="text-h5">List User</div>
              <q-btn auto-close flat round icon="more_vert">
                <q-menu>
                  <q-list>
                    <q-item clickable @click="newUser = true">
                      <q-item-section>Add New User</q-item-section>
                      <q-dialog v-model="newUser" full-width>
                        <q-card>
                          <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">Add New User</div>
                            <q-space />
                            <div class="text-h6 q-mx-xl">Access</div>
                            <q-btn class="text-capitalize q-mx-md" color="primary">Add</q-btn>
                            <q-btn icon="close" flat round dense v-close-popup />
                          </q-card-section>

                          <q-card-section style="display: flex; gap: 10px">
                            <div>
                              <q-file
                                dense
                                outlined
                                clearablenpm
                                :placeholder="img"
                                v-model="img"
                                bg-color="primary"
                                label-color="white"
                                label="Add Picture"
                                style="width: 150px"
                                class="ellipsis"
                                type="file"
                                @update:model-value="handleUpload()"
                              />
                              <q-img :src="imgURL" v-if="imgURL" />
                              <div
                                class="justify-center items-center q-mt-md"
                                v-else
                                style="display: flex"
                              >
                                <q-icon
                                  name="o_person"
                                  size="100px"
                                  style="border: 1px solid black"
                                  class="q-pa-md"
                                />
                              </div>
                            </div>
                            <div>
                              <div style="display: flex; gap: 10px">
                                <q-input
                                  dense
                                  outlined
                                  v-model="name"
                                  label="Name"
                                  class="col-grow text-bold"
                                />
                                <q-input
                                  dense
                                  outlined
                                  v-model="numberPhone"
                                  label="Number Phone"
                                  class="col-grow"
                                />
                              </div>
                              <div class="q-mt-md" style="display: flex; gap: 10px">
                                <q-input outlined dense v-model="input" readonly label="Date">
                                  <template v-slot:append>
                                    <q-icon name="event" color="primary" class="cursor-pointer">
                                      <q-popup-proxy>
                                        <q-date
                                          v-model="input"
                                          mask="YYYY-MM-DD"
                                          style="width: 300px"
                                        />
                                      </q-popup-proxy>
                                    </q-icon>
                                  </template>
                                </q-input>
                                <q-input
                                  dense
                                  outlined
                                  v-model="nik"
                                  label="NIK"
                                  class="col-grow text-bold"
                                />
                                <q-select
                                  outlined
                                  dense
                                  v-model="gender"
                                  :options="optionsGender"
                                  label="Gender"
                                  class="col-grow"
                                />
                              </div>
                              <div class="q-mt-md" style="display: flex; gap: 10px">
                                <q-input
                                  dense
                                  outlined
                                  v-model="username"
                                  label="Username"
                                  class="col-grow text-bold"
                                />
                                <q-input
                                  v-model="password"
                                  outlined
                                  dense
                                  label="Password"
                                  :type="isPwd ? 'password' : 'text'"
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      :name="isPwd ? 'visibility_off' : 'visibility'"
                                      class="cursor-pointer"
                                      @click="isPwd = !isPwd"
                                    />
                                  </template>
                                </q-input>
                                <q-input
                                  v-model="confirmPassword"
                                  outlined
                                  dense
                                  label="Confirm Password"
                                  :type="isConfirmPwd ? 'password' : 'text'"
                                >
                                  <template v-slot:append>
                                    <q-icon
                                      :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                                      class="cursor-pointer"
                                      @click="isConfirmPwd = !isConfirmPwd"
                                    />
                                  </template>
                                </q-input>
                              </div>
                            </div>
                            <div class="col-grow">
                              <div style="display: flex; gap: 10px">
                                <HKCard class="col-grow">
                                  <div>
                                    <label class="text-bold">Super Admin Page</label>
                                    <div style="display: flex">
                                      <q-checkbox
                                        v-model="checkboxReaderSuperAdmin"
                                        label="Reader"
                                      />
                                      <q-checkbox
                                        v-model="checkboxEditorSuperAdmin"
                                        label="Editor"
                                      />
                                    </div>
                                  </div>
                                </HKCard>
                                <HKCard class="col-grow">
                                  <div>
                                    <label class="text-bold">Admin Page</label>
                                    <div style="display: flex">
                                      <q-checkbox
                                        v-model="checkboxReaderSuperAdmin"
                                        label="Reader"
                                      />
                                      <q-checkbox
                                        v-model="checkboxEditorSuperAdmin"
                                        label="Editor"
                                      />
                                    </div>
                                  </div>
                                </HKCard>
                              </div>
                              <div style="display: flex; gap: 10px" class="q-mt-sm">
                                <HKCard class="col-grow">
                                  <div>
                                    <label class="text-bold">Room Boy Page</label>
                                    <div style="display: flex">
                                      <q-checkbox
                                        v-model="checkboxReaderSuperAdmin"
                                        label="Reader"
                                      />
                                      <q-checkbox
                                        v-model="checkboxEditorSuperAdmin"
                                        label="Editor"
                                      />
                                    </div>
                                  </div>
                                </HKCard>
                                <HKCard class="col-grow">
                                  <div>
                                    <label class="text-bold">Supervisor Page</label>
                                    <div style="display: flex">
                                      <q-checkbox
                                        v-model="checkboxReaderSuperAdmin"
                                        label="Reader"
                                      />
                                      <q-checkbox
                                        v-model="checkboxEditorSuperAdmin"
                                        label="Editor"
                                      />
                                    </div>
                                  </div>
                                </HKCard>
                              </div>
                              <q-btn
                                class="text-capitalize q-mt-sm full-width"
                                color="primary"
                                dense
                                >Select Role</q-btn
                              >
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                    </q-item>
                    <q-item clickable @click="newRoomBoy = true">
                      <q-item-section> Add New Room Boy </q-item-section>
                      <q-dialog v-model="newRoomBoy">
                        <q-card style="width: 700px; max-width: 80vw">
                          <q-card-section class="row items-center q-pb-none">
                            <div class="text-h6">Add New Room Boy</div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                          </q-card-section>
                          <q-card-section style="display: flex; justify-content: space-between">
                            <div>
                              <q-select
                                outlined
                                dense
                                v-model="user"
                                :options="optionUser"
                                label="Gender"
                                class="col-grow"
                              />
                              <div style="display: flex">
                                <div>
                                  <q-img :src="imgRoomBoy" v-if="imgRoomBoy" />
                                  <div
                                    class="justify-center items-center q-mt-md"
                                    v-else
                                    style="display: flex"
                                  >
                                    <q-icon
                                      name="o_person"
                                      size="100px"
                                      style="border: 1px solid black"
                                      class="q-pa-md"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div style="display: flex">
                                    <div>Name:</div>
                                    <div>Anton</div>
                                  </div>
                                  <div style="display: flex">
                                    <div>Email:</div>
                                    <div>Anton@gmail.com</div>
                                  </div>
                                  <div>
                                    <label>Role</label>
                                    <div
                                      style="background-color: green"
                                      class="q-py-md q-px-xs text-white"
                                    >
                                      Super Admin
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <q-select
                                outlined
                                dense
                                v-model="user"
                                :options="optionUser"
                                label="Gender"
                                class="col-grow"
                              />
                              <q-input
                                dense
                                outlined
                                v-model="roleName"
                                label="Role Name"
                                class="q-mt-sm col-grow text-bold"
                              />
                              <q-select
                                outlined
                                dense
                                v-model="user"
                                :options="optionUser"
                                label="Gender"
                                class="col-grow"
                              />
                              <q-btn class="text-capitalize" color="primary">Add Room Boy</q-btn>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-dialog>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <div :class="`tableComp ${gapColorClass}`" class="my-table q-mt-md" style="width: 100%">
              <q-table
                :rows="rowsListUser"
                :columns="columnsListUser"
                row-key="name"
                square
                :table-header-style="{
                  backgroundColor: '#069550',
                  color: '#ffffff',
                  padding: '9px'
                }"
                :card-style="{ boxShadow: 'none' }"
                rows-per-page-label="Show"
                :rows-per-page-options="[]"
                hide-bottom
                :dense="$q.screen.lt.md"
              >
                <template v-slot:body="props">
                  <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
                    <q-td key="Name" :props="props">
                      {{ props.row.name }}
                    </q-td>
                    <q-td key="Email" :props="props">
                      {{ props.row.email }}
                    </q-td>
                    <q-td key="Password" :props="props">
                      {{ props.row.password }}
                    </q-td>
                    <q-td key="Room Boy" :props="props">
                      {{ props.row.roomBoy }}
                    </q-td>
                    <q-td key="Action" :props="props" style="width: 10px">
                      <q-btn
                        flat
                        rounded
                        size="13px"
                        style="color: #008444"
                        @click="editVoucher(props.row)"
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
                      <q-btn
                        flat
                        rounded
                        size="13px"
                        style="color: #008444"
                        @click="deleteVoucher(props.row)"
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
          </q-card>
        </q-popup-proxy>
      </q-btn>
    </q-toolbar>

    <div class="my-table multi-panel q-px-md q-py-sm" style="flex-grow: 1">
      <q-table
        :rows="rowsListRole"
        :columns="columnsListRole"
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
        :rows-per-page-options="[]"
        hide-bottom
        :dense="$q.screen.lt.md"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th rowspan="2">Name</q-th>
            <q-th colspan="2" style="text-align: center">Super Admin Page</q-th>
            <q-th colspan="2" style="text-align: center">Admin Page</q-th>
            <q-th colspan="2" style="text-align: center">Room Boy Page</q-th>
            <q-th colspan="2" style="text-align: center">Supervisor Page</q-th>
            <q-th rowspan="2" style="text-align: center">Action</q-th>
          </q-tr>
          <q-tr :props="props">
            <q-th>Reader</q-th>
            <q-th>Editor</q-th>
            <q-th>Reader</q-th>
            <q-th>Editor</q-th>
            <q-th>Reader</q-th>
            <q-th>Editor</q-th>
            <q-th>Reader</q-th>
            <q-th>Editor</q-th>
          </q-tr>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props" class="q-d-xs q-d-sm q-d-md">
            <q-td key="Nama" :props="props">
              {{ props.row.nama }}
            </q-td>
            <q-td key="Reader Super Admin" :props="props">
              {{ props.row.readerSuperAdmin }}
            </q-td>
            <q-td key="Editor Super Admin" :props="props">
              {{ props.row.editorSuperAdmin }}
            </q-td>
            <q-td key="Reader Admin" :props="props">
              {{ props.row.readerAdmin }}
            </q-td>
            <q-td key="Editor Admin" :props="props">
              {{ props.row.editorAdmin }}
            </q-td>
            <q-td key="Reader Room Boy" :props="props">
              {{ props.row.readerRoomboy }}
            </q-td>
            <q-td key="Editor Room Boy" :props="props">
              {{ props.row.editorRoomboy }}
            </q-td>
            <q-td key="Reader Supervisor" :props="props">
              {{ props.row.readerSupervisor }}
            </q-td>
            <q-td key="Editor Supervisor" :props="props">
              {{ props.row.editorSupervisor }}
            </q-td>
            <q-td key="Action" :props="props" style="width: 10px">
              <q-btn flat rounded size="13px" style="color: #008444" @click="editVoucher(props.row)"
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
              <q-btn
                flat
                rounded
                size="13px"
                style="color: #008444"
                @click="deleteVoucher(props.row)"
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
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'

const rowsListRole = ref([
  {
    nama: 'Product A',
    readerSuperAdmin: 10,
    editorSuperAdmin: 5,
    readerAdmin: 8,
    editorAdmin: 4,
    readerRoomboy: 6,
    editorRoomboy: 3,
    readerSupervisor: 7,
    editorSupervisor: 2
  },
  {
    nama: 'Product B',
    readerSuperAdmin: 12,
    editorSuperAdmin: 6,
    readerAdmin: 9,
    editorAdmin: 5,
    readerRoomboy: 7,
    editorRoomboy: 4,
    readerSupervisor: 8,
    editorSupervisor: 3
  },
  {
    nama: 'Product C',
    readerSuperAdmin: 8,
    editorSuperAdmin: 4,
    readerAdmin: 6,
    editorAdmin: 3,
    readerRoomboy: 5,
    editorRoomboy: 2,
    readerSupervisor: 4,
    editorSupervisor: 1
  }
])

export default defineComponent({
  name: 'SuperAdminAccess',
  components: { HKCard },

  setup() {
    return {
      imgURL: ref(''),
      img: ref(null),
      columnsListRole: [
        { name: 'Nama', label: 'Name', align: 'left', field: 'nama' },
        { name: 'Reader Super Admin', label: 'Reader', align: 'left', field: 'readerSuperAdmin' },
        { name: 'Editor Super Admin', label: 'Editor', align: 'left', field: 'editorSuperAdmin' },
        { name: 'Reader Admin', label: 'Reader', align: 'left', field: 'readerAdmin' },
        { name: 'Editor Admin', label: 'Editor', align: 'left', field: 'editorAdmin' },
        { name: 'Reader Room Boy', label: 'Reader', align: 'left', field: 'readerRoomboy' },
        { name: 'Editor Room Boy', label: 'Editor', align: 'left', field: 'editorRoomboy' },
        { name: 'Reader Supervisor', label: 'Reader', align: 'left', field: 'readerSupervisor' },
        { name: 'Editor Supervisor', label: 'Editor', align: 'left', field: 'editorSupervisor' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      columnsListUser: [
        { name: 'Name', label: 'Name', align: 'left', field: 'name' },
        { name: 'Email', label: 'Email', align: 'left', field: 'email' },
        { name: 'Password', label: 'Password', align: 'left', field: 'password' },
        { name: 'Room Boy', label: 'Room Boy', align: 'left', field: 'roomBoy' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      rowsListRole,
      newRole: ref(false),
      newUser: ref(false),
      newRoomBoy: ref(false),
      checkboxReaderSuperAdmin: ref(false),
      checkboxEditorSuperAdmin: ref(false),
      checkboxReaderAdmin: ref(false),
      checkboxEditorAdmin: ref(false),
      checkboxReaderRoomboy: ref(false),
      checkboxEditorRoomboy: ref(false),
      checkboxReaderSupervisor: ref(false),
      checkboxEditorSupervisor: ref(false),
      name: ref(''),
      numberPhone: ref(),
      nik: ref(),
      gender: ref(),
      optionsGender: ['Male', 'Female'],
      user: ref(),
      optionUser: ['Anton', 'Kipli'],
      username: ref(''),
      password: ref(''),
      isPwd: ref(true),
      confirmPassword: ref(''),
      isConfirmPwd: ref(true)
    }
  },
  methods: {
    handleUpload() {
      if (this.img) {
        this.imgURL = URL.createObjectURL(this.img)
        console.log(this.img)
      }
    }
  }
})
</script>

<style></style>
