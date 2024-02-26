<template>
  <q-page>
    <!-- <q-toolbar
      class="fo-menubar border bg-white items-stretch"
      style="display: flex; align-items: center; justify-content: space-between"
    >
      <div class="text-h5" style="height: 100%; width: fit-content">List Role</div>
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
              <q-input
                dense
                outlined
                v-model="path"
                label="Path"
                class="q-mt-sm col-grow text-bold"
              />
              <q-btn
                class="text-capitalize"
                style="width: fit-content"
                color="primary"
                @click="saveRole"
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
    </q-toolbar> -->

    <div class="my-table multi-panel q-px-md q-py-sm" style="flex-grow: 1">
      <q-table
        :rows="rowsListRole"
        :columns="columnsListRole"
        row-key="name"
        square
        :table-header-style="{
          backgroundColor: '#069550',
          color: '#ffffff',
          padding: '9px'
        }"
        title="List Role"
        :card-style="{ boxShadow: 'none' }"
        rows-per-page-label="Show"
        :rows-per-page-options="[0]"
        hide-bottom
        :dense="$q.screen.lt.md"
      >
        <template v-slot:top-right>
          <q-btn color="primary" class="text-capitalize" @click="addNewRole">Add New Role</q-btn>
          <q-dialog v-model="newRole">
            <q-card style="max-width: 65vw">
              <q-card-section class="row items-center q-pb-none">
                <div class="text-h6">{{ editRoomBoySet.title }}</div>
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
                  <q-input
                    dense
                    outlined
                    v-model="path"
                    label="Path"
                    class="q-mt-sm col-grow text-bold"
                  />
                  <q-btn
                    class="text-capitalize"
                    style="width: fit-content"
                    color="primary"
                    @click="saveRole"
                    >{{ submitRole || 'Submit Role' }}</q-btn
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
                    <label class="text-bold">Room Boy Page</label>
                    <div>
                      <q-checkbox v-model="checkboxReaderRoomboy" label="Reader" />
                      <q-checkbox v-model="checkboxEditorRoomboy" label="Editor" />
                    </div>
                  </div>
                </HKCard>

                <HKCard :style="`border-radius: 5px`">
                  <div>
                    <label class="text-bold">Admin Page</label>
                    <div>
                      <q-checkbox v-model="checkboxReaderAdmin" label="Reader" />
                      <q-checkbox v-model="checkboxEditorAdmin" label="Editor" />
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
        </template>
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
            <q-td key="Nama" :props="props" @click="showListUser(props.row)" class="cursor-pointer">
              {{ props.row.nama }}
            </q-td>
            <q-td
              key="Reader Super Admin"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.readerSuperAdmin }"
            >
            </q-td>
            <q-td
              key="Editor Super Admin"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.editorSuperAdmin }"
            >
            </q-td>
            <q-td
              key="Reader Admin"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.readerAdmin }"
            >
            </q-td>
            <q-td
              key="Editor Admin"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.editorAdmin }"
            >
            </q-td>
            <q-td
              key="Reader Room Boy"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.readerRoomboy }"
            >
            </q-td>
            <q-td
              key="Editor Room Boy"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.editorRoomboy }"
            >
            </q-td>
            <q-td
              key="Reader Supervisor"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.readerSupervisor }"
            >
            </q-td>
            <q-td
              key="Editor Supervisor"
              :props="props"
              @click="showListUser(props.row)"
              class="cursor-pointer"
              :style="{ backgroundColor: props.row.editorSupervisor }"
            >
            </q-td>
            <q-td key="Action" :props="props" style="width: 10px">
              <q-btn flat rounded size="13px" style="color: #008444" @click="editRole(props.row)"
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
                @click="handleConfirm('role', props.row.id, props.row.nama)"
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
    <q-dialog v-model="dialogListUser" seamless position="bottom" full-width>
      <q-card>
        <q-card-section class="flex items-center q-pb-none">
          <div class="text-h6">List User</div>
          <q-space />
          <q-btn auto-close flat round icon="more_vert">
            <q-menu>
              <q-list>
                <q-item clickable @click="newUserDialog" style="display: flex">
                  <q-btn flat rounded size="13px" style="color: #008444">
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
                  </q-btn>
                  <q-item-section>
                    <q-item-label>Add New User</q-item-label>
                  </q-item-section>
                </q-item>
                <q-dialog v-model="newUser" full-width>
                  <q-card>
                    <q-card-section class="row items-center q-pb-none">
                      <div class="text-h6">{{ editRoomBoySet.title }}</div>
                      <q-space />
                      <div class="text-h6 q-mx-md">Access</div>
                      <q-btn class="text-capitalize q-mx-md" color="primary" @click="saveUser">{{
                        editRoomBoySet.button
                      }}</q-btn>
                      <q-btn icon="close" flat round dense v-close-popup @click="clearFieldRole" />
                    </q-card-section>

                    <q-card-section style="display: flex; gap: 10px; width: 100%" class="col">
                      <div>
                        <q-file
                          dense
                          outlined
                          clearable
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
                        <q-img class="q-mt-sm" :src="imgURL" v-if="imgURL" />
                        <div
                          class="justify-center items-center q-mt-md"
                          v-else
                          style="display: flex"
                        >
                          <q-icon
                            name="account_circle"
                            color="grey"
                            size="100px"
                            style="border: 1px solid rgb(83, 83, 83)8, 78, 78)"
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
                            v-model="email"
                            label="Email"
                            class="col-grow text-bold"
                          />
                          <q-input
                            dense
                            outlined
                            type="number"
                            v-model="numberPhone"
                            label="Number Phone"
                            class="col-grow"
                          />
                        </div>
                        <div class="q-mt-md" style="display: flex; gap: 10px">
                          <q-input outlined v-model="input" readonly dense label="Birthday">
                            <template v-slot:append>
                              <q-icon name="event" color="primary" class="cursor-pointer">
                                <q-popup-proxy>
                                  <q-date v-model="input" mask="YYYY-MM-DD" style="width: 300px" />
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                          <q-input
                            dense
                            outlined
                            v-model="nik"
                            type="number"
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
                            v-if="!isEditingUser"
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
                            v-if="!isEditingUser"
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
                        <q-select
                          outlined
                          dense
                          v-model="user"
                          :options="optionUser"
                          class="q-mt-md"
                          label="Select Role"
                        />
                      </div>
                      <div class="col-grow">
                        <div style="display: flex; gap: 10px">
                          <HKCard class="col-grow" :style="`border-radius: 5px`">
                            <div>
                              <label class="text-bold">Super Admin Page</label>
                              <div style="display: flex">
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxReaderSuperAdminUser"
                                  label="Reader"
                                />
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxEditorSuperAdminUser"
                                  label="Editor"
                                />
                              </div>
                            </div>
                          </HKCard>
                          <HKCard class="col-grow" :style="`border-radius: 5px`">
                            <div>
                              <label class="text-bold">Admin Page</label>
                              <div style="display: flex">
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxReaderAdminUser"
                                  label="Reader"
                                />
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxEditorAdminUser"
                                  label="Editor"
                                />
                              </div>
                            </div>
                          </HKCard>
                        </div>
                        <div style="display: flex; gap: 10px" class="q-mt-sm">
                          <HKCard class="col-grow" :style="`border-radius: 5px`">
                            <div>
                              <label class="text-bold">Room Boy Page</label>
                              <div style="display: flex">
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxReaderRoomboyUser"
                                  label="Reader"
                                />
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxEditorRoomboyUser"
                                  label="Editor"
                                />
                              </div>
                            </div>
                          </HKCard>
                          <HKCard class="col-grow" :style="`border-radius: 5px`">
                            <div>
                              <label class="text-bold">Supervisor Page</label>
                              <div style="display: flex">
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxReaderSupervisorUser"
                                  label="Reader"
                                />
                                <q-checkbox
                                  :disable="true"
                                  v-model="checkboxEditorSupervisorUser"
                                  label="Editor"
                                />
                              </div>
                            </div>
                          </HKCard>
                        </div>
                        <!-- <q-select
                          outlined
                          dense
                          v-model="user"
                          :options="optionUser"
                          class="q-mt-md"
                          label="Select Role"
                        /> -->
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
                <q-item clickable @click="newRoomBoyDialog" class="flex">
                  <q-btn flat rounded size="13px" style="color: #008444">
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
                  </q-btn>
                  <q-item-section>
                    <q-item-label>Add New Room Maid</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable style="display: flex" @click="editRoomboy">
                  <q-btn flat rounded size="13px" style="color: #008444">
                    <svg
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
                    <q-item-label>Edit Room Maid</q-item-label>
                  </q-item-section>
                </q-item>
                <q-dialog v-model="newRoomBoy">
                  <q-card style="width: 700px; max-width: 80vw">
                    <q-card-section class="row items-center q-pb-none">
                      <div class="text-h6">{{ editRoomBoySet.title }}</div>
                      <q-space />
                      <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <q-card-section style="display: flex; justify-content: space-between">
                      <div>
                        <q-select
                          outlined
                          dense
                          v-model="roomBoy"
                          :options="optionRoomBoy"
                          label="User"
                        />
                        <div style="display: flex">
                          <q-img
                            :src="imgRoomBoy"
                            style="width: 150px"
                            class="q-mt-sm"
                            v-if="imgRoomBoy"
                          />
                          <div
                            v-else
                            class="justify-center items-center q-mt-md"
                            style="display: flex"
                          >
                            <q-icon
                              name="o_person"
                              size="100px"
                              style="border: 1px solid black"
                              class="q-pa-md"
                            />
                          </div>
                          <div class="q-mt-sm q-ml-md col-grow q-mr-xl">
                            <div class="q-mt-sm">
                              <q-input
                                dense
                                outlined
                                v-model="nameRoomBoy"
                                label="Name"
                                disable
                                class="col-grow text-bold"
                              />
                              <q-input
                                dense
                                outlined
                                v-model="emailRoomBoy"
                                label="Email"
                                disable
                                class="q-mt-sm col-grow text-bold"
                              />
                              <q-input
                                dense
                                outlined
                                v-model="roleRoomBoy"
                                label="Role"
                                disable
                                class="q-mt-sm col-grow text-bold"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                        "
                      >
                        <div>
                          <q-select
                            outlined
                            dense
                            v-model="workShift"
                            :options="optionShift"
                            label="Shift"
                            class="col-grow"
                          />
                          <q-input
                            dense
                            outlined
                            v-model="alias"
                            label="Aliases"
                            class="q-mt-sm col-grow text-bold"
                          />
                          <q-select
                            outlined
                            dense
                            v-model="department"
                            :options="optionDepartment"
                            label="Deparment"
                            class="q-mt-sm col-grow"
                          />
                        </div>
                        <q-btn
                          class="text-capitalize"
                          color="primary"
                          @click="sendRoomBoyRequest"
                          >{{ editRoomBoySet.button }}</q-btn
                        >
                      </div>
                    </q-card-section>
                  </q-card>
                </q-dialog>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
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
              :rows-per-page-options="[0]"
              hide-bottom
              :dense="$q.screen.lt.md"
              v-if="showTable"
            >
              <!-- <template v-slot:top-right>
                <q-btn
                  flat
                  size="13px"
                  style="background-color: #008444; color: white"
                  @click="newUserDialog"
                >
                  +
                </q-btn>
              </template> -->
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
                  <q-td key="Role" :props="props">
                    {{ props.row.role }}
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
                      @click="editUser(props.row)"
                    >
                      <svg
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
                      @click="handleConfirm('user', props.row.id, props.row.name)"
                    >
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
                  </q-td>
                </q-tr>
              </template>
            </q-table>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog v-model="confirmDelete">
      <q-card style="width: 300px; justify-content: center">
        <div class="q-pa-sm col" style="display: block; width: 100%; gap: 5px">
          <div style="width: 100%; text-align: center">
            Do you want to delete {{ deleteData.name }}?
          </div>
          <div class="q-pa-sm col" style="display: flex; width: 100%; gap: 5px">
            <q-btn
              dense
              noCaps
              color="primary"
              v-close-popup
              @click="clearFieldRole"
              label="Close"
              class="q-px-md"
              style="border-radius: 10px; width: 100%"
            />
            <q-btn
              dense
              noCaps
              color="red"
              @click="sendDeletionRequest"
              label="Delete"
              class="q-px-md"
              style="border-radius: 10px; width: 100%"
            />
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import HKCard from 'src/components/HK/Card/HKCard.vue'

