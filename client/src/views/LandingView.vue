<template>
  <v-layout fluid>
    <v-app-bar app absolute color="#323232">
      <v-app-bar-title class="title" center><div>Job Hunt v2</div></v-app-bar-title>
      <template>
        <v-tabs align-with-title color="orange">
        <v-tab @click="showNewView">Add New</v-tab>
        <v-tab @click="showApplicationsV2View">Applications V2</v-tab>
        <!-- <v-tab @click="showApplicationsView">Applications</v-tab> -->
        <v-tabs-slider color="orange"></v-tabs-slider>
      </v-tabs>

      </template>

    </v-app-bar>
    <v-main color="#212121">
      <v-container v-if="currentView.new">
        <NewView />
      </v-container>
        <ApplicationsViewNew v-if="currentView.applicationsv2" />
        <!-- <ApplicationsView v-if="currentView.applications" /> -->
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NewView from './NewView.vue';
import ApplicationsView from './ApplicationsView.vue';
import ApplicationsViewNew from './ApplicationsViewNew.vue';


export default Vue.extend({
  name: 'LandingView',
  components: {
    NewView,
    ApplicationsViewNew
  },
  data(){
    let currentView = {
      action:false,
      new:true,
      applications:false,
      applicationsv2:false,
    }
    return {
      currentView
    }
  },
  methods:{
    resetAllViews(){
      this.currentView.action = false;
      this.currentView.new = false;
      this.currentView.applications = false;
      this.currentView.applicationsv2 = false;
    },
    showNewView(){
      this.resetAllViews();
      this.currentView.new = true;
    },
    showActionCenterView(){
      this.resetAllViews();
      this.currentView.action = true;
    },
    showApplicationsView(){
      this.resetAllViews();
      this.currentView.applications = true;
    },
    showApplicationsV2View(){
      this.resetAllViews();
      this.currentView.applicationsv2 = true;
    }


  }
});
</script>
