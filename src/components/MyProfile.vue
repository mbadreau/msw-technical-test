<template>
  <div>
    <form @submit.prevent>
      <!-- Profile part -->
      <div style="width: 40%;">
        <b-field label="Prénom">
          <b-input v-model="form.firstname" @blur="saveFirstname"></b-input>
        </b-field>

        <b-field label="Nom">
          <b-input v-model="form.lastname" @blur="saveLastname"></b-input>
        </b-field>

        <b-field label="About me">
          <b-input type="textarea" v-model="form.about" @blur="saveAbout"></b-input>
        </b-field>
      </div>

      <!-- Social part -->
      <br>
      <div>
        <b-field label="Social ids">
          <b-input 
            placeholder="Social id - URL / username / id"
            v-model="form.social.link"
            style="width: 40%;"
            :disabled="!form.social.media">
          </b-input>
          <b-select v-model="form.social.media">
            <option v-for="media in formData.socialMedia" :value="media.name" :key="media.id">
              {{ media.name }}
            </option>
          </b-select>
          <b-button type="is-primary"
            @click="updateSocialId"
            :disabled="!form.social.link">
            +
          </b-button>
          <b-button type="is-primary"
            @click="removeSocialId"
            :disabled="!form.social.link">
            -
          </b-button>
        </b-field>

        <!-- <ul class="container">
          <li v-for="media in ((user||{}).socialIds||[])" :key="media.id">
            <p><i :class="media.icon" :style="{ color: media.color }"></i>
            {{ media.name }} : {{ media.link }}</p>
          </li>
        </ul> -->
      </div>
      <br>

      <!-- Affiliation part -->
      <br>
      <div style="width: 60%;">
        <b-field>
          <b-button type="is-primary" :disabled="!isAffiliationValid" 
            @click="updateAffiliation">Ajouter une affiliation</b-button>
        </b-field>

        <b-field label="Organisation">
          <template slot="label">
            Organisation
            <a style="float: right; text-decoration: underline;" @click="removeAffiliation">X</a>
          </template>
          <b-select expanded v-model="form.affiliation.organisation">
            <option
              v-for="(organisation, index) in formData.organisations"
              :value="organisation" :key="index">
              {{ organisation }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Equipe">
          <b-input v-model="form.affiliation.team"></b-input>
        </b-field>

        <b-field label="Dates">
          <b-field>
            <p class="control">
              <button class="button is-static">De</button>
            </p>
            <b-input v-model.number="form.affiliation.fromDate" style="width: 70%;"
              @blur="form.affiliation.fromDate = checkedFromDate"></b-input>
          </b-field>
          <b-field position="is-right">
            <p class="control">
              <button class="button is-static">A</button>
            </p>
            <b-input v-model.number="form.affiliation.toDate" style="width: 70%;"
              @blur="form.affiliation.toDate = checkedToDate"></b-input>
          </b-field>
        </b-field>
        <!-- <b-button>De {{form.fromDate}}, à {{ form.toDate }}</b-button> -->

        <b-field label="Pays">
          <b-select expanded v-model="form.affiliation.country">
            <option v-for="(country, index) in formData.countries" :value="country" :key="index">
              {{ country }}
            </option>
          </b-select>
        </b-field>
      </div>
      <br>

      <!-- Avatar part -->
      <br>
      <div>
        <b-field>
          <b-upload v-model="form.dropFile" expanded drag-drop accept="image/*">
            <section class="section">
              <div class="content has-text-centered">
                <!-- <p><b-icon icon="upload"></b-icon></p> -->
                <p>Déposer votre avatar ici</p>
              </div>
            </section>
          </b-upload>
        </b-field>
        <!-- <b-taglist>
          <b-tag v-if="dropFile" class="tag is-primary is-medium"> {{ dropFile.name }}
            <button class="delete is-medium" type="button" @click="dropFile = null"></button>
          </b-tag>
        </b-taglist> -->
      </div>
    </form>
  </div>
</template>

<script>
import { countries } from '../assets/countries.js'
import { organisations } from '../assets/organisations.js'
import { socialMedia } from '../assets/socialMedia.js'

export default {
  created: function() {
    this.resetForm();
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        about: '',
        social: {
            media: '',
            link: '',
        },
        affiliation: {
          organisation: '',
          team: '',
          fromDate: '',
          toDate: '',
          country: '',
        },
        dropFile: null,
      },
      formData: {
        countries,
        organisations,
        socialMedia,
      },
    }
  },
  methods: {
    // deleteDropFile(index) {
    //   this.dropFiles.splice(index, 1)
    // },
    resetForm: function() {
        // init form with current user values or default ones (on userId change)
        this.form.firstname =((this.user||{}).firstname||'');
        this.form.lastname = ((this.user||{}).lastname||'');
        this.form.about = ((this.user||{}).about||'');
        // if exists, take the first socialId of current user
        this.form.social.media = ((((this.user||{}).socialIds||[])[0]||{}).name||'');
        // if exists, take the first affiliation of current user
        this.form.affiliation.organisation = ((((this.user||{}).affiliations||[])[0]||{}).organisation||'');
    },
    // FORM DATA SAVING FUNCTIONS
    saveFirstname: function() {
      console.log('saveFirstname(' + this.form.firstname + ')');
      // input is valid if length > 0
      if (this.form.firstname.length > 0 && (this.user||{}).firstname) {
        this.user.firstname = this.form.firstname;
      }
    },
    saveLastname: function() {
      console.log('saveLastname(' + this.form.lastname + ')');
      // input is valid if length > 0
      if (this.form.lastname.length > 0 && (this.user||{}).lastname) {
        this.user.lastname = this.form.lastname;
      }
    },
    saveAbout: function() {
      console.log('saveAbout(' + this.form.about.length + ')');
      // input is valid if length >= 0
      if (this.form.about.length >= 0 && (this.user||{}).about) {
        this.user.about = this.form.about;
      }
    },
    // Add or update current social ID
    updateSocialId: function() {
      console.log('updateSocialId(' + this.form.social.media + ', ' + this.form.social.link + ')');
      // input is valid if link length > 0
      if (this.form.social.media && this.form.social.link.length > 0) {
        // replace link if social ID is already registered
        var socialIds = ((this.user||{}).socialIds||[]);
        for (var i = 0 ; i < socialIds.length ; i++) {
          if (socialIds[i].name == this.form.social.media) {
            socialIds[i].link = this.form.social.link;
            return;
          }
        }
        // else add social ID to user's data
        // make new object reactive using Vue.set and Object.assign({}, ...)
        this.$set(socialIds, socialIds.length, Object.assign({}, {
            name: this.form.social.media,
            link: this.form.social.link,
          }));
      }
      else {
        console.log('ERROR updateSocialId(): bad input');
      }
    },
    // remove current social ID
    removeSocialId: function() {
      console.log('removeSocialId(' + this.form.social.media + ', ' + this.form.social.link + ')');
      // no need to validate input
      var socialIds = ((this.user||{}).socialIds||[]);
      for (var i = 0 ; i < socialIds.length ; i++) {
        if (socialIds[i].name == this.form.social.media) {
          socialIds.splice(i, 1);
          this.form.social.link = '';
          return;
        }
      }
      console.log('ERROR removeSocialId(): media not found');
    },
    // Add or update current social ID
    updateAffiliation: function() {
      console.log('updateAffiliation(' + this.form.affiliation.organisation + ')');
      // input is valid if computed isAffiliationValid returns true
      if (this.form.social.media && this.isAffiliationValid) {
        // replace affiliation data if organisation is already registered
        var affiliations = ((this.user||{}).affiliations||[]);
        for (var i = 0 ; i < affiliations.length ; i++) {
          if (affiliations[i].organisation == this.form.affiliation.organisation) {
            affiliations[i].team = this.form.affiliation.team;
            affiliations[i].fromDate = this.form.affiliation.fromDate;
            affiliations[i].toDate = this.form.affiliation.toDate;
            affiliations[i].country = this.form.affiliation.country;
            return;
          }
        }
        // else add affiliation to user's data
        // make new object reactive using Vue.set and Object.assign({}, ...)
        this.$set(affiliations, affiliations.length, Object.assign({}, {
            organisation: this.form.affiliation.organisation,
            team: this.form.affiliation.team,
            fromDate: this.form.affiliation.fromDate,
            toDate: this.form.affiliation.toDate,
            country: this.form.affiliation.country,
          }));
      }
      else {
        console.log('ERROR updateSocialId(): bad input');
      }
    },
    // Add or update current social ID
    removeAffiliation: function() {
      console.log('removeAffiliation(' + this.form.affiliation.organisation + ')');
      // no need to validate input
      var affiliations = ((this.user||{}).affiliations||[]);
      for (var i = 0 ; i < affiliations.length ; i++) {
        if (affiliations[i].organisation == this.form.affiliation.organisation) {
          affiliations.splice(i, 1);
          this.form.affiliation.team = '';
          this.form.affiliation.fromDate = '';
          this.form.affiliation.toDate = '';
          this.form.affiliation.country = '';
          return;
        }
      }
      console.log('ERROR removeAffiliation(): organisation not found');
    },
    saveAvatar: function() {
      // input is valid if not null (image type is already filtered by drag n drop)
      if (this.form.dropFile) {
        alert('Saving \'' + this.form.dropFile.name + '\' in database...');
      }
    },
    isValidDate: function(date) {
      date = Number.parseInt(date, 10);
      const thisYear = new Date().getFullYear();
      const minYear = 100;
      const maxYear = 1;
      return (!Number.isNaN(date)
        && date >= (thisYear - minYear)
        && date <= (thisYear + maxYear));
    },
  },
  computed: {
    checkedFromDate: function() {
      var fromDate = this.form.affiliation.fromDate;
      var toDate = this.form.affiliation.toDate;
      // if fromDate is valid
      if (this.isValidDate(fromDate)) {
        // and if toDate is not set, or valid but >= fromDate
        if (!toDate || (this.isValidDate(toDate) && fromDate <= toDate)) {
          return fromDate;
        }
      }
      return '';
    },
    checkedToDate: function() {
      var fromDate = this.form.affiliation.fromDate;
      var toDate = this.form.affiliation.toDate;
      // if toDate is valid
      if (this.isValidDate(toDate)) {
        // and if fromDate is not set, or valid but >= toDate
        if (!fromDate || (this.isValidDate(fromDate) && fromDate <= toDate)) {
          return toDate;
        }
      }
      return '';
    },
    isAffiliationValid: function() {
      return this.form.affiliation.organisation.length
        && this.form.affiliation.country;
    },
  },
  watch: {
    'user.id': function() {
      this.resetForm();
    },
    // called on social media dropdown change
    'form.social.media': function() {
      if (this.form.social.media) {
        for (var i = 0 ; i < ((this.user||{}).socialIds||[]).length ; i++) {
          if (this.user.socialIds[i].name == this.form.social.media) {
            this.form.social.link = this.user.socialIds[i].link;
            return;
          }
        }
      }
      this.form.social.link = '';
    },
    // called on affiliation organisation dropdown change
    'form.affiliation.organisation': function() {
      if (this.form.affiliation.organisation) {
        for (var i = 0 ; i < ((this.user||{}).affiliations||[]).length ; i++) {
          if (this.user.affiliations[i].organisation == this.form.affiliation.organisation) {
            this.form.affiliation.team = this.user.affiliations[i].team;
            this.form.affiliation.fromDate = this.user.affiliations[i].fromDate;
            this.form.affiliation.toDate = this.user.affiliations[i].toDate;
            this.form.affiliation.country = this.user.affiliations[i].country;
            return;
          }
        }
      }
      this.form.affiliation.team = '';
      this.form.affiliation.fromDate = '';
      this.form.affiliation.toDate = '';
      this.form.affiliation.country = '';
    },
    // called on avatar dropfile change
    'form.dropFile': function() {
      this.saveAvatar();
    },
  }
}
</script>
