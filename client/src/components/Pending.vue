<template>
    <v-card>
            <v-btn @click="showTimeline" block text>
                {{ latest.status }}
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
        // this.items.sort((a:StatusLog,b:StatusLog)=>new Date(a.updated).setHours(0, 0, 0, 0) - new Date(b.updated).setHours(0, 0, 0, 0))

        this.latest = this.items[this.items.length-1];
    },
    data(){
        let items:Tasks= [];
        let latest:Task= {} as Task;
        let id = "";
        return {
            items,
            latest,
            id
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showPendingHistory', this.items, this.id);
        }
    }
})
</script>