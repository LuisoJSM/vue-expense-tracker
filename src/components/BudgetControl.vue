<script setup>
import imagen from '../assets/img/grafico.jpg'
import { formatAmount } from '../helpers'


const props = defineProps({
    budget: {
        type: Number,
        required: true
    },
    available: {
        type: Number,
        required: true
    },
    spent: {
        type: Number,
        required: true
    }
})
</script>


<template>
    <div class="two-columns">
        <div class="container-graphic">
            <img :src="imagen" />
        </div>

        <div class="container-budget">
            <button class="reset-app">
                Reset App
            </button>
            <p>
                <span>Budget:</span>
                {{ formatAmount(budget) }}
            </p>
            <p>
                <span>Available:</span>
                {{ formatAmount(available) }}
            </p>
            <p>
                <span>Spent:</span>
                 {{ formatAmount(spent) }}
            </p>
        </div>

    </div>
</template>

<style scoped>
.two-columns {
    display: flex;
    flex-direction: column;
}

.two-columns> :first-child {
    margin-bottom: 3rem;
}

@media (min-width: 768px) {
    .two-columns {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .two-columns> :first-child {
        margin-bottom: 0;
    }
}

.reset-app {
    background-color: #DB2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--white);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
}
.reset-app:hover {
    cursor: pointer;
    background-color: #be1360;
}

.container-budget {
    width: 100%;
}


.container-budget p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--grey-dark);
}


.container-budget span {
    font-weight: 900;
    color: var(--blue);
}

@media (min-width: 768px) {
    .container-budget p {
        text-align: left;
    }
}
</style>