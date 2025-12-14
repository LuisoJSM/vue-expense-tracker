
<script setup>
import closeModal from '../assets/img/cerrar.svg'


const emit = defineEmits(['close-modal'])

const props = defineProps({
    modal: {
        type: Object,
        required: true
    }
})

</script>

<template>
    <div class="modal">

        <div class="close-modal">
            <img :src="closeModal" @click="$emit('close-modal')">
        </div>

        <div class="container container-form" :class="[modal.animate ? 'animate' : 'close']">

            <form class="new-expense">
                <legend>Add expense</legend>

                <div class="field">
                    <label for="name">Name Expense:</label>
                    <input type="text" id="name" placeholder="Add your expense name...">
                </div>
                <div class="field">
                    <label for="name">amount:</label>
                    <input type="number" id="amount" placeholder="Add the amount, ej: 300">
                </div>
                <div class="field">
                    <label for="name">Category:</label>
                    <select id="category">

                        <option value="">--Select</option>
                        <option value="save">Save</option>
                        <option value="food">Food</option>
                        <option value="home">Home</option>
                        <option value="hollydays">Hollydays</option>
                        <option value="suscriptions">Suscriptions</option>

                    </select>

                </div>

                <input type="submit" value="Add Expense">
            </form>

        </div>

        
        
    </div>
</template>

<style scoped>

.modal {
    position: absolute;
    background-color: rgb( 0 0 0 / 0.9);
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
cursor: pointer
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

.new-expense input, .new-expense select {
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



</style>