export default defineComponent({
  name: 'SuperAdminAccess',
  components: { HKCard },

  setup() {
    return {
      user: ref(),
      optionUser: ref(),
      imgURL: ref(),
      img: ref(null),
      stateEdit: ref(false),
      columnsListRole: [
        { name: 'Nama', label: 'Name', align: 'left', field: 'nama' },
        { name: 'Reader Super Admin', label: 'Reader', align: 'center', field: 'readerSuperAdmin' },
        { name: 'Editor Super Admin', label: 'Editor', align: 'center', field: 'editorSuperAdmin' },
        { name: 'Reader Admin', label: 'Reader', align: 'center', field: 'readerAdmin' },
        { name: 'Editor Admin', label: 'Editor', align: 'center', field: 'editorAdmin' },
        { name: 'Reader Room Boy', label: 'Reader', align: 'center', field: 'readerRoomboy' },
        { name: 'Editor Room Boy', label: 'Editor', align: 'center', field: 'editorRoomboy' },
        { name: 'Reader Supervisor', label: 'Reader', align: 'center', field: 'readerSupervisor' },
        { name: 'Editor Supervisor', label: 'Editor', align: 'center', field: 'editorSupervisor' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      columnsListUser: [
        { name: 'Name', label: 'Name', align: 'left', field: 'name' },
        { name: 'Email', label: 'Email', align: 'left', field: 'email' },
        { name: 'Role', label: 'Role', align: 'left', field: 'role' },
        { name: 'Room Boy', label: 'Room Boy', align: 'center', field: 'roomBoy' },
        { name: 'Action', label: 'Action', align: 'center', field: '' }
      ],
      roleName: ref(),
      nameRole: ref(0),
      path: ref(),
      rowsListRole: ref(),
      rowsListUser: ref(),
      newRole: ref(false),
      newUser: ref(false),
      newRoomBoy: ref(false),
      dialogListUser: ref(false),
      checkboxReaderSuperAdmin: ref(false),
      checkboxEditorSuperAdmin: ref(false),
      checkboxReaderAdmin: ref(false),
      checkboxEditorAdmin: ref(false),
      checkboxReaderRoomboy: ref(false),
      checkboxEditorRoomboy: ref(false),
      checkboxReaderSupervisor: ref(false),
      checkboxEditorSupervisor: ref(false),
      checkboxReaderSuperAdminUser: ref(false),
      checkboxEditorSuperAdminUser: ref(false),
      checkboxReaderAdminUser: ref(false),
      checkboxEditorAdminUser: ref(false),
      checkboxReaderRoomboyUser: ref(false),
      checkboxEditorRoomboyUser: ref(false),
      checkboxReaderSupervisorUser: ref(false),
      checkboxEditorSupervisorUser: ref(false),
      name: ref(''),
      email: ref(),
      numberPhone: ref(),
      nik: ref(),
      gender: ref(),
      optionsGender: ['MALE', 'FEMALE'],
      username: ref(''),
      password: ref(''),
      isPwd: ref(true),
      confirmPassword: ref(''),
      isConfirmPwd: ref(true),
      submitRole: ref(),
      titleCardRole: ref(),
      roleIdUser: ref(),
      date: ref(),
      input: ref(),
      addUser: ref(),
      roomBoy: ref(),
      optionRoomBoy: ref(),
      roleIdRoomBoy: ref(1),
      nameRoomBoy: ref(),
      emailRoomBoy: ref(),
      roleRoomBoy: ref(),
      imgRoomBoy: ref(null),
      workShift: ref(),
      optionShift: ref(),
      alias: ref(),
      department: ref(),
      optionDepartment: ref(),
      addRoomboy: ref(),
      isEditingUser: ref(),
      editUserSet: ref({ title: undefined, button: undefined }),
      isEditingRoomBoy: ref(),
      editRoomBoySet: ref({ title: undefined, button: undefined }),
      titleRoomBoy: ref(),
      showTable: ref(true),
      prevUser: ref([]),
      cacheData: ref([]),
      confirmDelete: ref(false),
      deleteData: ref({ ident: undefined, id: undefined, name: undefined })
    }
  },
  data() {
    return {
      api: new this.$Api('superadmin')
    }
  },
  mounted() {
    this.fetchData()
  },
  watch: {
    user: {
      handler(newValue) {
        this.roleIdUser = newValue.value
        this.putDataUser()
      }
    },
    roomBoy: {
      handler(newValue) {
        console.log(this.shift)
        // SET DROPDOWN VALUE
        this.workShift = newValue.shiftId
        this.alias = newValue.aliases
        this.department = newValue.departmentId

        this.roleIdRoomBoy = newValue.value
        this.nameRoomBoy = newValue.label
        this.emailRoomBoy = newValue.email
        this.roleRoomBoy = newValue.role
        this.imgRoomBoy = newValue.picture
      }
    },
    workShift: {
      handler(newValue) {
        console.log(newValue)
        if (!newValue?.label) this.workShift = this.optionShift[newValue - 1]
      }
    },
    department: {
      handler(data) {
        console.log(data)
        if (!data?.label) this.department = this.optionDepartment[data - 1]
      }
    },
    isEditingRoomBoy: {
      handler(value) {
        console.log(value)
        if (value) {
          this.editRoomBoySet = { title: 'Edit Room Maid', button: `Edit Room Maid` }
        } else this.editRoomBoySet = { title: 'Add New Room Maid', button: `Assign as Maid` }
      }
    },
    isEditingUser: {
      handler(value) {
        if (value) {
          this.editRoomBoySet = { title: 'Edit User', button: `Edit User` }
        } else this.editRoomBoySet = { title: 'Add New User', button: `Add User` }
      }
    }
  },
  methods: {
    // HELPER AND HANDDLER
    handleUpload() {
      if (this.img) {
        this.imgURL = URL.createObjectURL(this.img)
        console.log(this.img)
      }
    },
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
    handleConfirm(ident, id, name) {
      this.deleteData = { ident, id, name }
      this.confirmDelete = true
    },
    sendDeletionRequest() {
      try {
        this.api.delete(
          `access/${this.deleteData.ident}/${this.deleteData.id}`,
          ({ message, status }) => {
            if (status != 200) return this.trigger('negative', message)
            this.trigger('positive', message)
            this.fetchData()
            this.confirmDelete = false
          }
        )
      } catch (err) {
        console.log(err.message)
      }
    },
    clearFieldRole() {
      this.roleName = ''
      this.path = ''
      this.checkboxReaderSuperAdmin = false
      this.checkboxEditorSuperAdmin = false
      this.checkboxReaderAdmin = false
      this.checkboxEditorAdmin = false
      this.checkboxReaderRoomboy = false
      this.checkboxEditorRoomboy = false
      this.checkboxReaderSupervisor = false
      this.checkboxEditorSupervisor = false
      this.titleCardRole = ''
      this.submitRole = ''
      this.img = null
      this.imgURL = null
      this.name = null
      this.email = null
      this.numberPhone = null
      this.input = null
      this.nik = null
      this.gender = null
      this.username = null
    },

    // MAIN PAGE
    fetchData() {
      this.loading = true

      let url = `access?roleId=${this.nameRole}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { listRole, listUser } = data

          this.rowsListRole = listRole.map((lr) => ({
            id: lr.id,
            nama: lr.name,
            readerSuperAdmin: lr.superAdmin.reader,
            editorSuperAdmin: lr.superAdmin.editor,
            readerAdmin: lr.admin.reader,
            editorAdmin: lr.admin.editor,
            readerRoomboy: lr.roomBoy.reader,
            editorRoomboy: lr.roomBoy.editor,
            readerSupervisor: lr.supervisor.reader,
            editorSupervisor: lr.supervisor.editor
          }))

          if (listUser.length > 0) {
            this.rowsListUser = listUser.map((lu) => ({
              id: lu.id,
              name: lu.name,
              email: lu.email,
              role: lu.role,
              roomBoy: lu.isRoomBoy
            }))
          } else {
            this.trigger('negative', 'No User Assign To This Role')
          }
        }
        // else {
        //   this.trigger('negative', message)
        //   this.showTable = false
        // }
        console.log(this.rowsListRole)
      })
    },
    showListUser(row) {
      this.nameRole = row.id
      this.loading = true

      let url = `access?roleId=${this.nameRole}`

      this.api.get(url, ({ status, data }) => {
        this.loading = false

        if (status == 200) {
          const { listRole, listUser } = data

          this.rowsListRole = listRole.map((lr) => ({
            id: lr.id,
            nama: lr.name,
            readerSuperAdmin: lr.superAdmin.reader,
            editorSuperAdmin: lr.superAdmin.editor,
            readerAdmin: lr.admin.reader,
            editorAdmin: lr.admin.editor,
            readerRoomboy: lr.roomBoy.reader,
            editorRoomboy: lr.roomBoy.editor,
            readerSupervisor: lr.supervisor.reader,
            editorSupervisor: lr.supervisor.editor
          }))

          if (listUser.length > 0) {
            this.rowsListUser = listUser.map((lu) => ({
              id: lu.id,
              name: lu.name,
              email: lu.email,
              role: lu.role,
              roomBoy: lu.isRoomBoy
            }))
            this.dialogListUser = true
          } else {
            this.trigger('negative', 'No User Assign To This Role')
            this.dialogListUser = false
          }
        }
      })
    },

    // ADD OR EDIT ROLE
    saveRole() {
      if (this.submitRole == 'Edit Role') {
        this.updateRole()
      } else {
        this.postRole()
      }
    },
    postRole() {
      const data = {
        name: this.roleName,
        path: this.path,
        access: {
          showSuperAdmin: this.checkboxReaderSuperAdmin,
          createSuperAdmin: this.chekckboxEditorSuperAdmin,
          showAdmin: this.checkboxReaderAdmin,
          createAdmin: this.checkboxEditorAdmin,
          showMaid: this.checkboxReaderRoomboy,
          createMaid: this.checkboxEditorRoomboy,
          showSupervisor: this.checkboxReaderSupervisor,
          createSupervisor: this.checkboxEditorSupervisor
        }
      }
      let url = `access/role`
      this.api.post(url, data, ({ status, message }) => {
        if (status == 200) {
          this.fetchData()
          this.clearFieldRole()
          this.trigger('possitive', message)
        }
      })
    },
    addNewRole() {
      this.newRole = true
      this.clearFieldRole()
    },
    updateRole() {
      const data = {
        name: this.roleName,
        path: this.path,
        access: {
          showSuperAdmin: this.checkboxReaderSuperAdmin,
          createSuperAdmin: this.chekckboxEditorSuperAdmin,
          showAdmin: this.checkboxReaderAdmin,
          createAdmin: this.checkboxEditorAdmin,
          showMaid: this.checkboxReaderRoomboy,
          createMaid: this.checkboxEditorRoomboy,
          showSupervisor: this.checkboxReaderSupervisor,
          createSupervisor: this.checkboxEditorSupervisor
        }
      }

      let url = `access/role/${this.roleId}`
      this.api.put(url, data, ({ status, message }) => {
        if (status == 200) {
          this.trigger('possitive', message)
          this.clearFieldRole()
          this.fetchData()
        }
      })
    },
    editRole(row) {
      const roleId = row.id
      console.log(roleId)
      this.titleCardRole = 'Edit Role'
      this.submitRole = 'Edit Role'
      this.newRole = true

      let url = `access/helper/role/${roleId}`

      this.api.get(url, ({ status, data, message }) => {
        if (status == 200) {
          this.roleName = data.name
          this.path = data.defaultPath
          this.checkboxReaderSuperAdmin = data.access.showSuperAdmin
          this.checkboxEditorSuperAdmin = data.access.createSuperAdmin
          this.checkboxReaderAdmin = data.access.showAdmin
          this.checkboxEditorAdmin = data.access.createAdmin
          this.checkboxReaderRoomboy = data.access.showMaid
          this.checkboxEditorRoomboy = data.access.createMaid
          this.checkboxReaderSupervisor = data.access.showSupervisor
          this.checkboxEditorSupervisor = data.access.createSupervisor
          this.roleId = roleId
          this.putIdRole(this.roleId)
          this.trigger('possitive', message)
        }
      })
    },

    // ADD OR EDIT USER
    putDataUser() {
      let url = `access/helper/user/0/add/${this.roleIdUser || this.nameRole}`

      this.api.get(url, ({ status, data }) => {
        if (status == 200) {
          const { listRoles, shownRoles } = data

          this.optionUser = listRoles.map((lrs) => ({
            label: lrs.name,
            value: lrs.id
          }))

          if (!this.user) this.user = { label: shownRoles.name, value: shownRoles.id }
          this.checkboxReaderSuperAdminUser = shownRoles.access.showSuperAdmin
          this.checkboxEditorSuperAdminUser = shownRoles.access.createSuperAdmin
          this.checkboxReaderAdminUser = shownRoles.access.showAdmin
          this.checkboxEditorAdminUser = shownRoles.access.createAdmin
          this.checkboxReaderRoomboyUser = shownRoles.access.showMaid
          this.checkboxEditorRoomboyUser = shownRoles.access.createMaid
          this.checkboxReaderSupervisorUser = shownRoles.access.showSupervisor
          this.checkboxEditorSupervisorUser = shownRoles.access.createSupervisor
        }
      })
    },
    saveUser() {
      if (this.isEditingUser) {
        this.stateEdit = true
        this.updateUser()
      } else {
        this.postNewUser()
      }
    },
    postNewUser() {
      const data = {
        picture: this.img,
        name: this.name,
        email: this.email,
        phone: this.numberPhone,
        birthday: new Date(this.input),
        nik: this.nik,
        gender: this.gender,
        username: this.username,
        password: this.password,
        roleId: parseInt(this.roleIdUser)
      }
      if (this.password != this.confirmPassword)
        return this.trigger('warning', 'Password didnt match')
      let url = `access/user/add`
      this.api.useMultipart(true).post(url, data, ({ status, message }) => {
        if (status == 200) {
          this.newUser = false
          this.trigger('positive', message)
          this.clearFieldRole()
          this.fetchData()
        } else this.trigger('negative', message)
      })
    },
    updateUser() {
      let DataToUpdate = {}
      this.name != this.prevUser.name ? (DataToUpdate['name'] = this.name) : ''
      this.email != this.prevUser.email ? (DataToUpdate['email'] = this.email) : ''
      this.numberPhone != this.prevUser.phone ? (DataToUpdate['phone'] = this.numberPhone) : ''
      new Date(this.input).toISOString() != this.prevUser.birthday
        ? (DataToUpdate['birthday'] = new Date(this.input).toISOString())
        : ''
      this.nik != this.prevUser.nik ? (DataToUpdate['nik'] = this.nik) : ''
      this.gender != this.prevUser.gender ? (DataToUpdate['gender'] = this.gender) : ''
      this.username != this.prevUser.username ? (DataToUpdate['username'] = this.username) : ''
      this.user.value != this.prevUser.roleIdUserEdit
        ? (DataToUpdate['roleId'] = this.user.value)
        : ''
      this.img ? (DataToUpdate['picture'] = this.img) : ''

      let url = `access/user/edit/${this.userId}`
      this.api.useMultipart(true).post(url, DataToUpdate, ({ status, message }) => {
        if (status == 200) {
          this.newUser = false
          this.trigger('positive', message)
          this.clearFieldRole()
          this.fetchData()
        }
      })
    },

    newUserDialog() {
      this.newUser = true
      this.isEditingUser = false
      this.putDataUser()
    },

    editUser(row) {
      this.newUser = true
      this.isEditingUser = true
      const userId = row.id

      let url = `access/helper/user/${userId}/edit/0`
      this.api.get(url, ({ status, data, message }) => {
        if (status == 200) {
          const { shownUser, shownRoles, listRoles } = data

          this.optionUser = listRoles.map((lrs) => ({
            label: lrs.name,
            value: lrs.id
          }))
          this.setPrev(shownUser)

          this.imgURL = shownUser.picture
          this.name = shownUser.name
          this.email = shownUser.email
          this.numberPhone = shownUser.phone
          this.input = shownUser.birthday.split('T')[0]
          this.nik = shownUser.nik
          this.gender = shownUser.gender
          this.username = shownUser.username

          this.checkboxReaderSuperAdminUser = shownRoles.access.showSuperAdmin
          this.checkboxEditorSuperAdminUser = shownRoles.access.createSuperAdmin
          this.checkboxReaderAdminUser = shownRoles.access.showAdmin
          this.checkboxEditorAdminUser = shownRoles.access.createAdmin
          this.checkboxReaderRoomboyUser = shownRoles.access.showMaid
          this.checkboxEditorRoomboyUser = shownRoles.access.createMaid
          this.checkboxReaderSupervisorUser = shownRoles.access.showSupervisor
          this.checkboxEditorSupervisorUser = shownRoles.access.createSupervisor
          this.user = shownRoles.name
          this.roleIdUser = shownUser.role.id
          this.userId = userId
          this.putIdUser(this.userId, this.roleIdUser)
          console.log(this.roleIdUser)
        }
      })
    },

    // ADD OR EDIT ROOM BOY
    saveRoomBoy() {
      if (this.isEditingRoomBoy) {
        this.updateRoomBoy()
      } else {
        this.postRoomBoy()
      }
    },
    putIdRole(id) {
      this.roleId = id
    },
    putIdUser(id, idUser) {
      this.userId = id
      this.roleIdUserEdit = idUser
    },
    setPrev(data) {
      this.prevUser = data
    },
    sendRoomBoyRequest() {
      const data = {
        userId: this.roomBoy.value,
        shift: this.workShift.value,
        departmentId: this.department.value,
        aliases: this.alias
      }
      if (this.isEditingRoomBoy) {
        delete data.userId
        this.api.put(`access/rb/${this.roomBoy.value}`, data, ({ status, message }) => {
          if (status != 200) return this.trigger('negative', message)
          this.newRoomBoy = false
          this.trigger('positive', message)
          this.fetchData()
        })
      } else {
        this.api.post('access/rb', data, ({ status, message }) => {
          if (status != 200) return this.trigger('negative', message)
          this.newRoomBoy = false
          this.trigger('positive', message)
          this.fetchData()
        })
      }
    },
    newRoomBoyDialog() {
      console.log('etagdhsag')
      this.newRoomBoy = true
      this.isEditingRoomBoy = false
      this.setDataRoomBoy()
    },
    editRoomboy() {
      this.newRoomBoy = true
      this.isEditingRoomBoy = true
      this.setDataRoomBoy('edit')
    },
    setDataRoomBoy(act) {
      if (act != 'edit') act = 'add'
      let url = `access/helper/room-boy/0/${act}`

      this.api.get(url, ({ status, data }) => {
        if (status == 200) {
          const { listUser, listShift, listDepartment, listMaid } = data
          if (listMaid) {
            this.optionRoomBoy = listMaid.map((maid) => ({
              label: `${maid.user.name} | ${maid.aliases}`,
              value: maid.id,
              email: maid.user.email,
              picture: maid.user.picture,
              role: maid.user.role.name,
              aliases: maid.aliases,
              departmentId: maid.departmentId,
              shiftId: maid.shiftId
            }))
          } else {
            this.optionRoomBoy = listUser.map((lu) => ({
              label: lu.name,
              value: lu.id,
              email: lu.email,
              role: lu.role.name,
              picture: lu.picture
            }))
          }

          this.optionShift = listShift.map((ls) => ({
            label: ls.label,
            value: ls.id
          }))

          this.optionDepartment = listDepartment.map((ld) => ({
            label: ld.longDesc,
            value: ld.id
          }))

          //Set Default
          this.roomBoy = this.optionRoomBoy[0]
        }
      })
    }
  }
})
</script>

<style></style>
