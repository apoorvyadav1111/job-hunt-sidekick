<template>
    <v-card class="elevation-0">
            <v-btn @click="showTimeline" :color="color" text small>
                {{ latest.status }} {{  new Date(latest.due_date).toDateString()}}
            </v-btn>
    </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { JobApplication, Task, Tasks } from "@/interfaces/jobapplication";
export default Vue.extend({
    name:'PendingComponent',
    props:{
        pendingItem:{
            required:true,
            type: Object as PropType<JobApplication> 
        }
    },
    created(){
        this.items = this.pendingItem.pending
        this.id = this.pendingItem._id
        this.latest = this.items[this.items.length-1];
        let today = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
        this.color = (new Date((new Date(this.latest.due_date).getTime()) - (new Date()).getTimezoneOffset() * 60000).toISOString().slice(0,10)<=today && this.latest.status!=='DONE')?'red':'white';
    },
    data(){
        let items:Tasks= [];
        let latest:Task= {} as Task;
        let id = "";
        let color = "white";
        return {
            items,
            latest,
            id,
            color,
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showPendingHistory', this.items, this.id);
        }
    }
})
</script>