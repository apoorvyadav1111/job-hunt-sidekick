<template>
    <v-card class="elevation-0">
            <v-btn @click="showTimeline" block small text :color="latest.status==='REJECTED'?'red':'white'">
                {{ latest.status }} {{ last_date }}
            </v-btn>
    </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { StatusLog, StatusHistory, JobApplication } from "@/interfaces/jobapplication";
export default Vue.extend({
    name:'StatusComponent',
    props:{
        statusItem:{
            required:true,
            type: Object as PropType<JobApplication> 
        }
    },
    created(){
        this.items = this.statusItem.status
        this.id = this.statusItem._id
        // this.items.sort((a:StatusLog,b:StatusLog)=>new Date(a.updated).setHours(0, 0, 0, 0) - new Date(b.updated).setHours(0, 0, 0, 0))
        this.items.sort((a:StatusLog,b:StatusLog)=> a.updated<b.updated?0:1)

        this.latest = this.items[this.items.length-1];
        this.last_date = this.latest.updated.toString().slice(0,10);
    },
    data(){
        let items:StatusHistory = [];
        let latest: StatusLog = {} as StatusLog;
        let id = "";
        let last_date = "";
        return {
            items,
            latest,
            id,
            last_date
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showStatusHistory', this.items, this.id);
        }
    }
})
</script>