import { defineComponent, ref, watch, onMounted } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const first = 1;
    const last = 5;
    const currentMeetup = ref("");
    const selectedMeetup = ref(1);

    const selectorMeetup = async () => {;
      const meetup = await getMeetup(selectedMeetup.value);
      currentMeetup.value = meetup.title;
    };

    watch(selectedMeetup, () => {
      selectorMeetup();
    });

    onMounted(() => {
      selectorMeetup();
    });

    return {
      first,
      last,
      currentMeetup,
      selectedMeetup,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" 
        :disabled="selectedMeetup <= first" 
        @click="selectedMeetup--">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div v-for="item in last" class="radio-group__button">
            <input
              v-model="selectedMeetup"
              :id="'meetup-id-' + item"
              class="radio-group__input"
              type="radio"
              name="meetupId"
              :value="item"/>
            <label :for="'meetup-id-'+ item" class="radio-group__label">{{ item }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button"
        :disabled="selectedMeetup >= last" 
        @click="selectedMeetup++">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{currentMeetup}}</h1>
        </div>
      </div>

    </div>
  `,
})
