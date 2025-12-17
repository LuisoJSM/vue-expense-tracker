<template>
    <div class="alert">
        
        <slot></slot>
        
    </div>
</template>

<style scoped>
.alert {
  padding: 1.6rem 2rem;
  margin-bottom: 2.5rem;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 1.4rem;
  text-align: center;
  background-color: #fee2e2;
  color: #b91c1c;
  border-left: 0.6rem solid #b91c1c;
  letter-spacing: 0.5px;
}

</style>