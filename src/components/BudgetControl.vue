<script setup>
import { computed } from "vue";
import CircleProgress from "vue3-circle-progress";
import "vue3-circle-progress/dist/circle-progress.css";
import { formatAmount } from "../helpers";

const emit = defineEmits(["reset-app"]);

const props = defineProps({
  budget: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    required: true,
  },
});

const progressColor = computed(() =>
  percent.value > 100 ? "#ef4444" : "#3b82f6"
);

const percent = computed(() => {
  if (props.budget === 0) return 0;

  return Math.round((props.spent / props.budget) * 100);
});

const isBudgetExhausted = computed(() => props.available <= 0);
</script>

<template>
  <div class="two-columns">
    <div class="container-graphic">
      <p class="percent" :class="{ over: isBudgetExhausted }">
        <span v-if="percent < 100">{{ percent }}%</span>
        <span v-else>Budget exhausted</span>
      </p>

      <CircleProgress
        :percent="percent"
        :size="250"
        :border-width="30"
        :border-bg-width="30"
        :fill-color="progressColor"
        empty-color="#e1e1e1"
      />
    </div>

    <div class="container-budget">
      <button class="reset-app" type="button" @click="$emit('reset-app')">
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
.container-graphic {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.percent {
  position: absolute;
  font-size: 3.6rem;
  font-weight: 900;
  color: var(--grey-dark);
  pointer-events: none;
}
.percent.over {
  font-size: 1.4rem;
  color: #ef4444;
  text-transform: uppercase;
}


.two-columns {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Graphic */
.container-graphic {
  display: flex;
  justify-content: center;
}

.container-graphic img {
  max-width: 22rem;
  width: 100%;
}

/* Desktop layout */
@media (min-width: 768px) {
  .two-columns {
    flex-direction: row;
    align-items: center;
    gap: 5rem;
  }

  .container-graphic img {
    max-width: 26rem;
  }
}

/* Budget panel */
.container-budget {
  width: 100%;
  display: grid;
  gap: 2.5rem;
}

/* Reset button */
.reset-app {
  background-color: #db2777;
  border: none;
  padding: 1.3rem;
  width: 100%;
  color: var(--white);
  font-weight: 900;
  font-size: 1.4rem;
  text-transform: uppercase;
  border-radius: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
}

.reset-app:hover {
  background-color: #be1360;
  transform: translateY(-2px);
}

/* Budget values */
.container-budget p {
  font-size: 2.2rem;
  text-align: center;
  color: var(--grey-dark);
  margin: 0;
}

.container-budget span {
  font-weight: 900;
  color: var(--blue);
}

.container-budget p:last-child span {
  color: #db2777;
}

@media (min-width: 768px) {
  .container-budget p {
    text-align: left;
    font-size: 2.3rem;
  }
}
</style>
