<script setup>
import { ref, computed } from "vue";
import closeModal from "../assets/img/cerrar.svg";
import Alert from "./Alert.vue";

const emit = defineEmits([
  "close-modal",
  "save-expense",
  "delete-expense",
  "update:name",
  "update:amount",
  "update:category",
]);

const error = ref("");

const props = defineProps({
  modal: {
    type: Object,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: [String, Number],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  id: {
    type: [String, null],
    required: true,
  }
});


const oldAmount = computed(() => Number(props.amount))

const isEditing = computed(() => !!props.id)


const addExpense = () => {
  const { name, category, available } = props
  const amount = Number(props.amount)

  // Validate empty fields
  if (!name || !category || !amount) {
    error.value = "All fields are required"
    setTimeout(() => error.value = "", 3000)
    return
  }

  // Validate amount
  if (amount <= 0) {
    error.value = "The amount must be greater than 0"
    setTimeout(() => error.value = "", 3000)
    return
  }

  // Validate budget
  if (props.id) {
    // Edit expense
    if (amount > oldAmount.value + available) {
      error.value = "You have exceeded the available budget"
      setTimeout(() => error.value = "", 3000)
      return
    }
  } else {
    // Nex expense
    if (amount > available) {
      error.value = "You have exceeded the available budget"
      setTimeout(() => error.value = "", 3000)
      return
    }
  }

  emit("save-expense")
}

</script>

<template>
  <div class="modal">
    <div class="close-modal">
      <img :src="closeModal" @click="$emit('close-modal')" />
    </div>

    <div class="container container-form" :class="[modal.animate ? 'animate' : 'close']">
      <form class="new-expense" @submit.prevent="addExpense">
        <legend>{{ isEditing ? 'Save' : 'Add Expense' }}</legend>

        <Alert v-if="error">{{ error }}</Alert>

        <div class="field">
          <label for="name">Name Expense:</label>
          <input
            type="text"
            id="name"
            placeholder="Add your expense name..."
            :value="name"
            @input="$emit('update:name', $event.target.value)"
          />
        </div>
        <div class="field">
          <label for="amount">amount:</label>
          <input
            type="number"
            id="amount"
            placeholder="Add the amount, ej: 300"
            :value="amount"
            @input="$emit('update:amount', +$event.target.value)"
          />
        </div>
        <div class="field">
          <label for="name">Category:</label>
          <select
            id="category"
            :value="category"
            @input="$emit('update:category', $event.target.value)"
          >
            <option value="">-- Select --</option>
            <option value="savings">Savings</option>
            <option value="food">Food</option>
            <option value="home">Home</option>
            <option value="expenses">Expenses</option>
            <option value="leisure">Leisure</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
          </select>
        </div>

        <input type="submit" :value="isEditing ? 'Save' : 'Add Expense'" />
      </form>
      <button v-if="isEditing" type="button" class="btn-delete" @click="$emit('delete-expense')">
        Delete Expense
      </button>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: absolute;
  background-color: rgb(0 0 0 / 0.9);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.close-modal {
  position: absolute;
  right: 3rem;
  top: 3rem;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
}

.container-form {
  transition-property: all;
  transition-duration: 300ms;
  transition-timing-function: ease-in;
  opacity: 0;
}

.container-form.animate {
  opacity: 1;
}

.container-form.close {
  opacity: 0;
}

.new-expense {
  margin: 10rem auto 0 auto;
  display: grid;
  gap: 2rem;
}

.new-expense legend {
  text-align: center;
  color: var(--white);
  font-size: 3rem;
  font-weight: 700;
}

.field {
  display: grid;
  gap: 2rem;
}

.new-expense input,
.new-expense select {
  background-color: var(--grey-light);
  border-radius: 1rem;
  padding: 1rem;
  border: none;
  font-size: 2.2rem;
}

.new-expense label {
  color: var(--white);
}

.new-expense input[type="submit"] {
  background-color: var(--blue);
  color: var(--white);
  font-weight: 700;
  cursor: pointer;
}
.btn-delete {
  padding: 1rem;
  width: 100%;
  background-color: #ef4444;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--white);
  margin-top: 10rem;
  cursor: pointer;
}
</style>
