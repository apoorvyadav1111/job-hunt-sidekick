<template>
    <v-card>
            <v-btn @click="showTimeline" block text>
                {{ latest.status }}
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
        this.items.sort((a:StatusLog,b:StatusLog)=>new Date(a.updated).setHours(0, 0, 0, 0) - new Date(b.updated).setHours(0, 0, 0, 0))
        this.latest = this.items[this.items.length-1];
    },
    data(){
        let items:StatusHistory = [];
        let latest: StatusLog = {} as StatusLog;
        let id = "";
        return {
            items,
            latest,
            id
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showStatusHistory', this.items, this.id);
        }
    }
})
</script>