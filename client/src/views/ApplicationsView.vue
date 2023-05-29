<template>
    <v-container>
        <v-text-field
            v-model="search"
            label="Search Application"
            solo
            clearable
        >
        </v-text-field>
        <v-data-table
            :items="data"
            :headers="headers"
            :search="search"
            class="elevation-1"
            :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus'
            }"
        >
        </v-data-table>
    </v-container>
</template>
<script lang="ts">
import Vue from 'vue';
import { JobApplicationService } from '@/services/jobapplication_service';
import { DDLService } from '@/services/ddl';
import { Status } from '@/interfaces/jobapplication';
export default Vue.extend({
    name:'ApplicationsView',
    data(){
        let statusItems: Status[] =[];
        return {
            search:"",
            data:[],
            headers:[
                {text:'Company', value:'company'},
                {text:'Posting ID', value:'postingId'},
                {text:'Stack', value:'stack'},
                {text:'Pending', value:'pending'},
                {text:'Posting Url', value:'postingUrl'},
                {text:'Dashboard Url', value:'dashboardUrl'},
                {text:'Status', value:'status'},
                {text:'Recruiter', value:'recruiter'},
                {text:'Referral', value:'referral'},
                {text:'Note', value:'note'},
                {text:'Applied', value:'appliedDate'}
            ],
            stackItems:[],
            statusItems,
            companyItems:[],

        }
    },
    async created(){
        this.data = await new JobApplicationService().getApplication();
        const serv = new DDLService();
        this.statusItems = serv.getStatusDDL();
        this.stackItems = await serv.getStackDDL();
        this.companyItems = await serv.getCompanyDDL();
    },
    methods:{
        // editItem(item:{}){
        //     return
        // },
        // deleteItem(item:{}){
        //     return
        // }
    }
})
</script>