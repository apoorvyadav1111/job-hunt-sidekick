<template>
  <v-card class="ma-3">
    <v-card-text class="overline">
      Status History
    </v-card-text>
    <v-timeline
      align-top
      dense
    >  
      <v-timeline-item color="red" small>
      </v-timeline-item>
      <v-timeline-item
        v-for="(item, i) in items"
        :key="i"
        small
      >    
      <v-row>
        <v-col cols="8">
          <v-select
          v-model="item.status"
          :items="statusItems"
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
            v-model="item.review"
            dense
            color="orange"
            label="Review"
            @blur="save"
        ></v-text-field>
        </v-col>
      </v-row>
        {{  new Date(item.updated).toDateString()}}
      </v-timeline-item>
      <v-timeline-item color="success" small>
      </v-timeline-item>
    </v-timeline>
  </v-card>

  </template>
<script lang="ts">
import { JobApplication, JobApplicationPatch, Status } from '@/interfaces/jobapplication';
import { DDLService } from '@/services/ddl';
import { JobApplicationService } from '@/services/jobapplication_service';
import Vue from 'vue';
export default Vue.extend({
    name:"StatusTimeline",
    props:['id','items'],
    data(){
      let statusItems: Status[] =[];
      return {
        statusItems,
      }
    },
    async created(){
        const serv = new DDLService();
        this.statusItems = serv.getStatusDDL();
    },
    methods:{
      async save(){
            const patch:JobApplicationPatch = {
              status:this.items
            };
          await new JobApplicationService().putApplication(this.id, patch);
          this.$emit('refreshData');
        },
    }
})
</script>