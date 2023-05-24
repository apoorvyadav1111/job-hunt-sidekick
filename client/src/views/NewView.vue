<template>
    <v-card outlined class="ma-2 pa-6">
        <v-card-text class="text-overline text-center">
            <div style="font-size: large;">
                Add a new job application
            </div>
        </v-card-text>
        <form>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="company"
                        :error-messages="companErrors"
                        :items="companyItems"
                        label="Company Name"
                        required
                        @input="$v.company.$touch()"
                        @blur="$v.company.$touch()"
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="postingId"
                        :error-messages="postingIdErrors"
                        label="Job ID"
                        required
                        @input="$v.postingId.$touch()"
                        @blur="$v.postingId.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="jobUrl"
                    label="Job Posting Url"
                    @input="$v.referral.$touch()"
                    @blur="$v.referral.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                        v-model="dashboardURL"
                        label="Dashboard URL"
                        @input="$v.referral.$touch()"
                        @blur="$v.referral.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-combobox
                        v-model="stack"
                        :items="stackItems"
                        :error-messages="stackErrors"
                        label="Stack"
                        required
                        @change="$v.stack.$touch()"
                        @blur="$v.stack.$touch()"
                    ></v-combobox>
                </v-col>
                <v-col>
                    <v-text-field
                        v-model="referral"
                        :error-messages="referralErrors"
                        label="Referral"
                        required
                        @input="$v.referral.$touch()"
                        @blur="$v.referral.$touch()"
                    ></v-text-field>
                </v-col>
            </v-row>


            <v-text-field
                v-model="recuiter"
                label="Recuiter Details"
                @input="$v.referral.$touch()"
                @blur="$v.referral.$touch()"
            ></v-text-field>
            <v-textarea
                outlined
                v-model="note"
                name="Note"
                label="Note"
            ></v-textarea>
            <v-btn
                class="mr-4"
                @click="submit"
                >
                submit
            </v-btn>
            <v-btn @click="clear">
            clear
            </v-btn>
    </form>

    </v-card>
</template>
<script lang="ts">
import Vue from 'vue';
import { validationMixin } from 'vuelidate'

export default Vue.extend({
    name:'NewView',
    components:{},
    methods:{
        submit(){
            return
        },
        clear(){
            return
        }

    }
})
</script>