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
        <p class="name">{{ expense.name }}</p>
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

.expense{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.content {
    align-items: center;
    display: flex;
    gap: 2rem;
}

.icon {
width: 5rem;
}

.details p {
margin: 0 0 1rem 0;
}

.category {

    color: var(--grey);
    font-size: 1.2rem;
    text-transform: uppercase;
    font-weight: 900;
}

.name {
color: var(--grey-dark);
font-size: 2.4rem;
font-weight: 700;
cursor: pointer;

}

.date {
    color: var(--grey-dark);
    font-size: 1.6rem;
    font-weight: 900;
}

.date span {
    font-weight: 400;
}

.amount {
    font-size: 3rem;
    font-weight: 900;
    margin: 0;
}



</style>
