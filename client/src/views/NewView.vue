<template>
    <v-card outlined class="ma-2 pa-6">
        <v-card-text  class="text-overline text-center">
            <div  class="orange--text" style="font-size: large;">
                Add a new job application
            </div>
        </v-card-text>
        <form>
            <v-dialog
            v-model="message"
            max-width="500px">
            <v-alert type="success" color="orange">{{ alert }}</v-alert>
            </v-dialog>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="company"
                        :items="companyItems"
                        label="Company Name"
                        required
                        color="orange"
                        item-color="orange"
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="postingId"
                        label="Job ID"
                        required
                        color="orange"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="jobUrl"
                    label="Job Posting Url"
                    required
                    color="orange"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="dashboardUrl"
                        label="Dashboard URL"
                        color="orange"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="stack"
                        :items="stackItems"
                        label="Stack"
                        required
                        color="orange"
                        item-color="orange"

                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="referral"
                        label="Referral"
                        required
                        color="orange"
                    ></v-text-field>
                </v-col>
            </v-row>


            <v-text-field
                v-model="recruiter"
                label="Recuiter Details"
                color="orange"
            ></v-text-field>
            <v-row>
                <v-col cols="3">
                    <v-checkbox
                    v-model="starred"
                    label="Mark as Starred"
                    color="orange"
                    hide-details
                    ></v-checkbox>
                </v-col>
                <v-col>
                    <v-textarea
                        outlined
                        auto-grow
                        rows="1"
                        v-model="note"
                        name="Note"
                        label="Additional Note"
                        color="orange"
                    ></v-textarea>

                </v-col>
            </v-row>


            <v-btn
                class="mr-4"
                color="orange"
                text
                @click="submit"
                >
                submit
            </v-btn>
            <v-btn @click="clear">
            clear
            </v-btn>
    </form>
    </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { JobApplicationInfo, StatusLog } from "@/interfaces/jobapplication";
import { JobApplicationService } from '@/services/jobapplication_service';
import { DDLService } from '@/services/ddl';

export default Vue.extend({
    name:'NewView',
    components:{},
    data(){
        let company = "";
        let stack = "";
        let postingId = "";
        let jobUrl = "";
        let dashboardUrl = "";
        let referral = "";
        let note = "";
        let recruiter = "";
        let companyItems:string[] = [];
        let stackItems:string[] = [];
        let message = false;
        let alert = "";
        let starred = false;
        return {
            company,
            stack,
            postingId,
            jobUrl,
            dashboardUrl,
            referral,
            note,
            recruiter,
            companyItems,
            stackItems,
            message,
            alert,
            starred
        }
    },
    async created(){
        await this.getDDLs();
    },
    methods:{
        async getDDLs(){
            const ddlServ = new DDLService();
            this.companyItems = await ddlServ.getCompanyDDL();
            this.stackItems = await ddlServ.getStackDDL();
        },
        async submit(){
            const st:StatusLog = {
                status:'APPLIED',
                review:'Applied job on the website',
                updated: new Date()
            }
            let app:JobApplicationInfo = {
                starred:this.starred,
                company: this.company,
                stack:this.stack,
                postingId:this.postingId,
                referral: this.referral,
                note: this.note,
                recruiter:this.recruiter,
                status:[st],
                pending: [],
            }

            try{
                app.postingUrl = new URL(this.jobUrl)
            }catch{
                app.postingUrl = this.jobUrl;
            }

            try{
                app.dashboardUrl = new URL(this.dashboardUrl)
            }catch{
                app.dashboardUrl = this.dashboardUrl;
            }
            await this.createNewJobAppplication(app);
            this.clear();
        },
        clear(){
            this.starred = false;
            this.company = "";
            this.stack = "";
            this.postingId = "";
            this.jobUrl = "";
            this.dashboardUrl = "";
            this.referral = "";
            this.note = "";
            this.recruiter = "";
        },
        async createNewJobAppplication(formData:JobApplicationInfo){
            const resp = await new JobApplicationService().postApplication(formData);
            await this.getDDLs();
            this.alert = resp;
            this.message = true;
        }

    }
})
</script>