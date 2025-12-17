<script setup>
import { ref, reactive, watch, computed, onMounted } from "vue";
import Budget from "./components/Budget.vue";
import BudgetControl from "./components/BudgetControl.vue";
import Expense from "./components/Expense.vue";
import Modal from "./components/Modal.vue";
import Filter from "./components/Filter.vue";
import iconNewExpense from "./assets/img/nuevo-gasto.svg";
import { generateId } from "./helpers";

const modal = reactive({
  show: false,
  animate: false,
});

const budget = ref(0);

const available = ref(0);
const spent = ref(0);

const filter = ref('');

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

    localStorage.setItem('expenses', JSON.stringify(expenses.value))
  },
  {
    deep: true,
  }
);

watch(
  modal,
  () => {
    if (!modal.show) {
      resetStateExpense();
    }
  },
  {
    deep: true,
  }
);

watch(budget, () => {
  localStorage.setItem('budget', budget.value)
});

onMounted(() => {
  const BudgetStorage = localStorage.getItem('budget');
  if(BudgetStorage) {
    budget.value = Number(BudgetStorage)
    available.value = Number(BudgetStorage)
  }


  const expensesStorage = localStorage.getItem('expenses')
  if(expensesStorage) {
    expenses.value = JSON.parse(expensesStorage)
  }

})


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
  if (expense.id) {
    const { id } = expense;
    const i = expenses.value.findIndex((expense) => expense.id === id);
    expenses.value[i] = { ...expense };
  } else {
    expenses.value.push({
      ...expense,
      id: generateId(),
      date: Date.now(),
    });
  }

  closeModal();

  resetStateExpense();
};

const resetStateExpense = () => {
  Object.assign(expense, {
    name: "",
    amount: "",
    category: "",
    id: null,
  });
};

const selectExpense = (id) => {
  const expenseEdit = expenses.value.filter((expense) => expense.id === id)[0];
  Object.assign(expense, expenseEdit);
  showModal();
};

const deleteExpense = () => {
  if (!expense.id) return

  const confirmDelete = confirm("Are you sure you want to delete this expense?")

  if (!confirmDelete) return

  expenses.value = expenses.value.filter(
    expenseState => expenseState.id !== expense.id
  )

  closeModal()
  resetStateExpense()
}

const expensesFiltered = computed(() => {
  if(filter.value) {
    return expenses.value.filter(expense => expense.category === filter.value)
  }
  return expenses.value;
})


const resetApp = () => {
  const confirmDelete = confirm("Are you sure you want to reset the app?")

  if (!confirmDelete) return

  
  budget.value = 0
  available.value = 0
  spent.value = 0
  expenses.value = []
  filter.value = ''

  
  resetStateExpense()

  
  localStorage.removeItem('budget')
  localStorage.removeItem('expenses')
}


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
          @reset-app="resetApp"
        />
      </div>
    </header>

    <main v-if="budget > 0">
      <Filter
      v-model:filter="filter"
      />
      <div class="list-expense container">
        <h2>
          {{ expensesFiltered.length > 0 ? "Expenses" : "There's nothing to show" }}
        </h2>

        <Expense
          v-for="expense in expensesFiltered"
          :key="expense.id"
          :expense="expense"
          @select-expense="selectExpense"
        />
      </div>

      <div class="create-expense">
        <img :src="iconNewExpense" alt="icon New Expense" @click="showModal" />
      </div>
      <Modal
        v-if="modal.show"
        @close-modal="closeModal"
        @save-expense="saveExpense"
        @delete-expense="deleteExpense"
        :modal="modal"
        :available="available"
        :id="expense.id"
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
  color: var(--grey-dark);
}

h1 {
  font-size: 4rem;
}

h2 {
  font-size: 2.8rem;
}

.set {
  overflow: hidden;
  height: 100vh;
}

/* HEADER */
header {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
}

header h1 {
  padding: 3.5rem 0;
  margin: 0;
  color: var(--white);
  text-align: center;
  font-weight: 900;
  letter-spacing: 0.5px;
}

/* LAYOUT */
.container {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.container-header {
  margin-top: -6rem;
  transform: translateY(6rem);
  padding: 5rem;
}

/* CARD */
.shadow {
  box-shadow: 0px 12px 25px -8px rgba(0, 0, 0, 0.15);
  background-color: var(--white);
  border-radius: 1.6rem;
  padding: 5rem;
}

/* MAIN */
main {
  padding-bottom: 12rem;
}

/* LIST */
.list-expense {
  margin-top: 8rem;
}

.list-expense h2 {
  font-weight: 900;
  color: var(--grey-dark);
  margin-bottom: 4rem;
  text-align: center;
}

/* FLOATING ACTION BUTTON */
.create-expense {
  position: fixed;
  bottom: 4rem;
  right: 4rem;
  background-color: var(--blue);
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 15px 30px rgba(59, 130, 246, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.create-expense:hover {
  transform: scale(1.1);
  box-shadow: 0px 20px 40px rgba(59, 130, 246, 0.5);
}

.create-expense img {
  width: 3.2rem;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  h1 {
    font-size: 3.2rem;
  }

  .container-header {
    padding: 4rem 3rem;
  }

  .shadow {
    padding: 4rem 3rem;
  }

  .list-expense h2 {
    font-size: 2.4rem;
  }
}

</style>
