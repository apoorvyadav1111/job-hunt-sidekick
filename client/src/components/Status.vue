<template>
    <v-card>
            <v-btn @click="showTimeline" block text>
                {{ latest.status }}
            </v-btn>
    </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { StatusLog, StatusHistory } from "@/interfaces/jobapplication";
export default Vue.extend({
    name:'StatusComponenet',
    props:{
        statusHistory:{
            required:true,
            type: Array as PropType<StatusHistory> 
        }
    },
    created(){
        this.items = this.statusHistory
        this.items.sort((a:StatusLog,b:StatusLog)=>new Date(a.updated).setHours(0, 0, 0, 0) - new Date(b.updated).setHours(0, 0, 0, 0))
        this.latest = this.items[this.items.length-1];
    },
    data(){
        let items:StatusHistory = [];
        let latest: StatusLog = {} as StatusLog;
        return {
            items,
            latest,
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showStatusHistory', this.items);
        }
    }
})
</script>