import { defineComponent, ref} from 'vue'


export default defineComponent({
  name: 'CounterApp',

  setup() {
    const count = ref(0);

    function substract(value) {
      return value - 1;
    }
    
    function add(value) {
      return value + 1;
    }

    return {
      count,
      add,
      substract,
    }
  },

  template: `
    <div class="counter">
      <button
        class="button button--secondary"
        type="button"
        aria-label="Decrement"
        :disabled="count <= 0"
        @click="count = substract(count)"
      >➖</button>

      <span class="count" data-testid="count">{{count}}</span>

      <button
        class="button button--secondary"
        type="button"
        aria-label="Increment"
        :disabled="count >= 5"
        @click="count = add(count)"
      >➕</button>
    </div>
  `,
})
