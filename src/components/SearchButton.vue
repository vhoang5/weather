<template>
    <v-btn @click="search" color="primary">{{ buttonText }}</v-btn>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: 'Search'
        }
    },
    methods: {
        search() {
            this.$emit('search');
        }
    }
};
</script>