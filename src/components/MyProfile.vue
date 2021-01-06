<template>
  <div>
    <form>
      <!-- Profile part -->
      <div style="width: 40%;">
        <b-field label="Prénom">
          <b-input v-model="form.firstname"></b-input>
        </b-field>

        <b-field label="Nom">
          <b-input v-model="form.lastname"></b-input>
        </b-field>

        <b-field label="About me">
          <b-input type="textarea" v-model="form.about"></b-input>
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
            :disabled="!form.social.media.name">
          </b-input>
          <b-select v-model="form.social.media" @input="updateSocialIdLink">
            <option v-for="(media, index) in formData.socialMedia"
              :style="{ color: media.color }" :value="media" :key="index">
              <!-- <i> markup does not work in <option>, may using <b-dropdown> instead -->
              <i :class="media.icon"></i> {{ media.name }}
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
          <li v-for="media in user.socialIds" :key="media.id">
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
          <b-button type="is-primary">Ajouter une affiliation</b-button>
        </b-field>

        <b-field label="Organisation">
          <template slot="label">
            Organisation<a style="float: right; text-decoration: underline;">X</a>
          </template>
          <b-select expanded v-model="form.organisation">
            <option
              v-for="(organisation, index) in formData.organisations"
              :value="organisation" :key="index">
              {{ organisation }}
            </option>
          </b-select>
        </b-field>

        <b-field label="Equipe">
          <b-input v-model="form.team"></b-input>
        </b-field>

        <b-field label="Dates">
          <b-field>
            <p class="control">
              <button class="button is-static">De</button>
            </p>
            <b-input v-model.number="form.fromDate" style="width: 70%;"></b-input>
          </b-field>
          <b-field position="is-right">
            <p class="control">
              <button class="button is-static">A</button>
            </p>
            <b-input v-model.number="form.toDate" style="width: 70%;"></b-input>
          </b-field>
        </b-field>
        <!-- <b-button>De {{form.fromDate}}, à {{ form.toDate }}</b-button> -->

        <b-field label="Pays">
          <b-select expanded v-model="form.country">
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
export default {
  data() {
    return {
      form: {
        firstname: '',
        lastname: '',
        about: '',
        social: {
            media: {
              name: '',
              icon: '',
              color: '',
            },
            link: '',
        },
        organisation: '',
        team: '',
        fromDate: '',
        toDate: '',
        country: '',
        dropFile: null,
      },
      formData: {
        socialMedia: [
          {
            id: 1,
            name: 'Facebook',
            icon: 'fab fa-facebook',
            color: '#3b5998',
          },
          {
            id: 2,
            name: 'Twitter',
            icon: 'fab fa-twitter',
            color: '#00acee',
          },
          {
            id: 3,
            name: 'Linkedin',
            icon: 'fab fa-linkedin',
            color: '#0072b1',
          },
          {
            id: 4,
            name: 'Orcid',
            icon: 'fab fa-orcid',
            color: '#bdeb34',
          },
          {
            id: 5,
            name: 'SoundClound',
            icon: 'fab fa-soundcloud',
            color: '#ff7700',
          },
        ],
        organisations: [
          'Marine Nationale',
          'National Aeronautics and Space Administration',
          'TurboSound UK',
        ],
        countries: [
          'France',
          'Belgique',
          'Bordurie',
          'Syldavie',
        ]
      },
    }
  },
  methods: {
    // deleteDropFile(index) {
    //   this.dropFiles.splice(index, 1)
    // },
    // Update social ID link when selecting new social media
    updateSocialIdLink: function() {
      if (this.form.social.media.name) {
        for (var i=0; i < this.user.socialIds.length; i++) {
          if (this.user.socialIds[i].name == this.form.social.media.name) {
            this.form.social.link = this.user.socialIds[i].link;
            return
          }
        }
      }
      this.form.social.link = '';
    },
    // Add or update current social ID
    updateSocialId: function() {
      console.log('updateSocialId(' + this.form.social.media.name + ', ' + this.form.social.link + ')');
      //TODO
    },
    // remove current social ID
    removeSocialId: function() {
      console.log('removeSocialId(' + this.form.social.media.name + ', ' + this.form.social.link + ')');
      //TODO
    },
  },
}
</script>
