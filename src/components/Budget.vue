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
}

.field {
   display: grid;
   gap: 2rem;
}

.budget input[type="number"] {
   background-color: var(--grey-light);
   border-radius: 1rem;
   padding: 1rem;
   border: none;
   font-size: 2.2rem;
   text-align: center;
}


.budget input[type="submit"] {
   background-color: var(--blue);
   border: none;
   padding: 1rem;
   text-align: center;
   font-size: 2rem;
   margin-top: 2rem;
   color: var(--white);
   font-weight: 900;
   width: 100%;
   transition: background-color 300ms ease;
}

.budget input[type="submit"]:hover {
   background-color: #1048a4;
   cursor: pointer;
}

.budget label {
   font-size: 2.8rem;
   text-align: center;
   color: var(--blue);
}
</style>
