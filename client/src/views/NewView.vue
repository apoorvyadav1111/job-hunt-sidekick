<template>
    <v-card outlined class="ma-2 pa-6">
        <v-card-text class="text-overline text-center">
            <div style="font-size: large;">
                Add a new job application
            </div>
        </v-card-text>
        <form>
            <v-alert
            v-if="message">
            {{ alert }}
            </v-alert>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="company"
                        :items="companyItems"
                        label="Company Name"
                        required
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="postingId"
                        label="Job ID"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="jobUrl"
                    label="Job Posting Url"
                    required
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="dashboardUrl"
                        label="Dashboard URL"
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
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="referral"
                        label="Referral"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>


            <v-text-field
                v-model="recruiter"
                label="Recuiter Details"
            ></v-text-field>
            <v-textarea
                outlined
                auto-grow
                rows="1"
                v-model="note"
                name="Note"
                label="Additional Note"
            ></v-textarea>
            <v-btn
                class="mr-4"
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
import { JobApplicationInfo, Status, StatusLog, Task } from "@/interfaces/jobapplication";
import { JobApplicationService } from '@/services/jobapplication_service';
import { DDLService } from '@/services/ddl';

export default Vue.extend({
    name:'NewView',
    components:{},
    data(){
        let company = "TCS";
        let stack = "SDE";
        let postingId = "R1234";
        let jobUrl = "google.com";
        let dashboardUrl = "google.com";
        let referral = "";
        let note = "";
        let recruiter = "";
        let companyItems:string[] = [];
        let stackItems:string[] = [];
        let message = false;
        let alert = "";
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
            alert
        }
    },
    async created(){
        const ddlServ = new DDLService();
        this.companyItems = await ddlServ.getCompanyDDL();
        this.stackItems = await ddlServ.getStackDDL();
    },
    methods:{
        submit(){
            const st:StatusLog = {
                status:'APPLIED',
                review:'Applied job on the website',
                updated: new Date()
            }
            let app:JobApplicationInfo = {
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
            this.createNewJobAppplication(app);
        },
        clear(){
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
            this.message = true;
            this.alert = resp;
            
        }

    }
})
</script>