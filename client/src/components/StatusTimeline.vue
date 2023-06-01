<template>
  <v-card class="ma-3">
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
      >
            {{ item.status }} <br/>
            {{ item.review }}
            {{  new Date(item.updated).toDateString()}}
      </v-timeline-item>
      <v-timeline-item color="red" small>
      </v-timeline-item>
    </v-timeline>
  </v-card>

  </template>
<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name:"StatusTimeline",
    props:['items']
})
</script>