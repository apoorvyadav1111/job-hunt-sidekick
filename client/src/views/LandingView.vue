<template>
  <v-layout fluid>
    <v-app-bar app absolute color="#323232">
      <v-app-bar-title class="title" center><div>Sidekick</div></v-app-bar-title>
      <template>
        <v-tabs align-with-title>
        <v-tab @click="showNewView">Add New</v-tab>
        <v-tab @click="showActionCenterView">Action Center</v-tab>
        <v-tab @click="showApplicationsView">Applications</v-tab>
      </v-tabs>

      </template>

    </v-app-bar>
    <v-main color="#212121">
      <v-container v-if="currentView.new">
        <NewView />
      </v-container>
      <v-container v-if="currentView.action">
        2
        <ActionCenter />
      </v-container>
      <v-container  v-if="currentView.applications">
        3
        <Applications />
      </v-container>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import NewView from './NewView.vue';

export default Vue.extend({
  name: 'LandingView',
  components: {
    NewView
  },
  data(){
    let currentView = {
      action:false,
      new:true,
      applications:false,
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
    }


  }
});
</script>
