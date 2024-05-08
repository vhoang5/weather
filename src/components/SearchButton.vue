<template>
    <v-btn @click="search" color="primary" :disabled="loading">{{ buttonText }}</v-btn>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            default: 'Search'
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        search() {
            this.$emit('search');
        }
    }
};
</script>