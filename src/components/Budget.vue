<script setup>
import { ref } from 'vue'
import Alert from './Alert.vue'

const budget = ref(0)
const error = ref('')

const emit = defineEmits(['set-Budget'])

const setBudget = () => {
  const value = Number(budget.value);

  if (isNaN(value) || value <= 0) {
    error.value = 'The amount entered is not valid';
    setTimeout(() => {
      error.value = '';
    }, 3000);
    return;
  }

  emit('set-Budget', value);
};


</script>


<template>
   <form class="budget" @submit.prevent="setBudget">

      <Alert v-if="error">
         {{ error }}
      </Alert>


      <div class="field">
         <label for="new-expense">Set your Budget</label>
         <input id="new-expense" class="new-expense" placeholder="Add your expense..." type="number"
            v-model.number="budget" min="0">
      </div>

      <input type="submit" value="Set Budget" />
   </form>


</template>


<style scoped>
.budget {
  width: 100%;
  display: grid;
  gap: 3rem;
}

/* Field */
.field {
  display: grid;
  gap: 1.5rem;
}

/* Label */
.budget label {
  font-size: 2.6rem;
  text-align: center;
  font-weight: 900;
  color: var(--blue);
}

/* Input */
.budget input[type="number"] {
  background-color: var(--grey-light);
  border-radius: 1.2rem;
  padding: 1.6rem;
  border: 2px solid transparent;
  font-size: 2.4rem;
  text-align: center;
  font-weight: 700;
  transition: all 0.2s ease;
}

.budget input[type="number"]:focus {
  outline: none;
  border-color: var(--blue);
  background-color: var(--white);
}

/* Submit button */
.budget input[type="submit"] {
  background-color: var(--blue);
  border: none;
  padding: 1.6rem;
  text-align: center;
  font-size: 2rem;
  color: var(--white);
  font-weight: 900;
  width: 100%;
  border-radius: 1.2rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.budget input[type="submit"]:hover {
  background-color: #1048a4;
  transform: translateY(-2px);
}


@media (max-width: 480px) {
  .budget label {
    font-size: 2.2rem;
  }

  .budget input[type="number"] {
    font-size: 2.1rem;
  }
}

</style>
