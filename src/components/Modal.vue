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
    // New expense
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
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

/* Close icon */
.close-modal {
  position: absolute;
  top: 3rem;
  right: 3rem;
}

.close-modal img {
  width: 3rem;
  cursor: pointer;
  filter: brightness(0) invert(1);
}

/* Modal container */
.container-form {
  width: 90%;
  max-width: 45rem;
  background-color: var(--white);
  border-radius: 1.6rem;
  padding: 4rem;
  box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  opacity: 0;
  transform: translateY(30px);
  transition: all 300ms ease;
}

.container-form.animate {
  opacity: 1;
  transform: translateY(0);
}

.container-form.close {
  opacity: 0;
  transform: translateY(30px);
}

/* Form */
.new-expense {
  display: grid;
  gap: 2.5rem;
}

.new-expense legend {
  text-align: center;
  color: var(--grey-dark);
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 2rem;
}

/* Fields */
.field {
  display: grid;
  gap: 1rem;
}

.new-expense label {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--grey-dark);
}

.new-expense input,
.new-expense select {
  background-color: var(--grey-light);
  border-radius: 1rem;
  padding: 1.4rem;
  border: 2px solid transparent;
  font-size: 1.8rem;
  transition: all 0.2s ease;
}

.new-expense input:focus,
.new-expense select:focus {
  outline: none;
  border-color: var(--blue);
  background-color: var(--white);
}

/* Submit button */
.new-expense input[type="submit"] {
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: var(--blue);
  color: var(--white);
  font-weight: 900;
  font-size: 1.8rem;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.new-expense input[type="submit"]:hover {
  background-color: #2563eb;
  transform: translateY(-2px);
}

/* Delete button */
.btn-delete {
  margin-top: 3rem;
  padding: 1.4rem;
  width: 100%;
  background-color: #ef4444;
  font-weight: 900;
  font-size: 1.7rem;
  color: var(--white);
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.btn-delete:hover {
  background-color: #dc2626;
  transform: translateY(-2px);
}

</style>
