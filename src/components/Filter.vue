<script>
export default {

}
</script>


<template>
    <div class="filters shadow container">
        <form>
            <div class="field">
                <label for="filter">Filter Expenses</label>
                <select id="filter" :value="category" @input="$emit('update:category', $event.target.value)">
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
        </form>
    </div>

</template>

<style scoped>

    .filters {
  margin-top: 10rem;
  padding: 3rem;
  border-radius: 1.2rem;
  background-color: var(--white);
}

.filters form {
  width: 100%;
}

.filters .field {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.filters label {
  font-size: 2rem;
  font-weight: 900;
  color: var(--grey-dark);
}

.filters select {
  width: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 2px solid transparent;
  background-color: var(--grey-light);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--grey-dark);
  appearance: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filters select:hover {
  background-color: #e9e9e9;
}

.filters select:focus {
  outline: none;
  border-color: var(--blue);
  background-color: var(--white);
}


@media (min-width: 768px) {
  .filters .field {
    flex-direction: row;
    align-items: center;
  }

  .filters label {
    flex: 0 0 25%;
  }

  .filters select {
    flex: 1;
  }
}

</style>