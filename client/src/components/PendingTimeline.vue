<template>
  <v-card class="ma-3">
    <v-card-text class="overline">
      Pending Tasks History
    </v-card-text>
    <v-timeline
      align-top
      dense
    >  
      <v-timeline-item color="success" small>
      </v-timeline-item>
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        small
      > <v-row>
        <v-col cols="8">
          <v-select
          v-model="item.status"
          :items="pendingStatusItems"
          label="Status"
          required
          color="orange"
          item-color="orange"
          dense
          text
          @blur="save"
      ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-text-field
            v-model="item.task_detail"
            dense
            color="orange"
            label="Task Details"
            @blur="save"
        ></v-text-field>
        </v-col>
      </v-row>
            {{  item.due_date.toString().slice(0,10) }}
      </v-timeline-item>
      <v-timeline-item color="red" small>
      </v-timeline-item>
    </v-timeline>
  </v-card>

  </template>
<script lang="ts">
import { JobApplicationPatch, TaskStatus } from '@/interfaces/jobapplication';
import { DDLService } from '@/services/ddl';
import { JobApplicationService } from '@/services/jobapplication_service';
import Vue from 'vue';
export default Vue.extend({
    name:"PendingTimeline",
    props:['items', 'id'],
    data(){
      let pendingStatusItems: TaskStatus[] = [];
      return {
        pendingStatusItems
      }
    },
    async created(){
        const serv = new DDLService();
        this.pendingStatusItems = serv.getPendingStatusDDL();
    },
    methods:{
      async save(){
            const patch:JobApplicationPatch = {
              pending:this.items
            };
          await new JobApplicationService().putApplication(this.id, patch);
          this.$emit('refreshData2');
        },
    }
})
</script>