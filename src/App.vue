<script setup>
import { ref, reactive, watch } from "vue";
import Budget from "./components/Budget.vue";
import BudgetControl from "./components/BudgetControl.vue";
import Expense from "./components/Expense.vue";
import Modal from "./components/Modal.vue";
import iconNewExpense from "./assets/img/nuevo-gasto.svg";
import { generateId } from "./helpers";

const modal = reactive({
  show: false,
  animate: false,
});

const budget = ref(0);

const available = ref(0);
const spent = ref(0);

const expense = reactive({
  name: "",
  amount: "",
  category: "",
  id: null,
  date: Date.now,
});

const expenses = ref([]);

watch(
  expenses,
  () => {
    const totalSpent = expenses.value.reduce(
      (total, expense) => expense.amount + total,
      0
    );
    spent.value = totalSpent;
    available.value = budget.value - totalSpent;
  },
  {
    deep: true,
  }
);

const setBudget = (amount) => {
  budget.value = amount;
  available.value = amount;
};

const showModal = () => {
  modal.show = true;

  setTimeout(() => {
    modal.animate = true;
  }, 300);
};

const closeModal = () => {
  modal.animate = false;
  setTimeout(() => {
    modal.show = false;
  }, 300);
};

const saveExpense = () => {
  expenses.value.push({
    ...expense,
    id: generateId(),
    date: Date.now(),
  });


  closeModal();

  Object.assign(expense, {
    name: "",
    amount: "",
    category: "",
    id: null,
  });
};
</script>

<template>
  <div :class="{ set: modal.show }">
    <header>
      <h1>Expense tracker</h1>
      <div class="container-header container shadow">
        <Budget v-if="budget === 0" @set-budget="setBudget" />

        <BudgetControl
          v-else
          :budget="budget"
          :available="available"
          :spent="spent"
        />
      </div>
    </header>

    <main v-if="budget > 0">
      <div class="list-expense container">
        <h2>
          {{ expenses.length > 0 ? "Expenses" : "There's nothing to show" }}
        </h2>

        <Expense
          v-for="expense in expenses"
          :key="expense.id"
          :expense="expense"
        />
      </div>

      <div class="create-expense">
        <img :src="iconNewExpense" alt="icon New Expense" @click="showModal" />
      </div>
      <Modal
        v-if="modal.show"
        @close-modal="closeModal"
        @save-expense="saveExpense"
        :modal="modal"
        :available="available"
        v-model:name="expense.name"
        v-model:amount="expense.amount"
        v-model:category="expense.category"
      />
    </main>
  </div>
</template>

<style>
:root {
  --blue: #3b82f6;
  --white: #fff;
  --grey-light: #f5f5f5;
  --grey: #94a3b8;
  --grey-dark: #64748b;
  --black: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--grey-light);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 3rem;
}

.set {
  overflow: hidden;
  height: 100vh;
}

header {
  background-color: var(--blue);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
}

.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.shadow {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--white);
  border-radius: 1.2rem;
  padding: 5rem;
}

.create-expense {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.create-expense img {
  width: 5rem;
  cursor: pointer;
}

.list-expense {
  margin-top: 10rem;
}

.list-expense h2 {
  font-weight: 900;
  color: var(--grey-dark);
}
</style>
