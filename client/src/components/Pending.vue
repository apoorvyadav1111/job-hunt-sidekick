<template>
    <v-card>
            <v-btn @click="showTimeline" block text>
                {{ latest }}
            </v-btn>
    </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { Tasks } from "@/interfaces/jobapplication";
export default Vue.extend({
    name:'PendingComponent',
    props:{
        pendingHistory:{
            required:true,
            type: Array as PropType<Tasks> 
        }
    },
    created(){
        this.items = this.pendingHistory
        // this.items.sort((a:StatusLog,b:StatusLog)=>new Date(a.updated).setHours(0, 0, 0, 0) - new Date(b.updated).setHours(0, 0, 0, 0))

        this.latest = this.items.length>0?this.items[this.items.length-1].status:"";
    },
    data(){
        let items:Tasks= [];
        let latest= "";
        return {
            items,
            latest,
        }
    },
    methods:{
        showTimeline(){
            this.$emit('showPendingHistory', this.items);
        }
    }
})
</script>