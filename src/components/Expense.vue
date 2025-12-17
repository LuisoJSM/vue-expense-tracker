<script setup>
import { formatAmount, formatDate } from "../helpers/index";
import IconoAhorro from "../assets/img/icono_ahorro.svg";
import IconoCasa from "../assets/img/icono_casa.svg";
import IconoComida from "../assets/img/icono_comida.svg";
import IconoGastos from "../assets/img/icono_gastos.svg";
import IconoOcio from "../assets/img/icono_ocio.svg";
import IconoSalud from "../assets/img/icono_salud.svg";
import IconoSuscripciones from "../assets/img/icono_suscripciones.svg";

const iconDictionary = {
  savings: IconoAhorro,
  food: IconoComida,
  home: IconoCasa,
  expenses: IconoGastos,
  leisure: IconoOcio,
  health: IconoSalud,
  subscriptions: IconoSuscripciones
}


const props = defineProps({
  expense: {
    type: Object,
    required: true,
  },
});


const emit = defineEmits(['select-expense'])



</script>

<template>
  <div class="expense shadow">
    <div class="content">
        <img 
        :src="iconDictionary[expense.category]" 
        alt="Expense Icon"
        class="icon"
        >
      <div class="details">
        <p>{{ expense.category }}</p>

        <p class="name" @click="$emit('select-expense', expense.id)">{{ expense.name }}</p>

        <p class="date">
            Date:
            <span>{{ formatDate(expense.date) }}</span>
        </p>
      </div>
    </div>
    <p class="amount">{{ formatAmount(expense.amount) }}</p>
  </div>
</template>

<style scoped>
.expense {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 3rem;
  margin-bottom: 2rem;
  border-radius: 1.6rem;
  background-color: var(--white);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.expense:hover {
  transform: translateY(-3px);
  box-shadow: 0px 12px 25px -8px rgba(0, 0, 0, 0.15);
}

.content {
  display: flex;
  align-items: center;
  gap: 2rem;
}

/* Icon */
.icon {
  width: 5.5rem;
  height: 5.5rem;
  padding: 1.2rem;
  border-radius: 50%;
  background-color: var(--grey-light);
}

/* Details */
.details {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.details p {
  margin: 0;
}

/* Category */
.details p:first-child {
  color: var(--grey);
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 900;
  letter-spacing: 0.5px;
}

/* Name */
.name {
  color: var(--grey-dark);
  font-size: 2.2rem;
  font-weight: 900;
  cursor: pointer;
  transition: color 0.2s ease;
}

.name:hover {
  color: var(--blue);
}

/* Date */
.date {
  color: var(--grey);
  font-size: 1.4rem;
  font-weight: 700;
}

.date span {
  font-weight: 400;
}

/* Amount */
.amount {
  font-size: 3rem;
  font-weight: 900;
  margin: 0;
  color: var(--grey-dark);
}


@media (max-width: 600px) {
  .expense {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
  }

  .amount {
    align-self: flex-end;
    font-size: 2.6rem;
  }
}



</style>
