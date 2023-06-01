<template>
    <v-container>
        <v-overlay v-if="overlay">
            <v-progress-circular
                indeterminate
                size="200"
            ></v-progress-circular>
        </v-overlay>
        <v-text-field
            v-model="search"
            label="Search Application"
            color="orange"
            filled
            dense
            clearable
        >
        </v-text-field>
        <v-data-table
            :items="data"
            :headers="headers"
            item-key="_id"
            :search="search"
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus'
            }"
            :expanded.sync="expanded"
            :single-expand="singleExpand"
            show-expand
        > 
            <template v-slot:[`item.starred`]="{item}">
                <v-container @click="starApplication(item)">
                    <v-icon color="orange" v-if="item.starred">
                    mdi mdi-star
                    </v-icon>
                    <v-icon v-if="!item.starred">
                        mdi mdi-star-outline
                    </v-icon>
                </v-container>
                
            </template>
          <template v-slot:[`item.status`]="{item}">
            <StatusComponenet @showStatusHistory="showStatusTimeLine" :statusHistory="item.status"/>
            <v-dialog 
                v-model="statusDialog"
                max-width="500px"
            >
                <StatusTimeline :items="statusTimelineItem"/>
            </v-dialog>
          </template>
          <template v-slot:[`item.pending`]="{item}">
            <v-container v-if="item.pending.length==0" @click="pendingDialog=!pendingDialog">
                <!-- {{ item.pending[-1].status }} -->
                NONE
                <v-dialog 
                    v-model="pendingDialog"
                    max-width="500px"
                >
                    <PendingTimeline :items="item.pending"/>
                </v-dialog>
            </v-container>
          </template>
          <template v-slot:[`item.appliedDate`]="{item}">
            {{  new Date(item.appliedDate).toDateString()}}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-dialog
                v-model="editDialog"
                :retain-focus="false"
                max-width="500px"
                >
            <v-card>
              <v-card-title>
                <span class="orange--text text-overline">Edit Application</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                        <v-combobox
                            v-model="editedItem.company"
                            :items="companyItems"
                            label="Company Name"
                            required
                        ></v-combobox>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.postingId"
                            label="Job ID"
                            required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="editedItem.postingUrl"
                        label="Job Posting Url"
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.dashboardUrl"
                            label="Dashboard URL"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-combobox
                            v-model="editedItem.stack"
                            :items="stackItems"
                            label="Stack"
                            required
                        ></v-combobox>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.referral"
                            label="Referral"
                            required
                        ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-icon color="orange" v-if="!addStatusForm" @click="addStatusForm = true">mdi-plus</v-icon>Add New Status
                    <v-container class="pt-2" v-if="addStatusForm">
                        <v-row>
                            <v-col>
                            <v-select
                                v-model="newStatus"
                                :items="statusItems"
                                label="Status"
                                required
                            ></v-select>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-text-field
                                v-model="newReview"
                                label="Review"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-dialog
                                    :retain-focus="false"
                                    ref="dialog"
                                    v-model="modal"
                                    :return-value.sync="newStatusDate"
                                    persistent
                                    width="290px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="newStatusDate"
                                    label="Status Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    color="orange"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="newStatusDate"
                                color="orange"
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    @click="modal = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="orange"
                                    @click="$refs.dialog.save(newStatusDate)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        </v-row>
                        <v-icon color="red" v-if="addStatusForm" @click="addStatusForm = false">mdi-close</v-icon>
                    </v-container>
                    <br/>
                    <v-icon color="orange" v-if="!addPendingForm" @click="addPendingForm = true">mdi-plus</v-icon>Add New Pending
                    <v-container class="pt-2" v-if="addPendingForm">
                        <v-row>
                            <v-col>
                            <v-select
                                v-model="newTaskStatus"
                                :items="pendingStatusItems"
                                label="Status"
                                required
                            ></v-select>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-text-field
                                v-model="newTaskDetail"
                                label="Review"
                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-dialog
                                    :retain-focus="false"
                                    ref="dialogTask"
                                    v-model="modal"
                                    :return-value.sync="newTaskDate"
                                    persistent
                                    width="290px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="newTaskDate"
                                    label="Pending Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    color="orange"
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                v-model="newTaskDate"
                                color="orange"
                                scrollable
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    @click="modal = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="orange"
                                    @click="$refs.dialogTask.save(newTaskDate)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-dialog>
                        </v-col>
                        </v-row>
                        <v-icon color="red" v-if="addPendingForm" @click="addPendingForm = false">mdi-close</v-icon>
                    </v-container>
                    <v-text-field
                        v-model="editedItem.recruiter"
                        label="Recuiter Details"
                    ></v-text-field>
                    <v-textarea
                        outlined
                        auto-grow
                        rows="1"
                        v-model="editedItem.note"
                        name="Note"
                        label="Additional Note"
                    ></v-textarea>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="orange"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="deleteDialog" :retain-focus="false" max-width="500px">
            <v-card>
              <v-card-text class="text-overline">Are you sure you want to delete this application?</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="orange" @click="close">Cancel</v-btn>
                <v-btn text @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
            <v-icon
                small
                color="orange"
                class="mr-2"
                @click="editItem(item)"
            >
                mdi-pencil
            </v-icon>
            <v-icon
                small
                color="orange"
                @click="deleteItem(item)"
            >
                mdi-delete
            </v-icon>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-card-text class="overline">Recruiter: </v-card-text>
                    {{ item.recruiter }}
                    <br />
                    <v-card-text class="overline">Referral: </v-card-text>
                    {{ item.referral }}
                    <br />
                    <v-card-text class="overline">Additional Notes: </v-card-text>
                    {{ item.note }}
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { JobApplicationService } from '@/services/jobapplication_service';
import { DDLService } from '@/services/ddl';
import { JobApplication, JobApplicationPatch, Status, StatusHistory, TaskStatus } from '@/interfaces/jobapplication';
import StatusComponenet from '@/components/Status.vue';
import StatusTimeline from '@/components/StatusTimeline.vue';
import PendingTimeline from '@/components/PendingTimeline.vue';
export default Vue.extend({
    name:'ApplicationsView',
    components:{
        StatusComponenet,
        StatusTimeline,
        PendingTimeline
    },
    data(){
        let statusItems: Status[] =[];
        let pendingStatusItems: TaskStatus[] = [];
        let statusTimelineItem:StatusHistory = [];
        let editedItem: JobApplication = {} as JobApplication;
        let newStatus: Status = 'APPLIED';
        let newReview = "";
        let newStatusDate:string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        let newTaskStatus: TaskStatus = 'RECEIVED';
        let newTaskDetail = "";
        let newTaskDate:string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

        return {
            search:"",
            data:[],
            singleExpand:true,
            headers:[
                {text:'Starred', value:'starred'},
                {text:'Company', value:'company'},
                {text:'Posting ID', value:'postingId'},
                {text:'Stack', value:'stack'},
                {text:'Posting Url', value:'postingUrl'},
                {text:'Dashboard Url', value:'dashboardUrl'},
                {text:'Pending', value:'pending'},
                {text:'Status', value:'status'},
                // {text:'Recruiter', value:'recruiter'},
                // {text:'Referral', value:'referral'},
                // {text:'Note', value:'note'},
                {text:'Applied', value:'appliedDate'},
                { text: 'Actions', value: 'actions', sortable: false },
                { text: '', value: 'data-table-expand' },
            ],
            stackItems:[],
            statusItems,
            pendingStatusItems,
            expanded:[],
            companyItems:[],
            editDialog:false,
            statusDialog:false,
            pendingDialog:false,
            deleteDialog:false,
            statusTimelineItem,
            editedItem,
            overlay:false,
            addStatusForm:false,
            newStatus,
            newReview,
            newStatusDate,
            modal:false,
            addPendingForm:false,
            newTaskStatus,
            newTaskDetail,
            newTaskDate
            
        }
    },
    async created(){
        this.getAllData();
        const serv = new DDLService();
        this.statusItems = serv.getStatusDDL();
        this.stackItems = await serv.getStackDDL();
        this.companyItems = await serv.getCompanyDDL();
        this.pendingStatusItems = serv.getPendingStatusDDL();
    },
    methods:{
        async getAllData(){
            this.data = await new JobApplicationService().getApplication();
        },
        hideAllDialogs(){
            this.editDialog = false;
            this.deleteDialog = false;
            this.statusDialog = false;
            this.pendingDialog = false;
            this.resetStatusForm();
        },
        showStatusTimeLine(items:StatusHistory){
            this.hideAllDialogs();
            this.statusDialog = true;
            this.statusTimelineItem = items;

        },
        editItem(item:JobApplication){
            this.hideAllDialogs();
            this.editedItem = item;
            this.editDialog = true;
        },
        deleteItem(item:JobApplication){
            this.hideAllDialogs();
            this.editedItem = item;
            this.deleteDialog = true;
        },
        async starApplication(item:JobApplication){
            const patch:JobApplicationPatch = {
                "starred": !item.starred
            }
            const resp:JobApplication = await new JobApplicationService().putApplication(item._id, patch);
            item.starred = resp.starred;
        },
        close(){
            this.hideAllDialogs();
        },
        resetStatusForm(){
            this.newStatus = 'APPLIED';
            this.newReview = "";
            this.newStatusDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        },
        async save(){
            this.overlay = true;
            if(this.addStatusForm===true){
                this.editedItem.status.push({status:this.newStatus, review:this.newReview, updated:new Date(this.newStatusDate)});
            }
            const patch:JobApplicationPatch = this.editedItem;
            const resp:JobApplication = await new JobApplicationService().putApplication(this.editedItem._id, patch);
            this.editedItem = resp;
            this.overlay = false;
            this.hideAllDialogs();
        },
        async deleteItemConfirm(){
            this.hideAllDialogs();
            await new JobApplicationService().deleteApplication(this.editedItem._id);
            this.getAllData();
        }
    }
})
</script>