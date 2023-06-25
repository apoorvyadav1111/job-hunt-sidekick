<template>
    <v-container class='pa-6' fluid>
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
        <v-row>
            <v-col cols="3">
                <v-checkbox
                v-model="showStarred"
                label="Show Only Starred"
                color="orange"
                @change="filterData"
                ></v-checkbox>
            </v-col>
            <v-col cols="3">
                <v-checkbox
                v-model="showPending"
                label="Show Only Pending"
                color="red darken-3"
                 @change="filterData"
                ></v-checkbox>
            </v-col>
            <v-col cols="4">

            </v-col>
            <v-col cols="2">
                <v-btn class="mt-3" color="orange" text large>
                    <v-icon>
                    mdi mdi-database-refresh-outline
                </v-icon>
                Refresh Data
                </v-btn>
            </v-col>
        </v-row>
        <br />
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
            <!-- <template v-slot:[`item.postingUrl`]="{item}">
                <a v-if="item.postingUrl!==''" :href="item.postingUrl" class="orange--text">Posting</a>
            </template> -->
            <template v-slot:[`item.dashboardUrl`]="{item}">
                <a v-if="item.dashboardUrl!==''" :href="item.dashboardUrl" class="orange--text">Dashboard</a>
            </template>
            <template v-slot:[`item.status`]="{item}">
            <StatusComponent @showStatusHistory="showStatusTimeLine" :statusItem="item"/>
            <v-dialog 
                v-model="statusDialog"
                max-width="500px"
                :retain-focus="false"
            >
                <StatusTimeline @refreshData="filterData" :id="statusTimelineItemId" :items="statusTimelineItem"/>
            </v-dialog>
          </template>
          <template v-slot:[`item.pending`]="{item}">
            <v-container v-if="item.pending.length>0">
                <PendingComponent  @showPendingHistory="showPendingTimeLine" :pendingItem="item"/>
                <v-dialog 
                    v-model="pendingDialog"
                    max-width="500px"
                    :retain-focus="false"
                >
                    <PendingTimeline @refreshData2="filterData" :id="pendingTimelineItemId" :items="pendingTimelineItem"/>
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
                            color="orange"
                        item-color="orange"

                        ></v-combobox>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.postingId"
                            label="Job ID"
                            required
                            color="orange"

                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                        v-model="editedItem.postingUrl"
                        label="Job Posting Url"
                        required
                        color="orange"

                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.dashboardUrl"
                            label="Dashboard URL"
                            color="orange"

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
                            color="orange"
                            item-color="orange"
                        ></v-combobox>
                    </v-col>
                    <v-col>
                        <v-text-field
                            v-model="editedItem.referral"
                            label="Referral"
                            color="orange"

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
                            color="orange"
                                item-color="orange"
                            ></v-select>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-text-field
                                v-model="newReview"
                                label="Review"
                            color="orange"

                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card-title class="text-overline">Status Update Date</v-card-title>
                                <v-date-picker
                                v-model="newStatusDate"
                                color="orange"
                                scrollable
                                full-width
                                >
                                </v-date-picker>
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
                                item-color="orange"
                            color="orange"

                            ></v-select>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                            <v-text-field
                                v-model="newTaskDetail"
                                label="Review"
                            color="orange"

                            ></v-text-field>
                        </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-card-title class="text-overline">Due Date</v-card-title>
                                <v-date-picker
                                v-model="newTaskDate"
                                color="orange"
                                scrollable
                                full-width
                                >
                                </v-date-picker>
                            </v-col>
                        </v-row>
                        <v-icon color="red" v-if="addPendingForm" @click="addPendingForm = false">mdi-close</v-icon>
                    </v-container>
                    <v-text-field
                        v-model="editedItem.recruiter"
                        label="Recuiter Details"
                        color="orange"

                    ></v-text-field>
                    <v-textarea
                        outlined
                        auto-grow
                        rows="1"
                        v-model="editedItem.note"
                        name="Note"
                        color="orange"

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
                    <v-card-text class="overline"><a v-if="item.postingUrl!==''" :href="item.postingUrl" class="orange--text">Posting Page</a></v-card-text>
                    <v-card-text class="overline">Recruiter: {{ item.recruiter }}</v-card-text>
                    <v-card-text class="overline">Referral: {{ item.referral }}</v-card-text>
                    <v-card-title class="overline">Additional Notes: </v-card-title>
                    <v-card-text>{{ item.note }}</v-card-text>
                    
                </td>
            </template>
        </v-data-table>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { JobApplicationService } from '@/services/jobapplication_service';
import { DDLService } from '@/services/ddl';
import { JobApplication, JobApplicationPatch, Status, StatusHistory, TaskStatus, Tasks } from '@/interfaces/jobapplication';
import StatusTimeline from '@/components/StatusTimeline.vue';
import StatusComponent from '@/components/Status.vue';
import PendingComponent from '@/components/Pending.vue';

import PendingTimeline from '@/components/PendingTimeline.vue';
export default Vue.extend({
    name:'ApplicationsView',
    components:{
    StatusTimeline,
    StatusComponent,
    PendingTimeline,
    PendingComponent,
},
    data(){
        let statusItems: Status[] =[];
        let pendingStatusItems: TaskStatus[] = [];
        let statusTimelineItem:StatusHistory = [];
        let pendingTimelineItem:Tasks =[];
        let editedItem: JobApplication = {} as JobApplication;
        let newStatus: Status = 'APPLIED';
        let newReview = "";
        let newStatusDate:string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        let newTaskStatus: TaskStatus = 'RECEIVED';
        let newTaskDetail = "";
        let newTaskDate:string = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        let data: JobApplication[] = [] as JobApplication[];
        return {
            search:"",
            data,
            singleExpand:true,
            headers:[
                {text:'Starred', value:'starred', align:'center'},
                {text:'Company', value:'company', align:'center'},
                {text:'Posting ID', value:'postingId', align:'center'},
                {text:'Stack', value:'stack', align:'center'},
                // {text:'Posting Url', value:'postingUrl', align:'center'},
                {text:'Dashboard Url', value:'dashboardUrl', align:'center'},
                {text:'Pending', value:'pending', align:'center'},
                {text:'Status', value:'status', align:'center'},
                // {text:'Recruiter', value:'recruiter'},
                // {text:'Referral', value:'referral'},
                // {text:'Note', value:'note'},
                {text:'Applied', value:'appliedDate', align:'center'},
                { text: 'Actions', value: 'actions', sortable: false , align:'center'},
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
            statusTimelineItemId:"",
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
            newTaskDate,
            pendingTimelineItem,
            pendingTimelineItemId:"",
            showStarred:false,
            showPending:false,
            
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
        async filterData(){
            await this.getAllData();
            if(this.showStarred===true){
                this.data = this.data.filter(e=>e.starred);
            }
            if(this.showPending===true){
                this.data = this.data.filter(e=>{
                    if(e.pending.length>0 && e.pending[e.pending.length-1].status!=='DONE'){
                        return true;
                    }else{
                        return false;
                    }
                })
            }
        },
        hideAllDialogs(){
            this.editDialog = false;
            this.deleteDialog = false;
            this.statusDialog = false;
            this.pendingDialog = false;
            this.resetEditForm();
        },
        showStatusTimeLine(items:StatusHistory, id:string){
            this.hideAllDialogs();
            this.statusDialog = true;
            this.statusTimelineItem = items
            this.statusTimelineItemId =  id;

        },
        showPendingTimeLine(items:Tasks, id:string){
            this.hideAllDialogs();
            this.pendingDialog = true;
            this.pendingTimelineItem = items;
            this.pendingTimelineItemId = id
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
        resetEditForm(){
            this.newStatus = 'APPLIED';
            this.newReview = "";
            this.newStatusDate = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.newTaskStatus= 'RECEIVED';
            this.newTaskDetail = "";
            this.newTaskDate= (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

        },
        async save(){
            this.overlay = true;
            if(this.addStatusForm===true){
                this.editedItem.status.push({status:this.newStatus, review:this.newReview, updated:new Date(this.newStatusDate)});
            }
            if(this.addPendingForm===true){
                this.editedItem.pending.push({task_detail:this.newTaskDetail, status:this.newTaskStatus, due_date:new Date(this.newTaskDate)});
            }
            const patch:JobApplicationPatch = this.editedItem;
            const resp:JobApplication = await new JobApplicationService().putApplication(this.editedItem._id, patch);
            this.editedItem = resp;
            this.getAllData();
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